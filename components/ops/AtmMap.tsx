"use client";

import { useEffect, useState } from "react";
import useAtmStore, { selectAtms, selectLoading } from "@/lib/store/atmStore";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const createColoredIcon = (color: string) => {
  const svgIcon = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.5 12.5 28.5S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z" fill="${color}"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
    </svg>
  `;

  const svgShadow = `
    <svg width="41" height="41" viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20.5" cy="37" rx="10" ry="4" fill="rgba(0,0,0,0.3)"/>
    </svg>
  `;

  return L.icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
    shadowUrl: `data:image/svg+xml;base64,${btoa(svgShadow)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const iconOnline      = createColoredIcon("#22c55e"); // Green
const iconMaintenance = createColoredIcon("#f59e0b"); // Yellow/Orange


const iconOffline = L.divIcon({
  className: "custom-pulse-marker",
  html: `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.5 12.5 28.5S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z"
            fill="#ef4444"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
    </svg>
  `,
  iconSize:     [25, 41],
  iconAnchor:   [12, 41],
  popupAnchor:  [1, -34],
  shadowUrl:    `data:image/svg+xml;base64,${btoa(`
    <svg width="41" height="41" viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20.5" cy="37" rx="10" ry="4" fill="rgba(0,0,0,0.3)"/>
    </svg>`)}`,
  shadowSize:   [41, 41],
});


function MapUpdater({ atms }: { atms: ATM[] }) {
  const [MapUpdaterComponent, setMapUpdaterComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import("react-leaflet").then((mod) => {
      const Updater = () => {
        const map = mod.useMap();
        useEffect(() => {
          if (atms.length > 0) {
            const bounds = L.latLngBounds(
              atms.map((atm) => [atm.location.coordinates.lat, atm.location.coordinates.lng] as [number, number])
            );
            map.fitBounds(bounds, { padding: [50, 50] });
          }
        }, [map]);
        return null;
      };
      setMapUpdaterComponent(() => Updater);
    });
  }, [atms]);

  return MapUpdaterComponent ? <MapUpdaterComponent /> : null;
}


export function AtmMap() {
  const atms = useAtmStore(selectAtms);
  const loading = useAtmStore(selectLoading);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONLINE":      return "text-green-600";
      case "OFFLINE":     return "text-red-600";
      case "MAINTENANCE": return "text-yellow-600";
      default:            return "text-gray-500";
    }
  };

  if (loading) return <div className="w-full h-full" />;

  return (
    <div className="w-full h-full relative">
      <style jsx global>{`
        .leaflet-container { height: 100%; width: 100%; }

        @keyframes pulse-red {
          0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.7); }
          70%  { box-shadow: 0 0 0 12px rgba(239,68,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
        }
        .custom-pulse-marker svg { animation: pulse-red 1.5s infinite; }
      `}</style>

      <MapContainer center={[6.43067, 3.43505]} zoom={12} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors, HOT"
        />

        <MapUpdater atms={atms} />

        {atms.map((atm: ATM) => (
          <Marker
            key={atm.id}
            position={[atm.location.coordinates.lat, atm.location.coordinates.lng]}
            icon={
              atm.status === "OFFLINE"
                ? iconOffline
                : atm.status === "MAINTENANCE"
                  ? iconMaintenance
                  : iconOnline
            }
          >
            <Popup>
               <div className="p-2">
                <h3 className="font-semibold text-zenith-neutral-900 mb-1">
                  {atm.location.branchName}
                </h3>
                <p className="text-sm text-zenith-neutral-600 mb-2">
                  {atm.location.address}
                </p>
                <p className={`text-sm font-medium ${getStatusColor(atm.status)}`}>
                  Status: {atm.status}
                </p>
                {atm.predictiveScore?.failureRisk != null && (
                  <p className="text-xs text-zenith-red-600 mt-1">
                    Failure Risk: {(atm.predictiveScore.failureRisk * 100).toFixed(0)}%
                  </p>
                )}
                {atm.telemetry?.errorCodes && atm.telemetry.errorCodes.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-zenith-neutral-700">Telemetry Errors:</p>
                    <ul className="text-xs text-zenith-neutral-600 list-disc list-inside">
                      {atm.telemetry.errorCodes.map((code: string, idx: number) => (
                        <li key={idx}>{code}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
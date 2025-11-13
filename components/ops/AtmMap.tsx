"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useAtmStore, { selectAtms, selectLoading } from "@/lib/store/atmStore";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer,TileLayer,Marker,Popup } from "react-leaflet";


// Define colored icons
const iconDefault = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const iconMaintenance = L.icon({
  ...iconDefault.options,
  className: "maintenance-marker",
});

const iconFaulty = L.icon({
  ...iconDefault.options,
  className: "faulty-marker",
});

// Add CSS filters for colors
<style jsx global>{`
  .faulty-marker {
    filter: hue-rotate(0deg) saturate(10) brightness(0.9); /* Red tint */
  }
  .maintenance-marker {
    filter: hue-rotate(50deg) saturate(3) brightness(1.1); /* Yellow tint */
  }
  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`}</style>


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
  // Read ATMs from centralized Zustand store
  const atms = useAtmStore(selectAtms);
  const loading = useAtmStore(selectLoading);

  // keep map bounds in sync when ATMs change by relying on MapUpdater below

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-zenith-success";
      case "faulty":
        return "text-zenith-error";
      case "maintenance":
        return "text-zenith-warning";
      default:
        return "text-zenith-neutral-500";
    }
  };

  if (loading) return <div className="w-full h-full" />;

  return (
    <div className="w-full h-full relative">
      <style jsx global>{`
        .faulty-marker {
          filter: hue-rotate(0deg) saturate(2);
        }
        .leaflet-container {
          height: 100%;
          width: 100%;
        }
      `}</style>
      <MapContainer
        center={[6.43067, 3.43505]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
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
              ? iconFaulty
              : atm.status === "MAINTENANCE"
              ? iconMaintenance
              : iconDefault
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

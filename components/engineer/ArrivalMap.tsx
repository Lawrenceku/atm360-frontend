"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { haversineDistance } from "@/lib/utils/geolocation";

// Dynamically import leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

// Lazy load leaflet CSS only
if (typeof window !== "undefined") {
  import("leaflet/dist/leaflet.css");
}

let L: any;
if (typeof window !== "undefined") {
  L = require("leaflet");
}

// Fix for default marker icons (only on client)
if (typeof window !== "undefined" && L) {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

interface ArrivalMapProps {
  userLocation: { lat: number; lng: number } | null;
  atmLocation: { lat: number; lng: number };
  onDistanceUpdate?: (distance: number) => void;
  onArrival?: () => void;
  disableTracking?: boolean;
}

export default function ArrivalMap({
  userLocation,
  atmLocation,
  onDistanceUpdate,
  onArrival,
  disableTracking = false,
}: ArrivalMapProps) {
  const [distance, setDistance] = useState<number | null>(null);
  const [eta, setEta] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate distance and ETA
  useEffect(() => {
    if (!userLocation) return;

    const dist = haversineDistance(userLocation, atmLocation);
    setDistance(dist);

    if (onDistanceUpdate) {
      onDistanceUpdate(dist);
    }

    // Calculate ETA (assuming average speed of 30 km/h in city)
    const speedKmh = 30;
    const timeHours = dist / 1000 / speedKmh;
    const timeMinutes = Math.round(timeHours * 60);
    setEta(timeMinutes > 0 ? `${timeMinutes} min` : "< 1 min");
  }, [userLocation, atmLocation, onDistanceUpdate]);

  // Watch position for real-time updates (disabled in simulation mode)
  useEffect(() => {
    if (disableTracking) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      return;
    }

    if (!navigator.geolocation) return;

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const dist = haversineDistance(newLocation, atmLocation);
        setDistance(dist);

        if (onDistanceUpdate) {
          onDistanceUpdate(dist);
        }

        // Calculate ETA
        const speedKmh = 30;
        const timeHours = dist / 1000 / speedKmh;
        const timeMinutes = Math.round(timeHours * 60);
        setEta(timeMinutes > 0 ? `${timeMinutes} min` : "< 1 min");

        // Check if arrived
        if (dist <= 50 && onArrival) {
          onArrival();
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [atmLocation, onDistanceUpdate, onArrival, disableTracking]);

  if (!mounted || typeof window === "undefined") {
    return (
      <div className="w-full h-[400px] rounded-lg overflow-hidden border border-zenith-neutral-200 relative flex items-center justify-center bg-zenith-neutral-100">
        <p className="text-zenith-neutral-500">Loading map...</p>
      </div>
    );
  }

  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [atmLocation.lat, atmLocation.lng];

  // Simple straight line between points
  const routeLine: [number, number][] = userLocation
    ? [
        [userLocation.lat, userLocation.lng],
        [atmLocation.lat, atmLocation.lng],
      ]
    : [];

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-zenith-neutral-200 relative">
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors, HOT"
        />

        {/* User Location Marker */}
        {userLocation && L && (
          <Marker position={[userLocation.lat, userLocation.lng]} />
        )}

        {/* ATM Location Marker */}
        {L && <Marker position={[atmLocation.lat, atmLocation.lng]} />}

        {/* Simple straight line route */}
        {routeLine.length > 0 && (
          <Polyline
            positions={routeLine}
            pathOptions={{
              color: "#0284c7",
              weight: 4,
              opacity: 0.7,
              dashArray: "10, 10",
            }}
          />
        )}
      </MapContainer>

      {/* Distance and ETA Overlay */}
      {distance !== null && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-zenith-neutral-200 z-[1000]">
          <div className="text-sm font-semibold text-zenith-neutral-900">
            Distance: {distance < 1000 ? `${Math.round(distance)}m` : `${(distance / 1000).toFixed(1)}km`}
          </div>
          {eta && (
            <div className="text-xs text-zenith-neutral-600 mt-1">
              ETA: {eta}
            </div>
          )}
          <div className="text-xs text-zenith-neutral-500 mt-1">
            Direct path shown
          </div>
        </div>
      )}
    </div>
  );
}
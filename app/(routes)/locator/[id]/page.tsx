"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import {
  Clock,
  AlertCircle,
  ArrowLeft,
  Navigation,
  Shield,
  Activity,
  Calendar,
  CreditCard,
  Wifi,
  ChevronRight,
} from "lucide-react";
import useAtmStore, { selectGetById } from "@/lib/store/atmStore";
import { haversineDistance } from "@/lib/utils/geolocation";

// Dynamic Map Component
const AtmLocationMap = dynamic(
  () => import("@/components/locator/ATMLocationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="text-gray-500">Loading map...</div>
      </div>
    ),
  }
);

const StatusBadge = ({ status }: { status: ATM["status"] }) => {
  const statusConfig: Record<string, { color: string; label: string }> = {
    ONLINE: { color: "bg-green-100 text-green-700", label: "Available" },
    OFFLINE: { color: "bg-red-100 text-red-700", label: "Out of Service" },
    MAINTENANCE: {
      color: "bg-yellow-100 text-yellow-700",
      label: "Under Maintenance",
    },
    OUT_OF_CASH: {
      color: "bg-orange-100 text-orange-700",
      label: "Out of Cash",
    },
    UNKNOWN: { color: "bg-gray-100 text-gray-700", label: "Unknown" },
  };

  const config = statusConfig[status] ?? statusConfig.UNKNOWN;

  return (
    <span
      className={`${config.color} px-3 py-1 rounded-full text-sm font-medium`}
    >
      {config.label}
    </span>
  );
};

export default function AtmDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  //@ts-expect-error id may be undefined
  const atm = useAtmStore(selectGetById(id));

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const [mockData] = useState({
    transactionVolume: Math.floor(Math.random() * 800) + 200,
    securityRating: 4.5,
  });

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(location);

        // Calculate distance if ATM exists
        if (atm) {
          const dist = haversineDistance(location, atm.location.coordinates);
          setDistance(dist);
        }
      },
      () => console.log("Location denied"),
      { enableHighAccuracy: true }
    );
  }, [atm]);

  if (!atm) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              ATM Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The ATM you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link
              href="/locator"
              className="inline-flex items-center text-red-600 hover:text-red-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to ATM Locator
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/locator"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {atm.location.branchName}
                </h1>
                <p className="text-sm text-gray-600">{atm.location.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <StatusBadge status={atm.status} />
                <span className="text-sm text-gray-600">
                  Updated: {new Date(atm.lastUpdated).toLocaleTimeString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Model</p>
                      <p className="font-medium">{atm.model}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hours</p>
                      <p className="font-medium">24/7</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Wifi className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Network</p>
                      <p className="font-medium">{atm.networkStatus}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-orange-700" />
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-gray-600">Cash Level</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${
                              (atm.cashLevel.currentAmount /
                                atm.cashLevel.totalCapacity) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                      <p className="text-sm mt-1">
                        ₦{atm.cashLevel.currentAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map with Route */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Location & Route
                </h2>
                {distance && (
                  <span className="text-sm font-medium text-gray-700">
                    {distance.toFixed(2)} km away
                  </span>
                )}
              </div>
              <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
                <AtmLocationMap
                  atm={atm}
                  userLocation={userLocation}
                  className="h-full w-full"
                />
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">
                      Transaction Volume
                    </h3>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockData.transactionVolume}
                  </p>
                  <p className="text-sm text-gray-600">transactions today</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-gray-900">
                      Last Maintenance
                    </h3>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">
                    {new Date(atm.updatedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">last serviced</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium text-gray-900">
                      Security Rating
                    </h3>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockData.securityRating}/5.0
                  </p>
                  <p className="text-sm text-gray-600">security score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (userLocation) {
                      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${atm.location.coordinates.lat},${atm.location.coordinates.lng}`;
                      window.open(url, "_blank");
                    }
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Navigation className="w-5 h-5" />
                    Get Directions
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Report Issue
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

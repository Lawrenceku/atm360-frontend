"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { motion } from "framer-motion";
import {
  MapPin,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import useAtmStore, { selectAtms } from "@/lib/store/atmStore";
import useTicketStore from "@/lib/store/ticketStore";
import BranchSidebar from "@/components/branch/BranchSidebar";

export default function BranchPage() {
  const params = useParams();
  const branchId = params?.branchId as string;
  const router = useRouter();
  const atms = useAtmStore(selectAtms) ?? [];

  // Get ATMs for this branch - filter by branchName matching branchId
  const branchAtms = useMemo(() => {
    if (!branchId) return [];
    // Match branchId with branchName (branchId could be the branch name or a normalized version)
    return atms.filter((atm) => {
      const branchName = atm.location.branchName || "";
      // Check if branchId matches branchName (case-insensitive, partial match)
      return branchName.toLowerCase().includes(branchId.toLowerCase()) ||
        branchId.toLowerCase().includes(branchName.toLowerCase().split(" - ")[1] || "");
    });
  }, [atms, branchId]);

  // Get active tickets for branch ATMs
  const activeTickets = useMemo(() => {
    const allTickets: Ticket[] = [];
    branchAtms.forEach((atm) => {
      const tickets = useTicketStore.getState().getByAtmId(atm.id);
      allTickets.push(...tickets);
    });
    return allTickets.filter(
      (t) => t.status !== "RESOLVED" && t.status !== "CLOSED"
    );
  }, [branchAtms]);

  useEffect(() => {
    useAtmStore.getState().refresh();
    useTicketStore.getState().refresh();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONLINE":
        return "bg-green-100 text-green-700 border-green-200";
      case "OFFLINE":
        return "bg-red-100 text-red-700 border-red-200";
      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "OUT_OF_CASH":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <BranchSidebar branchId={branchId} />
      <div className="flex-1 flex flex-col space-y-6 h-screen overflow-y-auto scrollbar">
        <div className="flex-1 p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-zenith-neutral-900">
              Branch Dashboard
            </h1>
            <p className="text-sm text-zenith-neutral-600">
              {branchAtms[0]?.location.branchName || `Branch: ${branchId}`}
            </p>
          </div>

          {/* ATM List */}
          <div className="space-y-4">
            {branchAtms.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg border border-zenith-neutral-200 p-8 text-center">
                <p className="text-zenith-neutral-500">
                  No ATMs found for this branch
                </p>
              </div>
            ) : (
              branchAtms.map((atm) => {
                const atmTickets = useTicketStore.getState().getByAtmId(atm.id);
                const activeTicket = atmTickets.find(
                  (t) => t.status !== "RESOLVED" && t.status !== "CLOSED"
                );

                return (
                  <motion.div
                    key={atm.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-lg border border-zenith-neutral-200 p-6 hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => activeTicket && router.push(`/branch/${branchId}/ticket/${activeTicket.id}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-zenith-neutral-900 mb-1">
                          {atm.id}
                        </h3>
                        <p className="text-sm text-zenith-neutral-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {atm.location.address}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full border font-medium ${getStatusColor(
                          atm.status
                        )}`}
                      >
                        {atm.status}
                      </span>
                    </div>

                    {activeTicket && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <p className="text-sm text-yellow-700 font-medium">
                              Active Service: Ticket #{activeTicket.id}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/branch/${branchId}/ticket/${activeTicket.id}`);
                            }}
                            className="text-xs px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-zenith-neutral-500 text-xs mb-1">
                          Cash Level
                        </p>
                        <p className="font-semibold text-zenith-neutral-900">
                          {atm.cashLevel
                            ? (
                                (atm.cashLevel.currentAmount /
                                  atm.cashLevel.totalCapacity) *
                                100
                              ).toFixed(0)
                            : "N/A"}
                          %
                        </p>
                      </div>
                      <div>
                        <p className="text-zenith-neutral-500 text-xs mb-1">
                          Network
                        </p>
                        <p className="font-semibold text-zenith-neutral-900">
                          {atm.networkStatus}
                        </p>
                      </div>
                      <div>
                        <p className="text-zenith-neutral-500 text-xs mb-1">
                          Health
                        </p>
                        <p className="font-semibold text-zenith-neutral-900">
                          {atm.predictiveScore?.failureRisk
                            ? atm.predictiveScore.failureRisk < 0.3
                              ? "Good"
                              : atm.predictiveScore.failureRisk < 0.6
                              ? "Fair"
                              : "Poor"
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  useAlertStore,
  selectAlerts,
  selectLoading,
} from "@/lib/store/alertStore";
import AIActionPanel from "./AIActionPanel";
import formatText from "@/lib/utils/formatText";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const PAGE_SIZE = 10;

export function AlertList() {
  const alerts = useAlertStore(selectAlerts);
  const loading = useAlertStore(selectLoading);
  const acknowledgeAlert = useAlertStore((s) => s.acknowledgeAlert);
  const refresh = useAlertStore((s) => s.refresh);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleAcknowledge = async (id: string) => {
    try {
      await acknowledgeAlert(id);
    } catch (error) {
      toast.error("Failed to acknowledge alert!");
    }
  };

  const getSeverityStyles = (severity: Alert["severity"]) => {
    switch (severity) {
      case "CRITICAL":
        return {
          badge:
            "bg-[var(--color-zenith-red-50)] text-[var(--color-zenith-red-700)]",
          icon: "text-[var(--color-zenith-red-500)]",
        };
      case "HIGH":
        return {
          badge:
            "bg-[var(--color-zenith-warning)]/10 text-[var(--color-zenith-warning)]",
          icon: "text-[var(--color-zenith-warning)]",
        };
      case "MEDIUM":
        return {
          badge:
            "bg-[var(--color-zenith-accent-50)] text-[var(--color-zenith-accent-700)]",
          icon: "text-[var(--color-zenith-accent-500)]",
        };
      default:
        return {
          badge:
            "bg-[var(--color-zenith-neutral-100)] text-[var(--color-zenith-neutral-700)]",
          icon: "text-[var(--color-zenith-neutral-500)]",
        };
    }
  };

  const totalPages = Math.ceil(alerts.length / PAGE_SIZE);
  const paginatedAlerts = alerts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-[var(--color-zenith-neutral-600)]">
        Loading alerts...
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-y-auto bg-[var(--color-zenith-neutral-50)] border border-[var(--color-zenith-neutral-200)] rounded-xl shadow-sm flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 bg-[var(--color-zenith-neutral-100)] border-b border-[var(--color-zenith-neutral-200)] flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-zenith-neutral-900)] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[var(--color-zenith-red-500)]" />
          Active Alerts
        </h3>
        <span className="text-sm text-[var(--color-zenith-neutral-500)]">
          {alerts.filter((a) => !a.acknowledged).length} unacknowledged
        </span>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--color-zenith-neutral-200)]">
          <thead className="bg-[var(--color-zenith-neutral-100)] sticky top-[56px] z-10">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-zenith-neutral-600)] uppercase tracking-wider"
              >
                Severity
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-zenith-neutral-600)] uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-zenith-neutral-600)] uppercase tracking-wider"
              >
                ATM ID
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-zenith-neutral-600)] uppercase tracking-wider"
              >
                Message
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-zenith-neutral-600)] uppercase tracking-wider"
              >
                Timestamp
              </th>
              <th
                scope="col"
                className="relative px-4 py-3 text-xs font-semibold text-[var(--color-zenith-neutral-600)] uppercase tracking-wider text-center"
              >
                Actions
              </th>
              {/* Add a new column for Prediction Information */}
              <th
                scope="col"
                className="relative px-4 py-3 text-xs font-semibold text-[var(--color-zenith-neutral-600)] uppercase tracking-wider text-center"
              >
                Prediction
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-zenith-neutral-200)] bg-white">
            {paginatedAlerts.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-[var(--color-zenith-neutral-500)]"
                >
                  No alerts at this time
                </td>
              </tr>
            ) : (
              paginatedAlerts.map((alert) => {
                const style = getSeverityStyles(alert.severity);
                return (
                  <tr
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className={`cursor-pointer hover:bg-[var(--color-zenith-neutral-100)] transition ${
                      alert.acknowledged ? "opacity-60" : ""
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-pressed="false"
                  >
                    <td className="px-4 py-3 align-top whitespace-nowrap">
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${style.badge}`}
                      >
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-[var(--color-zenith-neutral-700)] whitespace-nowrap">
                      {formatText(alert.type)}
                    </td>
                    <td className="px-4 py-3 align-top font-semibold text-[var(--color-zenith-neutral-900)] whitespace-nowrap">
                      {alert.atmId}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-[var(--color-zenith-neutral-700)] line-clamp-2 max-w-xs">
                      {alert.message}
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-[var(--color-zenith-neutral-500)] whitespace-nowrap">
                      {new Date(alert.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 align-top text-center whitespace-nowrap">
                      {!alert.acknowledged && (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAcknowledge(alert.id);
                          }}
                          className="p-2 rounded-full text-[var(--color-zenith-success)] hover:bg-[var(--color-zenith-success)]/10 transition-colors"
                          title="Acknowledge"
                        >
                          <Check className="w-4 h-4" />
                        </motion.button>
                      )}
                    </td>
                    {/* Displaying Prediction Info */}
                    <td className="px-4 py-3 align-top text-xs text-[var(--color-zenith-neutral-500)] whitespace-nowrap">
                      {alert.prediction ? (
                        <>
                          <div>
                            <strong>Reasoning:</strong>{" "}
                            {alert.prediction.reasoning}
                          </div>
                          <div>
                            <strong>Confidence:</strong>{" "}
                            {alert.prediction.confidence * 100}%
                          </div>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {alerts.length > PAGE_SIZE && (
        <div className="flex justify-between items-center p-4 bg-[var(--color-zenith-neutral-100)] border-t border-[var(--color-zenith-neutral-200)]">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-[var(--color-zenith-neutral-200)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-zenith-neutral-300)] transition"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm text-[var(--color-zenith-neutral-600)]">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-[var(--color-zenith-neutral-200)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-zenith-neutral-300)] transition"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Zeni Copilot AI Panel */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 w-[440px] bg-white shadow-2xl border-l border-[var(--color-zenith-neutral-200)] z-20"
          >
            <div className="flex justify-between items-center p-4">
              <div className="text-lg font-semibold mb-4 text-[var(--color-zenith-neutral-900)] flex items-center gap-2">
                <span>Zeni Copilot</span>
                <img src="/images/zeni.png" className="w-4 h-4 animate-spin" />
              </div>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-1 text-[var(--color-zenith-neutral-500)] hover:text-[var(--color-zenith-neutral-800)] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Separator />
            <div className="p-4">
              <AIActionPanel
                alert={selectedAlert}
                onClose={() => setSelectedAlert(null)}
                handleAcknowledge={handleAcknowledge}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

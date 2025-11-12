"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { LogoutIcon, AtmIcon, AlertIcon } from "@/components/icons";

import useAtmStore, { selectAtms } from "@/lib/store/atmStore";
import { useAlertStore, selectAlerts } from "@/lib/store/alertStore";
import useTicketStore, { selectByAtmId } from "@/lib/store/ticketStore";

export default function EngineerPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const atms = useAtmStore(selectAtms) ?? [];

  useEffect(() => {
    // Ensure stores are refreshed on dashboard load and periodically
    (async () => {
      await Promise.all([
        useAtmStore.getState().refresh(),
        useAlertStore.getState().refresh(),
      ]);
    })();
    const interval = setInterval(() => useAtmStore.getState().refresh(), 30000);
    const alertsInterval = setInterval(
      () => useAlertStore.getState().refresh(),
      30000
    );
    return () => {
      clearInterval(interval);
      clearInterval(alertsInterval);
    };
  }, []);

  const alertsAll = useAlertStore(selectAlerts);
  const alerts = useMemo(
    () => (alertsAll ?? []).filter((a) => !a.acknowledged),
    [alertsAll]
  );
  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const faultyAtms = (atms || []).filter((atm) => atm.status !== "ONLINE");

  const handleCreate = async (atm: ATM) => {
    // Define ticket data options
    const issueTypes = [
      "CASH_LOW",
      "NETWORK_ISSUE",
      "HARDWARE_ERROR",
      "SECURITY_ALERT",
      "MAINTENANCE_DUE",
      "POWER_ISSUE",
      "CARD_JAM",
      "SCREEN_FAILURE",
      "OTHER",
    ] as const;
    const severities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;
    const reporters = ["SYSTEM", "CUSTOMER", "BRANCH_MANAGER"] as const;

    // Use current timestamp as seed for pseudo-random selection
    const getRandomItem = <T,>(array: readonly T[]): T => {
      const index = Date.now() % array.length;
      return array[index];
    };

    // Select values deterministically based on ATM state
    const issueType = atm.telemetry?.errorCodes?.length
      ? issueTypes.find((type) =>
          atm.telemetry!.errorCodes?.some((code) => code.includes(type))
        ) ?? getRandomItem(issueTypes)
      : getRandomItem(issueTypes);

    const severity = atm.predictiveScore?.failureRisk
      ? atm.predictiveScore.failureRisk > 0.7
        ? "CRITICAL"
        : atm.predictiveScore.failureRisk > 0.4
        ? "HIGH"
        : atm.predictiveScore.failureRisk > 0.2
        ? "MEDIUM"
        : "LOW"
      : getRandomItem(severities);

    const reportedBy = getRandomItem(reporters);

    // Generate description based on issue type and ATM state
    const description = `${reportedBy} reported ${issueType
      .toLowerCase()
      .replace("_", " ")} malfunction at ${atm.location.branchName}. ${
      atm.telemetry?.errorCodes?.length
        ? `Error codes: ${atm.telemetry.errorCodes.join(", ")}. `
        : ""
    }${
      atm.predictiveScore?.failureRisk
        ? `Failure risk: ${(atm.predictiveScore.failureRisk * 100).toFixed(
            0
          )}%. `
        : ""
    }Requires immediate attention.`;

    // Create the ticket
    const ticket = await useTicketStore.getState().createTicket({
      atmId: atm.id,
      engineerId: user?.id || "",
      reportedBy,
      issueType,
      severity,
      description,
      status: "OPEN",
    });

    // Navigate to the new ticket
    router.push(`/engineer/task/${ticket.id}`);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-zenith-neutral-50 to-zenith-accent-50">
      <div className="bg-white border-b border-zenith-neutral-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zenith-neutral-900">
              Engineer Dashboard
            </h1>
            <p className="text-sm text-zenith-neutral-600">
              Service requests and ATM maintenance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-zenith-neutral-900">
                {user?.name}
              </p>
              <p className="text-xs text-zenith-neutral-500">Engineer</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-zenith-neutral-600 hover:bg-zenith-neutral-100 rounded-lg transition-colors"
            >
              <LogoutIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg border border-zenith-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-zenith-neutral-900">
                Total ATMs
              </h3>
              <AtmIcon className="w-8 h-8 text-zenith-accent-600" />
            </div>
            <p className="text-3xl font-bold text-zenith-neutral-900">
              {atms.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-zenith-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-zenith-neutral-900">
                Faulty ATMs
              </h3>
              <AlertIcon className="w-8 h-8 text-zenith-error" />
            </div>
            <p className="text-3xl font-bold text-zenith-error">
              {faultyAtms.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-zenith-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-zenith-neutral-900">
                Active Alerts
              </h3>
              <AlertIcon className="w-8 h-8 text-zenith-warning" />
            </div>
            <p className="text-3xl font-bold text-zenith-warning">
              {alerts.length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg border border-zenith-neutral-200">
            <div className="p-6 border-b border-zenith-neutral-200">
              <h2 className="text-xl font-semibold text-zenith-neutral-900">
                Faulty ATMs
              </h2>
            </div>
            <div className="divide-y divide-zenith-neutral-200">
              {faultyAtms.length === 0 ? (
                <div className="p-6 text-center text-zenith-neutral-500">
                  No faulty ATMs
                </div>
              ) : (
                faultyAtms.map((atm) => (
                  <div key={atm.id} className="p-6">
                    <h3 className="font-semibold text-zenith-neutral-900 mb-2">
                      {atm.location.branchName}
                    </h3>
                    <p className="text-sm text-zenith-neutral-600 mb-3">
                      {atm.location.address}
                    </p>
                    {atm.telemetry?.errorCodes &&
                      atm.telemetry.errorCodes.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-zenith-neutral-700 mb-1">
                            Telemetry Errors:
                          </p>
                          <ul className="text-xs text-zenith-neutral-600 list-disc list-inside">
                            {atm.telemetry.errorCodes.map(
                              (issue: string, idx: number) => (
                                <li key={idx}>{issue}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    {atm.predictiveScore?.failureRisk != null && (
                      <p className="text-xs text-zenith-red-600 mb-3">
                        Failure Risk:{" "}
                        {(atm.predictiveScore.failureRisk * 100).toFixed(0)}%
                      </p>
                    )}
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-zenith-accent-500 to-zenith-accent-600 text-white rounded-lg hover:from-zenith-accent-600 hover:to-zenith-accent-700 transition-all text-sm font-medium"
                      onClick={() => handleCreate(atm)}
                    >
                      View Details
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-zenith-neutral-200">
            <div className="p-6 border-b border-zenith-neutral-200">
              <h2 className="text-xl font-semibold text-zenith-neutral-900">
                Active Alerts
              </h2>
            </div>
            <div className="divide-y divide-zenith-neutral-200">
              {alerts.length === 0 ? (
                <div className="p-6 text-center text-zenith-neutral-500">
                  No active alerts
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-6 border-l-4 ${
                      alert.severity === "CRITICAL" || "HIGH"
                        ? "border-zenith-red-500 bg-zenith-red-50"
                        : alert.severity === "MEDIUM"
                        ? "border-zenith-warning bg-zenith-warning/10"
                        : "border-zenith-accent-500 bg-zenith-accent-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-zenith-neutral-600">
                          {alert.severity}
                        </span>
                        <h3 className="font-semibold text-zenith-neutral-900 mt-1">
                          {alert.atmId}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-zenith-neutral-700 mb-2">
                      {alert.message}
                    </p>
                    <p className="text-xs text-zenith-neutral-500 mb-3">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-zenith-red-500 to-zenith-red-600 text-white rounded-lg hover:from-zenith-red-600 hover:to-zenith-red-700 transition-all text-sm font-medium"
                      // onClick={}
                    >
                      Accept Task
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Sidebar from "@/components/ops/Sidebar";
import { TopNav } from "@/components/ops/TopNav";
import Filters from "@/components/ops/Filters";
import KpiCard from "@/components/ops/KpiCard";
import ActivityChart from "@/components/ops/ActivityChart";
import TopicList from "@/components/ops/TopicList";
import Leaderboard from "@/components/ops/Leaderboard";
import { AtmNetworkUptime } from "@/components/ops/kpis/AtmNetworkUptime";

import { MeanTimeToRepair } from "@/components/ops/kpis/MeanTImeToRepair";
import { AtmDowntimeByRegion } from "@/components/ops/kpis/AtmDowntimeByRegion";
import { IncidentBreakdown } from "@/components/ops/kpis/IncidentBreakdown";
import { FraudDetectionRate } from "@/components/ops/kpis/FraudDetectionRate";
import { CashAvailability } from "@/components/ops/kpis/CashAvailability";
import { EngineerUtilization } from "@/components/ops/kpis/EngineerUtilization";
import { CashReplenishmentTime } from "@/components/ops/kpis/CashReplenishmentTime";
import { TopAtmsByVolume } from "@/components/ops/kpis/TopAtmsByVolume";
import { RecurringFaults } from "@/components/ops/kpis/RecurringFaults";
import { SLACompliance } from "@/components/ops/kpis/SLACompliance";
import { RegionalPerformance } from "@/components/ops/kpis/RegionalPerformance";
import { TotalCostOfOperations } from "@/components/ops/kpis/TotalCostOfOperations";
import { useAtmStore, selectAtms } from "@/lib/store/atmStore";
import { useTicketStore, selectTickets } from "@/lib/store/ticketStore";
import { useAlertStore, selectAlerts } from "@/lib/store/alertStore";
import { calculateNetworkUptime, calculateMTTR } from "@/lib/utils/atmMetrics";
import { useEffect } from "react";

export default function OpsPage() {
  const atms = useAtmStore(selectAtms);
  const tickets = useTicketStore(selectTickets);
  const alerts = useAlertStore(selectAlerts);
  const refreshAtms = useAtmStore((state) => state.refresh);
  const refreshTickets = useTicketStore((state) => state.refresh);
  const refreshAlerts = useAlertStore((state) => state.refresh);

  useEffect(() => {
    // Refresh data on mount
    refreshAtms();
    refreshTickets();
    refreshAlerts();
  }, [refreshAtms, refreshTickets, refreshAlerts]);

  const uptime =
    Array.isArray(atms) && atms.length ? calculateNetworkUptime(atms) : 0;
  const mttr =
    Array.isArray(tickets) && tickets.length ? calculateMTTR(tickets) : 0;

  const onlineAtms = atms?.filter((a) => a.status === "ONLINE").length; //toString
  const totalAtms = atms?.length;
  const activeTickets = tickets?.filter(
    (t) => t.status !== "RESOLVED" && t.status !== "CLOSED"
  ).length;

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${Math.round(minutes)}m`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
  };

  return (
    <>
  <Filters />

  <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
    {/* === TOP KPI ROW === */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
      <KpiCard title="Active ATMs" value={`${onlineAtms}/${totalAtms}`} />
      <KpiCard title="Network Uptime" value={`${uptime}%`} />
      <KpiCard title="Active Tickets" value={activeTickets || 0} />
      <KpiCard title="MTTR" value={formatTime(mttr)} />
      <KpiCard title="SLA Compliance" value="98.2%" />
      <KpiCard title="Fraud Alerts" value="3" />
    </div>

    {/* === HERO SECTION: Cash Availability + Mini Stats === */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Key Performance Charts */}
      <div className="space-y-6">
        <AtmNetworkUptime />
        <IncidentBreakdown />
        
      </div>

      {/* Right Column: CASH AVAILABILITY HERO + Mini Stats (no extra gap) */}
      <div className="h-fit space-y-4">
        <CashAvailability />
        <AtmDowntimeByRegion />

      </div>
    </div>

    {/* === ROW: Regional & Cost === */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <RegionalPerformance />
      <TotalCostOfOperations />
    </div>

    {/* === ROW: Fraud + Replenishment === */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FraudDetectionRate />
      <CashReplenishmentTime />
    </div>

    {/* === ROW: Volume + Faults === */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TopAtmsByVolume />
      <RecurringFaults />
    </div>

    {/* === BOTTOM: Activity + Leaderboard === */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
        <ActivityChart />
      </div>
      <div className="space-y-6">
        <TopicList />
        <Leaderboard />
      </div>
    </div>
  </div>
</>
  );
}

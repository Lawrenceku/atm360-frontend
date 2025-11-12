"use client";

import Sidebar from "@/components/ops/Sidebar";
import { TopNav } from "@/components/ops/TopNav";
import { AlertList } from "@/components/ops/AlertList";

export default function AlertsPage() {
  return (
    <div className="flex-1 p-4">
      <div
        data-guide="alert-list"
        className="bg-white rounded-lg shadow-sm border border-zenith-neutral-200 overflow-hidden h-full flex flex-col"
      >
        <AlertList />
      </div>
    </div>
  );
}

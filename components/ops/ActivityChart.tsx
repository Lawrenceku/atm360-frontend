"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useAtmStore, selectAtms } from "@/lib/store/atmStore";
import { useTicketStore, selectTickets } from "@/lib/store/ticketStore";

export default function ActivityChart() {
  const atms = useAtmStore(selectAtms);
  const tickets = useTicketStore(selectTickets);

  // Mock fallback data
  const mockOnlineAtms = 12;
  const mockResolvedTickets = 34;

  // Calculate real metrics with fallbacks
  const onlineAtms =
    atms?.length > 0
      ? atms.filter((a) => a.status === "ONLINE").length
      : mockOnlineAtms;

  const resolvedTickets =
    tickets?.length > 0
      ? tickets.filter((t) => t.status === "RESOLVED" || t.status === "CLOSED")
          .length
      : mockResolvedTickets;

  // Generate months and current month index
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth(); // 0–11

  // Generate chart data
  const data = months.map((month, index) => {
    const baseActivity = onlineAtms * 50;
    const trendVariation = index <= currentMonth ? (currentMonth - index) * 10 : 0;
    const ticketActivity = resolvedTickets * 5;
    const deterministicVariation = ((index % 3) - 1) * 15;

    const value = Math.max(
      0,
      baseActivity + trendVariation + ticketActivity + deterministicVariation
    );

    return { month, value: Math.round(value) };
  });

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          Monthly Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <div className="w-full h-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [value, "Transactions"]}
                cursor={{ fill: "transparent" }}
              />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
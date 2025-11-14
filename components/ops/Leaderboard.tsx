"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

const techs = [
  { name: "Adebayo Adekunle", points: 637, change: "up" },
  { name: "Tunde Bakare", points: 637, change: "down" },
  { name: "Emeka Okafor", points: 637, change: "up" },
  { name: "Musa Danjuma", points: 637, change: "down" },
];

const branches = [
  { name: "Zenith-Surulere", percent: 97, change: "up" },
  { name: "Zenith-Ikoyi", percent: 95, change: "down" },
  { name: "Zenith-VI", percent: 87, change: "up" },
  { name: "Zenith-Lekki", percent: 82, change: "down" },
];

export default function Leaderboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Technicians</CardTitle>
        </CardHeader>
        <CardContent>
          {techs.map((t, i) => (
            <div
              key={t.name}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.points} Points
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {i + 1}
                  {i === 0 && " Gold"}
                  {i === 1 && " Silver"}
                  {i === 2 && " Bronze"}
                </Badge>
                {t.change === "up" ? (
                  <ArrowUp className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Branches</CardTitle>
        </CardHeader>
        <CardContent>
          {branches.map((b, i) => (
            <div
              key={b.name}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="font-medium">{b.name}</p>
                <p className="text-sm text-muted-foreground">
                  {b.percent}% Uptime
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {i + 1}
                </Badge>
                {b.change === "up" ? (
                  <ArrowUp className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

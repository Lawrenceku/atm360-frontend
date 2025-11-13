// components/ops/AtmList.tsx
"use client";

import { useAtmStore, selectAtms } from "@/lib/store/atmStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";

export function AtmList() {
  const atms = useAtmStore(selectAtms);

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "ONLINE": return "default";       // green
      case "MAINTENANCE": return "secondary"; // gray/yellow
      case "OFFLINE": return "destructive";   // red
      default: return "outline";
    }
  };

  const getStatusText = (status: string) => status;

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-4">
        {atms.map((atm) => (
          <Card key={atm.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold line-clamp-1">
                  {atm.location.branchName}
                </CardTitle>
                <Badge variant={getStatusVariant(atm.status)}>
                  {getStatusText(atm.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="text-muted-foreground">
                {atm.location.address}
              </p>

              {atm.predictiveScore?.failureRisk != null && (
                <div className="flex items-center gap-1 text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">
                    Failure Risk: {(atm.predictiveScore.failureRisk * 100).toFixed(0)}%
                  </span>
                </div>
              )}

              {atm.telemetry?.errorCodes && atm.telemetry.errorCodes.length > 0 && (
                <details className="mt-2">
                  <summary className="text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground">
                    {atm.telemetry.errorCodes.length} Error Code(s)
                  </summary>
                  <ul className="mt-1 ml-4 list-disc text-xs text-muted-foreground">
                    {atm.telemetry.errorCodes.map((code, i) => (
                      <li key={i}>{code}</li>
                    ))}
                  </ul>
                </details>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
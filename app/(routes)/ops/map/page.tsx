"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtmMap } from "@/components/ops/AtmMap";
import { AtmList } from "@/components/ops/AtmList";
import { MapPin, List } from "lucide-react";

export default function MapPage() {
  return (
    <div
      data-guide="atm-map"
      className=" rounded-lg shadow-sm  overflow-hidden h-full flex flex-col"
    >
      <Tabs defaultValue="map" className="flex flex-col h-full">
        {/* Tab Headers */}
        <TabsList className="grid w-lg mx-auto grid-cols-2 rounded-none ">
          <TabsTrigger value="map" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Map
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            List
          </TabsTrigger>
        </TabsList>

        {/* Map View */}
        <TabsContent value="map" className="flex-1 m-0 p-0">
          <AtmMap />
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="flex-1 m-0 p-0">
          <AtmList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
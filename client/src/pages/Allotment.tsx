import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Overview, Analytics } from "@/components";
import { Bike, Car, Truck } from "lucide-react";

const Allotment = () => {
  return (
    <Tabs defaultValue="cars" className="space-y-4">
      <TabsList>
        <TabsTrigger value="cars">
          <Car className="w-6 h-6 mr-2" />
          Cars
        </TabsTrigger>
        <TabsTrigger value="bikes">
          <Bike className="w-6 h-6 mr-2" />
          Bikes
        </TabsTrigger>
        <TabsTrigger value="trucks" disabled>
          <Truck className="w-6 h-6 mr-2" />
          Trucks
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cars" className="space-y-4">
        <Overview />
      </TabsContent>
      <TabsContent value="bikes">
        <Analytics />
      </TabsContent>
    </Tabs>
  );
};

export default Allotment;

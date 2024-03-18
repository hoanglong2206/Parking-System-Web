import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bike, Car, Truck } from "lucide-react";
import { CarSlotList } from "@/components";

const data = [
  {
    areId: "1",
    areName: "A",
    slots: 6,
  },
  {
    areId: "2",
    areName: "B",
    slots: 6,
  },
  {
    areId: "3",
    areName: "C",
    slots: 6,
  },
  {
    areId: "4",
    areName: "D",
    slots: 6,
  },
];

const Allotment = () => {
  return (
    <Tabs defaultValue="cars" className="space-y-4">
      <TabsList>
        <TabsTrigger value="cars">
          <Car className="w-6 h-6 mr-2" />
          Cars
        </TabsTrigger>
        <TabsTrigger value="bikes" disabled>
          <Bike className="w-6 h-6 mr-2" />
          Bikes
        </TabsTrigger>
        <TabsTrigger value="trucks" disabled>
          <Truck className="w-6 h-6 mr-2" />
          Trucks
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cars">
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {data.map((area, index) => (
            <CarSlotList
              key={index}
              areaId={area.areId}
              areaName={area.areName}
              slots={area.slots}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Allotment;

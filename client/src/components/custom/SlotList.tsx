import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bike, Car, Trash2, Truck } from "lucide-react";
import { CarSlotList } from "@/components";
import { Button } from "@/components/ui/button";
import { Slot } from "@/interfaces";
import customAxios from "@/utils/customAxios";
import { toast } from "react-toastify";
import { useNavigate, NavigateFunction } from "react-router-dom";

interface SlotListProps {
  carData: Slot[];
}

const SlotList = ({ carData }: SlotListProps) => {
  const navigate: NavigateFunction = useNavigate();

  const handleDeleteArea = async () => {
    try {
      const response = await customAxios.delete(`/area/${carData[0].area.id}`);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        navigate("/app/admin/allotment/1/");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Tabs defaultValue="cars" className="space-y-4">
      <div className="flex items-center justify-between">
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
        <Button
          onClick={handleDeleteArea}
          variant={"destructive"}
          size={"icon"}
          className="flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
      <TabsContent value="cars">
        <div className="overflow-x-auto">
          <CarSlotList data={carData} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SlotList;

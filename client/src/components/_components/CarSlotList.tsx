import { Separator } from "@/components/ui/separator";
import CarSlotItem from "./CarSlotItem";

interface CarSlotListProps {
  areaId: string;
  areaName: string;
  slots: number;
}

type Status = { status: "empty" | "parked" | "reserved" };

const data: Status[] = [
  {
    status: "empty",
  },
  {
    status: "parked",
  },
  {
    status: "reserved",
  },
  {
    status: "parked",
  },
  {
    status: "empty",
  },
  {
    status: "parked",
  },
];

const CarSlotList = ({ areaId, areaName, slots }: CarSlotListProps) => {
  return (
    <div className="w-[188px] space-y-1">
      <h1 className="text-xl font-semibold text-center">{areaName}</h1>
      {Array.from({ length: slots / 2 }, (_, index) => (
        <>
          <Separator />
          <div className="flex h-[68px] items-center flex-wrap gap-x-2">
            <CarSlotItem
              slotName={areaName + (index + 1)}
              status={data[index].status}
              isFront
            />
            <Separator orientation="vertical" />
            <CarSlotItem
              slotName={areaName + (index + slots / 2 + 1)}
              status={data[index + slots / 2].status}
            />
          </div>
        </>
      ))}
      <Separator />
    </div>
  );
};

export default CarSlotList;

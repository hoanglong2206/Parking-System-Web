import { frontCar, backCar } from "@/assets/car";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { Button } from "../ui/button";

interface CarSlotItemProps {
  //   slotId: string;
  slotName: string;
  status: "empty" | "parked" | "reserved";
  isFront?: boolean;
}

const CarSlotItem = ({ slotName, status, isFront }: CarSlotItemProps) => {
  const navigate: NavigateFunction = useNavigate();
  const handleClick = () => {
    navigate("/app/admin/allotment/info-car-slot");
  };
  return (
    <Button
      variant={"ghost"}
      onClick={handleClick}
      disabled={status === "empty"}
      className={`flex  items-center justify-center w-[85px] h-[65px] rounded-lg ${
        status === "reserved"
          ? "bg-yellow-300 hover:bg-yellow-400"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {status === "parked" ? (
        <img src={isFront ? frontCar : backCar} width={80} alt="" />
      ) : (
        <p>{slotName}</p>
      )}
    </Button>
  );
};

export default CarSlotItem;

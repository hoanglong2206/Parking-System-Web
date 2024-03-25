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
      className={`flex p-0 items-center justify-center w-[85px] h-[65px] rounded-lg ${
        status === "reserved"
          ? "bg-emerald-400 hover:bg-emerald-500"
          : "bg-gray-200 hover:bg-gray-300 "
      }  ${status === "empty" ? "disabled:opacity-70" : "r"}`}
    >
      {status === "parked" ? (
        <img src={isFront ? frontCar : backCar} width={80} alt="" />
      ) : (
        <p
          className={`${
            status === "empty"
              ? "text-gray-500"
              : "text-gray-200 dark:text-gray-700"
          }`}
        >
          {slotName}
        </p>
      )}
    </Button>
  );
};

export default CarSlotItem;

import { ManagementTable, Management as ParkingManagement } from "@/components";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Parking } from "@/interfaces";
import customAxios from "@/utils/customAxios";
import { useEffect, useState } from "react";
const Management = () => {
  const [data, setData] = useState<ParkingManagement[]>([]);

  useEffect(() => {
    const fetchManagement = async () => {
      try {
        const parkings: ParkingManagement[] = [];
        const res = await customAxios.get("/parking/");
        res.data.parkings.map((parking: Parking) => {
          parkings.push(parking);
        });

        setData(parkings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchManagement();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Management</CardTitle>
        <CardDescription>Overview of all transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <ManagementTable data={data} />
      </CardContent>
    </Card>
  );
};

export default Management;

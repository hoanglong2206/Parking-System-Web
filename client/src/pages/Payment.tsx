import { PaymentTable } from "@/components";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";

const Payment = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>
            You made a total of $10,000 in sales this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default Payment;

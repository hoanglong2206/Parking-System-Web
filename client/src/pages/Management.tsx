import { ManagementTable } from "@/components";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
const Management = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Management</CardTitle>
        <CardDescription>Overview of all transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <ManagementTable />
      </CardContent>
    </Card>
  );
};

export default Management;

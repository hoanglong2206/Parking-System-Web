import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Home,
  Login,
  Register,
  Payment,
  UserManagement,
  Allotment,
  Equipments,
  NotFound,
} from "@/pages";
import { AdminLayout } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="app/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="allotment" element={<Allotment />} />
        <Route path="payment" element={<Payment />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="equipment" element={<Equipments />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

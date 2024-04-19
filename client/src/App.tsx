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
  ProfileAdmin,
  Messages,
  Settings,
  NotFound,
  InfoCarSlot,
} from "@/pages";
import { AdminLayout, DefaultLayout } from "@/layouts";
import { AdminProtect } from "@/routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>
      <Route
        path="app/admin"
        element={
          <AdminProtect>
            <AdminLayout />
          </AdminProtect>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="allotment" element={<Allotment />} />
        <Route path="allotment/info-car-slot" element={<InfoCarSlot />} />

        <Route path="payment" element={<Payment />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="equipment" element={<Equipments />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<ProfileAdmin />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

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
  Bookings,
  ProfileUser,
  SettingsUser,
  Blog,
  Parking,
  BlogManagement,
} from "@/pages";
import { AdminLayout, DefaultLayout, UserLayout } from "@/layouts";
import { AdminProtect, UserProtect } from "@/routes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/context/store/store";
import { useEffect } from "react";
import { logout } from "@/context/slices/auth";
import { Button } from "./components/ui/button";
import { MessageSquare } from "lucide-react";

function App() {
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const cookieExpire = user.timeExpire;
      const now = new Date().getTime();
      if (user.timeExpire && cookieExpire - now <= 0) {
        dispatch(logout());
        window.location.reload();
      }
    };
    const interval = setInterval(checkTokenExpiration, 1000);
    return () => clearInterval(interval);
  }, [user, dispatch]);
  return (
    <>
      {(!user.token || user.user.role === "user") && (
        <Button
          className="fixed bottom-4 right-4 rounded-full h-11 w-11 flex items-center justify-center z-999 shadow-md"
          variant={"outline"}
          size={"icon"}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/parking" element={<Parking />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route
            path="/account"
            element={
              <UserProtect>
                <UserLayout />
              </UserProtect>
            }
          >
            <Route index element={<ProfileUser />} />
            <Route path="settings" element={<SettingsUser />} />
            <Route path="bookings" element={<Bookings />} />
          </Route>
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
          <Route path="customer" element={<UserManagement />} />
          <Route path="blog" element={<BlogManagement />} />
          <Route path="equipment" element={<Equipments />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<ProfileAdmin />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

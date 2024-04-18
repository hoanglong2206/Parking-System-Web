import { useRef, useEffect, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  ChevronLeft,
  CircleParking,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Shapes,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Icons } from "@/utils/icon";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const handleResize = useCallback(() => {
    if (window.innerWidth > 1024) setSidebarOpen(false);
  }, [setSidebarOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute shadow-lg left-0 top-0 z-999 bg-background flex h-screen w-72 flex-col overflow-y-hidden duration-150 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-4 lg:px-6 py-5 lg:py-6">
        <Link to="#">
          <div className="hover:opacity-75 transition flex justify-center items-center gap-x-2 ">
            <Icons.logo className="w-8 h-8" />
            <p className="text-lg pb-1 font-medium">Demo App</p>
          </div>
        </Link>

        <Button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          size="icon"
          variant="ghost"
          className="flex items-center justify-center lg:hidden"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="no-scrollbar flex-1 flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="py-4 px-3 lg:px-5">
          <ul className="mt-4 mb-5 flex flex-col gap-2">
            <li>
              <NavLink
                to="/app/admin"
                className={`flex items-center gap-2.5 rounded-sm py-1.5 px-4 font-medium  hover:bg-neutral-500/10 duration-75 ease-in-out  ${
                  pathname === "/app/admin" && "bg-neutral-500/10"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/admin/allotment"
                className={`flex items-center gap-2.5 rounded-sm py-1.5 px-4 font-medium  hover:bg-neutral-500/10 duration-75 ease-in-out  ${
                  pathname.includes("allotment") && "bg-neutral-500/10"
                }`}
              >
                <CircleParking className="w-5 h-5" />
                Allotment
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/app/admin/user-management"
                className={`flex items-center gap-2.5 rounded-sm py-1.5 px-4 font-medium  hover:bg-neutral-500/10 duration-75 ease-in-out  ${
                  pathname.includes("user-management") && "bg-neutral-500/10"
                }`}
              >
                <UsersRound className="w-5 h-5" />
                User Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/admin/payment"
                className={`flex items-center gap-2.5 rounded-sm py-1.5 px-4 font-medium  hover:bg-neutral-500/10 duration-75 ease-in-out  ${
                  pathname.includes("payment") && "bg-neutral-500/10"
                }`}
              >
                <Banknote className="w-5 h-5" />
                Payment
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/admin/equipment"
                className={`flex items-center gap-2.5 rounded-sm py-1.5 px-4 font-medium  hover:bg-neutral-500/10 duration-75 ease-in-out  ${
                  pathname.includes("equipment") && "bg-neutral-500/10"
                }`}
              >
                <Shapes className="w-5 h-5" />
                Equipments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/admin/messages"
                className={`flex items-center gap-2.5 rounded-sm py-1.5 px-4 font-medium  hover:bg-neutral-500/10 duration-75 ease-in-out  ${
                  pathname.includes("messages") && "bg-neutral-500/10"
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                Messages
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="py-4 px-3 lg:px-5">
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink
              to="/app/admin/profile"
              className={`flex items-center gap-2.5 rounded-sm py-1.5 px-4 font-medium  hover:bg-neutral-500/10 duration-75 ease-in-out  ${
                pathname.includes("profile") && "bg-neutral-500/10"
              }`}
            >
              <UserRound className="w-5 h-5" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/admin/settings"
              className={`flex items-center gap-2.5 rounded-sm py-1.5 px-4 font-medium hover:bg-neutral-500/10 duration-75 ease-in-out  ${
                pathname.includes("settings") && "bg-neutral-500/10"
              }`}
            >
              <Settings className="w-5 h-5" />
              Settings
            </NavLink>
          </li>
          <li>
            <Button
              className="w-full flex items-center justify-start gap-2.5 rounded-sm py-1.5 px-4 font-medium  hover:bg-neutral-500/10 duration-75 ease-in-out"
              variant="ghost"
              size="sm"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotebookTabs, Settings, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/context/store/store";
import customAxios from "@/utils/customAxios";
import { hideLoader, showLoader } from "@/context/slices/loader";
import { logout } from "@/context/slices/auth";

const DropdownUser = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(showLoader());
      const res = await customAxios.get("/user/logout");
      dispatch(hideLoader());
      if (res.data.status === "success") {
        dispatch(logout());
      }
    } catch (error: any) {
      dispatch(hideLoader());
      console.log(error.response.data.message);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-4 outline-none">
        <span className="hidden text-right lg:block">
          <span className="block text-base font-medium text-black dark:text-white">
            {user.username}
          </span>
          <span className="block text-xs">{user.role}</span>
        </span>

        <Avatar className="border border-slate-300 dark:border-slate-700">
          <AvatarImage src={user.photo} alt="Avatar" className="rounded-full" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-999 w-52" align="end">
        <DropdownMenuLabel className="text-base">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem>
            <Link to="profile" className="flex items-center gap-2.5">
              <User2 className="w-5 h-5" />
              <span className="text-base font-medium text-black dark:text-white">
                Profile
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="#" className="flex items-center gap-2.5">
              <NotebookTabs className="w-5 h-5" />
              <span className="text-base font-medium text-black dark:text-white">
                Contacts
              </span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link to="settings" className="flex items-center gap-2.5">
              <Settings className="w-5 h-5" />
              <span className="text-base font-medium text-black dark:text-white">
                Settings
              </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-base font-medium text-black dark:text-white"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;

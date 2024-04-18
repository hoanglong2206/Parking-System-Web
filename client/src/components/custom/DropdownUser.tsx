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
import logo from "@/assets/react.svg";
import { NotebookTabs, Settings, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const DropdownUser = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-4 outline-none">
        <span className="hidden text-right lg:block">
          <span className="block text-base font-medium text-black dark:text-white">
            John Doe
          </span>
          <span className="block text-xs">UX Designer</span>
        </span>

        <Avatar className="p-1 border border-slate-200 dark:border-slate-700">
          <AvatarImage src={logo} alt="Avatar" />
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
        <DropdownMenuItem className="text-base font-medium text-black dark:text-white">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;

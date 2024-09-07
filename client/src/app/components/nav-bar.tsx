"use client";

import { Bell, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsSidebarCollapsed } from "../../state";

// Define the types for the props
interface IconButtonProps {
  Icon: React.ElementType;
  onClick: () => void;
}

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <Button variant="outline" size="icon" onClick={toggleDarkMode}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>

          <div className="relative rounded-lg">
            <Button variant="outline" size="icon" onClick={() => {}}>
              <Bell className="h-4 w-4" />
            </Button>
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              2
            </span>
          </div>

          <Link href="/settings">
            <Button variant="outline" size="icon" onClick={() => {}}>
              <Settings className="h-4 w-4 cursor-pointer" />
            </Button>
          </Link>
        </div>

        <Avatar className="cursor-pointer">
          <AvatarFallback className="hover:bg-primary-foreground">
            JE
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default NavBar;

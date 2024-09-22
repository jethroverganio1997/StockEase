"use client";

import { Bell, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAppDispatch, useAppSelector } from "../../state/redux";
import { setIsSidebarCollapsed } from "../../state";
import { SheetMenu } from "./sheet-menu";
import { usePathname } from "next/navigation";
import path from "path";

// Define the types for the props
interface IconButtonProps {
  Icon: React.ElementType;
  onClick: () => void;
}

const NavBar = () => {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const pathname = usePathname();
  const name = pathname.split("/")[1].charAt(0).toUpperCase() + pathname.split("/")[1].slice(1);
  const username = useAppSelector((state) => state.user.user?.name?.charAt(0).toUpperCase());

  return (
    <div className="mb-6 flex w-full items-center justify-between">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-between gap-5">
        <SheetMenu />
        <h2 className="text-2xl font-semibold tracking-tight">
          {name}
        </h2>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-between gap-5">
        <div className="hidden items-center justify-between gap-5 md:flex">
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
            <span className="absolute -right-2 -top-2 inline-flex items-center justify-center rounded-full bg-red-400 px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100">
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
            {username}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default NavBar;

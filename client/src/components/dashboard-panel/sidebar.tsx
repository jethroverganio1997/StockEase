'use client'

import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/dashboard-panel/menu";
import { SidebarToggle } from "@/components/dashboard-panel/sidebar-toggle";
import { useAppDispatch, useAppSelector } from "../../state/redux";
import { setIsSidebarCollapsed } from "../../state";

export function Sidebar() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!sidebarOpen));
  };

  //   if(!sidebarOpen) return null;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out md:translate-x-0",
        sidebarOpen ? "w-72" : "w-[90px]",
      )}
    >
      <SidebarToggle isOpen={sidebarOpen} setIsOpen={toggleSidebar} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-[20px] shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "mb-1 transition-transform duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "translate-x-1",
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <PanelsTopLeft className="mr-1 h-6 w-6" />
            <h1
              className={cn(
                "whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
                sidebarOpen
                  ? "translate-x-0 opacity-100"
                  : "hidden -translate-x-96 opacity-0",
              )}
            >
              Brand
            </h1>
          </Link>
        </Button>
        <Menu isOpen={sidebarOpen} />
      </div>
    </aside>
  );
}

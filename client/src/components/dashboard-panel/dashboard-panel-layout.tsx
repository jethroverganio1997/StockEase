"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard-panel/sidebar";
import Navbar from "@/components/dashboard-panel/nav-bar";
import state, { setIsSidebarCollapsed } from "../../state";
import { useAppDispatch, useAppSelector } from "../../app/redux";

export default function DashboardPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarOpen = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main
        className={cn(
          "flex h-full w-full flex-col px-9 py-5 transition-[padding-left] duration-300 ease-in-out",
          sidebarOpen ? "md:pl-[320px]" : "md:pl-32",
        )}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
}

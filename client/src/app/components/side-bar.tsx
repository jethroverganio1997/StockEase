"use client";

import {
  Archive,
  ChartNoAxesCombined,
  Layout,
  LucideIcon,
  Menu,
  ScrollText,
  ShoppingCart,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsSidebarCollapsed } from "../../state";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../../components/ui/button";

const sidebarLinks: SidebarLinkProps[] = [
  {
    href: "/dashboard",
    icon: Layout,
    label: "Dashboard",
    isCollapsed: false,
  },
  {
    href: "/inventory",
    icon: Archive,
    label: "Inventory",
    isCollapsed: false,
  },
  {
    href: "/sales",
    icon: ChartNoAxesCombined,
    label: "Sales",
    isCollapsed: false,
  },
  {
    href: "/order",
    icon: ShoppingCart,
    label: "Order",
    isCollapsed: false,
  },
  {
    href: "/report",
    icon: ScrollText,
    label: "Report",
    isCollapsed: false,
  },
];

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-background hover:bg-primary-foreground gap-3 transition-colors ${
          isActive ? "bg-background text-foreground" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-foreground" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-foreground`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const SideBar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    <div
      className={`fixed flex flex-col ${
        isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
      } h-full bg-secondary transition-all duration-300 overflow-hidden ease-in-out z-40`}
    >
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-center items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <h1
          className={`font-extrabold text-2xl ${
            isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          JEETOCKS
        </h1>
        <Button
          className="md:hidden hover:bg-accent"
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        {sidebarLinks.map((link, index) => (
          <SidebarLink
            key={index}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-foreground">&copy; 2024</p>
      </div>
    </div>
  );
};

export default SideBar;

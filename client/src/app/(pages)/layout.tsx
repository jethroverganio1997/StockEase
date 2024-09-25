"use client";

import React from "react";
import StoreProvider from "@/app/redux";
import DashboardPanelLayout from "@/components/dashboard-panel/dashboard-panel-layout";
import { ThemeProvider } from "@/components/ui/theme-provider";
import UserProvider from "../../features/auth/components/user-provider";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>
        <UserProvider>
            <DashboardPanelLayout>{children}</DashboardPanelLayout>
        </UserProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}

'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import StoreProvider from "../../state/redux";
import DashboardPanelLayout from "../../components/dashboard-panel/dashboard-panel-layout";
import { ThemeProvider } from "../../components/ui/theme-provider";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <DashboardPanelLayout>{children}</DashboardPanelLayout>
        </QueryClientProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}

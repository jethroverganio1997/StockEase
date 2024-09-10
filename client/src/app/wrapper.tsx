'use client'

import DashboardPanelLayout from "../components/dashboard-panel/dashboard-panel-layout";
import StoreProvider from "../state/redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();

    return (
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
        <DashboardPanelLayout>{children}</DashboardPanelLayout>
        </QueryClientProvider>
      </StoreProvider>
    );
  };

  export default DashboardWrapper;
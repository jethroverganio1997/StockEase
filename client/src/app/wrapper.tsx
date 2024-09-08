'use client'

import DashboardPanelLayout from "../components/dashboard-panel/dashboard-panel-layout";
import StoreProvider from "../state/redux";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <StoreProvider>
        <DashboardPanelLayout>{children}</DashboardPanelLayout>
      </StoreProvider>
    );
  };

  export default DashboardWrapper;
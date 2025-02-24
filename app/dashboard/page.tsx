"use client"

import { AppSidebar } from "@/components/nav/app-sidebar"
import { SiteHeader } from "@/components/nav/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Stock from "./admin/stock";
import MagicScrapper from "./scrapper/magic-scrapper";
import { useState } from "react";
import withAuth from "@/lib/with-auth";

const Dashboard = () => {

  const [currentComponent, setCurrentComponent] = useState("MagicScrapper");

  const renderComponent = () => {
    switch (currentComponent) {
      case "MagicScrapper":
        return <MagicScrapper />;
      case "Stock":
        return <Stock />
      default:
        return <MagicScrapper />;
    }
  };
  
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar handleClick={setCurrentComponent} />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              {renderComponent()}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
export default withAuth(Dashboard);
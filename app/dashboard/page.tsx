"use client"

import { AppSidebar } from "@/components/nav/app-sidebar"
import { SiteHeader } from "@/components/nav/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Stock from "./admin/stock";
import MagicScrapper from "./scrapper/magic-scrapper";
import { useState, useEffect } from "react";
import withAuth from "@/lib/with-auth";

const Dashboard = () => {
  // Define o estado inicial com base na hash da URL
  const [currentComponent, setCurrentComponent] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return hash === "stock" ? "Stock" : "MagicScrapper";
  });

  // Atualiza a URL quando o componente muda
  useEffect(() => {
    const hash = currentComponent === "MagicScrapper" ? "scrapper" : "stock";
    window.location.hash = hash;
  }, [currentComponent]);

  // Reage às mudanças na hash da URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "scrapper" || hash === "stock") {
        setCurrentComponent(hash === "scrapper" ? "MagicScrapper" : "Stock");
      }
    };

    // Adiciona o listener para o evento hashchange
    window.addEventListener("hashchange", handleHashChange);

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const renderComponent = () => {
    switch (currentComponent) {
      case "MagicScrapper":
        return <MagicScrapper />;
      case "Stock":
        return <Stock />;
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
  );
};

export default withAuth(Dashboard);
import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SubscriptionSummary } from "@/components/dashboard/SubscriptionSummary";
import { ClientsDataTable } from "@/components/dashboard/ClientsDataTable";
import { AnalyticsWidgets } from "@/components/dashboard/AnalyticsWidgets";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState("dashboard");

  const renderMainContent = () => {
    switch (selectedView) {
      case "plans":
        return <ClientsDataTable type="plans" />;
      case "clients":
        return <ClientsDataTable type="clients" />;
      case "reports":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Reports & Analytics</h2>
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <p className="text-muted-foreground">Reports module coming soon...</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Settings</h2>
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return (
          <>
            <AnalyticsWidgets />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Recent Activity</h2>
              <ClientsDataTable type="dashboard" />
            </div>
          </>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar 
          selectedView={selectedView} 
          onViewChange={setSelectedView} 
        />
        
        <div className="flex-1 flex flex-col">
          <SubscriptionSummary />
          
          <main className="flex-1 bg-muted/20">
            {renderMainContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
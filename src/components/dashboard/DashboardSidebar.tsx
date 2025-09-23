import { Building2, LayoutDashboard, FileText, Users, BarChart, Settings, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  selectedView: string;
  onViewChange: (view: string) => void;
}

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "plans", label: "Plans", icon: FileText },
  { id: "clients", label: "Clients", icon: Users },
  { id: "reports", label: "Reports", icon: BarChart },
  { id: "settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({ selectedView, onViewChange }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={`border-r border-border ${collapsed ? "w-16" : "w-64"}`}>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-foreground text-lg">PoolBuilder</h2>
              <p className="text-xs text-muted-foreground">CRM Dashboard</p>
            </div>
          )}
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onViewChange(item.id)}
                className={`w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200 ${
                  selectedView === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-muted text-sidebar-foreground hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className={`w-5 h-5 ${collapsed ? "mx-auto" : ""}`} />
                {!collapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight 
                      className={`w-4 h-4 ml-auto transition-transform ${
                        selectedView === item.id ? "rotate-90" : ""
                      }`} 
                    />
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
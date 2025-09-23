import { TrendingUp, Users, DollarSign, FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AnalyticsWidgets() {
  const analyticsData = [
    {
      title: "Active Clients",
      value: "127",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Total Revenue",
      value: "$24,890",
      change: "+8.5%",
      changeType: "positive",
      icon: DollarSign,
      description: "monthly revenue",
    },
    {
      title: "Plans Downloaded",
      value: "342",
      change: "+23%",
      changeType: "positive",
      icon: FileText,
      description: "this month",
    },
    {
      title: "Expiring Soon",
      value: "18",
      change: "-5%",
      changeType: "negative",
      icon: Calendar,
      description: "next 30 days",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Analytics Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <Card key={index} className="border border-border shadow-custom-md hover:shadow-custom-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">
                  {item.value}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <TrendingUp className={`w-3 h-3 ${
                      item.changeType === "positive" ? "text-success" : "text-destructive"
                    }`} />
                    <span className={`text-xs font-medium ${
                      item.changeType === "positive" ? "text-success" : "text-destructive"
                    }`}>
                      {item.change}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
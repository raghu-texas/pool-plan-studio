import { CreditCard, Download, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function SubscriptionSummary() {
  const summaryData = [
    {
      title: "Plan Type",
      value: "Standard",
      icon: CreditCard,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Monthly Price",
      value: "$499",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Plans Downloaded",
      value: "4/6",
      subtitle: "2 remaining",
      icon: Download,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Renewal",
      value: "20 days",
      subtitle: "Auto-renews",
      icon: Calendar,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Subscription Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryData.map((item, index) => (
            <Card key={index} className="border border-border shadow-custom-md hover:shadow-custom-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {item.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mb-1">
                      {item.value}
                    </p>
                    {item.subtitle && (
                      <p className="text-sm text-muted-foreground">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  <div className={`p-3 rounded-xl ${item.bgColor}`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
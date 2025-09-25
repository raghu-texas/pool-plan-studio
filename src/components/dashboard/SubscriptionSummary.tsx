import { CreditCard, Download, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function SubscriptionSummary() {
  const summaryData = [
    {
      title: "Plan Type",
      value: "Standard",
      icon: CreditCard,
      color: "text-white",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      cardBg: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
    },
    {
      title: "Monthly Price",
      value: "$499",
      icon: TrendingUp,
      color: "text-white",
      bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      cardBg: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200",
    },
    {
      title: "Plans Downloaded",
      value: "4/6",
      subtitle: "2 remaining",
      icon: Download,
      color: "text-white",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      cardBg: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
    },
    {
      title: "Renewal",
      value: "20 days",
      subtitle: "Auto-renews",
      icon: Calendar,
      color: "text-white",
      bgColor: "bg-gradient-to-br from-amber-500 to-amber-600",
      cardBg: "bg-gradient-to-br from-amber-50 to-amber-100",
      borderColor: "border-amber-200",
    },
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Subscription Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryData.map((item, index) => (
            <Card key={index} className={`border-2 ${item.borderColor} ${item.cardBg} shadow-custom-md hover:shadow-custom-lg hover:scale-105 transition-all duration-300 overflow-hidden`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      {item.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mb-1">
                      {item.value}
                    </p>
                    {item.subtitle && (
                      <p className="text-sm font-medium text-gray-500">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl shadow-lg ${item.bgColor}`}>
                    <item.icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                </div>
                {/* Decorative element */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${item.bgColor}`}></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
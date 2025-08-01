import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Zap } from "lucide-react";

const subscriptionTiers = [
  {
    name: "Explorer",
    price: "$19",
    period: "/month",
    description: "Perfect for homeowners planning their first pool",
    features: [
      "5 plan downloads per month",
      "Basic design variations", 
      "Email support",
      "Mobile app access"
    ],
    icon: Star,
    popular: false,
    color: "from-blue-500 to-cyan-400"
  },
  {
    name: "Professional",
    price: "$49",
    period: "/month",
    description: "Ideal for contractors and pool builders",
    features: [
      "Unlimited plan downloads",
      "All design variations",
      "Priority support",
      "CAD file formats",
      "Custom modifications",
      "Commercial license"
    ],
    icon: Crown,
    popular: true,
    color: "from-purple-500 to-pink-400"
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For design firms and large-scale operations",
    features: [
      "Everything in Professional",
      "White-label licensing",
      "API access",
      "Dedicated account manager",
      "Custom design requests",
      "Bulk licensing discounts"
    ],
    icon: Zap,
    popular: false,
    color: "from-emerald-500 to-teal-400"
  }
];

const SubscriptionBanner = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            Subscription Required for Downloads
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access our complete library of premium pool designs with flexible subscription options 
            tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptionTiers.map((tier, index) => (
            <Card 
              key={tier.name}
              className={`relative pool-card border-0 ${
                tier.popular ? 'ring-2 ring-primary shadow-glow' : 'shadow-custom-lg'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-6 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${tier.color} mb-6`}>
                  <tier.icon className="h-8 w-8 text-white" />
                </div>

                {/* Plan Details */}
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {tier.description}
                </p>

                {/* Pricing */}
                <div className="mb-8">
                  <span className="text-4xl font-bold text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground">
                    {tier.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 text-left">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  variant={tier.popular ? "hero" : "outline"} 
                  size="lg" 
                  className="w-full"
                >
                  {tier.popular ? "Start Free Trial" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Check className="h-4 w-4 text-success mr-2" />
              No setup fees
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-success mr-2" />
              Cancel anytime
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-success mr-2" />
              24/7 support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBanner;
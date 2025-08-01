import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Waves, Sparkles, Users, Zap } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Infinity Edge",
    description: "Breathtaking pools that blend seamlessly with the horizon",
    icon: Waves,
    color: "from-blue-500 to-cyan-400",
    count: "85+ Plans"
  },
  {
    id: 2,
    name: "Modern",
    description: "Clean lines and contemporary design for today's homes",
    icon: Zap,
    color: "from-purple-500 to-pink-400",
    count: "120+ Plans"
  },
  {
    id: 3,
    name: "Entertaining",
    description: "Perfect for hosting gatherings and pool parties",
    icon: Users,
    color: "from-orange-500 to-red-400",
    count: "95+ Plans"
  },
  {
    id: 4,
    name: "Spa Integration",
    description: "Luxury pools with integrated spa and wellness features",
    icon: Sparkles,
    color: "from-emerald-500 to-teal-400",
    count: "75+ Plans"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Explore by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the perfect pool style for your lifestyle. Each category features 
            professionally designed plans with detailed specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="pool-card group cursor-pointer border-0 shadow-custom-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${category.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                {/* Count Badge */}
                <div className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  {category.count}
                </div>

                {/* CTA */}
                <Button 
                  variant="ghost" 
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  Explore Plans
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
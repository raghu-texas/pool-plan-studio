import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";

// Sample pool plans data
const popularPlans = [
  {
    id: 1,
    name: "Azure Infinity",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
    tags: ["Infinity Edge", "Modern", "Luxury"],
    dimensions: "40' x 20'",
    price: "$299",
    rating: 4.9,
    reviews: 127,
    featured: true
  },
  {
    id: 2,
    name: "Resort Paradise",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    tags: ["Entertaining", "Spa", "Large"],
    dimensions: "50' x 25'",
    price: "$449",
    rating: 4.8,
    reviews: 89,
    featured: false
  },
  {
    id: 3,
    name: "Modern Zen",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    tags: ["Modern", "Minimalist", "Spa"],
    dimensions: "35' x 18'",
    price: "$199",
    rating: 4.7,
    reviews: 156,
    featured: true
  },
  {
    id: 4,
    name: "Family Fun Pool",
    image: "https://images.unsplash.com/photo-1565985050384-a5dff2a6e7c0?w=800&h=600&fit=crop",
    tags: ["Family", "Play", "Slide"],
    dimensions: "45' x 30'",
    price: "$349",
    rating: 4.9,
    reviews: 203,
    featured: false
  },
  {
    id: 5,
    name: "Tropical Escape",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=800&h=600&fit=crop",
    tags: ["Tropical", "Rock Features", "Waterfall"],
    dimensions: "38' x 22'",
    price: "$379",
    rating: 4.8,
    reviews: 94,
    featured: true
  },
  {
    id: 6,
    name: "Urban Oasis",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop",
    tags: ["Urban", "Compact", "Modern"],
    dimensions: "25' x 15'",
    price: "$159",
    rating: 4.6,
    reviews: 78,
    featured: false
  }
];

const PopularPlans = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Popular Pool Plans
            </h2>
            <p className="text-xl text-muted-foreground">
              Our most loved designs chosen by thousands of customers
            </p>
          </div>
          <Button variant="outline" size="lg" className="mt-6 md:mt-0">
            View All Plans
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularPlans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className="pool-card group border-0 shadow-custom-lg overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img 
                  src={plan.image} 
                  alt={plan.name}
                  className="w-full h-64 object-cover"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    <Button variant="secondary" size="sm" className="bg-white/90 text-primary hover:bg-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="sm" className="bg-white/90 text-primary hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Featured Badge */}
                {plan.featured && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 rounded-full px-3 py-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{plan.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {plan.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {plan.name}
                </h3>
                
                <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                  <span>{plan.dimensions}</span>
                  <span>{plan.reviews} reviews</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary">
                    {plan.price}
                  </div>
                  <Button variant="premium" size="sm" className="group">
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Plans
          </Button>
        </div>
      </div>
    </section>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default PopularPlans;
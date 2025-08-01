import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ShoppingCart, Star, Eye, Filter, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import PoolPlanDetails from "./PoolPlanDetails";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Sample pool plans data
const popularPlans = [
  {
    id: 1,
    name: "Azure Infinity",
    images: [
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566842600175-97dca489844f?w=800&h=600&fit=crop",
      "/lovable-uploads/7e723735-8f96-433a-86a9-b55034fb32f9.png"
    ],
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop", // Main image for cart
    tags: ["Infinity Edge", "Modern", "Luxury"],
    category: "Modern",
    style: "High End",
    shape: "Infinity Edge",
    function: "Entertaining",
    dimensions: "40' x 20'",
    price: "$299",
    rating: 4.9,
    reviews: 127,
    featured: true,
    specialFeatures: ["Tanning Ledge", "Water Features"]
  },
  {
    id: 2,
    name: "Resort Paradise",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571268929207-d3298a5a8b28?w=800&h=600&fit=crop",
      "/lovable-uploads/7e723735-8f96-433a-86a9-b55034fb32f9.png"
    ],
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    tags: ["Entertaining", "Spa", "Large"],
    category: "Entertaining",
    style: "High End",
    shape: "Freeform",
    function: "With Spa",
    dimensions: "50' x 25'",
    price: "$449",
    rating: 4.8,
    reviews: 89,
    featured: false,
    specialFeatures: ["Swim-up Bar", "Spa", "Rock Accents"]
  },
  {
    id: 3,
    name: "Modern Zen",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=800&h=600&fit=crop",
      "/lovable-uploads/7e723735-8f96-433a-86a9-b55034fb32f9.png"
    ],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    tags: ["Modern", "Minimalist", "Spa"],
    category: "Modern",
    style: "Modern",
    shape: "Geometric",
    function: "With Spa",
    dimensions: "35' x 18'",
    price: "$199",
    rating: 4.7,
    reviews: 156,
    featured: true,
    specialFeatures: ["Sundeck", "Minimalist Design"]
  },
  {
    id: 4,
    name: "Family Fun Pool",
    images: [
      "https://images.unsplash.com/photo-1565985050384-a5dff2a6e7c0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      "/lovable-uploads/7e723735-8f96-433a-86a9-b55034fb32f9.png"
    ],
    image: "https://images.unsplash.com/photo-1565985050384-a5dff2a6e7c0?w=800&h=600&fit=crop",
    tags: ["Family", "Play", "Slide"],
    category: "Family",
    style: "Classic",
    shape: "Freeform",
    function: "Play",
    dimensions: "45' x 30'",
    price: "$349",
    rating: 4.9,
    reviews: 203,
    featured: false,
    specialFeatures: ["Slide", "Jump Rock", "Play Area"]
  },
  {
    id: 5,
    name: "Tropical Escape",
    images: [
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571268929207-d3298a5a8b28?w=800&h=600&fit=crop",
      "/lovable-uploads/7e723735-8f96-433a-86a9-b55034fb32f9.png"
    ],
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=800&h=600&fit=crop",
    tags: ["Tropical", "Rock Features", "Waterfall"],
    category: "Tropical",
    style: "Classic",
    shape: "Freeform",
    function: "Entertaining",
    dimensions: "38' x 22'",
    price: "$379",
    rating: 4.8,
    reviews: 94,
    featured: true,
    specialFeatures: ["Waterfall", "Rock Features", "Tropical Design"]
  },
  {
    id: 6,
    name: "Urban Oasis",
    images: [
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "/lovable-uploads/7e723735-8f96-433a-86a9-b55034fb32f9.png"
    ],
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop",
    tags: ["Urban", "Compact", "Modern"],
    category: "Modern",
    style: "Simple",
    shape: "Geometric",
    function: "Without Spa",
    dimensions: "25' x 15'",
    price: "$159",
    rating: 4.6,
    reviews: 78,
    featured: false,
    specialFeatures: ["Compact Design", "Urban Style"]
  }
];

const filterOptions = {
  style: ["All Styles", "Modern", "Classic", "Simple", "High End"],
  shape: ["All Shapes", "Straight Line", "Freeform", "Geometric", "Infinity Edge"],
  function: ["All Functions", "Diving", "Play", "Entertaining", "With Spa", "Without Spa"],
  category: ["All Categories", "Modern", "Entertaining", "Family", "Tropical"],
  specialFeatures: ["All Features", "Tanning Ledge", "Sundeck", "Slide", "Swim-up Bar", "Waterfall", "Jump Rock", "Rock Accents", "Water Features"]
};

const PopularPlans = () => {
  const { addToCart } = useCart();
  const [filters, setFilters] = useState({
    style: "All Styles",
    shape: "All Shapes",
    function: "All Functions",
    category: "All Categories",
    specialFeatures: "All Features"
  });
  
  const [selectedPlan, setSelectedPlan] = useState<typeof popularPlans[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const handleViewDetails = (plan: typeof popularPlans[0]) => {
    setSelectedPlan(plan);
    setIsDetailsOpen(true);
  };

  const handleAddToCart = (plan: typeof popularPlans[0]) => {
    addToCart({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      image: plan.image
    });
    toast({
      title: "Added to Cart",
      description: `${plan.name} has been added to your cart.`,
    });
  };

  const filteredPlans = popularPlans.filter(plan => {
    return (
      (filters.style === "All Styles" || plan.style === filters.style) &&
      (filters.shape === "All Shapes" || plan.shape === filters.shape) &&
      (filters.function === "All Functions" || plan.function === filters.function) &&
      (filters.category === "All Categories" || plan.category === filters.category) &&
      (filters.specialFeatures === "All Features" || plan.specialFeatures.includes(filters.specialFeatures))
    );
  });

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover opacity-5"
          poster="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&h=1080&fit=crop"
        >
          <source src="https://videos.pexels.com/video-files/3015536/3015536-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Premium Pool Plans
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover our curated collection of luxury swimming pool designs
            </p>
          </div>
          <Button variant="hero" size="lg" className="mt-6 md:mt-0">
            View All Plans
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Quick Category Filter */}
        <div className="glass p-6 rounded-xl mb-8 backdrop-blur-md border border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold text-foreground">Explore by Category</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {filterOptions.category.map((category) => (
              <Button
                key={category}
                variant={filters.category === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, category }))}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Advanced Filters Section */}
        <div className="glass p-6 rounded-xl mb-12 backdrop-blur-md border border-white/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(filterOptions).filter(([key]) => key !== 'category').map(([filterKey, options]) => (
              <div key={filterKey} className="space-y-2">
                <label className="text-sm font-medium text-foreground capitalize">
                  {filterKey.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <Select
                  value={filters[filterKey as keyof typeof filters]}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, [filterKey]: value }))}
                >
                  <SelectTrigger className="bg-background/50 border-border/50 hover:bg-background/80 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPlans.length} of {popularPlans.length} plans
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFilters({
                style: "All Styles",
                shape: "All Shapes",
                function: "All Functions",
                category: "All Categories",
                specialFeatures: "All Features"
              })}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className="pool-card group border-0 shadow-custom-lg overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                {/* Automatic Slideshow */}
                <Carousel
                  plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
                  className="w-full"
                >
                  <CarouselContent>
                    {plan.images.map((image, imageIndex) => (
                      <CarouselItem key={imageIndex}>
                        <img 
                          src={image} 
                          alt={`${plan.name} - View ${imageIndex + 1}`}
                          className="w-full h-64 object-cover cursor-pointer transition-transform hover:scale-105"
                          onClick={() => handleViewDetails(plan)}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white" />
                </Carousel>
                
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
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground z-20">
                    Featured
                  </Badge>
                )}

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 rounded-full px-3 py-1 z-20">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{plan.rating}</span>
                </div>

                {/* Image indicator dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                  {plan.images.map((_, dotIndex) => (
                    <div 
                      key={dotIndex}
                      className="w-2 h-2 rounded-full bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  ))}
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

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-primary">
                      {plan.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {plan.category}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 group"
                      onClick={() => handleViewDetails(plan)}
                    >
                      <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      View Details
                    </Button>
                    <Button 
                      variant="premium" 
                      size="sm" 
                      className="flex-1 group"
                      onClick={() => handleAddToCart(plan)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Add to Cart
                    </Button>
                  </div>
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
        
        {/* Pool Plan Details Modal */}
        {selectedPlan && (
          <PoolPlanDetails 
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            plan={selectedPlan}
          />
        )}
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
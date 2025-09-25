import { Heart, Star, Download, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FavouritePlans() {
  const favouritePlans = [
    {
      id: 1,
      name: "Modern Infinity Pool",
      category: "Luxury",
      rating: 4.8,
      downloads: 156,
      price: "$899",
      image: "/lovable-uploads/pool-infinity.png",
      tags: ["Popular", "Premium"]
    },
    {
      id: 2,
      name: "Curved Backyard Pool",
      category: "Residential",
      rating: 4.6,
      downloads: 203,
      price: "$649",
      image: "/lovable-uploads/pool-curved.png",
      tags: ["Bestseller"]
    },
    {
      id: 3,
      name: "Rooftop Swimming Pool",
      category: "Commercial",
      rating: 4.9,
      downloads: 89,
      price: "$1,299",
      image: "/lovable-uploads/pool-rooftop.png",
      tags: ["New", "Featured"]
    },
    {
      id: 4,
      name: "Family Backyard Pool",
      category: "Residential", 
      rating: 4.7,
      downloads: 312,
      price: "$549",
      image: "/lovable-uploads/pool-backyard.png",
      tags: ["Popular"]
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Favourite Plans</h2>
        <Button variant="outline" size="sm">
          View All Favourites
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {favouritePlans.map((plan) => (
          <Card key={plan.id} className="group hover:shadow-custom-lg transition-all duration-300 border border-border">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={plan.image} 
                  alt={plan.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/90 hover:bg-white">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2 flex gap-1">
                  {plan.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-white/90 text-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground line-clamp-1">
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.category}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-foreground">{plan.rating}</span>
                  </div>
                  <span className="text-lg font-bold text-primary">{plan.price}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Download className="w-4 h-4" />
                  <span>{plan.downloads} downloads</span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
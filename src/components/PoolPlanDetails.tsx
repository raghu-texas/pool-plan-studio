import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, Download, Heart, Share2, MapPin, Ruler, Waves, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface PoolPlanDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    id: number;
    name: string;
    image: string;
    images: string[];
    tags: string[];
    category: string;
    style: string;
    shape: string;
    function: string;
    dimensions: string;
    price: string;
    rating: number;
    reviews: number;
    specialFeatures: string[];
  };
}

const PoolPlanDetails = ({ isOpen, onClose, plan }: PoolPlanDetailsProps) => {
  // Dummy detailed data with multiple pool images and dimensions
  const detailsData = {
    depth: "3' - 8'",
    poolDimensions: plan.dimensions,
    spaDimensions: "8' x 8'",
    perimeter: "130'",
    totalArea: "800 sq ft",
    volume: "24,000 gallons",
    poolImages: [
      {
        id: 1,
        src: "/lovable-uploads/4c595a9c-1b15-4f57-be89-00e8942cac7a.png",
        title: "Top View Plan",
        dimensions: "40' x 20' x 8' Deep",
        description: "Complete overhead layout with spa integration"
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1566842600175-97dca489844f?w=400&h=300&fit=crop",
        title: "Side View Profile",
        dimensions: "40' L x 8' D",
        description: "Cross-section showing depth variations"
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
        title: "3D Perspective",
        dimensions: "40' x 20' Overall",
        description: "Realistic rendering with landscaping"
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        title: "Detail Views", 
        dimensions: "Spa: 8' x 8'",
        description: "Equipment layout and plumbing details"
      }
    ],
    equipmentIncluded: [
      "Variable Speed Pump",
      "Salt Water System", 
      "LED Lighting Package",
      "Automatic Pool Cleaner",
      "Heating System"
    ],
    downloadableFiles: [
      "Complete Construction Plans",
      "Equipment Specifications",
      "Material List",
      "Installation Guide",
      "3D Renderings"
    ],
    features: [
      "Infinity Edge Design",
      "Integrated Spa",
      "Tanning Ledge",
      "Water Features",
      "Smart Controls"
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0 border-0 bg-transparent">
        {/* Cinematic Background */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop"
          >
            <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-background/90 backdrop-blur-lg"></div>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-background/80 hover:bg-background/90 text-foreground border border-border"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Content */}
        <div className="relative z-10 p-6 overflow-y-auto max-h-[90vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Multiple Pool Images with Dimensions */}
            <div className="space-y-6">
              {/* Pool Plan Images with Automatic Slideshow */}
              <div className="glass rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-accent" />
                  Pool Design Plans & Views
                </h3>
                
                {/* Main slideshow */}
                <div className="mb-6">
                  <Carousel
                    plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
                    className="w-full"
                  >
                    <CarouselContent>
                      {plan.images.map((image, imageIndex) => (
                        <CarouselItem key={imageIndex}>
                          <div className="relative group overflow-hidden rounded-lg border border-white/10">
                            <img 
                              src={image} 
                              alt={`${plan.name} - View ${imageIndex + 1}`}
                              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                              View {imageIndex + 1} of {plan.images.length}
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0" />
                    <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0" />
                  </Carousel>
                </div>

                {/* Thumbnail grid */}
                <div className="grid grid-cols-4 gap-3">
                  {plan.images.map((image, thumbIndex) => (
                    <div key={thumbIndex} className="relative group overflow-hidden rounded-lg border border-white/10 cursor-pointer">
                      <img 
                        src={image} 
                        alt={`${plan.name} thumbnail ${thumbIndex + 1}`}
                        className="w-full h-20 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Cards (Similar to reference image) */}
              <div className="grid grid-cols-3 gap-4">
                <div className="glass rounded-xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-accent mb-2">{detailsData.depth}</div>
                  <div className="text-muted-foreground text-sm">Pool Depth</div>
                </div>
                <div className="glass rounded-xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-accent mb-2">{detailsData.volume}</div>
                  <div className="text-muted-foreground text-sm">Water Volume</div>
                </div>
                <div className="glass rounded-xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-accent mb-2">{detailsData.totalArea}</div>
                  <div className="text-muted-foreground text-sm">Total Area</div>
                </div>
              </div>

              {/* Dimension Images */}
              <div className="glass rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <Ruler className="h-5 w-5 mr-2 text-accent" />
                  Technical Dimensions
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative group overflow-hidden rounded-lg border border-white/10">
                    <img 
                      src="/lovable-uploads/a50eef3c-fa7e-4aa8-aa5d-a661655a6318.png" 
                      alt="Pool cross-section and diving depth dimensions"
                      className="w-full h-auto object-contain bg-white/90 p-2"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                      Cross-Section View
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group overflow-hidden rounded-lg border border-white/10">
                      <img 
                        src="/lovable-uploads/34594a43-548a-4492-9f7b-3ec19622ab42.png" 
                        alt="Pool layout for parties with top view"
                        className="w-full h-auto object-contain bg-white/90 p-2"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        Party Layout
                      </div>
                    </div>
                    <div className="relative group overflow-hidden rounded-lg border border-white/10">
                      <img 
                        src="/lovable-uploads/f7fe7eb9-e0a8-4974-a975-aafaf35acd24.png" 
                        alt="Detailed pool measurements and dimensions"
                        className="w-full h-auto object-contain bg-white/90 p-2"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        Measurements
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Header */}
              <div className="glass rounded-xl p-6 border border-white/20">
                <DialogHeader>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {plan.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <DialogTitle className="text-3xl font-bold text-foreground mb-4">
                    {plan.name}
                  </DialogTitle>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold text-accent">
                      {plan.price}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="glass" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="glass" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </DialogHeader>
              </div>

              {/* Specifications */}
              <div className="glass rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <Ruler className="h-5 w-5 mr-2 text-accent" />
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pool Dimensions:</span>
                    <div className="text-foreground font-medium">{detailsData.poolDimensions}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Spa Dimensions:</span>
                    <div className="text-foreground font-medium">{detailsData.spaDimensions}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Perimeter:</span>
                    <div className="text-foreground font-medium">{detailsData.perimeter}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Style:</span>
                    <div className="text-foreground font-medium">{plan.style}</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="glass rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-accent" />
                  Premium Features
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {detailsData.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-foreground">
                      <Waves className="h-4 w-4 mr-2 text-accent" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="glass rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Equipment Package
                </h3>
                <div className="space-y-2">
                  {detailsData.equipmentIncluded.map((item, index) => (
                    <div key={index} className="text-foreground text-sm">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Downloads */}
              <div className="glass rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <Download className="h-5 w-5 mr-2 text-accent" />
                  Included Downloads
                </h3>
                <div className="space-y-2 mb-4">
                  {detailsData.downloadableFiles.map((file, index) => (
                    <div key={index} className="text-foreground text-sm">
                      📄 {file}
                    </div>
                  ))}
                </div>
                <Button variant="premium" className="w-full">
                  Purchase & Download Plans
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PoolPlanDetails;
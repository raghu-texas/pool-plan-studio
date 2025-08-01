import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, Download, Heart, Share2, MapPin, Ruler, Waves, Sparkles } from "lucide-react";

interface PoolPlanDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    id: number;
    name: string;
    image: string;
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
  // Dummy detailed data
  const detailsData = {
    depth: "3' - 8'",
    poolDimensions: plan.dimensions,
    spaDimensions: "8' x 8'",
    perimeter: "130'",
    totalArea: "800 sq ft",
    volume: "24,000 gallons",
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
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/70 backdrop-blur-sm"></div>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white border border-white/20"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Content */}
        <div className="relative z-10 p-6 overflow-y-auto max-h-[90vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image & Stats */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="glass rounded-xl overflow-hidden border border-white/20">
                <img 
                  src={plan.image} 
                  alt={plan.name}
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Stats Cards (Similar to reference image) */}
              <div className="grid grid-cols-3 gap-4">
                <div className="glass rounded-xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-accent mb-2">{detailsData.depth}</div>
                  <div className="text-white/80 text-sm">Pool Depth</div>
                </div>
                <div className="glass rounded-xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-accent mb-2">{detailsData.volume}</div>
                  <div className="text-white/80 text-sm">Water Volume</div>
                </div>
                <div className="glass rounded-xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-accent mb-2">{detailsData.totalArea}</div>
                  <div className="text-white/80 text-sm">Total Area</div>
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
                  <DialogTitle className="text-3xl font-bold text-white mb-4">
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
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Ruler className="h-5 w-5 mr-2 text-accent" />
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/70">Pool Dimensions:</span>
                    <div className="text-white font-medium">{detailsData.poolDimensions}</div>
                  </div>
                  <div>
                    <span className="text-white/70">Spa Dimensions:</span>
                    <div className="text-white font-medium">{detailsData.spaDimensions}</div>
                  </div>
                  <div>
                    <span className="text-white/70">Perimeter:</span>
                    <div className="text-white font-medium">{detailsData.perimeter}</div>
                  </div>
                  <div>
                    <span className="text-white/70">Style:</span>
                    <div className="text-white font-medium">{plan.style}</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="glass rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-accent" />
                  Premium Features
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {detailsData.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-white/90">
                      <Waves className="h-4 w-4 mr-2 text-accent" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="glass rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Equipment Package
                </h3>
                <div className="space-y-2">
                  {detailsData.equipmentIncluded.map((item, index) => (
                    <div key={index} className="text-white/90 text-sm">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Downloads */}
              <div className="glass rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Download className="h-5 w-5 mr-2 text-accent" />
                  Included Downloads
                </h3>
                <div className="space-y-2 mb-4">
                  {detailsData.downloadableFiles.map((file, index) => (
                    <div key={index} className="text-white/90 text-sm">
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
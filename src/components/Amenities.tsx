import { 
  Waves, 
  Thermometer, 
  Lightbulb, 
  Droplets, 
  Wind, 
  Zap,
  Shield,
  Timer,
  Flower,
  Speaker,
  Wifi,
  Camera
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const amenities = [
  {
    icon: Waves,
    title: "Water Features",
    description: "Waterfalls, fountains, and jets for enhanced relaxation"
  },
  {
    icon: Thermometer,
    title: "Heating Systems",
    description: "Year-round swimming with efficient pool heaters"
  },
  {
    icon: Lightbulb,
    title: "LED Lighting",
    description: "Color-changing underwater and landscape lighting"
  },
  {
    icon: Droplets,
    title: "Filtration Systems",
    description: "Advanced cleaning and water purification technology"
  },
  {
    icon: Wind,
    title: "Ventilation",
    description: "Proper air circulation for indoor pool areas"
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Smart controls for temperature, lighting, and chemicals"
  },
  {
    icon: Shield,
    title: "Safety Features",
    description: "Pool covers, alarms, and child safety systems"
  },
  {
    icon: Timer,
    title: "Timer Controls",
    description: "Scheduled operation for pumps and lighting systems"
  },
  {
    icon: Flower,
    title: "Landscaping",
    description: "Beautiful poolside gardens and outdoor living spaces"
  },
  {
    icon: Speaker,
    title: "Audio Systems",
    description: "Waterproof speakers for poolside entertainment"
  },
  {
    icon: Wifi,
    title: "Smart Integration",
    description: "WiFi-enabled controls for remote pool management"
  },
  {
    icon: Camera,
    title: "Security Cameras",
    description: "Monitoring systems for pool area safety and security"
  }
];

const Amenities = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Premium Pool Amenities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your pool into a luxury resort experience with our comprehensive range of amenities and features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <Card 
                key={index} 
                className="group bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {amenity.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {amenity.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-primary font-medium">✨ All amenities can be customized to your specific needs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
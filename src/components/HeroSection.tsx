import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const backgroundImages = [
    "/lovable-uploads/pool-rooftop.png",
    "/lovable-uploads/pool-backyard.png", 
    "/lovable-uploads/pool-curved.png",
    "/lovable-uploads/pool-infinity.png"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 parallax overflow-hidden">
        {backgroundImages.map((image, index) => (
          <img 
            key={index}
            src={image}
            alt={`Pool design ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 hero-overlay" />
        
        {/* Floating cinematic particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-float" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
          <div className="absolute w-1 h-1 bg-accent/30 rounded-full animate-float" style={{ top: '40%', left: '80%', animationDelay: '2s' }}></div>
          <div className="absolute w-3 h-3 bg-white/10 rounded-full animate-float" style={{ top: '60%', left: '20%', animationDelay: '4s' }}></div>
          <div className="absolute w-1.5 h-1.5 bg-accent/25 rounded-full animate-float" style={{ top: '80%', left: '70%', animationDelay: '6s' }}></div>
          <div className="absolute w-2.5 h-2.5 bg-white/15 rounded-full animate-float" style={{ top: '30%', left: '60%', animationDelay: '8s' }}></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Explore the Perfect
              <span className="block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Pool Design
              </span>
              for Your Dream
            </h1>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Discover premium, downloadable swimming pool design plans crafted by world-class designers. 
              Transform your backyard into a luxury oasis.
            </p>
          </div>

          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="xl" className="group">
              <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Browse Pool Plans
            </Button>
            <Button variant="glass" size="xl" className="group">
              <Star className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              See Subscription Options
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
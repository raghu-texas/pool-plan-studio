import { Button } from "@/components/ui/button";
import { Play, Search, Star } from "lucide-react";
import heroImage from "@/assets/hero-pool.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 parallax"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
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

          {/* Stats */}
          <div className="animate-fade-in-up grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" style={{ animationDelay: "0.6s" }}>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-white/80">Premium Designs</div>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">50K+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">25+</div>
              <div className="text-white/80">Design Categories</div>
            </div>
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
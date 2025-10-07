import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "@/components/AuthModal";
import consumerImage from "@/assets/consumer-image.jpg";
import builderImage from "@/assets/builder-image.jpg";

const PreLogin = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [flippedSide, setFlippedSide] = useState<'consumer' | 'builder' | null>(null);
  const navigate = useNavigate();

  const handleConsumerClick = () => {
    setFlippedSide('consumer');
    setTimeout(() => setShowAuthModal(true), 400);
  };

  const handleBuilderClick = () => {
    setFlippedSide('builder');
    setTimeout(() => setShowAuthModal(true), 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 flex items-center justify-center p-4 overflow-hidden">
      <div 
        className="w-full max-w-6xl h-[600px] relative"
        style={{ perspective: '2000px' }}
      >
        <div 
          className={`w-full h-full relative transition-transform duration-700 ease-out ${
            flippedSide === 'consumer' ? '[transform:rotateY(180deg)]' : 
            flippedSide === 'builder' ? '[transform:rotateY(-180deg)]' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            className="absolute inset-0 bg-card/50 backdrop-blur-sm rounded-3xl shadow-custom-lg overflow-hidden animate-fade-in"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Diagonal divider line */}
            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="0"
                  stroke="hsl(var(--primary) / 0.2)"
                  strokeWidth="2"
                  className="drop-shadow-md"
                />
              </svg>
            </div>

            {/* Consumer Section - Top Left */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 flex items-center justify-center animate-slide-in-left p-8">
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-custom-lg mb-2">
                  <img 
                    src={consumerImage} 
                    alt="Consumer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight animate-fade-in">
                  I am consumer
                </h2>
                <button
                  onClick={handleConsumerClick}
                  className="px-12 py-6 rounded-3xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground font-bold text-lg md:text-xl shadow-glow hover:shadow-custom-lg hover:scale-105 transition-all duration-500 ease-out group animate-scale-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    Consumer Login
                  </span>
                </button>
              </div>
            </div>

            {/* Builder Section - Bottom Right */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 flex items-center justify-center animate-slide-in-right p-8">
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-custom-lg mb-2">
                  <img 
                    src={builderImage} 
                    alt="Builder" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight animate-fade-in">
                  I am builder
                </h2>
                <button
                  onClick={handleBuilderClick}
                  className="px-12 py-6 rounded-3xl bg-gradient-to-br from-accent to-accent-light text-accent-foreground font-bold text-lg md:text-xl shadow-glow hover:shadow-custom-lg hover:scale-105 transition-all duration-500 ease-out group animate-scale-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    Builder Login
                  </span>
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setFlippedSide(null);
        }}
      />
    </div>
  );
};

export default PreLogin;

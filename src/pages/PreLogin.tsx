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
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center p-4 overflow-hidden">
      <div 
        className="w-full max-w-6xl h-[600px] relative"
        style={{ perspective: '2000px' }}
      >
        <div 
          className={`w-full h-full relative transition-transform duration-700 ease-out ${
            flippedSide === 'consumer' ? '[transform:rotate3d(1,1,0,180deg)]' : 
            flippedSide === 'builder' ? '[transform:rotate3d(-1,1,0,180deg)]' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            className="absolute inset-0 rounded-3xl shadow-custom-lg overflow-hidden animate-fade-in flex items-center justify-center"
            style={{ 
              backfaceVisibility: 'hidden',
              backgroundImage: 'linear-gradient(180.7deg, rgba(11,47,159,1) -28.8%, rgba(199,255,216,1) 95.4%)'
            }}
          >
            <div className="flex flex-row items-center justify-center gap-24 w-full px-8">
              {/* Consumer Container */}
              <div className="bg-card/70 backdrop-blur-md rounded-2xl shadow-custom-lg p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 animate-slide-in-left">
                <div className="flex flex-col items-center gap-6">
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

              {/* Builder Container */}
              <div className="bg-card/70 backdrop-blur-md rounded-2xl shadow-custom-lg p-8 border border-accent/20 hover:border-accent/40 transition-all duration-300 animate-slide-in-right">
                <div className="flex flex-col items-center gap-6">
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
                    className="px-12 py-6 rounded-3xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground font-bold text-lg md:text-xl shadow-glow hover:shadow-custom-lg hover:scale-105 transition-all duration-500 ease-out group animate-scale-in"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      Builder Login
                    </span>
                  </button>
                </div>
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

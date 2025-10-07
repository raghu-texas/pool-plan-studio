import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "@/components/AuthModal";

const PreLogin = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleConsumerClick = () => {
    setShowAuthModal(true);
  };

  const handleBuilderClick = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-6xl h-[600px] bg-card/50 backdrop-blur-sm rounded-3xl shadow-custom-lg relative overflow-hidden animate-fade-in">
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
        <div className="absolute top-0 left-0 w-1/2 h-1/2 flex items-center justify-center animate-slide-in-left">
          <div className="flex flex-col items-center gap-8 -mt-12 -ml-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight animate-fade-in">
              I am consumer
            </h2>
            <button
              onClick={handleConsumerClick}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary to-primary-light text-primary-foreground font-bold text-lg md:text-xl shadow-glow hover:shadow-custom-lg hover:scale-110 transition-all duration-500 ease-out flex items-center justify-center group animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="group-hover:scale-110 transition-transform duration-300">
                Consumer
                <br />
                Login
              </span>
            </button>
          </div>
        </div>

        {/* Builder Section - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 flex items-center justify-center animate-slide-in-right">
          <div className="flex flex-col items-center gap-8 -mb-12 -mr-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight animate-fade-in">
              I am builder
            </h2>
            <button
              onClick={handleBuilderClick}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-accent to-accent-light text-accent-foreground font-bold text-lg md:text-xl shadow-glow hover:shadow-custom-lg hover:scale-110 transition-all duration-500 ease-out flex items-center justify-center group animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="group-hover:scale-110 transition-transform duration-300">
                Builder
                <br />
                Login
              </span>
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default PreLogin;

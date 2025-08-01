import { useState } from 'react';
import { X } from 'lucide-react';

const FloatingAd = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 animate-slide-in-right">
      {/* Flag pole effect */}
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-accent to-accent-light"></div>
      
      {/* Main ad container */}
      <div className="relative bg-white shadow-2xl rounded-l-lg overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        {/* Ad content */}
        <div className="relative">
          <img 
            src="/lovable-uploads/c40c4b19-fe94-4f89-94b7-d5dff87b808e.png" 
            alt="Hot Home Designs Advertisement" 
            className="w-auto h-24 sm:h-32 cursor-pointer transition-transform duration-300 group-hover:scale-102"
            onClick={() => window.open('#', '_blank')}
          />
          
          {/* Flag wave effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </div>
        
        {/* Flag shadow */}
        <div className="absolute -right-2 top-2 w-2 h-full bg-black/10 rounded-r-lg transform skew-y-1"></div>
      </div>
    </div>
  );
};

export default FloatingAd;
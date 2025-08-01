import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface HoverCarouselProps {
  images: string[];
  planName: string;
  onImageClick: () => void;
}

const HoverCarousel = ({ images, planName, onImageClick }: HoverCarouselProps) => {
  const autoplayRef = useRef(Autoplay({ delay: 2000, stopOnInteraction: false, playOnInit: false }));
  
  const handleMouseEnter = () => {
    autoplayRef.current.play();
  };
  
  const handleMouseLeave = () => {
    autoplayRef.current.stop();
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Carousel
        plugins={[autoplayRef.current]}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image, imageIndex) => (
            <CarouselItem key={imageIndex}>
              <img 
                src={image} 
                alt={`${planName} - View ${imageIndex + 1}`}
                className="w-full h-64 object-cover cursor-pointer transition-transform hover:scale-105"
                onClick={onImageClick}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white" />
      </Carousel>
    </div>
  );
};

export default HoverCarousel;
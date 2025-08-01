import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Beverly Hills, CA",
    rating: 5,
    review: "Amazing pool design! The team was professional and delivered exactly what we envisioned. Our backyard has been transformed into a paradise.",
    clientPhoto: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face",
    poolType: "Infinity Pool"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Austin, TX",
    rating: 5,
    review: "Exceptional service from start to finish. The quality of work exceeded our expectations and the pool plans were very detailed and easy to follow.",
    clientPhoto: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face",
    poolType: "Lap Pool"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Miami, FL",
    rating: 5,
    review: "Best investment we ever made! The pool design perfectly fits our space and lifestyle. Highly recommend their services to anyone.",
    clientPhoto: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&crop=face",
    poolType: "Resort Style"
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Phoenix, AZ",
    rating: 5,
    review: "Outstanding attention to detail. The team guided us through every step and the final result is absolutely stunning. Worth every penny!",
    clientPhoto: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop&crop=face",
    poolType: "Modern Pool"
  },
];

const ClientReviews = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover why thousands of homeowners trust us with their dream pool projects
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic mb-4 leading-relaxed">
                        "{review.review}"
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <img 
                        src={review.clientPhoto} 
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                        <p className="text-xs text-primary font-medium">{review.poolType}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground">
            View All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
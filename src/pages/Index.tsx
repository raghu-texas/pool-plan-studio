import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import PopularPlans from "@/components/PopularPlans";
import ClientReviews from "@/components/ClientReviews";
import Amenities from "@/components/Amenities";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Top Banner Ad */}
      <AdBanner adSlot="1234567890" className="py-4 bg-gray-50/5" />
      
      <main>
        <HeroSection />
        
        
        <FeaturedCategories />
        
        
        <PopularPlans />
        
        {/* Ad between Popular Plans and Reviews */}
        <AdBanner adSlot="4567890123" className="py-6" />
        
        <ClientReviews />
        
        <Amenities />
        
        
        <SubscriptionBanner />
        
        {/* Bottom Ad before Footer */}
        <AdBanner adSlot="6789012345" className="py-6" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

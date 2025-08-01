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
        
        {/* Ad between Hero and Categories */}
        <div className="py-6 flex justify-center">
          <img 
            src="/lovable-uploads/c40c4b19-fe94-4f89-94b7-d5dff87b808e.png" 
            alt="Hot Home Designs Advertisement" 
            className="max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.open('#', '_blank')}
          />
        </div>
        
        <FeaturedCategories />
        
        {/* Ad between Categories and Popular Plans */}
        <div className="py-6 flex justify-center">
          <img 
            src="/lovable-uploads/c40c4b19-fe94-4f89-94b7-d5dff87b808e.png" 
            alt="Hot Home Designs Advertisement" 
            className="max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.open('#', '_blank')}
          />
        </div>
        
        <PopularPlans />
        
        {/* Ad between Popular Plans and Reviews */}
        <AdBanner adSlot="4567890123" className="py-6" />
        
        <ClientReviews />
        
        <Amenities />
        
        {/* Ad between Amenities and Subscription */}
        <div className="py-6 flex justify-center">
          <img 
            src="/lovable-uploads/c40c4b19-fe94-4f89-94b7-d5dff87b808e.png" 
            alt="Hot Home Designs Advertisement" 
            className="max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.open('#', '_blank')}
          />
        </div>
        
        <SubscriptionBanner />
        
        {/* Bottom Ad before Footer */}
        <AdBanner adSlot="6789012345" className="py-6" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

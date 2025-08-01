import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import PopularPlans from "@/components/PopularPlans";
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
        <AdBanner adSlot="2345678901" className="py-6" />
        
        <FeaturedCategories />
        
        {/* Ad between Categories and Popular Plans */}
        <AdBanner adSlot="3456789012" className="py-6" />
        
        <PopularPlans />
        
        {/* Ad between Popular Plans and Subscription */}
        <AdBanner adSlot="4567890123" className="py-6" />
        
        <SubscriptionBanner />
        
        {/* Bottom Ad before Footer */}
        <AdBanner adSlot="5678901234" className="py-6" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

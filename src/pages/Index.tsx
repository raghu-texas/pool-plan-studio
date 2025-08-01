import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import PopularPlans from "@/components/PopularPlans";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <PopularPlans />
        <SubscriptionBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

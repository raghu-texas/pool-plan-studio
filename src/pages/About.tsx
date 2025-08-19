import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Welcome to About
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn more about PoolDesign Premium Plans. We are dedicated to providing high-quality, innovative pool designs that transform outdoor spaces into luxurious retreats. Our team of expert designers creates plans that combine functionality with stunning aesthetics.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
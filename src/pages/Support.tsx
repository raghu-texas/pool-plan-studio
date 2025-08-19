import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Support = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Welcome to Support
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get help when you need it. Our support team is here to assist you with any questions about our pool designs, subscription plans, or technical issues. We're committed to ensuring you have the best experience possible.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
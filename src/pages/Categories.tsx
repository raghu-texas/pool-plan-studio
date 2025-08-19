import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Categories = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Welcome to Categories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore pool designs by category. Whether you're looking for residential pools, commercial designs, luxury features, or budget-friendly options, we have organized our plans to help you find exactly what you need.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
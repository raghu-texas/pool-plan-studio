import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  Search, 
  Heart,
  Crown
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CartIcon from "./CartIcon";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Browse Plans", href: "/browse-plans" },
    { name: "Categories", href: "/categories" },
    { name: "Subscriptions", href: "/subscriptions" },
    { name: "About", href: "/about" },
    { name: "Support", href: "/support" }
  ];

  const getActiveLink = () => {
    const currentPath = location.pathname;
    const activeNav = navigation.find(nav => nav.href === currentPath);
    return activeNav ? activeNav.name : (currentPath === "/" ? "Home" : "");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PoolDesign</h1>
                <p className="text-xs text-muted-foreground">Premium Plans</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center space-x-10">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`relative font-medium transition-all duration-300 hover:text-primary ${
                    getActiveLink() === item.name 
                      ? 'text-primary' 
                      : 'text-foreground hover:text-primary'
                  } after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:origin-center after:transition-all after:duration-300 ${
                    getActiveLink() === item.name 
                      ? 'after:scale-x-100' 
                      : 'after:scale-x-0 hover:after:scale-x-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hover:bg-accent/20">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hover:bg-accent/20">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <CartIcon />

            {/* User Account */}
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md rounded-lg mt-2 border border-border/20">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-300 ${
                    getActiveLink() === item.name 
                      ? 'text-primary bg-primary/10 border-l-2 border-primary' 
                      : 'text-foreground hover:text-primary hover:bg-accent/20'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2 border-t border-border/20">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
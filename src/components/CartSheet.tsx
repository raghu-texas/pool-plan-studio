import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Minus, Plus, Trash2, CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartSheetProps {
  children: React.ReactNode;
}

const CartSheet = ({ children }: CartSheetProps) => {
  const { items, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setQuantities(prev => ({ ...prev, [id]: newQuantity }));
  };

  const getItemQuantity = (id: number) => {
    return quantities[id] || items.find(item => item.id === id)?.quantity || 1;
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const quantity = getItemQuantity(item.id);
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * quantity);
    }, 0);
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout Successful!",
      description: `Order total: $${getTotalPrice().toFixed(2)}`,
    });
    clearCart();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-4xl p-0 bg-background/95 backdrop-blur-md border-l border-border/50">
        <div className="flex h-full">
          {/* Cart Items - Left Side */}
          <div className="flex-1 p-6 border-r border-border/50">
            <SheetHeader className="mb-6">
              <SheetTitle className="flex items-center gap-2 text-2xl font-bold text-foreground">
                <ShoppingCart className="h-6 w-6 text-primary" />
                Your Cart ({items.length} items)
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-2">Add some beautiful pool plans to get started</p>
                </div>
              ) : (
                items.map((item) => (
                  <Card key={item.id} className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                          <p className="text-2xl font-bold text-primary mb-2">{item.price}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">{getItemQuantity(item.id)}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, getItemQuantity(item.id) + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border/50">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="w-full text-destructive hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>
            )}
          </div>

          {/* Checkout Section - Right Side */}
          <div className="w-80 p-6 bg-card/30 backdrop-blur-md">
            <h3 className="text-xl font-bold text-foreground mb-6">Checkout</h3>
            
            {items.length > 0 ? (
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span className="text-foreground">$29.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <Badge variant="secondary">Free</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">${(getTotalPrice() + 29.99).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Payment Details</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="card">Card Number</Label>
                      <Input id="card" placeholder="1234 5678 9012 3456" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="name">Cardholder Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Complete Purchase
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Add items to checkout</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
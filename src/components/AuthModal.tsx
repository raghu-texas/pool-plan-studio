import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (isLogin: boolean) => {
    const newErrors: Record<string, string> = {};
    const form = isLogin ? loginForm : signupForm;

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin && 'confirmPassword' in form) {
      if (!form.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (isLogin: boolean) => {
    if (!validateForm(isLogin)) return;

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "You have successfully signed in." : "Your account has been created successfully.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `Redirecting to ${provider}...`,
    });
  };

  const resetForm = () => {
    setLoginForm({ email: '', password: '' });
    setSignupForm({ email: '', password: '', confirmPassword: '' });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full mx-4 p-0 overflow-hidden bg-card border-0 shadow-custom-xl animate-scale-in">
        <div className="glass rounded-xl border border-border/20">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl font-bold text-center text-foreground">
              Welcome
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 pt-2">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-200"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-200"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-foreground font-medium">
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      className={`transition-all duration-200 focus:ring-2 focus:ring-primary ${
                        errors.email ? 'border-destructive focus:ring-destructive' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm animate-fade-in-up">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-foreground font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        className={`pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary ${
                          errors.password ? 'border-destructive focus:ring-destructive' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-sm animate-fade-in-up">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button 
                      type="button"
                      className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button 
                    onClick={() => handleSubmit(true)}
                    disabled={loading}
                    className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-custom-md hover:shadow-custom-lg"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-foreground font-medium">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      className={`transition-all duration-200 focus:ring-2 focus:ring-primary ${
                        errors.email ? 'border-destructive focus:ring-destructive' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm animate-fade-in-up">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-foreground font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                        className={`pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary ${
                          errors.password ? 'border-destructive focus:ring-destructive' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-sm animate-fade-in-up">{errors.password}</p>
                    )}
                    <PasswordStrengthMeter password={signupForm.password} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-foreground font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className={`pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary ${
                          errors.confirmPassword ? 'border-destructive focus:ring-destructive' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-destructive text-sm animate-fade-in-up">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <Button 
                    onClick={() => handleSubmit(false)}
                    disabled={loading}
                    className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-custom-md hover:shadow-custom-lg"
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/40"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin('Google')}
                  className="h-12 border-border/40 hover:bg-muted/50 hover:border-primary/40 transition-all duration-200 hover:scale-105"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin('GitHub')}
                  className="h-12 border-border/40 hover:bg-muted/50 hover:border-primary/40 transition-all duration-200 hover:scale-105"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
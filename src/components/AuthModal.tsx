import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Github, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import PasswordResetModal from "./PasswordResetModal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SignupStep = 'email' | 'otp' | 'password';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [signupStep, setSignupStep] = useState<SignupStep>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const { toast } = useToast();

  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ 
    email: '', 
    confirmEmail: '',
    password: '', 
    confirmPassword: '',
    otp: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmailStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signupForm.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(signupForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!signupForm.confirmEmail) {
      newErrors.confirmEmail = 'Please confirm your email';
    } else if (signupForm.email !== signupForm.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTPStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signupForm.otp || signupForm.otp.length !== 6) {
      newErrors.otp = 'Please enter the 6-digit verification code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordStep = () => {
    const newErrors: Record<string, string> = {};

    if (!signupForm.password) {
      newErrors.password = 'Password is required';
    } else if (signupForm.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!signupForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};

    if (!loginForm.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!loginForm.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLoginForm()) return;

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
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

  const handleSendOTP = async () => {
    if (!validateEmailStep()) return;

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Verification code sent!",
        description: `We've sent a 6-digit code to ${signupForm.email}`,
      });
      
      setSignupStep('otp');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!validateOTPStep()) return;

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate OTP verification (in real app, verify against sent code)
      if (signupForm.otp === '123456') {
        toast({
          title: "Email verified!",
          description: "Your email has been successfully verified.",
        });
        setSignupStep('password');
      } else {
        setErrors({ otp: 'Invalid verification code. Please try again.' });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    if (!validatePasswordStep()) return;

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
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
    setSignupForm({ email: '', confirmEmail: '', password: '', confirmPassword: '', otp: '' });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSignupStep('email');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    resetForm();
  };

  const handleBackToEmailStep = () => {
    setSignupStep('email');
    setErrors({});
  };

  const isEmailStepValid = signupForm.email && signupForm.confirmEmail && 
    validateEmail(signupForm.email) && signupForm.email === signupForm.confirmEmail;
  
  const isOTPStepValid = signupForm.otp && signupForm.otp.length === 6;
  
  const isPasswordStepValid = signupForm.password && signupForm.confirmPassword && 
    signupForm.password.length >= 8 && signupForm.password === signupForm.confirmPassword;

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
                      onClick={() => setShowPasswordReset(true)}
                      className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button 
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-custom-md hover:shadow-custom-lg"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                {signupStep === 'email' && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Create your account</h3>
                      <p className="text-sm text-muted-foreground">Enter your email address to get started</p>
                    </div>

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
                      <Label htmlFor="confirm-email" className="text-foreground font-medium">
                        Confirm Email
                      </Label>
                      <Input
                        id="confirm-email"
                        type="email"
                        placeholder="Confirm your email"
                        value={signupForm.confirmEmail}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, confirmEmail: e.target.value }))}
                        className={`transition-all duration-200 focus:ring-2 focus:ring-primary ${
                          errors.confirmEmail ? 'border-destructive focus:ring-destructive' : ''
                        }`}
                      />
                      {errors.confirmEmail && (
                        <p className="text-destructive text-sm animate-fade-in-up">{errors.confirmEmail}</p>
                      )}
                    </div>

                    <Button 
                      onClick={handleSendOTP}
                      disabled={loading || !isEmailStepValid}
                      className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-custom-md hover:shadow-custom-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading ? "Sending code..." : "Send Verification Code"}
                    </Button>
                  </div>
                )}

                {signupStep === 'otp' && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Check your email</h3>
                      <p className="text-sm text-muted-foreground">
                        We've sent a 6-digit verification code to
                      </p>
                      <p className="text-sm font-medium text-foreground">{signupForm.email}</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground font-medium text-center block">
                        Verification Code
                      </Label>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={signupForm.otp}
                          onChange={(value) => setSignupForm(prev => ({ ...prev, otp: value }))}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      {errors.otp && (
                        <p className="text-destructive text-sm animate-fade-in-up text-center">{errors.otp}</p>
                      )}
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        For demo purposes, use code: <span className="font-mono font-semibold">123456</span>
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        variant="outline"
                        onClick={handleBackToEmailStep}
                        className="flex-1 h-12 border-border/40 hover:bg-muted/50 transition-all duration-200"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button 
                        onClick={handleVerifyOTP}
                        disabled={loading || !isOTPStepValid}
                        className="flex-1 h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-custom-md hover:shadow-custom-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {loading ? "Verifying..." : "Verify Code"}
                      </Button>
                    </div>
                  </div>
                )}

                {signupStep === 'password' && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Email verified!</h3>
                      <p className="text-sm text-muted-foreground">Now create a secure password for your account</p>
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
                      onClick={handleCreateAccount}
                      disabled={loading || !isPasswordStepValid}
                      className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-custom-md hover:shadow-custom-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                  </div>
                )}
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
      
      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
        onBackToLogin={() => {
          setShowPasswordReset(false);
          // Keep the main auth modal open when coming back from password reset
        }}
      />
    </Dialog>
  );
};

export default AuthModal;
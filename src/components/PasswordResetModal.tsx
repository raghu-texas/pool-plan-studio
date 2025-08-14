import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft, Mail, Shield, Lock } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

type Step = 'forgot' | 'otp' | 'reset';

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ 
  isOpen, 
  onClose, 
  onBackToLogin 
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('forgot');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resendCountdown, setResendCountdown] = useState(0);
  const { toast } = useToast();

  // Reset countdown when OTP step is reached
  useEffect(() => {
    if (currentStep === 'otp' && resendCountdown === 0) {
      setResendCountdown(60);
    }
  }, [currentStep]);

  // Countdown timer
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 'forgot') {
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(email)) {
        newErrors.email = 'Please enter a valid email';
      }
    } else if (currentStep === 'otp') {
      if (!otp || otp.length !== 4) {
        newErrors.otp = 'Please enter the 4-digit code';
      }
    } else if (currentStep === 'reset') {
      if (!newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
      
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (currentStep === 'forgot') {
        toast({
          title: "Code sent!",
          description: `We've sent a 4-digit code to ${email}`,
        });
        setCurrentStep('otp');
      } else if (currentStep === 'otp') {
        toast({
          title: "Code verified!",
          description: "Please create your new password",
        });
        setCurrentStep('reset');
      } else if (currentStep === 'reset') {
        toast({
          title: "Password reset!",
          description: "Your password has been successfully reset",
        });
        handleClose();
        onBackToLogin();
      }
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

  const handleResendCode = async () => {
    if (resendCountdown > 0) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Code sent!",
        description: `We've sent a new code to ${email}`,
      });
      setResendCountdown(60);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentStep('forgot');
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setResendCountdown(0);
    onClose();
  };

  const handleBackStep = () => {
    if (currentStep === 'otp') {
      setCurrentStep('forgot');
    } else if (currentStep === 'reset') {
      setCurrentStep('otp');
    }
    setErrors({});
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'forgot': return 'Forgot Password';
      case 'otp': return 'Verify Code';
      case 'reset': return 'Reset Password';
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 'forgot': return <Mail className="w-6 h-6 text-primary" />;
      case 'otp': return <Shield className="w-6 h-6 text-primary" />;
      case 'reset': return <Lock className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-full mx-4 p-0 overflow-hidden bg-card border-0 shadow-custom-xl animate-scale-in">
        <div className="glass rounded-xl border border-border/20">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center justify-center mb-2">
              {getStepIcon()}
            </div>
            <DialogTitle className="text-2xl font-bold text-center text-foreground">
              {getStepTitle()}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 pt-2">
            {/* Step 1: Forgot Password */}
            {currentStep === 'forgot' && (
              <div className="space-y-6 animate-fade-in-up">
                <p className="text-center text-muted-foreground text-sm">
                  Enter your email address and we'll send you a code to reset your password.
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-foreground font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`transition-all duration-200 focus:ring-2 focus:ring-primary ${
                      errors.email ? 'border-destructive focus:ring-destructive' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm animate-fade-in-up">{errors.email}</p>
                  )}
                </div>

                <Button 
                  onClick={handleNext}
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-custom-md hover:shadow-custom-lg"
                >
                  {loading ? "Sending Code..." : "Send Code"}
                </Button>

                <div className="text-center">
                  <button 
                    type="button"
                    onClick={onBackToLogin}
                    className="inline-flex items-center text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {currentStep === 'otp' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground text-sm">
                    We've sent a 4-digit verification code to
                  </p>
                  <p className="font-medium text-foreground">{email}</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-foreground font-medium block text-center">
                    Verification Code
                  </Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={4}
                      value={otp}
                      onChange={setOtp}
                      className="gap-2"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="w-14 h-14 text-lg font-semibold" />
                        <InputOTPSlot index={1} className="w-14 h-14 text-lg font-semibold" />
                        <InputOTPSlot index={2} className="w-14 h-14 text-lg font-semibold" />
                        <InputOTPSlot index={3} className="w-14 h-14 text-lg font-semibold" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {errors.otp && (
                    <p className="text-destructive text-sm text-center animate-fade-in-up">{errors.otp}</p>
                  )}
                </div>

                <Button 
                  onClick={handleNext}
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-custom-md hover:shadow-custom-lg"
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-muted-foreground text-sm">
                    Didn't receive the code?
                  </p>
                  <button 
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendCountdown > 0 || loading}
                    className="text-primary hover:text-primary-dark text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resendCountdown > 0 
                      ? `Resend in ${resendCountdown}s` 
                      : "Resend Code"
                    }
                  </button>
                </div>

                <div className="text-center">
                  <button 
                    type="button"
                    onClick={handleBackStep}
                    className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Change Email
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Reset Password */}
            {currentStep === 'reset' && (
              <div className="space-y-6 animate-fade-in-up">
                <p className="text-center text-muted-foreground text-sm">
                  Create a new password for your account. Make sure it's strong and secure.
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-foreground font-medium">
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary ${
                          errors.newPassword ? 'border-destructive focus:ring-destructive' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-destructive text-sm animate-fade-in-up">{errors.newPassword}</p>
                    )}
                    <PasswordStrengthMeter password={newPassword} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-new-password" className="text-foreground font-medium">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-new-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                </div>

                <Button 
                  onClick={handleNext}
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-custom-md hover:shadow-custom-lg"
                >
                  {loading ? "Resetting Password..." : "Reset Password"}
                </Button>

                <div className="text-center">
                  <button 
                    type="button"
                    onClick={handleBackStep}
                    className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Verification
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordResetModal;
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const calculateStrength = (password: string): { score: number; label: string; color: string } => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score <= 2) return { score: (score / 5) * 100, label: 'Weak', color: 'bg-destructive' };
    if (score <= 3) return { score: (score / 5) * 100, label: 'Fair', color: 'bg-warning' };
    if (score <= 4) return { score: (score / 5) * 100, label: 'Good', color: 'bg-accent' };
    return { score: 100, label: 'Strong', color: 'bg-success' };
  };

  const strength = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Password strength</span>
        <span className={`text-xs font-medium ${
          strength.label === 'Weak' ? 'text-destructive' :
          strength.label === 'Fair' ? 'text-warning' :
          strength.label === 'Good' ? 'text-accent' :
          'text-success'
        }`}>
          {strength.label}
        </span>
      </div>
      <div className="relative">
        <Progress value={strength.score} className="h-2" />
        <div 
          className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${strength.score}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
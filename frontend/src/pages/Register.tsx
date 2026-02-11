import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Loader from '@/components/Loader';
import { GraduationCap, Eye, EyeOff, Mail, Lock, User, CheckCircle } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    
    try {
      await register(name, email, password, role);
      // Navigate based on role
      switch (role) {
        case 'student':
          navigate('/dashboard/student');
          break;
        case 'teacher':
          navigate('/dashboard/teacher');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
      }
    } catch (err: any) {
      const errorMessage = err?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="h-7 w-7" />
              </div>
            </Link>
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Start your learning journey with EduVillage
            </p>
          </div>

          <div className="card-elevated p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Role Selection */}
              <div className="space-y-2">
                <Label>I want to join as</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(['student', 'teacher'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all border-2 ${
                        role === r
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card text-foreground border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {r === 'student' ? (
                          <GraduationCap className="h-5 w-5" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                        <span>{r.charAt(0).toUpperCase() + r.slice(1)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {password && (
                  <div className="space-y-1 mt-2">
                    {passwordRequirements.map((req, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2 text-xs ${
                          req.met ? 'text-success' : 'text-muted-foreground'
                        }`}
                      >
                        <CheckCircle className={`h-3 w-3 ${req.met ? 'opacity-100' : 'opacity-40'}`} />
                        {req.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full btn-primary-gradient"
                disabled={isLoading}
              >
                {isLoading ? <Loader size="sm" /> : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

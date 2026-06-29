import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cloud, Eye, EyeOff, ArrowRight, Mail, Lock, User, Briefcase, UserCircle } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'seeker' | 'recruiter'>('seeker');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    const result = await register(email, password, name, role);
    setIsLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-purple/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        <FadeIn>
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">
                Cloud<span className="text-primary-400">&</span>DevOps
              </span>
            </Link>
            <h1 className="text-2xl font-bold mb-2">Create your account</h1>
            <p className="text-text-secondary">Join thousands of Cloud & DevOps professionals</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-surface rounded-2xl border border-white/5 p-8">
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setRole('seeker')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    role === 'seeker'
                      ? 'border-primary-500/30 bg-primary-500/10 text-primary-400'
                      : 'border-white/5 bg-surface-elevated text-text-muted hover:border-white/10'
                  }`}
                >
                  <UserCircle className="w-6 h-6" />
                  <span className="text-sm font-medium">Job Seeker</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('recruiter')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    role === 'recruiter'
                      ? 'border-primary-500/30 bg-primary-500/10 text-primary-400'
                      : 'border-white/5 bg-surface-elevated text-text-muted hover:border-white/10'
                  }`}
                >
                  <Briefcase className="w-6 h-6" />
                  <span className="text-sm font-medium">Recruiter</span>
                </button>
              </div>

              <Input
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User className="w-4 h-4" />}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="w-4 h-4" />}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <Input
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                required
              />

              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" required className="w-4 h-4 rounded border-white/20 bg-surface-elevated text-primary-500" />
                <span className="text-text-secondary">
                  I agree to the <Link to="/terms" className="text-primary-400 hover:text-primary-300">Terms</Link> and{' '}
                  <Link to="/privacy" className="text-primary-400 hover:text-primary-300">Privacy Policy</Link>
                </span>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading} icon={<ArrowRight className="w-4 h-4" />}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <p className="text-sm text-text-secondary">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-400 hover:text-primary-300 transition-colors font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

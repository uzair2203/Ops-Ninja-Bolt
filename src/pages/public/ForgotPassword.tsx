import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cloud, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    setSent(true);
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
            <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
            <p className="text-text-secondary">Enter your email and we'll send you a reset link</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-surface rounded-2xl border border-white/5 p-8">
            {sent ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-accent-green" />
                </div>
                <h2 className="text-lg font-semibold mb-2">Check your email</h2>
                <p className="text-sm text-text-secondary mb-4">
                  We've sent a password reset link to {email}
                </p>
                <Link to="/login">
                  <Button variant="outline">Back to Sign In</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
                <Button type="submit" className="w-full" disabled={isLoading} icon={<ArrowRight className="w-4 h-4" />}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                <div className="text-center">
                  <Link to="/login" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                    Back to sign in
                  </Link>
                </div>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

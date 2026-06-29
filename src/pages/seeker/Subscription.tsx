import { useState } from 'react';
import { Check, Zap, ArrowRight, Star } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const plans = [
  {
    name: 'Free',
    description: 'For casual job seekers',
    price: 0,
    period: 'forever',
    features: ['Browse all jobs', 'Basic profile', '5 saved jobs', 'Standard applications'],
    cta: 'Current Plan',
    current: false,
  },
  {
    name: 'Pro',
    description: 'For serious job seekers',
    price: 29,
    period: 'month',
    features: ['Everything in Free', 'Featured profile', 'Unlimited saved jobs', 'Priority applications', 'Exclusive job access', 'Resume review', 'Profile analytics'],
    cta: 'Upgrade to Pro',
    current: true,
    popular: true,
  },
  {
    name: 'Premium',
    description: 'For power users',
    price: 79,
    period: 'month',
    features: ['Everything in Pro', '1-on-1 career coaching', 'Salary negotiation guide', 'Interview prep sessions', 'Direct recruiter messaging', 'Portfolio review', 'Priority support'],
    cta: 'Upgrade to Premium',
    current: false,
  },
];

export function Subscription() {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div>
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Subscription</h1>
          <p className="text-text-secondary">Choose the plan that fits your career goals</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-text-primary' : 'text-text-muted'}`}>Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-14 h-7 rounded-full bg-surface-elevated border border-white/10"
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-primary-500 transition-transform ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0.5'}`} />
          </button>
          <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-text-primary' : 'text-text-muted'}`}>Yearly</span>
          <span className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green font-medium">Save 20%</span>
        </div>
      </FadeIn>

      <StaggerContainer className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <StaggerItem key={plan.name}>
            <Card className={`p-6 h-full relative ${plan.popular ? 'border-primary-500/30 shadow-glow-blue' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-indigo text-white text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" /> Most Popular
                  </span>
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-sm text-text-muted">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">${billingCycle === 'yearly' ? Math.round(plan.price * 0.8) : plan.price}</span>
                <span className="text-text-muted">/{plan.period === 'forever' ? 'mo' : billingCycle === 'yearly' ? 'mo' : 'mo'}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.current ? 'outline' : plan.popular ? 'primary' : 'outline'}
                className="w-full"
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : plan.cta}
              </Button>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

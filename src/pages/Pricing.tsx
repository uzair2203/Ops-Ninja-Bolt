import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Zap,
  Building2,
  Rocket,
  Crown,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small teams getting started',
    price: 299,
    period: 'month',
    icon: Zap,
    features: [
      '1 active job listing',
      '30-day visibility',
      'Basic company profile',
      'Email support',
      'Standard placement',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    description: 'For scaling teams with regular hiring needs',
    price: 799,
    period: 'month',
    icon: Rocket,
    features: [
      '5 active job listings',
      '60-day visibility',
      'Enhanced company profile',
      'Priority email support',
      'Featured placement',
      'Applicant tracking',
      'Analytics dashboard',
    ],
    cta: 'Start Growing',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations hiring at scale',
    price: 2499,
    period: 'month',
    icon: Crown,
    features: [
      'Unlimited job listings',
      '90-day visibility',
      'Premium company profile',
      'Dedicated account manager',
      'Top placement guarantee',
      'Advanced ATS integration',
      'Custom analytics & reports',
      'Employer branding package',
      'Sourcing assistance',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  {
    question: 'How does the job posting process work?',
    answer: 'Simply create an employer account, choose your plan, and submit your job details. Our team reviews and approves listings within 24 hours. Once live, your job appears in search results and is promoted to relevant candidates.',
  },
  {
    question: 'Can I change my plan at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we prorate any differences in billing.',
  },
  {
    question: 'What happens when my job listing expires?',
    answer: 'When a listing reaches its visibility limit, it becomes inactive but remains in your dashboard. You can renew it with a single click or let it expire naturally.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 14-day money-back guarantee on all plans. If you are not satisfied with the quality of applicants, contact us for a full refund.',
  },
  {
    question: 'How do you verify candidates?',
    answer: 'We verify email addresses and LinkedIn profiles. For senior roles, we also offer optional background checks and reference verification as an add-on service.',
  },
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const yearlyDiscount = 0.2;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
            <p className="text-text-secondary text-lg">
              Choose the plan that fits your hiring needs. All plans include access to our curated pool of Cloud & DevOps professionals.
            </p>
          </div>
        </FadeIn>

        {/* Billing Toggle */}
        <FadeIn delay={0.1}>
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-text-primary' : 'text-text-muted'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 rounded-full bg-surface-elevated border border-white/10 transition-colors"
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-primary-500"
                animate={{ x: billingCycle === 'yearly' ? 26 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-text-primary' : 'text-text-muted'}`}>
              Yearly
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-accent-green/10 text-accent-green font-medium">
              Save 20%
            </span>
          </div>
        </FadeIn>

        {/* Pricing Cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {plans.map((plan) => {
            const price = billingCycle === 'yearly'
              ? Math.round(plan.price * 12 * (1 - yearlyDiscount))
              : plan.price;
            const displayPrice = billingCycle === 'yearly'
              ? Math.round(price / 12)
              : price;

            return (
              <StaggerItem key={plan.name}>
                <Card
                  className={`p-8 h-full relative ${plan.popular ? 'border-primary-500/30 shadow-glow-blue' : ''}`}
                  hover={!plan.popular}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-indigo text-white text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${plan.popular ? 'bg-gradient-to-br from-primary-500 to-accent-indigo' : 'bg-white/5'}`}>
                      <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-primary-400'}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm text-text-muted">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${displayPrice}</span>
                      <span className="text-text-muted">/{billingCycle === 'yearly' ? 'mo' : 'mo'}</span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="text-sm text-accent-green mt-1">
                        ${price} billed annually
                      </p>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? 'text-primary-400' : 'text-accent-green'}`} />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* FAQ */}
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-text-secondary">Everything you need to know about posting jobs</p>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <Card className="overflow-hidden" hover={false}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-text-primary pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HelpCircle className="w-5 h-5 text-text-muted shrink-0" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-text-secondary">
                    {faq.answer}
                  </div>
                </motion.div>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn>
          <div className="mt-16 text-center">
            <p className="text-text-secondary mb-4">Need a custom plan for your organization?</p>
            <Button variant="outline" icon={<Building2 className="w-4 h-4" />}>
              Contact Sales
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

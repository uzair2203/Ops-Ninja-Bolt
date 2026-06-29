import { useState } from 'react';
import { DollarSign, Plus, Pencil, Trash2, Check, Star, Users, Building2 } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { useToast } from '@/components/modals/Toast';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  target: 'seeker' | 'recruiter';
  features: string[];
  active: boolean;
  subscribers: number;
}

const mockPlans: PricingPlan[] = [
  {
    id: '1', name: 'Free', description: 'For casual job seekers', price: 0, period: 'forever',
    target: 'seeker', features: ['Browse jobs', 'Basic profile', '5 saved jobs'], active: true, subscribers: 4200
  },
  {
    id: '2', name: 'Pro', description: 'For serious job seekers', price: 29, period: 'month',
    target: 'seeker', features: ['Featured profile', 'Unlimited saves', 'Priority apply', 'Exclusive jobs'], active: true, subscribers: 890
  },
  {
    id: '3', name: 'Premium', description: 'For power users', price: 79, period: 'month',
    target: 'seeker', features: ['Career coaching', 'Salary guide', 'Interview prep', 'Direct messaging'], active: true, subscribers: 145
  },
  {
    id: '4', name: 'Starter', description: 'For small teams', price: 299, period: 'month',
    target: 'recruiter', features: ['1 active job', '30-day visibility', 'Basic profile', 'Email support'], active: true, subscribers: 156
  },
  {
    id: '5', name: 'Growth', description: 'For scaling teams', price: 799, period: 'month',
    target: 'recruiter', features: ['5 active jobs', '60-day visibility', 'Enhanced profile', 'Analytics'], active: true, subscribers: 89
  },
  {
    id: '6', name: 'Enterprise', description: 'For large orgs', price: 2499, period: 'month',
    target: 'recruiter', features: ['Unlimited jobs', '90-day visibility', 'Premium profile', 'Sourcing'], active: true, subscribers: 12
  },
];

export function PricingPlans() {
  const { addToast, ToastContainer } = useToast();
  const [plans, setPlans] = useState<PricingPlan[]>(mockPlans);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  const handleDelete = (id: string) => {
    setPlans(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
    addToast({ type: 'success', title: 'Plan deleted' });
  };

  const toggleActive = (id: string) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    addToast({ type: 'success', title: 'Plan status updated' });
  };

  const seekerPlans = plans.filter(p => p.target === 'seeker');
  const recruiterPlans = plans.filter(p => p.target === 'recruiter');

  return (
    <div>
      <ToastContainer />
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Pricing Plans</h1>
            <p className="text-text-secondary">Manage subscription plans for seekers and recruiters</p>
          </div>
          <Button icon={<Plus className="w-4 h-4" />}>
            Add Plan
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-primary-400" />
          <h2 className="text-lg font-semibold">Job Seeker Plans</h2>
        </div>
      </FadeIn>

      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {seekerPlans.map((plan) => (
          <StaggerItem key={plan.id}>
            <Card className={`p-5 relative ${!plan.active ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-xs text-text-muted">{plan.description}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleActive(plan.id)}
                    className={`p-1.5 rounded-lg transition-colors ${plan.active ? 'text-accent-green hover:bg-accent-green/10' : 'text-text-muted hover:bg-white/5'}`}
                    title={plan.active ? 'Active' : 'Inactive'}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg text-text-muted hover:text-primary-400 hover:bg-primary-500/10 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(plan.id)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <span className="text-2xl font-bold">${plan.price}</span>
                <span className="text-text-muted text-sm">/{plan.period}</span>
              </div>
              <div className="text-sm text-text-muted mb-3">{plan.subscribers.toLocaleString()} subscribers</div>
              <ul className="space-y-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <Check className="w-3 h-3 text-accent-green shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn delay={0.15}>
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5 text-accent-purple" />
          <h2 className="text-lg font-semibold">Recruiter Plans</h2>
        </div>
      </FadeIn>

      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recruiterPlans.map((plan) => (
          <StaggerItem key={plan.id}>
            <Card className={`p-5 relative ${!plan.active ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-xs text-text-muted">{plan.description}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleActive(plan.id)}
                    className={`p-1.5 rounded-lg transition-colors ${plan.active ? 'text-accent-green hover:bg-accent-green/10' : 'text-text-muted hover:bg-white/5'}`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg text-text-muted hover:text-primary-400 hover:bg-primary-500/10 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(plan.id)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <span className="text-2xl font-bold">${plan.price}</span>
                <span className="text-text-muted text-sm">/{plan.period}</span>
              </div>
              <div className="text-sm text-text-muted mb-3">{plan.subscribers.toLocaleString()} subscribers</div>
              <ul className="space-y-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <Check className="w-3 h-3 text-accent-green shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Pricing Plan"
        description="Are you sure you want to delete this pricing plan? Existing subscribers will not be affected."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}

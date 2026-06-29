import { useState } from 'react';
import { CreditCard, Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/empty-states/EmptyState';
import type { Invoice } from '@/types';

const mockInvoices: Invoice[] = [
  { id: '1', amount: 29, currency: 'USD', status: 'paid', date: '2024-01-15', description: 'Pro Plan - Monthly', plan: 'Pro' },
  { id: '2', amount: 29, currency: 'USD', status: 'paid', date: '2023-12-15', description: 'Pro Plan - Monthly', plan: 'Pro' },
  { id: '3', amount: 29, currency: 'USD', status: 'paid', date: '2023-11-15', description: 'Pro Plan - Monthly', plan: 'Pro' },
];

const statusConfig = {
  paid: { label: 'Paid', color: 'text-accent-green', bg: 'bg-accent-green/10', icon: CheckCircle2 },
  pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: Clock },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertCircle },
};

export function Billing() {
  const [invoices] = useState<Invoice[]>(mockInvoices);

  return (
    <div>
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Billing</h1>
          <p className="text-text-secondary">Manage your payment methods and billing history</p>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FadeIn delay={0.1}>
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Payment Method</h2>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated">
                <div className="w-12 h-8 rounded bg-gradient-to-r from-primary-600 to-accent-indigo flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div className="flex-1">
                  <div className="font-medium">Visa ending in 4242</div>
                  <div className="text-sm text-text-muted">Expires 12/25</div>
                </div>
                <Badge variant="success">Default</Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 rounded-xl text-sm font-medium bg-surface-elevated text-text-primary hover:bg-surface-hover transition-colors">
                  Add New Card
                </button>
                <button className="px-4 py-2 rounded-xl text-sm font-medium text-text-muted hover:text-text-primary transition-colors">
                  Remove
                </button>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Billing History</h2>
              {invoices.length === 0 ? (
                <EmptyState
                  icon={<CreditCard className="w-8 h-8" />}
                  title="No invoices yet"
                  description="Your billing history will appear here."
                />
              ) : (
                <div className="space-y-3">
                  {invoices.map((invoice) => {
                    const status = statusConfig[invoice.status];
                    const StatusIcon = status.icon;
                    return (
                      <div key={invoice.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-text-muted" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{invoice.description}</div>
                          <div className="text-xs text-text-muted">{invoice.date}</div>
                        </div>
                        <div className="text-sm font-medium">${invoice.amount}</div>
                        <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg ${status.bg} ${status.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {status.label}
                        </div>
                        <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </FadeIn>
        </div>

        <div>
          <FadeIn delay={0.2}>
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Current Plan</h2>
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary-900/30 to-accent-purple/20 border border-primary-500/20 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">Pro</span>
                  <Badge variant="primary">Active</Badge>
                </div>
                <div className="text-2xl font-bold mb-1">$29<span className="text-sm text-text-muted font-normal">/mo</span></div>
                <p className="text-sm text-text-secondary">Billed monthly</p>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-accent-green" />
                  Featured profile
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-accent-green" />
                  Priority applications
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-accent-green" />
                  Exclusive job access
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-accent-green" />
                  Resume review
                </div>
              </div>
              <button className="w-full py-2.5 rounded-xl text-sm font-medium bg-surface-elevated text-text-primary hover:bg-surface-hover transition-colors">
                Change Plan
              </button>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Receipt, Download, CheckCircle2, Clock, AlertCircle, Calendar } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/empty-states/EmptyState';
import type { Invoice } from '@/types';

const mockInvoices: Invoice[] = [
  { id: '1', amount: 299, currency: 'USD', status: 'paid', date: '2024-01-15', description: 'Starter Plan - Monthly', plan: 'Starter' },
  { id: '2', amount: 299, currency: 'USD', status: 'paid', date: '2023-12-15', description: 'Starter Plan - Monthly', plan: 'Starter' },
  { id: '3', amount: 299, currency: 'USD', status: 'paid', date: '2023-11-15', description: 'Starter Plan - Monthly', plan: 'Starter' },
  { id: '4', amount: 299, currency: 'USD', status: 'pending', date: '2024-02-15', description: 'Starter Plan - Monthly', plan: 'Starter' },
];

const statusConfig = {
  paid: { label: 'Paid', color: 'text-accent-green', bg: 'bg-accent-green/10', icon: CheckCircle2 },
  pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: Clock },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertCircle },
};

export function Invoices() {
  const [invoices] = useState<Invoice[]>(mockInvoices);

  return (
    <div>
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Invoices</h1>
          <p className="text-text-secondary">View and download your billing history</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="p-6">
          {invoices.length === 0 ? (
            <EmptyState
              icon={<Receipt className="w-8 h-8" />}
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
                      <Receipt className="w-5 h-5 text-text-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{invoice.description}</div>
                      <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {invoice.date}</span>
                        <span>{invoice.plan}</span>
                      </div>
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
  );
}

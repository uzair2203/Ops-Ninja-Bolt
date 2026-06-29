import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, CheckCircle2, AlertCircle, Clock, FileText, ArrowRight, MessageSquare } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { formatDate } from '@/lib/utils';
import type { JobApplication } from '@/types';

const mockApplications: JobApplication[] = [
  {
    id: '1', jobId: '1', jobTitle: 'Senior DevOps Engineer', companyName: 'Vercel',
    companyLogoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop',
    status: 'interview', appliedAt: '2024-01-10', coverLetter: '', resumeUrl: ''
  },
  {
    id: '2', jobId: '2', jobTitle: 'Platform Engineer', companyName: 'Stripe',
    companyLogoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop',
    status: 'reviewed', appliedAt: '2024-01-08', coverLetter: '', resumeUrl: ''
  },
  {
    id: '3', jobId: '3', jobTitle: 'Site Reliability Engineer', companyName: 'Linear',
    companyLogoUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop',
    status: 'pending', appliedAt: '2024-01-05', coverLetter: '', resumeUrl: ''
  },
  {
    id: '4', jobId: '7', jobTitle: 'AWS Solutions Architect', companyName: 'Vercel',
    companyLogoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop',
    status: 'rejected', appliedAt: '2024-01-02', coverLetter: '', resumeUrl: ''
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: Clock },
  reviewed: { label: 'Reviewed', color: 'text-primary-400', bg: 'bg-primary-500/10', icon: Eye },
  interview: { label: 'Interview', color: 'text-accent-green', bg: 'bg-accent-green/10', icon: CheckCircle2 },
  rejected: { label: 'Not Selected', color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertCircle },
  hired: { label: 'Hired', color: 'text-accent-green', bg: 'bg-accent-green/10', icon: CheckCircle2 },
};

const statusFilters = ['all', 'pending', 'reviewed', 'interview', 'rejected'] as const;

export function Applications() {
  const [filter, setFilter] = useState<typeof statusFilters[number]>('all');

  const filtered = filter === 'all' ? mockApplications : mockApplications.filter(a => a.status === filter);

  return (
    <div>
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">My Applications</h1>
          <p className="text-text-secondary">Track the status of your job applications</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-6">
          {statusFilters.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === s
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                  : 'bg-surface-elevated text-text-muted border border-white/5 hover:border-white/10'
              }`}
            >
              {s === 'all' ? 'All' : statusConfig[s as keyof typeof statusConfig]?.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <FadeIn>
          <EmptyState
            icon={<FileText className="w-8 h-8" />}
            title="No applications"
            description="You haven't applied to any jobs yet."
            action={{ label: 'Browse Jobs', onClick: () => {}, icon: <ArrowRight className="w-4 h-4" /> }}
          />
        </FadeIn>
      ) : (
        <StaggerContainer className="space-y-3">
          {filtered.map((app) => {
            const status = statusConfig[app.status];
            const StatusIcon = status.icon;
            return (
              <StaggerItem key={app.id}>
                <Card className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                      <img src={app.companyLogoUrl} alt={app.companyName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/jobs/${app.jobId}`}>
                        <h3 className="font-semibold text-text-primary hover:text-primary-400 transition-colors">{app.jobTitle}</h3>
                      </Link>
                      <p className="text-sm text-text-muted">{app.companyName}</p>
                      <p className="text-xs text-text-muted mt-1">Applied {formatDate(app.appliedAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg ${status.bg} ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </div>
                      {app.status === 'interview' && (
                        <button className="p-2 rounded-xl bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
}

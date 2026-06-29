import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Search, Filter, Eye, CheckCircle2, XCircle, Pause,
  Building2, MapPin, DollarSign, Clock, ChevronDown, ExternalLink
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { formatSalary, formatDate } from '@/lib/utils';
import type { Job } from '@/types';

const mockJobs: Job[] = [
  {
    id: '1', title: 'Senior DevOps Engineer', slug: 'senior-devops-engineer-vercel',
    companyId: '1', companyName: 'Vercel', companyLogoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop',
    location: 'San Francisco, CA', type: 'Full-time', remote: true,
    salaryMin: 180000, salaryMax: 250000, currency: 'USD',
    tags: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD'],
    description: '', requirements: [], benefits: [], featured: true, status: 'active', postedAt: '2024-01-15'
  },
  {
    id: '2', title: 'Platform Engineer', slug: 'platform-engineer-stripe',
    companyId: '2', companyName: 'Stripe', companyLogoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop',
    location: 'San Francisco, CA', type: 'Full-time', remote: true,
    salaryMin: 200000, salaryMax: 300000, currency: 'USD',
    tags: ['Platform', 'SRE', 'Go', 'Distributed Systems'],
    description: '', requirements: [], benefits: [], featured: true, status: 'active', postedAt: '2024-01-14'
  },
  {
    id: '3', title: 'Site Reliability Engineer', slug: 'sre-linear',
    companyId: '3', companyName: 'Linear', companyLogoUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop',
    location: 'Remote', type: 'Full-time', remote: true,
    salaryMin: 160000, salaryMax: 220000, currency: 'USD',
    tags: ['SRE', 'Observability', 'PostgreSQL', 'Rust'],
    description: '', requirements: [], benefits: [], featured: false, status: 'active', postedAt: '2024-01-13'
  },
];

const statusConfig = {
  active: { label: 'Active', color: 'text-accent-green', bg: 'bg-accent-green/10' },
  paused: { label: 'Paused', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  closed: { label: 'Closed', color: 'text-text-muted', bg: 'bg-white/5' },
  draft: { label: 'Draft', color: 'text-primary-400', bg: 'bg-primary-500/10' },
};

export function AllJobs() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = jobs.filter(job => {
    const matchesSearch = !searchQuery || job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">All Jobs</h1>
            <p className="text-text-secondary">Manage all job listings on the platform</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-surface-elevated border border-white/10 rounded-xl pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500/50 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-surface-elevated border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="w-8 h-8" />}
          title="No jobs found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <StaggerContainer className="space-y-3">
          {filtered.map((job) => {
            const status = statusConfig[job.status as keyof typeof statusConfig] || statusConfig.active;
            return (
              <StaggerItem key={job.id}>
                <Card className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={job.companyLogoUrl} alt={job.companyName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-text-primary">{job.title}</h3>
                        {job.featured && <Badge variant="primary">Featured</Badge>}
                        <span className={`text-xs px-2 py-0.5 rounded-lg ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                        <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {job.companyName}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatDate(job.postedAt)}</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-text-muted hover:text-primary-400 hover:bg-primary-500/10 transition-colors" title="Edit">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(job.id)}
                        className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Job"
        description="Are you sure you want to delete this job listing? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}

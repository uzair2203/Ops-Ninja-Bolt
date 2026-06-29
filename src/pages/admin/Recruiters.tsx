import { useState } from 'react';
import {
  Building2, Search, CheckCircle2, XCircle, Clock, Mail,
  MapPin, Users, Briefcase, Star, ExternalLink, Shield, Ban
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { formatDate } from '@/lib/utils';

interface RecruiterRow {
  id: string;
  companyName: string;
  email: string;
  logo: string;
  location: string;
  size: string;
  industry: string;
  openJobs: number;
  status: 'active' | 'pending' | 'suspended';
  joinedAt: string;
  rating: number;
  plan: string;
}

const mockRecruiters: RecruiterRow[] = [
  { id: '1', companyName: 'Vercel', email: 'hiring@vercel.com', logo: 'VC', location: 'San Francisco, CA', size: '201-500', industry: 'Cloud Infrastructure', openJobs: 3, status: 'active', joinedAt: '2023-06-15', rating: 4.8, plan: 'Growth' },
  { id: '2', companyName: 'Stripe', email: 'talent@stripe.com', logo: 'ST', location: 'San Francisco, CA', size: '1000-5000', industry: 'Fintech', openJobs: 5, status: 'active', joinedAt: '2023-08-20', rating: 4.9, plan: 'Enterprise' },
  { id: '3', companyName: 'Linear', email: 'jobs@linear.app', logo: 'LN', location: 'Remote', size: '51-200', industry: 'Developer Tools', openJobs: 2, status: 'active', joinedAt: '2023-10-05', rating: 4.7, plan: 'Growth' },
  { id: '4', companyName: 'Supabase', email: 'careers@supabase.com', logo: 'SB', location: 'Singapore', size: '51-200', industry: 'Database', openJobs: 2, status: 'pending', joinedAt: '2024-01-10', rating: 0, plan: 'Starter' },
];

const statusConfig = {
  active: { label: 'Active', color: 'text-accent-green', bg: 'bg-accent-green/10' },
  pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  suspended: { label: 'Suspended', color: 'text-red-400', bg: 'bg-red-500/10' },
};

export function Recruiters() {
  const [recruiters, setRecruiters] = useState<RecruiterRow[]>(mockRecruiters);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [approveId, setApproveId] = useState<string | null>(null);
  const [suspendId, setSuspendId] = useState<string | null>(null);

  const filtered = recruiters.filter(r => {
    const matchesSearch = !searchQuery || r.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || r.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setRecruiters(prev => prev.map(r => r.id === id ? { ...r, status: 'active' as const } : r));
    setApproveId(null);
  };

  const handleSuspend = (id: string) => {
    setRecruiters(prev => prev.map(r => r.id === id ? { ...r, status: 'suspended' as const } : r));
    setSuspendId(null);
  };

  return (
    <div>
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Recruiters</h1>
          <p className="text-text-secondary">Manage recruiter accounts and approvals</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search recruiters..."
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
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Building2 className="w-8 h-8" />}
          title="No recruiters found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <StaggerContainer className="space-y-3">
          {filtered.map((recruiter) => {
            const status = statusConfig[recruiter.status];
            return (
              <StaggerItem key={recruiter.id}>
                <Card className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-lg font-bold text-white shrink-0">
                      {recruiter.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-text-primary">{recruiter.companyName}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-lg ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                        <Badge variant="purple">{recruiter.plan}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {recruiter.email}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {recruiter.location}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {recruiter.size}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {recruiter.openJobs} jobs</span>
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {recruiter.rating || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {recruiter.status === 'pending' && (
                        <button
                          onClick={() => setApproveId(recruiter.id)}
                          className="px-3 py-2 rounded-lg text-xs font-medium bg-accent-green/10 text-accent-green hover:bg-accent-green/20 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {recruiter.status === 'active' && (
                        <button
                          onClick={() => setSuspendId(recruiter.id)}
                          className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Suspend"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors">
                        <ExternalLink className="w-4 h-4" />
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
        isOpen={!!approveId}
        onClose={() => setApproveId(null)}
        onConfirm={() => approveId && handleApprove(approveId)}
        title="Approve Recruiter"
        description="Are you sure you want to approve this recruiter? They will be able to post jobs immediately."
        confirmLabel="Approve"
        variant="info"
      />

      <ConfirmDialog
        isOpen={!!suspendId}
        onClose={() => setSuspendId(null)}
        onConfirm={() => suspendId && handleSuspend(suspendId)}
        title="Suspend Recruiter"
        description="Are you sure you want to suspend this recruiter? Their job postings will be paused."
        confirmLabel="Suspend"
        variant="warning"
      />
    </div>
  );
}

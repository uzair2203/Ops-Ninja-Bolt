import { useState } from 'react';
import {
  Users, Search, Filter, Mail, Download, CheckCircle2, XCircle,
  Eye, MessageSquare, Star, ChevronDown, ArrowRight, FileText
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { formatDate } from '@/lib/utils';
import type { Applicant } from '@/types';

const mockApplicants: Applicant[] = [
  { id: '1', name: 'Alex Rivera', email: 'alex@example.com', avatar: 'AR', title: 'DevOps Engineer', status: 'interview', appliedAt: '2024-01-15', resumeUrl: '', coverLetter: '', matchScore: 95 },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', avatar: 'SC', title: 'SRE', status: 'reviewed', appliedAt: '2024-01-14', resumeUrl: '', coverLetter: '', matchScore: 88 },
  { id: '3', name: 'Marcus Johnson', email: 'marcus@example.com', avatar: 'MJ', title: 'Platform Engineer', status: 'pending', appliedAt: '2024-01-13', resumeUrl: '', coverLetter: '', matchScore: 82 },
  { id: '4', name: 'Priya Sharma', email: 'priya@example.com', avatar: 'PS', title: 'Cloud Engineer', status: 'pending', appliedAt: '2024-01-12', resumeUrl: '', coverLetter: '', matchScore: 91 },
  { id: '5', name: 'David Kim', email: 'david@example.com', avatar: 'DK', title: 'Kubernetes Engineer', status: 'rejected', appliedAt: '2024-01-10', resumeUrl: '', coverLetter: '', matchScore: 65 },
  { id: '6', name: 'Emma Wilson', email: 'emma@example.com', avatar: 'EW', title: 'Infrastructure Engineer', status: 'hired', appliedAt: '2024-01-08', resumeUrl: '', coverLetter: '', matchScore: 97 },
];

const statusConfig = {
  pending: { label: 'New', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  reviewed: { label: 'Reviewed', color: 'text-primary-400', bg: 'bg-primary-500/10' },
  interview: { label: 'Interview', color: 'text-accent-green', bg: 'bg-accent-green/10' },
  rejected: { label: 'Rejected', color: 'text-red-400', bg: 'bg-red-500/10' },
  hired: { label: 'Hired', color: 'text-accent-green', bg: 'bg-accent-green/10' },
};

export function Applicants() {
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);

  const filtered = applicants.filter(a => {
    const matchesSearch = !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, status: Applicant['status']) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    if (selectedApplicant?.id === id) {
      setSelectedApplicant(prev => prev ? { ...prev, status } : null);
    }
  };

  return (
    <div>
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Applicants</h1>
          <p className="text-text-secondary">{applicants.length} total applicants</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search applicants..."
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
            <option value="pending">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Users className="w-8 h-8" />}
              title="No applicants found"
              description="Try adjusting your search or filters."
            />
          ) : (
            <StaggerContainer className="space-y-2">
              {filtered.map((applicant) => {
                const status = statusConfig[applicant.status];
                return (
                  <StaggerItem key={applicant.id}>
                    <div
                      onClick={() => setSelectedApplicant(applicant)}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors ${
                        selectedApplicant?.id === applicant.id
                          ? 'bg-primary-500/10 border border-primary-500/20'
                          : 'bg-surface-elevated hover:bg-surface-hover'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-sm font-bold text-white">
                        {applicant.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{applicant.name}</div>
                        <div className="text-xs text-text-muted">{applicant.title}</div>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          {applicant.matchScore}%
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-lg ${status.bg} ${status.color}`}>
                          {status.label}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>

        <div>
          {selectedApplicant ? (
            <FadeIn>
              <Card className="p-6 sticky top-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-lg font-bold text-white">
                    {selectedApplicant.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedApplicant.name}</h3>
                    <p className="text-sm text-text-muted">{selectedApplicant.title}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Match Score</span>
                    <span className="font-medium text-amber-400">{selectedApplicant.matchScore}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Applied</span>
                    <span className="font-medium">{formatDate(selectedApplicant.appliedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Email</span>
                    <span className="font-medium">{selectedApplicant.email}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors">
                    <Eye className="w-4 h-4" /> View Resume
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-surface-elevated text-text-primary hover:bg-surface-hover transition-colors">
                    <Mail className="w-4 h-4" /> Send Message
                  </button>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <p className="text-xs text-text-muted mb-3">Update Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(['pending', 'reviewed', 'interview', 'rejected', 'hired'] as const).map(s => {
                      const cfg = statusConfig[s];
                      return (
                        <button
                          key={s}
                          onClick={() => updateStatus(selectedApplicant.id, s)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            selectedApplicant.status === s
                              ? `${cfg.bg} ${cfg.color} border border-current`
                              : 'bg-surface-elevated text-text-muted hover:text-text-primary'
                          }`}
                        >
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </FadeIn>
          ) : (
            <Card className="p-6 text-center">
              <Users className="w-8 h-8 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">Select an applicant to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

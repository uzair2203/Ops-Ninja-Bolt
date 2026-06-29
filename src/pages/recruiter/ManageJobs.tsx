import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Plus, Search, Eye, Users, Pause, Play, Trash2, Pencil,
  Clock, ChevronDown, ArrowRight
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { formatDate } from '@/lib/utils';
import type { RecruiterJob } from '@/types';

const mockJobs: RecruiterJob[] = [
  { id: '1', title: 'Senior DevOps Engineer', status: 'active', applicants: 24, views: 342, postedAt: '2024-01-10', expiresAt: '2024-03-10' },
  { id: '2', title: 'Platform Engineer', status: 'active', applicants: 18, views: 256, postedAt: '2024-01-08', expiresAt: '2024-03-08' },
  { id: '3', title: 'Site Reliability Engineer', status: 'paused', applicants: 12, views: 189, postedAt: '2024-01-05', expiresAt: '2024-03-05' },
  { id: '4', title: 'Cloud Infrastructure Engineer', status: 'draft', applicants: 0, views: 0, postedAt: '2024-01-15', expiresAt: '2024-03-15' },
];

const statusConfig = {
  active: { label: 'Active', color: 'text-accent-green', bg: 'bg-accent-green/10' },
  paused: { label: 'Paused', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  closed: { label: 'Closed', color: 'text-text-muted', bg: 'bg-white/5' },
  draft: { label: 'Draft', color: 'text-primary-400', bg: 'bg-primary-500/10' },
};

export function ManageJobs() {
  const [jobs, setJobs] = useState<RecruiterJob[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = jobs.filter(job => {
    const matchesSearch = !searchQuery || job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (id: string) => {
    setJobs(prev => prev.map(job => {
      if (job.id !== id) return job;
      return { ...job, status: job.status === 'active' ? 'paused' : 'active' as const };
    }));
  };

  const handleDelete = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Manage Jobs</h1>
            <p className="text-text-secondary">View and manage all your job postings</p>
          </div>
          <Link to="/recruiter/post-job">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-primary-600 to-accent-indigo text-white hover:shadow-glow-blue transition-shadow">
              <Plus className="w-4 h-4" /> Post New
            </button>
          </Link>
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
          description="Try adjusting your search or post a new job."
          action={{ label: 'Post a Job', onClick: () => {}, icon: <Plus className="w-4 h-4" /> }}
        />
      ) : (
        <StaggerContainer className="space-y-3">
          {filtered.map((job) => {
            const status = statusConfig[job.status];
            return (
              <StaggerItem key={job.id}>
                <Card className="p-5 group">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-text-primary">{job.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-lg ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Posted {formatDate(job.postedAt)}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {job.applicants} applicants</span>
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {job.views} views</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={`/recruiter/applicants`}>
                        <button className="px-3 py-2 rounded-lg text-xs font-medium bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors">
                          Applicants
                        </button>
                      </Link>
                      <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      {job.status !== 'draft' && (
                        <button
                          onClick={() => toggleStatus(job.id)}
                          className="p-2 rounded-lg text-text-muted hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                          title={job.status === 'active' ? 'Pause' : 'Activate'}
                        >
                          {job.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteId(job.id)}
                        className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
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
        description="Are you sure you want to delete this job posting? All applicant data will be lost."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}

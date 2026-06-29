import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Users, Eye, TrendingUp, Plus, ChevronRight, ArrowUpRight,
  Clock, MapPin, DollarSign, BarChart3, MessageSquare
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { formatSalary, formatDate } from '@/lib/utils';
import type { RecruiterJob, Applicant } from '@/types';

const mockJobs: RecruiterJob[] = [
  { id: '1', title: 'Senior DevOps Engineer', status: 'active', applicants: 24, views: 342, postedAt: '2024-01-10', expiresAt: '2024-03-10' },
  { id: '2', title: 'Platform Engineer', status: 'active', applicants: 18, views: 256, postedAt: '2024-01-08', expiresAt: '2024-03-08' },
  { id: '3', title: 'Site Reliability Engineer', status: 'paused', applicants: 12, views: 189, postedAt: '2024-01-05', expiresAt: '2024-03-05' },
];

const mockApplicants: Applicant[] = [
  { id: '1', name: 'Alex Rivera', email: 'alex@example.com', avatar: 'AR', title: 'DevOps Engineer', status: 'interview', appliedAt: '2024-01-15', resumeUrl: '', coverLetter: '', matchScore: 95 },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', avatar: 'SC', title: 'SRE', status: 'reviewed', appliedAt: '2024-01-14', resumeUrl: '', coverLetter: '', matchScore: 88 },
  { id: '3', name: 'Marcus Johnson', email: 'marcus@example.com', avatar: 'MJ', title: 'Platform Engineer', status: 'pending', appliedAt: '2024-01-13', resumeUrl: '', coverLetter: '', matchScore: 82 },
  { id: '4', name: 'Priya Sharma', email: 'priya@example.com', avatar: 'PS', title: 'Cloud Engineer', status: 'pending', appliedAt: '2024-01-12', resumeUrl: '', coverLetter: '', matchScore: 91 },
];

const statusConfig = {
  active: { label: 'Active', color: 'text-accent-green', bg: 'bg-accent-green/10' },
  paused: { label: 'Paused', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  closed: { label: 'Closed', color: 'text-text-muted', bg: 'bg-white/5' },
  draft: { label: 'Draft', color: 'text-primary-400', bg: 'bg-primary-500/10' },
};

const applicantStatusConfig = {
  pending: { label: 'New', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  reviewed: { label: 'Reviewed', color: 'text-primary-400', bg: 'bg-primary-500/10' },
  interview: { label: 'Interview', color: 'text-accent-green', bg: 'bg-accent-green/10' },
  rejected: { label: 'Rejected', color: 'text-red-400', bg: 'bg-red-500/10' },
  hired: { label: 'Hired', color: 'text-accent-green', bg: 'bg-accent-green/10' },
};

export function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applicants'>('overview');

  const stats = [
    { label: 'Active Jobs', value: 2, icon: Briefcase, color: 'text-primary-400', trend: '+1 this week' },
    { label: 'Total Applicants', value: 66, icon: Users, color: 'text-accent-purple', trend: '+12 this week' },
    { label: 'Profile Views', value: 787, icon: Eye, color: 'text-accent-cyan', trend: '+23% vs last week' },
    { label: 'Hire Rate', value: '4.2%', icon: TrendingUp, color: 'text-accent-green', trend: '+0.8% this month' },
  ];

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Recruiter Dashboard</h1>
            <p className="text-text-secondary">Manage your job postings and applicants</p>
          </div>
          <Link to="/recruiter/post-job">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-primary-600 to-accent-indigo text-white hover:shadow-glow-blue transition-shadow">
              <Plus className="w-4 h-4" /> Post a Job
            </button>
          </Link>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-accent-green">{stat.trend}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn delay={0.2}>
        <div className="flex items-center gap-1 mb-6 border-b border-white/5">
          {(['overview', 'jobs', 'applicants'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-text-muted hover:text-text-secondary'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </FadeIn>

      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <FadeIn>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Recent Applicants</h2>
                  <Link to="/recruiter/applicants" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
                    View all <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {mockApplicants.slice(0, 3).map((applicant) => {
                    const status = applicantStatusConfig[applicant.status];
                    return (
                      <div key={applicant.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-sm font-bold text-white">
                          {applicant.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{applicant.name}</div>
                          <div className="text-xs text-text-muted">{applicant.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`text-xs px-2 py-1 rounded-lg ${status.bg} ${status.color}`}>
                            {status.label}
                          </div>
                          <div className="text-xs text-text-muted">{applicant.matchScore}% match</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Active Jobs</h2>
                  <Link to="/recruiter/jobs" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
                    Manage <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {mockJobs.filter(j => j.status === 'active').map((job) => {
                    const status = statusConfig[job.status];
                    return (
                      <div key={job.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{job.title}</div>
                          <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {job.applicants} applicants</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {job.views} views</span>
                          </div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-lg ${status.bg} ${status.color}`}>
                          {status.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </FadeIn>
          </div>

          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/recruiter/post-job">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors cursor-pointer">
                      <Plus className="w-5 h-5 text-primary-400" />
                      <span className="text-sm">Post New Job</span>
                      <ArrowUpRight className="w-4 h-4 text-text-muted ml-auto" />
                    </div>
                  </Link>
                  <Link to="/recruiter/applicants">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors cursor-pointer">
                      <Users className="w-5 h-5 text-accent-purple" />
                      <span className="text-sm">Review Applicants</span>
                      <ArrowUpRight className="w-4 h-4 text-text-muted ml-auto" />
                    </div>
                  </Link>
                  <Link to="/recruiter/analytics">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors cursor-pointer">
                      <BarChart3 className="w-5 h-5 text-accent-cyan" />
                      <span className="text-sm">View Analytics</span>
                      <ArrowUpRight className="w-4 h-4 text-text-muted ml-auto" />
                    </div>
                  </Link>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-muted">Application Rate</span>
                      <span className="text-text-primary">7.1%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                      <div className="w-[71%] h-full bg-primary-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-muted">Avg. Time to Hire</span>
                      <span className="text-text-primary">28 days</span>
                    </div>
                    <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                      <div className="w-[56%] h-full bg-accent-purple rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-muted">Candidate Quality</span>
                      <span className="text-text-primary">4.5/5</span>
                    </div>
                    <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                      <div className="w-[90%] h-full bg-accent-green rounded-full" />
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <FadeIn>
          <Card className="p-6">
            {mockJobs.length === 0 ? (
              <EmptyState
                icon={<Briefcase className="w-8 h-8" />}
                title="No jobs posted"
                description="Post your first job to start receiving applicants."
                action={{ label: 'Post a Job', onClick: () => {}, icon: <Plus className="w-4 h-4" /> }}
              />
            ) : (
              <div className="space-y-3">
                {mockJobs.map((job) => {
                  const status = statusConfig[job.status];
                  return (
                    <div key={job.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{job.title}</div>
                        <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {job.applicants} applicants</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {job.views} views</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Posted {formatDate(job.postedAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`text-xs px-2 py-1 rounded-lg ${status.bg} ${status.color}`}>
                          {status.label}
                        </div>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors">
                          Manage
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </FadeIn>
      )}

      {activeTab === 'applicants' && (
        <FadeIn>
          <Card className="p-6">
            {mockApplicants.length === 0 ? (
              <EmptyState
                icon={<Users className="w-8 h-8" />}
                title="No applicants yet"
                description="Applicants will appear here once they apply to your jobs."
              />
            ) : (
              <div className="space-y-3">
                {mockApplicants.map((applicant) => {
                  const status = applicantStatusConfig[applicant.status];
                  return (
                    <div key={applicant.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-sm font-bold text-white">
                        {applicant.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{applicant.name}</div>
                        <div className="text-sm text-text-muted">{applicant.title}</div>
                        <div className="text-xs text-text-muted mt-1">Applied {formatDate(applicant.appliedAt)}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-text-muted">{applicant.matchScore}% match</div>
                        <div className={`text-xs px-2 py-1 rounded-lg ${status.bg} ${status.color}`}>
                          {status.label}
                        </div>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors">
                          Review
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </FadeIn>
      )}
    </div>
  );
}

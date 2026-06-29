import { useState } from 'react';
import {
  FileBarChart, Download, Calendar, Filter, CheckCircle2,
  AlertCircle, Clock, Users, Briefcase, DollarSign
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/empty-states/EmptyState';

interface Report {
  id: string;
  name: string;
  type: 'users' | 'jobs' | 'revenue' | 'applications';
  status: 'ready' | 'generating' | 'failed';
  createdAt: string;
  size: string;
}

const mockReports: Report[] = [
  { id: '1', name: 'Monthly User Growth - Jan 2024', type: 'users', status: 'ready', createdAt: '2024-01-31', size: '2.4 MB' },
  { id: '2', name: 'Job Posting Analytics - Q4 2023', type: 'jobs', status: 'ready', createdAt: '2024-01-15', size: '1.8 MB' },
  { id: '3', name: 'Revenue Report - Jan 2024', type: 'revenue', status: 'ready', createdAt: '2024-01-31', size: '890 KB' },
  { id: '4', name: 'Application Funnel Analysis', type: 'applications', status: 'generating', createdAt: '2024-01-15', size: '-' },
  { id: '5', name: 'User Retention Report - 2023', type: 'users', status: 'failed', createdAt: '2024-01-10', size: '-' },
];

const typeConfig = {
  users: { icon: Users, color: 'text-primary-400', bg: 'bg-primary-500/10', label: 'Users' },
  jobs: { icon: Briefcase, color: 'text-accent-green', bg: 'bg-accent-green/10', label: 'Jobs' },
  revenue: { icon: DollarSign, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Revenue' },
  applications: { icon: FileBarChart, color: 'text-accent-purple', bg: 'bg-accent-purple/10', label: 'Applications' },
};

const statusConfig = {
  ready: { label: 'Ready', color: 'text-accent-green', bg: 'bg-accent-green/10', icon: CheckCircle2 },
  generating: { label: 'Generating', color: 'text-primary-400', bg: 'bg-primary-500/10', icon: Clock },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertCircle },
};

export function Reports() {
  const [reports] = useState<Report[]>(mockReports);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = typeFilter === 'all' ? reports : reports.filter(r => r.type === typeFilter);

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Reports</h1>
            <p className="text-text-secondary">Generate and download platform reports</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-primary-600 to-accent-indigo text-white hover:shadow-glow-blue transition-shadow">
            <FileBarChart className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-elevated border border-white/10 text-sm text-text-secondary">
            <Calendar className="w-4 h-4" />
            <select className="bg-transparent border-none text-text-primary focus:outline-none">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 12 months</option>
              <option>Custom range</option>
            </select>
          </div>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
          >
            <option value="all">All Types</option>
            <option value="users">Users</option>
            <option value="jobs">Jobs</option>
            <option value="revenue">Revenue</option>
            <option value="applications">Applications</option>
          </select>
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<FileBarChart className="w-8 h-8" />}
          title="No reports"
          description="Generate your first report to see it here."
        />
      ) : (
        <FadeIn delay={0.15}>
          <Card className="p-6">
            <div className="space-y-3">
              {filtered.map((report) => {
                const type = typeConfig[report.type];
                const status = statusConfig[report.status];
                const StatusIcon = status.icon;
                const TypeIcon = type.icon;
                return (
                  <div key={report.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated">
                    <div className={`w-10 h-10 rounded-lg ${type.bg} flex items-center justify-center shrink-0`}>
                      <TypeIcon className={`w-5 h-5 ${type.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{report.name}</div>
                      <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                        <span>{type.label}</span>
                        <span>{report.createdAt}</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg ${status.bg} ${status.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {status.label}
                    </div>
                    {report.status === 'ready' && (
                      <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </FadeIn>
      )}
    </div>
  );
}

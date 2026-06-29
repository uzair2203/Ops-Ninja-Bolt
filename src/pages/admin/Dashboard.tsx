import { useState } from 'react';
import {
  LayoutDashboard, Users, Building2, Briefcase, FileText,
  TrendingUp, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight,
  Activity, Eye, MousePointer, Clock
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { AdminStats } from '@/types';

const mockStats: AdminStats = {
  totalUsers: 5234,
  totalRecruiters: 456,
  totalJobs: 1247,
  totalApplications: 8932,
  revenue: 128450,
  activeSubscriptions: 312,
};

const recentActivity = [
  { action: 'New user registered', detail: 'alex@example.com', time: '2 min ago', type: 'user' },
  { action: 'Job posted', detail: 'Senior DevOps Engineer at Vercel', time: '5 min ago', type: 'job' },
  { action: 'Application submitted', detail: 'Alex Rivera applied to Platform Engineer', time: '8 min ago', type: 'application' },
  { action: 'Subscription upgraded', detail: 'Vercel upgraded to Growth plan', time: '12 min ago', type: 'subscription' },
  { action: 'New recruiter joined', detail: 'Stripe Inc. registered', time: '15 min ago', type: 'recruiter' },
  { action: 'Job reported', detail: 'Suspicious job listing flagged', time: '18 min ago', type: 'report' },
];

const topJobs = [
  { title: 'Senior DevOps Engineer', company: 'Vercel', applicants: 142, views: 1240 },
  { title: 'Platform Engineer', company: 'Stripe', applicants: 98, views: 890 },
  { title: 'SRE', company: 'Linear', applicants: 76, views: 654 },
  { title: 'Cloud Engineer', company: 'Supabase', applicants: 65, views: 543 },
];

const activityTypeConfig = {
  user: { icon: Users, color: 'text-primary-400', bg: 'bg-primary-500/10' },
  job: { icon: Briefcase, color: 'text-accent-green', bg: 'bg-accent-green/10' },
  application: { icon: FileText, color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
  subscription: { icon: DollarSign, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  recruiter: { icon: Building2, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
  report: { icon: Activity, color: 'text-red-400', bg: 'bg-red-500/10' },
};

export function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { label: 'Total Users', value: mockStats.totalUsers.toLocaleString(), change: '+12%', icon: Users, color: 'text-primary-400', trend: 'up' },
    { label: 'Recruiters', value: mockStats.totalRecruiters.toLocaleString(), change: '+5%', icon: Building2, color: 'text-accent-purple', trend: 'up' },
    { label: 'Active Jobs', value: mockStats.totalJobs.toLocaleString(), change: '+8%', icon: Briefcase, color: 'text-accent-green', trend: 'up' },
    { label: 'Applications', value: mockStats.totalApplications.toLocaleString(), change: '+23%', icon: FileText, color: 'text-accent-cyan', trend: 'up' },
    { label: 'Revenue', value: `$${mockStats.revenue.toLocaleString()}`, change: '+15%', icon: DollarSign, color: 'text-amber-400', trend: 'up' },
    { label: 'Subscriptions', value: mockStats.activeSubscriptions.toLocaleString(), change: '+7%', icon: TrendingUp, color: 'text-accent-indigo', trend: 'up' },
  ];

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-text-secondary">Platform overview and key metrics</p>
          </div>
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => {
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          return (
            <StaggerItem key={stat.label}>
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div className={`flex items-center gap-0.5 text-xs ${stat.trend === 'up' ? 'text-accent-green' : 'text-red-400'}`}>
                    <TrendIcon className="w-3.5 h-3.5" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FadeIn delay={0.1}>
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-2">
                {recentActivity.map((activity, i) => {
                  const config = activityTypeConfig[activity.type as keyof typeof activityTypeConfig];
                  const Icon = config.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-elevated transition-colors">
                      <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{activity.action}</div>
                        <div className="text-xs text-text-muted truncate">{activity.detail}</div>
                      </div>
                      <span className="text-xs text-text-muted shrink-0">{activity.time}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Top Performing Jobs</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-text-muted uppercase tracking-wider border-b border-white/5">
                      <th className="pb-3 font-medium">Job</th>
                      <th className="pb-3 font-medium text-right">Applicants</th>
                      <th className="pb-3 font-medium text-right">Views</th>
                      <th className="pb-3 font-medium text-right">Conversion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {topJobs.map((job) => (
                      <tr key={job.title}>
                        <td className="py-3">
                          <div className="font-medium text-sm">{job.title}</div>
                          <div className="text-xs text-text-muted">{job.company}</div>
                        </td>
                        <td className="py-3 text-sm text-text-secondary text-right">{job.applicants}</td>
                        <td className="py-3 text-sm text-text-secondary text-right">{job.views}</td>
                        <td className="py-3 text-sm text-accent-green text-right">
                          {((job.applicants / job.views) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </FadeIn>
        </div>

        <div className="space-y-6">
          <FadeIn delay={0.2}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Platform Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted">API Uptime</span>
                    <span className="text-accent-green">99.98%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="w-[99.98%] h-full bg-accent-green rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted">Avg Response Time</span>
                    <span className="text-primary-400">42ms</span>
                  </div>
                  <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-primary-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted">Error Rate</span>
                    <span className="text-accent-green">0.02%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="w-[2%] h-full bg-accent-green rounded-full" />
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.25}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors text-left">
                  <Users className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">Manage Users</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors text-left">
                  <Briefcase className="w-4 h-4 text-accent-green" />
                  <span className="text-sm">Review Jobs</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors text-left">
                  <Building2 className="w-4 h-4 text-accent-purple" />
                  <span className="text-sm">Review Recruiters</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors text-left">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span className="text-sm">View Revenue</span>
                </button>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

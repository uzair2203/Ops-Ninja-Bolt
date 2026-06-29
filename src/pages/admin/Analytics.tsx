import { useState } from 'react';
import {
  BarChart3, TrendingUp, Users, Briefcase, FileText,
  DollarSign, Eye, MousePointer, ArrowUpRight, ArrowDownRight,
  Calendar, Download
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';

const dailyStats = [
  { date: 'Mon', users: 45, jobs: 8, applications: 23 },
  { date: 'Tue', users: 62, jobs: 12, applications: 31 },
  { date: 'Wed', users: 38, jobs: 5, applications: 18 },
  { date: 'Thu', users: 85, jobs: 15, applications: 42 },
  { date: 'Fri', users: 72, jobs: 10, applications: 35 },
  { date: 'Sat', users: 28, jobs: 3, applications: 12 },
  { date: 'Sun', users: 35, jobs: 4, applications: 15 },
];

const topCountries = [
  { country: 'United States', users: 2340, percentage: 45 },
  { country: 'United Kingdom', users: 567, percentage: 11 },
  { country: 'Germany', users: 423, percentage: 8 },
  { country: 'Canada', users: 312, percentage: 6 },
  { country: 'India', users: 289, percentage: 5 },
  { country: 'Other', users: 1303, percentage: 25 },
];

const revenueByPlan = [
  { plan: 'Pro (Seeker)', revenue: 25810, subscribers: 890 },
  { plan: 'Premium (Seeker)', revenue: 11455, subscribers: 145 },
  { plan: 'Starter (Recruiter)', revenue: 46524, subscribers: 156 },
  { plan: 'Growth (Recruiter)', revenue: 71111, subscribers: 89 },
  { plan: 'Enterprise (Recruiter)', revenue: 29988, subscribers: 12 },
];

export function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [metric, setMetric] = useState<'users' | 'jobs' | 'applications'>('users');

  const stats = [
    { label: 'Total Users', value: '5,234', change: '+12%', icon: Users, color: 'text-primary-400', trend: 'up' },
    { label: 'New Jobs', value: '57', change: '+8%', icon: Briefcase, color: 'text-accent-green', trend: 'up' },
    { label: 'Applications', value: '176', change: '+23%', icon: FileText, color: 'text-accent-purple', trend: 'up' },
    { label: 'Revenue', value: '$18,450', change: '+15%', icon: DollarSign, color: 'text-amber-400', trend: 'up' },
  ];

  const maxValue = Math.max(...dailyStats.map(d => d[metric]));

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Analytics</h1>
            <p className="text-text-secondary">Detailed platform analytics and insights</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-elevated border border-white/10 text-sm text-text-secondary">
              <Calendar className="w-4 h-4" />
              <select value={timeRange} onChange={e => setTimeRange(e.target.value)} className="bg-transparent border-none text-text-primary focus:outline-none">
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <button className="p-2.5 rounded-xl bg-surface-elevated border border-white/10 text-text-muted hover:text-text-primary transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <FadeIn delay={0.1}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold">Activity Overview</h2>
              <div className="flex gap-1">
                {(['users', 'jobs', 'applications'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setMetric(m)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      metric === m ? 'bg-primary-500/10 text-primary-400' : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-3 h-48">
              {dailyStats.map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-surface-elevated rounded-lg overflow-hidden relative" style={{ height: '160px' }}>
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-primary-500/40 to-primary-500/20 rounded-lg transition-all hover:from-primary-500/60 hover:to-primary-500/30"
                      style={{ height: `${(day[metric] / maxValue) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-muted">{day.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card className="p-6">
            <h2 className="font-semibold mb-6">Users by Country</h2>
            <div className="space-y-4">
              {topCountries.map((country) => (
                <div key={country.country}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-secondary">{country.country}</span>
                    <span className="text-text-muted">{country.users.toLocaleString()} ({country.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Revenue by Plan</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-text-muted uppercase tracking-wider border-b border-white/5">
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium text-right">Subscribers</th>
                  <th className="pb-3 font-medium text-right">MRR</th>
                  <th className="pb-3 font-medium text-right">ARR</th>
                  <th className="pb-3 font-medium text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {revenueByPlan.map((plan) => (
                  <tr key={plan.plan}>
                    <td className="py-4 text-sm font-medium text-text-primary">{plan.plan}</td>
                    <td className="py-4 text-sm text-text-secondary text-right">{plan.subscribers.toLocaleString()}</td>
                    <td className="py-4 text-sm text-text-secondary text-right">${plan.revenue.toLocaleString()}</td>
                    <td className="py-4 text-sm text-text-secondary text-right">${(plan.revenue * 12).toLocaleString()}</td>
                    <td className="py-4 text-right">
                      <TrendingUp className="w-4 h-4 text-accent-green inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}

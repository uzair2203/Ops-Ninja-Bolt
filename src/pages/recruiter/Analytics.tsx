import { useState } from 'react';
import {
  BarChart3, TrendingUp, Users, Eye, MousePointer, ArrowUpRight,
  Calendar, ChevronDown
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';

const dailyViews = [
  { date: 'Mon', views: 45 },
  { date: 'Tue', views: 62 },
  { date: 'Wed', views: 38 },
  { date: 'Thu', views: 85 },
  { date: 'Fri', views: 72 },
  { date: 'Sat', views: 28 },
  { date: 'Sun', views: 35 },
];

const topSources = [
  { source: 'Direct Search', count: 245, percentage: 42 },
  { source: 'Google', count: 128, percentage: 22 },
  { source: 'LinkedIn', count: 89, percentage: 15 },
  { source: 'GitHub', count: 67, percentage: 11 },
  { source: 'Twitter', count: 34, percentage: 6 },
  { source: 'Other', count: 24, percentage: 4 },
];

const jobPerformance = [
  { title: 'Senior DevOps Engineer', applicants: 24, views: 342, conversion: 7.0 },
  { title: 'Platform Engineer', applicants: 18, views: 256, conversion: 7.0 },
  { title: 'Site Reliability Engineer', applicants: 12, views: 189, conversion: 6.3 },
];

export function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const maxViews = Math.max(...dailyViews.map(d => d.views));

  const stats = [
    { label: 'Total Views', value: '787', change: '+23%', icon: Eye, color: 'text-accent-cyan' },
    { label: 'Total Applicants', value: '66', change: '+12', icon: Users, color: 'text-accent-purple' },
    { label: 'Conversion Rate', value: '7.1%', change: '+0.8%', icon: TrendingUp, color: 'text-accent-green' },
    { label: 'Avg. Time to Apply', value: '2.4m', change: '-0.3m', icon: MousePointer, color: 'text-primary-400' },
  ];

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Analytics</h1>
            <p className="text-text-secondary">Track your job posting performance</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-elevated border border-white/10 text-sm text-text-secondary">
            <Calendar className="w-4 h-4" />
            <select value={timeRange} onChange={e => setTimeRange(e.target.value)} className="bg-transparent border-none text-text-primary focus:outline-none">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-accent-green">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <FadeIn delay={0.1}>
          <Card className="p-6">
            <h2 className="font-semibold mb-6">Daily Views</h2>
            <div className="flex items-end gap-3 h-48">
              {dailyViews.map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-surface-elevated rounded-lg overflow-hidden relative" style={{ height: '160px' }}>
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-primary-500/40 to-primary-500/20 rounded-lg transition-all hover:from-primary-500/60 hover:to-primary-500/30"
                      style={{ height: `${(day.views / maxViews) * 100}%` }}
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
            <h2 className="font-semibold mb-6">Traffic Sources</h2>
            <div className="space-y-4">
              {topSources.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-secondary">{source.source}</span>
                    <span className="text-text-muted">{source.count} ({source.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full"
                      style={{ width: `${source.percentage}%` }}
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
          <h2 className="font-semibold mb-4">Job Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-text-muted uppercase tracking-wider border-b border-white/5">
                  <th className="pb-3 font-medium">Job Title</th>
                  <th className="pb-3 font-medium text-right">Views</th>
                  <th className="pb-3 font-medium text-right">Applicants</th>
                  <th className="pb-3 font-medium text-right">Conversion</th>
                  <th className="pb-3 font-medium text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {jobPerformance.map((job) => (
                  <tr key={job.title} className="group">
                    <td className="py-4 text-sm font-medium text-text-primary">{job.title}</td>
                    <td className="py-4 text-sm text-text-secondary text-right">{job.views}</td>
                    <td className="py-4 text-sm text-text-secondary text-right">{job.applicants}</td>
                    <td className="py-4 text-sm text-accent-green text-right">{job.conversion}%</td>
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

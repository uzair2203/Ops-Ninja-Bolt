import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, Bookmark, FileText, TrendingUp, Eye, Clock, MapPin, DollarSign,
  ArrowRight, CheckCircle2, AlertCircle, Zap, Star, ChevronRight, Briefcase,
  LayoutDashboard, BarChart3, PieChart, Activity, Users, Building2,
  Sparkles, Flame, MoreHorizontal, Filter, ExternalLink, Pin, X,
  ChevronDown, Settings, LogOut, User, CreditCard, Shield, HelpCircle,
  Plus, Download, Share2, RefreshCw, Maximize2, Minimize2, PanelLeft,
  Command, Inbox, Calendar, Timer, GitBranch, CircleDot, Hash, Tag
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';
import { formatSalary, formatDate } from '@/lib/utils';
import type { JobApplication, SavedJob, Job, Notification } from '@/types';

/* ─── Mock Data ─── */
const mockApplications: JobApplication[] = [
  { id: '1', jobId: '1', jobTitle: 'Senior DevOps Engineer', companyName: 'Vercel', companyLogoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop', status: 'interview', appliedAt: '2024-01-10', coverLetter: '', resumeUrl: '' },
  { id: '2', jobId: '2', jobTitle: 'Platform Engineer', companyName: 'Stripe', companyLogoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop', status: 'reviewed', appliedAt: '2024-01-08', coverLetter: '', resumeUrl: '' },
  { id: '3', jobId: '3', jobTitle: 'Site Reliability Engineer', companyName: 'Linear', companyLogoUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop', status: 'pending', appliedAt: '2024-01-05', coverLetter: '', resumeUrl: '' },
  { id: '4', jobId: '7', jobTitle: 'AWS Solutions Architect', companyName: 'Vercel', companyLogoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop', status: 'rejected', appliedAt: '2024-01-02', coverLetter: '', resumeUrl: '' },
];

const mockSavedJobs: SavedJob[] = [
  { id: '1', jobId: '4', jobTitle: 'Cloud Infrastructure Engineer', companyName: 'Supabase', companyLogoUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=100&h=100&fit=crop', location: 'Singapore / Remote', salaryMin: 140000, salaryMax: 200000, currency: 'USD', savedAt: '2024-01-12' },
  { id: '2', jobId: '5', jobTitle: 'Kubernetes Platform Lead', companyName: 'Railway', companyLogoUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop', location: 'Remote', salaryMin: 170000, salaryMax: 240000, currency: 'USD', savedAt: '2024-01-11' },
  { id: '3', jobId: '6', jobTitle: 'Senior SRE - Container Runtime', companyName: 'Docker', companyLogoUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=100&h=100&fit=crop', location: 'Palo Alto, CA', salaryMin: 190000, salaryMax: 260000, currency: 'USD', savedAt: '2024-01-10' },
];

const mockRecommendations: Job[] = [
  { id: '6', title: 'Senior SRE - Container Runtime', slug: 'senior-sre-container-runtime-docker', companyId: '6', companyName: 'Docker', companyLogoUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=100&h=100&fit=crop', location: 'Palo Alto, CA', type: 'Full-time', remote: false, salaryMin: 190000, salaryMax: 260000, currency: 'USD', tags: ['Docker', 'Containers', 'Linux', 'Go'], description: '', requirements: [], benefits: [], featured: false, status: 'active', postedAt: '2024-01-10' },
  { id: '7', title: 'AWS Solutions Architect', slug: 'aws-solutions-architect-vercel', companyId: '1', companyName: 'Vercel', companyLogoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop', location: 'Remote', type: 'Contract', remote: true, salaryMin: 120, salaryMax: 180, currency: 'USD', tags: ['AWS', 'Architecture', 'Serverless', 'Edge'], description: '', requirements: [], benefits: [], featured: false, status: 'active', postedAt: '2024-01-09' },
  { id: '8', title: 'Cybersecurity Engineer', slug: 'cybersecurity-engineer-stripe', companyId: '2', companyName: 'Stripe', companyLogoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop', location: 'San Francisco, CA', type: 'Full-time', remote: true, salaryMin: 220000, salaryMax: 320000, currency: 'USD', tags: ['Security', 'Compliance', 'Threat Detection', 'SIEM'], description: '', requirements: [], benefits: [], featured: false, status: 'active', postedAt: '2024-01-08' },
  { id: '9', title: 'AI Infrastructure Engineer', slug: 'ai-infrastructure-engineer-linear', companyId: '3', companyName: 'Linear', companyLogoUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop', location: 'Remote', type: 'Full-time', remote: true, salaryMin: 200000, salaryMax: 280000, currency: 'USD', tags: ['AI/ML', 'GPU', 'PyTorch', 'Kubernetes'], description: '', requirements: [], benefits: [], featured: false, status: 'active', postedAt: '2024-01-07' },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: Clock },
  reviewed: { label: 'Reviewed', color: 'text-sky-400', bg: 'bg-sky-500/10', icon: Eye },
  interview: { label: 'Interview', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle2 },
  rejected: { label: 'Not Selected', color: 'text-rose-400', bg: 'bg-rose-500/10', icon: AlertCircle },
  hired: { label: 'Hired', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle2 },
};

const recentActivity = [
  { action: 'Applied to Senior DevOps Engineer', company: 'Vercel', time: '2h ago', type: 'application', icon: FileText },
  { action: 'Saved Kubernetes Platform Lead', company: 'Railway', time: '5h ago', type: 'save', icon: Bookmark },
  { action: 'Profile viewed by Stripe recruiter', company: 'Stripe', time: '1d ago', type: 'view', icon: Eye },
  { action: 'New job match: AI Infrastructure', company: 'Linear', time: '1d ago', type: 'match', icon: Sparkles },
  { action: 'Interview scheduled', company: 'Vercel', time: '2d ago', type: 'interview', icon: Calendar },
];

/* ─── Mini Chart Component ─── */
function MiniChart({ data, color = '#3B82F6' }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`).join(' ');
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Stat Card ─── */
function StatCard({ label, value, change, changeType, icon: Icon, chartData, color, delay }: any) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="p-5 h-full relative overflow-hidden group cursor-pointer" hover>
        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ background: `linear-gradient(135deg, ${color}15, transparent)` }} />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <motion.div
              animate={{ rotate: hovered ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <MoreHorizontal className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">{value}</div>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${changeType === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
              {change}
            </span>
            <span className="text-xs text-text-muted">vs last month</span>
          </div>
          <MiniChart data={chartData} color={color} />
        </div>
      </Card>
    </motion.div>
  );
}

/* ─── Job Row ─── */
function JobRow({ job, type = 'default' }: { job: any; type?: 'default' | 'compact' | 'recommendation' }) {
  const [hovered, setHovered] = useState(false);
  const isRec = type === 'recommendation';

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
    >
      <Link to={`/jobs/${job.id}`}>
        <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${hovered ? 'bg-white/[0.04]' : ''}`}>
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
            <img src={job.companyLogoUrl || job.companyLogo} alt={job.companyName || job.company} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-text-primary truncate">{job.title || job.jobTitle}</span>
              {isRec && <Badge variant="purple" className="text-[10px]">98% match</Badge>}
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
              <span>{job.companyName || job.company}</span>
              <span className="w-1 h-1 rounded-full bg-text-muted/50" />
              <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {job.location}</span>
            </div>
          </div>
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-1 shrink-0"
              >
                <span className="text-xs font-medium text-emerald-400">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Application Row ─── */
function ApplicationRow({ app }: { app: JobApplication }) {
  const [hovered, setHovered] = useState(false);
  const status = statusConfig[app.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
    >
      <Link to="/seeker/applications">
        <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${hovered ? 'bg-white/[0.04]' : ''}`}>
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
            <img src={app.companyLogoUrl} alt={app.companyName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-text-primary truncate">{app.jobTitle}</div>
            <div className="text-xs text-text-muted">{app.companyName}</div>
          </div>
          <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md ${status.bg} ${status.color}`}>
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN DASHBOARD
   ═══════════════════════════════════════════ */
export function SeekerDashboard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const stats = [
    { label: 'Applications', value: '12', change: '+3', changeType: 'up', icon: FileText, chartData: [2, 4, 3, 5, 7, 6, 8, 10, 9, 12], color: '#3B82F6' },
    { label: 'Profile Views', value: '47', change: '+12', changeType: 'up', icon: Eye, chartData: [20, 25, 22, 30, 28, 35, 32, 40, 38, 47], color: '#8B5CF6' },
    { label: 'Saved Jobs', value: '8', change: '+2', changeType: 'up', icon: Bookmark, chartData: [3, 4, 4, 5, 5, 6, 6, 7, 7, 8], color: '#06B6D4' },
    { label: 'Match Score', value: '92%', change: '+5%', changeType: 'up', icon: Sparkles, chartData: [70, 72, 75, 78, 80, 82, 85, 88, 90, 92], color: '#10B981' },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── Top Bar ─── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-xl border-b border-white/[0.06]"
      >
        <div className="flex items-center gap-4">
          {/* Search */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-text-muted hover:text-text-primary hover:bg-white/[0.06] transition-colors text-sm w-64"
          >
            <Search className="w-4 h-4" />
            <span>Search...</span>
            <kbd className="ml-auto px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono">⌘K</kbd>
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              <Bell className="w-5 h-5 text-text-muted" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-background" />
            </motion.button>

            <AnimatePresence>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-80 bg-surface border border-white/[0.08] rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                      <span className="font-semibold text-sm">Notifications</span>
                      <button className="text-xs text-primary-400 hover:text-primary-300">Mark all read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {[
                        { title: 'Interview scheduled', desc: 'Vercel - Senior DevOps Engineer', time: '2h ago', unread: true },
                        { title: 'Application viewed', desc: 'Stripe reviewed your profile', time: '5h ago', unread: true },
                        { title: 'New job match', desc: '98% match: AI Infrastructure Engineer', time: '1d ago', unread: false },
                      ].map((n, i) => (
                        <div key={i} className={`p-4 hover:bg-white/[0.03] cursor-pointer transition-colors ${n.unread ? 'bg-primary-500/[0.03]' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.unread ? 'bg-primary-400' : 'bg-transparent'}`} />
                            <div>
                              <div className="text-sm font-medium">{n.title}</div>
                              <div className="text-xs text-text-muted mt-0.5">{n.desc}</div>
                              <div className="text-[10px] text-text-muted mt-1">{n.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-xs font-bold text-white">
                {user?.avatar}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-12 w-56 bg-surface border border-white/[0.08] rounded-2xl shadow-2xl z-50 overflow-hidden py-1"
                  >
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                      <div className="font-medium text-sm">{user?.name}</div>
                      <div className="text-xs text-text-muted">{user?.email}</div>
                    </div>
                    {[
                      { label: 'Profile', icon: User, href: '/seeker/profile' },
                      { label: 'Settings', icon: Settings, href: '/seeker/settings' },
                      { label: 'Billing', icon: CreditCard, href: '/seeker/billing' },
                    ].map((item) => (
                      <Link key={item.label} to={item.href} onClick={() => setProfileOpen(false)}>
                        <div className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.04] transition-colors">
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-white/[0.06] mt-1 pt-1">
                      <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-rose-400 hover:bg-rose-500/10 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* ─── Search Modal ─── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              className="relative w-full max-w-xl bg-surface border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
                <Search className="w-5 h-5 text-text-muted" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none"
                />
                <kbd className="px-2 py-1 rounded bg-white/[0.06] text-[10px] font-mono text-text-muted">ESC</kbd>
              </div>
              <div className="p-2">
                <div className="text-xs text-text-muted px-3 py-2">Recent searches</div>
                {['Kubernetes', 'AWS Solutions Architect', 'SRE', 'Platform Engineer'].map((term) => (
                  <div key={term} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04] cursor-pointer text-sm text-text-secondary">
                    <Clock className="w-4 h-4 text-text-muted" />
                    {term}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="p-6 max-w-[1600px] mx-auto">
        {/* ─── Welcome ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-text-primary">
            {greeting}, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Here's what's happening with your job search
          </p>
        </motion.div>

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 0.08} />
          ))}
        </div>

        {/* ─── Main Grid ─── */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column (8) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-0 overflow-hidden" hover={false}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Recent Applications</h3>
                      <p className="text-xs text-text-muted">{mockApplications.length} total</p>
                    </div>
                  </div>
                  <Link to="/seeker/applications" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
                    View all <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {mockApplications.slice(0, 3).map((app) => (
                    <ApplicationRow key={app.id} app={app} />
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recommended Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-0 overflow-hidden" hover={false}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-accent-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Recommended for You</h3>
                      <p className="text-xs text-text-muted">Based on your profile</p>
                    </div>
                  </div>
                  <Link to="/seeker/recommendations" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
                    View all <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {mockRecommendations.slice(0, 3).map((job) => (
                    <JobRow key={job.id} job={job} type="recommendation" />
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Usage Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-5" hover={false}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-text-muted" />
                    <h3 className="font-semibold text-sm">Activity Overview</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    {['7D', '30D', '90D'].map((period) => (
                      <button
                        key={period}
                        className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${
                          period === '7D' ? 'bg-white/[0.08] text-text-primary' : 'text-text-muted hover:text-text-secondary'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-40 flex items-end gap-2">
                  {[45, 62, 38, 85, 72, 28, 35, 55, 48, 70, 60, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 relative group"
                      initial={{ height: 0 }}
                      animate={{ height: `${(h / 100) * 100}%` }}
                      transition={{ delay: 0.6 + i * 0.03, duration: 0.5, ease: 'easeOut' }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 rounded-t-md bg-gradient-to-t from-primary-500/30 to-primary-500/10 group-hover:from-primary-500/50 group-hover:to-primary-500/20 transition-all" style={{ height: '100%' }} />
                      <div className="absolute bottom-0 left-0 right-0 rounded-t-md bg-primary-500/60 group-hover:bg-primary-400 transition-all" style={{ height: '2px' }} />
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-text-muted">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column (4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Completion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card className="p-5" hover={false}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-lg font-bold text-white">
                    {user?.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{user?.name}</div>
                    <div className="text-xs text-text-muted">{user?.title}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">Profile completion</span>
                    <span className="text-primary-400 font-medium">85%</span>
                  </div>
                  <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <Link to="/seeker/profile">
                  <button className="w-full mt-4 py-2 rounded-lg text-xs font-medium bg-white/[0.04] text-text-secondary hover:bg-white/[0.06] hover:text-text-primary transition-colors">
                    Complete Profile
                  </button>
                </Link>
              </Card>
            </motion.div>

            {/* Saved Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Card className="p-0 overflow-hidden" hover={false}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-accent-cyan" />
                    <h3 className="font-semibold text-sm">Saved Jobs</h3>
                  </div>
                  <span className="text-xs text-text-muted">{mockSavedJobs.length}</span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {mockSavedJobs.map((job) => (
                    <JobRow key={job.id} job={job} />
                  ))}
                </div>
                <Link to="/seeker/saved">
                  <div className="px-5 py-3 text-xs text-primary-400 hover:text-primary-300 flex items-center justify-center gap-1 hover:bg-white/[0.02] transition-colors cursor-pointer">
                    View all saved <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </Card>
            </motion.div>

            {/* Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Card className="p-5 relative overflow-hidden" hover={false}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-accent-purple/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <h3 className="font-semibold text-sm">Pro Plan</h3>
                    <Badge variant="success" className="text-[10px]">Active</Badge>
                  </div>
                  <p className="text-xs text-text-muted mb-4">
                    Your subscription renews on Feb 15, 2024
                  </p>
                  <div className="space-y-2 mb-4">
                    {['Featured profile', 'Priority applications', 'Exclusive jobs'].map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link to="/seeker/subscription">
                    <button className="w-full py-2 rounded-lg text-xs font-medium bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors">
                      Manage Subscription
                    </button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-5" hover={false}>
                <h3 className="font-semibold text-sm mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Browse Jobs', icon: Search, href: '/seeker/jobs', color: 'text-primary-400', bg: 'bg-primary-500/10' },
                    { label: 'Post Job', icon: Plus, href: '/pricing', color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
                    { label: 'Resume', icon: FileText, href: '/seeker/resume', color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
                    { label: 'Settings', icon: Settings, href: '/seeker/settings', color: 'text-text-muted', bg: 'bg-white/[0.04]' },
                  ].map((action) => (
                    <Link key={action.label} to={action.href}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl ${action.bg} hover:bg-white/[0.06] transition-colors w-full`}
                      >
                        <action.icon className={`w-5 h-5 ${action.color}`} />
                        <span className="text-xs text-text-secondary">{action.label}</span>
                      </motion.button>
                    </Link>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <Card className="p-0 overflow-hidden" hover={false}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-text-muted" />
                    <h3 className="font-semibold text-sm">Recent Activity</h3>
                  </div>
                </div>
                <div className="px-2 py-2">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                        <activity.icon className="w-3.5 h-3.5 text-text-muted" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-text-primary truncate">{activity.action}</div>
                        <div className="text-[10px] text-text-muted mt-0.5">{activity.company} · {activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

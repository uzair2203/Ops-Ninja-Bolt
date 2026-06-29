import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Search, ArrowRight, Zap, Star, ChevronRight, MapPin, DollarSign, Clock,
  Building2, Briefcase, Users, TrendingUp, Shield, Globe, Cpu, Server,
  Cloud, Container, Lock, Brain, Check, Play, Pause, Sparkles,
  ChevronDown, Heart, Layers, GitBranch, Monitor, Database, HardDrive,
  Wifi, Rocket, Target, Compass, Gem, Crown,
  User
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { jobs, companies } from '@/data/jobs';
import { formatSalary, formatDate } from '@/lib/utils';

/* ────────────────────────────────
   Animated SVG Background Pattern
   ──────────────────────────────── */
function NetworkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

/* ────────────────────────────────
   Floating Infrastructure Icons
   ──────────────────────────────── */
const floatingIcons = [
  { Icon: Server, x: '8%', y: '15%', size: 32, delay: 0, duration: 7 },
  { Icon: Cloud, x: '85%', y: '20%', size: 40, delay: 1.5, duration: 8 },
  { Icon: Container, x: '15%', y: '65%', size: 28, delay: 0.8, duration: 9 },
  { Icon: Database, x: '78%', y: '70%', size: 30, delay: 2.2, duration: 7.5 },
  { Icon: Cpu, x: '5%', y: '40%', size: 24, delay: 3, duration: 10 },
  { Icon: GitBranch, x: '92%', y: '45%', size: 26, delay: 1, duration: 8.5 },
  { Icon: Layers, x: '25%', y: '85%', size: 22, delay: 2.5, duration: 9 },
  { Icon: Wifi, x: '70%', y: '10%', size: 20, delay: 0.5, duration: 7 },
  { Icon: HardDrive, x: '45%', y: '75%', size: 24, delay: 1.8, duration: 8 },
  { Icon: Monitor, x: '60%', y: '85%', size: 28, delay: 3.5, duration: 9.5 },
];

function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {floatingIcons.map(({ Icon, x, y, size, delay, duration }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -15, 8, -10, 0],
            x: [0, 5, -3, 7, 0],
            rotate: [0, 3, -2, 4, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-primary-500/20 blur-xl" style={{ width: size * 1.5, height: size * 1.5, marginLeft: -size * 0.25, marginTop: -size * 0.25 }} />
            <Icon className="relative text-white/[0.08]" style={{ width: size, height: size }} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ────────────────────────────────
   Animated Gradient Orbs
   ──────────────────────────────── */
function GradientOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)',
          filter: 'blur(100px)',
          left: '-10%',
          top: '-20%',
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)',
          filter: 'blur(80px)',
          right: '-5%',
          top: '10%',
        }}
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)',
          filter: 'blur(80px)',
          left: '30%',
          bottom: '-10%',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.05, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
    </div>
  );
}

/* ────────────────────────────────
   Hero Search Component
   ──────────────────────────────── */
const trendingSearches = ['Kubernetes', 'AWS Solutions Architect', 'SRE', 'Platform Engineer', 'Terraform', 'Docker'];

function HeroSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div
          className={`relative flex items-center gap-3 bg-surface/80 backdrop-blur-xl border rounded-2xl px-2 py-2 transition-all duration-300 ${
            isFocused ? 'border-primary-500/40 shadow-[0_0_40px_-10px_rgba(59,130,246,0.25)]' : 'border-white/10'
          }`}
        >
          <div className="pl-3">
            <Search className="w-5 h-5 text-text-muted" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search jobs, companies, or skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="flex-1 bg-transparent py-3 text-text-primary placeholder:text-text-muted focus:outline-none text-base"
          />
          <Link to="/jobs">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-indigo text-white font-medium hover:shadow-glow-blue transition-all duration-300 flex items-center gap-2">
              Search
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Trending searches */}
        <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
          <span className="text-xs text-text-muted">Trending:</span>
          {trendingSearches.map((term) => (
            <Link
              key={term}
              to="/jobs"
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-text-muted hover:text-primary-400 hover:bg-primary-500/10 border border-white/5 hover:border-primary-500/20 transition-all duration-200"
            >
              {term}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────
   Live Hiring Counter
   ──────────────────────────────── */
function LiveHiringCounter() {
  const [count, setCount] = useState(1247);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <motion.div
      className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-accent-green/10 border border-accent-green/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-green" />
      </span>
      <span className="text-sm text-accent-green font-medium">
        <AnimatedCounter end={count} suffix="" /> companies hiring now
      </span>
      <button
        onClick={() => setIsLive(!isLive)}
        className="text-text-muted hover:text-text-primary transition-colors"
      >
        {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
      </button>
    </motion.div>
  );
}

/* ────────────────────────────────
   Logo Marquee
   ──────────────────────────────── */
const marqueeCompanies = [
  'Vercel', 'Stripe', 'Linear', 'Supabase', 'Railway', 'Docker',
  'GitHub', 'Vercel', 'Stripe', 'Linear', 'Supabase', 'Railway',
];

function LogoMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <motion.div
        className="flex gap-12 items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...marqueeCompanies, ...marqueeCompanies].map((name, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sm font-bold text-text-muted">
              {name.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-lg font-semibold text-text-muted/60 whitespace-nowrap">{name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────
   SVG Illustration - Cloud Network
   ──────────────────────────────── */
function CloudNetworkIllustration() {
  return (
    <motion.svg
      viewBox="0 0 400 300"
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      <defs>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      <motion.g stroke="url(#nodeGrad)" strokeWidth="1" opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <line x1="200" y1="80" x2="100" y2="150" />
        <line x1="200" y1="80" x2="300" y2="150" />
        <line x1="200" y1="80" x2="200" y2="220" />
        <line x1="100" y1="150" x2="200" y2="220" />
        <line x1="300" y1="150" x2="200" y2="220" />
        <line x1="100" y1="150" x2="300" y2="150" />
      </motion.g>

      {/* Central cloud */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.3, duration: 0.8 }}
      >
        <circle cx="200" cy="80" r="35" fill="url(#cloudGrad)" filter="url(#glow)" />
        <Cloud cx="200" cy="80" className="text-primary-400" style={{ transform: 'translate(184px, 64px)' }} />
      </motion.g>

      {/* Nodes */}
      {[
        { cx: 100, cy: 150, icon: Server },
        { cx: 300, cy: 150, icon: Database },
        { cx: 200, cy: 220, icon: Container },
        { cx: 60, cy: 100, icon: Cpu },
        { cx: 340, cy: 100, icon: Layers },
        { cx: 150, cy: 260, icon: GitBranch },
        { cx: 250, cy: 260, icon: HardDrive },
      ].map((node, i) => (
        <motion.g key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.5 + i * 0.1, duration: 0.5 }}
        >
          <circle cx={node.cx} cy={node.cy} r="20" fill="rgba(11,18,32,0.8)" stroke="url(#nodeGrad)" strokeWidth="1.5" />
          <foreignObject x={node.cx - 8} y={node.cy - 8} width="16" height="16">
            <node.icon className="w-4 h-4 text-primary-400" />
          </foreignObject>
        </motion.g>
      ))}

      {/* Animated data packets */}
      <motion.circle r="3" fill="#00D4FF" filter="url(#glow)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M200,80 L100,150" />
      </motion.circle>
      <motion.circle r="3" fill="#8B5CF6" filter="url(#glow)">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M200,80 L300,150" />
      </motion.circle>
      <motion.circle r="3" fill="#10B981" filter="url(#glow)">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M100,150 L200,220" />
      </motion.circle>
    </motion.svg>
  );
}

/* ────────────────────────────────
   Main Home Page
   ──────────────────────────────── */
export function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const featuredJobs = jobs.filter(j => j.featured);
  const recentJobs = jobs.slice(0, 6);

  const roleCategories = [
    { icon: Server, label: 'DevOps Engineers', count: 234, color: 'from-primary-500/20 to-primary-600/10' },
    { icon: Cloud, label: 'Cloud Engineers', count: 189, color: 'from-accent-cyan/20 to-accent-blue/10' },
    { icon: Container, label: 'Kubernetes', count: 156, color: 'from-accent-purple/20 to-accent-indigo/10' },
    { icon: Cpu, label: 'Platform Engineers', count: 98, color: 'from-accent-green/20 to-emerald-600/10' },
    { icon: Shield, label: 'SRE', count: 87, color: 'from-amber-500/20 to-orange-600/10' },
    { icon: Lock, label: 'Cybersecurity', count: 76, color: 'from-red-500/20 to-red-600/10' },
    { icon: Brain, label: 'AI Infrastructure', count: 54, color: 'from-pink-500/20 to-rose-600/10' },
    { icon: Globe, label: 'Infrastructure', count: 112, color: 'from-slate-500/20 to-slate-600/10' },
  ];

  const stats = [
    { value: 1200, suffix: '+', label: 'Active Jobs', icon: Briefcase },
    { value: 450, suffix: '+', label: 'Companies', icon: Building2 },
    { value: 50000, suffix: '+', label: 'Engineers', icon: Users },
    { value: 95, suffix: '%', label: 'Match Rate', icon: TrendingUp },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Apply',
      description: 'One-click applications with your profile. No cover letters, no lengthy forms.',
      gradient: 'from-primary-500/20 to-accent-indigo/10',
    },
    {
      icon: Shield,
      title: 'Verified Companies',
      description: 'Every company is vetted. No spam, no recruiters, only direct hiring.',
      gradient: 'from-accent-green/20 to-emerald-600/10',
    },
    {
      icon: Globe,
      title: 'Remote First',
      description: '70% of our jobs are remote-friendly. Work from anywhere in the world.',
      gradient: 'from-accent-cyan/20 to-accent-blue/10',
    },
    {
      icon: TrendingUp,
      title: 'Salary Transparency',
      description: 'Every listing shows the salary range upfront. No surprises in the interview.',
      gradient: 'from-accent-purple/20 to-accent-indigo/10',
    },
  ];

  const testimonials = [
    {
      quote: "Found my dream SRE role at a unicorn startup in just 2 weeks. The quality of listings here is unmatched.",
      author: 'Sarah Chen',
      role: 'Senior SRE @ Linear',
      avatar: 'SC',
      rating: 5,
    },
    {
      quote: "As a hiring manager, this is the only platform where we find qualified DevOps talent. Worth every penny.",
      author: 'Marcus Johnson',
      role: 'VP Engineering @ Vercel',
      avatar: 'MJ',
      rating: 5,
    },
    {
      quote: "The salary transparency and remote-first focus made my job search so much easier. Highly recommend.",
      author: 'Alex Rivera',
      role: 'Platform Engineer @ Stripe',
      avatar: 'AR',
      rating: 5,
    },
  ];

  const faqs = [
    { q: 'How does Cloud & DevOps Jobs differ from other job boards?', a: 'We focus exclusively on Cloud and DevOps roles. Every company is vetted, every salary is transparent, and 70% of jobs are remote-friendly.' },
    { q: 'Is it free for job seekers?', a: 'Yes! Browsing and applying to jobs is completely free. We also offer Pro and Premium plans with additional features.' },
    { q: 'How do you verify companies?', a: 'We manually review every company that posts jobs. We check their website, team size, funding status, and engineering culture.' },
    { q: 'Can I apply with just my profile?', a: 'Absolutely. One-click applications use your profile. No need to upload a resume for every application.' },
    { q: 'What types of roles do you list?', a: 'DevOps, Cloud Engineering, SRE, Platform Engineering, Kubernetes, Cybersecurity, AI Infrastructure, and more.' },
    { q: 'How often are new jobs posted?', a: 'New jobs are posted daily. Set up job alerts to get notified immediately when a matching role is published.' },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative overflow-hidden">
      <NetworkBackground />

      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32">
        <GradientOrbs />
        <FloatingIcons />

        <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.08)_0%,transparent_50%)]" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <LiveHiringCounter />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
              >
                <span className="text-text-primary">The Best Place to</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-cyan to-accent-purple">
                  Hire & Get Hired
                </span>
                <br />
                <span className="text-text-primary">in Cloud & DevOps</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0"
              >
                The premium marketplace for DevOps Engineers, Cloud Architects, SREs, and Platform Engineers. 
                No recruiters. No spam. Just great jobs.
              </motion.p>

              <HeroSearch />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-text-muted"
              >
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-accent-green" />
                  Free for job seekers
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-accent-green" />
                  Salary transparency
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-accent-green" />
                  Remote-first
                </span>
              </motion.div>
            </div>

            {/* Right: Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <CloudNetworkIllustration />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-text-muted" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          LOGO MARQUEE
          ═══════════════════════════════════════ */}
      <section className="border-y border-white/5 bg-surface/30">
        <LogoMarquee />
      </section>

      {/* ═══════════════════════════════════════
          ROLE CATEGORIES
          ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
              >
                <Compass className="w-4 h-4" />
                Browse by Role
              </motion.div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Find your <span className="gradient-text">specialty</span>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                Specialized categories for every Cloud and DevOps discipline
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {roleCategories.map((role) => (
              <StaggerItem key={role.label}>
                <Link to="/jobs">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`relative p-6 rounded-2xl bg-gradient-to-br ${role.color} border border-white/5 backdrop-blur-sm cursor-pointer group overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-surface/80" />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                          <role.icon className="w-6 h-6 text-primary-400" />
                        </div>
                        <span className="text-xs text-text-muted font-mono">{role.count}</span>
                      </div>
                      <h3 className="font-semibold text-text-primary group-hover:text-primary-400 transition-colors">
                        {role.label}
                      </h3>
                      <div className="flex items-center gap-1 mt-2 text-xs text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED COMPANIES
          ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Featured Companies</h2>
                <p className="text-text-secondary">Innovative companies building the future</p>
              </div>
              <Link to="/companies" className="hidden sm:flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <StaggerItem key={company.id}>
                <Link to={`/companies/${company.id}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card className="p-0 overflow-hidden h-full group">
                      {/* Company header with gradient */}
                      <div className="relative h-28 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-30`} />
                        <div className="absolute inset-0 bg-mesh-1" />
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface to-transparent" />
                        <div className="absolute bottom-4 left-6">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl border-2 border-surface">
                            <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 pt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-text-primary group-hover:text-primary-400 transition-colors text-lg">
                            {company.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            {company.rating}
                          </div>
                        </div>
                        <p className="text-sm text-text-secondary mb-4 line-clamp-2">{company.description}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {company.tags.map((tag) => (
                            <Badge key={tag} variant="default" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm pt-4 border-t border-white/5">
                          <span className="flex items-center gap-1 text-text-muted">
                            <Briefcase className="w-3.5 h-3.5" /> {company.openPositions} open
                          </span>
                          <span className="flex items-center gap-1 text-text-muted">
                            <Users className="w-3.5 h-3.5" /> {company.size}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED JOBS
          ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Featured Jobs</h2>
                <p className="text-text-secondary">Hand-picked opportunities from top companies</p>
              </div>
              <Link to="/jobs" className="hidden sm:flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-4">
            {featuredJobs.map((job, index) => (
              <StaggerItem key={job.id}>
                <Link to={`/jobs/${job.id}`}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Card className="p-5 group relative overflow-hidden">
                      {/* Subtle gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/0 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                          <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-text-primary group-hover:text-primary-400 transition-colors text-lg">
                              {job.title}
                            </h3>
                            {job.featured && (
                              <Badge variant="primary">Featured</Badge>
                            )}
                            {job.remote && (
                              <Badge variant="success">Remote</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5" /> {job.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {formatDate(job.postedAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {job.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="default">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="flex items-center gap-1 text-sm font-medium text-accent-green">
                            <DollarSign className="w-4 h-4" />
                            {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATISTICS
          ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-surface/30 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary-500/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-purple/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Trusted by the <span className="gradient-text">best</span>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                Join thousands of engineers and companies who trust our platform
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StaggerItem key={stat.label}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-2xl bg-surface-elevated/50 border border-white/5 backdrop-blur-sm"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-purple/20 mb-4">
                    <stat.icon className="w-7 h-7 text-primary-400" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-text-primary mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                How it <span className="gradient-text">works</span>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                Three simple steps to your next opportunity
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary-500/30 via-accent-purple/30 to-accent-cyan/30" />

            {[
              {
                step: '01',
                icon: User,
                title: 'Create Your Profile',
                description: 'Build your profile with skills, experience, and preferences. Our AI matches you with relevant roles.',
                color: 'from-primary-500 to-primary-600',
              },
              {
                step: '02',
                icon: Search,
                title: 'Discover Jobs',
                description: 'Browse curated listings or let our recommendation engine surface the best matches for you.',
                color: 'from-accent-purple to-accent-indigo',
              },
              {
                step: '03',
                icon: Zap,
                title: 'Apply in One Click',
                description: 'No lengthy forms. One click sends your profile directly to the hiring manager.',
                color: 'from-accent-cyan to-accent-blue',
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.15}>
                <div className="relative text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} mb-6 shadow-lg relative z-10`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-6xl font-bold text-white/[0.03] select-none">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES
          ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Built for <span className="gradient-text">engineers</span>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                Every feature designed to make your job search faster and easier
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <StaggerItem key={feature.title}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Card className="p-8 h-full relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-purple/20 flex items-center justify-center mb-6">
                        <feature.icon className="w-7 h-7 text-primary-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-text-secondary">{feature.description}</p>
                    </div>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-500/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm font-medium mb-6"
              >
                <Heart className="w-4 h-4" />
                Loved by engineers
              </motion.div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                What people <span className="gradient-text">say</span>
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <StaggerItem key={testimonial.author}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="p-8 h-full relative">
                    <div className="absolute top-6 right-6">
                      <QuoteIcon />
                    </div>
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-text-secondary mb-8 italic leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-sm font-bold text-white">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{testimonial.author}</div>
                        <div className="text-sm text-text-muted">{testimonial.role}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRICING PREVIEW
          ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Simple, transparent <span className="gradient-text">pricing</span>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                For job seekers and employers alike
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* For Job Seekers */}
            <FadeIn delay={0.1}>
              <Card className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-500/10 to-accent-purple/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-primary-400" />
                    <span className="text-sm font-medium text-primary-400">For Job Seekers</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Free Forever</h3>
                  <p className="text-text-secondary mb-6">Browse, save, and apply to jobs at no cost.</p>
                  <ul className="space-y-3 mb-8">
                    {['Browse all jobs', 'Create a profile', 'Save up to 5 jobs', 'Standard applications'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-accent-green shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/register">
                    <Button className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </Card>
            </FadeIn>

            {/* For Employers */}
            <FadeIn delay={0.2}>
              <Card className="p-8 relative overflow-hidden border-primary-500/20">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-accent-purple/10 to-accent-cyan/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-accent-purple" />
                    <span className="text-sm font-medium text-accent-purple">For Employers</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Start at $299/mo</h3>
                  <p className="text-text-secondary mb-6">Post jobs and access our curated talent pool.</p>
                  <ul className="space-y-3 mb-8">
                    {['1 active job listing', '30-day visibility', 'Applicant tracking', 'Email support'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-accent-green shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/pricing">
                    <Button variant="outline" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                      View Employer Plans
                    </Button>
                  </Link>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
          ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Frequently <span className="gradient-text">asked</span>
              </h2>
              <p className="text-text-secondary">Everything you need to know</p>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-text-primary pr-4">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-text-muted" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-text-secondary">{faq.a}</div>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-accent-indigo/10 to-accent-purple/20" />
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-purple/10 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8"
            >
              <Rocket className="w-4 h-4" />
              Start your journey today
            </motion.div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Ready to find your next{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-cyan to-accent-purple">
                Cloud & DevOps
              </span>{' '}
              role?
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
              Join 50,000+ engineers and 450+ companies. The future of Cloud and DevOps hiring starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/jobs">
                <Button size="lg" icon={<Search className="w-5 h-5" />}>
                  Browse Jobs
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  Post a Job
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────────
   Quote SVG Icon
   ──────────────────────────────── */
function QuoteIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-white/5">
      <path
        d="M10 20C10 15.5 13.5 12 18 12V16C15.5 16 14 17.5 14 20H18V28H10V20ZM22 20C22 15.5 25.5 12 30 12V16C27.5 16 26 17.5 26 20H30V28H22V20Z"
        fill="currentColor"
      />
    </svg>
  );
}

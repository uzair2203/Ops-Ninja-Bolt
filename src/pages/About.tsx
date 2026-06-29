import { Link } from 'react-router-dom';
import {
  Target,
  Users,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  ArrowRight,
  Heart,
  Code2,
  Cloud,
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const values = [
  {
    icon: Target,
    title: 'Precision Matching',
    description: 'We use advanced filtering and skill mapping to connect the right engineers with the right roles.',
  },
  {
    icon: Shield,
    title: 'Quality First',
    description: 'Every company is vetted. Every job is real. No spam, no recruiters, no nonsense.',
  },
  {
    icon: Zap,
    title: 'Speed Matters',
    description: 'One-click applications, instant profile matching, and fast response times from employers.',
  },
  {
    icon: Globe,
    title: 'Remote Native',
    description: 'Built for the distributed world. 70% of our listings are remote-friendly or fully remote.',
  },
  {
    icon: TrendingUp,
    title: 'Transparency',
    description: 'Salary ranges upfront. Clear requirements. No hidden surprises in the interview process.',
  },
  {
    icon: Heart,
    title: 'Community Driven',
    description: 'Built by engineers, for engineers. We listen to feedback and iterate constantly.',
  },
];

const team = [
  {
    name: 'Alex Morgan',
    role: 'Founder & CEO',
    bio: 'Former SRE at Google. Built internal hiring tools before starting Cloud & DevOps Jobs.',
    initials: 'AM',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    bio: 'Ex-Principal Engineer at Stripe. Kubernetes contributor and open source advocate.',
    initials: 'PS',
  },
  {
    name: 'James Chen',
    role: 'Head of Product',
    bio: 'Previously led product at Linear. Obsessed with developer experience and design.',
    initials: 'JC',
  },
  {
    name: 'Sarah Kim',
    role: 'Head of Community',
    bio: 'Built developer communities at Vercel and Supabase. Connects people with opportunities.',
    initials: 'SK',
  },
];

export function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <Cloud className="w-4 h-4" />
              About Us
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">
              Built by engineers,{' '}
              <span className="gradient-text">for engineers</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Cloud & DevOps Jobs was born from frustration. We were tired of generic job boards, 
              recruiter spam, and opaque hiring processes. So we built the platform we wished existed 
              — a curated marketplace connecting the best Cloud and DevOps talent with the world's 
              most innovative companies.
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 p-8 rounded-2xl bg-surface-elevated border border-white/5">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400 mb-1">
                <AnimatedCounter end={2022} suffix="" />
              </div>
              <div className="text-sm text-text-muted">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-purple mb-1">
                <AnimatedCounter end={50000} suffix="+" />
              </div>
              <div className="text-sm text-text-muted">Engineers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-cyan mb-1">
                <AnimatedCounter end={450} suffix="+" />
              </div>
              <div className="text-sm text-text-muted">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-green mb-1">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <div className="text-sm text-text-muted">Match Rate</div>
            </div>
          </div>
        </FadeIn>

        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <FadeIn>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We believe that finding your next role as a Cloud or DevOps engineer should be 
                as smooth as deploying to production. No friction, no noise, just quality 
                opportunities that match your skills and aspirations.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                For companies, we provide access to a curated pool of senior infrastructure 
                talent — engineers who have built and scaled systems at the world's most 
                demanding organizations.
              </p>
              <Link to="/jobs">
                <Button icon={<ArrowRight className="w-4 h-4" />}>
                  Explore Jobs
                </Button>
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} direction="left">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-purple/20 rounded-3xl blur-3xl" />
              <Card className="relative p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                      <Code2 className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Engineer-First Design</h3>
                      <p className="text-sm text-text-secondary">Every feature is designed with the developer experience in mind. Fast, intuitive, and beautiful.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-accent-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Curated Community</h3>
                      <p className="text-sm text-text-secondary">We verify every company and review every job listing to maintain the highest quality bar.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-accent-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Data-Driven Matching</h3>
                      <p className="text-sm text-text-secondary">Our matching algorithm considers skills, experience, and preferences to surface the best fits.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </FadeIn>
        </div>

        {/* Values */}
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Our Values</h2>
            <p className="text-text-secondary">The principles that guide everything we do</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <Card className="p-6 h-full">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-text-secondary">{value.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Team */}
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Meet the Team</h2>
            <p className="text-text-secondary">The people building the future of tech hiring</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <Card className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-lg font-bold text-white mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-primary-400 mb-2">{member.role}</p>
                <p className="text-sm text-text-secondary">{member.bio}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}

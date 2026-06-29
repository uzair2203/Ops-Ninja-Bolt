import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, DollarSign, Bookmark, Check, X, Briefcase } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { formatSalary, formatDate } from '@/lib/utils';
import type { Job } from '@/types';

const mockRecommendations: Job[] = [
  {
    id: '6', title: 'Senior SRE - Container Runtime', slug: 'senior-sre-container-runtime-docker',
    companyId: '6', companyName: 'Docker', companyLogoUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=100&h=100&fit=crop',
    location: 'Palo Alto, CA', type: 'Full-time', remote: false,
    salaryMin: 190000, salaryMax: 260000, currency: 'USD',
    tags: ['Docker', 'Containers', 'Linux', 'Go'],
    description: '', requirements: [], benefits: [], featured: false, status: 'active', postedAt: '2024-01-10'
  },
  {
    id: '7', title: 'AWS Solutions Architect', slug: 'aws-solutions-architect-vercel',
    companyId: '1', companyName: 'Vercel', companyLogoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop',
    location: 'Remote', type: 'Contract', remote: true,
    salaryMin: 120, salaryMax: 180, currency: 'USD',
    tags: ['AWS', 'Architecture', 'Serverless', 'Edge'],
    description: '', requirements: [], benefits: [], featured: false, status: 'active', postedAt: '2024-01-09'
  },
  {
    id: '8', title: 'Cybersecurity Engineer', slug: 'cybersecurity-engineer-stripe',
    companyId: '2', companyName: 'Stripe', companyLogoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop',
    location: 'San Francisco, CA', type: 'Full-time', remote: true,
    salaryMin: 220000, salaryMax: 320000, currency: 'USD',
    tags: ['Security', 'Compliance', 'Threat Detection', 'SIEM'],
    description: '', requirements: [], benefits: [], featured: false, status: 'active', postedAt: '2024-01-08'
  },
  {
    id: '9', title: 'AI Infrastructure Engineer', slug: 'ai-infrastructure-engineer-linear',
    companyId: '3', companyName: 'Linear', companyLogoUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop',
    location: 'Remote', type: 'Full-time', remote: true,
    salaryMin: 200000, salaryMax: 280000, currency: 'USD',
    tags: ['AI/ML', 'GPU', 'PyTorch', 'Kubernetes'],
    description: '', requirements: [], benefits: [], featured: false, status: 'active', postedAt: '2024-01-07'
  },
];

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Job[]>(mockRecommendations);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const dismiss = (id: string) => {
    setDismissedIds(prev => new Set(prev).add(id));
  };

  const visible = recommendations.filter(r => !dismissedIds.has(r.id));

  return (
    <div>
      <FadeIn>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl lg:text-3xl font-bold">Recommended for You</h1>
          </div>
          <p className="text-text-secondary">Jobs matched to your skills and preferences</p>
        </div>
      </FadeIn>

      {visible.length === 0 ? (
        <FadeIn>
          <EmptyState
            icon={<Sparkles className="w-8 h-8" />}
            title="No recommendations"
            description="We'll suggest jobs based on your profile and activity."
          />
        </FadeIn>
      ) : (
        <StaggerContainer className="space-y-3">
          {visible.map((job) => (
            <StaggerItem key={job.id}>
              <Card className="p-5 group">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={job.companyLogoUrl} alt={job.companyName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Link to={`/jobs/${job.id}`}>
                        <h3 className="font-semibold text-text-primary group-hover:text-primary-400 transition-colors">{job.title}</h3>
                      </Link>
                      <Badge variant="purple">98% Match</Badge>
                      {job.remote && <Badge variant="success">Remote</Badge>}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.companyName}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-text-muted">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleSave(job.id)}
                      className={`p-2 rounded-lg transition-colors ${savedIds.has(job.id) ? 'bg-primary-500/20 text-primary-400' : 'bg-white/5 text-text-muted hover:bg-white/10'}`}
                    >
                      <Bookmark className={`w-4 h-4 ${savedIds.has(job.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => dismiss(job.id)}
                      className="p-2 rounded-lg bg-white/5 text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <Link to={`/jobs/${job.id}`}>
                      <button className="px-4 py-2 rounded-xl text-sm font-medium bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}

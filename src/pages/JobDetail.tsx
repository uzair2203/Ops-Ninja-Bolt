import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Briefcase,
  CheckCircle2,
  Send,
  Share2,
  Bookmark,
  ExternalLink,
  Globe,
  Star,
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { jobs, companies } from '@/data/jobs';
import { formatSalary, formatDate } from '@/lib/utils';

export function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const job = jobs.find(j => j.id === id);
  const company = companies.find(c => c.name === job?.company);

  if (!job) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-2">Job not found</h2>
        <p className="text-text-secondary mb-6">This job listing may have been removed or expired.</p>
        <Link to="/jobs">
          <Button icon={<ArrowLeft className="w-4 h-4" />}>Back to Jobs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <Link to="/jobs" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to jobs
          </Link>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <FadeIn>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 overflow-hidden shrink-0">
                    <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h1 className="text-2xl lg:text-3xl font-bold">{job.title}</h1>
                      {job.featured && <Badge variant="primary">Featured</Badge>}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                      <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Posted {formatDate(job.postedAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="default">{job.type}</Badge>
                  {job.remote && <Badge variant="success">Remote</Badge>}
                  {job.tags.map(tag => (
                    <Badge key={tag} variant="purple">{tag}</Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-accent-green" />
                    <div>
                      <div className="text-sm text-text-muted">Salary</div>
                      <div className="font-semibold text-text-primary">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</div>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary-400" />
                    <div>
                      <div className="text-sm text-text-muted">Type</div>
                      <div className="font-semibold text-text-primary">{job.type}</div>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-accent-cyan" />
                    <div>
                      <div className="text-sm text-text-muted">Location</div>
                      <div className="font-semibold text-text-primary">{job.remote ? 'Remote' : job.location}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" icon={<Send className="w-4 h-4" />}>Apply Now</Button>
                  <Button variant="secondary" icon={<Bookmark className="w-4 h-4" />}>Save</Button>
                  <Button variant="secondary" icon={<Share2 className="w-4 h-4" />} />
                </div>
              </Card>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.1}>
              <Card className="p-8">
                <h2 className="text-xl font-bold mb-4">About the Role</h2>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">{job.description}</p>
              </Card>
            </FadeIn>

            {/* Requirements */}
            <FadeIn delay={0.2}>
              <Card className="p-8">
                <h2 className="text-xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>

            {/* Benefits */}
            <FadeIn delay={0.3}>
              <Card className="p-8">
                <h2 className="text-xl font-bold mb-4">Benefits</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {company && (
              <FadeIn delay={0.2}>
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                      <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{company.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-text-muted">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        {company.rating}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">{company.description}</p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-text-muted">
                      <Globe className="w-4 h-4" /> {company.website}
                    </div>
                    <div className="flex items-center gap-2 text-text-muted">
                      <MapPin className="w-4 h-4" /> {company.location}
                    </div>
                    <div className="flex items-center gap-2 text-text-muted">
                      <Building2 className="w-4 h-4" /> {company.size} employees
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {company.tags.map(tag => (
                      <Badge key={tag} variant="default" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <Link to={`/companies/${company.id}`}>
                    <Button variant="outline" className="w-full" icon={<ExternalLink className="w-4 h-4" />}>
                      View Company
                    </Button>
                  </Link>
                </Card>
              </FadeIn>
            )}

            <FadeIn delay={0.3}>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {jobs.filter(j => j.id !== job.id && j.tags.some(t => job.tags.includes(t))).slice(0, 4).map(similar => (
                    <Link key={similar.id} to={`/jobs/${similar.id}`} className="block group">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 overflow-hidden shrink-0">
                          <img src={similar.companyLogo} alt={similar.company} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text-primary group-hover:text-primary-400 transition-colors">{similar.title}</div>
                          <div className="text-xs text-text-muted">{similar.company}</div>
                          <div className="text-xs text-accent-green mt-0.5">{formatSalary(similar.salaryMin, similar.salaryMax, similar.currency)}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

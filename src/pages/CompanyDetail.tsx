import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Globe,
  MapPin,
  Users,
  Star,
  Briefcase,
  ExternalLink,
  Building2,
  Clock,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { companies, jobs } from '@/data/jobs';
import { formatSalary, formatDate } from '@/lib/utils';

export function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const company = companies.find(c => c.id === id);
  const companyJobs = jobs.filter(j => j.company === company?.name);

  if (!company) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-2">Company not found</h2>
        <p className="text-text-secondary mb-6">This company page may have been removed.</p>
        <Link to="/companies">
          <Button icon={<ArrowLeft className="w-4 h-4" />}>Back to Companies</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <Link to="/companies" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to companies
          </Link>
        </FadeIn>

        {/* Company Header */}
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden mb-8">
            <div className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-20`} />
            <div className="absolute inset-0 bg-mesh-1" />
            <div className="relative p-8 lg:p-12">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl shrink-0">
                  <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-3xl lg:text-4xl font-bold">{company.name}</h1>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
                      <Star className="w-4 h-4 fill-amber-400" />
                      {company.rating}
                    </div>
                  </div>
                  <p className="text-text-secondary max-w-2xl mb-4">{company.description}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
                    <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> {company.website}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {company.location}</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {company.size} employees</span>
                    <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {company.industry}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <FadeIn delay={0.1}>
              <Card className="p-8">
                <h2 className="text-xl font-bold mb-4">About {company.name}</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {company.description} {company.name} is a leader in the {company.industry} space, 
                  known for building cutting-edge infrastructure and developer tools. The team is 
                  distributed globally with a strong remote-first culture.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-surface-elevated">
                    <div className="text-sm text-text-muted mb-1">Company Size</div>
                    <div className="font-semibold text-text-primary">{company.size} employees</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-elevated">
                    <div className="text-sm text-text-muted mb-1">Industry</div>
                    <div className="font-semibold text-text-primary">{company.industry}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-elevated">
                    <div className="text-sm text-text-muted mb-1">Open Positions</div>
                    <div className="font-semibold text-text-primary">{company.openPositions} roles</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-elevated">
                    <div className="text-sm text-text-muted mb-1">Rating</div>
                    <div className="font-semibold text-text-primary flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {company.rating} / 5.0
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>

            {/* Tech Stack */}
            <FadeIn delay={0.2}>
              <Card className="p-8">
                <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {company.tags.map(tag => (
                    <Badge key={tag} variant="purple">{tag}</Badge>
                  ))}
                  <Badge variant="cyan">TypeScript</Badge>
                  <Badge variant="info">Go</Badge>
                  <Badge variant="success">Rust</Badge>
                  <Badge variant="default">Kubernetes</Badge>
                  <Badge variant="primary">AWS</Badge>
                  <Badge variant="purple">Docker</Badge>
                  <Badge variant="info">PostgreSQL</Badge>
                </div>
              </Card>
            </FadeIn>

            {/* Open Jobs */}
            <FadeIn delay={0.3}>
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Open Positions</h2>
                  <span className="text-sm text-text-muted">{companyJobs.length} roles</span>
                </div>
                <StaggerContainer className="space-y-3">
                  {companyJobs.map((job) => (
                    <StaggerItem key={job.id}>
                      <Link to={`/jobs/${job.id}`}>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors group">
                          <div>
                            <h3 className="font-medium text-text-primary group-hover:text-primary-400 transition-colors">{job.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-text-muted mt-1">
                              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatDate(job.postedAt)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent-green">
                              <DollarSign className="w-4 h-4" />
                              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                            </span>
                            <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </Card>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Company Info</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-text-muted mb-1">Website</div>
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary-400 hover:text-primary-300 transition-colors">
                      {company.website} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-1">Location</div>
                    <div className="text-text-primary">{company.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-1">Size</div>
                    <div className="text-text-primary">{company.size} employees</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-1">Industry</div>
                    <div className="text-text-primary">{company.industry}</div>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {['Competitive salary & equity', 'Remote-first culture', 'Health & wellness stipend', 'Learning & development budget', 'Flexible PTO', 'Home office setup'].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-green shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, DollarSign, Clock, Building2, SlidersHorizontal,
  X, Bookmark, Check, Briefcase, Grid3X3, List
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { jobs } from '@/data/jobs';
import { formatSalary, formatDate } from '@/lib/utils';

const jobTypes = ['Full-time', 'Contract', 'Freelance', 'Part-time'];
const allTags = Array.from(new Set(jobs.flatMap(j => j.tags)));

export function SeekerJobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
      const matchesTags = selectedTags.length === 0 || selectedTags.some(t => job.tags.includes(t));
      return matchesSearch && matchesType && matchesTags;
    });
  }, [searchQuery, selectedTypes, selectedTags]);

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string, current: string[]) => {
    setter(current.includes(value) ? current.filter(v => v !== value) : [...current, value]);
  };

  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const clearFilters = () => { setSelectedTypes([]); setSelectedTags([]); setSearchQuery(''); };
  const activeFiltersCount = selectedTypes.length + selectedTags.length;

  return (
    <div>
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Browse Jobs</h1>
          <p className="text-text-secondary">{filteredJobs.length} jobs found</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input type="text" placeholder="Search by title, company, or skill..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-surface-elevated border border-white/10 rounded-xl pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500/50 transition-all" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-elevated border border-white/10 text-text-secondary hover:text-text-primary transition-all">
              <SlidersHorizontal className="w-4 h-4" /> Filters
              {activeFiltersCount > 0 && <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">{activeFiltersCount}</span>}
            </button>
            <div className="flex bg-surface-elevated border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setViewMode('list')} className={`px-3 py-3 transition-colors ${viewMode === 'list' ? 'bg-white/5 text-text-primary' : 'text-text-muted'}`}><List className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('grid')} className={`px-3 py-3 transition-colors ${viewMode === 'grid' ? 'bg-white/5 text-text-primary' : 'text-text-muted'}`}><Grid3X3 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </FadeIn>

      <AnimatePresence>
        {showFilters && (
          <div className="bg-surface-elevated border border-white/10 rounded-2xl p-6 mb-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="hidden" checked={selectedTypes.includes(type)} onChange={() => toggleFilter(setSelectedTypes, type, selectedTypes)} />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-primary-500 border-primary-500' : 'border-white/20'}`}>
                        {selectedTypes.includes(type) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm text-text-secondary">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map(tag => (
                    <button key={tag} onClick={() => toggleFilter(setSelectedTags, tag, selectedTags)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${selectedTags.includes(tag) ? 'bg-primary-500/20 border-primary-500/30 text-primary-400' : 'bg-white/5 border-white/5 text-text-muted hover:border-white/20'}`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {activeFiltersCount > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {selectedTypes.map(t => <span key={t} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20">{t} <button onClick={() => toggleFilter(setSelectedTypes, t, selectedTypes)}><X className="w-3 h-3" /></button></span>)}
                  {selectedTags.map(t => <span key={t} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20">{t} <button onClick={() => toggleFilter(setSelectedTags, t, selectedTags)}><X className="w-3 h-3" /></button></span>)}
                </div>
                <button onClick={clearFilters} className="text-sm text-text-muted hover:text-text-secondary">Clear all</button>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>

      {filteredJobs.length === 0 ? (
        <EmptyState icon={<Briefcase className="w-8 h-8" />} title="No jobs found" description="Try adjusting your filters or search query."
          action={{ label: 'Clear filters', onClick: clearFilters, icon: <X className="w-4 h-4" /> }} />
      ) : (
        <AnimatePresence mode="wait">
          <div key={viewMode}>
            {viewMode === 'list' ? (
              <StaggerContainer className="space-y-3">
                {filteredJobs.map(job => (
                  <StaggerItem key={job.id}>
                    <Card className="p-5 group">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                          <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Link to={`/jobs/${job.id}`}><h3 className="font-semibold text-text-primary group-hover:text-primary-400 transition-colors">{job.title}</h3></Link>
                            {job.featured && <Badge variant="primary">Featured</Badge>}
                            {job.remote && <Badge variant="success">Remote</Badge>}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                            <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {job.company}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatDate(job.postedAt)}</span>
                            <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.type}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {job.tags.slice(0, 3).map(tag => <Badge key={tag} variant="default">{tag}</Badge>)}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="flex items-center gap-1 text-sm font-medium text-accent-green"><DollarSign className="w-4 h-4" /> {formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                          <button onClick={() => toggleSave(job.id)} className={`p-2 rounded-lg transition-colors ${savedIds.has(job.id) ? 'bg-primary-500/20 text-primary-400' : 'bg-white/5 text-text-muted hover:bg-white/10'}`}>
                            <Bookmark className={`w-4 h-4 ${savedIds.has(job.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map(job => (
                  <StaggerItem key={job.id}>
                    <Link to={`/jobs/${job.id}`}>
                      <Card className="p-6 h-full group">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden"><img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" /></div>
                          <div className="flex gap-1">
                            {job.featured && <Badge variant="primary">Featured</Badge>}
                            {job.remote && <Badge variant="success">Remote</Badge>}
                          </div>
                        </div>
                        <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary-400 transition-colors">{job.title}</h3>
                        <p className="text-sm text-text-muted mb-2">{job.company}</p>
                        <div className="flex items-center gap-1 text-sm text-text-muted mb-4"><MapPin className="w-3.5 h-3.5" /> {job.location}</div>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {job.tags.map(tag => <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-muted">{tag}</span>)}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-sm font-medium text-accent-green">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                          <span className="text-xs text-text-muted">{formatDate(job.postedAt)}</span>
                        </div>
                      </Card>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

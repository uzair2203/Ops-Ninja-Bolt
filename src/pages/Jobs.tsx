import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  SlidersHorizontal,
  X,
  ChevronDown,
  Briefcase,
  Filter,
  Grid3X3,
  List,
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { jobs } from '@/data/jobs';
import { formatSalary, formatDate } from '@/lib/utils';

const jobTypes = ['Full-time', 'Contract', 'Freelance', 'Part-time'];
const locations = ['Remote', 'San Francisco, CA', 'Palo Alto, CA', 'Singapore / Remote'];
const salaryRanges = [
  { label: '$100k - $150k', min: 100000, max: 150000 },
  { label: '$150k - $200k', min: 150000, max: 200000 },
  { label: '$200k - $300k', min: 200000, max: 300000 },
  { label: '$300k+', min: 300000, max: 999999 },
];
const allTags = Array.from(new Set(jobs.flatMap(j => j.tags)));

export function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(job.location);
      const matchesTags = selectedTags.length === 0 || selectedTags.some(t => job.tags.includes(t));

      let matchesSalary = true;
      if (selectedSalary) {
        const range = salaryRanges.find(r => r.label === selectedSalary);
        if (range) {
          matchesSalary = job.salaryMin >= range.min || job.salaryMax >= range.min;
        }
      }

      return matchesSearch && matchesType && matchesLocation && matchesTags && matchesSalary;
    });
  }, [searchQuery, selectedTypes, selectedLocations, selectedTags, selectedSalary]);

  const activeFiltersCount = selectedTypes.length + selectedLocations.length + selectedTags.length + (selectedSalary ? 1 : 0);

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedLocations([]);
    setSelectedTags([]);
    setSelectedSalary(null);
    setSearchQuery('');
  };

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string, current: string[]) => {
    if (current.includes(value)) {
      setter(current.filter(v => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Browse Jobs</h1>
            <p className="text-text-secondary">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </p>
          </div>
        </FadeIn>

        {/* Search Bar */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search by title, company, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-elevated border border-white/10 rounded-xl pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-elevated border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20 transition-all"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              <div className="flex bg-surface-elevated border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-3 transition-colors ${viewMode === 'list' ? 'bg-white/5 text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-3 transition-colors ${viewMode === 'grid' ? 'bg-white/5 text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-surface-elevated border border-white/10 rounded-2xl p-6 mb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Job Type</h3>
                    <div className="space-y-2">
                      {jobTypes.map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-primary-500 border-primary-500' : 'border-white/20 group-hover:border-white/40'}`}>
                            {selectedTypes.includes(type) && <Filter className="w-3 h-3 text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleFilter(setSelectedTypes, type, selectedTypes)}
                          />
                          <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Location</h3>
                    <div className="space-y-2">
                      {locations.map(loc => (
                        <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedLocations.includes(loc) ? 'bg-primary-500 border-primary-500' : 'border-white/20 group-hover:border-white/40'}`}>
                            {selectedLocations.includes(loc) && <Filter className="w-3 h-3 text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedLocations.includes(loc)}
                            onChange={() => toggleFilter(setSelectedLocations, loc, selectedLocations)}
                          />
                          <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{loc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Salary Range</h3>
                    <div className="space-y-2">
                      {salaryRanges.map(range => (
                        <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedSalary === range.label ? 'bg-primary-500 border-primary-500' : 'border-white/20 group-hover:border-white/40'}`}>
                            {selectedSalary === range.label && <Filter className="w-3 h-3 text-white" />}
                          </div>
                          <input
                            type="radio"
                            name="salary"
                            className="hidden"
                            checked={selectedSalary === range.label}
                            onChange={() => setSelectedSalary(range.label)}
                          />
                          <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleFilter(setSelectedTags, tag, selectedTags)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${selectedTags.includes(tag) ? 'bg-primary-500/20 border-primary-500/30 text-primary-400' : 'bg-white/5 border-white/5 text-text-muted hover:border-white/20'}`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {selectedTypes.map(t => (
                        <span key={t} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20">
                          {t}
                          <button onClick={() => toggleFilter(setSelectedTypes, t, selectedTypes)}><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                      {selectedLocations.map(l => (
                        <span key={l} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20">
                          {l}
                          <button onClick={() => toggleFilter(setSelectedLocations, l, selectedLocations)}><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                      {selectedTags.map(t => (
                        <span key={t} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20">
                          {t}
                          <button onClick={() => toggleFilter(setSelectedTags, t, selectedTags)}><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                      {selectedSalary && (
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20">
                          {selectedSalary}
                          <button onClick={() => setSelectedSalary(null)}><X className="w-3 h-3" /></button>
                        </span>
                      )}
                    </div>
                    <button onClick={clearFilters} className="text-sm text-text-muted hover:text-text-secondary transition-colors">
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20">
              <Briefcase className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-text-secondary mb-6">Try adjusting your filters or search query</p>
              <button onClick={clearFilters} className="text-primary-400 hover:text-primary-300 transition-colors">
                Clear all filters
              </button>
            </div>
          </FadeIn>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode + JSON.stringify([selectedTypes, selectedLocations, selectedTags, selectedSalary, searchQuery])}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {viewMode === 'list' ? (
                <StaggerContainer className="space-y-3">
                  {filteredJobs.map((job) => (
                    <StaggerItem key={job.id}>
                      <Link to={`/jobs/${job.id}`}>
                        <Card className="p-5 group">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                              <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="font-semibold text-text-primary group-hover:text-primary-400 transition-colors">
                                  {job.title}
                                </h3>
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
                              {job.tags.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="default">{tag}</Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="flex items-center gap-1 text-sm font-medium text-accent-green">
                                <DollarSign className="w-4 h-4" />
                                {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <StaggerItem key={job.id}>
                      <Link to={`/jobs/${job.id}`}>
                        <Card className="p-6 h-full group">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden">
                              <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex gap-1">
                              {job.featured && <Badge variant="primary">Featured</Badge>}
                              {job.remote && <Badge variant="success">Remote</Badge>}
                            </div>
                          </div>
                          <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary-400 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm text-text-muted mb-2">{job.company}</p>
                          <div className="flex items-center gap-1 text-sm text-text-muted mb-4">
                            <MapPin className="w-3.5 h-3.5" /> {job.location}
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {job.tags.map(tag => (
                              <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-muted">{tag}</span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-sm font-medium text-accent-green">
                              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                            </span>
                            <span className="text-xs text-text-muted">{formatDate(job.postedAt)}</span>
                          </div>
                        </Card>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

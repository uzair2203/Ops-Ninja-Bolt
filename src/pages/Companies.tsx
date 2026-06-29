import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Building2,
  MapPin,
  Users,
  Star,
  SlidersHorizontal,
  X,
  Briefcase,
  ArrowRight,
  Grid3X3,
  List,
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { companies } from '@/data/jobs';

const industries = Array.from(new Set(companies.map(c => c.industry)));
const sizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000-5000'];

export function Companies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch = !searchQuery ||
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(company.industry);

      return matchesSearch && matchesIndustry;
    });
  }, [searchQuery, selectedIndustries]);

  const activeFiltersCount = selectedIndustries.length;

  const clearFilters = () => {
    setSelectedIndustries([]);
    setSearchQuery('');
  };

  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Companies</h1>
            <p className="text-text-secondary">
              {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'} hiring
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
                placeholder="Search companies..."
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
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Industry</h3>
                  <div className="flex flex-wrap gap-2">
                    {industries.map(industry => (
                      <button
                        key={industry}
                        onClick={() => toggleIndustry(industry)}
                        className={`text-sm px-3 py-1.5 rounded-lg border transition-all ${selectedIndustries.includes(industry) ? 'bg-primary-500/20 border-primary-500/30 text-primary-400' : 'bg-white/5 border-white/5 text-text-muted hover:border-white/20'}`}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {selectedIndustries.map(i => (
                        <span key={i} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20">
                          {i}
                          <button onClick={() => toggleIndustry(i)}><X className="w-3 h-3" /></button>
                        </span>
                      ))}
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

        {/* Companies List */}
        {filteredCompanies.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20">
              <Building2 className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No companies found</h3>
              <p className="text-text-secondary mb-6">Try adjusting your filters or search query</p>
              <button onClick={clearFilters} className="text-primary-400 hover:text-primary-300 transition-colors">
                Clear all filters
              </button>
            </div>
          </FadeIn>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode + JSON.stringify([selectedIndustries, searchQuery])}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {viewMode === 'grid' ? (
                <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCompanies.map((company) => (
                    <StaggerItem key={company.id}>
                      <Link to={`/companies/${company.id}`}>
                        <Card className="p-6 h-full group">
                          <div className="relative h-32 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-primary-900/20 to-accent-purple/20">
                            <div className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-30`} />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
                                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-text-primary group-hover:text-primary-400 transition-colors">
                              {company.name}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-amber-400">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              {company.rating}
                            </div>
                          </div>
                          <p className="text-sm text-text-secondary mb-4 line-clamp-2">{company.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {company.tags.map(tag => (
                              <Badge key={tag} variant="default" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm pt-4 border-t border-white/5">
                            <span className="flex items-center gap-1 text-text-muted">
                              <Briefcase className="w-3.5 h-3.5" /> {company.openPositions} open
                            </span>
                            <span className="flex items-center gap-1 text-text-muted">
                              <MapPin className="w-3.5 h-3.5" /> {company.location}
                            </span>
                          </div>
                        </Card>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <StaggerContainer className="space-y-3">
                  {filteredCompanies.map((company) => (
                    <StaggerItem key={company.id}>
                      <Link to={`/companies/${company.id}`}>
                        <Card className="p-5 group">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                              <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-text-primary group-hover:text-primary-400 transition-colors">
                                  {company.name}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-amber-400">
                                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                                  {company.rating}
                                </div>
                              </div>
                              <p className="text-sm text-text-secondary line-clamp-1">{company.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {company.tags.map(tag => (
                                <Badge key={tag} variant="default">{tag}</Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 shrink-0 text-sm text-text-muted">
                              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {company.openPositions} open</span>
                              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {company.size}</span>
                              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                            </div>
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

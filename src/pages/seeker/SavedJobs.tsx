import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, DollarSign, X, ArrowRight, Trash2 } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { formatSalary } from '@/lib/utils';
import type { SavedJob } from '@/types';

const mockSavedJobs: SavedJob[] = [
  {
    id: '1', jobId: '4', jobTitle: 'Cloud Infrastructure Engineer', companyName: 'Supabase',
    companyLogoUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=100&h=100&fit=crop',
    location: 'Singapore / Remote', salaryMin: 140000, salaryMax: 200000, currency: 'USD', savedAt: '2024-01-12'
  },
  {
    id: '2', jobId: '5', jobTitle: 'Kubernetes Platform Lead', companyName: 'Railway',
    companyLogoUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop',
    location: 'Remote', salaryMin: 170000, salaryMax: 240000, currency: 'USD', savedAt: '2024-01-11'
  },
  {
    id: '3', jobId: '6', jobTitle: 'Senior SRE - Container Runtime', companyName: 'Docker',
    companyLogoUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=100&h=100&fit=crop',
    location: 'Palo Alto, CA', salaryMin: 190000, salaryMax: 260000, currency: 'USD', savedAt: '2024-01-10'
  },
];

export function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>(mockSavedJobs);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSavedJobs(prev => prev.filter(j => j.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Saved Jobs</h1>
            <p className="text-text-secondary">{savedJobs.length} jobs saved</p>
          </div>
        </div>
      </FadeIn>

      {savedJobs.length === 0 ? (
        <FadeIn>
          <EmptyState
            icon={<Bookmark className="w-8 h-8" />}
            title="No saved jobs"
            description="Save jobs you're interested in to review them later."
            action={{ label: 'Browse Jobs', onClick: () => {}, icon: <ArrowRight className="w-4 h-4" /> }}
          />
        </FadeIn>
      ) : (
        <StaggerContainer className="space-y-3">
          {savedJobs.map((job) => (
            <StaggerItem key={job.id}>
              <Card className="p-5 group">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img src={job.companyLogoUrl} alt={job.companyName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/jobs/${job.jobId}`}>
                      <h3 className="font-semibold text-text-primary group-hover:text-primary-400 transition-colors">{job.jobTitle}</h3>
                    </Link>
                    <p className="text-sm text-text-muted">{job.companyName}</p>
                    <div className="flex items-center gap-3 text-sm text-text-muted mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/jobs/${job.jobId}`}>
                      <button className="px-4 py-2 rounded-xl text-sm font-medium bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors">
                        Apply
                      </button>
                    </Link>
                    <button
                      onClick={() => setDeleteId(job.id)}
                      className="p-2 rounded-xl text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Remove Saved Job"
        description="Are you sure you want to remove this job from your saved list?"
        confirmLabel="Remove"
        variant="warning"
      />
    </div>
  );
}

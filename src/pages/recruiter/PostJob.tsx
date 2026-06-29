import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, MapPin, DollarSign, Tag, FileText, ListChecks, HeartHandshake,
  ChevronRight, ChevronLeft, Check, AlertCircle, Plus, X
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/modals/Toast';

const steps = [
  { id: 'basics', label: 'Basics', icon: Briefcase },
  { id: 'details', label: 'Details', icon: FileText },
  { id: 'requirements', label: 'Requirements', icon: ListChecks },
  { id: 'benefits', label: 'Benefits', icon: HeartHandshake },
  { id: 'review', label: 'Review', icon: Check },
];

export function PostJob() {
  const navigate = useNavigate();
  const { addToast, ToastContainer } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    remote: false,
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    description: '',
    requirements: [''],
    benefits: [''],
    tags: [] as string[],
    newTag: '',
  });

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRequirement = () => setFormData(prev => ({ ...prev, requirements: [...prev.requirements, ''] }));
  const removeRequirement = (i: number) => setFormData(prev => ({ ...prev, requirements: prev.requirements.filter((_, idx) => idx !== i) }));
  const updateRequirement = (i: number, value: string) => {
    const reqs = [...formData.requirements];
    reqs[i] = value;
    setFormData(prev => ({ ...prev, requirements: reqs }));
  };

  const addBenefit = () => setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
  const removeBenefit = (i: number) => setFormData(prev => ({ ...prev, benefits: prev.benefits.filter((_, idx) => idx !== i) }));
  const updateBenefit = (i: number, value: string) => {
    const bens = [...formData.benefits];
    bens[i] = value;
    setFormData(prev => ({ ...prev, benefits: bens }));
  };

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, prev.newTag.trim()], newTag: '' }));
    }
  };

  const removeTag = (tag: string) => setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));

  const canProceed = () => {
    if (currentStep === 0) return formData.title && formData.location;
    if (currentStep === 1) return formData.description.length > 50;
    if (currentStep === 2) return formData.requirements.some(r => r.trim());
    if (currentStep === 3) return formData.benefits.some(b => b.trim());
    return true;
  };

  const handleSubmit = () => {
    addToast({ type: 'success', title: 'Job posted successfully!', message: 'Your job is now live and visible to candidates.' });
    setTimeout(() => navigate('/recruiter/jobs'), 1500);
  };

  return (
    <div>
      <ToastContainer />
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Post a Job</h1>
          <p className="text-text-secondary">Create a new job listing in minutes</p>
        </div>
      </FadeIn>

      {/* Stepper */}
      <FadeIn delay={0.1}>
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {steps.map((step, i) => {
            const StepIcon = step.icon;
            const isActive = i === currentStep;
            const isCompleted = i < currentStep;
            return (
              <div key={step.id} className="flex items-center gap-2 shrink-0">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' :
                  isCompleted ? 'bg-accent-green/10 text-accent-green' : 'bg-surface-elevated text-text-muted'
                }`}>
                  <StepIcon className="w-4 h-4" />
                  {step.label}
                  {isCompleted && <Check className="w-3.5 h-3.5" />}
                </div>
                {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-text-muted" />}
              </div>
            );
          })}
        </div>
      </FadeIn>

      <div className="max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Job Basics</h2>
                  <Input label="Job Title" placeholder="e.g. Senior DevOps Engineer" value={formData.title} onChange={e => updateField('title', e.target.value)} required />
                  <Input label="Location" placeholder="e.g. San Francisco, CA or Remote" value={formData.location} onChange={e => updateField('location', e.target.value)} required />
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Job Type</label>
                    <select value={formData.type} onChange={e => updateField('type', e.target.value)} className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500/50">
                      <option>Full-time</option>
                      <option>Contract</option>
                      <option>Freelance</option>
                      <option>Part-time</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.remote} onChange={e => updateField('remote', e.target.checked)} className="w-4 h-4 rounded border-white/20 bg-surface-elevated text-primary-500" />
                    <span className="text-sm text-text-secondary">Remote-friendly</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Salary Min" type="number" placeholder="150000" value={formData.salaryMin} onChange={e => updateField('salaryMin', e.target.value)} />
                    <Input label="Salary Max" type="number" placeholder="220000" value={formData.salaryMax} onChange={e => updateField('salaryMax', e.target.value)} />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Job Description</h2>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Description</label>
                    <textarea rows={8} placeholder="Describe the role, team, and what you're looking for..." value={formData.description} onChange={e => updateField('description', e.target.value)} className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500/50 resize-none" />
                    <p className="text-xs text-text-muted mt-1">{formData.description.length} characters (min 50 recommended)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Skills & Tags</label>
                    <div className="flex gap-2 mb-2">
                      <input type="text" placeholder="Add a tag..." value={formData.newTag} onChange={e => updateField('newTag', e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} className="flex-1 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50" />
                      <button type="button" onClick={addTag} className="px-4 py-2.5 rounded-xl bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20">
                          {tag}
                          <button onClick={() => removeTag(tag)}><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Requirements</h2>
                  <p className="text-sm text-text-muted">List the skills, experience, and qualifications required for this role.</p>
                  <div className="space-y-3">
                    {formData.requirements.map((req, i) => (
                      <div key={i} className="flex gap-2">
                        <input type="text" placeholder={`Requirement ${i + 1}`} value={req} onChange={e => updateRequirement(i, e.target.value)} className="flex-1 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50" />
                        {formData.requirements.length > 1 && (
                          <button onClick={() => removeRequirement(i)} className="p-2.5 rounded-xl text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"><X className="w-4 h-4" /></button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" icon={<Plus className="w-4 h-4" />} onClick={addRequirement}>Add Requirement</Button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Benefits</h2>
                  <p className="text-sm text-text-muted">What perks and benefits do you offer?</p>
                  <div className="space-y-3">
                    {formData.benefits.map((ben, i) => (
                      <div key={i} className="flex gap-2">
                        <input type="text" placeholder={`Benefit ${i + 1}`} value={ben} onChange={e => updateBenefit(i, e.target.value)} className="flex-1 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50" />
                        {formData.benefits.length > 1 && (
                          <button onClick={() => removeBenefit(i)} className="p-2.5 rounded-xl text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"><X className="w-4 h-4" /></button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" icon={<Plus className="w-4 h-4" />} onClick={addBenefit}>Add Benefit</Button>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Review & Publish</h2>
                  <div className="p-4 rounded-xl bg-surface-elevated space-y-4">
                    <div>
                      <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Title</div>
                      <div className="font-medium">{formData.title || 'Not set'}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Location</div>
                        <div className="text-sm">{formData.location || 'Not set'} {formData.remote && '(Remote)'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Type</div>
                        <div className="text-sm">{formData.type}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Salary</div>
                      <div className="text-sm">${formData.salaryMin || '0'} - ${formData.salaryMax || '0'} {formData.currency}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Description</div>
                      <div className="text-sm text-text-secondary line-clamp-4">{formData.description || 'Not set'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Tags</div>
                      <div className="flex flex-wrap gap-1.5">
                        {formData.tags.map(tag => <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-text-muted">{tag}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-6">
                <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} icon={<ChevronLeft className="w-4 h-4" />}>
                  Back
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)} disabled={!canProceed()} icon={<ChevronRight className="w-4 h-4" />}>
                    Next Step
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} icon={<Check className="w-4 h-4" />}>
                    Publish Job
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

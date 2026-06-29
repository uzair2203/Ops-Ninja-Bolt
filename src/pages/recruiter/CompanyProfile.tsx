import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2, Globe, MapPin, Users, Star, Pencil, Check, X,
  Image, Twitter, Linkedin, Github, Upload
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/modals/Toast';

export function CompanyProfile() {
  const { addToast, ToastContainer } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Vercel',
    description: 'The platform for frontend developers. Build, scale, and secure a faster, personalized web.',
    website: 'vercel.com',
    location: 'San Francisco, CA',
    size: '201-500',
    industry: 'Cloud Infrastructure',
    founded: '2015',
    twitter: 'vercel',
    linkedin: 'vercel',
    github: 'vercel',
    tags: ['Next.js', 'Serverless', 'Edge', 'React', 'TypeScript'],
    newTag: '',
  });

  const handleSave = () => {
    setIsEditing(false);
    addToast({ type: 'success', title: 'Company profile updated' });
  };

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, prev.newTag.trim()], newTag: '' }));
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  return (
    <div>
      <ToastContainer />
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Company Profile</h1>
            <p className="text-text-secondary">Manage your company information and branding</p>
          </div>
          {!isEditing ? (
            <Button variant="secondary" icon={<Pencil className="w-4 h-4" />} onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" icon={<X className="w-4 h-4" />} onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button icon={<Check className="w-4 h-4" />} onClick={handleSave}>
                Save
              </Button>
            </div>
          )}
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FadeIn delay={0.1}>
            <Card className="overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-slate-700 to-slate-900">
                {isEditing && (
                  <button className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/50 text-white text-xs flex items-center gap-1 hover:bg-black/70 transition-colors">
                    <Image className="w-3.5 h-3.5" /> Change Cover
                  </button>
                )}
              </div>
              <div className="px-6 pb-6">
                <div className="relative -mt-10 mb-4">
                  <div className="w-20 h-20 rounded-2xl bg-surface border-4 border-surface overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-800" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 left-16 w-8 h-8 rounded-lg bg-surface-elevated border border-white/10 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors">
                      <Upload className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2 text-text-primary font-bold text-lg focus:outline-none focus:border-primary-500/50"
                    />
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-primary-500/50 resize-none"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold">{formData.name}</h2>
                    <p className="text-text-secondary mt-2">{formData.description}</p>
                  </>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="default">{tag}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Company Details</h3>
              {isEditing ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Website</label>
                    <input type="text" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Location</label>
                    <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Company Size</label>
                    <input type="text" value={formData.size} onChange={e => setFormData({ ...formData, size: e.target.value })} className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Industry</label>
                    <input type="text" value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Founded</label>
                    <input type="text" value={formData.founded} onChange={e => setFormData({ ...formData, founded: e.target.value })} className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50" />
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-text-muted" />
                    <div>
                      <div className="text-xs text-text-muted">Website</div>
                      <div className="text-sm text-text-primary">{formData.website}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-text-muted" />
                    <div>
                      <div className="text-xs text-text-muted">Location</div>
                      <div className="text-sm text-text-primary">{formData.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-text-muted" />
                    <div>
                      <div className="text-xs text-text-muted">Size</div>
                      <div className="text-sm text-text-primary">{formData.size} employees</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-text-muted" />
                    <div>
                      <div className="text-xs text-text-muted">Industry</div>
                      <div className="text-sm text-text-primary">{formData.industry}</div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Social Links</h3>
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Twitter className="w-4 h-4 text-text-muted shrink-0" />
                    <input type="text" value={formData.twitter} onChange={e => setFormData({ ...formData, twitter: e.target.value })} className="flex-1 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50" placeholder="Twitter handle" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-text-muted shrink-0" />
                    <input type="text" value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} className="flex-1 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50" placeholder="LinkedIn handle" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-text-muted shrink-0" />
                    <input type="text" value={formData.github} onChange={e => setFormData({ ...formData, github: e.target.value })} className="flex-1 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-primary-500/50" placeholder="GitHub handle" />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.twitter && (
                    <a href={`https://twitter.com/${formData.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-primary-400 transition-colors">
                      <Twitter className="w-4 h-4" /> @{formData.twitter}
                    </a>
                  )}
                  {formData.linkedin && (
                    <a href={`https://linkedin.com/company/${formData.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-primary-400 transition-colors">
                      <Linkedin className="w-4 h-4" /> {formData.linkedin}
                    </a>
                  )}
                  {formData.github && (
                    <a href={`https://github.com/${formData.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-primary-400 transition-colors">
                      <Github className="w-4 h-4" /> {formData.github}
                    </a>
                  )}
                </div>
              )}
            </Card>
          </FadeIn>
        </div>

        <div className="space-y-6">
          <FadeIn delay={0.2}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Company Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Active Jobs</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Total Applicants</span>
                  <span className="font-medium">66</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Profile Views</span>
                  <span className="font-medium">787</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Rating</span>
                  <span className="font-medium flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.8
                  </span>
                </div>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Hiring Pipeline</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted">New Applications</span>
                    <span className="text-text-primary">12</span>
                  </div>
                  <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="w-[40%] h-full bg-amber-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted">In Review</span>
                    <span className="text-text-primary">8</span>
                  </div>
                  <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="w-[27%] h-full bg-primary-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted">Interviews</span>
                    <span className="text-text-primary">6</span>
                  </div>
                  <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="w-[20%] h-full bg-accent-green rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted">Offers</span>
                    <span className="text-text-primary">2</span>
                  </div>
                  <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="w-[7%] h-full bg-accent-purple rounded-full" />
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

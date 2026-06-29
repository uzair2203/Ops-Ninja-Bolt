import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Globe, Github, Linkedin, Twitter, Briefcase, Wrench, FileCheck, Pencil, Check, X, Camera } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';

export function SeekerProfile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: user?.title || '',
    location: user?.location || '',
    bio: user?.bio || '',
    website: user?.website || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    twitter: user?.twitter || '',
    skills: user?.skills?.join(', ') || '',
    experience: user?.experience || '',
  });

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      title: formData.title,
      location: formData.location,
      bio: formData.bio,
      website: formData.website,
      github: formData.github,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      experience: formData.experience,
    });
    setIsEditing(false);
  };

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">My Profile</h1>
            <p className="text-text-secondary">Manage your public profile and personal information</p>
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
          <FadeIn>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-2xl font-bold text-white">
                    {user?.avatar}
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-surface-elevated border border-white/10 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2 text-text-primary font-semibold focus:outline-none focus:border-primary-500/50"
                      />
                      <input
                        type="text"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
                        placeholder="Job title"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.location}
                          onChange={e => setFormData({ ...formData, location: e.target.value })}
                          className="flex-1 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
                          placeholder="Location"
                        />
                        <input
                          type="text"
                          value={formData.experience}
                          onChange={e => setFormData({ ...formData, experience: e.target.value })}
                          className="w-32 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
                          placeholder="Experience"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold">{user?.name}</h2>
                      <p className="text-text-secondary">{user?.title}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {user?.location}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {user?.experience} experience</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">About</h3>
              {isEditing ? (
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-primary-500/50 resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-text-secondary">{user?.bio || 'No bio added yet.'}</p>
              )}
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Skills</h3>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.skills}
                  onChange={e => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
                  placeholder="Enter skills separated by commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user?.skills?.map(skill => (
                    <Badge key={skill} variant="purple">{skill}</Badge>
                  )) || <span className="text-text-muted text-sm">No skills added yet.</span>}
                </div>
              )}
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Links</h3>
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-text-muted shrink-0" />
                    <input
                      type="text"
                      value={formData.website}
                      onChange={e => setFormData({ ...formData, website: e.target.value })}
                      className="flex-1 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
                      placeholder="Website URL"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-text-muted shrink-0" />
                    <input
                      type="text"
                      value={formData.github}
                      onChange={e => setFormData({ ...formData, github: e.target.value })}
                      className="flex-1 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
                      placeholder="GitHub username"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-text-muted shrink-0" />
                    <input
                      type="text"
                      value={formData.linkedin}
                      onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                      className="flex-1 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
                      placeholder="LinkedIn username"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Twitter className="w-4 h-4 text-text-muted shrink-0" />
                    <input
                      type="text"
                      value={formData.twitter}
                      onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                      className="flex-1 bg-surface-elevated border border-white/10 rounded-xl px-4 py-2 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
                      placeholder="Twitter username"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {user?.website && (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-primary-400 transition-colors">
                      <Globe className="w-4 h-4" /> {user.website}
                    </a>
                  )}
                  {user?.github && (
                    <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-primary-400 transition-colors">
                      <Github className="w-4 h-4" /> github.com/{user.github}
                    </a>
                  )}
                  {user?.linkedin && (
                    <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-primary-400 transition-colors">
                      <Linkedin className="w-4 h-4" /> linkedin.com/in/{user.linkedin}
                    </a>
                  )}
                  {user?.twitter && (
                    <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-primary-400 transition-colors">
                      <Twitter className="w-4 h-4" /> @{user.twitter}
                    </a>
                  )}
                  {!user?.website && !user?.github && !user?.linkedin && !user?.twitter && (
                    <span className="text-text-muted text-sm">No links added yet.</span>
                  )}
                </div>
              )}
            </Card>
          </FadeIn>
        </div>

        <div className="space-y-6">
          <FadeIn delay={0.2}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Profile Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted">Profile completion</span>
                    <span className="text-primary-400 font-medium">85%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Profile views</span>
                  <span className="text-text-primary font-medium">47</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Applications</span>
                  <span className="text-text-primary font-medium">4</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Saved jobs</span>
                  <span className="text-text-primary font-medium">3</span>
                </div>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="w-5 h-5 text-primary-400" />
                <h3 className="font-semibold">Resume</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">Upload your resume to apply faster and get discovered by recruiters.</p>
              <Button variant="outline" className="w-full" icon={<FileCheck className="w-4 h-4" />}>
                Upload Resume
              </Button>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

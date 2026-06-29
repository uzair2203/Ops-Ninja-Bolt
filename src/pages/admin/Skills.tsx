import { useState } from 'react';
import { Wrench, Plus, Pencil, Trash2, Search, Check, X } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { useToast } from '@/components/modals/Toast';

interface Skill {
  id: string;
  name: string;
  slug: string;
  jobCount: number;
  category: string;
}

const mockSkills: Skill[] = [
  { id: '1', name: 'Kubernetes', slug: 'kubernetes', jobCount: 234, category: 'DevOps' },
  { id: '2', name: 'Terraform', slug: 'terraform', jobCount: 189, category: 'DevOps' },
  { id: '3', name: 'AWS', slug: 'aws', jobCount: 312, category: 'Cloud' },
  { id: '4', name: 'Docker', slug: 'docker', jobCount: 198, category: 'DevOps' },
  { id: '5', name: 'Python', slug: 'python', jobCount: 156, category: 'Programming' },
  { id: '6', name: 'Go', slug: 'go', jobCount: 134, category: 'Programming' },
  { id: '7', name: 'CI/CD', slug: 'ci-cd', jobCount: 167, category: 'DevOps' },
  { id: '8', name: 'Prometheus', slug: 'prometheus', jobCount: 89, category: 'Observability' },
  { id: '9', name: 'Grafana', slug: 'grafana', jobCount: 76, category: 'Observability' },
  { id: '10', name: 'PostgreSQL', slug: 'postgresql', jobCount: 112, category: 'Database' },
];

const categories = ['DevOps', 'Cloud', 'Programming', 'Observability', 'Database', 'Security'];

export function Skills() {
  const { addToast, ToastContainer } = useToast();
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState({ name: '', slug: '', category: 'DevOps' });

  const filtered = skills.filter(s => {
    const matchesSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    if (!newSkill.name.trim()) return;
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      slug: newSkill.slug || newSkill.name.toLowerCase().replace(/\s+/g, '-'),
      jobCount: 0,
      category: newSkill.category,
    };
    setSkills(prev => [...prev, skill]);
    setNewSkill({ name: '', slug: '', category: 'DevOps' });
    setShowAddModal(false);
    addToast({ type: 'success', title: 'Skill added' });
  };

  const handleDelete = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    setDeleteId(null);
    addToast({ type: 'success', title: 'Skill deleted' });
  };

  return (
    <div>
      <ToastContainer />
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Skills</h1>
            <p className="text-text-secondary">Manage skills and technologies for job matching</p>
          </div>
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
            Add Skill
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-surface-elevated border border-white/10 rounded-xl pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500/50 transition-all"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="bg-surface-elevated border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
          >
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Wrench className="w-8 h-8" />}
          title="No skills found"
          description="Try adjusting your search or add a new skill."
          action={{ label: 'Add Skill', onClick: () => setShowAddModal(true), icon: <Plus className="w-4 h-4" /> }}
        />
      ) : (
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <StaggerItem key={skill.id}>
              <Card className="p-5 group">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <span className="text-xs text-text-muted">{skill.category}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg text-text-muted hover:text-primary-400 hover:bg-primary-500/10 transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteId(skill.id)}
                      className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-text-muted">{skill.jobCount} jobs</div>
                <div className="text-xs text-text-muted">/{skill.slug}</div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <Card className="relative w-full max-w-md p-6">
            <h3 className="font-semibold mb-4">Add Skill</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Name</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500/50"
                  placeholder="e.g. Kubernetes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Category</label>
                <select
                  value={newSkill.category}
                  onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500/50"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="ghost" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button className="flex-1" onClick={handleAdd} icon={<Plus className="w-4 h-4" />}>Add</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Skill"
        description="Are you sure you want to delete this skill?"
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}

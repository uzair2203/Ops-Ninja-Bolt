import { useState } from 'react';
import { Tags, Plus, Pencil, Trash2, Search, Check, X } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { useToast } from '@/components/modals/Toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  jobCount: number;
  color: string;
}

const mockCategories: Category[] = [
  { id: '1', name: 'DevOps Engineer', slug: 'devops-engineer', jobCount: 234, color: 'from-primary-500 to-primary-600' },
  { id: '2', name: 'Cloud Engineer', slug: 'cloud-engineer', jobCount: 189, color: 'from-accent-cyan to-accent-blue' },
  { id: '3', name: 'Kubernetes', slug: 'kubernetes', jobCount: 156, color: 'from-accent-purple to-accent-indigo' },
  { id: '4', name: 'Platform Engineer', slug: 'platform-engineer', jobCount: 98, color: 'from-accent-green to-emerald-600' },
  { id: '5', name: 'SRE', slug: 'sre', jobCount: 87, color: 'from-amber-500 to-orange-600' },
  { id: '6', name: 'Cybersecurity', slug: 'cybersecurity', jobCount: 76, color: 'from-red-500 to-red-600' },
  { id: '7', name: 'AI Infrastructure', slug: 'ai-infrastructure', jobCount: 54, color: 'from-pink-500 to-rose-600' },
  { id: '8', name: 'Infrastructure', slug: 'infrastructure', jobCount: 112, color: 'from-slate-500 to-slate-600' },
];

export function Categories() {
  const { addToast, ToastContainer } = useToast();
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', color: 'from-primary-500 to-primary-600' });

  const filtered = categories.filter(c =>
    !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (!newCategory.name.trim()) return;
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      jobCount: 0,
      color: newCategory.color,
    };
    setCategories(prev => [...prev, category]);
    setNewCategory({ name: '', slug: '', color: 'from-primary-500 to-primary-600' });
    setShowAddModal(false);
    addToast({ type: 'success', title: 'Category added' });
  };

  const handleDelete = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    setDeleteId(null);
    addToast({ type: 'success', title: 'Category deleted' });
  };

  return (
    <div>
      <ToastContainer />
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Categories</h1>
            <p className="text-text-secondary">Manage job categories and role types</p>
          </div>
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
            Add Category
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-surface-elevated border border-white/10 rounded-xl pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500/50 transition-all"
          />
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Tags className="w-8 h-8" />}
          title="No categories found"
          description="Try adjusting your search or add a new category."
          action={{ label: 'Add Category', onClick: () => setShowAddModal(true), icon: <Plus className="w-4 h-4" /> }}
        />
      ) : (
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((category) => (
            <StaggerItem key={category.id}>
              <Card className="p-5 group relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${category.color}`} />
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold">{category.name}</h3>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg text-text-muted hover:text-primary-400 hover:bg-primary-500/10 transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteId(category.id)}
                      className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-text-muted">{category.jobCount} jobs</div>
                <div className="text-xs text-text-muted mt-1">/{category.slug}</div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <Card className="relative w-full max-w-md p-6">
            <h3 className="font-semibold mb-4">Add Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500/50"
                  placeholder="e.g. DevOps Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Slug</label>
                <input
                  type="text"
                  value={newCategory.slug}
                  onChange={e => setNewCategory({ ...newCategory, slug: e.target.value })}
                  className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500/50"
                  placeholder="auto-generated"
                />
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
        title="Delete Category"
        description="Are you sure you want to delete this category? Jobs in this category will need to be reassigned."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}

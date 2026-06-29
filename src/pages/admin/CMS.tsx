import { useState } from 'react';
import {
  FileText, Save, Eye, Globe, Search, Plus, Trash2, Pencil,
  ChevronRight, Layout, Type, Image, Settings
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/modals/Toast';

interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  lastEdited: string;
  status: 'published' | 'draft';
}

const mockPages: PageContent[] = [
  { id: '1', title: 'Homepage Hero', slug: 'home-hero', content: 'Welcome to Cloud & DevOps Jobs...', lastEdited: '2024-01-15', status: 'published' },
  { id: '2', title: 'About Page', slug: 'about', content: 'Built by engineers, for engineers...', lastEdited: '2024-01-10', status: 'published' },
  { id: '3', title: 'Pricing Page', slug: 'pricing', content: 'Simple, transparent pricing...', lastEdited: '2024-01-08', status: 'published' },
  { id: '4', title: 'FAQ Section', slug: 'faq', content: 'Frequently asked questions...', lastEdited: '2024-01-12', status: 'draft' },
];

export function CMS() {
  const { addToast, ToastContainer } = useToast();
  const [pages] = useState<PageContent[]>(mockPages);
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleSave = () => {
    addToast({ type: 'success', title: 'Changes saved', message: 'Page content has been updated.' });
  };

  const startEdit = (page: PageContent) => {
    setSelectedPage(page);
    setEditContent(page.content);
  };

  return (
    <div>
      <ToastContainer />
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">CMS</h1>
            <p className="text-text-secondary">Manage platform content and pages</p>
          </div>
          <Button icon={<Plus className="w-4 h-4" />}>
            New Page
          </Button>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <FadeIn delay={0.1}>
            <Card className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  className="w-full bg-surface-elevated border border-white/10 rounded-xl pl-9 pr-4 py-2 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary-500/50"
                />
              </div>
              <div className="space-y-1">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => startEdit(page)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
                      selectedPage?.id === page.id
                        ? 'bg-primary-500/10 text-primary-400'
                        : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="flex-1 truncate">{page.title}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      page.status === 'published' ? 'bg-accent-green/10 text-accent-green' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {page.status}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>

        <div className="lg:col-span-2">
          {selectedPage ? (
            <FadeIn delay={0.15}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-semibold">{selectedPage.title}</h2>
                    <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> /{selectedPage.slug}</span>
                      <span>Last edited {selectedPage.lastEdited}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />}>
                      Preview
                    </Button>
                    <Button size="sm" icon={<Save className="w-4 h-4" />} onClick={handleSave}>
                      Save
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Page Title</label>
                    <input
                      type="text"
                      value={selectedPage.title}
                      className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Slug</label>
                    <input
                      type="text"
                      value={selectedPage.slug}
                      className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Content</label>
                    <div className="flex items-center gap-1 p-2 rounded-t-xl bg-surface-elevated border border-white/10 border-b-0">
                      <button className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-white/5"><Type className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-white/5"><Layout className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-white/5"><Image className="w-4 h-4" /></button>
                      <div className="w-px h-4 bg-white/10 mx-1" />
                      <button className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-white/5"><Settings className="w-4 h-4" /></button>
                    </div>
                    <textarea
                      rows={12}
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      className="w-full bg-surface-elevated border border-white/10 rounded-b-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-primary-500/50 resize-none"
                    />
                  </div>
                </div>
              </Card>
            </FadeIn>
          ) : (
            <Card className="p-12 text-center">
              <FileText className="w-8 h-8 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">Select a page to edit</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

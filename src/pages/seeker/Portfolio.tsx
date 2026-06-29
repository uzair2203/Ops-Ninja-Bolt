import { useState } from 'react';
import { Globe, Github, ExternalLink, Plus, Pencil, Trash2, Image, Link2 } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { EmptyState } from '@/components/empty-states/EmptyState';

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

const mockProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'Kubernetes Cluster Autoscaler',
    description: 'Built a custom cluster autoscaler for Kubernetes that reduces infrastructure costs by 40% through intelligent node scheduling and spot instance integration.',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop',
    tags: ['Kubernetes', 'Go', 'AWS'],
    demoUrl: 'https://github.com/alex/k8s-autoscaler',
    repoUrl: 'https://github.com/alex/k8s-autoscaler',
  },
  {
    id: '2',
    title: 'Terraform Module Registry',
    description: 'Open-source Terraform module registry with versioning, documentation generation, and CI/CD integration for infrastructure teams.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
    tags: ['Terraform', 'TypeScript', 'PostgreSQL'],
    repoUrl: 'https://github.com/alex/tf-registry',
  },
  {
    id: '3',
    title: 'Observability Dashboard',
    description: 'Real-time observability dashboard aggregating metrics from Prometheus, Grafana, and custom exporters into a unified interface.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    tags: ['React', 'Prometheus', 'Grafana'],
    demoUrl: 'https://observability-demo.vercel.app',
  },
];

export function Portfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>(mockProjects);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Portfolio</h1>
            <p className="text-text-secondary">Showcase your projects and open-source contributions</p>
          </div>
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
            Add Project
          </Button>
        </div>
      </FadeIn>

      {projects.length === 0 ? (
        <FadeIn>
          <EmptyState
            icon={<Globe className="w-8 h-8" />}
            title="No projects yet"
            description="Add your projects to showcase your skills to recruiters."
            action={{ label: 'Add Project', onClick: () => setShowAddModal(true), icon: <Plus className="w-4 h-4" /> }}
          />
        </FadeIn>
      ) : (
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <Card className="overflow-hidden group h-full">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteId(project.id)}
                      className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-red-500/70 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-text-muted">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
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
        title="Delete Project"
        description="Are you sure you want to remove this project from your portfolio?"
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}

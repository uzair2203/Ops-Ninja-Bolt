import { useState } from 'react';
import { FileCheck, Upload, Download, Trash2, Eye, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';

interface ResumeFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  isDefault: boolean;
  status: 'ready' | 'processing' | 'error';
}

const mockResumes: ResumeFile[] = [
  { id: '1', name: 'Alex_Morgan_Resume_2024.pdf', size: '2.4 MB', uploadedAt: '2024-01-15', isDefault: true, status: 'ready' },
  { id: '2', name: 'Alex_Morgan_Resume_Tech.pdf', size: '1.8 MB', uploadedAt: '2024-01-10', isDefault: false, status: 'ready' },
];

export function ResumeManager() {
  const [resumes, setResumes] = useState<ResumeFile[]>(mockResumes);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDelete = (id: string) => {
    setResumes(prev => prev.filter(r => r.id !== id));
    setDeleteId(null);
  };

  const setDefault = (id: string) => {
    setResumes(prev => prev.map(r => ({ ...r, isDefault: r.id === id })));
  };

  return (
    <div>
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Resume Manager</h1>
          <p className="text-text-secondary">Upload and manage your resumes for faster applications</p>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FadeIn delay={0.1}>
            <Card className="p-6">
              <div
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
                onDrop={() => setIsDragging(false)}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                  isDragging ? 'border-primary-500 bg-primary-500/5' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="font-semibold mb-1">Upload your resume</h3>
                <p className="text-sm text-text-muted mb-4">Drag and drop or click to browse</p>
                <p className="text-xs text-text-muted">Supported formats: PDF, DOCX, TXT (max 10MB)</p>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Your Resumes</h2>
              {resumes.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-8 h-8 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary">No resumes uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {resumes.map((resume) => (
                    <div key={resume.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <FileCheck className="w-5 h-5 text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">{resume.name}</span>
                          {resume.isDefault && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-green/10 text-accent-green">Default</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                          <span>{resume.size}</span>
                          <span>Uploaded {resume.uploadedAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!resume.isDefault && (
                          <button
                            onClick={() => setDefault(resume.id)}
                            className="p-2 rounded-lg text-text-muted hover:text-primary-400 hover:bg-primary-500/10 transition-colors"
                            title="Set as default"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors" title="Preview">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(resume.id)}
                          className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </FadeIn>
        </div>

        <div>
          <FadeIn delay={0.2}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Resume Tips</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">Keep it under 2 pages for best results</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">Highlight cloud and DevOps certifications</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">Include quantifiable achievements</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">Use keywords from job descriptions</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">Avoid images and complex formatting</p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Resume"
        description="Are you sure you want to delete this resume? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}

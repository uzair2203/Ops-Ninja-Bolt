import { useState } from 'react';
import { Search, Clock, X, ArrowRight, Trash2 } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { formatDate } from '@/lib/utils';
import type { SearchHistoryItem } from '@/types';

const mockHistory: SearchHistoryItem[] = [
  { id: '1', query: 'Senior DevOps Engineer', filters: 'Remote, Full-time, $150k+', results: 23, searchedAt: '2024-01-15T10:30:00Z' },
  { id: '2', query: 'Kubernetes', filters: 'Remote, Contract', results: 15, searchedAt: '2024-01-14T16:45:00Z' },
  { id: '3', query: 'Platform Engineer', filters: 'San Francisco, Full-time', results: 8, searchedAt: '2024-01-13T09:20:00Z' },
  { id: '4', query: 'SRE', filters: 'Remote, $200k+', results: 12, searchedAt: '2024-01-12T14:00:00Z' },
  { id: '5', query: 'Cloud Infrastructure', filters: 'Remote, Full-time', results: 31, searchedAt: '2024-01-10T11:15:00Z' },
];

export function SearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>(mockHistory);
  const [clearAllOpen, setClearAllOpen] = useState(false);

  const clearAll = () => {
    setHistory([]);
    setClearAllOpen(false);
  };

  const removeItem = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Search History</h1>
            <p className="text-text-secondary">Your recent job searches</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={() => setClearAllOpen(true)}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-surface-elevated text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </FadeIn>

      {history.length === 0 ? (
        <FadeIn>
          <EmptyState
            icon={<Search className="w-8 h-8" />}
            title="No search history"
            description="Your recent searches will appear here."
          />
        </FadeIn>
      ) : (
        <StaggerContainer className="space-y-2">
          {history.map((item) => (
            <StaggerItem key={item.id}>
              <Card className="p-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0">
                    <Search className="w-4 h-4 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.query}</div>
                    <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                      <span>{item.filters}</span>
                      <span>{item.results} results</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(item.searchedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg text-text-muted hover:text-primary-400 hover:bg-primary-500/10 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
        isOpen={clearAllOpen}
        onClose={() => setClearAllOpen(false)}
        onConfirm={clearAll}
        title="Clear Search History"
        description="Are you sure you want to clear all search history? This cannot be undone."
        confirmLabel="Clear All"
        variant="warning"
      />
    </div>
  );
}

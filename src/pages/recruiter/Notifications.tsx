import { useState } from 'react';
import { Bell, Check, Trash2, Briefcase, MessageSquare, User, AlertCircle } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { formatDate } from '@/lib/utils';
import type { Notification } from '@/types';

const mockNotifications: Notification[] = [
  {
    id: '1', type: 'application', title: 'New Applicant',
    message: 'Alex Rivera applied to Senior DevOps Engineer (95% match).',
    read: false, createdAt: '2024-01-15T10:30:00Z', link: '/recruiter/applicants'
  },
  {
    id: '2', type: 'job', title: 'Job Expiring Soon',
    message: 'Platform Engineer posting expires in 3 days.',
    read: false, createdAt: '2024-01-14T16:45:00Z', link: '/recruiter/jobs'
  },
  {
    id: '3', type: 'message', title: 'Message from Candidate',
    message: 'Sarah Chen sent a follow-up about her application.',
    read: true, createdAt: '2024-01-13T09:20:00Z', link: '/recruiter/applicants'
  },
];

const typeConfig = {
  application: { icon: User, color: 'text-primary-400', bg: 'bg-primary-500/10' },
  job: { icon: Briefcase, color: 'text-accent-green', bg: 'bg-accent-green/10' },
  message: { icon: MessageSquare, color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
  system: { icon: AlertCircle, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
};

export function RecruiterNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [clearAllOpen, setClearAllOpen] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
    setClearAllOpen(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Notifications</h1>
            <p className="text-text-secondary">{unreadCount} unread notifications</p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
              >
                Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={() => setClearAllOpen(true)}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-surface-elevated text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </FadeIn>

      {notifications.length === 0 ? (
        <FadeIn>
          <EmptyState
            icon={<Bell className="w-8 h-8" />}
            title="No notifications"
            description="You're all caught up!"
          />
        </FadeIn>
      ) : (
        <StaggerContainer className="space-y-2">
          {notifications.map((notification) => {
            const config = typeConfig[notification.type];
            const Icon = config.icon;
            return (
              <StaggerItem key={notification.id}>
                <div
                  className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${
                    notification.read ? 'bg-surface' : 'bg-surface-elevated border border-primary-500/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{notification.title}</span>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-primary-500" />
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">{notification.message}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-text-muted">{formatDate(notification.createdAt)}</span>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" /> Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}

      <ConfirmDialog
        isOpen={clearAllOpen}
        onClose={() => setClearAllOpen(false)}
        onConfirm={clearAll}
        title="Clear All Notifications"
        description="Are you sure you want to clear all notifications?"
        confirmLabel="Clear All"
        variant="warning"
      />
    </div>
  );
}

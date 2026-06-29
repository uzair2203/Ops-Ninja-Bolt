import { useState } from 'react';
import {
  Users as UsersIcon, Search, Shield, CheckCircle2, XCircle, Clock,
  Mail, Calendar, MoreHorizontal, Ban, UserCheck
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/empty-states/EmptyState';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { formatDate } from '@/lib/utils';

interface UserRow {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'seeker' | 'recruiter' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  joinedAt: string;
  lastActive: string;
  jobsApplied: number;
}

const mockUsers: UserRow[] = [
  { id: '1', name: 'Alex Morgan', email: 'alex@example.com', avatar: 'AM', role: 'seeker', status: 'active', joinedAt: '2024-01-10', lastActive: '2024-01-15', jobsApplied: 4 },
  { id: '2', name: 'Sarah Chen', email: 'sarah@vercel.com', avatar: 'SC', role: 'recruiter', status: 'active', joinedAt: '2023-11-20', lastActive: '2024-01-15', jobsApplied: 0 },
  { id: '3', name: 'Marcus Johnson', email: 'marcus@example.com', avatar: 'MJ', role: 'seeker', status: 'active', joinedAt: '2024-01-08', lastActive: '2024-01-14', jobsApplied: 2 },
  { id: '4', name: 'Priya Sharma', email: 'priya@example.com', avatar: 'PS', role: 'seeker', status: 'pending', joinedAt: '2024-01-15', lastActive: '2024-01-15', jobsApplied: 1 },
  { id: '5', name: 'David Kim', email: 'david@example.com', avatar: 'DK', role: 'seeker', status: 'suspended', joinedAt: '2023-09-15', lastActive: '2023-12-20', jobsApplied: 0 },
];

const statusConfig = {
  active: { label: 'Active', color: 'text-accent-green', bg: 'bg-accent-green/10' },
  suspended: { label: 'Suspended', color: 'text-red-400', bg: 'bg-red-500/10' },
  pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10' },
};

const roleConfig = {
  seeker: { label: 'Job Seeker', color: 'text-primary-400', bg: 'bg-primary-500/10' },
  recruiter: { label: 'Recruiter', color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
  admin: { label: 'Admin', color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
};

export function Users() {
  const [users, setUsers] = useState<UserRow[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [suspendId, setSuspendId] = useState<string | null>(null);
  const [activateId, setActivateId] = useState<string | null>(null);

  const filtered = users.filter(user => {
    const matchesSearch = !searchQuery || user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleSuspend = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'suspended' as const } : u));
    setSuspendId(null);
  };

  const handleActivate = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'active' as const } : u));
    setActivateId(null);
  };

  return (
    <div>
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Users</h1>
          <p className="text-text-secondary">Manage platform users and their accounts</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-surface-elevated border border-white/10 rounded-xl pl-11 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500/50 transition-all"
            />
          </div>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="bg-surface-elevated border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-primary-500/50"
          >
            <option value="all">All Roles</option>
            <option value="seeker">Job Seekers</option>
            <option value="recruiter">Recruiters</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<UsersIcon className="w-8 h-8" />}
          title="No users found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <StaggerContainer>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-text-muted uppercase tracking-wider border-b border-white/5">
                    <th className="pb-3 px-6 pt-4 font-medium">User</th>
                    <th className="pb-3 px-4 pt-4 font-medium">Role</th>
                    <th className="pb-3 px-4 pt-4 font-medium">Status</th>
                    <th className="pb-3 px-4 pt-4 font-medium">Joined</th>
                    <th className="pb-3 px-4 pt-4 font-medium">Last Active</th>
                    <th className="pb-3 px-4 pt-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((user) => {
                    const status = statusConfig[user.status];
                    const role = roleConfig[user.role];
                    return (
                      <StaggerItem key={user.id}>
                        <tr className="group hover:bg-surface-elevated/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-sm font-bold text-white">
                                {user.avatar}
                              </div>
                              <div>
                                <div className="font-medium text-sm">{user.name}</div>
                                <div className="text-xs text-text-muted">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`text-xs px-2 py-1 rounded-lg ${role.bg} ${role.color}`}>
                              {role.label}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`text-xs px-2 py-1 rounded-lg ${status.bg} ${status.color}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-text-secondary">{formatDate(user.joinedAt)}</td>
                          <td className="py-4 px-4 text-sm text-text-secondary">{formatDate(user.lastActive)}</td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {user.status === 'active' ? (
                                <button
                                  onClick={() => setSuspendId(user.id)}
                                  className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                  title="Suspend"
                                >
                                  <Ban className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => setActivateId(user.id)}
                                  className="p-2 rounded-lg text-text-muted hover:text-accent-green hover:bg-accent-green/10 transition-colors"
                                  title="Activate"
                                >
                                  <UserCheck className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      </StaggerItem>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </StaggerContainer>
      )}

      <ConfirmDialog
        isOpen={!!suspendId}
        onClose={() => setSuspendId(null)}
        onConfirm={() => suspendId && handleSuspend(suspendId)}
        title="Suspend User"
        description="Are you sure you want to suspend this user? They will lose access to the platform."
        confirmLabel="Suspend"
        variant="warning"
      />

      <ConfirmDialog
        isOpen={!!activateId}
        onClose={() => setActivateId(null)}
        onConfirm={() => activateId && handleActivate(activateId)}
        title="Activate User"
        description="Are you sure you want to reactivate this user?"
        confirmLabel="Activate"
        variant="info"
      />
    </div>
  );
}

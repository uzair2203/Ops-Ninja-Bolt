import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Search, Bookmark, FileText, User, FileCheck, Globe,
  Settings, CreditCard, Zap, Bell, Shield, PlusCircle, Briefcase, Users,
  Building2, BarChart3, Receipt, ExternalLink, FileBarChart, Tags, Wrench,
  DollarSign, LogOut, Cloud, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const seekerNav: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/seeker/dashboard', icon: LayoutDashboard },
      { label: 'Browse Jobs', href: '/seeker/jobs', icon: Search },
      { label: 'Saved Jobs', href: '/seeker/saved', icon: Bookmark },
      { label: 'Applications', href: '/seeker/applications', icon: FileText },
    ],
  },
  {
    title: 'Profile',
    items: [
      { label: 'My Profile', href: '/seeker/profile', icon: User },
      { label: 'Resume Manager', href: '/seeker/resume', icon: FileCheck },
      { label: 'Portfolio', href: '/seeker/portfolio', icon: Globe },
      { label: 'Settings', href: '/seeker/settings', icon: Settings },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Billing', href: '/seeker/billing', icon: CreditCard },
      { label: 'Subscription', href: '/seeker/subscription', icon: Zap },
      { label: 'Notifications', href: '/seeker/notifications', icon: Bell, badge: 3 },
      { label: 'Security', href: '/seeker/security', icon: Shield },
    ],
  },
];

const recruiterNav: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/recruiter/dashboard', icon: LayoutDashboard },
      { label: 'Post a Job', href: '/recruiter/post-job', icon: PlusCircle },
      { label: 'Manage Jobs', href: '/recruiter/jobs', icon: Briefcase },
      { label: 'Applicants', href: '/recruiter/applicants', icon: Users, badge: 12 },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'Company Profile', href: '/recruiter/company', icon: Building2 },
      { label: 'Analytics', href: '/recruiter/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Settings', href: '/recruiter/settings', icon: Settings },
      { label: 'Subscription', href: '/recruiter/subscription', icon: Zap },
      { label: 'Invoices', href: '/recruiter/invoices', icon: Receipt },
      { label: 'Notifications', href: '/recruiter/notifications', icon: Bell, badge: 5 },
    ],
  },
];

const adminNav: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      { label: 'Reports', href: '/admin/reports', icon: FileBarChart },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'All Jobs', href: '/admin/jobs', icon: Briefcase },
      { label: 'Recruiter Jobs', href: '/admin/recruiter-jobs', icon: Building2 },
      { label: 'External Jobs', href: '/admin/external-jobs', icon: ExternalLink },
      { label: 'CMS', href: '/admin/cms', icon: FileText },
    ],
  },
  {
    title: 'Users',
    items: [
      { label: 'Users', href: '/admin/users', icon: Users },
      { label: 'Recruiters', href: '/admin/recruiters', icon: Building2 },
    ],
  },
  {
    title: 'Config',
    items: [
      { label: 'Categories', href: '/admin/categories', icon: Tags },
      { label: 'Skills', href: '/admin/skills', icon: Wrench },
      { label: 'Pricing Plans', href: '/admin/pricing-plans', icon: DollarSign },
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export function DashboardSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navSections = user?.role === 'seeker' ? seekerNav : user?.role === 'recruiter' ? recruiterNav : adminNav;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-72 bg-surface border-r border-white/5 flex flex-col',
          'lg:translate-x-0 transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">
              Cloud<span className="text-primary-400">&</span>DevOps
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          {navSections.map((section) => (
            <div key={section.title} className="mb-6">
              <div className="px-3 mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                        isActive
                          ? 'bg-primary-500/10 text-primary-400'
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-sm font-bold text-white">
              {user?.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user?.name}</div>
              <div className="text-xs text-text-muted capitalize">{user?.role}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </motion.aside>
    </>
  );
}

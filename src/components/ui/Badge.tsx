import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'purple' | 'cyan';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-surface-elevated text-text-secondary border-white/5',
    primary: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    success: 'bg-accent-green/10 text-accent-green border-accent-green/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    info: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
    purple: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
    cyan: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

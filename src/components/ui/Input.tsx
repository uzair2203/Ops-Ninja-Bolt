import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label?: string;
  error?: string;
}

export function Input({ icon, label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full bg-surface-elevated border border-white/10 rounded-xl text-text-primary placeholder:text-text-muted',
            'focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20',
            'transition-all duration-200',
            icon ? 'pl-10 pr-4 py-2.5' : 'px-4 py-2.5',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}

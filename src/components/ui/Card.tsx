import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hover = true, glow = false }: CardProps) {
  return (
    <div
      className={cn(
        'relative bg-surface rounded-2xl border border-white/5 overflow-hidden',
        hover && 'transition-all duration-300 hover:border-white/10 hover:shadow-card-hover hover:-translate-y-0.5',
        glow && 'shadow-glow-blue',
        className
      )}
    >
      {children}
    </div>
  );
}

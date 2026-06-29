import { motion } from 'framer-motion';

interface GradientOrbProps {
  className?: string;
  color?: 'blue' | 'purple' | 'cyan' | 'indigo';
  size?: number;
  delay?: number;
}

export function GradientOrb({
  className,
  color = 'blue',
  size = 400,
  delay = 0,
}: GradientOrbProps) {
  const colors = {
    blue: 'rgba(59,130,246,0.15)',
    purple: 'rgba(139,92,246,0.12)',
    cyan: 'rgba(6,182,212,0.12)',
    indigo: 'rgba(99,102,241,0.1)',
  };

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

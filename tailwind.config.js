/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050816',
        surface: '#0B1220',
        'surface-elevated': '#111C2E',
        'surface-hover': '#162236',
        primary: {
          DEFAULT: '#3B82F6',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        accent: {
          blue: '#00D4FF',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          indigo: '#6366F1',
          green: '#10B981',
          pink: '#EC4899',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'blur-in': 'blur-in 0.8s ease-out forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'blur-in': {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'mesh-1': 'radial-gradient(ellipse at 20% 30%, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(139,92,246,0.1) 0%, transparent 50%)',
        'mesh-2': 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.1) 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, rgba(99,102,241,0.08) 0%, transparent 50%)',
      },
      boxShadow: {
        'glow-blue': '0 0 40px -10px rgba(59,130,246,0.4)',
        'glow-purple': '0 0 40px -10px rgba(139,92,246,0.4)',
        'glow-cyan': '0 0 40px -10px rgba(6,182,212,0.4)',
        'card': '0 4px 24px -4px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px -4px rgba(0,0,0,0.4), 0 0 20px -5px rgba(59,130,246,0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

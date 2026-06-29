import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: 'seeker' | 'recruiter' | 'admin' | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (email: string, password: string, name: string, role: 'seeker' | 'recruiter') => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: UserProfile = {
  id: '1',
  email: 'alex@example.com',
  name: 'Alex Morgan',
  avatar: 'AM',
  title: 'Senior DevOps Engineer',
  location: 'San Francisco, CA',
  bio: 'Passionate about cloud infrastructure and Kubernetes. 8+ years of experience building scalable systems.',
  skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Go', 'Python', 'CI/CD', 'Prometheus'],
  experience: '8 years',
  website: 'https://alexmorgan.dev',
  github: 'alexmorgan',
  linkedin: 'alexmorgan',
  twitter: 'alexmorgan',
  resumeUrl: '',
  portfolioUrl: 'https://alexmorgan.dev',
  role: 'seeker',
  isPremium: true,
  subscriptionTier: 'Pro',
  subscriptionStatus: 'active',
};

const mockRecruiter: UserProfile = {
  id: '2',
  email: 'sarah@vercel.com',
  name: 'Sarah Chen',
  avatar: 'SC',
  title: 'Head of Talent',
  location: 'San Francisco, CA',
  bio: 'Building world-class engineering teams at Vercel.',
  skills: ['Recruiting', 'Talent Strategy', 'Engineering Management'],
  experience: '10 years',
  website: '',
  github: '',
  linkedin: 'sarahchen',
  twitter: '',
  resumeUrl: '',
  portfolioUrl: '',
  role: 'recruiter',
  isPremium: true,
  subscriptionTier: 'Growth',
  subscriptionStatus: 'active',
};

const mockAdmin: UserProfile = {
  id: '3',
  email: 'admin@clouddevops.jobs',
  name: 'Admin User',
  avatar: 'AU',
  title: 'Platform Administrator',
  location: 'Remote',
  bio: 'Platform admin.',
  skills: ['System Administration', 'Platform Management'],
  experience: '5 years',
  website: '',
  github: '',
  linkedin: '',
  twitter: '',
  resumeUrl: '',
  portfolioUrl: '',
  role: 'admin',
  isPremium: true,
  subscriptionTier: 'Enterprise',
  subscriptionStatus: 'active',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cdj_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (email === 'alex@example.com' && password === 'password') {
      setUser(mockUser);
      localStorage.setItem('cdj_user', JSON.stringify(mockUser));
      return { error: null };
    }
    if (email === 'sarah@vercel.com' && password === 'password') {
      setUser(mockRecruiter);
      localStorage.setItem('cdj_user', JSON.stringify(mockRecruiter));
      return { error: null };
    }
    if (email === 'admin@clouddevops.jobs' && password === 'password') {
      setUser(mockAdmin);
      localStorage.setItem('cdj_user', JSON.stringify(mockAdmin));
      return { error: null };
    }
    return { error: 'Invalid email or password' };
  };

  const register = async (email: string, password: string, name: string, role: 'seeker' | 'recruiter'): Promise<{ error: string | null }> => {
    const newUser: UserProfile = {
      id: 'new-' + Date.now(),
      email,
      name,
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      title: '',
      location: '',
      bio: '',
      skills: [],
      experience: '',
      website: '',
      github: '',
      linkedin: '',
      twitter: '',
      resumeUrl: '',
      portfolioUrl: '',
      role,
      isPremium: false,
      subscriptionTier: '',
      subscriptionStatus: 'inactive',
    };
    setUser(newUser);
    localStorage.setItem('cdj_user', JSON.stringify(newUser));
    return { error: null };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('cdj_user');
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('cdj_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        role: user?.role || null,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

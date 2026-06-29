export interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  website: string;
  location: string;
  size: string;
  industry: string;
  openPositions: number;
  rating: number;
  tags: string[];
  color: string;
  logoUrl: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  companyId: string;
  companyName: string;
  companyLogoUrl: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Part-time';
  remote: boolean;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  tags: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  featured: boolean;
  status: string;
  postedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl: string;
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'hired';
  appliedAt: string;
  coverLetter: string;
  resumeUrl: string;
}

export interface SavedJob {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  savedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  bio: string;
  skills: string[];
  experience: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
  portfolioUrl: string;
  role: 'seeker' | 'recruiter' | 'admin';
  isPremium: boolean;
  subscriptionTier: string;
  subscriptionStatus: string;
}

export interface Notification {
  id: string;
  type: 'application' | 'job' | 'message' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface RecruiterJob {
  id: string;
  title: string;
  status: 'active' | 'paused' | 'closed' | 'draft';
  applicants: number;
  views: number;
  postedAt: string;
  expiresAt: string;
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'hired';
  appliedAt: string;
  resumeUrl: string;
  coverLetter: string;
  matchScore: number;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  description: string;
  plan: string;
}

export interface Analytics {
  totalJobs: number;
  totalApplicants: number;
  views: number;
  conversionRate: number;
  dailyViews: { date: string; count: number }[];
  topSources: { source: string; count: number }[];
}

export interface AdminStats {
  totalUsers: number;
  totalRecruiters: number;
  totalJobs: number;
  totalApplications: number;
  revenue: number;
  activeSubscriptions: number;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  filters: string;
  results: number;
  searchedAt: string;
}

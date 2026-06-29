import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import { Home } from '@/pages/Home';
import { Jobs } from '@/pages/Jobs';
import { JobDetail } from '@/pages/JobDetail';
import { Companies } from '@/pages/Companies';
import { CompanyDetail } from '@/pages/CompanyDetail';
import { Pricing } from '@/pages/Pricing';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { Login } from '@/pages/public/Login';
import { Register } from '@/pages/public/Register';
import { ForgotPassword } from '@/pages/public/ForgotPassword';
import { Privacy } from '@/pages/public/Privacy';
import { Terms } from '@/pages/public/Terms';
import { Cookies } from '@/pages/public/Cookies';
import { NotFound } from '@/pages/public/NotFound';
import { SeekerDashboard } from '@/pages/seeker/Dashboard';
import { SeekerJobs } from '@/pages/seeker/SeekerJobs';
import { SavedJobs } from '@/pages/seeker/SavedJobs';
import { Applications } from '@/pages/seeker/Applications';
import { SeekerProfile } from '@/pages/seeker/Profile';
import { SeekerSettings } from '@/pages/seeker/Settings';
import { Billing } from '@/pages/seeker/Billing';
import { Subscription } from '@/pages/seeker/Subscription';
import { ResumeManager } from '@/pages/seeker/Resume';
import { Portfolio } from '@/pages/seeker/Portfolio';
import { Notifications } from '@/pages/seeker/Notifications';
import { Security } from '@/pages/seeker/Security';
import { Recommendations } from '@/pages/seeker/Recommendations';
import { SearchHistory } from '@/pages/seeker/SearchHistory';
import { RecruiterDashboard } from '@/pages/recruiter/Dashboard';
import { PostJob } from '@/pages/recruiter/PostJob';
import { ManageJobs } from '@/pages/recruiter/ManageJobs';
import { Applicants } from '@/pages/recruiter/Applicants';
import { CompanyProfile } from '@/pages/recruiter/CompanyProfile';
import { Analytics } from '@/pages/recruiter/Analytics';
import { RecruiterSettings } from '@/pages/recruiter/Settings';
import { RecruiterSubscription } from '@/pages/recruiter/Subscription';
import { Invoices } from '@/pages/recruiter/Invoices';
import { RecruiterNotifications } from '@/pages/recruiter/Notifications';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { AllJobs } from '@/pages/admin/AllJobs';
import { Users } from '@/pages/admin/Users';
import { Recruiters } from '@/pages/admin/Recruiters';
import { CMS } from '@/pages/admin/CMS';
import { Categories } from '@/pages/admin/Categories';
import { Skills } from '@/pages/admin/Skills';
import { PricingPlans } from '@/pages/admin/PricingPlans';
import { AdminAnalytics } from '@/pages/admin/Analytics';
import { Reports } from '@/pages/admin/Reports';
import { AdminSettings } from '@/pages/admin/Settings';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role || '')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function SeekerRoutes() {
  return (
    <ProtectedRoute allowedRoles={['seeker']}>
      <DashboardLayout />
    </ProtectedRoute>
  );
}

function RecruiterRoutes() {
  return (
    <ProtectedRoute allowedRoles={['recruiter']}>
      <DashboardLayout />
    </ProtectedRoute>
  );
}

function AdminRoutes() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout />
    </ProtectedRoute>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/*" element={<PublicLayout />} />

      {/* Seeker dashboard routes */}
      <Route path="/seeker/*" element={<SeekerRoutes />}>
        <Route path="dashboard" element={<SeekerDashboard />} />
        <Route path="jobs" element={<SeekerJobs />} />
        <Route path="saved" element={<SavedJobs />} />
        <Route path="applications" element={<Applications />} />
        <Route path="profile" element={<SeekerProfile />} />
        <Route path="settings" element={<SeekerSettings />} />
        <Route path="billing" element={<Billing />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="resume" element={<ResumeManager />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="security" element={<Security />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="search-history" element={<SearchHistory />} />
      </Route>

      {/* Recruiter dashboard routes */}
      <Route path="/recruiter/*" element={<RecruiterRoutes />}>
        <Route path="dashboard" element={<RecruiterDashboard />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="jobs" element={<ManageJobs />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="company" element={<CompanyProfile />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<RecruiterSettings />} />
        <Route path="subscription" element={<RecruiterSubscription />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="notifications" element={<RecruiterNotifications />} />
      </Route>

      {/* Admin dashboard routes */}
      <Route path="/admin/*" element={<AdminRoutes />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="jobs" element={<AllJobs />} />
        <Route path="recruiter-jobs" element={<AllJobs />} />
        <Route path="external-jobs" element={<AllJobs />} />
        <Route path="users" element={<Users />} />
        <Route path="recruiters" element={<Recruiters />} />
        <Route path="cms" element={<CMS />} />
        <Route path="categories" element={<Categories />} />
        <Route path="skills" element={<Skills />} />
        <Route path="pricing-plans" element={<PricingPlans />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { useState } from 'react';
import { Bell, Mail, Globe, Shield, Save, Building2, User, CreditCard } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/modals/Toast';

interface SettingToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function SettingToggle({ label, description, checked, onChange }: SettingToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div>
        <div className="font-medium text-text-primary">{label}</div>
        <div className="text-sm text-text-muted">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? 'bg-primary-500' : 'bg-surface-elevated border border-white/10'}`}
      >
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${checked ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

export function RecruiterSettings() {
  const { addToast, ToastContainer } = useToast();
  const [settings, setSettings] = useState({
    newApplicantAlerts: true,
    dailyDigest: true,
    jobExpiryAlerts: true,
    marketingEmails: false,
    profileVisible: true,
    autoReply: false,
    requireResume: true,
    showSalary: true,
  });

  const handleSave = () => {
    addToast({ type: 'success', title: 'Settings saved', message: 'Your preferences have been updated.' });
  };

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <ToastContainer />
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Settings</h1>
            <p className="text-text-secondary">Manage your recruiter account preferences</p>
          </div>
          <Button icon={<Save className="w-4 h-4" />} onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </FadeIn>

      <div className="space-y-6">
        <FadeIn delay={0.1}>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h2 className="font-semibold">Notifications</h2>
                <p className="text-sm text-text-muted">Choose how you want to be notified about applicants</p>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              <SettingToggle
                label="New Applicant Alerts"
                description="Get notified immediately when someone applies"
                checked={settings.newApplicantAlerts}
                onChange={v => updateSetting('newApplicantAlerts', v)}
              />
              <SettingToggle
                label="Daily Digest"
                description="Receive a daily summary of all activity"
                checked={settings.dailyDigest}
                onChange={v => updateSetting('dailyDigest', v)}
              />
              <SettingToggle
                label="Job Expiry Alerts"
                description="Get warned before your job postings expire"
                checked={settings.jobExpiryAlerts}
                onChange={v => updateSetting('jobExpiryAlerts', v)}
              />
              <SettingToggle
                label="Marketing Emails"
                description="Receive tips and platform updates"
                checked={settings.marketingEmails}
                onChange={v => updateSetting('marketingEmails', v)}
              />
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <h2 className="font-semibold">Job Posting Preferences</h2>
                <p className="text-sm text-text-muted">Configure default settings for new job postings</p>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              <SettingToggle
                label="Require Resume"
                description="Require applicants to upload a resume"
                checked={settings.requireResume}
                onChange={v => updateSetting('requireResume', v)}
              />
              <SettingToggle
                label="Show Salary Range"
                description="Display salary range on job listings by default"
                checked={settings.showSalary}
                onChange={v => updateSetting('showSalary', v)}
              />
              <SettingToggle
                label="Auto-Reply"
                description="Send an automatic confirmation email to applicants"
                checked={settings.autoReply}
                onChange={v => updateSetting('autoReply', v)}
              />
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent-green" />
              </div>
              <div>
                <h2 className="font-semibold">Security</h2>
                <p className="text-sm text-text-muted">Protect your account</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <div className="font-medium text-text-primary">Password</div>
                <div className="text-sm text-text-muted">Last changed 30 days ago</div>
              </div>
              <Button variant="outline" size="sm" icon={<Shield className="w-4 h-4" />}>
                Change Password
              </Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

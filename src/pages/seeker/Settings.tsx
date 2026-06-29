import { useState } from 'react';
import { Bell, Mail, Eye, Moon, Globe, Shield, Save, Check } from 'lucide-react';
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
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-primary-500' : 'bg-surface-elevated border border-white/10'}`}
      >
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${checked ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

export function SeekerSettings() {
  const { addToast, ToastContainer } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    applicationUpdates: true,
    marketingEmails: false,
    profileVisible: true,
    darkMode: true,
    autoApply: false,
    twoFactor: false,
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
            <p className="text-text-secondary">Manage your account preferences and notifications</p>
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
                <p className="text-sm text-text-muted">Choose how you want to be notified</p>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              <SettingToggle
                label="Email Notifications"
                description="Receive general email notifications"
                checked={settings.emailNotifications}
                onChange={v => updateSetting('emailNotifications', v)}
              />
              <SettingToggle
                label="Job Alerts"
                description="Get notified about new jobs matching your profile"
                checked={settings.jobAlerts}
                onChange={v => updateSetting('jobAlerts', v)}
              />
              <SettingToggle
                label="Application Updates"
                description="Receive updates about your job applications"
                checked={settings.applicationUpdates}
                onChange={v => updateSetting('applicationUpdates', v)}
              />
              <SettingToggle
                label="Marketing Emails"
                description="Receive tips, offers, and platform updates"
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
                <Eye className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <h2 className="font-semibold">Privacy</h2>
                <p className="text-sm text-text-muted">Control your profile visibility</p>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              <SettingToggle
                label="Profile Visible to Recruiters"
                description="Allow recruiters to discover your profile"
                checked={settings.profileVisible}
                onChange={v => updateSetting('profileVisible', v)}
              />
              <SettingToggle
                label="Dark Mode"
                description="Use dark theme across the platform"
                checked={settings.darkMode}
                onChange={v => updateSetting('darkMode', v)}
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
            <div className="divide-y divide-white/5">
              <SettingToggle
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                checked={settings.twoFactor}
                onChange={v => updateSetting('twoFactor', v)}
              />
              <div className="py-4">
                <Button variant="outline" size="sm" icon={<Shield className="w-4 h-4" />}>
                  Change Password
                </Button>
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

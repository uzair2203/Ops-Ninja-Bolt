import { useState } from 'react';
import { Settings, Save, Shield, Globe, Mail, Bell, Database, Lock } from 'lucide-react';
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

export function AdminSettings() {
  const { addToast, ToastContainer } = useToast();
  const [settings, setSettings] = useState({
    userRegistration: true,
    emailVerification: false,
    jobApprovalRequired: true,
    recruiterApprovalRequired: true,
    maintenanceMode: false,
    analyticsEnabled: true,
    emailNotifications: true,
    publicAPI: true,
  });

  const handleSave = () => {
    addToast({ type: 'success', title: 'Settings saved', message: 'Platform settings have been updated.' });
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
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Platform Settings</h1>
            <p className="text-text-secondary">Configure global platform behavior</p>
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
                <Shield className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h2 className="font-semibold">Registration & Access</h2>
                <p className="text-sm text-text-muted">Control who can join and use the platform</p>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              <SettingToggle
                label="Open Registration"
                description="Allow new users to register"
                checked={settings.userRegistration}
                onChange={v => updateSetting('userRegistration', v)}
              />
              <SettingToggle
                label="Email Verification Required"
                description="Require email verification before account activation"
                checked={settings.emailVerification}
                onChange={v => updateSetting('emailVerification', v)}
              />
              <SettingToggle
                label="Job Approval Required"
                description="Require admin approval before jobs go live"
                checked={settings.jobApprovalRequired}
                onChange={v => updateSetting('jobApprovalRequired', v)}
              />
              <SettingToggle
                label="Recruiter Approval Required"
                description="Require admin approval for new recruiter accounts"
                checked={settings.recruiterApprovalRequired}
                onChange={v => updateSetting('recruiterApprovalRequired', v)}
              />
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <h2 className="font-semibold">Platform Features</h2>
                <p className="text-sm text-text-muted">Enable or disable platform features</p>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              <SettingToggle
                label="Analytics"
                description="Collect and display platform analytics"
                checked={settings.analyticsEnabled}
                onChange={v => updateSetting('analyticsEnabled', v)}
              />
              <SettingToggle
                label="Email Notifications"
                description="Send transactional emails to users"
                checked={settings.emailNotifications}
                onChange={v => updateSetting('emailNotifications', v)}
              />
              <SettingToggle
                label="Public API"
                description="Allow external API access"
                checked={settings.publicAPI}
                onChange={v => updateSetting('publicAPI', v)}
              />
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="font-semibold">Maintenance</h2>
                <p className="text-sm text-text-muted">Platform maintenance controls</p>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              <SettingToggle
                label="Maintenance Mode"
                description="Put the platform in maintenance mode (only admins can access)"
                checked={settings.maintenanceMode}
                onChange={v => updateSetting('maintenanceMode', v)}
              />
              <div className="py-4">
                <Button variant="outline" size="sm" icon={<Database className="w-4 h-4" />}>
                  Backup Database
                </Button>
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

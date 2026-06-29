import { useState } from 'react';
import { Shield, Lock, Smartphone, Key, Eye, EyeOff, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { FadeIn } from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/modals/Toast';

export function Security() {
  const { addToast, ToastContainer } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      addToast({ type: 'error', title: 'Passwords do not match' });
      return;
    }
    addToast({ type: 'success', title: 'Password updated successfully' });
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handleToggle2FA = () => {
    if (!twoFactorEnabled) {
      setShow2FASetup(true);
    } else {
      setTwoFactorEnabled(false);
      addToast({ type: 'success', title: 'Two-factor authentication disabled' });
    }
  };

  const complete2FASetup = () => {
    setTwoFactorEnabled(true);
    setShow2FASetup(false);
    addToast({ type: 'success', title: 'Two-factor authentication enabled' });
  };

  return (
    <div>
      <ToastContainer />
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Security</h1>
          <p className="text-text-secondary">Manage your account security settings</p>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FadeIn delay={0.1}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h2 className="font-semibold">Change Password</h2>
                  <p className="text-sm text-text-muted">Update your password regularly for better security</p>
                </div>
              </div>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="relative">
                  <Input
                    label="Current Password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.current}
                    onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-[38px] text-text-muted hover:text-text-secondary"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    label="New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.new}
                    onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-[38px] text-text-muted hover:text-text-secondary"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    label="Confirm New Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirm}
                    onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[38px] text-text-muted hover:text-text-secondary"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Button type="submit" icon={<Lock className="w-4 h-4" />}>
                  Update Password
                </Button>
              </form>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-accent-green" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold">Two-Factor Authentication</h2>
                  <p className="text-sm text-text-muted">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={handleToggle2FA}
                  className={`relative w-11 h-6 rounded-full transition-colors ${twoFactorEnabled ? 'bg-accent-green' : 'bg-surface-elevated border border-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${twoFactorEnabled ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
              {twoFactorEnabled ? (
                <div className="p-4 rounded-xl bg-accent-green/10 border border-accent-green/20">
                  <div className="flex items-center gap-2 text-accent-green mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">2FA is enabled</span>
                  </div>
                  <p className="text-sm text-text-secondary">Your account is protected with two-factor authentication.</p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-2 text-amber-400 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">2FA is not enabled</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">Enable 2FA to protect your account from unauthorized access.</p>
                  <Button size="sm" onClick={() => setShow2FASetup(true)} icon={<Shield className="w-4 h-4" />}>
                    Enable 2FA
                  </Button>
                </div>
              )}
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                  <Key className="w-5 h-5 text-accent-purple" />
                </div>
                <div>
                  <h2 className="font-semibold">Active Sessions</h2>
                  <p className="text-sm text-text-muted">Manage your active login sessions</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated">
                  <div>
                    <div className="font-medium text-sm">Current Session</div>
                    <div className="text-xs text-text-muted">Chrome on macOS · San Francisco, CA</div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated">
                  <div>
                    <div className="font-medium text-sm">Mobile App</div>
                    <div className="text-xs text-text-muted">iPhone · Last active 2h ago</div>
                  </div>
                  <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
                    Revoke
                  </button>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        <div>
          <FadeIn delay={0.2}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Security Tips</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">Use a unique password that you don't use on other sites</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">Enable two-factor authentication for extra security</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">Review your active sessions regularly</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary">Be cautious of phishing emails pretending to be from us</p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>

      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShow2FASetup(false)} />
          <div className="relative bg-surface rounded-2xl border border-white/10 p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Set Up Two-Factor Authentication</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-elevated text-center">
                <div className="w-32 h-32 bg-white rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <div className="w-24 h-24 bg-surface rounded-lg" />
                </div>
                <p className="text-sm text-text-muted">Scan this QR code with your authenticator app</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Verification Code</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-3 text-text-primary text-center tracking-widest font-mono focus:outline-none focus:border-primary-500/50"
                  maxLength={6}
                />
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" className="flex-1" onClick={() => setShow2FASetup(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={complete2FASetup}>
                  Verify & Enable
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

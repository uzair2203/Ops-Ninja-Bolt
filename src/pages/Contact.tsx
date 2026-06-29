import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  Twitter,
  Github,
  Linkedin,
  MapPin,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'For general inquiries and support',
    value: 'hello@clouddevops.jobs',
    href: 'mailto:hello@clouddevops.jobs',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Available during business hours',
    value: 'Start a conversation',
    href: '#',
  },
  {
    icon: HelpCircle,
    title: 'Help Center',
    description: 'Browse FAQs and documentation',
    value: 'Visit Help Center',
    href: '#',
  },
];

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-text-secondary text-lg">
              Have a question, feedback, or partnership inquiry? We would love to hear from you.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <FadeIn delay={0.1}>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.href}
                    className="block"
                  >
                    <Card className="p-5 group hover:border-primary-500/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/20 transition-colors">
                          <method.icon className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary group-hover:text-primary-400 transition-colors">
                            {method.title}
                          </h3>
                          <p className="text-sm text-text-muted mb-1">{method.description}</p>
                          <span className="text-sm text-primary-400">{method.value}</span>
                        </div>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Office Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Clock className="w-4 h-4 text-text-muted" />
                    <span>Monday - Friday: 9am - 6pm PST</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <MapPin className="w-4 h-4 text-text-muted" />
                    <span>San Francisco, CA (Remote-first)</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-sm text-text-muted mb-3">Follow us</p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/10 transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <Card className="p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-accent-green" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                    <p className="text-text-secondary mb-6">
                      Thank you for reaching out. We will get back to you within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <Input
                      label="Subject"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-surface-elevated border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all resize-none"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full sm:w-auto" icon={<Send className="w-4 h-4" />}>
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

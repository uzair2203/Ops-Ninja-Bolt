import { FadeIn } from '@/components/animations/FadeIn';

export function Cookies() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-text-secondary">Last updated: January 2024</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-8 text-text-secondary">
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">How We Use Cookies</h2>
              <p className="mb-2">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-text-primary">Essential cookies:</strong> Required for the platform to function properly (authentication, security)</li>
                <li><strong className="text-text-primary">Preferences cookies:</strong> Remember your settings and preferences</li>
                <li><strong className="text-text-primary">Analytics cookies:</strong> Help us understand how visitors interact with our platform</li>
                <li><strong className="text-text-primary">Marketing cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">Third-Party Cookies</h2>
              <p>
                We may allow third-party service providers to place cookies on your device for analytics and advertising purposes. These providers have their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">Managing Cookies</h2>
              <p>
                You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or delete existing cookies. Please note that disabling cookies may affect the functionality of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">Contact</h2>
              <p>
                For questions about our Cookie Policy, contact us at{' '}
                <a href="mailto:privacy@clouddevops.jobs" className="text-primary-400 hover:text-primary-300">privacy@clouddevops.jobs</a>.
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

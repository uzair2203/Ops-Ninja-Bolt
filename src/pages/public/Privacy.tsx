import { Link } from 'react-router-dom';
import { FadeIn } from '@/components/animations/FadeIn';

export function Privacy() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-text-secondary">Last updated: January 2024</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-text-secondary">
              <section>
                <h2 className="text-xl font-bold text-text-primary mb-3">1. Introduction</h2>
                <p>
                  Cloud & DevOps Jobs ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-primary mb-3">2. Information We Collect</h2>
                <p className="mb-2">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Account information (name, email, password)</li>
                  <li>Profile information (resume, skills, experience)</li>
                  <li>Job application data</li>
                  <li>Payment information (processed securely by our payment provider)</li>
                  <li>Communications with us</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-primary mb-3">3. How We Use Your Information</h2>
                <p className="mb-2">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide and maintain our services</li>
                  <li>Match you with relevant job opportunities</li>
                  <li>Process your job applications</li>
                  <li>Send you updates and notifications</li>
                  <li>Improve our platform and user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-primary mb-3">4. Information Sharing</h2>
                <p>
                  We share your information only with employers when you apply to their job listings. We do not sell your personal data to third parties. We may share data with service providers who assist us in operating our platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-primary mb-3">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-primary mb-3">6. Your Rights</h2>
                <p className="mb-2">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing</li>
                  <li>Export your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-primary mb-3">7. Cookies</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our platform. For more details, please see our <Link to="/cookies" className="text-primary-400 hover:text-primary-300">Cookie Policy</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-primary mb-3">8. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:privacy@clouddevops.jobs" className="text-primary-400 hover:text-primary-300">privacy@clouddevops.jobs</a>.
                </p>
              </section>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

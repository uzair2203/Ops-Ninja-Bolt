import { FadeIn } from '@/components/animations/FadeIn';

export function Terms() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-text-secondary">Last updated: January 2024</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-8 text-text-secondary">
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or using Cloud & DevOps Jobs, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">2. Description of Service</h2>
              <p>
                Cloud & DevOps Jobs is a job marketplace platform connecting Cloud and DevOps professionals with employers. We provide job listings, application tools, and related services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">3. User Accounts</h2>
              <p className="mb-2">
                To access certain features, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">4. Job Seekers</h2>
              <p className="mb-2">
                As a job seeker, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate information in your profile and applications</li>
                <li>Not apply to positions you are not genuinely interested in</li>
                <li>Not misrepresent your qualifications or experience</li>
                <li>Respond to employer communications in a timely manner</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">5. Employers and Recruiters</h2>
              <p className="mb-2">
                As an employer or recruiter, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Post accurate and truthful job descriptions</li>
                <li>Include salary ranges in job listings</li>
                <li>Respond to applicants within a reasonable timeframe</li>
                <li>Not discriminate based on protected characteristics</li>
                <li>Pay all applicable fees for job postings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">6. Prohibited Activities</h2>
              <p className="mb-2">
                You may not:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the platform for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to any part of the platform</li>
                <li>Interfere with the proper functioning of the platform</li>
                <li>Collect user data without consent</li>
                <li>Post false, misleading, or fraudulent content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">7. Intellectual Property</h2>
              <p>
                All content on the platform, including text, graphics, logos, and software, is the property of Cloud & DevOps Jobs or its licensors and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Cloud & DevOps Jobs shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notifications. Continued use of the platform after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-3">10. Contact</h2>
              <p>
                For questions about these Terms, contact us at{' '}
                <a href="mailto:legal@clouddevops.jobs" className="text-primary-400 hover:text-primary-300">legal@clouddevops.jobs</a>.
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

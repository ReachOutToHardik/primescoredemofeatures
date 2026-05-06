import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Primescore',
  description: 'Our comprehensive commitment to protecting your personal and financial data.',
}

export default function PrivacyPage() {
  return (
    <div className="py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-black text-brandNavy mb-4">Privacy Policy</h1>
        <p className="text-sm text-textSecondary mb-12">Last Updated: May 6, 2026</p>
        
        <div className="prose prose-blue max-w-none text-textSecondary leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">1. Introduction</h2>
            <p>Welcome to Primescore. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">2. The Data We Collect About You</h2>
            <p>Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, email address and telephone numbers.</li>
              <li><strong>Financial Data:</strong> includes bank account and credit report details provided for rectification purposes.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">3. How Your Personal Data Is Collected</h2>
            <p>We use different methods to collect data from and about you including through:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Direct interactions:</strong> You may give us your Identity, Contact and Financial Data by filling in forms or by corresponding with us by post, phone, email or otherwise.</li>
              <li><strong>Automated technologies:</strong> As you interact with our website, we may automatically collect Technical Data about your equipment, browsing actions and patterns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">4. How We Use Your Personal Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">5. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">6. Data Retention</h2>
            <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">7. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact our data privacy manager in the following ways:</p>
            <p className="mt-2">Email address: info@primescore.in</p>
            <p>Postal address: iStart Nest Incubation Center, Gov. Polytechnic College, Jodhpur (Raj.) – 342001</p>
          </section>
        </div>
      </div>
    </div>
  )
}

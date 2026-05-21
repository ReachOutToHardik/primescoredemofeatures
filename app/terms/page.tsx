import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Primescore',
  description: 'The formal terms and conditions governing your use of Primescore services.',
}

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-black text-brandNavy mb-4">Terms of Service</h1>
        <p className="text-sm text-textSecondary mb-12">Last Updated: May 6, 2026</p>
        
        <div className="prose prose-blue max-w-none text-textSecondary leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">1. Agreement to Terms</h2>
            <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Primescore (“company”, “we”, “us”, or “our”), concerning your access to and use of the primescore.in website and its underlying AI resolution engine. By accessing the site and utilizing our services, you expressly agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms, then you are expressly prohibited from using the Site and must discontinue use immediately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">2. Services & AI Limitations</h2>
            <p>Primescore provides professional credit report analysis, anomaly detection, and automated dispute drafting via our proprietary engine, Parth. You expressly acknowledge and agree that:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Not Legal Counsel:</strong> Primescore is a technology platform, not a law firm. Our AI-generated dispute packets are structured based on RBI directives and CIC Act guidelines but do not constitute formal legal advice or financial counseling.</li>
              <li><strong>No Guarantee of Outcome:</strong> Final decisions on credit report updates, anomaly removal, and subsequent score changes rest entirely with the independent credit bureaus (e.g., CIBIL, Experian, Equifax). Primescore does not and cannot guarantee any specific numeric increase in credit scores.</li>
              <li><strong>Accuracy of Input:</strong> You are solely responsible for ensuring the absolute accuracy and truthfulness of the financial documents and identifying information you upload to our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">3. Account Registration & Security</h2>
            <p>You may be required to register with the Site to access certain features. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">4. Cloud Infrastructure & Platform Availability</h2>
            <p>Our platform is hosted on robust enterprise cloud infrastructure provided by Amazon Web Services (AWS). While we strive for 99.9% uptime and utilize auto-scaling systems, the Services are provided on an "AS IS" and "AS AVAILABLE" basis. We reserve the right to modify, suspend, or discontinue the platform for maintenance, API updates, or security patches without prior notice or liability.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">5. Acceptable Use & Strict Security Restrictions</h2>
            <p>You agree not to use the Services for any unlawful or unauthorized purpose. Furthermore, you expressly agree that you shall not:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Attempt to bypass, disable, or interfere with security-related features of the Site, including our AWS Web Application Firewalls (WAF) or authentication mechanisms.</li>
              <li>Engage in automated scraping, data mining, reverse engineering, or unauthorized extraction of our intellectual property or AI algorithms.</li>
              <li>Upload malicious code, viruses, trojan horses, or excessively large documents intended to perform Denial of Service (DoS) attacks on our AI parsing nodes.</li>
              <li>Use the Site in a manner inconsistent with any applicable laws or regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">6. Intellectual Property Rights</h2>
            <p>The Site and Services are our proprietary property. All source code, AI system architectures (including the Parth engine), databases, functionality, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein are owned or licensed to us, and are protected by copyright and trademark laws globally.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">7. Limitation of Liability & Indemnification</h2>
            <p>To the maximum extent permitted by law, in no event will Primescore, our directors, employees, or cloud infrastructure providers be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the Site, reliance on AI-generated documentation, or data breaches resulting from unforeseeable zero-day vulnerabilities. You agree to defend, indemnify, and hold us harmless from and against any loss, damage, liability, claim, or demand arising out of your use of the Services or breach of these Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">8. Dispute Resolution & Governing Law</h2>
            <p>These Terms shall be governed by and defined following the laws of India. Any legal action or proceeding related to your access to, or use of, the Website or these Terms shall be instituted only in a state or federal court located in Jodhpur, Rajasthan. You and Primescore irrevocably consent to the jurisdiction of such courts.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">9. Modifications to Terms</h2>
            <p>We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason. We will alert you about any changes by updating the “Last Updated” date of these Terms of Service. It is your responsibility to periodically review these Terms of Service to stay informed of updates.</p>
          </section>
        </div>
      </div>
    </div>
  )
}


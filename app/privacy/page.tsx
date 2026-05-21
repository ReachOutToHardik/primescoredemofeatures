import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Primescore',
  description: 'Our comprehensive commitment to protecting your personal and financial data.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-black text-brandNavy mb-4">Privacy Policy</h1>
        <p className="text-sm text-textSecondary mb-12">Last Updated: May 6, 2026</p>
        
        <div className="prose prose-blue max-w-none text-textSecondary leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">1. Introduction & Scope</h2>
            <p>Welcome to Primescore. We respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines our practices regarding the collection, use, processing, and disclosure of your information when you visit our platform, utilize our AI-driven credit resolution engine (Parth), or interact with us in any manner. Primescore adheres strictly to the Digital Personal Data Protection Act, 2023 (DPDP Act) of India, and aligns with global best practices for financial data security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">2. Exhaustive Data Collection Categories</h2>
            <p>To provide our specialized credit resolution services, we collect and process several categories of data:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Identity Data:</strong> Full name, date of birth, marital status, and government-issued identifiers (e.g., PAN, Aadhaar) solely for the purpose of identity verification and credit bureau correspondence.</li>
              <li><strong>Contact Data:</strong> Primary and secondary email addresses, residential address, billing address, and mobile numbers.</li>
              <li><strong>Financial & Bureau Data:</strong> Comprehensive credit reports, credit scores, account histories, loan details, dispute histories, and specific anomaly markers identified by our engine.</li>
              <li><strong>Technical Data:</strong> IP addresses, MAC addresses, browser types and versions, time zone settings, geographic location, operating systems, and device diagnostics.</li>
              <li><strong>Usage Data:</strong> Detailed analytics regarding how you interact with our platform, including page views, navigation paths, feature utilization, and session durations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">3. Cloud Infrastructure, Storage & Security (AWS)</h2>
            <p>Your data security is our paramount concern. Primescore operates on enterprise-grade cloud infrastructure hosted securely on <strong>Amazon Web Services (AWS)</strong>. We employ a multi-layered security architecture:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Data Encryption:</strong> All personal and financial data is encrypted at rest using AES-256 encryption. All data in transit is secured using TLS 1.2 and TLS 1.3 protocols.</li>
              <li><strong>Access Management:</strong> We enforce strict Identity and Access Management (IAM) policies, utilizing Role-Based Access Control (RBAC) and Multi-Factor Authentication (MFA) to ensure that your data is isolated and protected against internal and external unauthorized access.</li>
              <li><strong>Continuous Audits:</strong> Our AWS infrastructure undergoes continuous monitoring, automated vulnerability scanning, and intrusion detection prevention (IDS/IPS) via AWS GuardDuty and WAF.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">4. Artificial Intelligence & Algorithmic Processing</h2>
            <p>Primescore utilizes proprietary and highly secure third-party Large Language Models (LLMs) to parse unstructured bureau data and assemble dispute logic. <strong>We maintain absolute boundaries regarding your data:</strong></p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>No Public Training:</strong> We unequivocally guarantee that we DO NOT use your Personally Identifiable Information (PII) or sensitive financial data to train publicly available AI models.</li>
              <li><strong>Data Anonymization:</strong> Before any data interacts with external AI APIs, sensitive identifiers are programmatically redacted, tokenized, and hashed.</li>
              <li><strong>Transient Processing:</strong> LLM processing environments are ephemeral; they do not persistently store your raw credit data beyond the immediate execution of the dispute generation workflow.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">5. Cookies & Tracking Technologies</h2>
            <p>We use cookies, web beacons, pixels, and other tracking technologies to enhance your experience, analyze platform performance, and customize content. You can configure your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. Note that if you disable or refuse cookies, certain secure areas of the platform may become inaccessible or function improperly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">6. Third-Party Disclosures & International Transfers</h2>
            <p>We do not sell your personal data. We may share your data with select third parties only to facilitate our services (e.g., securely transmitting dispute packets to CIBIL, Experian, or Equifax, or processing payments via secure gateways). If your data is transferred internationally (e.g., to AWS data centers in specific availability zones), we ensure a similar degree of protection is afforded by utilizing legally binding data transfer agreements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">7. Your Legal Rights</h2>
            <p>Under applicable data protection laws, you possess the right to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of incomplete or inaccurate data.</li>
              <li><strong>Erasure:</strong> Request the complete deletion of your account and associated financial data. Upon request, data will be purged from our active databases and AWS S3 buckets within 30 days.</li>
              <li><strong>Restriction:</strong> Request restriction of processing your personal data under certain scenarios.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">8. Children's Privacy</h2>
            <p>Our platform is not intended for individuals under the age of 18. We do not knowingly collect data relating to minors. If we become aware that we have collected personal data from a child without verification of parental consent, we will take steps to remove that information from our servers immediately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">9. Contact Us</h2>
            <p>If you have any questions, requests for data deletion, or concerns about this exhaustive privacy policy, please contact our Data Protection Officer:</p>
            <p className="mt-2"><strong>Email:</strong> legal@primescore.in</p>
            <p><strong>Address:</strong> iStart Nest Incubation Center, Gov. Polytechnic College, Jodhpur (Raj.) – 342001</p>
          </section>
        </div>
      </div>
    </div>
  )
}


import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Primescore',
  description: 'The formal terms and conditions governing your use of Primescore services.',
}

export default function TermsPage() {
  return (
    <div className="py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-black text-brandNavy mb-4">Terms of Service</h1>
        <p className="text-sm text-textSecondary mb-12">Last Updated: May 6, 2026</p>
        
        <div className="prose prose-blue max-w-none text-textSecondary leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">1. Agreement to Terms</h2>
            <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Primescore (“company”, “we”, “us”, or “our”), concerning your access to and use of the primescore.in website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">2. Services Provided</h2>
            <p>Primescore provides professional credit report analysis, identification of inaccuracies, and assistance in drafting and filing disputes with credit bureaus. You acknowledge that:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Primescore is not a credit bureau or lender.</li>
              <li>Final decisions on credit report updates rest solely with the credit bureaus (CIBIL, Experian, etc.).</li>
              <li>We do not guarantee a specific numeric increase in credit scores.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">3. User Representations</h2>
            <p>By using the Services, you represent and warrant that:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
              <li>You will not use the Services for any illegal or unauthorized purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">4. Fees and Payment</h2>
            <p>You may be required to purchase or pay a fee to access some of our services. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. We may change prices at any time. All payments shall be in Indian Rupees (INR).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">5. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Site and Services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">6. Limitation of Liability</h2>
            <p>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site or Services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">7. Governing Law</h2>
            <p>These Terms shall be governed by and defined following the laws of India. Primescore and yourself irrevocably consent that the courts of Jodhpur, Rajasthan shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">8. Modifications to Terms</h2>
            <p>We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason. We will alert you about any changes by updating the “Last Updated” date of these Terms of Service.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

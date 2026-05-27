import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy — Primescore',
  description: 'Our refund policies for Primescore subscriptions and services.',
}

export default function RefundPolicyPage() {
  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-black text-brandNavy mb-4">Refund Policy</h1>
        <p className="text-sm text-textSecondary mb-12">Primescore Fintech Private Limited</p>
        
        <div className="prose prose-blue max-w-none text-textSecondary leading-relaxed space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">4. Refund Policy</h2>
            
            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">4.1 General Policy – No Refund</h3>
            <p>Primescore Fintech Private Limited follows a strict NO REFUND policy. All payments made for subscriptions, credit report access, or any other services are final and non-refundable once the service has been delivered or initiated.</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Services are activated or initiated immediately upon payment confirmation.</li>
              <li>Digital services such as credit report access are consumed at delivery and cannot be returned.</li>
              <li>You waive the right to seek a refund once the service is rendered.</li>
            </ul>

            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">4.2 Exception – Technical Failure Only</h3>
            <p>The sole exception is where payment has been deducted due to a verified technical error AND the service was NOT delivered or activated:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Report within 7 business days to: <a href="mailto:info@primescore.in" className="text-brandBlue">info@primescore.in</a></li>
              <li>Subject line: 'Refund Request – [Registered Mobile/Email] – [Transaction Date]'</li>
              <li>Attach payment proof (bank statement or Razorpay reference) and confirm service was not activated.</li>
              <li>Investigation completed within 5–7 business days.</li>
              <li>Confirmed technical failures: full refund to original payment method within 7–10 business days.</li>
              <li>Applicable Razorpay processing fees may be deducted from the refund amount.</li>
            </ul>

            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">4.3 Non-Eligible Situations</h3>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Change of mind after payment.</li>
              <li>Dissatisfaction with bureau data (originating from third-party intermediaries).</li>
              <li>Accidental purchase where service has already been delivered.</li>
              <li>Claims filed after 7 business days from the transaction date.</li>
              <li>Connectivity or device issues on the user's end.</li>
            </ul>

            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">4.4 Currency</h3>
            <p>All transactions are in Indian Rupees (INR). Refunds, where applicable, will be processed in INR only.</p>
          </section>

        </div>
      </div>
    </div>
  )
}

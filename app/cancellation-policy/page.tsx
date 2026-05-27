import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cancellation Policy — Primescore',
  description: 'Our cancellation policies for Primescore subscriptions and services.',
}

export default function CancellationPolicyPage() {
  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-black text-brandNavy mb-4">Cancellation Policy</h1>
        <p className="text-sm text-textSecondary mb-12">Primescore Fintech Private Limited</p>
        
        <div className="prose prose-blue max-w-none text-textSecondary leading-relaxed space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-brandNavy mb-4">5. Cancellation Policy</h2>
            
            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">5.1 Overview</h3>
            <p>This Cancellation Policy governs how users may cancel subscriptions or service plans purchased on the Primescore Platform. Please read this policy carefully before subscribing.</p>

            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">5.2 Subscription Cancellation by User</h3>
            <p>Users may cancel their active subscription at any time through:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>The 'Manage Subscription' section in their registered account dashboard.</li>
              <li>By sending a written cancellation request to: <a href="mailto:info@primescore.in" className="text-brandBlue">info@primescore.in</a> with subject line 'Subscription Cancellation – [Registered Email/Mobile]'.</li>
            </ul>
            <p className="mt-4">Cancellation takes effect at the end of the current billing cycle. Access to subscribed services will continue until the cycle end date. No charges will be raised for subsequent renewal periods after cancellation is confirmed.</p>

            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">5.3 Effect of Cancellation</h3>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Cancellation stops all future auto-renewal charges immediately upon confirmation.</li>
              <li>You retain access to your subscribed services until the end of the paid billing period.</li>
              <li>After the billing period ends, your account will revert to the free tier (if available) or become inactive.</li>
              <li>Your credit report history and account data will be retained for 90 days post-cancellation, after which it may be deleted in accordance with our Privacy Policy and DPDPA 2023.</li>
              <li>No partial or pro-rated refund will be issued for the unused portion of the current billing cycle.</li>
            </ul>

            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">5.4 No Refund on Cancellation</h3>
            <p>Cancellation of a subscription does NOT entitle the user to a refund for the current billing period. The No Refund policy applies. The only exception remains a verified technical failure.</p>

            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">5.5 One-Time Service Cancellation</h3>
            <p>For one-time purchases (e.g., a single credit report fetch):</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Cancellation is not possible once the service has been initiated or the report has been fetched.</li>
              <li>If the service has been purchased but not yet initiated, cancellation requests may be raised within 2 hours of payment to: <a href="mailto:info@primescore.in" className="text-brandBlue">info@primescore.in</a></li>
              <li>Cancellation of uninitiated one-time services will be evaluated on a case-by-case basis. Approved cancellations will be processed as per technical failure timelines.</li>
            </ul>

            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">5.6 Cancellation by Primescore</h3>
            <p>Primescore reserves the right to cancel or suspend a user's subscription or account in the following circumstances:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Violation of the Terms and Conditions or Usage Policy.</li>
              <li>Detection of fraudulent, abusive, or illegal activity.</li>
              <li>Failure to provide accurate identity or payment information.</li>
              <li>Regulatory or legal obligations requiring us to do so.</li>
            </ul>
            <p className="mt-4">In cases of cancellation initiated by Primescore due to user-side violations, no refund will be provided. In cases of cancellation initiated by Primescore for reasons unrelated to user fault (e.g., service discontinuation), a pro-rated refund for the unused period may be considered at Primescore's sole discretion.</p>

            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">5.7 Auto-Renewal</h3>
            <p>All subscription plans are set to auto-renew by default at the end of each billing cycle. Users will receive a renewal reminder notification at least 3 days prior to the renewal date via registered email/SMS. To prevent renewal, users must cancel before the renewal date as described in Section 5.2.</p>

            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">5.8 How to Cancel – Quick Reference</h3>
            <ul className="list-none mt-4 space-y-2">
              <li><strong>Step 1:</strong> Log in to your Primescore account at www.primescore.in</li>
              <li><strong>Step 2:</strong> Go to: My Account → Manage Subscription → Cancel Subscription</li>
              <li><strong>Step 3:</strong> Confirm cancellation. You will receive a confirmation email within 24 hours.</li>
              <li className="mt-4"><strong>Alternative:</strong> Email <a href="mailto:info@primescore.in" className="text-brandBlue">info@primescore.in</a> with subject: 'Subscription Cancellation – [Your Registered Email]'</li>
              <li><strong>Response Time:</strong> Cancellation requests via email are processed within 2 business days.</li>
            </ul>

            <h3 className="text-xl font-semibold text-brandNavy mb-2 mt-6">5.9 Contact for Cancellation Support</h3>
            <p className="mt-2"><strong>Email:</strong> <a href="mailto:info@primescore.in" className="text-brandBlue">info@primescore.in</a></p>
            <p><strong>Address:</strong> Primescore Fintech Private Limited, Plot No. 42, KHS.No.134, Laxman Nagar C, Nandri, Banar, Jodhpur – 342015, Rajasthan</p>
            <p className="mt-6 text-sm">
              PRIMESCORE FINTECH PRIVATE LIMITED | CIN: U70200RJ2025PTC102685 | GSTIN: 08AAPCP7666P1Z7 | PAN: AAPCP7666P<br />
              <a href="https://primescore.in" className="text-brandBlue">primescore.in</a> | <a href="mailto:info@primescore.in" className="text-brandBlue">info@primescore.in</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}

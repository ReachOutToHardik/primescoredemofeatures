import type { Metadata } from 'next'
import FdCalculator from '../../../src/views/tools/FdCalculator'

export const metadata: Metadata = {
  title: 'FD Calculator: Calculate Fixed Deposit Maturity & Returns',
  description: 'Calculate your fixed deposit interest & returns easily with our free FD calculator. Compute quarterly compounding, maturity amounts, and interest rates for top Indian banks.',
  keywords: [
    'fd calculator',
    'fd return calculator',
    'fd interest calculator',
    'fixed deposit calculator',
    'fixed deposit return calculator',
    'fixed deposit interest calculator',
    'fd interest rates calculator',
    'fd rate calculator',
    'fd quarterly interest calculator',
    'fd amount calculator'
  ]
}

const fdFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does a Fixed Deposit (FD) calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An FD calculator calculates the interest earned and maturity value of your investment based on the principal amount, tenure, and applicable interest rate. Primescore\'s FD return calculator compounds interest quarterly, which is the standard methodology followed by Indian banks.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is a fixed deposit return calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A fixed deposit return calculator is an online tool that helps investors determine the returns they will get upon maturity. By entering the investment amount, duration, and FD interest rate, the tool instantly displays the maturity value and interest earned.'
      }
    },
    {
      '@type': 'Question',
      name: 'How is quarterly compounding interest calculated on an FD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FD quarterly interest is calculated using the compound interest formula: A = P(1 + r/n)^(n*t), where P is the principal amount, r is the annual rate of interest, t is the time in years, and n is the compounding frequency per year (n = 4 for quarterly compounding).'
      }
    },
    {
      '@type': 'Question',
      name: 'Which bank offers the highest FD interest rates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FD interest rates vary by bank, investment tenure, and whether the investor is a senior citizen. Most leading Indian banks offer interest rates ranging from 6% to 8% per annum. You can use our FD rate calculator to check returns for any custom interest rate.'
      }
    }
  ]
}

export default function FdPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fdFaqSchema) }}
      />
      <FdCalculator />
    </>
  )
}

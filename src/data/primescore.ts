export type Service = {
  id: string
  title: string
  short: string
  description: string
  priceRange: string
  timeline: { title: string; detail: string; eta: string }[]
}

export const services: Service[] = [
  {
    id: 'rectification',
    title: 'CIBIL Score Rectification',
    short: 'Dispute inaccuracies, fix wrong entries, and rebuild trust with bureaus.',
    description:
      'We audit your report line-by-line, identify disputable inaccuracies, and file legally-backed disputes with clear evidence. You get a real-time dashboard of what was filed, when, and why — with transparent outcomes.',
    priceRange: '₹999 – ₹4,999',
    timeline: [
      { title: 'Report Audit', detail: 'We review accounts, inquiries, and payment history for disputable errors.', eta: '24–48 hrs' },
      { title: 'Evidence Pack', detail: 'We prepare documents, letters, and bureau-ready dispute drafts.', eta: '2–3 days' },
      { title: 'Dispute Filing', detail: 'We submit disputes and track acknowledgements and reference IDs.', eta: 'Same day' },
      { title: 'Follow-ups', detail: 'We push for resolution with structured escalations when needed.', eta: '30–60 days' },
    ],
  },
  {
    id: 'settlement',
    title: 'Loan Settlement Negotiation',
    short: 'Negotiate smart, protect future creditworthiness, and close safely.',
    description:
      'If you’re considering settlement, we help you avoid common mistakes that permanently damage your profile. Our team structures negotiation, documentation, and closure verification to minimize long-term score impact.',
    priceRange: '₹2,499 – ₹9,999',
    timeline: [
      { title: 'Case Review', detail: 'We understand the loan history, overdue status, and lender stance.', eta: '1–2 days' },
      { title: 'Negotiation Plan', detail: 'We craft a settlement strategy and acceptable terms checklist.', eta: '2–4 days' },
      { title: 'Closure & Proof', detail: 'We ensure written confirmation and closure proof is collected.', eta: '1–2 weeks' },
      { title: 'Report Update', detail: 'We monitor bureau updates and dispute wrong settlement markers.', eta: '30–60 days' },
    ],
  },
  {
    id: 'card-disputes',
    title: 'Credit Card Dispute Filing',
    short: 'Chargebacks, wrong late fees, and disputed dues — handled end-to-end.',
    description:
      'We handle disputes for incorrect charges, unfair fees, wrong delinquency tags, and account status issues. Every dispute is backed with narrative, proof, and a trackable escalation sequence.',
    priceRange: '₹999 – ₹3,999',
    timeline: [
      { title: 'Transaction Trace', detail: 'We map statements, dues, and communications into a clear timeline.', eta: '24–48 hrs' },
      { title: 'Dispute Draft', detail: 'We draft the dispute with precise references for fast acceptance.', eta: '2–3 days' },
      { title: 'Submission & Tracking', detail: 'We submit to issuer and bureaus, then monitor updates.', eta: 'Same day' },
      { title: 'Resolution Push', detail: 'We follow up until you get a written resolution or correction.', eta: '2–6 weeks' },
    ],
  },
  {
    id: 'monitoring',
    title: 'Credit Report Monitoring',
    short: 'Get alerts, stay clean, and catch errors before they become problems.',
    description:
      'We monitor key signals like new inquiries, account status changes, and adverse flags. You get proactive guidance to protect your score while your disputes are in flight.',
    priceRange: '₹399/mo – ₹999/mo',
    timeline: [
      { title: 'Setup', detail: 'We configure monitoring and create your baseline score snapshot.', eta: 'Same day' },
      { title: 'Alerts', detail: 'You get timely alerts when meaningful credit events occur.', eta: 'Ongoing' },
      { title: 'Monthly Review', detail: 'We share a monthly score health summary and next actions.', eta: 'Monthly' },
      { title: 'Rapid Disputes', detail: 'We fast-track disputes for new inaccuracies discovered.', eta: '48 hrs' },
    ],
  },
  {
    id: 'coaching',
    title: 'Personal Finance Coaching',
    short: 'Build habits that keep your credit clean — not just a one-time fix.',
    description:
      'Our experts help you design a 90-day plan for utilization, due-date discipline, and safe credit building. Simple, practical steps — built for Indian incomes and real EMI life.',
    priceRange: '₹1,999 – ₹4,999',
    timeline: [
      { title: 'Discovery Call', detail: 'We assess current debt, income, and cashflow patterns.', eta: '60 mins' },
      { title: '90-Day Plan', detail: 'We create a step-by-step plan aligned to your credit goals.', eta: '2–3 days' },
      { title: 'Check-ins', detail: 'We keep you accountable with progress reviews and tweaks.', eta: 'Weekly' },
      { title: 'Score Hygiene', detail: 'We teach what to do (and avoid) to protect your bureau profile.', eta: 'Ongoing' },
    ],
  },
  {
    id: 'emi',
    title: 'EMI Restructuring',
    short: 'Restructure responsibly and prevent late tags from destroying trust.',
    description:
      'When EMIs are tight, the right restructure saves you from long-term credit damage. We help you document your case, negotiate revised terms, and ensure bureau reporting stays accurate.',
    priceRange: '₹2,499 – ₹7,999',
    timeline: [
      { title: 'Affordability Review', detail: 'We calculate safe EMI bands and realistic revised terms.', eta: '1–2 days' },
      { title: 'Lender Proposal', detail: 'We prepare documents and a clean proposal to submit.', eta: '3–5 days' },
      { title: 'Restructure Track', detail: 'We follow up for approvals and written confirmation.', eta: '1–3 weeks' },
      { title: 'Bureau Correctness', detail: 'We verify reporting and dispute wrong delinquency flags.', eta: '30–60 days' },
    ],
  },
]

export type Testimonial = {
  name: string
  city: string
  role: string
  before: number
  after: number
  days: number
  rating: number
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sunil Mathur',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'There were 4 loans in my CIBIL that belonged to someone else, one of which had its license cancelled. They helped me completely and got 3 loans successfully removed. One loan remained, but they put in extra effort for that too. Due to the cancelled license and no response from the other side, that loan could not be removed. Still, I am very happy with their services and appreciate their hard work and honesty.',
  },
  {
    name: 'Yogesh Shrimali',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'There were 20 loans of someone else showing in my CIBIL. I contacted Primescore and they got all the unknown accounts removed from my CIBIL. Thanks to Primescore, keep helping everyone like this.',
  },
  {
    name: 'Mukesh Vaishnav',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'Some other loans were showing in my CRIF report. Their team resolved my issue. Must recommend.',
  },
  {
    name: 'Shiv Charan',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 12,
    rating: 5,
    quote: 'Primescore did very good work repairing my CIBIL. Someone else\'s settled loan had appeared in my CIBIL due to which my loan got rejected. They removed it in just 12 days and my loan got approved. Very fast work. Thank you.',
  },
  {
    name: 'Rakesh Parihar',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'There were some extra loans showing in my CIBIL. I contacted them and they solved my problem completely. Thank you Primescore.',
  },
  {
    name: 'Jakir Husain',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 766,
    days: 45,
    rating: 5,
    quote: 'I had been troubled by my incorrect credit report for the past three years. The Primescore team analyzed my entire report thoroughly and handled the credit report repair process in a very professional manner. Now my report is clean and my score has also reached 766+.',
  },
  {
    name: 'Prakash Kumar',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'There were 5 loans in my CIBIL that were not mine. The Primescore team removed them on time and my loan got approved immediately.',
  },
  {
    name: 'Manohar Singh',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'It is very good support for improving credit score in the right way. Thanks to Primescore team Jodhpur.',
  },
  {
    name: 'Sitaram Soni',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'Primescore has a very good team, very transparent and fast work.',
  },
  {
    name: 'Bhagi Rath',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'My CIBIL score is excellent now. You can contact Mr. Sawai Singh ji to improve your CIBIL score. His behavior is very good and he is a very polite person. You can get work done from him with full confidence without any problem.',
  },
  {
    name: 'Rajpal Singh Rajpal',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'I am very happy with your service and I really appreciate it. Thanks a lot. The work was done in only a few days. Once again, thank you.',
  },
  {
    name: 'Hemant Kumar',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'Thank you so much sir for correcting my CIBIL report.',
  },
  {
    name: 'Harman Jarora',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 720,
    days: 45,
    rating: 5,
    quote: 'I had been troubled by my incorrect credit report for the past several months. The Primescore team analyzed my entire report thoroughly and handled the credit report repair process in a very professional manner. Now my report is clean and my score has also reached 720+.',
  },
  {
    name: 'Babulal Bhati',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'Excellent experience. Primescore\'s services are very trustworthy. They got my wrong loan entry removed and increased my CIBIL score. Now I can easily apply for loans. The team is very professional.',
  },
  {
    name: 'Nava Ram',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'My experience with Primescore Credit Repair Agency was very good. They understood my financial problems and gave me the best solution. Their process is fast and easy. If you want to improve your credit score then definitely try their services. Fully satisfied with their service!',
  },
  {
    name: 'Sumeet Singh Rawat',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'Best CIBIL rectification place in India. Experienced team — not only corrects the CIBIL score but also gives professional advice regarding your credit score.',
  },
  {
    name: 'Bijaram Gehlot',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'A trustworthy company. I had been troubled by the errors in my credit report for a long time, but Primescore provided a solution in a short time. They made the entire process easy and transparent. Thank you very much!',
  },
  {
    name: 'Piyush Sharma',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'I liked Primescore\'s services very much. They explained everything properly and I was able to improve my credit score with their guidance. They communicate in both Hindi and English, so clarity was very good. If anyone wants to fix their credit, definitely consider Primescore.',
  },
  {
    name: 'Mukesh Swami',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'My credit report which was not updated properly was corrected well at their firm. The work was fast and their fees are reasonable. Kudos to team Primescore.',
  },
  {
    name: 'Mahaveer Singh',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'My experience with Primescore was amazing. Their service is fast and efficient, and they are transparent at every step. Whatever questions I had, they cleared everything and gave me confidence that my credit score would improve. Must visit.',
  },
  {
    name: 'Pappsa Karela',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'Primescore Credit Repair Agency\'s services are very amazing! They helped me completely in understanding and solving my credit issues. I was given proper guidance at every step and my questions were answered patiently. If you want to improve your credit score, Primescore is the best choice! Highly recommended!',
  },
  {
    name: 'Jay Singh',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'I thought Primescore\'s financial consultancy would be very costly but when I tried their service, their packages were quite cost-friendly. Now I will be able to easily get a property loan.',
  },
  {
    name: 'Kuyaram Suthar',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'The Primescore team helped me a lot by removing the unknown accounts added in my CIBIL in a very fast and proper manner, due to which my CIBIL credit score was corrected.',
  },
  {
    name: 'Om Prakash',
    city: 'Jodhpur',
    role: 'Business Owner',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'Their financial consultancy is top notch. The guidance given to improve the credit score was very useful to me. Now I will be able to easily get a micro loan for my business.',
  },
  {
    name: 'Balendar Joping',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'Fully satisfied with the service. I got a customized solution that was best for my financial security. Primescore solved a big problem for people like me by bringing the right solution.',
  },
  {
    name: 'Sukhdev Singh',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'The Primescore team fixed all the problems in my CIBIL score in a genuine way. They also made me well aware about CIBIL score and related knowledge.',
  },
  {
    name: 'Tilok Suthar',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'The Primescore CIBIL rectification team easily solved all the issues in my CIBIL score report. Work was done very fast. Thank you team Primescore.',
  },
  {
    name: 'Nirmla Devi',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'My CRIF and Experian CIBIL report issues were solved in a fast and trustworthy way. Team cooperation is very good. Overall a great experience with Primescore.',
  },
  {
    name: 'Ganesharam Prajapat',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'I came here and got the unknown accounts removed from my CIBIL. The staff was well-behaved and explained the entire process very well in the local language. Only with their help will I now be able to get a loan for my son\'s wedding. Thanks Primescore team.',
  },
  {
    name: 'Nasir Khan',
    city: 'Jodhpur',
    role: 'Client',
    before: 500,
    after: 750,
    days: 45,
    rating: 5,
    quote: 'The Primescore team removed the unknown disputes showing in my CIBIL and improved my score very well. Really good team.',
  },
]

export type FAQ = { q: string; a: string }

export const faqs: FAQ[] = [
  {
    q: 'What is credit score rectification?',
    a: 'Credit score rectification (or credit repair) is the legal process of disputing inaccurate, outdated, or unverifiable entries on your credit report. We correct false late payments and errors to improve your overall CIBIL score.',
  },
  {
    q: 'How long does CIBIL dispute resolution take?',
    a: 'Under RBI guidelines, bureaus and banks have 30 days to resolve a dispute. Most simple errors are fixed in 30-45 days, while complex cases like loan settlements may take 60-90 days.',
  },
  {
    q: 'Can incorrect late payments (DPD) be removed?',
    a: 'Yes. If a late payment or Days Past Due (DPD) was marked incorrectly due to a bank error or technical glitch, we can file a legal dispute to have it completely removed from your credit history.',
  },
  {
    q: 'Does loan settlement affect my CIBIL score?',
    a: 'Yes, a "Settled" status damages your score for up to 7 years because the loan was closed for less than the total amount due. We help negotiate proper closures and dispute invalid settlement markers.',
  },
  {
    q: 'How much CIBIL score improvement is possible?',
    a: 'Removing a single false late payment can boost your score by 20-50 points. For major errors like false defaults, clients often see improvements of over 100 points, rapidly crossing the 750+ mark.',
  },
  {
    q: 'How does Primescore help fix my credit?',
    a: 'Primescore is India’s trusted credit consultancy. We legally dispute errors directly with banks and bureaus, and provide a live dashboard so you can track your CIBIL score recovery in real-time.',
  },
]

export const howItWorksSteps = [
  {
    number: '01',
    title: 'Upload Your Credit Report',
    icon: 'upload',
    eta: '5 mins',
    description:
      'Secure onboarding. We only ask for what’s needed — report, identity verification, and relevant supporting documents.',
  },
  {
    number: '02',
    title: 'Deep Audit & Error Detection',
    icon: 'scan',
    eta: '24–48 hrs',
    description:
      'Our system flags anomalies across accounts, inquiries, status codes, and payment history. A credit expert reviews every finding.',
  },
  {
    number: '03',
    title: 'Evidence Pack & Dispute Drafting',
    icon: 'file',
    eta: '2–3 days',
    description:
      'We prepare bureau-ready disputes with documentary proof and precise references so responses are faster and clearer.',
  },
  {
    number: '04',
    title: 'Filing, Tracking & Escalations',
    icon: 'track',
    eta: '30–60 days',
    description:
      'We file, track reference IDs, follow up on timelines, and escalate when responses are delayed or incomplete.',
  },
  {
    number: '05',
    title: 'Score Recovery + Long-term Hygiene',
    icon: 'rise',
    eta: 'Up to 90 days',
    description:
      'Once corrections reflect, your score typically rebounds. We share practical steps so your improved profile stays strong.',
  },
] as const

export const disputeItems = [
  'Duplicate loan/credit card entries',
  'Wrong overdue/DPD markings',
  'Closed accounts shown as active',
  'Incorrect personal details and address mismatch',
  'Fraudulent or unrecognized inquiries',
  'Incorrect settlement or write-off tags',
]

export const errorTypeStats = [
  { label: 'Duplicate Accounts', rate: 92 },
  { label: 'Wrong Late Payment Tags', rate: 88 },
  { label: 'Incorrect Account Status', rate: 84 },
  { label: 'Unrecognized Inquiries', rate: 79 },
  { label: 'Personal Detail Mismatch', rate: 76 },
] as const

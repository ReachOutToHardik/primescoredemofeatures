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
  avatar?: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Bhagi rath',
    city: 'Jodhpur',
    role: 'Client',
    before: 610,
    after: 785,
    days: 45,
    rating: 5,
    quote: 'My CIBIL score is excellent now. You can contact Mr. Sawai Singh ji to improve your CIBIL score. His behavior is very good and he is a very polite person. You can get work done from him with full confidence without any problem.',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWtNJ1vh0kwnwNDDlf6Y53Up1Ku7K6oTD-wKw6LIZs8FS0kyJR3=s120-c-rp-mo-br100'
  },
  {
    name: 'Rajpal Singh Rajpal',
    city: 'Jodhpur',
    role: 'Client',
    before: 580,
    after: 745,
    days: 15,
    rating: 5,
    quote: 'I am very happy from your service and I am really appreciate with you thanks a lot And work is done in only few days onc again thanks you',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIJcnSeH2gaS0phHPbSgV_Ku4f4XXdpjV2BZ2-bLMBLa0zXQA=s120-c-rp-mo-br100'
  },
  {
    name: 'SUMEET SINGH RAWAT',
    city: 'Jodhpur',
    role: 'Client',
    before: 620,
    after: 760,
    days: 30,
    rating: 5,
    quote: 'Best cibil curate rectification place in india.... experienced team...not only curate the cibil score...but also give professional advice regarding your credit score...',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVajCQIL1tr2xbkRbatxC3Lx9o2Fj_bCytBk_zBdTEvRQIMy8c=s120-c-rp-mo-br100'
  },
  {
    name: 'Nirmla Devi',
    city: 'Jodhpur',
    role: 'Client',
    before: 540,
    after: 720,
    days: 40,
    rating: 5,
    quote: 'meri crif or experian cibil report me aayi issues ko fast and trustworthy way me solve kiya , team cooperation is too good , overall fine experience with prime score',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocK6TPjEBGr6hnv2fF87Ns3n9XjpssHDwkhTSR8Yd-4DZlrQLA=s120-c-rp-mo-br100'
  },
  {
    name: 'Dinesh Kumar',
    city: 'Jodhpur',
    role: 'Client',
    before: 590,
    after: 755,
    days: 20,
    rating: 5,
    quote: 'this credit repair agency is really genuine and customer friendly, their service is really fast and sober',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKURlHW-HiDnXTS0krDRd_pRmHUSuAuTFYUdDr-YA6_Qa3STw=s120-c-rp-mo-br100'
  },
  {
    name: 'Kiran Malawat',
    city: 'Jodhpur',
    role: 'Client',
    before: 605,
    after: 770,
    days: 25,
    rating: 5,
    quote: 'really helpfull team for finance solution, credit score repairing service really helped me a lot',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocI4S-hlKrSWoZqn2jSiUe5w37q0I482y4no1VjSUEx8KZVZ=s120-c-rp-mo-br100'
  },
  {
    name: 'Shyam Singh',
    city: 'Jodhpur',
    role: 'Client',
    before: 560,
    after: 740,
    days: 50,
    rating: 5,
    quote: 'I interacted with prime score for review my cibil score and they checked it and incredibly maintaining your cibil score. Must visit',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUFOglFkvNajbfjdMAjCgnckOWbYMysyJ-P6m_S2tBcKkVP6Tx95g=s120-c-rp-mo-br100'
  },
  {
    name: 'Ashok Singh Chouhan',
    city: 'Jodhpur',
    role: 'Client',
    before: 630,
    after: 750,
    days: 14,
    rating: 5,
    quote: 'Good Work . Issue Resolved',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVJQfBcH4YKOboWiPWMh6PJvHknRDnFxuEIhARLn84YWPg6_-lh=s120-c-rp-mo-br100'
  },
  {
    name: 'sunil kachhawaha',
    city: 'Jodhpur',
    role: 'Client',
    before: 520,
    after: 765,
    days: 60,
    rating: 5,
    quote: 'Best to best ,time to time ,fast to fast. Only primescore cibil choice select ❤️',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVF8BfrpsqWvkqwe2zHJUJRMdrQQsN1tJV5sKj7WyQ_ydrUdmTp=s120-c-rp-mo-br100'
  },
  {
    name: 'rohit gulsan',
    city: 'Jodhpur',
    role: 'Client',
    before: 575,
    after: 730,
    days: 10,
    rating: 5,
    quote: 'Good service my credit got rectify in 10 days',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWJYPg69gqSr7s9siNUyPJr18iFI60LGdgTVXJoD4n3wi6Ciuo=s120-c-rp-mo-br100'
  },
  {
    name: 'Sunil gehani',
    city: 'Jodhpur',
    role: 'Client',
    before: 600,
    after: 740,
    days: 35,
    rating: 5,
    quote: 'All services are good and staff nature also good and helpfull.',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUgfsG1tnyrcV8gr_1LVoeyUJ7GplTwo7JfdowNSUBLl2FL4m4=s120-c-rp-mo-br100'
  },
  {
    name: 'manohar singh',
    city: 'Jodhpur',
    role: 'Client',
    before: 550,
    after: 735,
    days: 45,
    rating: 5,
    quote: "It's very good support for improve cradit score in right way. Thanks to Primscore team Jodhpur",
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIyQZfs5FW2HWevrlPbJNC-MpI0Iy_e684jwh560JZQJwlzoA=s120-c-rp-mo-br100'
  },
  {
    name: 'Bheema Ram',
    city: 'Jodhpur',
    role: 'Client',
    before: 590,
    after: 750,
    days: 28,
    rating: 5,
    quote: 'Good work ,more satisfied ferfect accurate work.',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLsUdtDE8jpMQ2Z23BDv0GFOFk6B1qu2olokGHtcOzDm7e-1Q=s120-c-rp-mo-br100'
  },
  {
    name: 'subhash bishnoi',
    city: 'Jodhpur',
    role: 'Client',
    before: 615,
    after: 760,
    days: 20,
    rating: 5,
    quote: '🙏👍 Highly satisfied with the prompt service and results.',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXK-gH-RW12Ge8u5XP8RqIjo9YuniU3Jal5JrmhIwu3cv-0TIVO=s120-c-rp-mo-br100'
  },
  {
    name: 'nagora rk',
    city: 'Jodhpur',
    role: 'Client',
    before: 580,
    after: 725,
    days: 35,
    rating: 4,
    quote: 'service center is best competitive netur',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUGTPk0zNpZH5_HlzE6i2Ik-E9KVZaZw-Gy-zqWHThDfU2uIeM=s120-c-rp-mo-br100'
  },
  {
    name: '#Balaji Traders',
    city: 'Jodhpur',
    role: 'Business Owner',
    before: 640,
    after: 775,
    days: 15,
    rating: 5,
    quote: 'good work and fast solution….thnx',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIS4nwuW_GcqgaMQX_p4s2oePOM-DyfBtDPz45RdgTm18URXLU=s120-c-rp-mo-br100'
  },
  {
    name: 'Mimrote 28',
    city: 'Jodhpur',
    role: 'Client',
    before: 570,
    after: 740,
    days: 42,
    rating: 5,
    quote: 'Best service and good corporation',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWWeZnQO2EMeehpuVTKF8sP2Ib7ejOdOHiwYcbmKmSidCwaW9Fd=s120-c-rp-mo-br100'
  },
  {
    name: 'Karan Singh',
    city: 'Jodhpur',
    role: 'Client',
    before: 610,
    after: 755,
    days: 7,
    rating: 5,
    quote: 'Good service credit score rectify in 1 week',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLtNplTcVbSjwPZ-Cis0Vf3TWP644Uj-Jd-Lnt6fVSxWJPZ7w=s120-c-rp-mo-br100'
  },
  {
    name: 'Jay Singh',
    city: 'Jodhpur',
    role: 'Client',
    before: 595,
    after: 750,
    days: 30,
    rating: 5,
    quote: 'satisfied with the service of prime score cibil rectification team',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocK7D989moBgYqYmR0B3ngFq1e6I_1X6WOpp3holnGBb5CqDZQ=s120-c-rp-mo-br100'
  },
  {
    name: 'Tikamram Saran',
    city: 'Jodhpur',
    role: 'Client',
    before: 625,
    after: 780,
    days: 45,
    rating: 5,
    quote: ', ok 🆗👌 Everything handled professionally.',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjX2bthn13ntrBGFmwcQ-ETWUXBDRyKf11oyAiSQ03WMjXsrSkKt=s120-c-rp-mo-br100'
  }
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

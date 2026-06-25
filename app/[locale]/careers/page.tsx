import type { Metadata } from 'next'
import Careers from '../../../src/views/Careers'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  
  const titles: Record<string, string> = {
    hi: 'करियर और इंटर्नशिप | Primescore',
    ta: 'வேலை வாய்ப்புகள் | Primescore',
    te: 'కెరీర్ & ఇంటర్న్‌షిప్ | Primescore',
    kn: 'ಉದ್ಯೋಗಾವಕಾಶಗಳು | Primescore',
    ml: 'കരിയറുകൾ | Primescore',
    mr: 'करिअर आणि इंटर्नशिप | Primescore',
    gu: 'કરિયર અને ઇન્ટર્નશિપ | Primescore',
    bn: 'ক্যারিয়ার এবং ইন্টার্নশিপ | Primescore',
    pa: 'ਕਰੀਅਰ ਅਤੇ ਇੰਟਰਨਸ਼ਿਪ | Primescore',
    ur: 'کیریئر اور انٹرن شپ | Primescore'
  }

  const title = titles[locale] || 'Careers & Internships'

  return {
    title: `${title} | Primescore`,
    description: 'Join the team building India\'s first autonomous credit recovery engine. We are looking for engineers, copywriters, and credit experts.',
    alternates: {
      canonical: `https://www.primescore.in/${locale}/careers`,
      languages: {
        'en-IN': 'https://www.primescore.in/careers',
        'hi-IN': 'https://www.primescore.in/hi/careers',
        'ta-IN': 'https://www.primescore.in/ta/careers',
        'te-IN': 'https://www.primescore.in/te/careers',
        'kn-IN': 'https://www.primescore.in/kn/careers',
        'ml-IN': 'https://www.primescore.in/ml/careers',
        'mr-IN': 'https://www.primescore.in/mr/careers',
        'gu-IN': 'https://www.primescore.in/gu/careers',
        'bn-IN': 'https://www.primescore.in/bn/careers',
        'pa-IN': 'https://www.primescore.in/pa/careers',
        'ur-IN': 'https://www.primescore.in/ur/careers',
      }
    }
  }
}

export default function LocalizedCareersPage() {
  return <Careers />
}

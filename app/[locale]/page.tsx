import type { Metadata } from 'next'
import Home from '../../src/views/Home'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  
  // Custom localized titles based on language codes
  const titles: Record<string, string> = {
    hi: 'प्राइमस्कोर — अपना सिबिल स्कोर सुधारें। अपना भविष्य सुरक्षित करें।',
    ta: 'பிரைம்ஸ்கோர் — உங்கள் சிபில் ஸ்கோரை மேம்படுத்தவும்.',
    te: 'ప్రైమ్‌స్కోర్ — మీ సిబిల్ స్కోరును మెరుగుపరచండి.',
    kn: 'ಪ್ರೈಮ್‌ಸ್ಕೋರ್ — ನಿಮ್ಮ ಸಿಬಿಲ್ ಸ್ಕೋರ್ ಸುಧಾರಿಸಿ.',
    ml: 'പ്രൈംസ്കോർ — നിങ്ങളുടെ സിബിൽ സ്കോർ മെച്ചപ്പെടുത്തുക.',
    mr: 'प्राइमस्कोअर — आपला सिबिल स्कोर सुधारा.',
    gu: 'પ્રાઇમસ્કોર — તમારો સિબિલ સ્કોર સુધારો.',
    bn: 'প্রাইমস্কোর — আপনার সিবিল স্কোর উন্নত করুন।',
    pa: 'ਪ੍ਰਾਈਮਸਕੋਰ — ਆਪਣਾ ਸਿਬਿਲ ਸਕੋਰ ਸੁਧਾਰੋ।',
    ur: 'پرائم اسکور — اپنا سیبل اسکور بہتر بنائیں۔'
  }

  const title = titles[locale] || 'Primescore — Fix Your CIBIL Score. Unlock Your Future.'

  return {
    title: `${title}`,
    description: 'Primescore helps you dispute credit report errors and boost your CIBIL score legally in 90 days. Trusted by 50,000+ Indians.',
    alternates: {
      canonical: `https://www.primescore.in/${locale}`,
      languages: {
        'en-IN': 'https://www.primescore.in',
        'hi-IN': 'https://www.primescore.in/hi',
        'ta-IN': 'https://www.primescore.in/ta',
        'te-IN': 'https://www.primescore.in/te',
        'kn-IN': 'https://www.primescore.in/kn',
        'ml-IN': 'https://www.primescore.in/ml',
        'mr-IN': 'https://www.primescore.in/mr',
        'gu-IN': 'https://www.primescore.in/gu',
        'bn-IN': 'https://www.primescore.in/bn',
        'pa-IN': 'https://www.primescore.in/pa',
        'ur-IN': 'https://www.primescore.in/ur',
      }
    }
  }
}

import { notFound } from 'next/navigation'

const SUPPORTED_LOCALES = ['hi', 'ta', 'te', 'kn', 'ml', 'mr', 'gu', 'bn', 'pa', 'ur']

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound()
  }

  // Return the main Homepage view directly
  return <Home />
}

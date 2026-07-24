'use client'

import { Mail, MapPin, MessageCircle, Phone, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react'
import { useMemo, useState, useRef } from 'react'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'

type IssueType = 'Commercial Credit Audit' | 'Vendor Risk Monitoring' | 'Company dispute' | 'Not sure'

type FormState = {
  companyName: string
  contactName: string
  email: string
  phone: string
  issueType: IssueType
  message: string
}

const DEFAULT_NUMBER = '916350671636'
const DEFAULT_SUPPORT_PHONE = '+91 63506-71636'

export default function BusinessContact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const supportPhone = DEFAULT_SUPPORT_PHONE
  const telHref = `tel:${supportPhone.replace(/[^\d+]/g, '')}`

  const [form, setForm] = useState<FormState>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    issueType: 'Not sure',
    message: ''
  })

  const whatsappHref = useMemo(() => {
    return `https://wa.me/${DEFAULT_NUMBER}?text=${encodeURIComponent(
      'Hi Primescore — I want to fix my credit score. Please contact me.',
    )}`
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email.trim() || !form.companyName.trim()) return

    setStatus('sending')

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = 'template_37a3wfs'
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !publicKey) {
      setStatus('error')
      setErrorMessage('Form configuration is missing. Please contact us via WhatsApp.')
      return
    }

    // Save to Supabase commercial_leads table (for B2B admin panel)
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        await supabase.from('commercial_leads').insert([{
          source_page: 'business_contact_page',
          company_name: form.companyName,
          contact_name: form.contactName,
          email: form.email,
          phone: form.phone,
          service_type: form.issueType,
          message: form.message,
          status: 'New'
        }]);
      }
    } catch (err: any) {
      console.error('Failed to save commercial lead to Supabase', err);
    }

    try {
      const emailjs = (await import('@emailjs/browser')).default
      const templateParams = {
        from_name: `${form.contactName} (${form.companyName})`,
        from_email: form.email,
        from_phone: form.phone,
        issue_type: `B2B: ${form.issueType}`,
        message: form.message,
        to_name: 'Primescore Support',
        to_email: form.email,
      }

      const adminPromise = emailjs.send(serviceId, templateId, templateParams, publicKey)
      const userPromise = emailjs.send(serviceId, 'template_uom4pnf', templateParams, publicKey)

      await Promise.all([adminPromise, userPromise])

      const sheetWebhookUrl = 'https://script.google.com/macros/s/AKfycbw5YhcVQoyohMfXIMUu7LjuYNLskdNF6ttGScqDk7H3wwPkgfC5y-BMYTivdnn6tZj4Ag/exec'
      if (sheetWebhookUrl) {
        try {
          await fetch(sheetWebhookUrl, {
            method: 'POST',
            body: JSON.stringify({
              name: `${form.contactName} (${form.companyName})`,
              email: form.email,
              phone: form.phone,
              issueType: `B2B: ${form.issueType}`,
              message: form.message,
              timestamp: new Date().toISOString()
            }),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
          })
        } catch (sheetErr) {
          console.error('Failed to send to Google Sheets:', sheetErr)
        }
      }

      setStatus('sent')
      setForm({ companyName: '', contactName: '', email: '', phone: '', issueType: 'Not sure', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS Error:', err)
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again or use WhatsApp.')
    }
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-24">
      {/* Hero Intro */}
      <section className="pt-20 sm:pt-28">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2563EB]">GET IN TOUCH</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-6xl">
              Initiate B2B Consultation
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-textSecondary font-medium">
              We resolve corporate report inaccuracies with speed and absolute privacy. Choose a direct pathway below or request a callback.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Split Bento Layout */}
      <section className="mt-14 sm:mt-18">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          
          {/* Left: Interactive Bento Cards & Google Map Grid */}
          <div className="grid gap-6">
            <Reveal>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* 1. WhatsApp Card (Glowing green border) */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group relative overflow-hidden rounded-3xl border border-[#25D366]/30 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(37,211,102,0.18)] flex flex-col justify-between min-h-[190px]"
                >
                  <div className="absolute top-0 right-0 h-28 w-28 bg-[#25D366]/5 rounded-bl-full pointer-events-none transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#25D366]/10 text-[#20ba59] animate-pulse">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#20ba59]" />
                        Active Now
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-brandNavy">Instant WhatsApp Chat</h3>
                    <p className="text-xs text-textSecondary mt-1.5 leading-relaxed">
                      Connect with our response desk instantly. Send files or reports directly.
                    </p>
                  </div>
                  <div className="mt-4 text-xs font-bold text-[#25D366] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Start Chatting <span>→</span>
                  </div>
                </a>

                {/* 2. Book Call Card */}
                <a
                  href={telHref}
                  className="group relative overflow-hidden rounded-3xl border border-brandBlue/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(29,78,216,0.12)] flex flex-col justify-between min-h-[190px]"
                >
                  <div className="absolute top-0 right-0 h-28 w-28 bg-brandBlue/5 rounded-bl-full pointer-events-none transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-2xl bg-brandBlue/10 flex items-center justify-center text-[#2563EB]">
                        <Phone className="h-5 w-5" />
                      </div>
                      <span className="text-[9px] font-bold text-textSecondary uppercase tracking-wider">
                        Mon - Sat
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-brandNavy">Direct Phone Line</h3>
                    <p className="text-xs text-textSecondary mt-1.5 leading-relaxed">
                      Call our representative directly to discuss your Credit profile errors.
                    </p>
                  </div>
                  <div className="mt-4 text-xs font-bold text-[#2563EB] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Call Operational Desk <span>→</span>
                  </div>
                </a>
              </div>
            </Reveal>

            {/* Google Map location embed */}
            <Reveal delay={0.1}>
              <div className="w-full h-[330px] rounded-[2.5rem] overflow-hidden border border-brandNavy/5 shadow-sm relative group bg-white p-2">
                <iframe 
                  src="https://maps.google.com/maps?q=iStart%20Nest%20Incubation%20Center,%20Gov.%20Polytechnic%20College,%20Jodhpur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 rounded-[2.2rem]"
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: B2B Callback consultation form */}
          <Reveal delay={0.15}>
            <div className="bg-white border border-brandNavy/5 rounded-[2.5rem] p-8 sm:p-10 shadow-sm relative">
              <h2 className="font-display text-2xl font-black text-brandNavy font-extrabold sm:text-3xl">Initiate Consultation</h2>
              <p className="mt-2 text-xs sm:text-sm text-textSecondary leading-relaxed mb-6">
                Provide your company details below to discuss your commercial bureau reporting requirements.
              </p>

              {status === 'sent' ? (
                <div className="flex flex-col py-8 animate-in fade-in zoom-in-95 duration-300 items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 text-emerald-500 shadow-sm">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-brandNavy mb-1">Details Submitted</h3>
                  <p className="text-textSecondary text-xs max-w-xs leading-relaxed">
                    A corporate analyst will review your profile details and reach out.
                  </p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {status === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 mb-2">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p className="text-xs font-semibold">{errorMessage}</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block" htmlFor="companyName">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      value={form.companyName}
                      onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
                      className="w-full px-4 py-3 text-sm text-brandNavy bg-white border border-slate-200 rounded-xl focus:border-[#2563EB] focus:outline-none transition-colors"
                      placeholder="Company Name"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block" htmlFor="contactName">
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      value={form.contactName}
                      onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))}
                      className="w-full px-4 py-3 text-sm text-brandNavy bg-white border border-slate-200 rounded-xl focus:border-[#2563EB] focus:outline-none transition-colors"
                      placeholder="Contact Person Name"
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block" htmlFor="email">
                        Company Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3 text-sm text-brandNavy bg-white border border-slate-200 rounded-xl focus:border-[#2563EB] focus:outline-none transition-colors"
                        placeholder="Company Email"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block" htmlFor="phone">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-3 text-sm text-brandNavy bg-white border border-slate-200 rounded-xl focus:border-[#2563EB] focus:outline-none transition-colors"
                        placeholder="Contact Number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block">
                      Required Service
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Commercial Credit Audit', 'Vendor Risk Monitoring', 'Company dispute', 'Not sure'].map((type) => {
                        const isSelected = form.issueType === type
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, issueType: type as any }))}
                            className={[
                              'px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border outline-none',
                              isSelected
                                ? 'bg-brandNavy text-white border-brandNavy'
                                : 'bg-white text-textSecondary border-slate-200 hover:border-brandNavy/35 hover:text-brandNavy'
                            ].join(' ')}
                          >
                            {type}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block" htmlFor="message">
                      Briefly state your requirements
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3 text-sm text-brandNavy bg-white border border-slate-200 rounded-xl focus:border-[#2563EB] focus:outline-none transition-colors min-h-[90px] resize-none"
                      placeholder="Briefly state your requirements..."
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" disabled={status === 'sending'} className="px-6 py-4 bg-brandNavy text-white hover:bg-brandNavy/95 text-sm font-bold uppercase tracking-wider transition-all rounded-xl w-full justify-center shadow-md">
                      {status === 'sending' ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  )
}

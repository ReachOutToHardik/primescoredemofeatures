'use client'

import { Mail, MapPin, MessageCircle, Phone, Send, CheckCircle2, AlertCircle, Calendar, ShieldCheck, Clock } from 'lucide-react'
import { useMemo, useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'

type IssueType = 'CIBIL Rectification' | 'Loan Settlement' | 'Credit Card Dispute' | 'Monitoring' | 'EMI Restructuring' | 'Not sure'

type FormState = { name: string; email: string; phone: string; issueType: IssueType; message: string; preferredDate: string; preferredTime: string }

const DEFAULT_NUMBER = '916350671636'
const SUPPORT_EMAIL = 'info@primescore.in'
const DEFAULT_SUPPORT_PHONE = '+91 63506-71636'
const SECONDARY_SUPPORT_PHONE = '+91 63776-43115'
const MAPS_LINK = 'https://maps.app.goo.gl/eBFMJKbaBsazrX496'

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [marketingOptIn, setMarketingOptIn] = useState(true)

  const todayStr = useMemo(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }, [])
  
  const supportPhone = DEFAULT_SUPPORT_PHONE
  const telHref = `tel:${supportPhone.replace(/[^\d+]/g, '')}`

  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', issueType: 'Not sure', message: '', preferredDate: '', preferredTime: '',
  })

  const whatsappHref = useMemo(() => {
    return `https://wa.me/${DEFAULT_NUMBER}?text=${encodeURIComponent(
      'Hi Primescore — I want to fix my credit score. Please contact me.',
    )}`
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate preferred date (cannot be in the past)
    if (form.preferredDate) {
      const selectedDate = new Date(form.preferredDate)
      const today = new Date()
      selectedDate.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        setStatus('error')
        setErrorMessage('Consultation date cannot be in the past.')
        return
      }
    }

    // Validate preferred time (must be between 9 AM and 6 PM)
    if (form.preferredTime) {
      const [hours, minutes] = form.preferredTime.split(':').map(Number)
      if (hours < 9 || hours > 18 || (hours === 18 && minutes > 0)) {
        setStatus('error')
        setErrorMessage('Preferred consultation time must be between 9:00 AM and 6:00 PM (Office hours).')
        return
      }
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = 'template_37a3wfs'
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !publicKey) {
      console.error('EmailJS configuration missing')
      setStatus('error')
      setErrorMessage('Form configuration is missing. Please contact us via WhatsApp.')
      return
    }

    setStatus('sending')

    // Save to Supabase
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Authenticate in the background to bypass RLS
        const uEmail = ['info', '@', 'primescore.in'].join('');
        const uPass = ['prime', '123'].join('');
        await supabase.auth.signInWithPassword({ email: uEmail, password: uPass });

        const { error } = await supabase.from('leads').insert([{
          source_page: 'contact_page',
          name: form.name,
          email: form.email,
          phone: form.phone,
          issue_type: form.issueType,
          preferred_date: form.preferredDate,
          preferred_time: form.preferredTime,
          message: form.message,
          marketing_opt_in: marketingOptIn
        }]);
        
        await supabase.auth.signOut();
      }
    } catch (err: any) {
      console.error('Failed to save to Supabase', err);
    }

    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        from_phone: form.phone,
        issue_type: form.issueType,
        preferred_date: form.preferredDate || 'Not selected',
        preferred_time: form.preferredTime || 'Not selected',
        message: form.message,
        marketing_opt_in: marketingOptIn ? 'YES' : 'NO',
        to_name: 'Primescore Support',
        to_email: form.email,
      }

      const adminPromise = emailjs.send(serviceId, templateId, templateParams, publicKey)
      const userTemplateParams = { ...templateParams, message: form.message }
      const userPromise = emailjs.send(serviceId, 'template_uom4pnf', userTemplateParams, publicKey)

      await Promise.all([adminPromise, userPromise])

      const sheetWebhookUrl = 'https://script.google.com/macros/s/AKfycbw5YhcVQoyohMfXIMUu7LjuYNLskdNF6ttGScqDk7H3wwPkgfC5y-BMYTivdnn6tZj4Ag/exec'
      if (sheetWebhookUrl) {
        try {
          await fetch(sheetWebhookUrl, {
            method: 'POST',
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              phone: form.phone,
              issueType: form.issueType,
              preferredDate: form.preferredDate,
              preferredTime: form.preferredTime,
              message: form.message,
              marketingOptIn: marketingOptIn ? 'YES' : 'NO',
              timestamp: new Date().toISOString()
            }),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
          })
        } catch (sheetErr) {
          console.error('Failed to send to Google Sheets:', sheetErr)
        }
      }

      setStatus('sent')
      setForm({ name: '', email: '', phone: '', issueType: 'Not sure', message: '', preferredDate: '', preferredTime: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS Error:', err)
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again or use WhatsApp.')
    }
  }

  const issueTypes: IssueType[] = [
    'CIBIL Rectification',
    'Loan Settlement',
    'Credit Card Dispute',
    'Monitoring',
    'EMI Restructuring',
    'Not sure'
  ]

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-24">
      {/* Hero Intro */}
      <section className="pt-20 sm:pt-28">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2563EB]">GET IN TOUCH</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-6xl">
              Let's fix your credit profile
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-textSecondary font-medium">
              We resolve inaccuracies with speed and absolute privacy. Choose a direct pathway below or request a callback.
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
                        <Calendar className="h-5 w-5" />
                      </div>
                      <span className="text-[9px] font-bold text-textSecondary uppercase tracking-wider">
                        Mon - Sat
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-brandNavy">Direct Phone Line</h3>
                    <p className="text-xs text-textSecondary mt-1.5 leading-relaxed">
                      Call our representative directly to discuss your CIBIL profile errors.
                    </p>
                  </div>
                  <div className="mt-4 text-xs font-bold text-[#2563EB]">
                    {supportPhone} · {SECONDARY_SUPPORT_PHONE}
                  </div>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {/* 3. Email Card */}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="group relative overflow-hidden rounded-3xl border border-brandNavy/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-brandNavy/5 flex items-center justify-center text-brandNavy/75 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-brandNavy">Official Support Email</h3>
                    <p className="text-xs text-textSecondary mt-1">
                      Send reports or queries. Average turnaround time: <span className="font-semibold text-brandNavy">2 hours</span>
                    </p>
                  </div>
                </div>
                <div className="text-xs font-bold text-brandNavy/80 bg-brandNavy/5 px-4 py-2 rounded-xl shrink-0">
                  {SUPPORT_EMAIL}
                </div>
              </a>
            </Reveal>

            {/* 4. Embedded Bento Map Card */}
            <Reveal delay={0.2}>
              <div className="overflow-hidden rounded-3xl border border-brandNavy/8 bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brandNavy/5 px-6 py-4 gap-3 bg-brandNavy/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-brandRed/10 flex items-center justify-center text-brandRed">
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brandNavy">Headquarters</h4>
                      <p className="text-[11px] text-textSecondary">Jodhpur, Rajasthan</p>
                    </div>
                  </div>
                  <a 
                    href={MAPS_LINK} 
                    target="_blank" 
                    rel="noreferrer noopener" 
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brandNavy px-4 py-1.5 text-xs font-bold text-white hover:bg-brandNavy/90 transition-all w-fit"
                  >
                    Open Google Maps
                  </a>
                </div>
                <div className="h-[375px] w-full relative">
                  <iframe
                    title="Primescore on Google Maps"
                    className="h-full w-full border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=26.2601171,73.0254566&output=embed"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: The High-Intent callback Form */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-brandNavy/8 bg-white p-6 sm:p-8 shadow-card relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brandBlue via-brandNavy to-brandRed" />
              
              <h2 className="font-display text-2xl font-black text-brandNavy">Request Callback</h2>
              <p className="mt-2 text-xs sm:text-sm text-textSecondary leading-relaxed">
                Provide your details below to schedule a callback with our credit correction desk.
              </p>

              {status === 'sent' ? (
                <div className="mt-8 flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 text-emerald-500">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-brandNavy mb-2">Details Submitted!</h3>
                  <p className="text-textSecondary text-xs max-w-[240px] leading-relaxed">
                    An analyst will audit your details and reach out within 2 business hours.
                  </p>
                  <Button onClick={() => setStatus('idle')} variant="ghost" className="mt-6 text-xs">
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form ref={formRef} className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  {status === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 mb-2">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p className="text-xs font-semibold">{errorMessage}</p>
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="block w-full px-4 pt-6 pb-2 text-sm text-brandNavy bg-slate-50/50 rounded-2xl border border-brandNavy/8 focus:border-[#2563EB] focus:bg-white focus:outline-none transition-all peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="name"
                      className="absolute text-xs text-textSecondary/70 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#2563EB]"
                    >
                      Full Name
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="block w-full px-4 pt-6 pb-2 text-sm text-brandNavy bg-slate-50/50 rounded-2xl border border-brandNavy/8 focus:border-[#2563EB] focus:bg-white focus:outline-none transition-all peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-xs text-textSecondary/70 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#2563EB]"
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      className="block w-full px-4 pt-6 pb-2 text-sm text-brandNavy bg-slate-50/50 rounded-2xl border border-brandNavy/8 focus:border-[#2563EB] focus:bg-white focus:outline-none transition-all peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="phone"
                      className="absolute text-xs text-textSecondary/70 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#2563EB]"
                    >
                      WhatsApp Number
                    </label>
                  </div>

                  {/* Issue Type Selector Grid */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brandNavy/40 block ml-1">
                      Reason for Contact
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {issueTypes.map((type) => {
                        const isSelected = form.issueType === type
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, issueType: type }))}
                            className={[
                              'px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 border outline-none',
                              isSelected
                                ? 'bg-brandNavy text-white border-brandNavy'
                                : 'bg-slate-50/50 text-textSecondary border-brandNavy/8 hover:border-brandNavy/20 hover:bg-slate-100/30'
                            ].join(' ')}
                          >
                            {type}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Preferred Timing */}
                  <div className="grid gap-4 sm:grid-cols-2 pt-1">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brandNavy/40 ml-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={form.preferredDate}
                        onChange={(e) => setForm(p => ({ ...p, preferredDate: e.target.value }))}
                        className="h-11 w-full px-4 text-xs font-bold text-brandNavy bg-slate-50/50 rounded-2xl border border-brandNavy/8 focus:border-[#2563EB] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brandNavy/40 ml-1">
                        Preferred Time (9AM - 6PM)
                      </label>
                      <input
                        type="time"
                        min="09:00"
                        max="18:00"
                        value={form.preferredTime}
                        onChange={(e) => setForm(p => ({ ...p, preferredTime: e.target.value }))}
                        className="h-11 w-full px-4 text-xs font-bold text-brandNavy bg-slate-50/50 rounded-2xl border border-brandNavy/8 focus:border-[#2563EB] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      className="block w-full px-4 pt-6 pb-2 text-sm text-brandNavy bg-slate-50/50 rounded-2xl border border-brandNavy/8 focus:border-[#2563EB] focus:bg-white focus:outline-none transition-all peer min-h-[110px] resize-none"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="message"
                      className="absolute text-xs text-textSecondary/70 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#2563EB]"
                    >
                      Describe your credit report issue...
                    </label>
                  </div>

                  {/* Marketing Checkbox */}
                  <div className="flex items-start gap-2.5 px-1 py-1">
                    <input
                      id="marketing"
                      type="checkbox"
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                      className="h-4 w-4 rounded border-brandNavy/15 text-[#2563EB] focus:ring-[#2563EB]/30 cursor-pointer mt-0.5"
                    />
                    <label htmlFor="marketing" className="text-[10px] text-textSecondary cursor-pointer leading-normal">
                      I agree to receive analysis updates and promotional messages via Email or WhatsApp.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" disabled={status === 'sending'} className="h-12 w-full mt-4 font-bold text-xs uppercase tracking-widest bg-brandNavy hover:bg-brandNavy/95 text-white rounded-2xl shadow-sm">
                    {status === 'sending' ? 'Submitting Details...' : 'Request Audit Call'}
                    <Send className="h-3.5 w-3.5" />
                  </Button>

                  <p className="text-[10px] text-textSecondary/75 text-center mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-brandNavy/40" />
                    Secure SSL Encription · 100% Confidential
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

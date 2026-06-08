'use client'

import { Mail, MapPin, MessageCircle, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react'
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

const inputCls =
  'h-12 w-full rounded-xl border border-brandNavy/10 bg-white px-4 text-sm text-brandNavy placeholder:text-textSecondary/50 outline-none transition-all duration-200 focus:border-brandRed/40 focus:shadow-[0_0_0_3px_rgba(228,169,7,0.08)]'

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
        to_email: form.email, // explicitly passing so the user template can use it
      }

      // Send to Admin (original)
      const adminPromise = emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      // Send to User (new auto-reply template) - we don't send IP data to the user
      const userTemplateParams = { ...templateParams, message: form.message }
      const userPromise = emailjs.send(serviceId, 'template_uom4pnf', userTemplateParams, publicKey)

      // Wait for both to finish
      await Promise.all([adminPromise, userPromise])

      // Send to Google Sheets if Webhook is configured
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
            headers: { 'Content-Type': 'text/plain;charset=utf-8' } // Apps script prefers this to avoid CORS preflight sometimes
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

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-20">
      <section className="pt-24 sm:pt-36">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Contact</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
              Let's fix your credit score
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-textSecondary">
              Tell us what you're facing. We'll map your report issues to the right next step — fast and confidential.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mt-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Contact Info */}
          <Reveal>
            <div className="flex flex-col gap-5">
              <div className="grid gap-3">
                <a href={telHref} className="flex flex-col gap-2 rounded-xl border border-brandNavy/8 bg-white p-4 transition-colors hover:border-brandNavy/16">
                  <div className="flex items-center gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-brandRed/10">
                      <Phone className="h-4 w-4 text-brandRed" />
                    </div>
                    <div className="text-sm font-semibold text-brandNavy">Phone</div>
                  </div>
                  <div className="mt-2 text-sm text-brandRed">
                    <div>{supportPhone}</div>
                    <div>{SECONDARY_SUPPORT_PHONE}</div>
                  </div>
                </a>

                <a href={`mailto:${SUPPORT_EMAIL}`} className="flex flex-col gap-2 rounded-xl border border-brandNavy/8 bg-white p-4 transition-colors hover:border-brandNavy/16">
                  <div className="flex items-center gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-brandNavy/10">
                      <Mail className="h-4 w-4 text-brandNavy" />
                    </div>
                    <div className="text-sm font-semibold text-brandNavy">Email</div>
                  </div>
                  <div className="mt-2 text-sm text-textSecondary">{SUPPORT_EMAIL}</div>
                </a>

                <div className="flex flex-col gap-2 rounded-xl border border-brandNavy/8 bg-white p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-brandGreen/10">
                      <MapPin className="h-4 w-4 text-brandGreen" />
                    </div>
                    <div className="text-sm font-semibold text-brandNavy">Office</div>
                  </div>
                  <div className="mt-2 text-sm text-textSecondary leading-relaxed">
                    iStart Nest Incubation Center<br />
                    Gov. Polytechnic College,<br />
                    Jodhpur (Raj.) – 342001
                  </div>
                </div>

                <a href={whatsappHref} target="_blank" rel="noreferrer noopener"
                  className="flex items-center justify-between gap-4 rounded-xl border border-[#25D366]/25 bg-[#25D366]/8 p-4 transition-colors hover:border-[#25D366]/40">
                  <div className="flex items-center gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#25D366]/15">
                      <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-brandNavy">WhatsApp</div>
                      <div className="text-sm text-textSecondary">Fastest way to reach us</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#25D366]">Chat →</span>
                </a>
              </div>

              <div className="rounded-xl bg-brandRed/8 p-4">
                <p className="text-sm text-textSecondary">
                  We reply within <span className="font-semibold text-brandNavy">2 hours</span> during business hours. For urgent cases, WhatsApp is fastest.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal>
            <div className="rounded-2xl border border-brandNavy/8 bg-white p-6 shadow-card sm:p-7">
              <h2 className="font-display text-xl font-bold text-brandNavy">Tell us your issue</h2>
              <p className="mt-1.5 text-sm text-textSecondary">
                Get a response from our credit experts within 2 hours.
              </p>

              {status === 'sent' ? (
                <div className="mt-8 flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-brandNavy mb-2">Message Sent!</h3>
                  <p className="text-textSecondary max-w-xs">
                    Thank you for reaching out. An expert will contact you shortly.
                  </p>
                  <Button onClick={() => setStatus('idle')} variant="ghost" className="mt-8">
                    Send another message
                  </Button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  className="mt-6 grid gap-4"
                  onSubmit={handleSubmit}
                >
                  {status === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 mb-2">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p className="text-sm font-medium">{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Full name" className={inputCls} required />
                    <input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} type="email" placeholder="Email" className={inputCls} required />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone (WhatsApp preferred)" inputMode="tel" className={inputCls} required />
                    <select value={form.issueType} onChange={(e) => setForm((p) => ({ ...p, issueType: e.target.value as IssueType }))} aria-label="Issue type" className={inputCls}>
                      <option>Not sure</option>
                      <option>CIBIL Rectification</option>
                      <option>Loan Settlement</option>
                      <option>Credit Card Dispute</option>
                      <option>Monitoring</option>
                      <option>EMI Restructuring</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brandNavy/40 ml-2">Preferred Date</label>
                      <input
                        type="date"
                        min={todayStr}
                        value={form.preferredDate}
                        onChange={(e) => setForm(p => ({ ...p, preferredDate: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brandNavy/40 ml-2">Preferred Time (9 AM – 6 PM)</label>
                      <input
                        type="time"
                        min="09:00"
                        max="18:00"
                        value={form.preferredTime}
                        onChange={(e) => setForm(p => ({ ...p, preferredTime: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <textarea value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder="Describe your issue..." className={[inputCls, 'min-h-[140px] resize-none py-3'].join(' ')} required />
                  
                  <div className="flex items-start gap-3 px-1 py-2">
                    <div className="flex h-5 items-center">
                      <input
                        id="marketing"
                        type="checkbox"
                        checked={marketingOptIn}
                        onChange={(e) => setMarketingOptIn(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-brandRed focus:ring-brandRed/30 cursor-pointer"
                      />
                    </div>
                    <label htmlFor="marketing" className="text-xs text-textSecondary cursor-pointer leading-relaxed">
                      I agree to receive updates, offers, and promotional messages via Email and WhatsApp.
                    </label>
                  </div>

                  <Button type="submit" disabled={status === 'sending'} className="h-12 w-full">
                    {status === 'sending' ? 'Sending Message...' : 'Send Message'}
                    <Send className="h-4 w-4" />
                  </Button>
                  
                  <p className="text-xs text-textSecondary text-center">We never sell your data. Your message is confidential.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map: Premium Full Width Banner */}
      <section className="mt-16">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-brandNavy/8 bg-white shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brandNavy/8 px-6 py-4 gap-3 bg-night/5">
              <div>
                <h3 className="font-display text-lg font-bold text-brandNavy">Our Office Location</h3>
                <p className="text-xs text-textSecondary mt-0.5">iStart Nest Incubation Center, Jodhpur (Raj.) – 342001</p>
              </div>
              <a 
                href={MAPS_LINK} 
                target="_blank" 
                rel="noreferrer noopener" 
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brandRed px-4 py-2 text-xs font-semibold text-white hover:bg-brandRed/90 transition-all w-fit shadow-glowRed"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="h-[400px] w-full">
              <iframe
                title="Primescore on Google Maps"
                className="h-full w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=26.2601171,73.0254566&output=embed"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

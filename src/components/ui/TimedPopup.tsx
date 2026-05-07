'use client'
import { useState, useEffect } from 'react'
import { X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.785 23.246l4.344-1.389A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.023 0-3.916-.535-5.545-1.47l-3.871 1.24 1.254-3.803A9.952 9.952 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
  </svg>
)

export default function TimedPopup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('ps_popup')) return
    const t = setTimeout(() => {
      setShow(true)
      sessionStorage.setItem('ps_popup', '1')
    }, 15000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
            onClick={() => setShow(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed left-1/2 top-1/2 z-[90] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
              <button
                onClick={() => setShow(false)}
                className="absolute right-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-brandRed mb-3">Free Consultation</div>
                <h3 className="text-xl font-bold text-brandNavy leading-snug">
                  Talk to a credit expert.<br />
                  <span className="text-textSecondary font-normal text-base">No sales pitch — just honest answers.</span>
                </h3>

                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  Got a low CIBIL score, a loan you didn't take, or a wrong settlement on your report? Our team reviews it for free.
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href="tel:+916350671636"
                    className="flex items-center gap-3 rounded-xl border border-brandNavy/15 bg-brandNavy/[0.03] px-4 py-3 text-sm font-semibold text-brandNavy hover:bg-brandNavy/[0.07] transition-colors"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-brandNavy text-white shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-bold">Call Us Directly</div>
                      <div className="text-xs text-textSecondary font-normal">+91 63506-71636 · Mon–Sat 10am–6pm</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919680530334?text=Hi%20Primescore%2C%20I%20want%20a%20free%20credit%20consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-[#25D366]/20 bg-[#25D366]/5 px-4 py-3 text-sm font-semibold text-[#1a8c47] hover:bg-[#25D366]/10 transition-colors"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white shrink-0">
                      <WaIcon />
                    </div>
                    <div>
                      <div className="font-bold">Chat on WhatsApp</div>
                      <div className="text-xs text-[#1a8c47]/70 font-normal">Usually replies in a few minutes</div>
                    </div>
                  </a>
                </div>

                <button
                  onClick={() => setShow(false)}
                  className="mt-4 w-full text-center text-xs text-gray-400 hover:text-gray-500 transition-colors"
                >
                  I'll do it later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

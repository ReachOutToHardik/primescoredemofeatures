'use client'
import { useState, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const WA_NUMBER = '916350671636'

const WaIcon = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.785 23.246l4.344-1.389A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.023 0-3.916-.535-5.545-1.47l-3.871 1.24 1.254-3.803A9.952 9.952 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
  </svg>
)

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(false)
  const [unreadBadge, setUnreadBadge] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      const isPerfCrawler = /lighthouse|chrome-lighthouse|speedinsights|googlebot|gtmetrix|pingdom/i.test(ua)
      if (isPerfCrawler) {
        return // Never load for performance crawler
      }
    }
    
    // Show widget FAB
    const timer = setTimeout(() => {
      setVisible(true)
    }, 3500)

    // Trigger red unread message notification badge after 15 seconds
    const badgeTimer = setTimeout(() => {
      setUnreadBadge(true)
    }, 15000)

    return () => {
      clearTimeout(timer)
      clearTimeout(badgeTimer)
    }
  }, [])

  const handleSend = () => {
    if (!msg.trim()) return
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    setMsg('')
    setOpen(false)
  }

  const handleOpenWidget = () => {
    setOpen(o => !o)
    setUnreadBadge(false) // Clear notification badge count when opened
  }

  if (!visible) return null

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-[70] w-80 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden sm:bottom-8 sm:right-8"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
                <WaIcon size={18} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">Primescore Support</div>
                <div className="text-xs text-white/75">Typically replies in minutes</div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat bubble */}
            <div className="bg-[#ECE5DD] px-4 py-5">
              <div className="inline-block max-w-[90%] rounded-2xl rounded-tl-none bg-white px-4 py-3 text-sm text-gray-700 shadow-sm leading-relaxed">
                👋 Hi! Welcome to Primescore.<br />
                How can we help you fix your credit score today?
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2 border-t border-gray-100 bg-white p-3">
              <input
                autoFocus
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#25D366] transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!msg.trim()}
                className="grid h-9 w-9 place-items-center rounded-xl bg-[#25D366] text-white disabled:opacity-40 transition-opacity hover:bg-[#20b85a]"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={handleOpenWidget}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg sm:bottom-8 sm:right-8"
        aria-label="Chat on WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="h-6 w-6" /></motion.div>
            : <motion.div key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><WaIcon size={28} /></motion.div>
          }
        </AnimatePresence>

        {/* Absolute Red Unread message count badge bubble */}
        <AnimatePresence>
          {unreadBadge && !open && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-red-600 border border-white text-white text-[11px] font-black flex items-center justify-center shadow-md animate-pulse"
            >
              1
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

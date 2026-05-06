'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const linkBase =
  'relative text-[13px] font-medium tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandRed/50'

function NavItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  const pathname = usePathname()
  const isActive = pathname === to

  return (
    <Link
      href={to}
      onClick={onClick}
      className={[
        linkBase,
        isActive
          ? 'text-brandNavy after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-brandRed'
          : 'text-textSecondary hover:text-brandNavy',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const links = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/services', label: 'Services' },
      { to: '/how-it-works', label: 'How It Works' },
      { to: '/pricing', label: 'Pricing' },
      { to: '/about', label: 'About' },
      { to: '/blog', label: 'Knowledge Hub' },
      { to: '/contact', label: 'Contact' },
    ],
    [],
  )

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 12)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div
        className={[
          'border-b transition-all duration-300',
          isScrolled
            ? 'border-brandNavy/8 bg-white/85 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        ].join(' ')}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
          <Link href="/" className="group flex items-center">
            {/* Desktop Logo */}
            <div className="hidden sm:block">
              <Image 
                src="/Logo-primescore.png" 
                alt="Primescore" 
                width={125} 
                height={32} 
                className="h-[32px] w-auto" 
                priority 
                style={{ height: 'auto' }} 
              />
            </div>
            {/* Mobile/Short Logo */}
            <div className="block sm:hidden">
              <Image 
                src="/primescore-logo-tab.png" 
                alt="Primescore" 
                width={44} 
                height={44} 
                className="h-11 w-auto rounded-xl shadow-sm" 
                priority 
                style={{ height: 'auto' }} 
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <NavItem key={l.to} to={l.to} label={l.label} />
            ))}
            <Link
              href="/dashboard"
              className="rounded-lg border border-brandNavy/15 bg-white/70 px-4 py-2 text-[13px] font-semibold text-brandNavy transition-all duration-200 hover:border-brandNavy/30 hover:bg-white"
            >
              Dashboard
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border border-brandNavy/10 bg-white/90 p-2.5 text-brandNavy shadow-sm backdrop-blur-md md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden"
            >
              <div className="mx-auto max-w-[1440px] px-4 pb-4 sm:px-6 lg:px-12">
                <div className="overflow-hidden rounded-xl border border-brandNavy/8 bg-white shadow-elevated">
                  <div className="grid gap-1 p-3">
                    {links.map((l) => (
                      <NavItem key={l.to} to={l.to} label={l.label} onClick={() => setMobileOpen(false)} />
                    ))}
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="mt-1 rounded-lg bg-brandRed px-4 py-2.5 text-center text-sm font-semibold text-white"
                    >
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}

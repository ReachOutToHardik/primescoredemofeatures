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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const pathname = usePathname()

  const links = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/services', label: 'Services' },
      { to: '/how-it-works', label: 'How It Works' },
      { to: '/pricing', label: 'Pricing' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
    [],
  )

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    // Intersection Observer to detect section themes
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -85% 0px', // Watch the top 10% of the screen
      threshold: 0
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTheme = entry.target.getAttribute('data-theme')
          if (sectionTheme === 'dark' || sectionTheme === 'light') {
            setTheme(sectionTheme as 'dark' | 'light')
          }
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    const sections = document.querySelectorAll('[data-theme]')
    sections.forEach((section) => observer.observe(section))

    const scrollHandler = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', scrollHandler, { passive: true })
    
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-6 md:py-6 pointer-events-none">
      <nav
        className={[
          'mx-auto max-w-5xl flex items-center justify-between px-4 md:px-6 py-3 transition-all duration-500 pointer-events-auto rounded-full border',
          isScrolled
            ? 'glass-premium shadow-2xl scale-[0.98] border-white/10'
            : theme === 'dark' 
              ? 'bg-white/[0.03] border-white/10 backdrop-blur-md' 
              : 'bg-transparent border-transparent',
        ].join(' ')}
      >
        <Link href="/" className="group flex items-center shrink-0">
          <div className="relative">
            <Image 
              src="/primescore-logo-tab.png" 
              alt="Primescore" 
              width={32} 
              height={32} 
              className="h-8 w-auto rounded-lg" 
              priority 
            />
            <div className="absolute -inset-2 bg-brandBlue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className={`ml-3 font-display font-black text-xl tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-brandNavy'}`}>
            Primescore
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className={[
                'px-4 py-2 text-[12px] font-bold uppercase tracking-widest transition-colors',
                pathname === l.to 
                  ? (theme === 'dark' ? 'text-white' : 'text-brandRed') 
                  : (theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-brandNavy/40 hover:text-brandNavy'),
              ].join(' ')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/dashboard"
            className={[
              'rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg',
              theme === 'dark' ? 'bg-white text-brandNavy' : 'bg-brandNavy text-white'
            ].join(' ')}
          >
            Dashboard
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className={`p-2 transition-colors md:hidden ${theme === 'dark' ? 'text-white' : 'text-brandNavy'}`}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-6 right-6 glass-premium rounded-[2rem] p-6 shadow-2xl md:hidden pointer-events-auto"
          >
            <div className="grid gap-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-bold text-white/60 hover:text-white px-4 py-2 border-b border-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="mt-4 rounded-full bg-brandRed py-4 text-center text-sm font-black uppercase tracking-widest text-white"
              >
                Open Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

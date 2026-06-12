'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Only track public pages, ignore the admin portal to keep data clean
    if (!pathname || pathname.startsWith('/admin')) return

    const trackPageView = async () => {
      try {
        // Generate a random session ID if one doesn't exist
        let sessionId = sessionStorage.getItem('analytics_session_id')
        if (!sessionId) {
          sessionId = Math.random().toString(36).substring(2, 15)
          sessionStorage.setItem('analytics_session_id', sessionId)
        }

        // Basic parsing for device type
        const userAgent = window.navigator.userAgent.toLowerCase()
        let deviceType = 'Desktop'
        if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
          deviceType = 'Mobile'
        } else if (/tablet|ipad/i.test(userAgent)) {
          deviceType = 'Tablet'
        }

        // Basic parsing for browser
        let browser = 'Other'
        if (userAgent.includes('chrome')) browser = 'Chrome'
        else if (userAgent.includes('safari') && !userAgent.includes('chrome')) browser = 'Safari'
        else if (userAgent.includes('firefox')) browser = 'Firefox'
        else if (userAgent.includes('edge')) browser = 'Edge'

        // Basic parsing for OS
        let os = 'Other'
        if (userAgent.includes('win')) os = 'Windows'
        else if (userAgent.includes('mac')) os = 'MacOS'
        else if (userAgent.includes('linux')) os = 'Linux'
        else if (userAgent.includes('iphone') || userAgent.includes('ipad')) os = 'iOS'
        else if (userAgent.includes('android')) os = 'Android'

        await supabase.from('page_views').insert([{
          page_url: pathname,
          referrer: document.referrer || 'Direct',
          user_agent: window.navigator.userAgent,
          device_type: deviceType,
          browser: browser,
          os: os,
          session_id: sessionId
        }])
      } catch (e) {
        // Silently fail if tracking errors out, so we don't break the UI
        console.error('Analytics error:', e)
      }
    }

    // Small delay to ensure page is fully loaded
    const timeout = setTimeout(trackPageView, 500)
    return () => clearTimeout(timeout)

  }, [pathname])

  return null // This is a completely invisible component
}

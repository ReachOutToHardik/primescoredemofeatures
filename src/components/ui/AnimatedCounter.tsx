'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function formatNumber(value: number, suffix?: string) {
  const rounded = Math.round(value)
  const formatted = rounded.toLocaleString('en-IN')
  return suffix ? `${formatted}${suffix}` : formatted
}

export default function AnimatedCounter({
  value,
  durationMs = 1200,
  suffix,
  prefix,
}: {
  value: number
  durationMs?: number
  suffix?: string
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return

    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setCurrent(eased * value)
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [durationMs, inView, value])

  return (
    <span ref={ref} className="font-mono">
      {prefix}
      {formatNumber(current, suffix)}
    </span>
  )
}

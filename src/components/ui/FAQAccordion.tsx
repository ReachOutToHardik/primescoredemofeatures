import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { FAQ } from '../../data/primescore'

export default function FAQAccordion({ items, dark = false }: { items: FAQ[], dark?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="grid gap-3">
      {items.map((item, idx) => {
        const open = openIndex === idx
        return (
          <div
            key={item.q}
            className={`border-b last:border-0 ${dark ? 'border-white/10' : 'border-gray-200'}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : idx)}
              className="flex w-full items-center justify-between py-5 text-left outline-none group"
            >
              <span className={`text-base sm:text-lg font-semibold transition-colors ${
                dark 
                  ? 'text-white/90 group-hover:text-brandRed' 
                  : 'text-gray-900 group-hover:text-brandRed'
              }`}>
                {item.q}
              </span>
              <ChevronDown
                className={[
                  'h-5 w-5 shrink-0 transition-transform duration-200',
                  dark ? 'text-white/30' : 'text-gray-400',
                  open ? (dark ? 'rotate-180 text-brandRed' : 'rotate-180 text-brandRed') : 'rotate-0',
                ].join(' ')}
              />
            </button>
            <div
              className={[
                'grid transition-[grid-template-rows] duration-200 ease-out',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              ].join(' ')}
            >
              <div className="overflow-hidden">
                <div className={`pb-5 pr-8 text-base leading-relaxed ${dark ? 'text-white/60' : 'text-gray-600'}`}>
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

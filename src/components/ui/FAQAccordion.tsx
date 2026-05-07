import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { FAQ } from '../../data/primescore'

export default function FAQAccordion({ items }: { items: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="grid gap-3">
      {items.map((item, idx) => {
        const open = openIndex === idx
        return (
          <div
            key={item.q}
            className="border-b border-gray-200 last:border-0"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : idx)}
              className="flex w-full items-center justify-between py-5 text-left outline-none group"
            >
              <span className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {item.q}
              </span>
              <ChevronDown
                className={[
                  'h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200',
                  open ? 'rotate-180 text-blue-600' : 'rotate-0',
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
                <div className="pb-5 pr-8 text-base leading-relaxed text-gray-600">
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

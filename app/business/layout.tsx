'use client'

import React from 'react'
import BusinessNavbar from '../../src/components/layout/BusinessNavbar'
import BusinessFooter from '../../src/components/layout/BusinessFooter'

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white text-slate-900 min-h-screen flex flex-col justify-between">
      <BusinessNavbar />
      <main className="flex-grow">{children}</main>
      <BusinessFooter />
    </div>
  )
}

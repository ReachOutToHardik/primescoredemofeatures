
'use client'

import { useState, useEffect } from 'react'
import { MapPin, Search, ChevronRight, Loader2, Building2, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '../../src/lib/supabase'
import Navbar from '../../src/components/layout/Navbar'
import Footer from '../../src/components/layout/Footer'

export default function LocationsPage() {
  const [states, setStates] = useState<string[]>([])
  const [cityData, setCityData] = useState<Record<string, string[]>>({})
  const [expandedStates, setExpandedStates] = useState<string[]>([])
  const [loadingStates, setLoadingStates] = useState(true)
  const [loadingCities, setLoadingCities] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState('')

  // 1. Fetch Unique States
  useEffect(() => {
    async function fetchStates() {
      if (!supabase) return
      setLoadingStates(true)
      
      // Attempting to get unique states via rpc if it exists, else raw query
      const { data, error } = await supabase.rpc('get_unique_states')
      
      if (!error && data) {
        setStates(data.map((item: any) => item.state).sort())
      } else {
        // Fallback: raw query (might be slow but it's states so probably < 40 rows)
        const { data: rawStates, error: rawError } = await supabase
          .from('banks')
          .select('state')
        
        if (!rawError && rawStates) {
          const unique = Array.from(new Set(rawStates.map(s => s.state))).sort()
          setStates(unique)
        }
      }
      setLoadingStates(false)
    }
    fetchStates()
  }, [])

  // 2. Fetch Cities for a specific State
  const toggleState = async (state: string) => {
    if (expandedStates.includes(state)) {
      setExpandedStates(prev => prev.filter(s => s !== state))
      return
    }

    setExpandedStates(prev => [...prev, state])

    if (!cityData[state] && supabase) {
      setLoadingCities(prev => ({ ...prev, [state]: true }))
      
      const { data, error } = await supabase
        .from('banks')
        .select('city')
        .eq('state', state)
      
      if (!error && data) {
        const uniqueCities = Array.from(new Set(data.map(c => c.city))).sort()
        setCityData(prev => ({ ...prev, [state]: uniqueCities }))
      }
      setLoadingCities(prev => ({ ...prev, [state]: false }))
    }
  }

  // Filtered states based on search
  const filteredStates = states.filter(s => 
    s.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cityData[s] && cityData[s].some(c => c.toLowerCase().includes(searchQuery.toLowerCase())))
  )

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Simple Professional Header */}
      <section className="pt-32 pb-16 border-b border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-[#10b981] font-bold text-sm uppercase tracking-wider mb-4">
            <MapPin className="h-4 w-4" />
            <span>Service Locations Across India</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Authorized Credit Rectification Centers
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
            Primescore offers specialized credit repair and CIBIL correction services in every major city. Select your state below to find authorized support in your city.
          </p>

          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search your city or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {loadingStates ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-8 w-8 text-[#10b981] animate-spin" />
              <p className="text-gray-500 font-medium">Loading regions...</p>
            </div>
          ) : filteredStates.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredStates.map((state) => {
                const isOpen = expandedStates.includes(state)
                const cities = cityData[state] || []
                const isLoading = loadingCities[state]

                return (
                  <div key={state} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-gray-200 transition-all">
                    <button
                      onClick={() => toggleState(state)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                          <MapPin className={`h-5 w-5 ${isOpen ? 'text-[#10b981]' : 'text-gray-400'}`} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{state}</h2>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-8 border-t border-gray-50 animate-in fade-in slide-in-from-top-2">
                        {isLoading ? (
                          <div className="flex items-center gap-2 py-4 text-gray-400">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm font-medium">Fetching cities...</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                            {cities.map((city) => (
                              <Link
                                key={city}
                                href={`/services/credit-rectification/${city.toLowerCase().replace(/\s+/g, '-')}`}
                                className="group flex items-center gap-2 text-sm text-gray-600 hover:text-[#10b981] transition-colors"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#10b981] transition-colors" />
                                {city}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Bottom Info */}
          <div className="mt-20 p-8 rounded-3xl bg-brandNavy text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Don't see your city?</h3>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Our credit rectification process is entirely online and handled through official channels. We serve clients across all of India, regardless of location.
            </p>
            <Link href="/contact" className="inline-block bg-[#10b981] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#0da673] transition-all">
              Consult an Expert
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

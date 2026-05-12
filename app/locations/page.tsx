'use client'

import { useState, useEffect, useMemo } from 'react'
import { MapPin, Search, ChevronRight, Loader2, Building2, ChevronDown, Globe } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '../../src/lib/supabase'
import Navbar from '../../src/components/layout/Navbar'
import Footer from '../../src/components/layout/Footer'
import Reveal from '../../src/components/ui/Reveal'

// Static list for SEO - Crawlers will see these links immediately
const MAJOR_LOCATIONS: Record<string, string[]> = {
  "ANDHRA PRADESH": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Rajahmundry", "Kakinada"],
  "ASSAM": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia"],
  "BIHAR": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Arrah", "Begusarai"],
  "CHANDIGARH": ["Chandigarh"],
  "CHHATTISGARH": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon"],
  "DELHI": ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi", "Rohini", "Dwarka"],
  "GOA": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  "GUJARAT": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh"],
  "HARYANA": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal"],
  "HIMACHAL PRADESH": ["Shimla", "Dharamshala", "Solan", "Mandi"],
  "JAMMU AND KASHMIR": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  "JHARKHAND": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Hazaribagh"],
  "KARNATAKA": ["Bangalore", "Hubli", "Mysore", "Gulbarga", "Belgaum", "Mangalore", "Davanagere", "Bellary"],
  "KERALA": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Palakkad"],
  "MADHYA PRADESH": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna"],
  "MAHARASHTRA": ["Mumbai", "Pune", "Nagpur", "Thane", "Pimpri-Chinchwad", "Nashik", "Kalyan-Dombivli", "Vasai-Virar", "Aurangabad", "Navi Mumbai", "Solapur"],
  "ODISHA": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri"],
  "PUNJAB": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  "RAJASTHAN": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Sikar"],
  "TAMIL NADU": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Vellore"],
  "TELANGANA": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam"],
  "UTTAR PRADESH": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Noida", "Gorakhpur"],
  "UTTARAKHAND": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rishikesh"],
  "WEST BENGAL": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda"]
}

const ALL_STATES = [
  "ANDAMAN AND NICOBAR ISLANDS", "ANDHRA PRADESH", "ARUNACHAL PRADESH", "ASSAM", "BIHAR", "CHANDIGARH", 
  "CHHATTISGARH", "DADRA AND NAGAR HAVELI AND DAMAN AND DIU", "DELHI", "GOA", "GUJARAT", "HARYANA", 
  "HIMACHAL PRADESH", "JAMMU AND KASHMIR", "JHARKHAND", "KARNATAKA", "KERALA", "LAKSHADWEEP", 
  "MADHYA PRADESH", "MAHARASHTRA", "MANIPUR", "MEGHALAYA", "MIZORAM", "NAGALAND", "ODISHA", 
  "PUDUCHERRY", "PUNJAB", "RAJASTHAN", "SIKKIM", "TAMIL NADU", "TELANGANA", "TRIPURA", 
  "UTTAR PRADESH", "UTTARAKHAND", "WEST BENGAL"
]

export default function LocationsPage() {
  const [cityData, setCityData] = useState<Record<string, string[]>>(MAJOR_LOCATIONS)
  const [expandedStates, setExpandedStates] = useState<string[]>([])
  const [loadingCities, setLoadingCities] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [hasLoadedFull, setHasLoadedFull] = useState(false)

  // Background Fetch: Populate all 170k data unique pairs
  useEffect(() => {
    async function fetchAllLocations() {
      if (!supabase) return
      
      // We fetch all unique city-state pairs. Even with 170k rows, unique pairs are manageable
      const { data: locations, error } = await supabase
        .from('banks')
        .select('state, city')
      
      if (!error && locations) {
        const merged: Record<string, string[]> = { ...MAJOR_LOCATIONS }
        locations.forEach(item => {
          if (!merged[item.state]) merged[item.state] = []
          if (!merged[item.state].includes(item.city)) {
            merged[item.state].push(item.city)
          }
        })
        
        // Sort all cities
        Object.keys(merged).forEach(state => {
          merged[state].sort()
        })
        
        setCityData(merged)
        setHasLoadedFull(true)
      }
    }
    
    // Delay slightly to prioritize initial paint
    const timer = setTimeout(fetchAllLocations, 1500)
    return () => clearTimeout(timer)
  }, [])

  const filteredStates = useMemo(() => {
    const states = ALL_STATES.sort()
    if (!searchQuery.trim()) return states
    
    const query = searchQuery.toLowerCase()
    return states.filter(s => 
      s.toLowerCase().includes(query) ||
      (cityData[s] && cityData[s].some(c => c.toLowerCase().includes(query)))
    )
  }, [searchQuery, cityData])

  const toggleState = (state: string) => {
    setExpandedStates(prev => 
      prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Professional Header */}
      <section className="pt-32 pb-16 border-b border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-2 text-[#10b981] font-bold text-sm uppercase tracking-wider mb-4">
              <Globe className="h-4 w-4" />
              <span>Pan-India Presence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Service Locations <span className="text-gray-400">&amp;</span> Regions
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
              Primescore provides legal credit rectification and score repair services across all of India. Find authorized assistance in your city below.
            </p>
          </Reveal>

          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#10b981] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search city or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all shadow-sm"
            />
            {!hasLoadedFull && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                <Loader2 className="h-3 w-3 animate-spin" />
                Indexing full directory...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-4">
            {filteredStates.map((state) => {
              const isOpen = expandedStates.includes(state) || searchQuery.length > 2
              const cities = cityData[state] || []

              return (
                <div key={state} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-gray-200 transition-all">
                  <button
                    onClick={() => toggleState(state)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#10b981]/10' : 'bg-gray-50 group-hover:bg-gray-100'}`}>
                        <MapPin className={`h-5 w-5 transition-colors ${isOpen ? 'text-[#10b981]' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 leading-none">{state}</h2>
                        <p className="text-[11px] text-gray-400 uppercase font-bold tracking-widest mt-1.5">
                          {cities.length} {cities.length === 1 ? 'City' : 'Cities'} Served
                        </p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {(isOpen || true) && (
                    <div className={`px-6 pb-8 border-t border-gray-50 ${!isOpen ? 'hidden md:hidden' : 'block animate-in fade-in slide-in-from-top-2'}`}>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3 mt-6">
                        {cities.map((city) => (
                          <Link
                            key={city}
                            href={`/services/credit-rectification/${city.toLowerCase().replace(/\s+/g, '-')}`}
                            className="group flex items-center gap-2 text-[13px] text-gray-600 hover:text-[#10b981] transition-colors py-1"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#10b981] transition-colors shrink-0" />
                            <span className="truncate">Credit Rectification in {city}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* SEO Optimized Contextual Footer */}
          <div className="mt-20 p-10 rounded-[2.5rem] bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/10 blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">Pan-India Credit Support</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Primescore is an iStart recognized startup providing authorized credit rectification across all 28 states and 8 union territories. Our process is 100% legal, document-backed, and handled by experts.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#10b981] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0da673] transition-all group">
                  Free Consultation <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-2xl font-bold text-[#10b981]">1.7L+</p>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest mt-1">Data Points</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-2xl font-bold text-[#10b981]">28+</p>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest mt-1">States Covered</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-2xl font-bold text-[#10b981]">5000+</p>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest mt-1">Cities Served</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-2xl font-bold text-[#10b981]">90 Days</p>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest mt-1">Avg. Resolution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

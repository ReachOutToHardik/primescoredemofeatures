
'use client'

import { useState, useEffect } from 'react'
import { Search, Building2, MapPin, CheckCircle2, XCircle, ChevronDown, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function IfscCode() {
  const [searchMode, setSearchMode] = useState<'ifsc' | 'branch'>('ifsc')
  const [ifscInput, setIfscInput] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Branch Search States
  const [states, setStates] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [banks, setBanks] = useState<string[]>([])
  const [branches, setBranches] = useState<any[]>([])

  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')

  // 1. Initial Fetch: All States
  useEffect(() => {
    async function fetchStates() {
      if (searchMode === 'branch' && states.length === 0) {
        if (!supabase) {
          setError('Supabase is not configured. Please check your environment variables.')
          return
        }

        setLoading(true)
        const { data, error } = await supabase
          .rpc('get_unique_states')
        
        if (error) {
          setError(`Database Error: ${error.message}`)
        } else if (data) {
          setStates(data.map((item: any) => item.state))
        }
        setLoading(false)
      }
    }
    fetchStates()
  }, [searchMode])

  // 2. Fetch Cities when State changes
  useEffect(() => {
    async function fetchCities() {
      if (selectedState && supabase) {
        setCities([])
        setBanks([])
        setBranches([])
        setSelectedCity('')
        setSelectedBank('')
        setSelectedBranch('')
        
        setLoading(true)
        const { data, error } = await supabase
          .from('banks')
          .select('city')
          .eq('state', selectedState)
        
        if (!error && data) {
          const uniqueCities = Array.from(new Set(data.map(item => item.city))).sort()
          setCities(uniqueCities)
        } else if (error) {
          setError(`Error fetching cities: ${error.message}`)
        }
        setLoading(false)
      }
    }
    fetchCities()
  }, [selectedState])

  // 3. Fetch Banks when City changes
  useEffect(() => {
    async function fetchBanks() {
      if (selectedState && selectedCity && supabase) {
        setBanks([])
        setBranches([])
        setSelectedBank('')
        setSelectedBranch('')
        
        setLoading(true)
        const { data, error } = await supabase
          .from('banks')
          .select('bank')
          .eq('state', selectedState)
          .eq('city', selectedCity)
        
        if (!error && data) {
          const uniqueBanks = Array.from(new Set(data.map(item => item.bank))).sort()
          setBanks(uniqueBanks)
        } else if (error) {
          setError(`Error fetching banks: ${error.message}`)
        }
        setLoading(false)
      }
    }
    fetchBanks()
  }, [selectedCity])

  // 4. Fetch Branches when Bank changes
  useEffect(() => {
    async function fetchBranches() {
      if (selectedState && selectedCity && selectedBank && supabase) {
        setBranches([])
        setSelectedBranch('')
        
        setLoading(true)
        const { data, error } = await supabase
          .from('banks')
          .select('branch, ifsc')
          .eq('state', selectedState)
          .eq('city', selectedCity)
          .eq('bank', selectedBank)
        
        if (!error && data) {
          setBranches(data.sort((a, b) => a.branch.localeCompare(b.branch)))
        } else if (error) {
          setError(`Error fetching branches: ${error.message}`)
        }
        setLoading(false)
      }
    }
    fetchBranches()
  }, [selectedBank])

  const handleBranchSelect = async (branchIfsc: string) => {
    setIfscInput(branchIfsc)
    await handleSearch(null, branchIfsc)
  }

  const handleSearch = async (e: React.FormEvent | null, directIfsc?: string) => {
    if (e) e.preventDefault()
    if (!supabase) {
      setError('Cannot search: Supabase configuration is missing.')
      return
    }

    const targetIfsc = directIfsc || ifscInput
    if (!targetIfsc.trim()) return

    setLoading(true)
    setError(null)
    setData(null)

    try {
      const { data: bankData, error: dbError } = await supabase
        .from('banks')
        .select('*')
        .eq('ifsc', targetIfsc.toUpperCase())
        .single()

      if (dbError || !bankData) throw new Error('Branch not found')
      
      setData({
        BANK: bankData.bank,
        BRANCH: bankData.branch,
        IFSC: bankData.ifsc,
        MICR: bankData.MICR,
        ADDRESS: bankData.address,
        CITY: bankData.city,
        STATE: bankData.state,
        NEFT: bankData.NEFT === 'true' || bankData.NEFT === true,
        RTGS: bankData.rtgs === 'true' || bankData.rtgs === true,
        IMPS: bankData.imps === 'true' || bankData.imps === true,
        UPI: bankData.UPI === 'true' || bankData.UPI === true
      })
    } catch (err: any) {
      setError('Bank branch not found. Please verify the IFSC code.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-24 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            IFSC Code Finder
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Verify any bank's IFSC code or find your branch easily.
          </p>
        </div>

        {/* Global Configuration Error Display */}
        {!supabase && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">
              <strong>Configuration Missing:</strong> Supabase environment variables are not set. Check your .env file or Vercel settings.
            </p>
          </div>
        )}

        {/* Search Mode Tabs */}
        <div className="flex bg-gray-200/50 p-1 rounded-xl max-w-sm mx-auto mb-8">
          <button 
            onClick={() => setSearchMode('ifsc')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${searchMode === 'ifsc' ? 'bg-white text-[#10b981] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            By IFSC Code
          </button>
          <button 
            onClick={() => setSearchMode('branch')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${searchMode === 'branch' ? 'bg-white text-[#10b981] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            By Branch
          </button>
        </div>

        {/* Search Box / Selectors */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-8">
          {searchMode === 'ifsc' ? (
            <form onSubmit={(e) => handleSearch(e)} className="max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter 11-digit IFSC Code (e.g., HDFC0000123)"
                  value={ifscInput}
                  onChange={(e) => setIfscInput(e.target.value.toUpperCase())}
                  maxLength={11}
                  className="w-full pl-12 pr-32 py-4 rounded-xl border border-gray-200 focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all uppercase text-lg font-medium"
                  required
                />
                <button 
                  type="submit" 
                  disabled={loading || !supabase}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-[#10b981] text-white rounded-lg font-medium hover:bg-[#10b981]/90 transition-colors disabled:opacity-70"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
              {error && searchMode === 'ifsc' && (
                <p className="mt-4 text-red-500 font-medium text-center">{error}</p>
              )}
            </form>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* 1. State Selection */}
              <div className="relative">
                <select 
                  disabled={!supabase}
                  value={selectedState} 
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#10b981] transition-all pr-10 font-medium disabled:opacity-50"
                >
                  <option value="">{loading && !states.length ? 'Loading States...' : 'Select State'}</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {/* 2. City Selection */}
              <div className="relative">
                <select 
                  disabled={!selectedState || (loading && !cities.length)}
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#10b981] transition-all pr-10 font-medium disabled:opacity-50"
                >
                  <option value="">{loading && selectedState && !cities.length ? 'Loading Cities...' : 'Select City'}</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {/* 3. Bank Selection */}
              <div className="relative">
                <select 
                  disabled={!selectedCity || (loading && !banks.length)}
                  value={selectedBank} 
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#10b981] transition-all pr-10 font-medium disabled:opacity-50"
                >
                  <option value="">{loading && selectedCity && !banks.length ? 'Loading Banks...' : 'Select Bank'}</option>
                  {banks.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {/* 4. Branch Selection */}
              <div className="relative">
                <select 
                  disabled={!selectedBank || (loading && !branches.length)}
                  value={selectedBranch} 
                  onChange={(e) => {
                    setSelectedBranch(e.target.value)
                    handleBranchSelect(e.target.value)
                  }}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#10b981] transition-all pr-10 font-medium disabled:opacity-50"
                >
                  <option value="">{loading && selectedBank && !branches.length ? 'Loading Branches...' : 'Select Branch'}</option>
                  {branches.map(b => <option key={b.ifsc} value={b.ifsc}>{b.branch}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              {error && searchMode === 'branch' && (
                <p className="mt-4 text-red-500 font-medium text-center sm:col-span-2">{error}</p>
              )}
            </div>
          )}
        </div>

        {/* Results Card */}
        {data && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                <Building2 className="h-6 w-6 text-[#10b981]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{data.BANK}</h2>
                <p className="text-gray-500 font-medium">{data.BRANCH} Branch</p>
              </div>
            </div>

             <div className="grid lg:grid-cols-2 gap-8 w-full max-w-full overflow-hidden">
              <div className="space-y-6 w-full min-w-0">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">IFSC Code</label>
                  <p className="text-xl font-mono font-bold text-[#10b981] mt-1">{data.IFSC}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">MICR Code</label>
                  <p className="text-lg font-mono font-medium text-gray-900 mt-1">{data.MICR || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</label>
                  <div className="flex items-start gap-2 mt-1 w-full min-w-0">
                    <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-gray-900 leading-relaxed break-all overflow-hidden flex-1">{data.ADDRESS}</p>
                  </div>
                  <p className="text-gray-600 ml-7 mt-1 break-words">{data.CITY}, {data.STATE}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Payment Facilities</h3>
                <div className="space-y-4">
                  {[
                    { label: 'NEFT Transfer', value: data.NEFT },
                    { label: 'RTGS Transfer', value: data.RTGS },
                    { label: 'IMPS Transfer', value: data.IMPS },
                    { label: 'UPI Supported', value: data.UPI }
                  ].map(facility => (
                    <div key={facility.label} className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">{facility.label}</span>
                      {facility.value ? (
                        <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded-md text-sm font-bold">
                          <CheckCircle2 className="h-4 w-4" /> Yes
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2 py-1 rounded-md text-sm font-bold">
                          <XCircle className="h-4 w-4" /> No
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-20 prose prose-lg prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an IFSC Code?</h2>
          <p className="text-gray-600 mb-6">
            IFSC stands for Indian Financial System Code. It is an 11-character alphanumeric code used to uniquely identify all bank branches participating in the various online money transfer schemes in India. The code is mandatory for fund transfers through NEFT (National Electronic Funds Transfer), RTGS (Real Time Gross Settlement), and IMPS (Immediate Payment Service).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Read an IFSC Code?</h2>
          <p className="text-gray-600 mb-6">
            An 11-digit IFSC code is broken down into three parts:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>First 4 characters:</strong> Alphabets representing the name of the bank (e.g., SBIN for State Bank of India, HDFC for HDFC Bank).</li>
            <li><strong>Fifth character:</strong> Always the number '0' (zero), reserved for future use.</li>
            <li><strong>Last 6 characters:</strong> Usually numbers, representing the specific branch of the bank.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why is the IFSC Code Important?</h2>
          <p className="text-gray-600 mb-6">
            The primary purpose of an IFSC code is to ensure safe and accurate electronic fund transfers. When transferring money online, the IFSC code directs the banking network to route the funds exactly to the destination branch, preventing errors or delays. Without a valid IFSC code, online banking transactions cannot be completed.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Where Can I Find My IFSC Code?</h2>
          <p className="text-gray-600">
            You can find the IFSC code of your bank branch printed on your bank passbook, checkbook leaves, and account statements. Alternatively, you can use our free IFSC Code Finder tool above to search for any bank branch across India instantly. All you need is the 11-digit code to get the complete address and transfer facilities available.
          </p>
        </div>

      </div>
    </div>
  )
}

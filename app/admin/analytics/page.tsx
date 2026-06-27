'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { supabase } from '../../../src/lib/supabase'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useAdminContext } from '../AdminContext'

type PageView = {
  id: string
  page_url: string
  referrer: string
  device_type: string
  browser: string
  session_id: string
  created_at: string
}

export default function AnalyticsPage() {
  const [views, setViews] = useState<PageView[]>([])
  const [loading, setLoading] = useState(true)
  const { fetchSignal } = useAdminContext()

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('page_views')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        setViews(data)
      }
      setLoading(false)
    }

    fetchAnalytics()
  }, [fetchSignal])

  // Process data for charts
  const uniqueVisitors = new Set(views.map(v => v.session_id)).size
  const totalViews = views.length

  // Process timeline data (last 7 days)
  const timelineData = () => {
    const dataMap: Record<string, number> = {}
    // Initialize last 7 days with 0
    for(let i=6; i>=0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dataMap[d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })] = 0
    }
    
    views.forEach(v => {
      const date = new Date(v.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      if (dataMap[date] !== undefined) {
        dataMap[date]++
      }
    })

    return Object.keys(dataMap).map(key => ({ date: key, views: dataMap[key] }))
  }

  // Process top pages
  const topPages = () => {
    const pageMap: Record<string, number> = {}
    views.forEach(v => {
      pageMap[v.page_url] = (pageMap[v.page_url] || 0) + 1
    })
    return Object.entries(pageMap).sort((a, b) => b[1] - a[1]).slice(0, 5)
  }

  // Process breakdowns
  const getBreakdown = (key: 'browser' | 'os' | 'device_type' | 'referrer') => {
    const map: Record<string, number> = {}
    views.forEach(v => {
      const val = v[key] || 'Unknown'
      map[val] = (map[val] || 0) + 1
    })
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5)
  }

  if (loading) {
    return (
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-pulse h-64 bg-gray-100 rounded-3xl w-full mb-8"></div>
        <div className="animate-pulse h-64 bg-gray-100 rounded-3xl w-full"></div>
      </div>
    )
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Live Analytics</h1>
          <p className="text-gray-500 text-sm sm:text-base">Track your website traffic instantly without third-party cookies.</p>
        </div>
        <div className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
          </span>
          Tracking Active
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-sm font-bold text-gray-500 mb-2">Total Page Views</div>
          <div className="text-4xl font-display font-bold text-gray-900">{totalViews}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-sm font-bold text-gray-500 mb-2">Unique Visitors</div>
          <div className="text-4xl font-display font-bold text-gray-900">{uniqueVisitors}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-sm font-bold text-gray-500 mb-2">Top Device</div>
          <div className="text-4xl font-display font-bold text-gray-900">
            {views.filter(v=>v.device_type==='Mobile').length > views.filter(v=>v.device_type==='Desktop').length ? 'Mobile' : 'Desktop'}
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-sm font-bold text-gray-500 mb-2">Most Used Browser</div>
          <div className="text-4xl font-display font-bold text-gray-900">Chrome</div>
        </div>
      </div>

      {/* Traffic Graph */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Traffic (Last 7 Days)</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%" minHeight={0}>
            <AreaChart data={timelineData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '4 4' }}
              />
              <Area type="monotone" dataKey="views" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Pages & Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Top Pages
          </h2>
          <div className="space-y-3">
            {topPages().map(([url, count], idx) => (
              <div key={idx} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                <div className="font-medium text-gray-700 truncate max-w-[200px] sm:max-w-[300px] text-sm">{url}</div>
                <div className="font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded text-xs">{count} views</div>
              </div>
            ))}
            {topPages().length === 0 && <div className="text-gray-400 italic text-sm text-center py-4">No data yet.</div>}
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            Traffic Sources
          </h2>
          <div className="space-y-3">
            {getBreakdown('referrer').map(([ref, count], idx) => (
              <div key={idx} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                <div className="font-bold text-gray-700 text-sm truncate max-w-[250px]">{ref || 'Direct Traffic'}</div>
                <div className="font-bold text-gray-900 text-sm">{count}</div>
              </div>
            ))}
            {getBreakdown('referrer').length === 0 && <div className="text-gray-400 italic text-sm text-center py-4">No data yet.</div>}
          </div>
        </div>
      </div>

      {/* OS & Browser Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Browsers</h2>
          <div className="space-y-3">
            {getBreakdown('browser').map(([browser, count], idx) => (
              <div key={idx} className="flex justify-between items-center p-3 border-b border-gray-50 last:border-0">
                <div className="font-medium text-gray-700 text-sm">{browser}</div>
                <div className="font-bold text-gray-500 text-sm">{Math.round((count/totalViews)*100)}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Operating Systems</h2>
          <div className="space-y-3">
            {getBreakdown('os').map(([os, count], idx) => (
              <div key={idx} className="flex justify-between items-center p-3 border-b border-gray-50 last:border-0">
                <div className="font-medium text-gray-700 text-sm">{os}</div>
                <div className="font-bold text-gray-500 text-sm">{Math.round((count/totalViews)*100)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

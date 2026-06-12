'use client'

import React, { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '../../src/lib/supabase'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const fetchSessionAndRole = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      if (session?.user) {
        const { data } = await supabase.from('user_roles').select('role').eq('id', session.user.id).single()
        setRole(data?.role || 'writer') // Default to lowest permission if missing
      }
      setLoading(false)
    }
    
    fetchSessionAndRole()
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const { data } = await supabase.from('user_roles').select('role').eq('id', session.user.id).single()
        setRole(data?.role || 'writer')
      } else {
        setRole(null)
      }
    })
    
    return () => authListener?.subscription?.unsubscribe()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError(error.message)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-sm w-full max-w-md border border-gray-200">
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-8 text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {loginError && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">{loginError}</div>}
            <input type="email" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:border-gray-900 transition-all bg-white" />
            <div className="relative w-full">
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 pr-10 rounded-lg border border-gray-300 outline-none focus:border-gray-900 transition-all bg-white" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
            <button type="submit" className="bg-gray-900 text-white font-bold py-3 px-4 rounded-lg mt-2 hover:bg-black transition-colors shadow-sm border border-transparent">Secure Login</button>
          </form>
        </div>
      </div>
    )
  }

  // RBAC Checks
  if (role === 'writer' && pathname !== '/admin/blog-editor') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-500 mb-8">Your account role (Writer) only has access to the Knowledge Hub Editor.</p>
        <Link href="/admin/blog-editor" className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg hover:bg-black transition-colors">Go to Editor</Link>
      </div>
    )
  }

  if (role === 'analyst' && pathname !== '/admin/analytics') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-500 mb-8">Your account role (Analyst) only has access to Live Analytics.</p>
        <Link href="/admin/analytics" className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg hover:bg-black transition-colors">Go to Analytics</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative z-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <Link href="/admin" className="hover:opacity-80 transition-opacity flex items-center gap-3">
            <img src="/lightmode_Logo.png" alt="Primescore Admin" className="h-6 sm:h-8 w-auto" />
            <span className="text-lg font-display font-bold text-gray-900 hidden sm:block tracking-tight">Admin Portal</span>
          </Link>
          <div className="hidden lg:flex gap-1">
            {(role === 'super_admin' || role === 'analyst') && (
              <Link href="/admin/analytics" className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${pathname === '/admin/analytics' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>Analytics</Link>
            )}
            {role === 'super_admin' && (
              <Link href="/admin/team" className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${pathname === '/admin/team' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>Access Control</Link>
            )}
            {(role === 'super_admin' || role === 'writer') && (
              <Link href="/admin/blog-editor" className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${pathname === '/admin/blog-editor' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>Blog Editor</Link>
            )}
            {(role === 'super_admin' || role === 'sales') && (
              <Link href="/admin/leads" className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${pathname === '/admin/leads' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>Leads CRM</Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded uppercase tracking-widest">{role?.replace('_', ' ')}</div>
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 font-bold transition-colors text-sm px-3 py-1.5 rounded-md hover:bg-red-50">Log Out</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {children}
      </main>
    </div>
  )
}

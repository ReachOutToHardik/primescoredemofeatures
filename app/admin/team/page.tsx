'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { createTeamMember, getTeamMembers, deleteTeamMember } from '../../actions/team'

type TeamMember = {
  id: string
  email: string
  role: string
  created_at: string
}

export default function TeamManagementPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('writer')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const fetchMembers = async () => {
    setLoading(true)
    const res = await getTeamMembers()
    if (res.success) {
      setMembers(res.users)
    } else {
      setErrorMsg(res.error || 'Failed to fetch team members.')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')
    
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('role', role)

    const res = await createTeamMember(formData)
    
    if (res.error) {
      setErrorMsg(res.error)
    } else {
      setIsAdding(false)
      setEmail('')
      setPassword('')
      setRole('writer')
      fetchMembers()
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you absolutely sure you want to revoke access and delete this user?')) return
    const res = await deleteTeamMember(id)
    if (res.error) {
      alert(res.error)
    } else {
      fetchMembers()
    }
  }

  const getRoleBadge = (r: string) => {
    switch (r) {
      case 'super_admin': return <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">Super Admin</span>
      case 'manager': return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">Manager (All Apps)</span>
      case 'sales': return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Sales (CRM Only)</span>
      case 'writer': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Writer (Blog Only)</span>
      case 'seo': return <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">SEO Manager</span>
      default: return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">{r}</span>
    }
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Access Control</h1>
          <p className="text-gray-500 text-sm sm:text-base">Manage your team's access to the Primescore Enterprise Platform.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-gray-900 hover:bg-black text-white font-bold py-2.5 px-5 rounded-lg transition-colors border border-transparent flex items-center gap-2 text-sm"
        >
          {isAdding ? 'Cancel' : '+ Add User'}
        </button>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl font-bold text-sm mb-8">
          {errorMsg}
        </div>
      )}

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Access Role</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="email" required placeholder="User Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 bg-white outline-none focus:border-gray-900 transition-all text-sm" />
              <input type="text" required placeholder="Temporary Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 bg-white outline-none focus:border-gray-900 transition-all text-sm" />
            </div>
            
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-3">Select Access Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'writer', title: 'Writer', desc: 'Can only access the Blog Editor.' },
                  { id: 'sales', title: 'Sales Rep', desc: 'Can only access the Leads CRM.' },
                  { id: 'analyst', title: 'Analyst', desc: 'Can only access Live Analytics.' },
                  { id: 'manager', title: 'Manager', desc: 'Can access both Blog and CRM.' },
                  { id: 'super_admin', title: 'Super Admin', desc: 'Full system access.' }
                ].map((r) => (
                  <div 
                    key={r.id} 
                    onClick={() => setRole(r.id)}
                    className={`cursor-pointer p-4 rounded-lg border transition-all ${role === r.id ? 'border-gray-900 bg-gray-50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-400'}`}
                  >
                    <div className="font-bold text-gray-900 mb-1">{r.title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button type="submit" disabled={submitting} className="bg-gray-900 hover:bg-black text-white font-bold py-2.5 px-6 rounded-lg disabled:opacity-50 transition-colors border border-transparent w-full sm:w-auto text-sm">
                {submitting ? 'Creating User...' : 'Grant Access'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-20 w-full bg-gray-100 rounded-2xl"></div>
          <div className="h-20 w-full bg-gray-100 rounded-2xl"></div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 pl-8 pr-4 font-bold text-xs uppercase tracking-wider text-gray-500">Team Member</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500">Access Level</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500">Joined Date</th>
                <th className="py-4 pl-4 pr-8 font-bold text-xs uppercase tracking-wider text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="py-5 pl-8 pr-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        {member.email[0].toUpperCase()}
                      </div>
                      <div className="font-bold text-gray-900">{member.email}</div>
                    </div>
                  </td>
                  <td className="p-5">{getRoleBadge(member.role)}</td>
                  <td className="p-5 text-sm text-gray-500 font-medium">
                    {new Date(member.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-5 pl-4 pr-8 text-right">
                    <button 
                      onClick={() => handleDelete(member.id)}
                      className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                      title="Revoke Access"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

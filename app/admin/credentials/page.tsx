'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '../../../src/lib/supabase'
import { Award, Plus, Copy, Check, ShieldAlert, CheckCircle, RefreshCw, Download } from 'lucide-react'
import { useAdminContext } from '../AdminContext'

interface Credential {
  id: string
  intern_name: string
  role: string
  start_date: string
  end_date: string
  issue_date: string
  status: 'active' | 'revoked'
  created_at: string
}

export default function AdminCredentialsPage() {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  // New Credential Form State
  const [newCred, setNewCred] = useState({
    id: '', // Custom ID (e.g. PS-INT-2026-001)
    intern_name: '',
    role: '',
    start_date: '',
    end_date: ''
  })
  const [actionLoading, setActionLoading] = useState(false)
  const { fetchSignal } = useAdminContext()

  const fetchCredentials = async () => {
    try {
      if (!supabase) return
      setLoading(true)

      const { data, error } = await supabase
        .from('intern_credentials')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setCredentials(data)
      }
    } catch (err) {
      console.error('Error fetching credentials:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCredentials()
  }, [fetchSignal])

  // Auto-generate a suggestion ID when form is opened
  useEffect(() => {
    if (showAddForm && !newCred.id) {
      const year = new Date().getFullYear()
      const sequence = String(credentials.length + 1).padStart(3, '0')
      setNewCred(prev => ({
        ...prev,
        id: `PS-INT-${year}-${sequence}`
      }))
    }
  }, [showAddForm, credentials])

  const handleIssueCredential = async (e: React.FormEvent) => {
    e.preventDefault()
    setActionLoading(true)

    try {
      if (!supabase) return

      // Verify unique ID
      const { data: existing } = await supabase
        .from('intern_credentials')
        .select('id')
        .eq('id', newCred.id.trim())
        .single()

      if (existing) {
        throw new Error('Credential ID already exists in the registry ledger.')
      }

      const { error } = await supabase
        .from('intern_credentials')
        .insert({
          id: newCred.id.trim(),
          intern_name: newCred.intern_name,
          role: newCred.role,
          start_date: newCred.start_date,
          end_date: newCred.end_date,
          issue_date: new Date().toISOString().split('T')[0]
        })

      if (error) throw error

      setNewCred({
        id: '',
        intern_name: '',
        role: '',
        start_date: '',
        end_date: ''
      })
      setShowAddForm(false)
      fetchCredentials()
    } catch (err) {
      alert('Failed to issue credential: ' + (err as Error).message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: 'active' | 'revoked') => {
    const nextStatus = currentStatus === 'active' ? 'revoked' : 'active'
    if (!confirm(`Are you sure you want to change the status of ${id} to ${nextStatus.toUpperCase()}?`)) return
    
    try {
      if (!supabase) return
      const { error } = await supabase
        .from('intern_credentials')
        .update({ status: nextStatus })
        .eq('id', id)

      if (error) throw error
      fetchCredentials()
    } catch (err) {
      alert('Failed to update status: ' + (err as Error).message)
    }
  }

  const downloadCertificate = async (cred: Credential) => {
    setDownloadingId(cred.id)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })

      const pageWidth = 297
      const pageHeight = 210

      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => resolve(img)
          img.onerror = (e) => reject(e)
          img.src = src
        })
      }

      // Load background image
      const bgImg = await loadImage('/certificate_bg.png')

      // 1. Draw background image
      doc.addImage(bgImg, 'PNG', 0, 0, pageWidth, pageHeight)

      doc.setFont('Helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(148, 163, 184)
      doc.text('THIS IS TO CERTIFY THAT', pageWidth / 2, 85, { align: 'center' })

      // 3. Candidate Name
      doc.setFont('Helvetica', 'bold')
      doc.setFontSize(28)
      doc.setTextColor(26, 37, 75)
      doc.text(cred.intern_name, pageWidth / 2, 102, { align: 'center' })

      // 4. Internship details text paragraph
      doc.setFont('Helvetica', 'normal')
      doc.setFontSize(11)
      doc.setTextColor(71, 85, 105)
      
      const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
      
      const detailText = `has successfully completed a professional internship program as a ${cred.role}`
      const detailText2 = `at Primescore from ${formatDate(cred.start_date)} to ${formatDate(cred.end_date)}.`
      
      doc.text(detailText, pageWidth / 2, 118, { align: 'center' })
      doc.text(detailText2, pageWidth / 2, 124, { align: 'center' })

      // 5. Certified By Logos (Cleaned up - unused text overlay removed)

      // 6. Verification Info (Cleanly aligned at the bottom left)
      doc.setFont('Helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(26, 37, 75)
      doc.text('Date of Issuance', 40, 158)
      
      doc.setFont('Helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(71, 85, 105)
      doc.text(formatDate(cred.issue_date), 40, 163)
      
      doc.setFont('Helvetica', 'normal')
      doc.setFontSize(7)
      doc.setTextColor(148, 163, 184)
      doc.text(`ID: ${cred.id}`, 40, 169)

      // Verification url (Cleanly aligned at the bottom right matching verify view)
      doc.setFont('Helvetica', 'normal')
      doc.setFontSize(6.5)
      doc.setTextColor(148, 163, 184)
      doc.text('Verify authenticity at:', pageWidth - 80, 168)
      doc.setFont('Helvetica', 'bold')
      doc.setTextColor(37, 99, 235)
      doc.text(`primescore.in/verify/${cred.id}`, pageWidth - 80, 172)

      // Save
      doc.save(`Primescore-Certificate-${cred.intern_name.replace(/\s+/g, '-')}.pdf`)
    } catch (err) {
      console.error(err)
      alert('Failed to generate PDF.')
    } finally {
      setDownloadingId(null)
    }
  }

  const handleCopyLink = (id: string) => {
    const verifyUrl = `${window.location.origin}/verify/${id}`
    navigator.clipboard.writeText(verifyUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Credentials Registry</h1>
          <p className="text-slate-500 text-sm mt-1">Issue and audit verifiable internship certificates.</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#10b981] hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95"
        >
          <Plus size={16} /> Issue Certificate
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleIssueCredential} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-2">Issue New Certificate</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500">Verification Ledger ID</label>
              <input
                type="text"
                required
                placeholder="PS-INT-2026-001"
                value={newCred.id}
                onChange={e => setNewCred(prev => ({ ...prev, id: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500">Intern's Full Name</label>
              <input
                type="text"
                required
                placeholder="Parth Sharma"
                value={newCred.intern_name}
                onChange={e => setNewCred(prev => ({ ...prev, intern_name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500">Internship Role</label>
              <input
                type="text"
                required
                placeholder="Full Stack Web Developer"
                value={newCred.role}
                onChange={e => setNewCred(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">Start Date</label>
                <input
                  type="date"
                  required
                  value={newCred.start_date}
                  onChange={e => setNewCred(prev => ({ ...prev, start_date: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">End Date</label>
                <input
                  type="date"
                  required
                  value={newCred.end_date}
                  onChange={e => setNewCred(prev => ({ ...prev, end_date: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-250 text-slate-500 hover:text-slate-800 text-xs font-bold uppercase tracking-wider transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="bg-[#10b981] hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {actionLoading ? 'Issuing...' : 'Verify & Add to Ledger'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex flex-col items-center py-20 gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-t-emerald-500 border-slate-200 animate-spin" />
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Loading ledger data...</p>
        </div>
      ) : credentials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm font-medium">
          No credentials issued in registry ledger yet.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full border-collapse text-left text-sm text-slate-550">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Ledger ID</th>
                <th className="px-6 py-4">Candidate Name</th>
                <th className="px-6 py-4">Intern Role</th>
                <th className="px-6 py-4">Internship Period</th>
                <th className="px-6 py-4">Verification Link</th>
                <th className="px-6 py-4">Ledger Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {credentials.map(cred => (
                <tr key={cred.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">{cred.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-950">{cred.intern_name}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{cred.role}</td>
                  <td className="px-6 py-4 text-xs">
                    {new Date(cred.start_date).toLocaleDateString('en-IN')} – {new Date(cred.end_date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleCopyLink(cred.id)}
                      className="text-xs font-bold text-brandBlue hover:text-blue-500 flex items-center gap-1 transition-all"
                    >
                      {copiedId === cred.id ? (
                        <span className="flex items-center gap-1 text-emerald-600"><Check size={12} /> Copied!</span>
                      ) : (
                        <span className="flex items-center gap-1"><Copy size={12} /> Copy Verification URL</span>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full ${
                      cred.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                    }`}>
                      {cred.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => downloadCertificate(cred)}
                      disabled={downloadingId === cred.id}
                      className="p-1.5 rounded-lg border border-blue-100 text-brandBlue hover:bg-blue-50/70 transition-colors disabled:opacity-50 inline-flex items-center justify-center"
                      title="Download Certificate PDF"
                    >
                      <Download size={14} className={downloadingId === cred.id ? "animate-spin" : ""} />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(cred.id, cred.status)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        cred.status === 'active' 
                          ? 'border-red-100 text-red-500 hover:bg-red-50/70' 
                          : 'border-emerald-100 text-emerald-600 hover:bg-emerald-50/70'
                      }`}
                    >
                      {cred.status === 'active' ? <ShieldAlert size={14} /> : <CheckCircle size={14} />}
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

'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { getLeadsServer, updateLeadStatusServer, deleteLeadServer } from '../../actions/leads'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useAdminContext } from '../AdminContext'

type Lead = {
  id: string
  source_page: string
  name: string
  email: string
  phone: string
  issue_type: string
  preferred_date: string
  preferred_time: string
  message: string
  marketing_opt_in: boolean
  status: string
  created_at: string
}

export default function LeadsCRMPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [exportMenuOpen, setExportMenuOpen] = useState(false)
  const { fetchSignal } = useAdminContext()

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const res = await getLeadsServer()
      if (res.success) {
        setLeads(res.leads)
      } else {
        console.error('Error fetching leads:', res.error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [fetchSignal])

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId)
    const res = await updateLeadStatusServer(leadId, newStatus)
    if (res.success) {
      setLeads(leads.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead))
    } else {
      alert(`Failed to update status: ${res.error}`)
    }
    setUpdatingId(null)
  }

  const handleDelete = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    const res = await deleteLeadServer(leadId)
    if (res.success) {
      setLeads(leads.filter(lead => lead.id !== leadId))
    } else {
      alert(`Failed to delete lead: ${res.error}`)
    }
  }

  const exportToCSV = () => {
    if (filteredLeads.length === 0) return alert('No leads to export.')
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Issue Type', 'Status', 'Message', 'Date Submitted'],
      ...filteredLeads.map(l => [
        `"${l.name || ''}"`, `"${l.email || ''}"`, `"${l.phone || ''}"`,
        `"${l.issue_type || ''}"`, `"${l.status || 'New'}"`,
        `"${(l.message || '').replace(/"/g, '""')}"`,
        `"${new Date(l.created_at).toLocaleDateString()}"`
      ])
    ].map(e => e.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    const dateStr = new Date().toISOString().split('T')[0]
    link.setAttribute('download', `primescore-leads-${dateStr}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToExcel = () => {
    if (filteredLeads.length === 0) return alert('No leads to export.')
    const data = filteredLeads.map(l => ({
      Name: l.name, Email: l.email, Phone: l.phone, 'Issue Type': l.issue_type,
      Status: l.status || 'New', Message: l.message,
      'Date Submitted': new Date(l.created_at).toLocaleDateString()
    }))
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads")
    const dateStr = new Date().toISOString().split('T')[0]
    XLSX.writeFile(workbook, `primescore-leads-${dateStr}.xlsx`)
  }

  const exportToPDF = () => {
    if (filteredLeads.length === 0) return alert('No leads to export.')
    const doc = new jsPDF()
    doc.text("Primescore Leads Export", 14, 15)

    const tableColumn = ["Name", "Email", "Phone", "Status", "Date"]
    const tableRows = filteredLeads.map(l => [
      l.name || 'N/A', l.email || 'N/A', l.phone || 'N/A',
      l.status || 'New', new Date(l.created_at).toLocaleDateString()
    ])

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    })
    const dateStr = new Date().toISOString().split('T')[0]
    doc.save(`primescore-leads-${dateStr}.pdf`)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
      case 'contacted': return 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
      case 'in progress': return 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
      case 'converted': return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
      case 'dead': return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
      default: return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
    }
  }

  const getInitials = (name: string) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  const filteredLeads = leads.filter(lead =>
    lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone?.includes(searchQuery)
  )

  if (loading) {
    return (
      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-10 w-48 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-20 w-full bg-gray-200 rounded-2xl"></div>
          <div className="h-20 w-full bg-gray-200 rounded-2xl"></div>
          <div className="h-20 w-full bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Leads CRM</h1>
          <p className="text-gray-500 text-sm sm:text-base">Manage your consultation requests and client inquiries securely.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all shadow-sm text-sm"
            />
          </div>
          {/* Total Leads Badge */}
          <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 w-full sm:w-auto justify-center">
            <span className="text-sm font-bold text-gray-500">Total Leads</span>
            <span className="bg-green-100 text-[#10b981] font-bold px-3 py-0.5 rounded-lg">{leads.length}</span>
          </div>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-xl shadow-sm hover:bg-black font-bold text-sm flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export
            </button>

            {exportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <button onClick={() => { exportToPDF(); setExportMenuOpen(false) }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                  Export as PDF
                </button>
                <button onClick={() => { exportToExcel(); setExportMenuOpen(false) }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M8 13h2"></path><path d="M8 17h2"></path><path d="M14 13h2"></path><path d="M14 17h2"></path></svg>
                  Export as Excel
                </button>
                <button onClick={() => { exportToCSV(); setExportMenuOpen(false) }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><line x1="10" y1="9" x2="14" y2="9"></line></svg>
                  Export as CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-[#10b981]">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">No leads yet!</h3>
          <p className="text-gray-500 max-w-md mx-auto">When users fill out the consultation form on your website, they will automatically appear here.</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500">We couldn't find any leads matching "{searchQuery}".</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="py-4 pl-6 pr-4 font-bold text-xs uppercase tracking-wider text-gray-500 whitespace-nowrap">Contact Info</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 whitespace-nowrap">Issue Type</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 min-w-[250px] max-w-[450px]">Message</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-gray-500 whitespace-nowrap min-w-[160px]">Status</th>
                  <th className="py-4 pl-4 pr-6 font-bold text-xs uppercase tracking-wider text-gray-500 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-5 pl-6 pr-4 align-top">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-[#10b981] flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm border border-green-200">
                          {getInitials(lead.name)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm mb-1">{lead.name || 'Anonymous'}</div>
                          <div className="flex flex-col gap-1.5">
                            <a href={`tel:${lead.phone}`} className="text-xs text-gray-500 hover:text-[#10b981] flex items-center gap-1.5 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                              {lead.phone || 'N/A'}
                            </a>
                            <a href={`mailto:${lead.email}`} className="text-xs text-gray-500 hover:text-[#10b981] flex items-center gap-1.5 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                              {lead.email || 'N/A'}
                            </a>
                            <div className="text-[11px] text-gray-400 mt-1 font-medium bg-gray-100 w-fit px-2 py-0.5 rounded-md">
                              {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 align-top">
                      <div className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold rounded-lg mb-2 shadow-sm">
                        {lead.issue_type || 'General Inquiry'}
                      </div>
                      {lead.preferred_date && (
                        <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-2 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 w-fit">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          Prefers: <span className="font-medium text-gray-700">{lead.preferred_date} {lead.preferred_time}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-5 align-top max-w-[450px]">
                      <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                        <p className="text-sm text-gray-600 line-clamp-3 whitespace-pre-wrap break-words">{lead.message || <span className="italic text-gray-400">No message provided.</span>}</p>
                      </div>
                    </td>
                    <td className="p-5 align-top min-w-[160px]">
                      <div className="relative inline-block w-full max-w-[140px]">
                        <select
                          value={lead.status || 'New'}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          disabled={updatingId === lead.id}
                          className={`w-full text-xs font-bold px-3 py-2.5 rounded-xl border appearance-none cursor-pointer outline-none transition-all shadow-sm ${getStatusColor(lead.status || 'New')} ${updatingId === lead.id ? 'opacity-50' : ''}`}
                        >
                          <option value="New">New Lead</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Converted">Converted 🎉</option>
                          <option value="Dead">Dead Lead</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-70">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 pl-4 pr-6 align-top text-right">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-gray-400 hover:text-red-600 p-2.5 rounded-xl hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 border border-transparent hover:border-red-100"
                        title="Delete Lead"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

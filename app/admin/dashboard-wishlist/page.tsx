'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import {
  getWishlistServer,
  updateWishlistStatusServer,
  deleteWishlistServer
} from '../../actions/wishlist'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useAdminContext } from '../AdminContext'
import { Mail, Trash2, Users } from 'lucide-react'

type WishlistItem = {
  id: string
  email: string
  status: string
  created_at: string
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [exportMenuOpen, setExportMenuOpen] = useState(false)
  const { fetchSignal } = useAdminContext()

  const fetchWishlist = async () => {
    try {
      setLoading(true)
      const res = await getWishlistServer()
      if (res.success) {
        setWishlist(res.wishlist as WishlistItem[])
      } else {
        console.error('Error fetching dashboard wishlist:', res.error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [fetchSignal])

  const handleStatusChange = async (itemId: string, newStatus: string) => {
    setUpdatingId(itemId)
    const res = await updateWishlistStatusServer(itemId, newStatus)
    if (res.success) {
      setWishlist(wishlist.map(item => item.id === itemId ? { ...item, status: newStatus } : item))
    } else {
      alert(`Failed to update status: ${res.error}`)
    }
    setUpdatingId(null)
  }

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this wishlist entry?')) return
    const res = await deleteWishlistServer(itemId)
    if (res.success) {
      setWishlist(wishlist.filter(item => item.id !== itemId))
    } else {
      alert(`Failed to delete entry: ${res.error}`)
    }
  }

  const filteredWishlist = wishlist.filter(item =>
    item.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const exportToCSV = () => {
    if (filteredWishlist.length === 0) return alert('No wishlist items to export.')
    const csvContent = [
      ['Email', 'Status', 'Date Joined'],
      ...filteredWishlist.map(w => [
        `"${w.email || ''}"`, `"${w.status || 'Pending'}"`,
        `"${new Date(w.created_at).toLocaleDateString()}"`
      ])
    ].map(e => e.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    const dateStr = new Date().toISOString().split('T')[0]
    link.setAttribute('download', `primescore-dashboard-wishlist-${dateStr}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToExcel = () => {
    if (filteredWishlist.length === 0) return alert('No wishlist items to export.')
    const data = filteredWishlist.map(w => ({
      Email: w.email,
      Status: w.status || 'Pending',
      'Date Joined': new Date(w.created_at).toLocaleDateString()
    }))
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dashboard Wishlist')
    const dateStr = new Date().toISOString().split('T')[0]
    XLSX.writeFile(workbook, `primescore-dashboard-wishlist-${dateStr}.xlsx`)
  }

  const exportToPDF = () => {
    if (filteredWishlist.length === 0) return alert('No wishlist items to export.')
    const doc = new jsPDF()
    doc.text('Primescore Dashboard Wishlist Export', 14, 15)
    const tableColumn = ['Email', 'Status', 'Date Joined']
    const tableRows = filteredWishlist.map(w => [
      w.email || 'N/A', w.status || 'Pending',
      new Date(w.created_at).toLocaleDateString()
    ])
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 })
    const dateStr = new Date().toISOString().split('T')[0]
    doc.save(`primescore-dashboard-wishlist-${dateStr}.pdf`)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
      case 'approved': return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
      default: return 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            Dashboard Waitlist CRM
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage corporate waitlist signups and wishlist validation triggers for dashboard releases.
          </p>
        </div>

        {/* Export Dropdown */}
        <div className="relative">
          <button
            onClick={() => setExportMenuOpen(!exportMenuOpen)}
            className="w-full sm:w-auto px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            Export Data
          </button>

          {exportMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setExportMenuOpen(false)} />
              <div className="absolute right-0 mt-1.5 w-40 rounded-lg border border-slate-100 bg-white p-1 shadow-lg z-20 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => { exportToCSV(); setExportMenuOpen(false) }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                >
                  Export to CSV
                </button>
                <button
                  onClick={() => { exportToExcel(); setExportMenuOpen(false) }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                >
                  Export to Excel
                </button>
                <button
                  onClick={() => { exportToPDF(); setExportMenuOpen(false) }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                >
                  Export to PDF
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by email address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Main Waitlist Table */}
      <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">
            Fetching waitlist registrations...
          </div>
        ) : filteredWishlist.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No entries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">Waitlist Email</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredWishlist.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold shrink-0">
                          <Mail className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{item.email}</p>
                          <span className="text-[10px] text-slate-400">ID: {item.id.slice(0, 8)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block">
                        <select
                          value={item.status || 'Pending'}
                          disabled={updatingId === item.id}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={[
                            'appearance-none px-3 py-1.5 rounded-lg border text-[11px] font-bold focus:outline-none transition-colors pr-7 select-theme-none',
                            getStatusColor(item.status)
                          ].join(' ')}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-current">
                          ▼
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                        title="Delete entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

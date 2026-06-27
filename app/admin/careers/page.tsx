'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '../../../src/lib/supabase'
import { Briefcase, User, Mail, Phone, FileText, Globe, Check, X, Clock, Plus, Trash, MapPin, Pencil } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa6'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAdminContext } from '../AdminContext'

interface JobOpening {
  id: string
  title: string
  type: 'job' | 'internship'
  department: string
  location: string
  description: string
  requirements: string
  is_active: boolean
  created_at: string
  min_pay?: number | null
  max_pay?: number | null
  hide_pay?: boolean
  location_type?: string
  duration_months?: number | null
}

interface Application {
  id: string
  job_id: string | null
  name: string
  email: string
  phone: string
  role_applied: string
  current_location?: string
  experience_years?: string
  skills?: string
  linkedin_url?: string
  portfolio_link: string | null
  notice_period?: string
  expected_salary?: string
  resume_link: string
  cover_letter: string | null
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected'
  created_at: string
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  const items = [
    { label: 'Bold', action: () => editor.chain().focus().toggleBold().run(), active: 'bold', style: 'font-bold' },
    { label: 'Italic', action: () => editor.chain().focus().toggleItalic().run(), active: 'italic', style: 'italic' },
    { label: 'Heading', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: 'heading' },
    { label: 'Bullet List', action: () => editor.chain().focus().toggleBulletList().run(), active: 'bulletList' },
    { label: 'Numbered List', action: () => editor.chain().focus().toggleOrderedList().run(), active: 'orderedList' },
  ]

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-3 bg-slate-50 border-b border-slate-200 rounded-t-xl">
      {items.map((item, idx) => {
        const isActive = item.active === 'heading'
          ? editor.isActive('heading', { level: 3 })
          : editor.isActive(item.active)

        return (
          <button
            key={idx}
            type="button"
            onClick={item.action}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
              isActive 
                ? 'bg-[#10b981] text-white shadow-sm' 
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-sm'
            } ${item.style || ''}`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export default function AdminCareersPage() {
  const [activeSubTab, setActiveSubTab] = useState<'listings' | 'applications'>('listings')
  const [openings, setOpenings] = useState<JobOpening[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [jobNameFilter, setJobNameFilter] = useState<string>('all')

  // New/Editing Opening Form State
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingJobId, setEditingJobId] = useState<string | null>(null)
  const [newJobQuestions, setNewJobQuestions] = useState<any[]>([])
  const [newJob, setNewJob] = useState({
    title: '',
    type: 'job' as 'job' | 'internship',
    location: '',
    description: '',
    requirements: '',
    min_pay: '' as string | number,
    max_pay: '' as string | number,
    hide_pay: false,
    location_type: 'Remote',
    duration_months: '' as string | number
  })
  const [actionLoading, setActionLoading] = useState(false)
  const { fetchSignal } = useAdminContext()

  // Tiptap Rich text editor setup
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Describe the role responsibilities and overview here...</p>',
    onUpdate: ({ editor }) => {
      setNewJob(prev => ({ ...prev, description: editor.getHTML() }))
    },
    editorProps: {
      attributes: {
        class: 'prose prose-base max-w-none focus:outline-none min-h-[350px] p-6 text-slate-800',
      },
    },
  })

  // Sync editor content when resetting form
  useEffect(() => {
    if (editor && !showAddForm && !editingJobId) {
      editor.commands.setContent('<p>Describe the role responsibilities and overview here...</p>')
    }
  }, [showAddForm, editingJobId, editor])

  const fetchData = async () => {
    try {
      if (!supabase) return
      setLoading(true)

      const { data: jobs, error: jobsErr } = await supabase
        .from('job_openings')
        .select('*')
        .order('created_at', { ascending: false })

      const { data: apps, error: appsErr } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (!jobsErr && jobs) setOpenings(jobs)
      if (!appsErr && apps) setApplications(apps)
    } catch (err) {
      console.error('Error fetching careers data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchSignal])

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault()
    setActionLoading(true)

    try {
      if (!supabase) return
      
      const payload = {
        title: newJob.title,
        type: newJob.type,
        location: newJob.location || 'Remote',
        description: newJob.description || '<p>Describe the role responsibilities and overview here...</p>',
        requirements: newJob.requirements,
        min_pay: newJob.min_pay === '' ? null : Number(newJob.min_pay),
        max_pay: newJob.max_pay === '' ? null : Number(newJob.max_pay),
        hide_pay: newJob.hide_pay,
        location_type: newJob.location_type,
        duration_months: newJob.duration_months === '' ? null : Number(newJob.duration_months),
        questions: newJobQuestions
      }

      if (editingJobId) {
        const { error } = await supabase
          .from('job_openings')
          .update(payload)
          .eq('id', editingJobId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('job_openings')
          .insert(payload)

        if (error) throw error
      }

      setNewJob({
        title: '',
        type: 'job',
        location: '',
        description: '',
        requirements: '',
        min_pay: '',
        max_pay: '',
        hide_pay: false,
        location_type: 'Remote',
        duration_months: ''
      })
      setNewJobQuestions([])
      setEditingJobId(null)
      setShowAddForm(false)
      fetchData()
    } catch (err) {
      alert('Failed to save job opening: ' + (err as Error).message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleStartEdit = (job: JobOpening) => {
    setEditingJobId(job.id)
    setNewJobQuestions(job.questions || [])
    setNewJob({
      title: job.title,
      type: job.type,
      location: job.location,
      description: job.description,
      requirements: job.requirements,
      min_pay: job.min_pay ?? '',
      max_pay: job.max_pay ?? '',
      hide_pay: job.hide_pay ?? false,
      location_type: job.location_type || 'Remote',
      duration_months: job.duration_months ?? ''
    })
    if (editor) {
      editor.commands.setContent(job.description)
    }
    setShowAddForm(true)
  }

  const handleToggleNoticePeriodQuestion = (checked: boolean) => {
    if (checked) {
      setNewJobQuestions(prev => [
        ...prev, 
        { id: 'notice_period', text: 'When are you able to join? (Notice Period)', type: 'select', options: ['3 Days', '15 Days', '1 Month', 'Custom'], required: true }
      ])
    } else {
      setNewJobQuestions(prev => prev.filter(q => q.id !== 'notice_period'))
    }
  }

  const handleAddTemplateQuestion = (id: string, text: string, type: 'text' | 'select', options?: string[]) => {
    if (newJobQuestions.some(q => q.id === id)) return
    setNewJobQuestions(prev => [
      ...prev,
      { id, text, type, options, required: true }
    ])
  }

  const handleAddCustomQuestion = () => {
    const customId = `custom_${Math.random().toString(36).substring(2, 9)}`
    setNewJobQuestions(prev => [
      ...prev,
      { id: customId, text: '', type: 'text', required: true }
    ])
  }

  const handleUpdateQuestion = (id: string, field: string, value: any) => {
    setNewJobQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q))
  }

  const handleRemoveQuestion = (id: string) => {
    setNewJobQuestions(prev => prev.filter(q => q.id !== id))
  }

  const handleToggleJobActive = async (id: string, currentStatus: boolean) => {
    try {
      if (!supabase) return
      const { error } = await supabase
        .from('job_openings')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error
      fetchData()
    } catch (err) {
      alert('Failed to update job status: ' + (err as Error).message)
    }
  }

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job opening? This will not delete candidates who already applied.')) return
    try {
      if (!supabase) return
      const { error } = await supabase
        .from('job_openings')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchData()
    } catch (err) {
      alert('Failed to delete job: ' + (err as Error).message)
    }
  }

  const handleUpdateAppStatus = async (appId: string, status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected') => {
    // Optimistic UI update
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status } : app))

    try {
      if (!supabase) return
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', appId)

      if (error) throw error
      
      // Fetch latest updates
      const { data: updatedApps } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false })
      if (updatedApps) setApplications(updatedApps)
    } catch (err) {
      alert('Failed to update status in database: ' + (err as Error).message)
      fetchData() // Revert
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Careers Manager</h1>
          <p className="text-slate-500 text-sm mt-1">Configure listings and review application pipelines.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('listings')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeSubTab === 'listings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Job Board Listings
          </button>
          <button
            onClick={() => setActiveSubTab('applications')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeSubTab === 'applications' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Applications Inbox ({applications.filter(a => a.status === 'pending').length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-20 gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-t-emerald-500 border-slate-200 animate-spin" />
          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Syncing database entries...</p>
        </div>
      ) : activeSubTab === 'listings' ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">Current Positions</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#10b981] hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Plus size={16} /> Add Position
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddJob} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col gap-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-2">
                {editingJobId ? 'Edit Position' : 'Create New Position'}
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Position Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Senior React Developer"
                    value={newJob.title}
                    onChange={e => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Position Type</label>
                  <select
                    value={newJob.type}
                    onChange={e => setNewJob(prev => ({ ...prev, type: e.target.value as 'job' | 'internship' }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
                  >
                    <option value="job">Full-time Job</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Location Type</label>
                  <select
                    value={newJob.location_type}
                    onChange={e => setNewJob(prev => ({ ...prev, location_type: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
                  >
                    <option value="Remote">Remote</option>
                    <option value="In-Office">In-Office</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Specific Location (e.g. Jodhpur, Rajasthan)</label>
                  <input
                    type="text"
                    required
                    placeholder="Jodhpur, Rajasthan"
                    value={newJob.location}
                    onChange={e => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
                {newJob.type === 'internship' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Duration (Months)</label>
                    <input
                      type="number"
                      placeholder="3"
                      value={newJob.duration_months}
                      onChange={e => setNewJob(prev => ({ ...prev, duration_months: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Pay & Stipend Section */}
              <div className="grid sm:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Min Pay / Stipend (₹ per month)</label>
                  <input
                    type="number"
                    placeholder="5000"
                    value={newJob.min_pay}
                    onChange={e => setNewJob(prev => ({ ...prev, min_pay: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Max Pay / Stipend (₹ per month)</label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={newJob.max_pay}
                    onChange={e => setNewJob(prev => ({ ...prev, max_pay: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 sm:mt-7">
                  <input
                    type="checkbox"
                    id="hide_pay"
                    checked={newJob.hide_pay}
                    onChange={e => setNewJob(prev => ({ ...prev, hide_pay: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-350 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="hide_pay" className="text-xs font-bold text-slate-500 select-none cursor-pointer">
                    Hide Pay from public page
                  </label>
                </div>
              </div>

              {/* Tiptap rich editor */}
              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-xs font-bold text-slate-500">Position Description (Rich Text Body)</label>
                <div className="bg-white border border-slate-250 rounded-2xl overflow-hidden focus-within:border-emerald-500 transition-all shadow-sm">
                  <MenuBar editor={editor} />
                  <div className="min-h-[350px]">
                    <EditorContent editor={editor} />
                  </div>
                </div>
              </div>

              {/* Questions Section */}
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Screening Questions</h4>
                
                {/* Notice Period Question Template */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        id="q_notice_period"
                        checked={newJobQuestions.some(q => q.id === 'notice_period')}
                        onChange={(e) => handleToggleNoticePeriodQuestion(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-350 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <label htmlFor="q_notice_period" className="text-xs font-bold text-slate-700 select-none cursor-pointer">
                        Include "When are you able to join?" (Notice Period)
                      </label>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Template</span>
                  </div>
                  {newJobQuestions.some(q => q.id === 'notice_period') && (
                    <p className="text-xs text-slate-450 italic">
                      Provides choices: 3 days, 15 days, 1 month, and custom input.
                    </p>
                  )}
                </div>

                {/* Templates list */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-bold text-slate-400 mr-1">Add Template:</span>
                  <button
                    type="button"
                    onClick={() => handleAddTemplateQuestion('why_join', 'Why do you want to join Primescore?', 'text')}
                    className="text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors font-semibold"
                  >
                    + Why join us?
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddTemplateQuestion('best_project', 'Link to your best project / GitHub repo', 'text')}
                    className="text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors font-semibold"
                  >
                    + Best Project Link
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddTemplateQuestion('hours_available', 'How many hours per week are you available?', 'select', ['10-20 hours', '20-30 hours', 'Full-time (40+ hours)'])}
                    className="text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors font-semibold"
                  >
                    + Weekly Hours
                  </button>
                </div>

                {/* List of active custom/template questions */}
                {newJobQuestions.length > 0 && (
                  <div className="flex flex-col gap-3 mt-2">
                    {newJobQuestions.map((q, idx) => (
                      <div key={q.id || idx} className="bg-slate-50 p-4 rounded-xl border border-slate-150 flex flex-col gap-3 relative">
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(q.id)}
                          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-red-500 transition-colors"
                          title="Remove Question"
                        >
                          <X size={16} />
                        </button>
                        
                        <div className="grid sm:grid-cols-3 gap-3 pr-8">
                          <div className="sm:col-span-2 flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Question Text</label>
                            <input
                              type="text"
                              value={q.text}
                              onChange={(e) => handleUpdateQuestion(q.id, 'text', e.target.value)}
                              className="px-3 py-1.5 rounded-lg border border-slate-250 bg-white text-slate-900 outline-none text-xs font-semibold"
                              placeholder="e.g. Do you have experience with TypeScript?"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Input Type</label>
                            <select
                              value={q.type}
                              onChange={(e) => handleUpdateQuestion(q.id, 'type', e.target.value)}
                              className="px-3 py-1.5 rounded-lg border border-slate-250 bg-white text-slate-900 outline-none text-xs font-semibold"
                            >
                              <option value="text">Short Answer</option>
                              <option value="select">Multiple Choice</option>
                            </select>
                          </div>
                        </div>

                        {q.type === 'select' && (
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Options (comma separated)</label>
                            <input
                              type="text"
                              value={q.options ? q.options.join(', ') : ''}
                              onChange={(e) => handleUpdateQuestion(q.id, 'options', e.target.value.split(',').map(s => s.trim()))}
                              className="px-3 py-1.5 rounded-lg border border-slate-250 bg-white text-slate-900 outline-none text-xs font-semibold"
                              placeholder="e.g. Yes, No, Intermediate"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAddCustomQuestion}
                  className="text-xs text-slate-700 font-bold border border-dashed border-slate-350 hover:border-slate-400 py-3 rounded-xl transition-all w-full text-center flex items-center justify-center gap-1 bg-white hover:bg-slate-50/50 mt-1 shadow-sm"
                >
                  <Plus size={14} /> Add Custom Question
                </button>
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingJobId(null)
                    setNewJob({
                      title: '',
                      type: 'job',
                      department: '',
                      location: '',
                      description: '',
                      requirements: '',
                      min_pay: '',
                      max_pay: '',
                      hide_pay: false,
                      location_type: 'Remote',
                      duration_months: ''
                    })
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-250 text-slate-500 hover:text-slate-800 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-[#10b981] hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : editingJobId ? 'Save Changes' : 'Publish Listing'}
                </button>
              </div>
            </form>
          )}

          {openings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm font-medium">
              No positions listed. Create your first opening above.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full border-collapse text-left text-sm text-slate-550">
                <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {openings.map(job => (
                    <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{job.title}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full ${
                          job.type === 'job' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                        }`}>
                          {job.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">{job.location_type || 'Remote'} ({job.location})</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleJobActive(job.id, job.is_active)}
                          className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full ${
                            job.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {job.is_active ? 'Active' : 'Closed'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleStartEdit(job)}
                          className="p-1.5 text-slate-400 hover:text-[#10b981] transition-colors rounded-lg hover:bg-emerald-50 mr-2 inline-flex items-center"
                          title="Edit Position"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 inline-flex items-center"
                          title="Delete Position"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div>
          {(() => {
            const uniqueJobNames = Array.from(new Set(applications
              .filter(app => {
                if (typeFilter === 'all') return true
                const isInternship = app.role_applied.toLowerCase().includes('internship')
                return typeFilter === 'internship' ? isInternship : !isInternship
              })
              .map(app => app.role_applied)
            ))

            const filteredApps = applications.filter(app => {
              const searchLower = searchQuery.toLowerCase()
              const matchesSearch = 
                app.name.toLowerCase().includes(searchLower) ||
                app.email.toLowerCase().includes(searchLower) ||
                app.phone.toLowerCase().includes(searchLower) ||
                app.role_applied.toLowerCase().includes(searchLower)

              const matchesStatus = statusFilter === 'all' || app.status === statusFilter

              const isInternship = app.role_applied.toLowerCase().includes('internship')
              const matchesType = typeFilter === 'all' || (typeFilter === 'internship' ? isInternship : !isInternship)

              const matchesJobName = jobNameFilter === 'all' || app.role_applied === jobNameFilter

              return matchesSearch && matchesStatus && matchesType && matchesJobName
            })

            return (
              <>
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Candidate Applications ({filteredApps.length})</h2>
                  
                  <div className="flex flex-wrap gap-3 w-full xl:w-auto">
                    <input
                      type="text"
                      placeholder="Search name, email, role..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm w-full sm:w-64"
                    />
                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm font-semibold cursor-pointer"
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    <select
                      value={typeFilter}
                      onChange={e => {
                        setTypeFilter(e.target.value)
                        setJobNameFilter('all')
                      }}
                      className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm font-semibold cursor-pointer"
                    >
                      <option value="all">All Types</option>
                      <option value="job">Jobs Only</option>
                      <option value="internship">Internships Only</option>
                    </select>

                    <select
                      value={jobNameFilter}
                      onChange={e => setJobNameFilter(e.target.value)}
                      className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-emerald-500 text-sm font-semibold cursor-pointer max-w-xs"
                    >
                      <option value="all">All Positions</option>
                      {uniqueJobNames.map(name => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {filteredApps.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm font-medium">
                    No matching applications found.
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {filteredApps.map(app => (
                      <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-slate-600">
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{app.name}</h3>
                        <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Applied for: <span className="text-slate-900 font-semibold">{app.role_applied}</span></p>
                        
                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Mail size={14} /> {app.email}</span>
                          <span className="flex items-center gap-1"><Phone size={14} /> {app.phone}</span>
                          {app.current_location && <span className="flex items-center gap-1"><MapPin size={14} /> {app.current_location}</span>}
                          <span className="flex items-center gap-1"><Clock size={14} /> Applied on {new Date(app.created_at).toLocaleDateString()}</span>
                        </div>

                        {/* Extra Recruiting Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                          <div>
                            <span className="text-slate-400 block mb-0.5 uppercase tracking-wider text-[9px] font-bold">Experience Level</span>
                            <span className="font-semibold text-slate-700">{app.experience_years || 'Not provided'}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block mb-0.5 uppercase tracking-wider text-[9px] font-bold">Current Location</span>
                            <span className="font-semibold text-slate-700">{app.current_location || 'Not provided'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full ${
                        app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                        app.status === 'shortlisted' ? 'bg-emerald-50 text-emerald-600' :
                        app.status === 'reviewed' ? 'bg-blue-50 text-blue-600' :
                        'bg-red-50 text-red-500'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {app.cover_letter && (
                    <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-650 leading-relaxed border border-slate-100">
                      <strong>Cover letter / details:</strong><br />
                      <p className="mt-1 font-light italic text-slate-600">"{app.cover_letter}"</p>
                    </div>
                  )}

                  {app.answers && (app.answers as any).length > 0 && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
                      <strong className="text-xs text-slate-500 uppercase tracking-wider block">Screening Answers:</strong>
                      <div className="grid gap-3 sm:grid-cols-2 mt-1">
                        {(app.answers as any).map((ans: any, idx: number) => (
                          <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                            <span className="text-slate-400 block font-semibold mb-1">{ans.questionText}</span>
                            <span className="text-slate-800 font-bold">{ans.answer}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 justify-between items-center border-t border-slate-100 pt-4">
                    <div className="flex gap-3">
                      <a
                        href={app.resume_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all bg-white"
                      >
                        <FileText size={14} /> Resume
                      </a>
                      {app.linkedin_url && (
                        <a
                          href={app.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-slate-200 text-[#0077b5] hover:border-[#0077b5] hover:bg-[#0077b5]/5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all bg-white"
                        >
                          <FaLinkedin size={14} /> LinkedIn
                        </a>
                      )}
                      {app.portfolio_link && (
                        <a
                          href={app.portfolio_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all bg-white"
                        >
                          <Globe size={14} /> Portfolio
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateAppStatus(app.id, 'shortlisted')}
                        className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
                      >
                        <Check size={14} /> Shortlist
                      </button>
                      <button
                        onClick={() => handleUpdateAppStatus(app.id, 'rejected')}
                        className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
                      >
                        <X size={14} /> Reject
                      </button>
                      {app.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'reviewed')}
                          className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-650 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                        >
                          Mark Reviewed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )
    })()}
  </div>
      )}
    </div>
  )
}

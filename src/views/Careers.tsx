'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, MapPin, Clock, ArrowRight, ArrowLeft, User, Mail, Phone, FileText, Globe, CheckCircle2, ShieldCheck, Heart, Sparkles, Zap, X } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa6'
import { supabase } from '../lib/supabase'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'

interface JobOpening {
  id: string
  title: string
  type: 'job' | 'internship'
  department: string
  location: string
  description: string
  requirements: string
  created_at: string
  min_pay?: number | null
  max_pay?: number | null
  hide_pay?: boolean
  location_type?: string
  duration_months?: number | null
  questions?: any[] | null
}

export default function Careers() {
  const [openings, setOpenings] = useState<JobOpening[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'job' | 'internship'>('all')
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  
  // Application Form State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedAnswersForSelect, setSelectedAnswersForSelect] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentLocation: '',
    experienceYears: 'Fresher / Student',
    linkedinUrl: '',
    portfolioLink: '',
    resumeLink: '',
    coverLetter: '',
    roleApplied: ''
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')

  // File Upload and Drag States
  const [uploadMode, setUploadMode] = useState<'file' | 'link'>('file')
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState('')
  const [fileUploadProgress, setFileUploadProgress] = useState('')

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setFileError('')

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('')
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (selectedFile: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    const maxSizeBytes = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.pdf') && !selectedFile.name.endsWith('.doc') && !selectedFile.name.endsWith('.docx')) {
      setFileError('Invalid file type. Only PDF, DOC, or DOCX files are allowed.')
      return
    }

    if (selectedFile.size > maxSizeBytes) {
      setFileError('File size exceeds 5MB limit.')
      return
    }

    setFile(selectedFile)
  }

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        if (!supabase) {
          setLoading(false)
          return
        }
        const { data, error } = await supabase
          .from('job_openings')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (!error && data) {
          setOpenings(data)
        }
      } catch (err) {
        console.error('Error fetching job openings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOpenings()
  }, [])

  const filteredOpenings = openings.filter(o => activeTab === 'all' || o.type === activeTab)

  const handleOpenApply = (job: JobOpening) => {
    setSelectedJob(job)
    setAnswers({})
    setSelectedAnswersForSelect({})
    setFormData({
      name: '',
      email: '',
      phone: '',
      currentLocation: '',
      experienceYears: 'Fresher / Student',
      linkedinUrl: '',
      portfolioLink: '',
      resumeLink: '',
      coverLetter: '',
      roleApplied: `${job.title} (${job.type === 'job' ? 'Job' : 'Internship'})`
    })
    setFile(null)
    setFileError('')
    setFileUploadProgress('')
    setIsFormOpen(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('submitting')
    setSubmitError('')
    setFileUploadProgress('')

    try {
      if (!supabase) {
        throw new Error('Supabase Client not initialized')
      }

      let finalResumeLink = formData.resumeLink

      if (uploadMode === 'file') {
        if (!file) {
          throw new Error('Please select or upload a resume file.')
        }

        setFileUploadProgress('Uploading CV to storage...')
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
        
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from('resumes')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadErr) {
          console.error('Storage upload error:', uploadErr)
          throw new Error('Failed to upload file. Please check if "resumes" bucket is set up, or click "Provide a link instead" above.')
        }

        const { data } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName)

        if (!data || !data.publicUrl) {
          throw new Error('Failed to retrieve uploaded file URL.')
        }

        finalResumeLink = data.publicUrl
      }

      setFileUploadProgress('Submitting application details...')

      const { error } = await supabase
        .from('job_applications')
        .insert({
          job_id: selectedJob?.id || null,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role_applied: formData.roleApplied,
          current_location: formData.currentLocation,
          experience_years: formData.experienceYears,
          linkedin_url: formData.linkedinUrl,
          portfolio_link: formData.portfolioLink || null,
          resume_link: finalResumeLink,
          cover_letter: formData.coverLetter || null,
          status: 'pending',
          answers: Object.entries(answers).map(([questionId, answerText]) => {
            const q = selectedJob?.questions?.find((x: any) => x.id === questionId)
            return {
              questionId,
              questionText: q?.text || questionId,
              answer: answerText
            }
          })
        })

      if (error) throw error

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        currentLocation: '',
        experienceYears: 'Fresher / Student',
        linkedinUrl: '',
        portfolioLink: '',
        resumeLink: '',
        coverLetter: '',
        roleApplied: ''
      })
      setAnswers({})
      setSelectedAnswersForSelect({})
      setFile(null)
      setTimeout(() => {
        setIsFormOpen(false)
        setSubmitStatus('idle')
      }, 3000)
    } catch (err: any) {
      console.error('Submit application error:', err)
      setSubmitStatus('error')
      setSubmitError(err.message || 'Failed to submit application. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-body text-brandNavy pt-32 pb-24 relative overflow-hidden" data-theme="light">
      {/* Background decorations matching other pages */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-heroRadial opacity-[0.8]" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 relative z-10">
        {isFormOpen ? (
          /* Sub-Page: Full Application Form View */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-3xl mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={() => setIsFormOpen(false)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-brandBlue transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> Back to {selectedJob ? 'Position Details' : 'All Positions'}
            </button>

            {/* Main Form Panel */}
            <div className="bg-white border border-brandNavy/10 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col gap-6">
              <div className="pb-6 border-b border-slate-100">
                <h1 className="text-3xl font-extrabold text-brandNavy tracking-tight leading-snug">
                  Apply for Position
                </h1>
                <p className="text-sm text-brandBlue font-bold mt-2">
                  {formData.roleApplied || 'General Application (Talent Pool)'}
                </p>
              </div>

              {submitStatus === 'success' ? (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-20 text-center flex flex-col items-center gap-4"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500/10 mb-2">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-brandNavy">Application Submitted Successfully</h3>
                  <p className="text-textSecondary text-sm max-w-md leading-relaxed font-light">
                    Thank you for applying. We have received your details and our team will get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-brandRed/10 border border-brandRed/20 text-brandRed rounded-xl text-sm font-semibold">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Parth Sharma"
                          className="w-full h-14 pl-12 pr-5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-brandBlue focus:bg-slate-50/50 outline-none transition-all text-sm font-light"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="parth@primescore.in"
                          className="w-full h-14 pl-12 pr-5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-brandBlue focus:bg-slate-50/50 outline-none transition-all text-sm font-light"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 63506-71636"
                          className="w-full h-14 pl-12 pr-5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-brandBlue focus:bg-slate-50/50 outline-none transition-all text-sm font-light"
                        />
                      </div>
                    </div>

                    {/* Current Location */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.currentLocation}
                          onChange={e => setFormData(prev => ({ ...prev, currentLocation: e.target.value }))}
                          placeholder="Jodhpur, Rajasthan"
                          className="w-full h-14 pl-12 pr-5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-brandBlue focus:bg-slate-50/50 outline-none transition-all text-sm font-light"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Total Experience */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Experience Level</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        <select
                          value={formData.experienceYears}
                          onChange={e => setFormData(prev => ({ ...prev, experienceYears: e.target.value }))}
                          className="w-full h-14 pl-12 pr-8 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-brandBlue focus:bg-slate-50/50 transition-all text-sm font-light appearance-none font-semibold"
                        >
                          <option value="Fresher / Student">Fresher / Student</option>
                          <option value="1-2 Years">1-2 Years</option>
                          <option value="2-5 Years">2-5 Years</option>
                          <option value="5+ Years">5+ Years</option>
                        </select>
                      </div>
                    </div>

                    {/* LinkedIn URL */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">LinkedIn Profile</label>
                      <div className="relative">
                        <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="url"
                          required
                          value={formData.linkedinUrl}
                          onChange={e => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full h-14 pl-12 pr-5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-brandBlue focus:bg-slate-50/50 outline-none transition-all text-sm font-light"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Link */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Portfolio Link (Optional)</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="url"
                        value={formData.portfolioLink}
                        onChange={e => setFormData(prev => ({ ...prev, portfolioLink: e.target.value }))}
                        placeholder="https://github.com/..."
                        className="w-full h-14 pl-12 pr-5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-brandBlue focus:bg-slate-50/50 outline-none transition-all text-sm font-light"
                      />
                    </div>
                  </div>

                  {/* Resume Upload / Link Selector */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resume / CV</label>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadMode(prev => prev === 'file' ? 'link' : 'file')
                          setFileError('')
                        }}
                        className="text-[10px] font-bold text-brandBlue uppercase tracking-wider hover:underline focus:outline-none"
                      >
                        {uploadMode === 'file' ? 'Provide a link instead' : 'Upload file instead'}
                      </button>
                    </div>

                    {uploadMode === 'file' ? (
                      <div 
                        className={`border-2 border-dashed rounded-xl p-6 transition-all text-center flex flex-col items-center justify-center gap-2 cursor-pointer ${
                          dragActive 
                            ? 'border-brandBlue bg-blue-50/10' 
                            : file 
                              ? 'border-emerald-500 bg-emerald-50/5'
                              : 'border-slate-200 hover:border-brandBlue hover:bg-slate-50/30'
                        }`}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('file-input')?.click()}
                      >
                        <input
                          type="file"
                          id="file-input"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                        {file ? (
                          <>
                            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                            <div className="text-sm font-semibold text-brandNavy">{file.name}</div>
                            <div className="text-xs text-slate-400">{(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload</div>
                          </>
                        ) : (
                          <>
                            <FileText className="h-8 w-8 text-slate-400" />
                            <div className="text-sm text-slate-600 font-light">
                              <span className="text-brandBlue font-semibold">Click to upload</span> or drag and drop
                            </div>
                            <div className="text-xs text-slate-400">PDF, DOC, or DOCX up to 5MB</div>
                          </>
                        )}
                        {fileError && (
                          <p className="text-xs text-brandRed font-medium mt-1">{fileError}</p>
                        )}
                      </div>
                    ) : (
                      <div className="relative">
                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="url"
                          required={uploadMode === 'link'}
                          value={formData.resumeLink}
                          onChange={e => setFormData(prev => ({ ...prev, resumeLink: e.target.value }))}
                          placeholder="https://drive.google.com/file/..."
                          className="w-full h-14 pl-12 pr-5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-brandBlue focus:bg-slate-50/50 outline-none transition-all text-sm font-light"
                        />
                      </div>
                    )}
                  </div>

                  {/* Screening Questions */}
                  {selectedJob?.questions && selectedJob.questions.length > 0 && (
                    <div className="flex flex-col gap-4 border-t border-slate-100 pt-4">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Screening Questions</label>
                      {selectedJob.questions.map((q: any) => (
                        <div key={q.id} className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-slate-700">
                            {q.text} {q.required && <span className="text-brandRed">*</span>}
                          </label>
                          
                          {q.type === 'select' ? (
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-wrap gap-2">
                                {q.options?.map((opt: string) => {
                                  const isSelected = selectedAnswersForSelect[q.id] === opt;
                                  return (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => {
                                        setSelectedAnswersForSelect(prev => ({ ...prev, [q.id]: opt }));
                                        if (opt !== 'Custom') {
                                          setAnswers(prev => ({ ...prev, [q.id]: opt }));
                                        } else {
                                          setAnswers(prev => ({ ...prev, [q.id]: '' }));
                                        }
                                      }}
                                      className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                                        isSelected 
                                          ? 'border-brandBlue bg-brandBlue/5 text-brandBlue border-brandBlue' 
                                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                              {selectedAnswersForSelect[q.id] === 'Custom' && (
                                <input
                                  type="text"
                                  required={q.required}
                                  value={answers[q.id] || ''}
                                  onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                  placeholder="Please specify..."
                                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-brandBlue focus:bg-slate-50/50 outline-none transition-all text-xs font-light"
                                />
                              )}
                            </div>
                          ) : (
                            <input
                              type="text"
                              required={q.required}
                              value={answers[q.id] || ''}
                              onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                              placeholder="Your answer..."
                              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-brandBlue focus:bg-slate-50/50 outline-none transition-all text-xs font-light"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cover Letter & Details</label>
                    <textarea
                      rows={5}
                      value={formData.coverLetter}
                      onChange={e => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                      placeholder="Tell us about yourself and why you'd like to work with us..."
                      className="w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-brandBlue focus:bg-slate-50/50 outline-none transition-all text-sm resize-none font-light"
                    />
                  </div>

                  {submitStatus === 'submitting' && fileUploadProgress && (
                    <p className="text-xs text-brandBlue font-semibold text-center mt-2 animate-pulse">{fileUploadProgress}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="bg-brandNavy hover:bg-brandNavy/95 text-white font-extrabold py-4 px-6 rounded-xl mt-4 disabled:opacity-50 active:scale-[0.98] transition-all text-sm select-none shadow-sm"
                  >
                    {submitStatus === 'submitting' ? 'Please wait...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        ) : isDetailsOpen && selectedJob ? (
          /* Sub-Page: Full Job Details View */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={() => setIsDetailsOpen(false)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-brandBlue transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> Back to All Positions
            </button>

            {/* Main Details Panel */}
            <div className="bg-white border border-brandNavy/10 rounded-2xl p-6 sm:p-12 shadow-sm flex flex-col gap-6">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-100">
                <div className="w-full">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-brandNavy tracking-tight leading-tight mt-2">
                    {selectedJob.title}
                  </h1>
                </div>
                <button
                  onClick={() => handleOpenApply(selectedJob)}
                  className="w-full md:w-auto h-12 px-6 text-xs font-bold uppercase tracking-widest rounded-xl bg-brandNavy text-white hover:bg-brandNavy/90 active:scale-[0.98] transition-all flex items-center justify-center whitespace-nowrap shadow-sm"
                >
                  Apply For This Position
                </button>
              </div>

              {/* Metadata Row */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 items-center text-xs text-slate-500 font-semibold py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-brandBlue" />
                  <span>{selectedJob.type === 'job' ? 'Full-Time Job' : 'Internship'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brandBlue" />
                  <span>{selectedJob.location_type || 'Remote'} ({selectedJob.location})</span>
                </div>

                {selectedJob.type === 'internship' && selectedJob.duration_months && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brandBlue" />
                    <span>Duration: {selectedJob.duration_months} Months</span>
                  </div>
                )}

                {!selectedJob.hide_pay && (selectedJob.min_pay || selectedJob.max_pay) ? (
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-750 px-3 py-1.5 rounded-lg border border-emerald-150">
                    <span>
                      {selectedJob.type === 'internship' ? 'Stipend' : 'Salary'}: 
                      {selectedJob.min_pay && ` ₹${Number(selectedJob.min_pay).toLocaleString('en-IN')}`}
                      {selectedJob.max_pay && ` - ₹${Number(selectedJob.max_pay).toLocaleString('en-IN')}`}
                      {selectedJob.type === 'internship' ? ' / month' : ' / year'}
                    </span>
                  </div>
                ) : selectedJob.hide_pay ? null : (
                  <div className="flex items-center gap-2 bg-slate-50 text-slate-650 px-3 py-1.5 rounded-lg border border-slate-150">
                    <span>{selectedJob.type === 'internship' ? 'Stipend: Unpaid' : 'Salary: Negotiable'}</span>
                  </div>
                )}
              </div>

              {/* Full Description Rich Text Body */}
              <div className="text-slate-700 text-base sm:text-lg leading-relaxed prose max-w-none py-6">
                <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
              </div>

              {/* Requirements Section */}
              {selectedJob.requirements && (
                <div className="pt-6 border-t border-slate-100 mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Requirements</h4>
                  <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed whitespace-pre-line">
                    {jobOpeningRequirements(selectedJob)}
                  </p>
                </div>
              )}

            </div>
          </motion.div>
        ) : (
          /* Normal Listings List View */
          <>
            {/* Header Hero Section (Simple & Short) */}
            <div className="max-w-3xl text-left pb-8">
              <Reveal>
                <h1 className="font-display text-3xl font-extrabold tracking-tight text-brandNavy sm:text-4xl lg:text-5xl leading-tight">
                  Careers at <span className="bg-gradient-to-r from-brandBlue to-brandNavy bg-clip-text text-transparent">Primescore.</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-slate-500 font-light leading-relaxed max-w-2xl">
                  Build the future of finance with us. Explore our open positions and internship opportunities below.
                </p>
              </Reveal>
            </div>

            {/* Tab Switcher & Headline */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brandNavy/10 pb-6">
              <div>
                <Reveal>
                  <h2 className="text-lg font-bold tracking-tight text-brandNavy">Open Positions</h2>
                  <p className="text-slate-400 text-xs mt-1">Find your match below</p>
                </Reveal>
              </div>

              <div className="flex gap-2 bg-slate-200/50 p-1.5 rounded-xl border border-slate-300/40 w-full sm:w-auto justify-center">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`rounded-lg px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all flex-1 sm:flex-none text-center ${
                    activeTab === 'all'
                      ? 'bg-brandNavy text-white shadow-sm'
                      : 'text-textSecondary hover:text-brandNavy'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('job')}
                  className={`rounded-lg px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all flex-1 sm:flex-none text-center ${
                    activeTab === 'job'
                      ? 'bg-brandNavy text-white shadow-sm'
                      : 'text-textSecondary hover:text-brandNavy'
                  }`}
                >
                  Jobs
                </button>
                <button
                  onClick={() => setActiveTab('internship')}
                  className={`rounded-lg px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all flex-1 sm:flex-none text-center ${
                    activeTab === 'internship'
                      ? 'bg-brandNavy text-white shadow-sm'
                      : 'text-textSecondary hover:text-brandNavy'
                  }`}
                >
                  Internships
                </button>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="mt-12">
              {loading ? (
                <div className="flex flex-col items-center py-20 gap-4">
                  <div className="h-10 w-10 rounded-full border-2 border-t-brandBlue border-slate-200 animate-spin" />
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Fetching positions...</p>
                </div>
              ) : filteredOpenings.length === 0 ? (
                <div className="rounded-2xl border border-brandNavy/10 bg-white p-8 sm:p-12 text-center max-w-2xl mx-auto my-12 shadow-sm">
                  <h3 className="text-xl font-bold text-brandNavy mb-2">No active openings right now</h3>
                  <p className="text-textSecondary text-sm leading-relaxed mb-8 font-light">
                    Submit a general application to our talent pool and we will contact you when a slot opens up.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedJob(null)
                      setFormData(prev => ({ ...prev, roleApplied: 'General Application (Talent Pool)' }))
                      setIsFormOpen(true)
                    }}
                    className="w-full sm:w-auto h-12 px-8 text-xs font-bold uppercase tracking-widest rounded-xl bg-brandNavy text-white hover:bg-brandNavy/90 active:scale-[0.98] transition-all flex items-center justify-center inline-flex"
                  >
                    Submit General Application
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-full">
                  {filteredOpenings.map(job => (
                    <div 
                      key={job.id} 
                      onClick={() => {
                        setSelectedJob(job)
                        setIsDetailsOpen(true)
                      }}
                      className="bg-white border border-brandNavy/10 rounded-2xl p-6 shadow-sm hover:shadow-card hover:-translate-y-1 hover:border-brandNavy/25 transition-all duration-300 cursor-pointer flex flex-col justify-between text-left"
                    >
                      <div>
                        <h3 className="text-lg font-extrabold text-brandNavy tracking-tight leading-snug mt-1 line-clamp-2">
                          {job.title}
                        </h3>
                        
                        {/* Compact metadata */}
                        <div className="flex flex-col gap-2 mt-4 text-xs text-slate-450 font-semibold">
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5 text-brandBlue" />
                            <span>{job.type === 'job' ? 'Full-Time' : 'Internship'}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-brandBlue" />
                            <span>{job.location_type || 'Remote'}</span>
                          </div>
                          {job.type === 'internship' && job.duration_months && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-brandBlue" />
                              <span>{job.duration_months} Months</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-brandBlue">
                        <span>View Details</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function jobOpeningRequirements(job: JobOpening) {
  return job.requirements
}

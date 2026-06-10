'use client'

import React, { useState, useEffect } from 'react'
import { createClient, User } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null as any

export default function AdminPortal() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(true)

  // Blog Form State
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [readTime, setReadTime] = useState('')
  const [authorName, setAuthorName] = useState('Primescore Team')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [publishMessage, setPublishMessage] = useState('')
  const [previewMode, setPreviewMode] = useState(false)

  // Webhook State
  const [triggering, setTriggering] = useState(false)
  const AWS_WEBHOOK_URL = "https://webhooks.amplify.ap-southeast-2.amazonaws.com/prod/webhooks?id=388aa409-ba68-41f5-8584-023f1587812b&token=hVt8caHwhF66OezrVJOQpVXejlYJBomFuaRHc"

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: authListener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null)
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setPreviewImageUrl(URL.createObjectURL(file))
    }
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    setPublishing(true)
    setPublishMessage('')

    try {
      let imageUrl = ''
      
      // 1. Upload Image
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `blog-covers/${fileName}`
        
        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(filePath, imageFile)

        if (uploadError) throw new Error(`Image Upload Failed: ${uploadError.message}`)

        const { data: publicUrlData } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filePath)
          
        imageUrl = publicUrlData.publicUrl
      }

      // 2. Insert into DB
      const { error: dbError } = await supabase.from('blogs').insert([{
        slug,
        title,
        excerpt,
        content,
        category,
        read_time: readTime,
        image: imageUrl,
        author_name: authorName,
        published_at: new Date().toISOString()
      }])

      if (dbError) throw new Error(`Database Error: ${dbError.message}`)

      setPublishMessage('Blog successfully published to database!')
      // Reset form
      setTitle(''); setSlug(''); setExcerpt(''); setContent(''); setCategory(''); setReadTime(''); setImageFile(null); setPreviewImageUrl(null); setPreviewMode(false);
    } catch (err: any) {
      setPublishMessage(`Error: ${err.message}`)
    } finally {
      setPublishing(false)
    }
  }

  const handleTriggerWebhook = async () => {
    setTriggering(true)
    try {
      await fetch(AWS_WEBHOOK_URL, { method: 'POST', mode: 'no-cors' })
      alert('Webhook triggered successfully! AWS Amplify is rebuilding your site now.')
    } catch (err: any) {
      alert(`Webhook Error: ${err.message}`)
    } finally {
      setTriggering(false)
    }
  }

  if (loading) return <div className="p-20 text-center">Loading...</div>

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm w-full max-w-md border border-gray-100">
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-8 text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {loginError && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">{loginError}</div>}
            <input 
              type="email" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all bg-gray-50"
            />
            <input 
              type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all bg-gray-50"
            />
            <button type="submit" className="bg-[#10b981] text-white font-bold p-4 rounded-xl mt-4 hover:bg-emerald-600 transition-colors shadow-sm">
              Secure Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <img src="/Logo-primescore.png" alt="Primescore" className="h-8" />
            <h1 className="text-xl font-display font-bold text-gray-900">Blog Portal</h1>
          </div>
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 font-bold transition-colors text-sm px-4 py-2 rounded-lg hover:bg-red-50">Log Out</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Editor/Preview Column */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-900">{previewMode ? 'Blog Preview' : 'Write New Post'}</h2>
              <button 
                type="button" 
                onClick={() => setPreviewMode(!previewMode)}
                className="text-sm font-bold text-[#10b981] bg-green-50 px-5 py-2.5 rounded-xl hover:bg-green-100 transition-colors w-full sm:w-auto"
              >
                {previewMode ? 'Back to Editor' : 'Preview Blog'}
              </button>
            </div>

            {previewMode ? (
              <div className="preview-container">
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                    <span className="bg-green-100 text-[#10b981] px-4 py-1.5 rounded-full font-bold">{category || 'Category'}</span>
                    <span>{readTime || 'Read Time'}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight mb-6">
                    {title || 'Your Blog Title'}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
                    {excerpt || 'Your short excerpt will appear here.'}
                  </p>
                  <div className="flex items-center gap-4 border-y border-gray-100 py-6 mb-8">
                    <div>
                      <div className="font-bold text-gray-900">{authorName || 'Author Name'}</div>
                      <div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  </div>
                  {previewImageUrl ? (
                    <img src={previewImageUrl} alt="Cover" className="w-full aspect-video sm:aspect-[21/9] object-cover rounded-2xl sm:rounded-3xl mb-10 shadow-sm" />
                  ) : (
                    <div className="w-full aspect-video sm:aspect-[21/9] bg-gray-100 rounded-2xl sm:rounded-3xl mb-10 flex items-center justify-center text-gray-400 font-medium">No Cover Image Selected</div>
                  )}
                </div>
                <div 
                  className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400 italic">Start writing your content to see it here...</p>' }}
                />
              </div>
            ) : (
              <form onSubmit={handlePublish} className="flex flex-col gap-5 sm:gap-6">
                <input type="text" placeholder="Post Title" required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all font-bold text-lg" />
                <input type="text" placeholder="URL Slug (e.g., how-to-fix-cibil)" required value={slug} onChange={e => setSlug(e.target.value)} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <input type="text" placeholder="Category" required value={category} onChange={e => setCategory(e.target.value)} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all" />
                  <input type="text" placeholder="Read Time (e.g., 5 min read)" required value={readTime} onChange={e => setReadTime(e.target.value)} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all" />
                </div>
                <input type="text" placeholder="Author Name" required value={authorName} onChange={e => setAuthorName(e.target.value)} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all" />
                <textarea placeholder="Short Excerpt" required value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all resize-none" />
                
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold text-gray-700">Cover Image</label>
                  <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-green-50 hover:border-green-200 transition-colors">
                    <input type="file" accept="image/*" onChange={handleImageChange} required={!imageFile} className="w-full text-sm font-medium text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#10b981] file:text-white hover:file:bg-emerald-600 file:cursor-pointer" />
                  </div>
                  {previewImageUrl && <img src={previewImageUrl} alt="Preview" className="h-20 w-32 object-cover rounded-lg border border-gray-200 shadow-sm mt-2" />}
                </div>

                <div className="flex flex-col gap-3 mt-2 sm:mt-4">
                  <label className="text-sm font-bold text-gray-700 flex justify-between">
                    <span>Content Body</span>
                    <span className="text-gray-400 font-normal text-xs sm:text-sm">HTML formatting supported</span>
                  </label>
                  <textarea placeholder="Write your blog content here... Use <h2>, <p>, <ul> etc." required value={content} onChange={e => setContent(e.target.value)} rows={15} className="w-full p-4 sm:p-5 rounded-2xl border border-gray-200 bg-gray-50 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all font-mono text-sm leading-relaxed resize-none" />
                </div>

                {publishMessage && (
                  <div className={`p-4 sm:p-5 rounded-2xl text-sm font-bold ${publishMessage.includes('Error') ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-[#10b981] border border-green-100'}`}>
                    {publishMessage}
                  </div>
                )}

                <button type="submit" disabled={publishing} className="w-full bg-[#10b981] text-white font-bold py-4 sm:py-5 rounded-xl mt-2 sm:mt-4 disabled:opacity-50 hover:bg-emerald-600 transition-colors shadow-sm text-base sm:text-lg">
                  {publishing ? 'Publishing to Database...' : 'Publish Blog Post'}
                </button>
              </form>
            )}
          </div>

          {/* Webhook Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-32">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
              </div>
              <h2 className="text-xl font-display font-bold text-gray-900 mb-4">Go Live</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Because your site is highly optimized and static, new blogs will not automatically appear on the live site. <br/><br/>Click this button to trigger an AWS Amplify rebuild and push your changes to production.
              </p>
              <button 
                onClick={handleTriggerWebhook} 
                disabled={triggering}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl disabled:opacity-50 hover:bg-gray-800 transition-colors shadow-md"
              >
                {triggering ? 'Triggering Rebuild...' : 'Trigger AWS Rebuild'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

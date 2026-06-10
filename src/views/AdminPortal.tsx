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
  const [publishing, setPublishing] = useState(false)
  const [publishMessage, setPublishMessage] = useState('')

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
      setImageFile(e.target.files[0])
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
      setTitle(''); setSlug(''); setExcerpt(''); setContent(''); setCategory(''); setReadTime(''); setImageFile(null);
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
        <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {loginError && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{loginError}</div>}
            <input 
              type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required
              className="p-3 rounded-lg border border-gray-200 outline-none focus:border-[#10b981]"
            />
            <input 
              type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
              className="p-3 rounded-lg border border-gray-200 outline-none focus:border-[#10b981]"
            />
            <button type="submit" className="bg-[#10b981] text-white font-bold p-3 rounded-lg mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Admin Dashboard</h1>
          <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900 font-medium">Logout</button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Editor Column */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Write New Post</h2>
            <form onSubmit={handlePublish} className="flex flex-col gap-4">
              <input type="text" placeholder="Post Title" required value={title} onChange={e => setTitle(e.target.value)} className="p-3 rounded-lg border border-gray-200" />
              <input type="text" placeholder="URL Slug (e.g., how-to-fix-cibil)" required value={slug} onChange={e => setSlug(e.target.value)} className="p-3 rounded-lg border border-gray-200" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Category" required value={category} onChange={e => setCategory(e.target.value)} className="p-3 rounded-lg border border-gray-200" />
                <input type="text" placeholder="Read Time (e.g., 5 min read)" required value={readTime} onChange={e => setReadTime(e.target.value)} className="p-3 rounded-lg border border-gray-200" />
              </div>
              <input type="text" placeholder="Author Name" required value={authorName} onChange={e => setAuthorName(e.target.value)} className="p-3 rounded-lg border border-gray-200" />
              <textarea placeholder="Short Excerpt" required value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} className="p-3 rounded-lg border border-gray-200" />
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Cover Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} required className="text-sm" />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-sm font-bold text-gray-700">Content (HTML allowed)</label>
                <textarea placeholder="Write your blog content here..." required value={content} onChange={e => setContent(e.target.value)} rows={15} className="p-3 rounded-lg border border-gray-200 font-mono text-sm" />
              </div>

              {publishMessage && (
                <div className={`p-4 rounded-xl text-sm font-bold ${publishMessage.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-[#10b981]'}`}>
                  {publishMessage}
                </div>
              )}

              <button type="submit" disabled={publishing} className="bg-[#10b981] text-white font-bold py-4 rounded-xl mt-4 disabled:opacity-50">
                {publishing ? 'Publishing to Database...' : 'Publish Blog Post'}
              </button>
            </form>
          </div>

          {/* Webhook Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4">Live Site Rebuild</h2>
              <p className="text-sm text-gray-600 mb-4">
                Because your site is highly optimized and static, new blogs will not appear on the live site until you trigger a rebuild.
              </p>
              <button 
                onClick={handleTriggerWebhook} 
                disabled={triggering}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl disabled:opacity-50"
              >
                {triggering ? 'Triggering...' : 'Trigger AWS Rebuild'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

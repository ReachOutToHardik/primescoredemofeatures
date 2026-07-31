'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { supabase } from '../../../src/lib/supabase'
import { getBlogsServer, deleteBlogServer } from '../../actions/blogs'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAdminContext } from '../AdminContext'
import { 
  Eye, 
  Edit, 
  Trash2, 
  Upload, 
  Link2, 
  ArrowLeft, 
  Save, 
  FileText,
  Plus,
  Compass,
  Clock,
  User,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  const items = [
    { label: 'B', action: () => editor.chain().focus().toggleBold().run(), active: 'bold', style: 'font-bold' },
    { label: 'I', action: () => editor.chain().focus().toggleItalic().run(), active: 'italic', style: 'italic' },
    { label: 'S', action: () => editor.chain().focus().toggleStrike().run(), active: 'strike', style: 'line-through' },
    { label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: 'heading' },
    { label: 'H3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: 'heading' },
    { label: '• List', action: () => editor.chain().focus().toggleBulletList().run(), active: 'bulletList' },
    { label: '1. List', action: () => editor.chain().focus().toggleOrderedList().run(), active: 'orderedList' },
  ]

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-3 bg-slate-50 border-b border-slate-200 rounded-t-2xl">
      {items.map((item, idx) => {
        const isActive = item.active === 'heading' 
          ? editor.isActive('heading', { level: item.label === 'H2' ? 2 : 3 }) 
          : editor.isActive(item.active)

        return (
          <button
            key={idx}
            type="button"
            onClick={item.action}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isActive 
                ? 'bg-[#10b981] text-white' 
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            } ${item.style || ''}`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export default function BlogEditorPage() {
  // Blog Form State
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [isSlugManual, setIsSlugManual] = useState(false)
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [readTime, setReadTime] = useState('')
  const [authorName, setAuthorName] = useState('Primescore Team')
  
  // Image Setup (Dual mode: file or URL)
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null)
  
  const [publishing, setPublishing] = useState(false)
  const [publishMessage, setPublishMessage] = useState<{ text: string, type: 'success' | 'error' | null }>({ text: '', type: null })
  const [previewMode, setPreviewMode] = useState(false)
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
  
  // Manage Posts State
  const [allBlogs, setAllBlogs] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loadingBlogs, setLoadingBlogs] = useState(true)
  const { fetchSignal } = useAdminContext()

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true)
      const res = await getBlogsServer()
      if (res.success) {
        setAllBlogs(res.blogs)
      } else {
        console.error('Error fetching blogs:', res.error)
      }
    } catch (err) {
      console.error('Error fetching blogs:', err)
    } finally {
      setLoadingBlogs(false)
    }
  }

  // Slug auto-generation from Title
  useEffect(() => {
    if (!isSlugManual && !editingPostId) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') 
        .replace(/\s+/g, '-')         
        .replace(/-+/g, '-')          
        .trim()
      setSlug(generated)
    }
  }, [title, isSlugManual, editingPostId])

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate prose-sm sm:prose-base focus:outline-none min-h-[300px] p-5 max-w-none text-slate-800',
      },
    },
  })

  // Keep editor content in sync with state when editing
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  useEffect(() => {
    fetchBlogs()
  }, [fetchSignal])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setPreviewImageUrl(URL.createObjectURL(file))
      setImageUrlInput('')
    }
  }

  const handleUrlImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setImageUrlInput(val)
    setPreviewImageUrl(val)
    setImageFile(null)
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      setPublishMessage({ text: 'Supabase client is not initialized.', type: 'error' })
      return
    }
    setPublishing(true)
    setPublishMessage({ text: '', type: null })

    try {
      let finalImageUrl = ''
      
      // 1. Upload Image (if in upload mode and file selected)
      if (imageMode === 'upload' && imageFile) {
        // Compress Image to WebP on Client-Side
        const compressToWebP = (file: File): Promise<Blob> => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = URL.createObjectURL(file)
            img.onload = () => {
              const canvas = document.createElement('canvas')
              const ctx = canvas.getContext('2d')
              if (!ctx) return reject(new Error('Canvas context not available'))

              // Max out width at 1000px to maintain crisp layout while reducing file size drastically
              const maxDim = 1000
              let width = img.width
              let height = img.height

              if (width > maxDim || height > maxDim) {
                if (width > height) {
                  height = Math.round((height * maxDim) / width)
                  width = maxDim
                } else {
                  width = Math.round((width * maxDim) / height)
                  height = maxDim
                }
              }

              canvas.width = width
              canvas.height = height
              ctx.drawImage(img, 0, 0, width, height)

              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    resolve(blob)
                  } else {
                    reject(new Error('Canvas toBlob conversion failed'))
                  }
                },
                'image/webp',
                0.8 // 80% compression quality
              )
            }
            img.onerror = (err) => reject(err)
          })
        }

        let uploadBlob: Blob = imageFile
        try {
          uploadBlob = await compressToWebP(imageFile)
        } catch (compErr) {
          console.warn('Client-side compression fallback to raw file upload:', compErr)
        }

        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.webp`
        const filePath = `blog-covers/${fileName}`
        
        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(filePath, uploadBlob, {
            contentType: 'image/webp',
            cacheControl: '31536000', // Cache forever (1 year) to save egress
            upsert: false
          })

        if (uploadError) {
          throw new Error(`Image Upload Failed: ${uploadError.message}. (Try switching to "Image URL" mode instead if bucket RLS restricts you)`)
        }

        const { data: publicUrlData } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filePath)
          
        finalImageUrl = publicUrlData.publicUrl
      } else if (imageMode === 'url' && imageUrlInput) {
        finalImageUrl = imageUrlInput
      } else if (existingImageUrl) {
        finalImageUrl = existingImageUrl
      } else {
        throw new Error("Cover image is required. Provide an upload file or direct image URL link.")
      }

      // 2. Insert or Update DB
      const blogPayload = {
        slug, 
        title, 
        excerpt, 
        content, 
        category, 
        read_time: readTime, 
        image: finalImageUrl, 
        author_name: authorName
      }

      if (editingPostId) {
        const { error: dbError } = await supabase.from('blogs').update(blogPayload).eq('id', editingPostId)
        if (dbError) throw new Error(`Database Update Error: ${dbError.message}. Make sure the table allows writes under RLS settings.`)
        setPublishMessage({ text: 'Blog post successfully updated!', type: 'success' })
      } else {
        const { error: dbError } = await supabase.from('blogs').insert([{
          ...blogPayload,
          published_at: new Date().toISOString()
        }])
        
        if (dbError) throw new Error(`Database Insert Error: ${dbError.message}. Make sure the table allows writes under RLS settings.`)
        setPublishMessage({ text: 'Blog post successfully published!', type: 'success' })
      }

      // Refresh list & reset form
      fetchBlogs()
      setTimeout(() => {
        handleCancelEdit()
        setPublishMessage({ text: '', type: null })
      }, 1500)
    } catch (err: any) {
      console.error('Publish error:', err)
      setPublishMessage({ text: err.message || 'Operation failed.', type: 'error' })
    } finally {
      setPublishing(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return
    
    try {
      const res = await deleteBlogServer(id)
      if (!res.success) {
        alert(`Error deleting post: ${res.error}`)
      } else {
        alert('Blog post deleted successfully!')
        fetchBlogs()
        if (editingPostId === id) handleCancelEdit()
      }
    } catch (err: any) {
      alert(`Delete operation failed: ${err.message}`)
    }
  }

  const handleEdit = (blog: any) => {
    setEditingPostId(blog.id)
    setTitle(blog.title)
    setSlug(blog.slug)
    setIsSlugManual(true)
    setExcerpt(blog.excerpt)
    setContent(blog.content)
    setCategory(blog.category)
    setReadTime(blog.read_time)
    setAuthorName(blog.author_name)
    setExistingImageUrl(blog.image)
    setPreviewImageUrl(blog.image)
    setImageFile(null)
    
    if (blog.image?.includes('blog-covers/')) {
      setImageMode('upload')
    } else {
      setImageMode('url')
      setImageUrlInput(blog.image || '')
    }

    setPreviewMode(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingPostId(null)
    setTitle('')
    setSlug('')
    setIsSlugManual(false)
    setExcerpt('')
    setContent('')
    setCategory('')
    setReadTime('')
    setImageFile(null)
    setImageUrlInput('')
    setPreviewImageUrl(null)
    setExistingImageUrl(null)
    setPreviewMode(false)
  }

  const filteredBlogs = allBlogs.filter(blog => 
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="py-2 flex flex-col gap-8 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Blog Editor</h1>
          <p className="text-slate-500 text-sm mt-1">Create, update, and manage your credit guides and articles.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            type="button" 
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-5 py-2.5 rounded-xl hover:bg-emerald-100 transition-all w-full sm:w-auto active:scale-95 shadow-sm"
          >
            {previewMode ? <Edit size={16} /> : <Eye size={16} />}
            {previewMode ? 'Back to Editor' : 'Live Preview'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Editor Form / Preview Column */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          {previewMode ? (
            <div className="preview-container text-slate-800">
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">{category || 'Category'}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {readTime || '5 min read'}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                  {title || 'Your Blog Post Title'}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed mb-6 border-l-2 border-[#10b981] pl-4 italic">
                  {excerpt || 'Your short post summary/excerpt will appear here.'}
                </p>
                <div className="flex items-center gap-3 border-y border-slate-100 py-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    {authorName[0]?.toUpperCase() || 'P'}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{authorName || 'Author Name'}</div>
                    <div className="text-xs text-slate-400">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                </div>
                {previewImageUrl ? (
                  <img src={previewImageUrl} alt="Cover Preview" className="w-full aspect-[21/9] object-cover rounded-2xl mb-8 border border-slate-200 shadow-sm" />
                ) : (
                  <div className="w-full aspect-[21/9] bg-slate-50 border border-slate-200 rounded-2xl mb-8 flex items-center justify-center text-slate-400 text-sm font-medium">
                    No Cover Image Configured
                  </div>
                )}
              </div>
              <div 
                className="prose prose-slate max-w-none text-slate-700 leading-relaxed border-t border-slate-100 pt-6"
                dangerouslySetInnerHTML={{ __html: content || '<p class="text-slate-400 italic">No content written yet...</p>' }}
              />
            </div>
          ) : (
            <form onSubmit={handlePublish} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Post Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., How to Repair Your CIBIL Score After Default" 
                  required 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-[#10b981] transition-all text-sm font-bold placeholder-slate-400" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 tracking-wider uppercase">URL Slug</label>
                  <input 
                    type="text" 
                    placeholder="how-to-repair-cibil-score" 
                    required 
                    value={slug} 
                    onChange={e => {
                      setSlug(e.target.value)
                      setIsSlugManual(true)
                    }} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-[#10b981] transition-all text-sm placeholder-slate-400 font-mono" 
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Category</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Credit Repair, Loans" 
                    required 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-[#10b981] transition-all text-sm placeholder-slate-400" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Estimated Read Time</label>
                  <select 
                    required 
                    value={readTime} 
                    onChange={e => setReadTime(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-[#10b981] transition-all text-sm cursor-pointer"
                  >
                    <option value="" disabled className="text-slate-450">Select duration</option>
                    {[2,3,4,5,6,7,8,9,10,12,15].map(min => (
                      <option key={min} value={`${min} min read`}>{min} min read</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Author Credit</label>
                  <input 
                    type="text" 
                    placeholder="Primescore Team" 
                    required 
                    value={authorName} 
                    onChange={e => setAuthorName(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-[#10b981] transition-all text-sm placeholder-slate-400" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Short Summary (Excerpt)</label>
                <textarea 
                  placeholder="Summarize the article in 2-3 sentences. Displays on the blog cards." 
                  required 
                  value={excerpt} 
                  onChange={e => setExcerpt(e.target.value)} 
                  rows={2} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-[#10b981] transition-all text-sm resize-none placeholder-slate-400 leading-relaxed" 
                />
              </div>

              {/* Cover Image Setup (Dual mode upload vs. text URL input) */}
              <div className="flex flex-col gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Cover Image</span>
                  <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setImageMode('upload')}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                        imageMode === 'upload' ? 'bg-[#10b981] text-white' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Upload size={12} /> Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode('url')}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                        imageMode === 'url' ? 'bg-[#10b981] text-white' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Link2 size={12} /> Image URL
                    </button>
                  </div>
                </div>

                {imageMode === 'upload' ? (
                  <div className="flex flex-col gap-3">
                    <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500/40 p-5 rounded-xl bg-white flex flex-col items-center justify-center text-center cursor-pointer transition-all relative shadow-sm">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        required={!existingImageUrl && !imageFile}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      />
                      <Upload className="text-slate-400 mb-2" size={24} />
                      <span className="text-xs font-semibold text-slate-500">
                        {imageFile ? imageFile.name : 'Select cover image file'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/photo-..." 
                    value={imageUrlInput} 
                    onChange={handleUrlImageChange} 
                    required={!existingImageUrl && !imageUrlInput}
                    className="w-full px-4 py-3 rounded-xl border border-slate-250 bg-white text-slate-900 outline-none focus:border-[#10b981] transition-all text-sm placeholder-slate-400 font-mono" 
                  />
                )}

                {previewImageUrl && (
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <img src={previewImageUrl} alt="Mini Preview" className="h-10 w-16 object-cover rounded-lg border border-slate-200" />
                    <span className="text-xs text-slate-500 truncate max-w-xs font-mono">Image Configured</span>
                  </div>
                )}
              </div>

              {/* Tiptap rich editor */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Content Body</label>
                <div className="bg-white border border-slate-250 rounded-2xl overflow-hidden focus-within:border-[#10b981] transition-all shadow-sm">
                  <MenuBar editor={editor} />
                  <div className="min-h-[300px]">
                    <EditorContent editor={editor} />
                  </div>
                </div>
              </div>

              {/* Status Message */}
              {publishMessage.text && (
                <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                  publishMessage.type === 'success' 
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                    : 'bg-red-50 border-red-100 text-red-700'
                }`}>
                  {publishMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {publishMessage.text}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-4">
                {editingPostId && (
                  <button 
                    type="button" 
                    onClick={handleCancelEdit} 
                    className="w-1/3 bg-transparent text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-800 py-3.5 rounded-xl transition-all text-sm font-semibold active:scale-95"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  type="submit" 
                  disabled={publishing} 
                  className={`flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl disabled:opacity-50 text-sm transition-all text-white bg-[#10b981] hover:bg-emerald-600 shadow-lg shadow-emerald-500/10 active:scale-95 ${
                    editingPostId ? 'w-2/3' : 'w-full'
                  }`}
                >
                  <Save size={16} />
                  {publishing ? (editingPostId ? 'Updating Post...' : 'Publishing Post...') : (editingPostId ? 'Save Changes' : 'Publish Blog Post')}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Manage Posts Sidebar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col gap-6 max-h-[850px] shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-md font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText size={18} className="text-emerald-600" /> Manage Posts
            </h2>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-55 border border-slate-150 px-2 py-0.5 rounded-md">
              {filteredBlogs.length} posts
            </span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:border-[#10b981] transition-all text-xs placeholder-slate-400"
            />
          </div>

          {loadingBlogs ? (
            <div className="flex flex-col gap-3 animate-pulse">
              <div className="h-20 w-full bg-slate-50 rounded-2xl"></div>
              <div className="h-20 w-full bg-slate-50 rounded-2xl"></div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <p className="text-slate-500 text-xs py-8 text-center">No matching posts found.</p>
          ) : (
            <div className="flex flex-col gap-3 overflow-y-auto pr-1">
              {filteredBlogs.map(blog => (
                <div key={blog.id} className="p-4 rounded-2xl border border-slate-150 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-xs truncate" title={blog.title}>{blog.title}</h3>
                      <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1 uppercase tracking-wider">
                        {blog.category}
                      </span>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button 
                        onClick={() => handleEdit(blog)}
                        className="text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-100 p-1.5 rounded-lg transition-all active:scale-90"
                        title="Edit Post"
                      >
                        <Edit size={12} />
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="text-rose-600 hover:text-rose-800 bg-rose-50 border border-rose-100 p-1.5 rounded-lg transition-all active:scale-90"
                        title="Delete Post"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-450 border-t border-slate-100 pt-2.5">
                    <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}</span>
                    <span className="flex items-center gap-1 bg-white border border-slate-150 px-2 py-0.5 rounded-md font-medium text-slate-500">
                      <Eye size={10} /> {blog.views || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



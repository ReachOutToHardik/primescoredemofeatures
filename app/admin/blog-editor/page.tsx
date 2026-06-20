'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { supabase } from '../../../src/lib/supabase'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 border-b border-gray-200 rounded-t-2xl">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${editor.isActive('bold') ? 'bg-[#10b981] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'}`}>B</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-3 py-1.5 rounded-lg text-sm font-bold italic transition-colors ${editor.isActive('italic') ? 'bg-[#10b981] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'}`}>I</button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`px-3 py-1.5 rounded-lg text-sm font-bold line-through transition-colors ${editor.isActive('strike') ? 'bg-[#10b981] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'}`}>S</button>
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-[#10b981] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'}`}>H2</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-[#10b981] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'}`}>H3</button>
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${editor.isActive('bulletList') ? 'bg-[#10b981] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'}`}>• List</button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${editor.isActive('orderedList') ? 'bg-[#10b981] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'}`}>1. List</button>
    </div>
  )
}

export default function BlogEditorPage() {
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
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [publishMessage, setPublishMessage] = useState('')
  const [previewMode, setPreviewMode] = useState(false)
  const [editingPostId, setEditingPostId] = useState<string | null>(null)

  // Manage Posts State
  const [allBlogs, setAllBlogs] = useState<any[]>([])

  const fetchBlogs = async () => {
    if (!supabase) return
    const { data } = await supabase.from('blogs').select('*').order('published_at', { ascending: false })
    setAllBlogs(data || [])
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[250px] p-4 sm:p-5 max-w-none',
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  useEffect(() => {
    fetchBlogs()
  }, [supabase])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setPreviewImageUrl(URL.createObjectURL(file))
    }
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      alert('Error: Supabase is not initialized. Please try logging out and logging back in.')
      setPublishMessage('Error: Supabase is not initialized.')
      return
    }
    setPublishing(true)
    setPublishMessage('')

    try {
      let imageUrl = ''
      
      // 1. Upload Image
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `blog-covers/${fileName}`
        
        console.log('Uploading image to supabase...', filePath)
        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          console.error('Upload error details:', uploadError)
          throw new Error(`Image Upload Failed: ${uploadError.message}. Make sure the 'blog-images' storage bucket is public and has correct RLS policies.`)
        }

        const { data: publicUrlData } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filePath)
          
        imageUrl = publicUrlData.publicUrl
        console.log('Image uploaded successfully. URL:', imageUrl)
      } else if (existingImageUrl) {
        imageUrl = existingImageUrl
      } else {
        throw new Error("Cover image is required.")
      }

      // 2. Insert or Update DB
      console.log('Inserting/updating blog details in database...')
      if (editingPostId) {
        const { error: dbError } = await supabase.from('blogs').update({
          slug, title, excerpt, content, category, read_time: readTime, image: imageUrl, author_name: authorName
        }).eq('id', editingPostId)
        if (dbError) throw new Error(`Database Error: ${dbError.message}`)
        setPublishMessage('Blog successfully updated!')
        alert('Blog successfully updated!')
      } else {
        const { error: dbError } = await supabase.from('blogs').insert([{
          slug, title, excerpt, content, category, read_time: readTime, image: imageUrl, author_name: authorName, published_at: new Date().toISOString()
        }])
        if (dbError) throw new Error(`Database Error: ${dbError.message}`)
        setPublishMessage('Blog successfully published to database!')
        alert('Blog successfully published to database!')
      }

      // Reset form
      handleCancelEdit()
      fetchBlogs(); // Refresh list
    } catch (err: any) {
      console.error('Publish error:', err)
      setPublishMessage(`Error: ${err.message}`)
      alert(`Failed to publish: ${err.message}`)
    } finally {
      setPublishing(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return
    if (!supabase) {
      alert('Error: Supabase is not initialized.')
      return
    }
    
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (error) {
      alert(`Error deleting post: ${error.message}`)
    } else {
      fetchBlogs()
      if (editingPostId === id) handleCancelEdit()
    }
  }

  const handleEdit = (blog: any) => {
    setEditingPostId(blog.id)
    setTitle(blog.title)
    setSlug(blog.slug)
    setExcerpt(blog.excerpt)
    setContent(blog.content)
    setCategory(blog.category)
    setReadTime(blog.read_time)
    setAuthorName(blog.author_name)
    setExistingImageUrl(blog.image)
    setPreviewImageUrl(blog.image)
    setImageFile(null)
    setPreviewMode(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingPostId(null)
    setTitle(''); setSlug(''); setExcerpt(''); setContent(''); setCategory(''); setReadTime(''); setImageFile(null); setPreviewImageUrl(null); setExistingImageUrl(null); setPreviewMode(false);
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Editor/Preview Column */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl font-display font-bold text-gray-900">{previewMode ? 'Blog Preview' : (editingPostId ? 'Edit Post' : 'Write New Post')}</h2>
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
                <div className="relative">
                  <select required value={readTime} onChange={e => setReadTime(e.target.value)} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all appearance-none cursor-pointer">
                    <option value="" disabled>Select Read Time</option>
                    {[1,2,3,4,5,6,7,8,9,10,12,15].map(min => (
                      <option key={min} value={`${min} min read`}>{min} min read</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
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
                  <span className="text-gray-400 font-normal text-xs sm:text-sm">Rich formatting available</span>
                </label>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden focus-within:border-[#10b981] focus-within:ring-1 focus-within:ring-[#10b981] transition-all">
                  <MenuBar editor={editor} />
                  <EditorContent editor={editor} />
                </div>
              </div>

              {publishMessage && (
                <div className={`p-4 sm:p-5 rounded-2xl text-sm font-bold ${publishMessage.includes('Error') ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-[#10b981] border border-green-100'}`}>
                  {publishMessage}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-2 sm:mt-4">
                {editingPostId && (
                  <button type="button" onClick={handleCancelEdit} className="w-full sm:w-1/3 bg-white text-gray-700 border border-gray-200 font-bold py-4 sm:py-5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-base sm:text-lg">
                    Cancel
                  </button>
                )}
                <button type="submit" disabled={publishing} className={`w-full ${editingPostId ? 'sm:w-2/3' : ''} bg-[#10b981] text-white font-bold py-4 sm:py-5 rounded-xl disabled:opacity-50 hover:bg-emerald-600 transition-colors shadow-sm text-base sm:text-lg`}>
                  {publishing ? (editingPostId ? 'Updating...' : 'Publishing...') : (editingPostId ? 'Save Changes' : 'Publish Blog Post')}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Manage Posts Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 h-full max-h-[800px] overflow-y-auto">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-6 sticky top-0 bg-white pb-2 border-b border-gray-100 z-10">Manage Posts</h2>
            
            {allBlogs.length === 0 ? (
              <p className="text-gray-500 text-sm">No posts found.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {allBlogs.map(blog => (
                  <div key={blog.id} className="p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors bg-gray-50 flex flex-col gap-3">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{blog.title}</h3>
                        <div className="flex gap-1 flex-shrink-0">
                          <button 
                            onClick={() => handleEdit(blog)}
                            className="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 p-1.5 rounded-lg transition-colors"
                            title="Edit Post"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(blog.id)}
                            className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition-colors"
                            title="Delete Post"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-[#10b981] font-bold">{blog.category}</div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                      <div className="flex items-center gap-1 font-medium bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        {blog.views || 0}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

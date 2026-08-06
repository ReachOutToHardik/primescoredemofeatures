'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'

export default function Blog({ initialBlogs = [], dict, locale = 'en' }: { initialBlogs: any[]; dict?: any; locale?: string }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Translation values helper
  const t = dict?.blog || {
    title: "Knowledge Hub",
    titleColored: "Hub",
    subtitle: "Expert insights, step-by-step guides, and financial tips from industry specialists to help you build and maintain exceptional credit health.",
    noBlogsFound: "No blog posts found.",
    allCategory: "All",
    readFullArticle: "Read Full Article",
    noPostsInCategory: "No posts found in this category.",
    readTimeSuffix: "read"
  }

  if (!initialBlogs || initialBlogs.length === 0) {
    return (
      <div className="pt-32 pb-20 lg:pt-40 lg:pb-24 min-h-screen bg-gray-50 flex flex-col justify-center items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-t-[#10b981] border-green-100 animate-spin"></div>
        <p className="text-xl text-gray-500 font-medium">{t.noBlogsFound}</p>
      </div>
    )
  }

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(initialBlogs.map(b => b.category)))]

  // Filtered post list
  const filteredBlogs = selectedCategory === 'All' 
    ? initialBlogs 
    : initialBlogs.filter(b => b.category === selectedCategory)

  const featuredPost = filteredBlogs[0]
  const restPosts = filteredBlogs.slice(1)

  const localePath = locale === 'en' ? '' : `/${locale}`

  return (
    <div className="pt-32 pb-24 lg:pt-40 lg:pb-32 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left">
          <h1 className="font-display text-5xl font-extrabold text-gray-900 sm:text-7xl tracking-tight leading-none mb-6">
            {t.title.split(' ')[0]} <span className="text-[#10b981]">{t.titleColored}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2.5 mb-12 pb-4 border-b border-gray-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'All' ? 'All' : cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white shadow-md scale-[1.02]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'All' ? t.allCategory : cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link 
            href={`${localePath}/blog/${featuredPost.slug}`}
            className="group grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-20 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 cursor-pointer"
          >
            <div className="lg:col-span-7 h-[300px] sm:h-[400px] lg:h-auto overflow-hidden relative">
              <div className="absolute inset-0 bg-black/5 z-10 transition-colors group-hover:bg-transparent" />
              <Image 
                src={featuredPost.image || '/placeholder.jpg'} 
                alt={featuredPost.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-[#10b981] text-xs font-bold uppercase tracking-wider mb-6">
                  {featuredPost.category}
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight group-hover:text-[#10b981] transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 line-clamp-4">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-[#10b981] font-bold group-hover:gap-3 transition-all duration-300">
                {t.readFullArticle} <ArrowRight className="h-5 w-5 animate-pulse" />
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {restPosts.map((post) => (
            <Link 
              key={post.id}
              href={`${localePath}/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-56 overflow-hidden relative">
                <Image 
                  src={post.image || '/placeholder.jpg'} 
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-xs font-extrabold text-[#10b981] uppercase tracking-wider mb-3.5">
                  {post.category}
                </span>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-4 line-clamp-2 leading-snug group-hover:text-[#10b981] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50 mt-auto">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-400 to-[#10b981] text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
                    {post.author_name ? post.author_name[0].toUpperCase() : 'P'}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">{post.author_name || 'Primescore Team'}</p>
                    <div className="flex items-center gap-2 text-gray-400 mt-0.5 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.read_time ? post.read_time.replace('read', t.readTimeSuffix) : `5 ${t.readTimeSuffix}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500 font-medium">{t.noPostsInCategory}</p>
          </div>
        )}

      </div>
    </div>
  )
}

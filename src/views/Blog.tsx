'use client'

import Link from 'next/link'
import { BLOG_POSTS } from '../data/blogPosts'
import { ArrowRight, Clock } from 'lucide-react'

export default function Blog() {
  return (
    <div className="py-20 lg:py-24 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="font-display text-4xl font-bold text-gray-900 sm:text-6xl tracking-tight">
            Knowledge <span className="text-[#10b981]">Hub</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            Expert insights, guides, and tips to help you master your credit health and financial future.
          </p>
        </div>

        {/* Featured Post */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
          <div className="h-[400px] lg:h-full">
            <img 
              src={BLOG_POSTS[0].image} 
              alt={BLOG_POSTS[0].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 lg:p-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-[#10b981] text-sm font-bold mb-6">
              {BLOG_POSTS[0].category}
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {BLOG_POSTS[0].title}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {BLOG_POSTS[0].excerpt}
            </p>
            <Link 
              href={`/blog/${BLOG_POSTS[0].slug}`}
              className="inline-flex items-center gap-2 text-[#10b981] font-bold hover:gap-3 transition-all"
            >
              Read Full Guide <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(1).map((post) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-bold text-[#10b981] uppercase tracking-wider mb-3">
                  {post.category}
                </span>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-[#10b981] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50 mt-auto">
                  <img src={post.author.image} alt={post.author.name} className="h-8 w-8 rounded-full object-cover" />
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">{post.author.name}</p>
                    <div className="flex items-center gap-2 text-gray-400 mt-0.5">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

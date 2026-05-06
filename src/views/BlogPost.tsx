'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { BLOG_POSTS } from '../data/blogPosts'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'

export default function BlogPost({ slug: slugProp }: { slug?: string }) {
  const params = useParams()
  const slug = slugProp || (params?.slug as string)
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/blog" className="text-[#10b981] font-bold">Back to Knowledge Hub</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end pb-12 lg:pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 w-full text-white">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" /> Back to Hub
            </Link>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#10b981] text-xs font-bold uppercase tracking-wider mb-6">
              {post.category}
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
        <div className="flex flex-wrap items-center gap-8 py-8 border-b border-gray-100 mb-12 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <img src={post.author.image} alt={post.author.name} className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="font-bold text-gray-900">{post.author.name}</p>
              <p className="text-xs">{post.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
          <button className="ml-auto flex items-center gap-2 text-gray-400 hover:text-[#10b981] transition-colors">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg prose-emerald max-w-none 
          prose-headings:font-display prose-headings:font-bold prose-headings:text-gray-900
          prose-p:text-gray-600 prose-p:leading-relaxed
          prose-strong:text-gray-900
          prose-li:text-gray-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Call to Action */}
        <div className="mt-20 p-8 lg:p-12 bg-gray-50 rounded-[2.5rem] border border-gray-100 text-center">
          <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
            Struggling with your credit score?
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Our experts can help you dispute errors and build a roadmap to financial freedom. Join thousands of users who have transformed their credit with Primescore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-[#10b981] text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Get Free Consultation
            </Link>
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold hover:bg-gray-100 transition-all"
            >
              Analyze My Report
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2, Eye } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export default function BlogPost({ initialPost, dict, locale = 'en' }: { initialPost?: any; dict?: any; locale?: string }) {
  const post = initialPost;
  const [views, setViews] = useState(post?.views || 0)

  // Translation values helper
  const t = dict?.blogPost || {
    backToHub: "Back to Hub",
    authorLabel: "Author",
    viewsLabel: "views",
    shareLabel: "Share",
    ctaTitle: "Struggling with your credit score?",
    ctaText: "Our experts can help you dispute errors and build a roadmap to financial freedom. Join thousands of users who have transformed their credit with Primescore.",
    ctaConsultation: "Get Free Consultation",
    ctaReport: "Analyze My Report"
  }

  useEffect(() => {
    if (!supabase || !post?.slug) return
    
    const viewedKey = `viewed_${post.slug}`
    if (!sessionStorage.getItem(viewedKey)) {
      sessionStorage.setItem(viewedKey, 'true')
      
      const incrementView = async () => {
        const { error } = await supabase.rpc('increment_blog_views', { blog_slug: post.slug })
        if (!error) {
          setViews((prev: number) => prev + 1)
        }
      }
      incrementView()
    }
  }, [post?.slug])

  const localePath = locale === 'en' ? '' : `/${locale}`

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href={`${localePath}/blog`} className="text-[#10b981] font-bold">{t.backToHub}</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Back Link */}
        <Link 
          href={`${localePath}/blog`} 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> {t.backToHub}
        </Link>

        {/* Hero Image */}
        <div className="relative h-[40vh] min-h-[300px] lg:h-[50vh] w-full rounded-[2rem] overflow-hidden mb-10 shadow-sm border border-gray-100">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title Block */}
        <div className="mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-[#10b981] text-xs font-bold uppercase tracking-wider mb-6">
            {post.category}
          </span>
          <h1 className="font-display text-4xl lg:text-[56px] font-bold text-gray-900 leading-[1.1] tracking-tight">
            {post.title}
          </h1>
        </div>

        {/* Author / Meta */}
        <div className="flex flex-wrap items-center gap-8 py-6 border-y border-gray-100 mb-12 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
              {post.author_name ? post.author_name[0].toUpperCase() : 'P'}
            </div>
            <div>
              <p className="font-bold text-gray-900">{post.author_name || 'Primescore Team'}</p>
              <p className="text-xs">{t.authorLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.published_at || new Date()).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.read_time || '5 min read'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{views} {t.viewsLabel}</span>
          </div>
          <button className="ml-auto flex items-center gap-2 text-gray-400 hover:text-[#10b981] transition-colors font-medium">
            <Share2 className="h-4 w-4" />
            <span>{t.shareLabel}</span>
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
            {t.ctaTitle}
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            {t.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`${localePath}/contact`} 
              className="px-8 py-4 bg-[#10b981] text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              {t.ctaConsultation}
            </Link>
            <Link 
              href={`${localePath}/dashboard`} 
              className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold hover:bg-gray-100 transition-all"
            >
              {t.ctaReport}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

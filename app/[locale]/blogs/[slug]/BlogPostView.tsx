'use client'

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { Montserrat } from "next/font/google"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { BlogPost } from "@/lib/supabase/types"

gsap.registerPlugin(ScrollTrigger)

const montserrat = Montserrat({ subsets: ["latin"] })

export default function BlogPostView({ post, locale, minutesRead, relatedPosts = [] }: { post: BlogPost; locale: string; minutesRead?: number; relatedPosts?: BlogPost[] }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isEn = locale === 'en'

  const imageUrl = post.featured_image || post.og_image || "/images/placeholder.png"
  const canonical = `https://3rcore.com/${locale}/blogs/${post.slug}`

  const formattedDate = new Date(post.published_at || post.created_at).toLocaleDateString(
    isEn ? "en-US" : "es-PE",
    { month: "long", day: "2-digit", year: "numeric" }
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".post-hero-img", { scale: 1.1 }, { scale: 1, duration: 1.5, ease: "power3.out" })
      gsap.fromTo(".post-title", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 })
      gsap.fromTo(".post-meta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 })
      gsap.fromTo(".post-content", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".post-content", start: "top 85%" },
      })
      gsap.fromTo(".deco-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.out", delay: 0.4, transformOrigin: "left" })
    })
    return () => ctx.revert()
  }, [])

  return (
    <main className={`${montserrat.className} min-h-screen bg-[#0D0010] text-white overflow-x-hidden`}>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#A21F8A]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-[#E91E63]/6 rounded-full blur-[100px]" />
      </div>

      {/* Back button */}
      <div className="relative z-20 pt-8 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-[11px] tracking-[0.3em] uppercase font-medium transition-colors duration-300 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:-translate-x-1">
            <path d="M15 8H1M1 8L7 2M1 8L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {isEn ? 'Back to blog' : 'Volver al blog'}
        </Link>
      </div>

      {/* Hero image */}
      <div ref={heroRef} className="relative z-10 mt-8 mx-6 md:mx-12 max-w-7xl lg:mx-auto rounded-[24px] overflow-hidden h-[40vh] md:h-[55vh] lg:h-[65vh]">
        <div className="post-hero-img absolute inset-0">
          <Image src={imageUrl} alt={post.featured_image_alt || post.title} fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0010] via-[#0D0010]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="deco-line h-[2px] w-16 mb-6" style={{ background: "linear-gradient(90deg, #E91E63, #9C27B0)" }} />
          {(post.category as any)?.name && (
            <span className="text-[#E91E63] text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block">
              {(post.category as any).name}
            </span>
          )}
          <h1 className="post-title text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white max-w-4xl">
            {post.title}
          </h1>
          <div className="post-meta flex items-center flex-wrap gap-4 mt-4">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(162,31,138,0.8)", backdropFilter: "blur(8px)" }}>
              {formattedDate}
            </span>
            {post.author_name && (
              <span className="text-white/40 text-xs">
                {isEn ? 'By' : 'Por'} {post.author_name}
              </span>
            )}
            {minutesRead && (
              <span className="text-white/40 text-xs inline-flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {isEn ? `${minutesRead} min read` : `${minutesRead} min de lectura`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Article content */}
      <article ref={contentRef} className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 lg:px-0 py-16">
        <div className="post-content prose-content" dangerouslySetInnerHTML={{ __html: post.content || '' }} />

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 font-bold">
            {isEn ? 'Share this article' : 'Comparte este artículo'}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://x.com/intent/tweet?url=${encodeURIComponent(canonical)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X / Twitter"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] font-bold border border-white/15 rounded-full text-white/70 hover:text-white hover:border-[#A21F8A]/60 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X / Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] font-bold border border-white/15 rounded-full text-white/70 hover:text-white hover:border-[#A21F8A]/60 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] font-bold border border-white/15 rounded-full text-white/70 hover:text-white hover:border-[#A21F8A]/60 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title + ' — ' + canonical)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] font-bold border border-white/15 rounded-full text-white/70 hover:text-white hover:border-[#A21F8A]/60 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <aside className="mt-16 pt-8 border-t border-white/10" aria-labelledby="related-posts-heading">
            <h2 id="related-posts-heading" className="text-[11px] uppercase tracking-[0.3em] text-[#E91E63] font-bold mb-6">
              {isEn ? 'You may also like' : 'También te puede interesar'}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
              {relatedPosts.map((rp) => {
                const img = rp.featured_image || rp.og_image || '/images/placeholder.png'
                return (
                  <li key={rp.id}>
                    <Link href={`/blogs/${rp.slug}`} className="group block">
                      <article className="bg-[#2F0729] rounded-[18px] overflow-hidden border border-white/5 transition-all duration-500 hover:border-[#A21F8A]/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(162,31,138,0.2)]">
                        <div className="relative h-40 w-full overflow-hidden">
                          <Image src={img} alt={rp.featured_image_alt || rp.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="p-4">
                          {(rp.category as any)?.name && (
                            <span className="text-[#E91E63] text-[9px] uppercase tracking-[0.3em] font-bold mb-1.5 block">
                              {(rp.category as any).name}
                            </span>
                          )}
                          <h3 className="text-sm font-semibold leading-snug text-white/90 group-hover:text-white transition-colors line-clamp-2">
                            {rp.title}
                          </h3>
                        </div>
                      </article>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </aside>
        )}

        <div className="mt-16 pt-8 border-t border-white/10">
          <Link href="/blogs" className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden font-bold uppercase tracking-[0.3em] text-[10px] border border-white/20 rounded-[15px] text-white transition-all duration-500 hover:border-[#A21F8A]/60">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:-translate-x-1">
                <path d="M13 7H1M1 7L6 2M1 7L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {isEn ? 'View all posts' : 'Ver todos los blogs'}
            </span>
          </Link>
        </div>
      </article>

      <style jsx global>{`
        .prose-content { color: white; font-size: 1rem; line-height: 1.85; }
        .prose-content h2 { font-size: 1.75rem; font-weight: 700; margin: 2.5rem 0 1rem; color: #fff; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .prose-content h3 { font-size: 1.35rem; font-weight: 700; margin: 2rem 0 0.75rem; color: #fff; }
        .prose-content h4 { font-size: 1.1rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: #fff; }
        .prose-content p { margin-bottom: 1.5rem; }
        .prose-content a { color: #E91E63; text-decoration: none; border-bottom: 1px solid rgba(233,30,99,0.3); transition: border-color 0.2s; }
        .prose-content a:hover { border-color: #E91E63; }
        .prose-content img { border-radius: 16px; width: 100%; height: auto; margin: 2rem 0; border: 1px solid rgba(255,255,255,0.06); }
        .prose-content ul, .prose-content ol { padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .prose-content li { margin-bottom: 0.5rem; }
        .prose-content ul li::marker { color: #A21F8A; }
        .prose-content ol li::marker { color: #A21F8A; font-weight: 700; }
        .prose-content blockquote { border-left: 3px solid #A21F8A; padding-left: 1.5rem; margin: 2rem 0; color: rgba(255,255,255,0.5); font-style: italic; }
        .prose-content pre { background: rgba(162,31,138,0.1); border: 1px solid rgba(162,31,138,0.2); border-radius: 8px; padding: 1.5rem; overflow-x: auto; }
        .prose-content code { background: rgba(162,31,138,0.1); padding: 0.2em 0.5em; border-radius: 4px; font-size: 0.875em; color: #E91E63; }
        .prose-content pre code { background: transparent; border: none; padding: 0; }
        .prose-content hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 3rem 0; }
        .prose-content table { width: 100%; border-collapse: collapse; margin: 2rem 0; }
        .prose-content th { background: rgba(162,31,138,0.2); color: white; padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; }
        .prose-content td { padding: 0.75rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.65); }
        .prose-content figure { margin: 2rem 0; }
        .prose-content figcaption { text-align: center; font-size: 0.75rem; color: rgba(255,255,255,0.35); margin-top: 0.75rem; }
        .prose-content iframe { border-radius: 12px; margin: 1rem 0; max-width: 100%; }
      `}</style>
    </main>
  )
}

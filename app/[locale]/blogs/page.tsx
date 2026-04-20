import Image from "next/image"
import { Link } from "@/i18n/routing"
import { Montserrat } from "next/font/google"
import { createServerClient } from "@/lib/supabase/server"
import type { BlogPost } from "@/lib/supabase/types"
import { BASE_URL } from "@/lib/metadata"

const montserrat = Montserrat({ subsets: ["latin"] })

export const revalidate = 600

export default async function BlogsPage({ params }: { params: any }) {
  const { locale } = await params

  const supabase = createServerClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*, category:blog_categories(name, slug)')
    .eq('status', 'published')
    .eq('locale', locale === 'en' ? 'en' : 'es')
    .order('published_at', { ascending: false })

  const allPosts: BlogPost[] = posts || []
  const isEn = locale === 'en'

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE_URL}/${locale}/blogs#blog`,
    "url": `${BASE_URL}/${locale}/blogs`,
    "name": isEn ? "3R Core Blog - Digital Marketing Insights" : "Blog 3R Core - Marketing Digital",
    "description": isEn
      ? "Latest news, articles and updates about digital marketing, SEO, branding, social media and web development."
      : "Últimas noticias, artículos y actualizaciones sobre marketing digital, SEO, branding, redes sociales y desarrollo web.",
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "inLanguage": isEn ? 'en' : 'es',
    "blogPost": allPosts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "url": `${BASE_URL}/${locale}/blogs/${p.slug}`,
      "datePublished": p.published_at || p.created_at,
      "dateModified": p.updated_at,
      "author": { "@type": "Person", "name": p.author_name },
      "image": p.featured_image || p.og_image || undefined,
    })),
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": allPosts.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${BASE_URL}/${locale}/blogs/${p.slug}`,
      "name": p.title,
    })),
  }

  return (
    <main className={`${montserrat.className} min-h-screen bg-[#0D0010] text-white overflow-x-hidden`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([blogSchema, itemListSchema]) }}
      />
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#A21F8A]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#E91E63]/8 rounded-full blur-[100px]" />
      </div>

      {/* Hero */}
      <div className="relative z-10 pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#E91E63] mb-4 font-medium">
            3R Core Blog
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8">
            <span className="block text-white">{isEn ? 'LATEST' : 'ÚLTIMAS'}</span>
            <span
              className="block bg-gradient-to-r from-[#E91E63] via-[#A21F8A] to-[#9C27B0] bg-clip-text text-transparent"
            >
              {isEn ? 'NEWS' : 'NOTICIAS'}
            </span>
          </h1>
          <div
            className="h-[1px] w-full max-w-md mb-6"
            style={{ background: "linear-gradient(90deg, #E91E63, #9C27B0, transparent)" }}
          />
          <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-lg">
            {isEn
              ? 'Stay up to date with the latest news, updates and articles about digital marketing.'
              : 'Mantente al día con las últimas novedades, actualizaciones y artículos sobre marketing digital.'}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="relative z-10 px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        {allPosts.length === 0 ? (
          <p className="text-white/30 text-center py-20">
            {isEn ? 'No posts yet' : 'No hay posts aún'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => {
              const imageUrl = post.featured_image || post.og_image || '/images/placeholder.png'
              const formattedDate = new Date(post.published_at || post.created_at)
                .toLocaleDateString(locale === 'en' ? 'en-US' : 'es-PE', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })
                .toUpperCase()

              return (
                <Link key={post.id} href={`/blogs/${post.slug}`} className="group block">
                  <article className="bg-[#2F0729] rounded-[20px] overflow-hidden flex flex-col h-full border border-white/5 transition-all duration-500 hover:border-[#A21F8A]/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(162,31,138,0.2)]">
                    {/* Image */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={post.featured_image_alt || post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2F0729] via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-3 left-4">
                        <span
                          className="text-[9px] font-bold tracking-[0.2em] px-3 py-1 rounded-full text-white"
                          style={{ background: "rgba(162,31,138,0.85)", backdropFilter: "blur(8px)" }}
                        >
                          {formattedDate}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {(post.category as any)?.name && (
                        <span className="text-[#E91E63] text-[10px] uppercase tracking-widest font-bold mb-2">
                          {(post.category as any).name}
                        </span>
                      )}
                      <h2 className="text-base font-semibold leading-[1.4] mb-3 text-white/90 group-hover:text-white transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-white/40 text-xs leading-relaxed line-clamp-3 mb-4 flex-grow">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-auto pt-4 border-t border-white/5">
                        <span className="inline-flex items-center gap-2 text-[#E91E63] text-[10px] font-bold tracking-[0.2em] uppercase group-hover:gap-3 transition-all duration-300">
                          {isEn ? 'Read more' : 'Leer más'}
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                            <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

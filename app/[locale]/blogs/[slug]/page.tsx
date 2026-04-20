import { Metadata } from "next"
import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import type { BlogPost } from "@/lib/supabase/types"
import BlogPostView from "./BlogPostView"
import { BASE_URL } from "@/lib/metadata"

export const revalidate = 3600

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const wordsOf = (html: string) => stripHtml(html).split(' ').filter(Boolean).length
const readingMinutes = (html: string) => Math.max(1, Math.ceil(wordsOf(html) / 220))

export async function generateStaticParams() {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('blog_posts')
      .select('slug, locale')
      .eq('status', 'published')
    return (data || []).map((p: any) => ({ slug: p.slug, locale: p.locale }))
  } catch {
    return []
  }
}

async function getPost(slug: string, locale: string): Promise<BlogPost | null> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*, category:blog_categories(name, slug)')
    .eq('slug', slug)
    .eq('locale', locale === 'en' ? 'en' : 'es')
    .eq('status', 'published')
    .single()
  return data
}

async function getRelatedPosts(currentId: string, categoryId: string | null, locale: string, limit = 3): Promise<BlogPost[]> {
  const supabase = createServerClient()
  let query = supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, featured_image_alt, published_at, created_at, category:blog_categories(name, slug)')
    .neq('id', currentId)
    .eq('locale', locale === 'en' ? 'en' : 'es')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)
  if (categoryId) query = query.eq('category_id', categoryId)
  const { data } = await query
  if (data && data.length >= limit) return data as unknown as BlogPost[]
  const supabaseFallback = createServerClient()
  const { data: fallback } = await supabaseFallback
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, featured_image_alt, published_at, created_at, category:blog_categories(name, slug)')
    .neq('id', currentId)
    .eq('locale', locale === 'en' ? 'en' : 'es')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)
  return (fallback || []) as unknown as BlogPost[]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await getPost(slug, locale)
  if (!post) return { title: "Post not found" }

  const canonical = `${BASE_URL}/${locale}/blogs/${slug}`
  const image = post.og_image || post.featured_image

  return {
    title: post.meta_title || `${post.title} | 3R Core`,
    description: post.meta_description || post.excerpt || '',
    alternates: {
      canonical,
      languages: {
        'es': `${BASE_URL}/es/blogs/${slug}`,
        'en': `${BASE_URL}/en/blogs/${slug}`,
        'x-default': `${BASE_URL}/es/blogs/${slug}`,
      },
    },
    robots: post.robots || 'index, follow',
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.meta_description || post.excerpt || '',
      url: canonical,
      siteName: '3R Core',
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
      type: 'article',
      locale: locale === 'en' ? 'en_US' : 'es_PE',
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      authors: [post.author_name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.og_title || post.title,
      description: post.og_description || post.meta_description || post.excerpt || '',
      images: image ? [image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  const post = await getPost(slug, locale)
  if (!post) notFound()

  const canonical = `${BASE_URL}/${locale}/blogs/${slug}`
  const isEn = locale === 'en'
  const content = post.content || ''
  const plainText = stripHtml(content)
  const wordCount = wordsOf(content)
  const minutesRead = readingMinutes(content)
  const articleBodyExcerpt = plainText.slice(0, 500)

  const relatedPosts = await getRelatedPosts(post.id, post.category_id, locale, 3)

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    "headline": post.title,
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Person",
      "name": post.author_name,
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "3R Core",
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/icons/LogoFull.webp` },
    },
    "image": post.og_image || post.featured_image || "",
    "description": post.meta_description || post.excerpt || "",
    "articleBody": articleBodyExcerpt,
    "url": canonical,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    "inLanguage": isEn ? 'en' : 'es',
    ...(post.focus_keyword ? { "keywords": post.focus_keyword } : {}),
    ...((post.category as any)?.name ? { "articleSection": (post.category as any).name } : {}),
    "wordCount": wordCount,
    "timeRequired": `PT${minutesRead}M`,
    "isAccessibleForFree": true,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isEn ? "Home" : "Inicio", "item": `${BASE_URL}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/${locale}/blogs` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": canonical },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([blogPostSchema, breadcrumbSchema]) }}
      />
      <BlogPostView post={post} locale={locale} minutesRead={minutesRead} relatedPosts={relatedPosts} />
    </>
  )
}

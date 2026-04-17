import { Metadata } from "next"
import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import type { BlogPost } from "@/lib/supabase/types"
import BlogPostView from "./BlogPostView"
import { BASE_URL } from "@/lib/metadata"

export const dynamic = 'force-dynamic'

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

  // Auto-generated BlogPosting schema
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
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
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    "inLanguage": locale === 'en' ? 'en' : 'es',
    ...(post.focus_keyword ? { "keywords": post.focus_keyword } : {}),
    ...((post.category as any)?.name ? { "articleSection": (post.category as any).name } : {}),
    "wordCount": post.content?.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length || 0,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": `${BASE_URL}/${locale}` },
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
      <BlogPostView post={post} locale={locale} />
    </>
  )
}

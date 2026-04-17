import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export const dynamic = 'force-dynamic';

interface YoastHeadJson {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  og_image?: Array<{ url: string; width?: number; height?: number }>;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  canonical?: string;
  robots?: {
    index?: string;
    follow?: string;
    "max-snippet"?: string;
    "max-image-preview"?: string;
    "max-video-preview"?: string;
  };
}

export interface WPPost {
  title: { rendered: string };
  date: string;
  link: string;
  slug: string;
  content: { rendered: string };
  excerpt: { rendered: string };
  yoast_head_json?: YoastHeadJson;
}

async function getPost(slug: string, locale: string): Promise<WPPost | null> {
  try {
    const lang = locale === "en" ? "en" : "es";
    const prefix = locale === "en" ? "/en" : "";

    // Llamada directa a WP (sin pasar por API interna para evitar URL absoluta en SSR)
    const res = await fetch(
      `https://3rcore-server.com.pe${prefix}/wp-json/wp/v2/posts?slug=${slug}&_fields=title,date,link,slug,content,excerpt,yoast_head_json`,
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'es-PE,es;q=0.9,en;q=0.8',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Referer': 'https://3rcore-server.com.pe/',
          'Origin': 'https://3rcore-server.com.pe',
        },
        cache: 'no-store',
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0] || null;
  } catch {
    return null;
  }
}

// Next.js 15: params es Promise, hay que hacer await
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale);
  if (!post) return { title: "Post not found" };

  const yoast = post.yoast_head_json;
  const ogImage = yoast?.og_image?.[0];

  return {
    title: yoast?.title || post.title.rendered,
    description: yoast?.description || yoast?.og_description || "",
    alternates: {
      canonical: `https://3rcore.com/${locale}/blogs/${slug}`,
      languages: {
        'es': `https://3rcore.com/es/blogs/${slug}`,
        'en': `https://3rcore.com/en/blogs/${slug}`,
        'x-default': `https://3rcore.com/es/blogs/${slug}`,
      },
    },
    robots: yoast?.robots ? {
      index: yoast.robots.index !== "noindex",
      follow: yoast.robots.follow !== "nofollow",
      googleBot: {
        "max-snippet": parseInt(yoast.robots["max-snippet"] || "-1"),
        "max-image-preview": (yoast.robots["max-image-preview"] as any) || "large",
        "max-video-preview": parseInt(yoast.robots["max-video-preview"] || "-1"),
      },
    } : undefined,
    openGraph: {
      title: yoast?.og_title || post.title.rendered,
      description: yoast?.og_description || "",
      url: yoast?.og_url || post.link,
      siteName: yoast?.og_site_name || "3RCore Server",
      images: ogImage ? [{ url: ogImage.url, width: ogImage.width || 1200, height: ogImage.height || 630 }] : [],
      type: "article",
    },
    twitter: {
      card: (yoast?.twitter_card as any) || "summary_large_image",
      title: yoast?.twitter_title || post.title.rendered,
      description: yoast?.twitter_description || "",
      images: yoast?.twitter_image ? [yoast.twitter_image] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale);

  if (!post) notFound();

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title.rendered.replace(/<[^>]*>/g, ''),
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "@id": "https://3rcore.com/#organization",
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://3rcore.com/#organization",
      "name": "3R Core",
      "logo": {
        "@type": "ImageObject",
        "url": "https://3rcore.com/icons/LogoFull.webp",
      },
    },
    "image": post.yoast_head_json?.og_image?.[0]?.url || "",
    "description": post.yoast_head_json?.og_description || "",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://3rcore.com/${locale}/blogs/${slug}`,
    },
    "inLanguage": locale === 'en' ? 'en' : 'es',
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": `https://3rcore.com/${locale}` },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `https://3rcore.com/${locale}/blogs` },
      { "@type": "ListItem", "position": 3, "name": post.title.rendered.replace(/<[^>]*>/g, ''), "item": `https://3rcore.com/${locale}/blogs/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([blogPostSchema, breadcrumbSchema]) }}
      />
      <BlogPostClient post={post!} />
    </>
  );
}
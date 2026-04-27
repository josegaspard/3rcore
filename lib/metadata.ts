import type { Metadata } from "next"

export const BASE_URL = 'https://3rcore.com'

export const DEFAULT_OG_IMAGE = {
  url: `${BASE_URL}/og/default.webp`,
  width: 1200,
  height: 630,
  alt: '3R Core - Agencia de Marketing Digital',
}

interface PageMetadataOptions {
  locale: string
  path: string
  titleEs: string
  titleEn: string
  descriptionEs: string
  descriptionEn: string
  noindex?: boolean
  ogImage?: { url: string; width?: number; height?: number; alt?: string }
}

export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const { locale, path, titleEs, titleEn, descriptionEs, descriptionEn, noindex, ogImage } = options
  const isEn = locale === 'en'
  const title = isEn ? titleEn : titleEs
  const description = isEn ? descriptionEn : descriptionEs
  const image = ogImage ?? DEFAULT_OG_IMAGE

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: {
        'es': `${BASE_URL}/es${path}`,
        'en': `${BASE_URL}/en${path}`,
        'x-default': `${BASE_URL}/es${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}${path}`,
      siteName: '3R Core',
      locale: isEn ? 'en_US' : 'es_PE',
      type: 'website',
      images: [
        {
          url: image.url,
          width: image.width ?? 1200,
          height: image.height ?? 630,
          alt: image.alt ?? title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
    ...(noindex && { robots: { index: false, follow: false } }),
  }
}

export function generateBreadcrumbSchema(items: { name: string; path: string }[], locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}/${locale}${item.path}`,
    })),
  }
}

import type { Metadata } from "next"

export const BASE_URL = 'https://3rcore.com'

interface PageMetadataOptions {
  locale: string
  path: string
  titleEs: string
  titleEn: string
  descriptionEs: string
  descriptionEn: string
  noindex?: boolean
}

export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const { locale, path, titleEs, titleEn, descriptionEs, descriptionEn, noindex } = options
  const isEn = locale === 'en'

  return {
    title: isEn ? titleEn : titleEs,
    description: isEn ? descriptionEn : descriptionEs,
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: {
        'es': `${BASE_URL}/es${path}`,
        'en': `${BASE_URL}/en${path}`,
        'x-default': `${BASE_URL}/es${path}`,
      },
    },
    openGraph: {
      title: isEn ? titleEn : titleEs,
      description: isEn ? descriptionEn : descriptionEs,
      url: `${BASE_URL}/${locale}${path}`,
      siteName: '3R Core',
      locale: isEn ? 'en_US' : 'es_PE',
      type: 'website',
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

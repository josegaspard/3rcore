import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://3rcore.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/gracias'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

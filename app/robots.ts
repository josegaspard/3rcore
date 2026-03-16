import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://3rcore.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Descomenta y agrega rutas aquí si en el futuro tienes páginas privadas (ej: un panel de admin)
      // disallow: '/admin/', 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

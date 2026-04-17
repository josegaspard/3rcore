import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://3rcore.com'

  const staticPages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/nosotros', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/servicios/branding', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios/socialmedia', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios/google-ads', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios/web-deveploment', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/posicionamiento-seo', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/blogs', priority: 0.7, changeFrequency: 'daily' as const },
    { path: '/preguntas', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/politicas', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terminos', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/reclamaciones', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: {
      languages: {
        es: `${baseUrl}/es${page.path}`,
        en: `${baseUrl}/en${page.path}`,
      },
    },
  }))

  // Fetch blog posts dynamically
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const [resEs, resEn] = await Promise.all([
      fetch('https://3rcore-server.com.pe/wp-json/wp/v2/posts?_fields=slug,date&per_page=100', {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
        next: { revalidate: 86400 },
      }),
      fetch('https://3rcore-server.com.pe/en/wp-json/wp/v2/posts?_fields=slug,date&per_page=100', {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
        next: { revalidate: 86400 },
      }),
    ])

    if (resEs.ok) {
      const posts = await resEs.json()
      blogEntries = posts.map((post: { slug: string; date: string }) => ({
        url: `${baseUrl}/es/blogs/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: {
          languages: {
            es: `${baseUrl}/es/blogs/${post.slug}`,
            en: `${baseUrl}/en/blogs/${post.slug}`,
          },
        },
      }))
    }
  } catch {
    // Silently fail — blog posts won't be in sitemap but static pages will
  }

  return [...staticEntries, ...blogEntries]
}

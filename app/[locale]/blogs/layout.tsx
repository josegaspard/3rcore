import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/blogs',
    titleEs: 'Blog - Noticias de Marketing Digital | 3R Core',
    titleEn: 'Blog - Digital Marketing News | 3R Core',
    descriptionEs: 'Últimas noticias, artículos y actualizaciones sobre marketing digital, SEO, branding, redes sociales y desarrollo web.',
    descriptionEn: 'Latest news, articles and updates about digital marketing, SEO, branding, social media and web development.',
  })
}

export default async function BlogsLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Blog', path: '/blogs' }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}

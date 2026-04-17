import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/socialmedia',
    titleEs: 'Gestión de Redes Sociales | 3R Core',
    titleEn: 'Social Media Management | 3R Core',
    descriptionEs: 'Estrategia de contenido, diseño de posts, grilla editorial y gestión de redes sociales para potenciar tu marca. Agencia en Lima, Perú.',
    descriptionEn: 'Content strategy, post design, editorial grid and social media management to boost your brand. Agency in Lima, Peru.',
  })
}

export default async function SocialMediaLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": locale === 'en' ? "Social Media Management" : "Gestión de Redes Sociales",
    "description": locale === 'en'
      ? "Content strategy, post design, editorial grid and social media management."
      : "Estrategia de contenido, diseño de posts, grilla editorial y gestión de redes sociales.",
    "provider": { "@id": `${BASE_URL}/#organization` },
    "serviceType": "Social Media Management",
    "areaServed": ["PE", "US"],
    "url": `${BASE_URL}/${locale}/servicios/socialmedia`,
  }

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Social Media', path: '/servicios/socialmedia' }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  )
}

import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/nosotros',
    titleEs: 'Nosotros - Equipo de Marketing Digital | 3R Core',
    titleEn: 'About Us - Digital Marketing Team | 3R Core',
    descriptionEs: 'Conoce al equipo de 3R Core. Somos profesionales y nativos digitales con una visión de 3 generaciones enfocados en estrategias de marketing digital en Lima, Perú.',
    descriptionEn: 'Meet the 3R Core team. We are professionals and digital natives with a 3-generation vision focused on digital marketing strategies in Lima, Peru.',
  })
}

export default async function NosotrosLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const isEn = locale === 'en'

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}/${locale}/nosotros#aboutpage`,
    "url": `${BASE_URL}/${locale}/nosotros`,
    "name": isEn ? "About 3R Core" : "Sobre 3R Core",
    "description": isEn
      ? "3R Core is a digital marketing agency in Lima, Peru combining Experience, Vision and Technology across branding, social media, SEO, Google Ads and web development."
      : "3R Core es una agencia de marketing digital en Lima, Perú que combina Experiencia, Visión y Tecnología en branding, social media, SEO, Google Ads y desarrollo web.",
    "mainEntity": { "@id": `${BASE_URL}/#organization` },
    "inLanguage": isEn ? 'en' : 'es',
  }

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'About Us' : 'Nosotros', path: '/nosotros' },
    ],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([aboutSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  )
}

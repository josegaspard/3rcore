import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/branding',
    titleEs: 'Servicio de Branding Corporativo | 3R Core',
    titleEn: 'Corporate Branding Service | 3R Core',
    descriptionEs: 'Diseño de identidad visual, manual de marca, logotipos y aplicaciones de marca. Creamos la esencia de tu marca con un equipo profesional en Lima, Perú.',
    descriptionEn: 'Visual identity design, brand manual, logos and brand applications. We create the essence of your brand with a professional team in Lima, Peru.',
    ogImage: {
      url: 'https://3rcore.com/og/branding.jpg',
      width: 1200,
      height: 630,
      alt: 'Servicio de Branding Corporativo - 3R Core',
    },
  })
}

export default async function BrandingLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": locale === 'en' ? "Corporate Branding Service" : "Servicio de Branding Corporativo",
    "description": locale === 'en'
      ? "Visual identity design, brand manual, logos and brand applications for businesses."
      : "Diseño de identidad visual, manual de marca, logotipos y aplicaciones de marca para empresas.",
    "provider": { "@id": `${BASE_URL}/#organization` },
    "serviceType": "Branding / Visual Identity",
    "areaServed": ["PE", "US"],
    "url": `${BASE_URL}/${locale}/servicios/branding`,
  }

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Branding', path: '/servicios/branding' }],
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

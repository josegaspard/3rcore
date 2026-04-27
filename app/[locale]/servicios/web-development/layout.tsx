import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/web-development',
    titleEs: 'Desarrollo Web y E-commerce | 3R Core',
    titleEn: 'Web Development & E-commerce | 3R Core',
    descriptionEs: 'Desarrollo de sitios web, tiendas online con Shopify y WooCommerce, landing pages y plataformas e-learning. Equipo profesional en Lima, Perú.',
    descriptionEn: 'Website development, online stores with Shopify and WooCommerce, landing pages and e-learning platforms. Professional team in Lima, Peru.',
  })
}

export default async function WebDevLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": locale === 'en' ? "Web Development & E-commerce" : "Desarrollo Web y E-commerce",
    "description": locale === 'en'
      ? "Website development, online stores with Shopify and WooCommerce, landing pages and e-learning platforms."
      : "Desarrollo de sitios web, tiendas online con Shopify y WooCommerce, landing pages y plataformas e-learning.",
    "provider": { "@id": `${BASE_URL}/#organization` },
    "serviceType": "Web Development / E-commerce",
    "areaServed": ["PE", "US"],
    "url": `${BASE_URL}/${locale}/servicios/web-development`,
  }

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: locale === 'en' ? 'Web Development' : 'Desarrollo Web', path: '/servicios/web-development' }],
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

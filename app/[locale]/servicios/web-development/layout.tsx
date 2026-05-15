import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/web-development',
    titleEs: 'Diseño y Creación de Páginas Web en Lima, Perú — E-commerce | 3R Core',
    titleEn: 'Web Design & Development in Lima, Peru — E-commerce & Landings | 3R Core',
    descriptionEs: 'Diseño y creación de páginas web en Lima, Perú: sitios corporativos, landing pages, e-commerce (Shopify, WooCommerce), e-learning y blogs. SEO técnico incluido desde S/2,500.',
    descriptionEn: 'Web design and development in Lima, Peru: corporate sites, landing pages, e-commerce (Shopify, WooCommerce), e-learning and blogs. Technical SEO included from $750.',
    ogImage: {
      url: 'https://3rcore.com/og/web-development.jpg',
      width: 1200,
      height: 630,
      alt: 'Diseño y Creación de Páginas Web en Lima - 3R Core',
    },
  })
}

export default async function WebDevLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.webFAQ?.faqs ?? {}

  const serviceSchema: any = buildServiceSchema({
    locale,
    path: '/servicios/web-development',
    nameEs: 'Diseño y Creación de Páginas Web en Lima',
    nameEn: 'Web Design and Development in Lima',
    descriptionEs: 'Diseño y desarrollo de sitios web corporativos, landing pages, tiendas online (e-commerce) en Shopify y WooCommerce, plataformas e-learning, sitios de servicios y blogs. Optimización SEO técnica, mobile-first y conversión integrada.',
    descriptionEn: 'Design and development of corporate websites, landing pages, online stores (e-commerce) on Shopify and WooCommerce, e-learning platforms, service sites and blogs. Technical SEO, mobile-first optimization and built-in conversion.',
    serviceType: 'Web Development / E-commerce',
    priceRange: 'S/2,500 - S/25,000',
    offerPriceEs: 2500,
    offerPriceEn: 750,
    audienceTypes: ['Startups', 'Small business', 'Medium business', 'Enterprise', 'E-commerce'],
  })

  // OfferCatalog with site types — copy lifted from existing WebSection translations
  const ws = messages?.WebSection ?? {}
  const subOffers = [ws.landing, ws.info, ws.Ecomm, ws.Elearn, ws.Servic, ws.Blogs]
    .filter(Boolean)
    .map((t: any) => ({ "@type": "Offer", "name": t.title, "description": t.description }))
  if (subOffers.length) {
    serviceSchema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      "name": isEn ? "Website Types" : "Tipos de Sitios Web",
      "itemListElement": subOffers,
    }
  }

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? 'Web Development' : 'Diseño Web', path: '/servicios/web-development' }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  )
}

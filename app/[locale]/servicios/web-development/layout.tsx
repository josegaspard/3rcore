import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/web-development',
    titleEs: 'Diseño y Desarrollo Web en Lima — Tiendas Online y Landing Pages | 3R Core',
    titleEn: 'Web Design & Development in Lima — Online Stores and Landing Pages | 3R Core',
    descriptionEs: 'Diseño y desarrollo web profesional en Lima, Perú. Sitios corporativos, landing pages y e-commerce con Shopify y WooCommerce. Optimización SEO incluida desde S/2,500.',
    descriptionEn: 'Professional web design and development in Lima, Peru. Corporate sites, landing pages and e-commerce with Shopify and WooCommerce. SEO optimization included starting at $750 USD.',
    ogImage: {
      url: 'https://3rcore.com/og/web-development.jpg',
      width: 1200,
      height: 630,
      alt: 'Diseño y Desarrollo Web en Lima - 3R Core',
    },
  })
}

export default async function WebDevLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const faqMessages = messages?.webFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/web-development',
    nameEs: 'Diseño y Desarrollo Web en Lima',
    nameEn: 'Web Design and Development in Lima',
    descriptionEs: 'Diseño y desarrollo de sitios web corporativos, landing pages y tiendas online (e-commerce) en Shopify y WooCommerce. Optimización SEO técnica, mobile-first y conversión integrada.',
    descriptionEn: 'Corporate website design and development, landing pages and online stores (e-commerce) on Shopify and WooCommerce. Technical SEO, mobile-first optimization and built-in conversion.',
    serviceType: 'Web Development / E-commerce',
    priceRange: 'S/2,500 - S/25,000',
    offerPriceEs: 2500,
    offerPriceEn: 750,
    audienceTypes: ['Startups', 'Small business', 'Medium business', 'Enterprise', 'E-commerce'],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: locale === 'en' ? 'Web Development' : 'Desarrollo Web', path: '/servicios/web-development' }],
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

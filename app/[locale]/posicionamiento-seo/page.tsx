// app/[locale]/posicionamiento-seo/page.tsx
import { getMessages } from "next-intl/server"
import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import LandingClient from "./LandingClient"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/posicionamiento-seo',
    titleEs: 'Agencia SEO en Lima — Posicionamiento Web Orgánico en Google | 3R Core',
    titleEn: 'SEO Agency in Lima — Organic Web Positioning on Google | 3R Core',
    descriptionEs: 'Agencia de posicionamiento SEO en Lima, Perú. Auditoría, optimización, interlinks, contenido y escalamiento mensual. Inversión desde S/1,500/mes sin contratos forzosos.',
    descriptionEn: 'SEO positioning agency in Lima, Peru. Audit, optimization, interlinks, content and monthly scaling. Investment from $450/month with no forced contracts.',
    ogImage: {
      url: 'https://3rcore.com/og/posicionamiento-seo.jpg',
      width: 1200,
      height: 630,
      alt: 'Agencia SEO en Lima - 3R Core',
    },
  })
}

export default async function Posicionamientoseo({ params }: { params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === "en"

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/posicionamiento-seo',
    nameEs: 'Agencia de Posicionamiento SEO en Lima',
    nameEn: 'SEO Positioning Agency in Lima',
    descriptionEs: 'Servicio mensual de posicionamiento SEO orgánico en Google para empresas en Lima, Perú: auditoría, palabras clave, optimización on-page, interlinks, contenido y escalamiento con reporte mensual.',
    descriptionEn: 'Monthly organic SEO positioning service on Google for companies in Lima, Peru: audit, keyword research, on-page optimization, interlinks, content and scaling with monthly reporting.',
    serviceType: 'SEO / Search Engine Optimization',
    priceRange: 'S/1,500+',
    offerPriceEs: 1500,
    offerPriceEn: 450,
    audienceTypes: ['Small business', 'Medium business', 'Enterprise', 'E-commerce', 'B2B', 'Local business'],
  })

  // hasOfferCatalog with the three SEO service blocks from SecondLandingSection (existing copy)
  const cards = messages?.SecondLandingSection?.cards ?? {}
  ;(serviceSchema as any).hasOfferCatalog = {
    "@type": "OfferCatalog",
    "name": isEn ? "SEO Services" : "Servicios SEO",
    "itemListElement": [
      { "@type": "Offer", "name": cards?.audit?.title, "description": (cards?.audit?.items ?? []).join(". ") },
      { "@type": "Offer", "name": cards?.interlinks?.title, "description": (cards?.interlinks?.items ?? []).join(". ") },
      { "@type": "Offer", "name": cards?.scaling?.title, "description": (cards?.scaling?.items ?? []).join(". ") },
    ],
  }

  const faqMessages = messages?.SEOFAQ?.faqs ?? {}
  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'SEO Positioning' : 'Posicionamiento SEO', path: '/posicionamiento-seo' },
    ],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <LandingClient />
    </>
  )
}

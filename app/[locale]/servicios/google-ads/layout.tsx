import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/google-ads',
    titleEs: 'Agencia Google Ads en Lima, Perú — Campañas SEM con ROI | 3R Core',
    titleEn: 'Google Ads Agency in Lima, Peru — SEM Campaigns with ROI | 3R Core',
    descriptionEs: 'Agencia Google Ads en Lima, Perú: campañas Search, Performance Max, YouTube, Display, Shopping y Remarketing. Gestión profesional desde S/1,800/mes con reportes mensuales.',
    descriptionEn: 'Google Ads agency in Lima, Peru: Search, Performance Max, YouTube, Display, Shopping and Remarketing campaigns. Professional management from $480/month with monthly reports.',
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: 'Agencia Google Ads en Lima - 3R Core',
    },
  })
}

export default async function GoogleAdsLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.GoogleAdsFAQ?.faqs ?? {}

  const serviceSchema: any = buildServiceSchema({
    locale,
    path: '/servicios/google-ads',
    nameEs: 'Agencia Google Ads y Campañas SEM en Lima',
    nameEn: 'Google Ads Agency and SEM Campaigns in Lima',
    descriptionEs: 'Diseño, lanzamiento y optimización de campañas Google Ads (Search, Performance Max, YouTube, Display, Shopping y Remarketing) para empresas en Lima, Perú con ROI medible y reportes mensuales.',
    descriptionEn: 'Design, launch and optimization of Google Ads campaigns (Search, Performance Max, YouTube, Display, Shopping and Remarketing) for companies in Lima, Peru with measurable ROI and monthly reports.',
    serviceType: 'Google Ads / SEM / PPC',
    priceRange: 'S/1,800 - S/8,000',
    offerPriceEs: 1800,
    offerPriceEn: 480,
    audienceTypes: ['E-commerce', 'B2B', 'Local business', 'Lead generation'],
  })

  // OfferCatalog with campaign types — all already mentioned in description (existing facts)
  const campaignTypes = isEn
    ? [
        { name: 'Search Ads', description: 'High-intent keyword campaigns on Google search results.' },
        { name: 'Performance Max', description: 'Cross-channel campaigns powered by Google AI.' },
        { name: 'YouTube Video Ads', description: 'Video advertising on YouTube and partner network.' },
        { name: 'Display Ads', description: 'Banner advertising across the Google Display Network.' },
        { name: 'Shopping Ads', description: 'Product listing ads for e-commerce catalogs.' },
        { name: 'Remarketing', description: 'Re-engagement of previous website visitors.' },
      ]
    : [
        { name: 'Search Ads', description: 'Campañas en resultados de búsqueda de Google por palabras clave de alta intención.' },
        { name: 'Performance Max', description: 'Campañas cross-canal automatizadas con IA de Google.' },
        { name: 'YouTube Video Ads', description: 'Publicidad en video en YouTube y red de partners.' },
        { name: 'Display Ads', description: 'Anuncios gráficos en la Red de Display de Google.' },
        { name: 'Shopping Ads', description: 'Anuncios de catálogo de productos para e-commerce.' },
        { name: 'Remarketing', description: 'Reimpacto a quienes ya visitaron tu sitio web.' },
      ]
  serviceSchema.hasOfferCatalog = {
    "@type": "OfferCatalog",
    "name": isEn ? "Google Ads Campaign Types" : "Tipos de Campañas Google Ads",
    "itemListElement": campaignTypes.map((c) => ({ "@type": "Offer", "name": c.name, "description": c.description })),
  }

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }],
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

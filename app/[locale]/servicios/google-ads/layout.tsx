import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/google-ads',
    titleEs: 'Agencia Google Ads en Lima — Campañas SEM con ROI Medible | 3R Core',
    titleEn: 'Google Ads Agency in Lima — SEM Campaigns with Measurable ROI | 3R Core',
    descriptionEs: 'Agencia Google Ads en Lima, Perú. Campañas Search, Performance Max, YouTube, Display y Shopping. Gestión profesional desde S/1,800/mes con reportes mensuales transparentes.',
    descriptionEn: 'Google Ads agency in Lima, Peru. Search, Performance Max, YouTube, Display and Shopping campaigns. Professional management starting at $480/month with transparent monthly reports.',
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
  const faqMessages = messages?.GoogleAdsFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
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

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }],
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

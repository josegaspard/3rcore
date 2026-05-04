import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/branding',
    titleEs: 'Agencia de Branding en Lima — Diseño de Identidad de Marca | 3R Core',
    titleEn: 'Branding Agency in Lima — Brand Identity Design | 3R Core',
    descriptionEs: 'Diseño de identidad visual, logotipo, manual de marca y aplicaciones corporativas. Agencia de branding en Lima, Perú con proyectos integrales desde S/3,500.',
    descriptionEn: 'Visual identity design, logo, brand manual and corporate applications. Branding agency in Lima, Peru with full projects starting at $1,000 USD.',
    ogImage: {
      url: 'https://3rcore.com/og/branding.jpg',
      width: 1200,
      height: 630,
      alt: 'Agencia de Branding en Lima - 3R Core',
    },
  })
}

export default async function BrandingLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const faqMessages = messages?.BrandingFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/branding',
    nameEs: 'Branding Corporativo y Diseño de Identidad de Marca',
    nameEn: 'Corporate Branding and Brand Identity Design',
    descriptionEs: 'Diseño de identidad visual, logotipo, manual de marca, paleta cromática, tipografía corporativa, papelería y aplicaciones de marca para empresas en Lima, Perú.',
    descriptionEn: 'Visual identity design, logo, brand manual, color palette, corporate typography, stationery and brand applications for companies in Lima, Peru.',
    serviceType: 'Branding / Visual Identity',
    priceRange: 'S/3,500 - S/15,000',
    offerPriceEs: 3500,
    offerPriceEn: 1000,
    audienceTypes: ['Startups', 'Small business', 'Medium business', 'Enterprise'],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Branding', path: '/servicios/branding' }],
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

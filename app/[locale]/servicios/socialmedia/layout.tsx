import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/socialmedia',
    titleEs: 'Manejo de Redes Sociales en Lima — Community Manager Profesional | 3R Core',
    titleEn: 'Social Media Management in Lima — Professional Community Manager | 3R Core',
    descriptionEs: 'Manejo profesional de redes sociales en Lima, Perú: Instagram, Facebook, TikTok, LinkedIn. Estrategia, diseño, copy y reportes mensuales desde S/1,800.',
    descriptionEn: 'Professional social media management in Lima, Peru: Instagram, Facebook, TikTok, LinkedIn. Strategy, design, copy and monthly reports starting at $540 USD.',
    ogImage: {
      url: 'https://3rcore.com/og/socialmedia.jpg',
      width: 1200,
      height: 630,
      alt: 'Manejo de Redes Sociales en Lima - 3R Core',
    },
  })
}

export default async function SocialMediaLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const faqMessages = messages?.SocialMediaFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/socialmedia',
    nameEs: 'Manejo de Redes Sociales y Community Manager en Lima',
    nameEn: 'Social Media Management and Community Manager in Lima',
    descriptionEs: 'Gestión integral de redes sociales: estrategia de contenido, diseño de posts, edición de Reels y TikToks, copywriting, programación, community management y reportes mensuales para Instagram, Facebook, TikTok, LinkedIn, YouTube y X.',
    descriptionEn: 'Comprehensive social media management: content strategy, post design, Reels and TikTok editing, copywriting, scheduling, community management and monthly reports for Instagram, Facebook, TikTok, LinkedIn, YouTube and X.',
    serviceType: 'Social Media Management / Community Manager',
    priceRange: 'S/1,800 - S/8,000',
    offerPriceEs: 1800,
    offerPriceEn: 540,
    audienceTypes: ['Startups', 'Small business', 'Medium business', 'Restaurants', 'Retail', 'B2B', 'Healthcare'],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Social Media', path: '/servicios/socialmedia' }],
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

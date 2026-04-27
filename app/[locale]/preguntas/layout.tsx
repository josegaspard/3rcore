import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"
import { getMessages } from "next-intl/server"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/preguntas',
    titleEs: 'Preguntas Frecuentes - FAQ | 3R Core',
    titleEn: 'Frequently Asked Questions - FAQ | 3R Core',
    descriptionEs: 'Resolvemos tus dudas sobre nuestros servicios de marketing digital: Branding, Social Media, Google Ads, SEO y Desarrollo Web.',
    descriptionEn: 'We answer your questions about our digital marketing services: Branding, Social Media, Google Ads, SEO and Web Development.',
  })
}

export default async function PreguntasLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = await getMessages() as any
  const faq = messages?.FAQ

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'FAQ', path: '/preguntas' }],
    locale
  )

  const faqItems = faq?.faqs ? Object.values(faq.faqs).map((q: any) => ({
    "@type": "Question",
    "name": q.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.answer,
    },
  })) : []

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  )
}

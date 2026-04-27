// app/[locale]/landing/page.tsx
import { getMessages } from "next-intl/server"
import type { Metadata } from "next"
import LandingClient from "./LandingClient"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  
  const title = locale === 'en'
    ? "SEO Positioning on Google | 3R Core"
    : "Posicionamiento SEO en Google | 3R Core"
  const description = locale === 'en'
    ? "Boost your business on Google and attract customers who are actively looking for what you offer."
    : "Impulsa tu negocio en Google y atrae clientes que sí buscan lo que ofreces."
  const ogImageUrl = "https://3rcore.com/og/posicionamiento-seo.jpg"

  return {
    title,
    description,
    alternates: {
      canonical: `https://3rcore.com/${locale}/posicionamiento-seo`,
      languages: {
        'es': 'https://3rcore.com/es/posicionamiento-seo',
        'en': 'https://3rcore.com/en/posicionamiento-seo',
        'x-default': 'https://3rcore.com/es/posicionamiento-seo',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://3rcore.com/${locale}/posicionamiento-seo`,
      siteName: '3R Core',
      locale: locale === 'en' ? 'en_US' : 'es_PE',
      type: 'website',
      images: [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: locale === 'en' ? 'SEO Positioning Service - 3R Core' : 'Servicio de Posicionamiento SEO - 3R Core',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function Posicionamientoseo({ params }: { params: any }) {
  const { locale } = await params
  const messages = await getMessages()
  const m = messages as any

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": locale === 'en' ? "SEO Positioning Service" : "Servicio de Posicionamiento SEO",
    "provider": {
      "@type": "Organization",
      "name": "3R Core Marketing Agency",
      "url": "https://3rcore.com"
    },
    "description": m.SEOSEM.description.paragraph1,
    "offers": {
      "@type": "Offer",
      "price": locale === 'en' ? "450" : "1500",
      "priceCurrency": locale === 'en' ? "USD" : "PEN",
      "description": m.FiveLandingSection.description
    },
    "areaServed": ["PE", "US"],
    "serviceType": "SEO / Search Engine Optimization",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'en' ? "SEO Services" : "Servicios SEO",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": m.SecondLandingSection.cards.audit.title,
        },
        {
          "@type": "Offer", 
          "name": m.SecondLandingSection.cards.interlinks.title,
        },
        {
          "@type": "Offer",
          "name": m.SecondLandingSection.cards.scaling.title,
        }
      ]
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LandingClient />
    </>
  )
}
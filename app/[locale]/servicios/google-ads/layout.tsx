import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/google-ads',
    titleEs: 'SEO y Google Ads - Posicionamiento en Google | 3R Core',
    titleEn: 'SEO & Google Ads - Google Positioning | 3R Core',
    descriptionEs: 'Posicionamiento SEO orgánico y campañas de Google Ads para más visibilidad, tráfico de calidad y conversiones. Agencia en Lima, Perú.',
    descriptionEn: 'Organic SEO positioning and Google Ads campaigns for more visibility, quality traffic and conversions. Agency in Lima, Peru.',
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: 'Campañas Google Ads y SEM - 3R Core',
    },
  })
}

export default async function GoogleAdsLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": locale === 'en' ? "SEO & Google Ads Service" : "Servicio de SEO y Google Ads",
    "description": locale === 'en'
      ? "Organic SEO positioning and Google Ads campaigns for visibility, quality traffic and conversions."
      : "Posicionamiento SEO orgánico y campañas de Google Ads para visibilidad, tráfico de calidad y conversiones.",
    "provider": { "@id": `${BASE_URL}/#organization` },
    "serviceType": "SEO / SEM / Google Ads",
    "areaServed": ["PE", "US"],
    "url": `${BASE_URL}/${locale}/servicios/google-ads`,
  }

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }],
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

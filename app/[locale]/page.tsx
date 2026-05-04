import { getTranslations } from "next-intl/server"
import HomeClient from "./HomeClient"
import ServiceFAQ from "@/components/seo/ServiceFAQ"
import SEOContentBlock from "@/components/seo/SEOContentBlock"
import { buildFAQPageSchema, buildServiceItemList } from "@/lib/seoSchemas"

export default async function HomePage({ params }: { params: any }) {
  const { locale } = await params
  const isEn = locale === 'en'
  const tH1 = await getTranslations({ locale, namespace: "HiddenH1" })
  const tFaq = await getTranslations({ locale, namespace: "HomeFAQ" })

  const faqItems = Array.from({ length: 6 }, (_, i) => ({
    question: tFaq(`faqs.q${i + 1}.question`),
    answer: tFaq(`faqs.q${i + 1}.answer`),
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const itemListSchema = buildServiceItemList({
    locale,
    items: [
      {
        name: isEn ? "Web Design & Development" : "Diseño y Desarrollo Web",
        path: "/servicios/web-development",
        description: isEn ? "Custom websites, landing pages and e-commerce." : "Sitios web a medida, landing pages y e-commerce.",
      },
      {
        name: isEn ? "Social Media Management" : "Manejo de Redes Sociales",
        path: "/servicios/socialmedia",
        description: isEn ? "Strategy, content and community management." : "Estrategia, contenido y community management.",
      },
      {
        name: isEn ? "Corporate Branding" : "Branding Corporativo",
        path: "/servicios/branding",
        description: isEn ? "Visual identity, logo and brand book." : "Identidad visual, logotipo y manual de marca.",
      },
      {
        name: isEn ? "Google Ads" : "Google Ads",
        path: "/servicios/google-ads",
        description: isEn ? "SEM campaigns with measurable ROI." : "Campañas SEM con ROI medible.",
      },
      {
        name: isEn ? "SEO Positioning" : "Posicionamiento SEO",
        path: "/posicionamiento-seo",
        description: isEn ? "Organic Google ranking and authority building." : "Ranking orgánico en Google y construcción de autoridad.",
      },
    ],
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, itemListSchema]) }}
      />
      <h1 className="sr-only">{tH1("home")}</h1>
      <HomeClient />
      <ServiceFAQ namespace="HomeFAQ" count={6} />
      <SEOContentBlock
        namespace="HomeSEO"
        paragraphs={4}
        relatedLinks={[
          { href: "/servicios/web-development", label: isEn ? "Web Design" : "Diseño Web" },
          { href: "/servicios/socialmedia", label: isEn ? "Social Media" : "Redes Sociales" },
          { href: "/servicios/branding", label: isEn ? "Branding" : "Branding" },
          { href: "/servicios/google-ads", label: "Google Ads" },
          { href: "/posicionamiento-seo", label: "SEO" },
          { href: "/nosotros", label: isEn ? "About Us" : "Nosotros" },
          { href: "/blogs", label: "Blog" },
        ]}
      />
    </>
  )
}

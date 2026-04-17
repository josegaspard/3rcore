import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios',
    titleEs: 'Servicios de Marketing Digital | 3R Core',
    titleEn: 'Digital Marketing Services | 3R Core',
    descriptionEs: 'Branding, Social Media, Google Ads, SEO y Desarrollo Web. Servicios de marketing digital personalizados para tu empresa en Lima, Perú.',
    descriptionEn: 'Branding, Social Media, Google Ads, SEO & Web Development. Personalized digital marketing services for your business in Lima, Peru.',
  })
}

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(
              [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }],
              'es'
            )
          ),
        }}
      />
      {children}
    </>
  )
}

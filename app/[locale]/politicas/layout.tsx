import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/politicas',
    titleEs: 'Política de Privacidad | 3R Core',
    titleEn: 'Privacy Policy | 3R Core',
    descriptionEs: 'Política de privacidad de 3R Core. Información sobre el tratamiento de datos personales según la Ley N° 29733 de Perú.',
    descriptionEn: 'Privacy policy of 3R Core. Information about personal data processing according to Peru Law No. 29733.',
  })
}

export default async function PoliticasLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: locale === 'en' ? 'Privacy Policy' : 'Política de Privacidad', path: '/politicas' }],
    locale
  )
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}

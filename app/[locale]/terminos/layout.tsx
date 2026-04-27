import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"

export const revalidate = 86400

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/terminos',
    titleEs: 'Términos y Condiciones | 3R Core',
    titleEn: 'Terms and Conditions | 3R Core',
    descriptionEs: 'Términos y condiciones de uso del sitio web de 3R Core. Regulado por la legislación peruana.',
    descriptionEn: 'Terms and conditions of use for the 3R Core website. Regulated by Peruvian legislation.',
  })
}

export default async function TerminosLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: locale === 'en' ? 'Terms & Conditions' : 'Términos y Condiciones', path: '/terminos' }],
    locale
  )
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}

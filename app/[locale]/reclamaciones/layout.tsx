import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"

export const revalidate = 86400

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/reclamaciones',
    titleEs: 'Libro de Reclamaciones | 3R Core',
    titleEn: 'Complaints Book | 3R Core',
    descriptionEs: 'Libro de reclamaciones virtual de 3R Core, conforme a la Ley N° 29571 de Protección al Consumidor del Perú.',
    descriptionEn: 'Virtual complaints book of 3R Core, in accordance with Peru Consumer Protection Law No. 29571.',
  })
}

export default async function ReclamacionesLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: locale === 'en' ? 'Complaints Book' : 'Libro de Reclamaciones', path: '/reclamaciones' }],
    locale
  )
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}

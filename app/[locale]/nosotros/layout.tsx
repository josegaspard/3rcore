import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/nosotros',
    titleEs: 'Nosotros - Equipo de Marketing Digital | 3R Core',
    titleEn: 'About Us - Digital Marketing Team | 3R Core',
    descriptionEs: 'Conoce al equipo de 3R Core. Somos profesionales y nativos digitales con una visión de 3 generaciones enfocados en estrategias de marketing digital en Lima, Perú.',
    descriptionEn: 'Meet the 3R Core team. We are professionals and digital natives with a 3-generation vision focused on digital marketing strategies in Lima, Peru.',
  })
}

export default function NosotrosLayout({ children, params }: { children: React.ReactNode; params: any }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(
              [{ name: 'Inicio', path: '' }, { name: 'Nosotros', path: '/nosotros' }],
              'es'
            )
          ),
        }}
      />
      {children}
    </>
  )
}

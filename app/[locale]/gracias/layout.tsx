import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/gracias',
    titleEs: 'Gracias por contactarnos | 3R Core',
    titleEn: 'Thank you for contacting us | 3R Core',
    descriptionEs: 'Hemos recibido tu mensaje. Un asesor se comunicará contigo en breve.',
    descriptionEn: 'We have received your message. An advisor will contact you shortly.',
    noindex: true,
  })
}

export default function GraciasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

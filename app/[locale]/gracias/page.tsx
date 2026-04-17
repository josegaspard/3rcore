import { Montserrat } from "next/font/google";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function GraciasPage({ params }: { params: any }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <main
      className={`${montserrat.className} min-h-screen flex flex-col items-center justify-center`}
      style={{ background: "#130218" }}
    >
      <div className="text-center px-6">
        <div className="text-6xl mb-6"></div>
        <h1 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] mb-4">
          {isEn ? 'Thank you for contacting us!' : '¡Gracias por contactarnos!'}
        </h1>
        <p className="text-white/70 text-lg mb-10">
          {isEn ? 'An advisor will contact you shortly.' : 'Un asesor se comunicará contigo en breve.'}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-10 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white border border-white/20 rounded-[15px] hover:bg-gradient-to-r hover:from-[#E91E63] hover:to-[#9C27B0] transition-all duration-300"
        >
          {isEn ? 'Back to Home' : 'Volver al inicio'}
        </Link>
      </div>
    </main>
  );
}

import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function GraciasPage() {
  return (
    <main
      className={`${montserrat.className} min-h-screen flex flex-col items-center justify-center`}
      style={{ background: "#130218" }}
    >
      <div className="text-center px-6">
        <div className="text-6xl mb-6"></div>
        <h1 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] mb-4">
          ¡Gracias por contactarnos!
        </h1>
        <p className="text-white/70 text-lg mb-10">
          Un asesor se comunicará contigo en breve.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-10 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white border border-white/20 rounded-[15px] hover:bg-gradient-to-r hover:from-[#E91E63] hover:to-[#9C27B0] transition-all duration-300"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
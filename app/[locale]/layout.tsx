import type { Metadata } from "next";
import { Poppins } from "next/font/google"; 
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CookieBanner from "@/components/layout/CookieBanners";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from "next-intl/server";
import ParticlesBackground from "@/components/ui/AnimatedBackground";
import ReactLenis from "lenis/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], 
  variable: "--font-poppins", 
  display: 'swap',
});

const lenisOptions = {
  lerp: 0.1,          
  duration: 1.5,       
  smoothWheel: true,  
  wheelMultiplier: 0.5,  
  touchMultiplier: 2,  
  infinite: false,    
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'en' 
      ? "3R Core - Digital Marketing Agency" 
      : "3R Core - Agencia de Marketing Digital",
    description: locale === 'en'
      ? "We combine Experience, Vision, and Technology into digital marketing strategies"
      : "Combinamos Experiencia, Visión y Tecnología en estrategias de marketing digital",
    alternates: {
      canonical: `https://www.3rcore.com/${locale}`,
      languages: {
        'es': 'https://www.3rcore.com/es',
        'en': 'https://www.3rcore.com/en',
      }
    },
    openGraph: {
      url: `https://www.3rcore.com/${locale}`,
      siteName: "3R Core",
      locale: locale === 'en' ? 'en_US' : 'es_PE',
    }
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {
  const { locale } = await params;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  
  const messages = await getMessages();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "3R Core Marketing Agency",
    "url": "https://www.3rcore.com",
    "logo": "https://www.3rcore.com/images/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Las Caobas 170",
      "addressLocality": "La Molina",
      "addressRegion": "Lima",
      "addressCountry": "PE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"]
    },
    "description": locale === 'en'
      ? "We combine Experience, Vision, and Technology into digital marketing strategies"
      : "Combinamos Experiencia, Visión y Tecnología en estrategias de marketing digital"
  }

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-54VJ6F97');`
          }}
        />
        </head>
      <ReactLenis root options={lenisOptions}>
        <body className={`${poppins.className} text-white`} suppressHydrationWarning={true}>
          <div className="noise-overlay" />
          <ParticlesBackground />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <main className="flex flex-col relative z-10">
              <div className="noise-global" />
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </NextIntlClientProvider>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-54VJ6F97"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>

        </body>
      </ReactLenis>
      
    </html>
  );
}
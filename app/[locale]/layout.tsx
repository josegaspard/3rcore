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
import Script from "next/script";

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

const BASE_URL = 'https://3rcore.com'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'en'
      ? "3R Core - Digital Marketing Agency"
      : "3R Core - Agencia de Marketing Digital",
    description: locale === 'en'
      ? "We combine Experience, Vision, and Technology into digital marketing strategies. Branding, Social Media, SEO, Google Ads & Web Development in Lima, Peru."
      : "Combinamos Experiencia, Visión y Tecnología en estrategias de marketing digital. Branding, Social Media, SEO, Google Ads y Desarrollo Web en Lima, Perú.",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'es': `${BASE_URL}/es`,
        'en': `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/es`,
      }
    },
    openGraph: {
      url: `${BASE_URL}/${locale}`,
      siteName: "3R Core",
      locale: locale === 'en' ? 'en_US' : 'es_PE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    metadataBase: new URL(BASE_URL),
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#organization`,
    "name": "3R Core - Agencia de Marketing Digital",
    "alternateName": "3R Core Marketing Agency",
    "url": BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/icons/LogoFull.webp`,
      "width": 600,
      "height": 300
    },
    "image": `${BASE_URL}/icons/LogoFull.webp`,
    "description": locale === 'en'
      ? "Digital marketing agency in Lima, Peru. We combine Experience, Vision, and Technology into strategies: Branding, Social Media, SEO, Google Ads & Web Development."
      : "Agencia de marketing digital en Lima, Perú. Combinamos Experiencia, Visión y Tecnología en estrategias: Branding, Social Media, SEO, Google Ads y Desarrollo Web.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Las Caobas 170, Ofic. 400, Urb El Remanso",
      "addressLocality": "La Molina",
      "addressRegion": "Lima",
      "postalCode": "15024",
      "addressCountry": "PE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -12.0913,
      "longitude": -76.9494
    },
    "telephone": "+51986889147",
    "email": "info@3rcore.com",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+51986889147",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/3Rcore/",
      "https://www.instagram.com/3rcore_/",
      "https://www.linkedin.com/company/3r-core/",
      "https://www.tiktok.com/@3rcore"
    ],
    "areaServed": [
      { "@type": "Country", "name": "Peru" },
      { "@type": "Country", "name": "United States" }
    ],
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'en' ? "Digital Marketing Services" : "Servicios de Marketing Digital",
      "itemListElement": [
        { "@type": "OfferCatalog", "name": "Branding", "url": `${BASE_URL}/${locale}/servicios/branding` },
        { "@type": "OfferCatalog", "name": "Social Media", "url": `${BASE_URL}/${locale}/servicios/socialmedia` },
        { "@type": "OfferCatalog", "name": "Google Ads / SEO", "url": `${BASE_URL}/${locale}/servicios/google-ads` },
        { "@type": "OfferCatalog", "name": locale === 'en' ? "Web Development" : "Desarrollo Web", "url": `${BASE_URL}/${locale}/servicios/web-deveploment` }
      ]
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "name": "3R Core",
    "url": BASE_URL,
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "inLanguage": ["es", "en"],
  }

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
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
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-54VJ6F97');`
            }}
          />
        </body>
      </ReactLenis>
    </html>
  );
}

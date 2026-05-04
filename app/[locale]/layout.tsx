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
      ? "3R Core | Digital Marketing Agency in Lima — Web Design, Social Media, SEO & Google Ads"
      : "3R Core | Agencia de Marketing Digital en Lima — Diseño Web, Redes Sociales, SEO y Google Ads",
    description: locale === 'en'
      ? "Digital marketing agency in Lima, Peru. We design websites, manage social media, run Google Ads campaigns, position your brand on Google (SEO) and develop your corporate branding. Real ROI, monthly reports."
      : "Agencia de marketing digital en Lima, Perú. Hacemos diseño web profesional, manejo de redes sociales, campañas Google Ads, posicionamiento SEO en Google y branding corporativo. ROI medible y reportes mensuales.",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'es': `${BASE_URL}/es`,
        'en': `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/es`,
      }
    },
    openGraph: {
      title: locale === 'en'
        ? "3R Core | Digital Marketing Agency in Lima"
        : "3R Core | Agencia de Marketing Digital en Lima",
      description: locale === 'en'
        ? "Digital marketing agency in Lima, Peru. Web design, social media management, Google Ads, SEO and branding with measurable ROI."
        : "Agencia de marketing digital en Lima, Perú. Diseño web, manejo de redes sociales, Google Ads, posicionamiento SEO y branding con ROI medible.",
      url: `${BASE_URL}/${locale}`,
      siteName: "3R Core",
      locale: locale === 'en' ? 'en_US' : 'es_PE',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og/default.jpg`,
          width: 1200,
          height: 630,
          alt: locale === 'en'
            ? '3R Core - Digital Marketing Agency'
            : '3R Core - Agencia de Marketing Digital',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'en'
        ? "3R Core - Digital Marketing Agency"
        : "3R Core - Agencia de Marketing Digital",
      description: locale === 'en'
        ? "We combine Experience, Vision, and Technology into digital marketing strategies."
        : "Combinamos Experiencia, Visión y Tecnología en estrategias de marketing digital.",
      images: [`${BASE_URL}/og/default.jpg`],
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
    "slogan": locale === 'en'
      ? "Experience, Vision & Technology"
      : "Experiencia, Visión y Tecnología",
    // TODO: confirm exact founding year and uncomment
    // "foundingDate": "YYYY",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 21
    },
    "knowsAbout": [
      "Branding",
      "Visual Identity",
      "Social Media Marketing",
      "Search Engine Optimization",
      "Google Ads",
      "Search Engine Marketing",
      "Web Development",
      "E-commerce",
      "Shopify",
      "WooCommerce",
      "Content Strategy",
      "Digital Marketing"
    ],
    "founder": [
      {
        "@type": "Person",
        "name": "Alejandro Roque",
        "jobTitle": locale === 'en' ? "CEO" : "CEO / Director General",
        "worksFor": { "@id": `${BASE_URL}/#organization` }
      },
      {
        "@type": "Person",
        "name": "Bruno Roque",
        "jobTitle": locale === 'en' ? "Marketing Director" : "Director de Marketing",
        "worksFor": { "@id": `${BASE_URL}/#organization` }
      },
      {
        "@type": "Person",
        "name": "Piero Roque",
        "jobTitle": locale === 'en' ? "SEO / Ads Director" : "Director SEO / Ads",
        "worksFor": { "@id": `${BASE_URL}/#organization` }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'en' ? "Digital Marketing Services" : "Servicios de Marketing Digital",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Corporate Branding" : "Branding Corporativo",
            "url": `${BASE_URL}/${locale}/servicios/branding`,
            "serviceType": "Branding / Visual Identity"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Social Media Management" : "Gestión de Redes Sociales",
            "url": `${BASE_URL}/${locale}/servicios/socialmedia`,
            "serviceType": "Social Media Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Google Ads / SEM" : "Google Ads / SEM",
            "url": `${BASE_URL}/${locale}/servicios/google-ads`,
            "serviceType": "Google Ads / SEM"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Web Development & E-commerce" : "Desarrollo Web y E-commerce",
            "url": `${BASE_URL}/${locale}/servicios/web-development`,
            "serviceType": "Web Development / E-commerce"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "SEO Positioning" : "Posicionamiento SEO",
            "url": `${BASE_URL}/${locale}/posicionamiento-seo`,
            "serviceType": "SEO / Search Engine Optimization"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": locale === 'en' ? 450 : 1500,
            "priceCurrency": locale === 'en' ? "USD" : "PEN",
            "valueAddedTaxIncluded": false
          }
        }
      ]
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "name": "3R Core",
    "alternateName": "3R Core - Agencia de Marketing Digital",
    "url": BASE_URL,
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "inLanguage": ["es", "en"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/${locale}/blogs?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  const navItems = locale === 'en'
    ? [
        { name: "Home", url: `${BASE_URL}/en` },
        { name: "About Us", url: `${BASE_URL}/en/nosotros` },
        { name: "Services", url: `${BASE_URL}/en/servicios` },
        { name: "Web Design & Development", url: `${BASE_URL}/en/servicios/web-development` },
        { name: "Social Media Management", url: `${BASE_URL}/en/servicios/socialmedia` },
        { name: "Corporate Branding", url: `${BASE_URL}/en/servicios/branding` },
        { name: "Google Ads", url: `${BASE_URL}/en/servicios/google-ads` },
        { name: "SEO Positioning", url: `${BASE_URL}/en/posicionamiento-seo` },
        { name: "Blog", url: `${BASE_URL}/en/blogs` },
        { name: "FAQ", url: `${BASE_URL}/en/preguntas` },
      ]
    : [
        { name: "Inicio", url: `${BASE_URL}/es` },
        { name: "Nosotros", url: `${BASE_URL}/es/nosotros` },
        { name: "Servicios", url: `${BASE_URL}/es/servicios` },
        { name: "Diseño y Desarrollo Web", url: `${BASE_URL}/es/servicios/web-development` },
        { name: "Manejo de Redes Sociales", url: `${BASE_URL}/es/servicios/socialmedia` },
        { name: "Branding Corporativo", url: `${BASE_URL}/es/servicios/branding` },
        { name: "Google Ads", url: `${BASE_URL}/es/servicios/google-ads` },
        { name: "Posicionamiento SEO", url: `${BASE_URL}/es/posicionamiento-seo` },
        { name: "Blog", url: `${BASE_URL}/es/blogs` },
        { name: "Preguntas Frecuentes", url: `${BASE_URL}/es/preguntas` },
      ]

  const siteNavigationSchema = navItems.map((item) => ({
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": item.name,
    "url": item.url,
  }))

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema, ...siteNavigationSchema]) }}
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
          <Script
            id="ga4-loader"
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-SQBPMGH3BM"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SQBPMGH3BM');`
            }}
          />
        </body>
      </ReactLenis>
    </html>
  );
}

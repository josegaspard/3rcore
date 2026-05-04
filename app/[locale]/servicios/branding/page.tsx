'use client';

import ContactForm from "@/components/layout/ContactForm";
import ClientSection from "@/components/layout/ClientSection";
import ProcessSection from "@/components/sections/servicios/branding/processSection";
import BrandManualSection from "@/components/sections/servicios/branding/brandManualSection";
import { BrandShowSection } from "@/components/sections/servicios/branding/brandShowSection";
import Portfolio from "@/components/sections/servicios/branding/Portfolio";
import BrandApplications from "@/components/sections/servicios/branding/aplicationSection";
import HeroBranding from "@/components/sections/servicios/branding/heroBranding";
import { useScrollToSection } from '@/components/ui/useScrollToSection';
import { useTranslations } from 'next-intl';

import {useIndividualPageLoader} from '@/components/layout/useIndividualPageLoader'
import { AnimatePresence } from 'framer-motion';
import PageLoader from '@/components/layout/PageLoader';


import WhatsAppBtn from '@/components/ui/WhatsAppBtn';
import ScrollContactBtn from '@/components/ui/ScrollContactBtn'
import ReviewsSection from "@/components/layout/ReviewsSection";
import ServiceFAQ from "@/components/seo/ServiceFAQ";
import SEOContentBlock from "@/components/seo/SEOContentBlock";

export default function Branding() {

  useScrollToSection();
  const isLoading = useIndividualPageLoader({
    timeout: 4000,
    minLoadingTime: 1200,
    checkVideos: true
  });
  const tH1 = useTranslations('HiddenH1');


  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="home-loader" />}
      </AnimatePresence>
      <h1 className="sr-only">{tH1('branding')}</h1>
      <div id="hero">
        <HeroBranding />
      </div>
      <ProcessSection />
      <BrandManualSection />
      <BrandShowSection />
      <BrandApplications />
      <Portfolio />
      <ClientSection />
      <ReviewsSection/>
      <ServiceFAQ namespace="BrandingFAQ" count={10} />
      <SEOContentBlock
        namespace="BrandingSEO"
        paragraphs={4}
        relatedLinks={[
          { href: "/servicios/web-development", label: "Diseño Web" },
          { href: "/servicios/socialmedia", label: "Redes Sociales" },
          { href: "/servicios/google-ads", label: "Google Ads" },
          { href: "/posicionamiento-seo", label: "SEO" },
        ]}
      />
      <div id="contacto">
        <ContactForm />
      </div>
      <ScrollContactBtn />
      <WhatsAppBtn />
    </>
  );
}
'use client';
import ContactForm from "@/components/layout/ContactForm";
import HeroSeo from "@/components/sections/servicios/google-ads/heroSeo";
import SeoSemSection from "@/components/sections/servicios/google-ads/seoSemSection";
import SeoSemCall from "@/components/sections/servicios/google-ads/seoSemCall";
import { SeoClients } from "@/components/sections/servicios/google-ads/seoClients";
import WorkMethodology from "@/components/sections/servicios/google-ads/workMetodology";
import ToolsCarousel from "@/components/sections/servicios/google-ads/toolsCarru";
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
export default function GoogleAds(){

  useScrollToSection();
  const isLoading = useIndividualPageLoader({
      timeout: 4000,
      minLoadingTime: 1200,
      checkVideos: true
    });
  const tH1 = useTranslations('HiddenH1');


  return(
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="home-loader" />}
      </AnimatePresence>
      <main >
        <h1 className="sr-only">{tH1('googleads')}</h1>
        <div id="hero">
          <HeroSeo />
        </div>
        <SeoSemCall/>
        <SeoSemSection/>
        <SeoClients />
        <ReviewsSection/>
        <WorkMethodology/>
        <ToolsCarousel/>
        <ServiceFAQ namespace="GoogleAdsFAQ" count={6} />
        <SEOContentBlock
          namespace="GoogleAdsSEO"
          paragraphs={4}
          relatedLinks={[
            { href: "/posicionamiento-seo", label: "SEO Orgánico" },
            { href: "/servicios/web-development", label: "Diseño Web" },
            { href: "/servicios/socialmedia", label: "Redes Sociales" },
            { href: "/servicios/branding", label: "Branding" },
          ]}
        />
        <div id="contacto">
          <ContactForm/>
        </div>
        <ScrollContactBtn />
        <WhatsAppBtn />
      </main>

    </>
  );
}
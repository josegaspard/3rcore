'use client';
import ContactForm from "@/components/layout/ContactForm";
import ClientSection from "@/components/layout/ClientSection";
import HeroWeb from "@/components/sections/servicios/web-development/heroWeb";
import ProcessWebSection from "@/components/sections/servicios/web-development/processWebSection";
import WebInfoSection from "@/components/sections/servicios/web-development/webInfoSection";
import ImgWebSection from "@/components/sections/servicios/web-development/imgWebSection";
import WebTypesSection from "@/components/sections/servicios/web-development/webTypesSection";
import WebApplications from "@/components/sections/servicios/web-development/aplicationWebSection";
import WebFaq from "@/components/sections/servicios/web-development/webFaq";
import WebImgSection from "@/components/sections/servicios/web-development/webimgSection";
import { useScrollToSection } from '@/components/ui/useScrollToSection';
import { useTranslations } from 'next-intl';

import {useIndividualPageLoader} from '@/components/layout/useIndividualPageLoader'
import { AnimatePresence } from 'framer-motion';
import PageLoader from '@/components/layout/PageLoader';


import WhatsAppBtn from '@/components/ui/WhatsAppBtn';
import ScrollContactBtn from '@/components/ui/ScrollContactBtn'
import ReviewsSection from "@/components/layout/ReviewsSection";
import SEOContentBlock from "@/components/seo/SEOContentBlock";
export default function WebDeveploment(){

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
        <h1 className="sr-only">{tH1('webdev')}</h1>
        <div id="hero">
          <HeroWeb />
        </div>
        <ProcessWebSection/>
        <WebInfoSection/>
        <ImgWebSection/>
        <WebTypesSection/>
        <WebApplications/>
        <WebFaq/>
        <WebImgSection/>

        <ClientSection />
        <ReviewsSection/>
        <SEOContentBlock
          namespace="WebDevSEO"
          paragraphs={4}
          relatedLinks={[
            { href: "/servicios/branding", label: "Branding" },
            { href: "/servicios/socialmedia", label: "Redes Sociales" },
            { href: "/servicios/google-ads", label: "Google Ads" },
            { href: "/posicionamiento-seo", label: "SEO" },
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
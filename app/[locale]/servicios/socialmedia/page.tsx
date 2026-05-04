'use client';
import ContactForm from "@/components/layout/ContactForm";
import ClientSection from "@/components/layout/ClientSection";
import MediaApplications from "@/components/sections/servicios/socialmedia/aplicationMediaSection";
import HeroSocialMedia from "@/components/sections/servicios/socialmedia/heroSocialMedia";
import ProcessSMSection from "@/components/sections/servicios/socialmedia/processSMSection";
import SocialPortfolio from "@/components/sections/servicios/socialmedia/socialPortfolio";
import SocialPost from "@/components/sections/servicios/socialmedia/socialPost";
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
export default function socialmedia(){

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
        <h1 className="sr-only">{tH1('socialmedia')}</h1>
        <div id="hero">
          <HeroSocialMedia/>
        </div>
        <ProcessSMSection/>
        <SocialPost/>
        <SocialPortfolio/>
        <MediaApplications/>

        <ClientSection />
        <ReviewsSection/>
        <ServiceFAQ namespace="SocialMediaFAQ" count={10} />
        <SEOContentBlock
          namespace="SocialMediaSEO"
          paragraphs={4}
          relatedLinks={[
            { href: "/servicios/branding", label: "Branding" },
            { href: "/servicios/web-development", label: "Diseño Web" },
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
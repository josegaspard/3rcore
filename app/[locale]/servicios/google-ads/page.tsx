'use client';
import ContactForm from "@/components/layout/ContactForm";
import HeroSeo from "@/components/sections/servicios/google-ads/heroSeo";
import SeoSemSection from "@/components/sections/servicios/google-ads/seoSemSection";
import SeoSemCall from "@/components/sections/servicios/google-ads/seoSemCall";
import { SeoClients } from "@/components/sections/servicios/google-ads/seoClients";
import WorkMethodology from "@/components/sections/servicios/google-ads/workMetodology";
import ToolsCarousel from "@/components/sections/servicios/google-ads/toolsCarru";
import { useScrollToSection } from '@/components/ui/useScrollToSection';

import {useIndividualPageLoader} from '@/components/layout/useIndividualPageLoader'
import { AnimatePresence } from 'framer-motion';
import PageLoader from '@/components/layout/PageLoader';


import WhatsAppBtn from '@/components/ui/WhatsAppBtn';
import ScrollContactBtn from '@/components/ui/ScrollContactBtn'
import ReviewsSection from "@/components/layout/ReviewsSection";
export default function GoogleAds(){
  
  useScrollToSection(); 
  const isLoading = useIndividualPageLoader({ 
      timeout: 4000, 
      minLoadingTime: 1200,
      checkVideos: true 
    });
  
    
  return(
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="home-loader" />}
      </AnimatePresence>
      <main >
        <div id="hero">
          <HeroSeo />
        </div>
        <SeoSemCall/>
        <SeoSemSection/>
        <SeoClients />
        <ReviewsSection/>
        <WorkMethodology/>
        <ToolsCarousel/>
        <div id="contacto">
          <ContactForm/>
        </div>
        <ScrollContactBtn />
        <WhatsAppBtn />
      </main>
 
    </>
  );
}
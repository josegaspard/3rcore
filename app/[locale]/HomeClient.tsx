'use client';

import TeamSection from '@/components/sections/home/TeamSection'
import StatsAndCTA from '@/components/sections/home/CTASection'
import Hero from '@/components/sections/home/Hero'
import ClientSection from '@/components/layout/ClientSection';
import NewsSection from '@/components/sections/home/NewsSection';
import MosaicoParallax from '@/components/sections/home/imagesParallaxSection';
import ContactForm from '@/components/layout/ContactForm';
import ProjectsSection from '@/components/sections/home/ProjectsSection';
import { useScrollToSection } from '@/components/ui/useScrollToSection';

import {useIndividualPageLoader} from '@/components/layout/useIndividualPageLoader'
import { AnimatePresence } from 'framer-motion';
import PageLoader from '@/components/layout/PageLoader';

import WhatsAppBtn from '@/components/ui/WhatsAppBtn';
import ScrollContactBtn from '@/components/ui/ScrollContactBtn'
import ReviewsSection from '@/components/layout/ReviewsSection';

export default function HomeClient() {

  useScrollToSection();
  const isLoading = useIndividualPageLoader({
    timeout: 4000,
    minLoadingTime: 1200,
    checkVideos: true
  });

  return (
    <>
      <AnimatePresence mode="wait">
            {isLoading && <PageLoader key="home-loader" />}
      </AnimatePresence>
      <main>

        <div id="hero">
          <Hero />
        </div>
        <TeamSection />
        <div id="servicios">
          <ProjectsSection />
        </div>
        <StatsAndCTA />
        <MosaicoParallax />
        <ClientSection />
        <ReviewsSection/>
        <NewsSection />
        <div id="contacto">
          <ContactForm />
        </div>
        <ScrollContactBtn />
        <WhatsAppBtn />
      </main>
    </>
  );
}

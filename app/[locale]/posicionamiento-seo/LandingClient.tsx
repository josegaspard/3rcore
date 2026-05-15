"use client"
import LandingContact from "@/components/layout/landingContact";
import ReviewsSection from "@/components/layout/ReviewsSection";
import FirstLandingSection from "@/components/sections/landing/firstLandingSection";
import FiveLandingSection from "@/components/sections/landing/fiveLandingSection";
import FourthLandingSection from "@/components/sections/landing/fourthLandingSection";
import HeroLanding from "@/components/sections/landing/heroLanding";
import SecondLandingSection from "@/components/sections/landing/secondLandingSection";
import SixLandingSection from "@/components/sections/landing/sixLandingSection";
import ThirdLandingSection from "@/components/sections/landing/thirdLandingSection";
import Tools from "@/components/sections/landing/Tools";
import { SeoClients } from "@/components/sections/servicios/google-ads/seoClients";
import WhatsAppBtnLanding from '@/components/ui/WhatsAppBtnLanding'
import ServiceFAQ from "@/components/seo/ServiceFAQ";
import SEOContentBlock from "@/components/seo/SEOContentBlock";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from "react";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);
  const tH1 = useTranslations('HiddenH1');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };
  return (
    <main>
      <h1 className="sr-only">{tH1('seo')}</h1>
      <div id="hero">
        <HeroLanding  onImageLoad={handleImageLoaded} />
      </div>
      <Tools/>
      <FirstLandingSection/>
      <SecondLandingSection/>
      <ThirdLandingSection/>
      <FourthLandingSection/>
      <ReviewsSection/>
      <ServiceFAQ namespace="SEOFAQ" count={8} />
      <SEOContentBlock
        namespace="SEOSEOBlock"
        paragraphs={4}
        relatedLinks={[
          { href: "/servicios/google-ads", label: "Google Ads" },
          { href: "/servicios/web-development", label: "Diseño Web" },
          { href: "/servicios/branding", label: "Branding" },
          { href: "/servicios/socialmedia", label: "Redes Sociales" },
        ]}
      />
      <div  id="contacto">
        <LandingContact/>
      </div>
      <WhatsAppBtnLanding/>
    </main>

  );
}

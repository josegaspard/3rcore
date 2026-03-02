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
import { SeoClients } from "@/components/sections/servicios/seo-sem/seoClients";
import WhatsAppBtnLanding from '@/components/ui/WhatsAppBtnLanding'
import { useEffect, useState } from "react";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);
    
  const handleImageLoaded = () => {
    setIsLoading(false);
  };
  return (
    <main>
      <div id="hero">
        <HeroLanding  onImageLoad={handleImageLoaded} />
      </div>
      <Tools/>
      <FirstLandingSection/>
      <SecondLandingSection/>
      <ThirdLandingSection/>
      <FourthLandingSection/>
      <ReviewsSection/>
      <div  id="contacto">
        <LandingContact/>
      </div>
      <WhatsAppBtnLanding/>
    </main>

  );
}

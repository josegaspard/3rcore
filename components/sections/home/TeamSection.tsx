"use client";

import { useRef } from "react";
import { Playfair_Display, Montserrat } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  style: ['italic'], 
  weight: ["400"]
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "700"] 
});

const TeamSection = () => {
  const t = useTranslations('TeamSection');
  const containerRef = useRef(null);

  const titleWords = t('title').split(" ");
  const descriptionWords = t('description').split(" ");
 

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", 
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".title-word-anim", {
      y: 30, opacity: 0, filter: "blur(8px)", stagger: 0.1, duration: 1, ease: "power3.out"
    })
    .from(".team-subtitle", {
      y: 30, opacity: 0, filter: "blur(10px)", duration: 1.2, ease: "power2.out"
    }, "-=0.6") 
    .from(".team-line", {
      scaleX: 0, opacity: 0, duration: 1.5, ease: "power3.inOut"
    }, "-=1.0")
    .from(".word-anim", {
      opacity: 0, y: 10, filter: "blur(4px)", stagger: 0.02, duration: 0.8, ease: "power1.out"
    }, "-=1.2"); 

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full pt-12 md:pt-14 px-5 flex justify-center items-center overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-18 bg-gradient-to-t from-[#16021B] via-[#16021B]/10 to-black/90 z-0 pointer-events-none" />
      <div className="max-w-3xl 2xl:max-w-7xl mx-auto text-center">
        
        <h2 className={`team-title ${playfair.className} text-white text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 tracking-wide leading-tight`}>
          {titleWords.map((word, index) => (
            <span key={index} className="title-word-anim inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h2>

        <h3 className={`team-subtitle ${montserrat.className} text-[#D11E68] text-2xl sm:text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl mb-10 tracking-tight will-change-transform`}>
          
          {t('subtitle')}
        </h3>

        <div className="team-line w-full max-w-3xl mx-auto h-[1px] bg-white/40 my-10 origin-center will-change-transform"></div>

        <p className={`${montserrat.className} text-white text-sm sm:text-sm md:text-sm xl:text-sm 2xl:text-xl leading-relaxed max-w-5xl mx-auto md:px-4`}>
          <span style={{ 
                  backgroundColor: '#A21F8A', 
                  padding: '2px 10px', 
                  borderRadius: '2px' 
                }}>{t('subray1')}</span> {t('description')} <span style={{ 
                  backgroundColor: '#A21F8A', 
                  padding: '2px 10px', 
                  borderRadius: '2px' 
                }}>{t('description2')}</span> {t('description3')}
        </p>

      </div>
      
    </section>
  );
};

export default TeamSection;
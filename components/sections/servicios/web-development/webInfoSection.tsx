'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const WebInfoSection = () => {

  const t = useTranslations('WebHero');
  

  const phoneNumber = "51986889147";
  const message = "Hola vengo de la página web, quiero agendar una reunión.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank');
  };
  
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      tl.fromTo(lineRef.current, 
        { scaleX: 0, opacity: 0 }, 
        { scaleX: 1, opacity: 1, duration: 1.2, ease: "power4.inOut" }
      )
      .from(contentRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.6");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full text-white py-20 px-10 flex flex-col items-center text-center"
    >
      <div className="max-w-4xl lg:max-w-xl xl:max-w-4xl w-full space-y-12">
        <div className="space-y-4">
          <h2 className="text-sm lg:text-lg tracking-[0.1em] uppercase font-light text-white">
             <span style={{ 
                  backgroundColor: '#A21F8A', 
                  padding: '2px 10px', 
                  borderRadius: '2px' 
                }}>
              { t('poTitle')}
             </span>
          </h2>
          <div 
            ref={lineRef}
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent"
          />
        </div>

        <div ref={contentRef} className="space-y-5">
          <p className="text-xs lg:text-sm xl:text-lg 2xl:text-xl leading-relaxed text-white max-w-xl lg:max-w-3xl mx-auto font-light">
            { t('poParraf1')}
          </p>
          <p className="text-xs lg:text-sm xl:text-lg 2xl:text-xl leading-relaxed text-white max-w-xl lg:max-w-3xl mx-auto font-light">
            { t('poParraf2')}
          </p>
          <p className="text-xs lg:text-sm xl:text-lg 2xl:text-xl leading-relaxed text-white max-w-xl lg:max-w-3xl mx-auto font-light">
            { t('poParraf3')}
          </p>
          
          <div className="pt-4">
            <button 
              onClick={handleWhatsAppClick}
              className="group relative px-10 py-3 border border-gray-500 rounded-[15px] text-xs tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 ease-in-out hover:border-transparent"
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-opacity duration-500 ease-in-out" />
              
              <span className="relative z-10">
                 { t('pobot')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebInfoSection;
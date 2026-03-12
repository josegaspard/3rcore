"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WorkMethodology = () => {
  const t = useTranslations('SEOMETO');
  const containerRef = useRef(null);

  const steps = [
    { title: t('step1_title'), description: t('step1_desc') },
    { title: t('step2_title'), description: t('step2_desc') },
    { title: t('step3_title'), description: t('step3_desc') },
    { title: t('step4_title'), description: t('step4_desc') },
    { title: t('step5_title'), description: t('step5_desc') }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.from(".header-content", { y: 30, opacity: 0, duration: 1, ease: "power3.out" });
    tl.from(".border-line", { scaleX: 0, duration: 1, stagger: 0.2, ease: "power2.inOut" }, "-=0.5");
    tl.from(".step-item", { y: 20, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "-=0.8");
    tl.from(".laptop-image", { y: 100, opacity: 0, duration: 1.2, ease: "power2.out" }, "-=0.5");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="text-white pt-16 px-10 md:px-8 flex flex-col items-center bg-gradient-to-r from-[#4c0046] to-[#130218]">
      
      <div className="header-content text-center max-w-3xl mb-12">
        <h2 className="text-3xl md:text-4xl font-serif italic mb-8">
          {t('title')}
        </h2>
        <p className={`text-sm md:text-lg font-light tracking-wide leading-relaxed`}>
          {t('subtitle1')}
          <span 
            style={{ 
              backgroundColor: '#A21F8A', 
              padding: '2px 10px', 
              borderRadius: '2px',
              margin: '0 4px' 
            }}
          >
            {t('subtitle2')}
          </span>
          <span dangerouslySetInnerHTML={{ __html: t('subtitle3') }} />
        </p>
      </div>

      <div className="w-full max-w-4xl border-t border-white/80 border-line">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="step-item grid grid-cols-1 md:grid-cols-2 py-8 border-b border-white/80 border-line items-center gap-4"
          >
            <h3 className="text-sm md:text-base font-bold tracking-widest uppercase">
              {step.title}
            </h3>
            <p className="text-sm md:text-base font-light text-white">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="laptop-image mt-16 w-full max-w-5xl flex justify-center relative z-20 -mb-[5%] md:-mb-[10%] pointer-events-none">
        <img 
          src="/images/seosem/laptopCom.webp" 
          alt="Mockup Laptop" 
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </div>
    </section>
  );
};

export default WorkMethodology;
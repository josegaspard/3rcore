'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTranslations } from 'next-intl';
import HighlightedDescription from '@/components/ui/highlight'
gsap.registerPlugin(ScrollTrigger);

const SeoSemSection = () => {
  const t = useTranslations('SeoSemSection');

  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const seoRef = useRef<HTMLDivElement>(null);
  const semRef = useRef<HTMLDivElement>(null);
  const seoLineRef = useRef<HTMLDivElement>(null);
  const semLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        scaleX: 0,
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.2
      });

      gsap.from(descriptionRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4
      });

      gsap.from(seoRef.current, {
        scrollTrigger: {
          trigger: seoRef.current,
          start: "top 85%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(seoLineRef.current, {
        scrollTrigger: {
          trigger: seoRef.current,
          start: "top 80%",
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.2
      });

      gsap.from(seoRef.current?.querySelectorAll('.seo-item') || [], {
        scrollTrigger: {
          trigger: seoRef.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.5
      });

      gsap.from(semRef.current, {
        scrollTrigger: {
          trigger: semRef.current,
          start: "top 85%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(semLineRef.current, {
        scrollTrigger: {
          trigger: semRef.current,
          start: "top 80%",
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.2
      });

      gsap.from(semRef.current?.querySelectorAll('.sem-item') || [], {
        scrollTrigger: {
          trigger: semRef.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full text-white py-10 xl:py-20 px-10 md:px-6 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 lg:mb-20 2xl:mb-30 space-y-6">
          <h2 
            ref={titleRef}
            className="text-base md:text-lg tracking-[0.1em] uppercase font-light"
          >
            <span className="relative inline-block px-2 py-1">
              <span className="relative z-10">{t('header.subtitle')}</span>
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#A21F8A]"></span>
              <span className="absolute inset-0 bg-[#A21F8A]/100 rounded-sm"></span>
            </span>
          </h2>
          
          <div 
            ref={lineRef}
            className="h-[1px] w-full bg-white max-w-2xl mx-auto origin-center"
          />
          
          <div 
            ref={descriptionRef}
            className="text-xs lg:text-base 2xl:text-xl leading-relaxed max-w-3xl lg:max-w-xl xl:max-w-3xl mx-auto font-light"
          >
            <HighlightedDescription text={t('header.description')} />
          </div>
        </div>

        

        <div ref={semRef}>
          <div className="grid md:grid-cols-[40%_60%] gap-0">
            <div className="flex items-center md:justify-center min-h-[200px] md:min-h-[400px]">
              <div className="space-y-2 2xl:max-w-[40%]">
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif italic text-[#E91E63]">
                  {t('sem.title')}
                </h3>
                <p className="text-sm md:text-base font-light">
                  {t('sem.subtitle')}
                </p>
              </div>
            </div>

            <div className="pl-8 md:pl-12 flex items-center relative">
              <div 
                ref={semLineRef}
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-white origin-top"
              />
              <div className="space-y-6 py-8">
                <p className="text-xs lg:text-sm 2xl:text-xl leading-relaxed sem-item">
                  {t.rich('sem.description', {
                    strong: (chunks) => <strong className="font-bold">{chunks}</strong>
                  })}
                </p>
                
                <ul className="space-y-3 text-xs lg:text-sm 2xl:text-xl">
                  {t.raw('sem.items').map((item: string, index: number) => (
                    <li key={index} className="sem-item">
                      - {t.rich(`sem.items.${index}`, {
                          strong: (chunks) => <strong className="font-bold">{chunks}</strong>
                        })}
                    </li>
                  ))}
                </ul>
                <p className="text-xs lg:text-sm 2xl:text-xl italic font-light pt-4 sem-item">
                  {t.rich('sem.footer', {
                    strong: (chunks) => <strong className="font-bold">{chunks}</strong>
                  })}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoSemSection;

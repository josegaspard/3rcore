'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function FirstLandingSection() {
  
  const t = useTranslations('ThirdLandingSection');
  
  const sectionRef = useRef(null);
  const numberRef = useRef(null);
  const lineRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const quoteRef = useRef(null);
  const quoteText1Ref = useRef(null);
  const quoteText2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(numberRef.current, {
        scrollTrigger: {
          trigger: numberRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 80%',
        },
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });

      gsap.from(descriptionRef.current, {
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.7,
        ease: 'power3.out',
      });

      gsap.from(quoteRef.current, {
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(quoteText1Ref.current, {
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from(quoteText2Ref.current, {
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-10 px-10 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="mb-12">
          <h3 
            ref={numberRef}
            className="text-[#A21F8A] text-4xl lg:text-5xl xl:text-6xl font-bold italic tracking-tight"
          >
            {t('number')}
          </h3>
          <div 
            ref={lineRef}
            className="w-30 h-[2px] bg-white mt-2"
          ></div>
        </div>

        <h2 
          ref={headingRef}
          className="text-white text-lg md:text-xl lg:text-xl 2xl:text-3xl font-semibold mb-6 max-w-7xl leading-tight"
        >
          {t('heading')}
        </h2>

        <p 
          ref={descriptionRef}
          className="text-white text-xs lg:text-sm 2xl:text-base max-w-4xl xl:mb-16 leading-relaxed"
        >
          {t('description')}
        </p>

        <div 
          ref={quoteRef}
          className="relative max-w-5xl mx-auto my-3"
        >
          <div className="absolute -left-8 md:-left-16 top-0 w-24 h-24 md:w-32 md:h-32 bg-[#24032D] scale-x-[-1]"
            style={{
              maskImage: 'url("/images/landing/comillas.svg")',
              maskRepeat: 'no-repeat',
              maskSize: 'contain',
              WebkitMaskImage: 'url("/images/landing/comillas.svg")',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain'
            }}>
          </div>
          <div className="absolute -right-8 md:-right-16 bottom-0 w-24 h-24 md:w-32 md:h-32 bg-[#24032D]"
            style={{
              maskImage: 'url("/images/landing/comillas.svg")',
              maskRepeat: 'no-repeat',
              maskSize: 'contain',
              WebkitMaskImage: 'url("/images/landing/comillas.svg")',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain'
            }}>
          </div>

          <div className="text-center px-1 md:px-16 py-1 xl:py-8">
            <p 
              ref={quoteText1Ref}
              className="text-white/90 text-xl md:text-2xl lg:text-3xl italic mb-1 font-light"
            >
              {t('quote.line1')}
            </p>
            <p 
              ref={quoteText2Ref}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#E91E63] to-[#9C27B0] text-xl md:text-3xl lg:text-4xl font-medium leading-relaxed"
            >
              {t('quote.line2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
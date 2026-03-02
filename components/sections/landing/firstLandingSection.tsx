'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function FirstLandingSection() {
  const sectionRef = useRef(null);
  const numberRef = useRef(null);
  const lineRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const quoteRef = useRef(null);
  const priceCardRef = useRef(null);

  const t = useTranslations('FirstLandingSection');

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
        y: 40,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(priceCardRef.current, {
        scrollTrigger: {
          trigger: priceCardRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderGoogleText = (text: string) => {
    const googleColors = {
      'G': '#4285F4', 
      'o': '#EA4335', 
      'o2': '#FBBC04', 
      'g': '#4285F4', 
      'l': '#34A853', 
      'e': '#EA4335'  
    };

    return text.split(' ').map((word: string, wordIndex: number) => {
      if (word.toLowerCase() === 'google') {
        return (
          <span key={wordIndex}>
            <span style={{ color: googleColors['G'] }}>G</span>
            <span style={{ color: googleColors['o'] }}>o</span>
            <span style={{ color: googleColors['o2'] }}>o</span>
            <span style={{ color: googleColors['g'] }}>g</span>
            <span style={{ color: googleColors['l'] }}>l</span>
            <span style={{ color: googleColors['e'] }}>e</span>
            {' '}
          </span>
        );
      }
      return <span key={wordIndex}>{word} </span>;
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative  w-full  px-10 md:px-12 lg:px-24 overflow-hidden"
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
          {renderGoogleText(t('heading'))}
        </h2>

        <p 
          ref={descriptionRef}
          className="text-white text-xs lg:text-sm 2xl:text-base max-w-4xl xl:mb-16 leading-relaxed"
        >
          {renderGoogleText(t('description'))}
        </p>

        <div 
          ref={quoteRef}
          className="relative max-w-5xl mx-auto my-10"
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

          <div className="relative index-3 text-center px-1 md:px-16 py-1 xl:py-8">
            <p className="text-white/90 text-xl md:text-2xl 2xl:text-3xl italic mb-1 font-light">
              {t('quote.line1')}
            </p>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#E91E63] to-[#9C27B0] text-xl md:text-2xl 2xl:text-4xl font-medium leading-relaxed">
              {renderGoogleText(t('quote.line2'))}
            </p>
          </div>
        </div>

        
      </div>
    </section>
  );
}
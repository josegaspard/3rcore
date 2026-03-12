'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { SeoClients } from '../servicios/google-ads/seoClients';

gsap.registerPlugin(ScrollTrigger);

export default function FourthLandingSection() {

  const t = useTranslations('FourthLandingSection');
  const r = useTranslations('SixLandingSection');
  const R = useTranslations('WebHero');

  const phoneNumber = "51969791251";
  const message = "Hola vengo de la página web, quiero agendar una reunión.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank');
  };
  const sectionRef = useRef(null);
  const numberRef = useRef(null);
  const lineRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const quoteRef = useRef(null);
  const quoteRef1 = useRef(null);
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

      gsap.from(image1Ref.current, {
        scrollTrigger: {
          trigger: image1Ref.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(image2Ref.current, {
        scrollTrigger: {
          trigger: image2Ref.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: 100,
        duration: 1,
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
      gsap.from(quoteRef1.current, {
        scrollTrigger: {
          trigger: quoteRef1.current,
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.95,
        duration: 1,
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
      'e': '#EA4335',
      'q': '#FFFFFf'  
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
            <span style={{ color: googleColors['q'] }}>?</span>
            {' '}
          </span>
        );
      }
      return <span key={wordIndex}>{word} </span>;
    });
  };
  return (
    
    <>
      <section 
        ref={sectionRef}
        className="relative w-full py-5 px-10 md:px-12 lg:px-24 overflow-hidden"
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
            className="text-white text-xs lg:text-sm 2xl:text-base max-w-4xl mb-16 leading-relaxed"
          >
            {t('description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            <div 
              ref={image1Ref}
              className="relative w-full h-[300px] xl:h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="/images/landing/argentaria.gif" 
                alt="Caso de éxito 1"
                fill
              />
            </div>
            <div 
              ref={image2Ref}
              className="relative w-full h-[300px] xl:h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="/images/landing/asdeoros.gif" 
                alt="Caso de éxito 2"
                fill
              />
            </div>
          </div>

          <div 
            ref={quoteRef}
            className="relative max-w-5xl mx-auto x:my-24"
          >
            <div className="text-center px-1 md:px-16">
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
      <SeoClients/>
      <div 
          ref={quoteRef1}
          className="relative max-w-5xl mx-auto my-5 xl:my-15"
        >

          <div className="relative index-3 text-center px-1 md:px-16 py-8">
            <p className="text-white/90 text-xl md:text-2xl 2xl:text-3xl italic mb-1 font-light">
              {renderGoogleText(r('heading'))}
            </p>
          </div>
          <div className=" flex justify-center">
              <button 
                onClick={handleWhatsAppClick}
                className="group relative px-10 py-3 border border-gray-500 rounded-[15px] text-xs xl:text-xl tracking-[0.1em] uppercase overflow-hidden transition-all duration-500 ease-in-out hover:border-transparent hover:cursor-pointer"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-opacity duration-500 ease-in-out" />
                
                <span className="relative z-10">
                  { R('pobot')}
                </span>
              </button>
          </div>  
        </div>
        
    </>
  );
}
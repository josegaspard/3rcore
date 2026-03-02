'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function SecondLandingSection() {

  const t = useTranslations('SecondLandingSection');

  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      gsap.from(q(".header-anim"), {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(q(".line-grow"), {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      q(".card-wrapper").forEach((card, i) => {
        const isEven = i % 2 === 0;
        const img = card.querySelector(".img-container");
        const text = card.querySelector(".text-container");

        gsap.from(img, {
          x: isEven ? -100 : 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: { trigger: card, start: "top 80%" }
        });

        gsap.from(text, {
          x: isEven ? 100 : -100,
          opacity: 0,
          duration: 1,
          scrollTrigger: { trigger: card, start: "top 80%" }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const baseContainer = "relative w-full aspect-[16/9] md:aspect-auto md:h-[450px] flex justify-center items-center bg-gradient-to-r from-[#4c0046] to-[#24032D] overflow-hidden";
  
  return (
    <section ref={sectionRef} className="relative min-h-screen w-full  py-5 overflow-hidden ">
      <div className="relative max-w-7xl mx-auto  xl:mb-16 px-10">
        <div className="mb-8">
          <h3 className="header-anim text-[#A21F8A] text-4xl lg:text-5xl xl:text-6xl font-bold italic tracking-tight">{t('number')}</h3>
          <div className="line-grow w-30 h-[2px] bg-white mt-2"></div>
        </div>
        <h2 className="header-anim text-white text-lg md:text-xl lg:text-xl 2xl:text-3xl font-semibold mb-6 leading-tight">
          {t('title')}
        </h2>
        <p className="header-anim text-white text-xs lg:text-sm 2xl:text-base max-w-4xl leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      <div className='w-full max-w-8xl mx-auto space-y-12'>
        
        <div className='card-wrapper backdrop-blur-sm rounded-3xl overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
            
            <div className={`img-container ${baseContainer} order-2 md:order-1`}>
              <Image 
                src="/images/landing/img.webp" 
                alt="Auditoría SEO"
                width={1952}
                height={930}
                quality={100}
                priority
                className="w-full h-full object-cover" 
              />
            </div>

            <div className='text-container p-10 md:p-8 md:p-16 lg:p-24 flex items-center justify-center order-1 md:order-2'>
              <div className='max-w-md w-full'>
                <h3 className='text-white text-lg xl:text-2xl font-bold uppercase mb-6'>
                  {t('cards.audit.title')}
                </h3>
                <ul className='text-white/90  space-y-3 text-sm xl:text-base'>
                  <li>- {t('cards.audit.items.0')}</li>
                  <li>- {t('cards.audit.items.1')}</li>
                  <li>- {t('cards.audit.items.2')}</li>
                  <li>- {t('cards.audit.items.3')}</li>
                  <li>- {t('cards.audit.items.4')}</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        <div className='card-wrapper rounded-3xl overflow-hidden'>
          <div className='grid md:grid-cols-2 items-center'>
            <div className='text-container pb-5 px-10 xl:p-10 md:p-8 md:p-16 lg:p-24 flex items-center justify-center'>
              <div className='max-w-md w-full'>
                <h3 className='text-white text-lg xl:text-2xl font-bold uppercase mb-6'>{t('cards.interlinks.title')}</h3>
                <ul className='text-white/90 space-y-3 text-sm xl:text-base'>
                  <li>- {t('cards.interlinks.items.0')}</li>
                  <li>- {t('cards.interlinks.items.1')}</li>
                  <li>- {t('cards.interlinks.items.2')}</li>
                  <li>- {t('cards.interlinks.items.3')}</li>
                </ul>
              </div>
            </div>
            <div className={`img-container ${baseContainer} p-12 md:p-16 order-1 md:order-2`}>
              <Image 
                src="/images/landing/secondimg2.webp" 
                alt="Interlinks"
                width={1952}
                height={930}
                quality={100}
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
        </div>

        <div className='card-wrapper rounded-3xl overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
            
            <div className={`img-container ${baseContainer} p-12 md:p-16 order-2 md:order-1`}>
              <Image 
                src="/images/landing/secondimg3.webp" 
                alt="Escalamiento"
                width={1952}
                height={930}
                quality={100}
                className="w-full h-full object-contain" 
              />
            </div>

            <div className='text-container pb-5 px-10 xl:p-10 md:p-8 md:p-16 lg:p-24 flex items-center justify-center order-1 md:order-2'>
              <div className='max-w-md w-full'> 
                <h3 className='text-white text-lg xl:text-2xl font-bold uppercase mb-6 text-left'>
                  {t('cards.scaling.title')}
                </h3>
                <ul className='text-white/90 space-y-3 text-sm xl:text-base text-left'>
                  <li>- {t('cards.scaling.items.0')}</li>
                  <li>- {t('cards.scaling.items.1')}</li>
                  <li>- {t('cards.scaling.items.2')}</li>
                  <li>- {t('cards.scaling.items.3')}</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
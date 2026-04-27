'use client';
import { Trirong } from 'next/font/google';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const trirong = Trirong({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const ProcessWebSection = () => {

  const t = useTranslations('WebHero');
  

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subheaderRef = useRef(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  const steps = [
    { id: '01.', title: t('proIn') },
    { id: '02.', title: t('proEs') },
    { id: '03.', title: t('proAr') },
    { id: '04.', title: t('proDi') },
    { id: '05.', title: t('proPu') },
    { id: '06.', title: t('proGes') },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      masterTl.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      })
      .from(subheaderRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6");

      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        const line = step.querySelector('.border-b');
        const textElements = step.querySelectorAll('span, h3');

        masterTl.fromTo(line, 
          { scaleX: 0, transformOrigin: "left center" }, 
          { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
          `-=${index === 0 ? 0.2 : 0.4}` 
        )
        .from(textElements, {
          y: 15,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.4");
      });

      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' }, 
        { 
          clipPath: 'inset(0% 0% 0% 0%)', 
          duration: 1.5, 
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full text-white pt-5 font-sans flex flex-col items-center overflow-hidden">
      <div className="max-w-6xl lg:max-w-4xl xl:max-w-6xl w-full px-10 space-y-24">
        
        <div className="text-center space-y-8">
          <h2 ref={headerRef} className="italic text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-gray-200" style={{ fontFamily: 'serif' }}>
            { t('protitle')}
          </h2>
          <p ref={subheaderRef} className="text-xl lg:text-3xl xl:text-5xl  2xl:text-5xl font-medium leading-tight bg-clip-text text-transparent"style={{backgroundImage: 'linear-gradient(to right, #9C27B0 0%, #9C27B0 40%, #FF1A55 100%)'}}>
            { t('prosubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20 pb-10">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              ref={(el) => { stepsRef.current[index] = el; }}
              className="flex flex-col"
            >
              <span className={`block text-[#A21F8A] text-4xl lg:text-3xl 2xl:text-5xl font-bold mb-6 pb-4 ${trirong.className} border-b border-gray-600`}>
                {step.id}
              </span>
              <h3 className="xl:text-lg 2xl:text-xl font-semibold tracking-[0.07em]">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div ref={imageContainerRef} className="w-full md:h-[25vh] lg:h-[60vh]  mt-12 xl:mt-24 overflow-hidden">
        <img 
          ref={imageRef}
          src="/images/web/fondoWeb.webp" 
          alt="Proceso creativo"
          className="w-full h-full object-cover" 
        />
      </div>
    </section>
  );
};

export default ProcessWebSection;
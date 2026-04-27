'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const WebTypesSection = () => {
  const t = useTranslations('WebSection');
  const R = useTranslations('WebHero');
  const phoneNumber = "51986889147";
  const message = "Hola vengo de la página web, quiero agendar una reunión.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank');
  };
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  const seoRef = useRef<HTMLDivElement>(null);
  const seoLineRef = useRef<HTMLDivElement>(null);
  
  const infoRef = useRef<HTMLDivElement>(null);
  const infoLineRef = useRef<HTMLDivElement>(null);
  
  const ecommRef = useRef<HTMLDivElement>(null);
  const ecommLineRef = useRef<HTMLDivElement>(null);
  
  const elearnRef = useRef<HTMLDivElement>(null);
  const elearnLineRef = useRef<HTMLDivElement>(null);
  
  const servicRef = useRef<HTMLDivElement>(null);
  const servicLineRef = useRef<HTMLDivElement>(null);
  
  const blogsRef = useRef<HTMLDivElement>(null);
  const blogsLineRef = useRef<HTMLDivElement>(null);

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

      const animateSection = (
        ref: React.RefObject<HTMLDivElement | null>, 
        lineRef: React.RefObject<HTMLDivElement | null>, 
        className: string
      ) => {
        if (!ref.current || !lineRef.current) return;

        gsap.from(ref.current, {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
          },
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });

        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
          scaleY: 0,
          transformOrigin: "top",
          duration: 1.2,
          ease: "power3.inOut",
          delay: 0.2
        });

        gsap.from(ref.current.querySelectorAll(`.${className}`), {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.5
        });
      };

      animateSection(seoRef, seoLineRef, 'seo-item');
      animateSection(infoRef, infoLineRef, 'info-item');
      animateSection(ecommRef, ecommLineRef, 'ecomm-item');
      animateSection(elearnRef, elearnLineRef, 'elearn-item');
      animateSection(servicRef, servicLineRef, 'servic-item');
      animateSection(blogsRef, blogsLineRef, 'blogs-item');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full text-white py-15 xl:py-20 px-10  md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-30 space-y-6">
          <h2 
            ref={titleRef}
            className="text-base md:text-lg tracking-[0.2em] uppercase font-light"
          >
            <span style={{ 
                  backgroundColor: '#A21F8A', 
                  padding: '2px 10px', 
                  borderRadius: '2px' 
                }}>
              {t('header.subtitle')}
            </span>
          </h2>
          <div 
            ref={lineRef}
            className="h-[1px] w-full bg-white max-w-2xl mx-auto origin-center"
          />
          <p 
            ref={descriptionRef}
            className="text-xs md:text-sm lg:text-base leading-relaxed max-w-3xl mx-auto font-light"
            dangerouslySetInnerHTML={{ __html: t('header.description') }}
          />
        </div>
        <div ref={seoRef} className="mb-20">
          <div className="grid md:grid-cols-[40%_60%] gap-0">
            <div className="flex items-center min-h-[50px] md:min-h-[80px]">
              <div className="space-y-2 max-w-xs">
                <h3 className="text-xl md:text-xl lg:text-3xl font-serif italic text-[#E91E63]">
                  {t('landing.title')}
                </h3>
              </div>
            </div>

            <div className="pl-8 md:pl-12 flex items-center relative">
              <div 
                ref={seoLineRef}
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-white origin-top"
              />
              <div className="space-y-6 py-8">
                <p className="text-xs lg:text-sm xl:text-base 2xl:text-xl leading-relaxed seo-item">
                  {t('landing.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={infoRef} className="mb-20">
          <div className="grid md:grid-cols-[40%_60%] gap-0">
            <div className="flex items-center min-h-[50px] md:min-h-[80px]">
              <div className="space-y-2 max-w-xs">
                <h3 className="text-xl md:text-xl lg:text-3xl font-serif italic text-[#E91E63]">
                  {t('info.title')}
                </h3>
              </div>
            </div>

            <div className="pl-8 md:pl-12 flex items-center relative">
              <div 
                ref={infoLineRef}
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-white origin-top"
              />
              <div className="space-y-6 py-8">
                <p className="text-xs lg:text-sm xl:text-base 2xl:text-xl leading-relaxed info-item">
                  {t('info.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={ecommRef} className="mb-20">
          <div className="grid md:grid-cols-[40%_60%] gap-0">
            <div className="flex items-center min-h-[50px] md:min-h-[80px]">
              <div className="space-y-2 max-w-xs">
                <h3 className="text-xl md:text-xl lg:text-3xl font-serif italic text-[#E91E63]">
                  {t('Ecomm.title')}
                </h3>
              </div>
            </div>

            <div className="pl-8 md:pl-12 flex items-center relative">
              <div 
                ref={ecommLineRef}
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-white origin-top"
              />
              <div className="space-y-6 py-8">
                <p className="text-xs lg:text-sm xl:text-base 2xl:text-xl leading-relaxed ecomm-item">
                  {t('Ecomm.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={elearnRef} className="mb-20">
          <div className="grid md:grid-cols-[40%_60%] gap-0">
            <div className="flex items-center min-h-[50px] md:min-h-[80px]">
              <div className="space-y-2 max-w-xs">
                <h3 className="text-xl md:text-xl lg:text-3xl font-serif italic text-[#E91E63]">
                  {t('Elearn.title')}
                </h3>
              </div>
            </div>

            <div className="pl-8 md:pl-12 flex items-center relative">
              <div 
                ref={elearnLineRef}
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-white origin-top"
              />
              <div className="space-y-6 py-8">
                <p className="text-xs lg:text-sm xl:text-base 2xl:text-xl leading-relaxed elearn-item">
                  {t('Elearn.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={servicRef} className="mb-20">
          <div className="grid md:grid-cols-[40%_60%] gap-0">
            <div className="flex items-center min-h-[50px] md:min-h-[80px]">
              <div className="space-y-2 max-w-xs">
                <h3 className="text-xl md:text-xl lg:text-3xl font-serif italic text-[#E91E63]">
                  {t('Servic.title')}
                </h3>
              </div>
            </div>

            <div className="pl-8 md:pl-12 flex items-center relative">
              <div 
                ref={servicLineRef}
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-white origin-top"
              />
              <div className="space-y-6 py-8">
                <p className="text-xs lg:text-sm xl:text-base 2xl:text-xl leading-relaxed servic-item">
                  {t('Servic.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={blogsRef} className="mb-20">
          <div className="grid md:grid-cols-[40%_60%] gap-0">
            <div className="flex items-center min-h-[50px] md:min-h-[80px]">
              <div className="space-y-2 max-w-sm">
                <h3 className="text-xl md:text-xl lg:text-3xl font-serif italic text-[#E91E63]">
                  {t('Blogs.title')}
                </h3>
              </div>
            </div>

            <div className="pl-8 md:pl-12 flex items-center relative">
              <div 
                ref={blogsLineRef}
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-white origin-top"
              />
              <div className="space-y-6 py-8">
                <p className="text-xs lg:text-sm xl:text-base 2xl:text-xl leading-relaxed blogs-item">
                  {t('Blogs.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 flex justify-center">
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
      
    </section>
  );
};

export default WebTypesSection;
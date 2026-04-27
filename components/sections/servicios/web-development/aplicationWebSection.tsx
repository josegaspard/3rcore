"use client"
import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WebApplications() {
  const t = useTranslations('WebHero');

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !paragraphRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      gsap.from(paragraphRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        x: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.to(imageRef.current, {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      if (titleRef.current) {
        const title = titleRef.current;
        
        gsap.to(title, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          backgroundPosition: "200% center",
          duration: 3,
          ease: "none",
          repeat: -1
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full flex items-center px-10 lg:px-6 md:px-20 py-12 2xl:py-18 bg-gradient-to-r from-[#4c0046] to-[#130218]"
    > 
      <div className="max-w-6xl lg:max-w-4xl 2xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 items-center">
        
        <div className="flex flex-col space-y-4 md:space-y-8 text-center md:text-left">
          <h2 
            ref={titleRef}
            className="text-white text-3xl lg:text-4xl  2xl:text-5xl font-serif italic tracking-wide bg-gradient-to-r from-white via-pink-200 to-white bg-[length:200%_100%]"
            style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text' }}
          >
            {t('griPost')}
          </h2>
          
          <p 
            ref={paragraphRef}
            className="text-white/90 text-base lg:text-base 2xl:text-2xl font-light leading-relaxed max-w-xl mx-auto md:mx-0"
          >
            {t('griParraf')}
          </p>
        </div>

        <div 
          ref={imageRef}
          className="relative w-full h-auto mt-4 md:mt-0"
        >
          <img 
            src="/images/web/mono.webp" 
            alt="Brand Applications Mockup"
            className="w-full h-auto object-contain max-h-[300px] md:max-h-none"
          />
        </div>

      </div>
    </section>
  );
}
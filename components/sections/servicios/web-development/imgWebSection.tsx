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

const ImgWebSection = () => {

  const t = useTranslations('WebHero');
  

  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
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
    <section ref={sectionRef} className="w-full text-white py-0 font-sans flex flex-col items-center overflow-hidden">
      <div ref={imageContainerRef} className="w-full md:h-[40vh] lg:h-[70vh] xl:h-[90vh] overflow-hidden">
        <img 
          ref={imageRef}
          src="/images/web/fondoWeb2.webp" 
          alt="Proceso creativo"
          className="w-full h-full " 
        />
      </div>
    </section>
  );
};

export default ImgWebSection;
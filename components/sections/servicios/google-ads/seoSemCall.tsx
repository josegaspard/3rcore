'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SeoSemCall() {
  const t = useTranslations('SEOSEM');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      const titleLines = titleRef.current?.querySelectorAll('span');
      if (titleLines) {
        tl.from(titleLines, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }

      tl.from([paragraph1Ref.current, paragraph2Ref.current], {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
      }, '-=0.3'); 

      tl.from(imageRef.current, {
        opacity: 0,
        x: 100,
        rotation: 5,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.4');

      gsap.to(imageRef.current, {
        y: -15,
        duration: 1.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-4 flex items-center overflow-hidden"
    >
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="text-white space-y-6 px-10 lg:pl-20 2xl:pl-40">
            <h2 
              ref={titleRef}
              className="text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light leading-tight"
            >
              <span className="italic block">
                {t('title.part1').split('GOOGLE')[0]}
                <span className="font-normal not-italic">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC04]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
                {t('title.part1').split('GOOGLE')[1]}
              </span>
            </h2>

            <div className="space-y-4 text-xs lg:text-sm 2xl:text-lg">
              <p ref={paragraph1Ref} className="leading-relaxed">
                {t('description.paragraph1').split('(SEO)')[0]}
                <span className="bg-[#A21F8A] text-white px-1 py-0.5">(SEO)</span>
                {t('description.paragraph1').split('(SEO)')[1].split('(Google Ads)')[0]}
                <span className="bg-[#A21F8A] text-white px-1 py-0.5">(Google Ads)</span>
                {t('description.paragraph1').split('(Google Ads)')[1]}
              </p>

              <p ref={paragraph2Ref} className="leading-relaxed">
                {t('description.paragraph2')}
              </p>
            </div>
          </div>

          <div className="relative flex justify-end ms:justify-end lg:justify-end">
            <div 
              ref={imageRef}
              className="relative w-full max-w-[350px] lg:max-w-[650px] 2xl:max-w-[700px]"
            >
              <Image
                src="/images/seosem/laptopInici.webp"
                alt="Laptop showing Google search results"
                width={600}
                height={450}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
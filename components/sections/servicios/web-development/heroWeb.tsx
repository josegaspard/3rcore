'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';
import { SiShopify, SiWoocommerce } from 'react-icons/si';
import Image from 'next/image';

export default function HeroWeb() {

  const t = useTranslations('WebHero');
  

  const pinkBgRef = useRef(null);
  const andTextRef = useRef(null);
  const brTextRef = useRef(null);
  const lineRef = useRef(null);
  const sloganRef = useRef(null);
  const sectionRef = useRef(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayThrough = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('loadeddata', handleCanPlayThrough);

    video.load();

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('loadeddata', handleCanPlayThrough);
    };
  }, []);


   useEffect(() => {
    if (!isVideoLoaded) return;

    gsap.set(pinkBgRef.current, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(andTextRef.current, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(brTextRef.current, { opacity: 0, y: -20 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center' });
    gsap.set(sloganRef.current, { opacity: 0, y: 20 });
    
    setIsAnimationReady(true);

    const playAnimation = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });


      tl.to(pinkBgRef.current, { scaleX: 1, duration: 0.8, delay: 0.3 })
        .to(andTextRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to(brTextRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(lineRef.current, { scaleX: 1, duration: 0.8 }, '-=0.2')
        .to(sloganRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

      return tl;
    };
 
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVideoLoaded]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
      
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ opacity: isVideoLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
        >
          <source src="/videos/Web.webm" type="video/webm" />
          Tu navegador no soporta videos.
        </video>
        <div className="absolute inset-0 bg-[#130218] via-transparent to-transparent opacity-80"></div>
      </div>

      <div className="relative z-10 text-center px-10"style={{ 
        visibility: isAnimationReady ? 'visible' : 'hidden'
      }}>
        <div className="flex flex-col items-center">
          
          <div className='w-auto '>
            <div className="bg-none px-6 py-2 w-[100%] transform">
              <h2 
                ref={brTextRef}
                className="text-white text-left text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-black tracking-[0.1em] leading-none"
              >
                WEB
              </h2>
            </div>

            <div 
              ref={pinkBgRef}
              className="bg-[#ff0055] px-6 py-2 w-[100%] transform"
            >
              <h2 
                ref={andTextRef}
                className="text-white text-left text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-black tracking-[0.1em] leading-none"
              >
                DEVELOPMENT
              </h2>
            </div>
          </div>

          <div 
            ref={lineRef}
            className="w-full ms:w-2/3 lg:w-3/5 2xl:w-1/2 h-[1px] bg-white/50 my-8"
          ></div>
          
          <p 
            ref={sloganRef}
            className="text-white text-xs xl:text-sm font-light ms:w-2/3 md:w-1/2 2xl:w-1/2 mx-auto leading-relaxed break-words"
          >
            {t.rich('slogan', {
              bold: (chunks) => <strong className="font-bold text-white">{chunks}</strong>,
              shopify: (chunks) => (
                <span className="inline-flex items-center gap-1 font-semibold text-white">
                  <Image 
                    src="/icons/shop.svg" 
                    alt="Shopify"
                    width={30}
                    height={10}
                    className="inline brightness-0 invert"
                  />
                  {chunks}
                </span>
              ),
              woo: (chunks) => (
                <span className="inline-flex items-center gap-1 font-semibold text-white">
                  <Image 
                    src="/icons/woocommerce.svg" 
                    alt="WooCommerce"
                    width={80}
                    height={30}
                    className="inline brightness-0 invert"
                  />
                  {chunks}
                </span>
              )
            })}
          </p>
        </div>
      </div>
       <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#16021B] via-[#16021B]/50 to-transparent z-[6] pointer-events-none" />     
    </section>
  );
}
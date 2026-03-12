"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useTranslations } from 'next-intl';

import 'swiper/css';

const ToolsCarousel = () => {
  const t = useTranslations('TOOLS');

  const logos = [
    { src: "/images/seosem/Logo1.svg", alt: "Google Ads" },
    { src: "/images/seosem/Logo2.svg", alt: "Google Partner" },
    { src: "/images/seosem/Logo3.svg", alt: "Google Analytics" },
    { src: "/images/seosem/Logo4.svg", alt: "Search Console" },
    { src: "/images/seosem/Logo5.svg", alt: "Tag Manager" },
    { src: "/images/seosem/Logo6.svg", alt: "Semrush" },
    { src: "/images/seosem/Logo7.svg", alt: "Meta Ads" },
    { src: "/images/seosem/Logo8.svg", alt: "Hotjar" },
  ];

  return (
    <section className=" py-30 pt-32 md:pt-60"> 
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="flex flex-col items-center w-full max-w-4xl">
            <h2 className="px-6 text-white text-xs md:text-lg tracking-[0.3em] font-light uppercase whitespace-nowrap mb-4">
              <span className="relative inline-block px-2 py-0.5">
                <span className="relative z-10 font-medium">
                  {t('title')}
                </span>
                <span className="absolute inset-0 bg-[#A21F8A] rounded-sm"></span>
              </span>
            </h2>
            <div className="w-full md:w-2/3 h-[1px] bg-white/60"></div>
          </div>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={3} 
          loop={true}
          speed={5000} 
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="items-center"
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
                <div className="bg-white border rounded-[15px] p-1 w-25 h-25 md:w-30 md:h-30 flex justify-center items-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform duration-300">
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="max-w-[85%] max-h-[85%] object-contain" 
                  />
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ToolsCarousel;
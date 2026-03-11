"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const montserrat = Montserrat({ subsets: ["latin"] });

interface WPPost {
  title: { rendered: string };
  date: string;
  link: string;
  yoast_head_json?: {
    og_image?: Array<{ url: string }>;
  };
}

  const NewsSection = () => {
    const t = useTranslations("NewsSection");

    const [posts, setPosts] = useState<WPPost[]>([]);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const tValue = t("t");
          const lang = tValue === "en" ? "en" : "es";
          
          console.log(`Fetching posts for language: ${lang}`);
          
          const res = await fetch(`/api/posts?lang=${lang}`);

          if (!res.ok) {
            let errorMessage = `Error HTTP: ${res.status}`;
            try {
              const errorData = await res.json();
              errorMessage = errorData.message || errorMessage;
            } catch (e) {
              console.warn('Could not parse error response');
            }
            throw new Error(errorMessage);
          }

          const data = await res.json();
          // Soporta tanto array directo como el nuevo formato { posts, totalPages }
          const postsArray = Array.isArray(data) ? data : (data.posts ?? []);
          console.log(`Loaded ${postsArray.length} posts`);
          setPosts(postsArray);
          
          
        } catch (error) {
          console.error("Error al obtener posts:", error);
        }
      };

      fetchPosts();
    }, [t]);

  if (posts.length === 0) return null;

  return (
    <section
      className={`${montserrat.className} md:py-24 bg-transparent text-white px-10 2xl:px-6 overflow-hidden`}
    >
      <div className="flex flex-col items-center justify-center mb-10 2xl:mb-20 w-full group">
        <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
          <h2 className="text-white text-s md:text-m tracking-[0.1em] uppercase whitespace-nowrap">
            <span style={{ 
                  backgroundColor: '#A21F8A', 
                  padding: '2px 10px', 
                  borderRadius: '2px' 
                }}>
                {t("title")}
            </span>
            
          </h2>
          <div className="h-[1px] bg-white/90 w-full md:w-[70%] lg:w-[100%] mx-auto"></div>
        </div>
      </div>

      <div className="max-w-6xl 2xl:max-w-7xl mx-auto relative flex items-center">
        <button
          onClick={() => swiperInstance?.slidePrev()}
          className="absolute -left-20 z-20 hidden xl:block text-white/50 hover:text-white transition-all hover:scale-110 active:scale-90 cursor-pointer"
        >
          <ChevronLeft size={60} strokeWidth={1} />
        </button>

        <div className="w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            loop={true}
            speed={700}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            onSwiper={setSwiperInstance}
            className="news-swiper"
          >
            {posts.map((item, index) => {
              const imageUrl =
                item.yoast_head_json?.og_image?.[0]?.url ||
                "/images/placeholder.png";

              const formattedDate = new Date(item.date)
                .toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .toUpperCase();

              return (
                <SwiperSlide key={index}>
                  <div className="group bg-[#2F0729] backdrop-blur-xl rounded-[20px] overflow-hidden flex flex-col lg:h-[400px] xl:h-[450px] 2xl:min-h-[620px] border border-white/5 transition-all duration-500 hover:border-white/10">
                    <div className="relative h-70 lg:h-80 2xl:h-80 w-full">
                      <div className="relative w-full h-full overflow-hidden rounded-t-[20px]">
                        <Image
                          src={imageUrl}
                          alt={item.title.rendered}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    <div className="p-10 pt-4 flex flex-col flex-grow">
                      <span className="text-[11px] text-white font-medium tracking-widest mb-6">
                        {formattedDate}
                      </span>
                      <h3
                        className="lg:text-sm 2xl:text-2xl font-semibold leading-[1.4] mb-8 text-white/90 group-hover:text-white transition-colors"
                        dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                      />

                      <div className="mt-auto">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-flex items-center justify-center px-5 lg:px-8 2xl:px-10 py-2 2xl:py-3.5 overflow-hidden font-bold uppercase tracking-[0.2em] text-[10px] lg:text-[8px] 2xl:text-[10px] transition-all duration-500 border border-white/20 rounded-[10px] cursor-pointer text-white group/btn"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-transform duration-500 ease-out -translate-x-full group-hover/btn:translate-x-0"></span>
                          <span className="relative z-10 transition-colors duration-300">
                            {t("readMore")}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <button
          onClick={() => swiperInstance?.slideNext()}
          className="absolute -right-20 z-20 hidden xl:block text-white/50 hover:text-white transition-all hover:scale-110 active:scale-90 cursor-pointer"
        >
          <ChevronRight size={60} strokeWidth={1} />
        </button>
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="https://3rcore-server.com.pe/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 border border-white/20 rounded-[15px] cursor-pointer text-white isolation-auto"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-transform duration-500 ease-out -translate-x-[101%] group-hover:translate-x-0" />
          <div className="relative z-10 transition-colors duration-300">
            {t("viewAllBlogs")}
          </div>
        </a>
      </div>

      <style jsx global>{`
        .news-swiper {
          padding-bottom: 20px;
        }

        .news-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
};

export default NewsSection;
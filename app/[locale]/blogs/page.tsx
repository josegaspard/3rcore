"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Montserrat } from "next/font/google";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const montserrat = Montserrat({ subsets: ["latin"] });

interface WPPost {
  title: { rendered: string };
  date: string;
  link: string;
  slug: string;
  yoast_head_json?: {
    og_image?: Array<{ url: string }>;
    og_description?: string;
  };
}

export default function BlogsPage() {
  const t = useTranslations("NewsSection");
  const b = useTranslations("BlogsPage");
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const fetchPosts = async (pageNum: number, replace = false) => {
    setLoading(true);
    try {
      const tValue = t("t");
      const lang = tValue === "en" ? "en" : "es";
      const res = await fetch(`/api/posts?lang=${lang}&page=${pageNum}&per_page=6`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTotalPages(data.totalPages);
      setPosts((prev) => (replace ? data.posts : [...prev, ...data.posts]));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, true);
  }, []);

  // Hero animation
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );
      gsap.fromTo(
        ".hero-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: "power3.out", delay: 0.3, transformOrigin: "left" }
      );
      gsap.fromTo(
        ".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Cards animation on posts change
  useEffect(() => {
    if (!gridRef.current || posts.length === 0) return;
    const cards = gridRef.current.querySelectorAll(".blog-card");
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      }
    );
  }, [posts]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  const getSlugFromLink = (post: WPPost) => {
    return post.slug || post.link.replace(/\/$/, "").split("/").pop() || "";
  };

  return (
    <main
      className={`${montserrat.className} min-h-screen bg-[#0D0010] text-white overflow-x-hidden`}
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#A21F8A]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#E91E63]/8 rounded-full blur-[100px]" />
      </div>

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative z-10 pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="max-w-3xl">
          <p className="hero-subtitle text-[11px] tracking-[0.4em] uppercase text-[#E91E63] mb-4 font-medium">
            {b('subtitle')}
          </p>
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8">
            <span className="block text-white">{b('titleLine1')}</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #E91E63 0%, #A21F8A 50%, #9C27B0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {b('titleLine2')}
            </span>
          </h1>
          <div
            className="hero-line h-[1px] w-full max-w-md mb-6"
            style={{
              background: "linear-gradient(90deg, #E91E63, #9C27B0, transparent)",
            }}
          />
          <p className="hero-subtitle text-white/50 text-sm md:text-base leading-relaxed max-w-lg">
            {b('description')}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="relative z-10 px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        {initialLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-[#2F0729]/50 rounded-[20px] h-[450px] animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post, index) => {
              const imageUrl =
                post.yoast_head_json?.og_image?.[0]?.url || "/images/placeholder.png";
              const formattedDate = new Date(post.date)
                .toLocaleDateString("es-PE", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .toUpperCase();
              const slug = getSlugFromLink(post);
              const description = post.yoast_head_json?.og_description || "";

              return (
                <Link key={index} href={`/blogs/${slug}`} className="blog-card group block">
                  <article className="bg-[#2F0729] rounded-[20px] overflow-hidden flex flex-col h-full border border-white/5 transition-all duration-500 hover:border-[#A21F8A]/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(162,31,138,0.2)]">
                    {/* Image */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={post.title.rendered}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2F0729] via-transparent to-transparent opacity-60" />
                      {/* Date badge */}
                      <div className="absolute bottom-3 left-4">
                        <span
                          className="text-[9px] font-bold tracking-[0.2em] px-3 py-1 rounded-full"
                          style={{
                            background: "rgba(162,31,138,0.85)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {formattedDate}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h2
                        className="text-base font-semibold leading-[1.4] mb-3 text-white/90 group-hover:text-white transition-colors line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      {description && (
                        <p className="text-white/40 text-xs leading-relaxed line-clamp-3 mb-4 flex-grow">
                          {description}
                        </p>
                      )}
                      <div className="mt-auto pt-4 border-t border-white/5">
                        <span className="inline-flex items-center gap-2 text-[#E91E63] text-[10px] font-bold tracking-[0.2em] uppercase group-hover:gap-3 transition-all duration-300">
                          {b('readMore')}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            <path
                              d="M1 7H13M13 7L7 1M13 7L7 13"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* Load More */}
        {!initialLoading && page < totalPages && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="group relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden font-bold uppercase tracking-[0.3em] text-[10px] border border-white/20 rounded-[15px] cursor-pointer text-white transition-all duration-500 hover:border-[#A21F8A]/60 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-3">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    {b('loading')}
                  </>
                ) : (
                  <>
                    {b('loadMore')}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1v14M1 8h14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Montserrat } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const montserrat = Montserrat({ subsets: ["latin"] });

interface WPPost {
  title: { rendered: string };
  date: string;
  link: string;
  slug: string;
  content: { rendered: string };
  excerpt: { rendered: string };
  yoast_head_json?: {
    og_image?: Array<{ url: string }>;
    og_description?: string;
  };
}


// Elimina shortcodes Divi del rendered y deja solo HTML limpio
function cleanDivi(html: string): string {
  return html
    // Quita shortcodes de apertura: [et_pb_xxx atributos...]
    .replace(/\[et_pb_\w+[^\]]*\]/gi, "")
    // Quita shortcodes de cierre: [/et_pb_xxx]
    .replace(/\[\/et_pb_\w+\]/gi, "")
    // Quita párrafos vacíos que quedan
    .replace(/<p[^>]*>\s*<\/p>/gi, "")
    .trim();
}

export default function BlogPostClient({ post }: { post: WPPost }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const imageUrl =
    post.yoast_head_json?.og_image?.[0]?.url || "/images/placeholder.png";

  const formattedDate = new Date(post.date).toLocaleDateString("es-PE", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.fromTo(
        ".post-hero-img",
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        }
      );

      // Title reveal
      gsap.fromTo(
        ".post-title",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".post-meta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );

      // Content fade in
      gsap.fromTo(
        ".post-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".post-content",
            start: "top 85%",
          },
        }
      );

      // Decorative line
      gsap.fromTo(
        ".deco-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.out", delay: 0.4, transformOrigin: "left" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main
      className={`${montserrat.className} min-h-screen bg-[#0D0010] text-white overflow-x-hidden`}
    >
      {/* Ambient BG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#A21F8A]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-[#E91E63]/6 rounded-full blur-[100px]" />
      </div>

      {/* Back button */}
      <div className="relative z-20 pt-8 px-6 md:px-12 max-w-7xl mx-auto">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-[11px] tracking-[0.3em] uppercase font-medium transition-colors duration-300 group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path
              d="M15 8H1M1 8L7 2M1 8L7 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Volver al blog
        </Link>
      </div>

      {/* Hero image */}
      <div ref={heroRef} className="relative z-10 mt-8 mx-6 md:mx-12 max-w-7xl lg:mx-auto rounded-[24px] overflow-hidden h-[40vh] md:h-[55vh] lg:h-[65vh]">
        <div className="post-hero-img absolute inset-0">
          <Image
            src={imageUrl}
            alt={post.title.rendered}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0010] via-[#0D0010]/40 to-transparent" />

        {/* Title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div
            className="deco-line h-[2px] w-16 mb-6"
            style={{ background: "linear-gradient(90deg, #E91E63, #9C27B0)" }}
          />
          <h1
            className="post-title text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white max-w-4xl"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div className="post-meta flex items-center gap-4 mt-4">
            <span
              className="text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: "rgba(162,31,138,0.8)", backdropFilter: "blur(8px)" }}
            >
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Article content */}
      <article
        ref={contentRef}
        className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 lg:px-0 py-16"
      >
        <div
          className="post-content prose-content"
          dangerouslySetInnerHTML={{ __html: cleanDivi(post.content.rendered) }}
        />

        {/* Back to blogs */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <Link
            href="/blogs"
            className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden font-bold uppercase tracking-[0.3em] text-[10px] border border-white/20 rounded-[15px] text-white transition-all duration-500 hover:border-[#A21F8A]/60"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path
                  d="M13 7H1M1 7L6 2M1 7L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Ver todos los blogs
            </span>
          </Link>
        </div>
      </article>

      {/* WordPress content styles */}
      <style jsx global>{`
        .prose-content {
          color: white;
          font-size: 1rem;
          line-height: 1.85;
          font-family: inherit;
        }

        .prose-content h1,
        .prose-content h2,
        .prose-content h3,
        .prose-content h4,
        .prose-content h5,
        .prose-content h6 {
          color: #ffffff;
          font-weight: 700;
          line-height: 1.3;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }

        .prose-content h2 {
          font-size: 1.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .prose-content h3 {
          font-size: 1.35rem;
        }

        .prose-content p {
          margin-bottom: 1.5rem;
        }

        .prose-content a {
          color: #E91E63;
          text-decoration: none;
          border-bottom: 1px solid rgba(233, 30, 99, 0.3);
          transition: border-color 0.2s;
        }

        .prose-content a:hover {
          border-color: #E91E63;
        }

        .prose-content img {
          border-radius: 16px;
          width: 100%;
          height: auto;
          margin: 2rem 0;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .prose-content ul,
        .prose-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .prose-content li {
          margin-bottom: 0.5rem;
        }

        .prose-content ul li::marker {
          color: #A21F8A;
        }

        .prose-content ol li::marker {
          color: #A21F8A;
          font-weight: 700;
        }

        .prose-content blockquote {
          border-left: 3px solid #A21F8A;
          padding-left: 1.5rem;
          margin: 2rem 0;
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
        }

        .prose-content pre,
        .prose-content code {
          background: rgba(162, 31, 138, 0.1);
          border: 1px solid rgba(162, 31, 138, 0.2);
          border-radius: 8px;
          padding: 0.2em 0.5em;
          font-size: 0.875em;
          color: #E91E63;
        }

        .prose-content pre {
          padding: 1.5rem;
          overflow-x: auto;
        }

        .prose-content pre code {
          background: transparent;
          border: none;
          padding: 0;
        }

        .prose-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
        }

        .prose-content th {
          background: rgba(162, 31, 138, 0.2);
          color: white;
          padding: 0.75rem 1rem;
          text-align: left;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .prose-content td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.65);
        }

        .prose-content hr {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin: 3rem 0;
        }

        /* WordPress Gutenberg blocks */
        .prose-content .wp-block-image {
          margin: 2rem 0;
        }

        .prose-content .wp-block-quote {
          border-left: 3px solid #A21F8A;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          background: rgba(162, 31, 138, 0.05);
          border-radius: 0 12px 12px 0;
        }

        .prose-content figure {
          margin: 2rem 0;
        }

        .prose-content figcaption {
          text-align: center;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.35);
          margin-top: 0.75rem;
          letter-spacing: 0.05em;
        }
      `}</style>
    </main>
  );
}
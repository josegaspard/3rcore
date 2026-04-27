'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function ButtonServicios() {
  const t = useTranslations('servicesButton');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const services = [
    { href: "/servicios/branding", label: "Branding" },
    { href: "/servicios/socialmedia", label: "Social Media" },
    { href: "/servicios/seo-sem", label: "Google SEO / SEM" },
    { href: "/servicios/web-development", label: "Web Development" },
  ];

  const handleScrollTop = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    closePanel();
  };

  // Set initial hidden state on mount
  useEffect(() => {
    if (!panelRef.current) return;
    gsap.set(panelRef.current, { x: "100%", opacity: 0, pointerEvents: "none" });
    gsap.set(itemsRef.current, { x: 20, opacity: 0 });
  }, []);

  const openPanel = () => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline();

    // Panel slides in from the right
    tl.to(panelRef.current, {
      x: "0%",
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.45,
      ease: "power3.out",
    })
    // Items stagger in
    .to(itemsRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.07,
    }, "-=0.2");

    // Backdrop fade in
    gsap.to(backdropRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.3,
      ease: "power2.out",
    });

    // Button subtle press
    gsap.to(btnRef.current, {
      scale: 0.96,
      duration: 0.15,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    });
  };

  const closePanel = () => {
    if (!isOpen) return;

    const tl = gsap.timeline({
      onComplete: () => setIsOpen(false),
    });

    // Items fade out first
    tl.to(itemsRef.current, {
      x: 10,
      opacity: 0,
      duration: 0.18,
      ease: "power2.in",
      stagger: { each: 0.04, from: "end" },
    })
    // Panel slides back out
    .to(panelRef.current, {
      x: "100%",
      opacity: 0,
      pointerEvents: "none",
      duration: 0.38,
      ease: "power3.in",
    }, "-=0.05");

    // Backdrop fade out
    gsap.to(backdropRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.25,
      ease: "power2.in",
    });
  };

  const handleToggle = () => {
    isOpen ? closePanel() : openPanel();
  };

  return (
    <>
      {/* Invisible backdrop to close panel on outside click */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40"
        style={{ opacity: 0, pointerEvents: "none" }}
        onClick={closePanel}
      />

      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">

        {/* Services panel */}
        <div
          ref={panelRef}
          className="flex flex-col gap-2 px-5 py-5 rounded-l-2xl shadow-2xl"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(156,39,176,0.97) 0%, rgba(255,26,85,0.97) 100%)",
            backdropFilter: "blur(12px)",
            minWidth: "190px",
          }}
        >
          <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-semibold mb-1 border-b border-white/20 pb-2">
            {t('servicios')}
          </p>

          {services.map((service, i) => (
            <Link
              key={service.href}
              href={service.href}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              onClick={() => handleScrollTop(service.href)}
              className="group flex items-center gap-2.5 text-white text-sm font-medium hover:text-white/70 transition-colors duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white group-hover:scale-125 transition-all duration-200 flex-shrink-0" />
              {service.label}
            </Link>
          ))}
        </div>

        {/* Vertical toggle button */}
        <button
          ref={btnRef}
          onClick={handleToggle}
          onMouseEnter={openPanel}
          aria-label="Toggle services menu"
          aria-expanded={isOpen}
          className="relative flex items-center justify-center cursor-pointer select-none focus:outline-none"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {/* Glow layer */}
          <span
            className="absolute inset-0 rounded-l-xl blur-md transition-opacity duration-300"
            style={{
              backgroundImage: "linear-gradient(to bottom, #9C27B0, #FF1A55)",
              opacity: isOpen ? 0.7 : 0.35,
            }}
          />

          {/* Button face */}
          <span
            className="relative flex items-center justify-center gap-2 px-3 py-5 rounded-l-xl text-white font-bold text-xs uppercase tracking-[0.25em] shadow-xl"
            style={{
              backgroundImage: "linear-gradient(to right, #9C27B0 0%, #9C27B0 40%, #FF1A55 100%)",
            }}
          >
            {/* Chevron */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.35s ease",
              }}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>

            <span>{t('servicios')}</span>
          </span>
        </button>

      </div>
    </>
  );
}
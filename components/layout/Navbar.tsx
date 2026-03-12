"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Mobile services dropdown state
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileServicesTapped, setMobileServicesTapped] = useState(false);

  // GSAP refs for services dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownItemsRef = useRef<HTMLAnchorElement[]>([]);
  const servicesBackdropRef = useRef<HTMLDivElement>(null);

  const handleScrollTop = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("contacto");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        window.history.replaceState(null, "", window.location.pathname);
      }, 100);
    }
    setIsOpen(false);
  };

  // Services dropdown GSAP init
  useEffect(() => {
    if (!dropdownRef.current) return;
    gsap.set(dropdownRef.current, {
      opacity: 0,
      y: -8,
      pointerEvents: "none",
      display: "none",
    });
    gsap.set(dropdownItemsRef.current, { x: -8, opacity: 0 });
  }, []);

  const openServices = () => {
    if (servicesOpen) return;
    setServicesOpen(true);

    gsap.set(dropdownRef.current, { display: "flex" });

    const tl = gsap.timeline();
    tl.to(dropdownRef.current, {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      duration: 0.3,
      ease: "power3.out",
    }).to(
      dropdownItemsRef.current,
      {
        x: 0,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
        stagger: 0.06,
      },
      "-=0.15"
    );

    gsap.to(servicesBackdropRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.2,
    });
  };

  const closeServices = () => {
    if (!servicesOpen) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setServicesOpen(false);
        gsap.set(dropdownRef.current, { display: "none" });
        // Reset items for next open
        gsap.set(dropdownItemsRef.current, { x: -8, opacity: 0 });
      },
    });

    tl.to(dropdownItemsRef.current, {
      x: -6,
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      stagger: { each: 0.04, from: "end" },
    }).to(
      dropdownRef.current,
      {
        opacity: 0,
        y: -6,
        pointerEvents: "none",
        duration: 0.25,
        ease: "power3.in",
      },
      "-=0.05"
    );

    gsap.to(servicesBackdropRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.2,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setMobileServicesOpen(false);
      setMobileServicesTapped(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (isOpen) return;
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
          closeServices();
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY, isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const services = [
    { href: "/servicios/branding", label: "Branding" },
    { href: "/servicios/socialmedia", label: "Social Media" },
    { href: "/servicios/google-ads", label: "Google Ads" },
    { href: "/servicios/web-deveploment", label: "Web Development" },
    { href: "/posicionamiento-seo", label: "Servicio SEO" },
  ];

  const links = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about us"), href: "/nosotros" },
    { name: t("nav.services"), href: "/servicios#servicios", isServices: true },
    { name: t("nav.blogs"), href: "/blogs" },
    { name: t("nav.contact"), href: "#contacto", isContact: true },
  ];

  const socialLinks = [
    { name: "FACEBOOK", href: "https://www.facebook.com/3Rcore/" },
    { name: "INSTAGRAM", href: "https://www.instagram.com/3rcore_/?hl=es" },
    { name: "LINKEDIN", href: "https://www.linkedin.com/company/3r-core/" },
    { name: "TIKTOK", href: "https://www.tiktok.com/@3rcore" },
  ];

  return (
    <>
      {/* Services backdrop — closes dropdown on outside click */}
      <div
        ref={servicesBackdropRef}
        className="fixed inset-0 z-[49]"
        style={{ opacity: 0, pointerEvents: "none" }}
        onClick={closeServices}
      />

      <nav
        className={`fixed top-0 left-0 w-full z-50 bg-[#130218] text-white transition-transform duration-500 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-24 lg:h-18 xl:h-24 relative">

            <div className="flex items-center gap-6 flex-shrink-0 relative z-[60]">

              <Link
                href="/"
                onClick={() => handleScrollTop("/")}
              >
                <div className="relative h-15 w-28 cursor-pointer">
                  <Image
                    src="/icons/LogoFull.webp"
                    alt="3RCORE Logo"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
              
              <div className="relative hidden md:block">
                <button
                  onMouseEnter={openServices}
                  onClick={() => servicesOpen ? closeServices() : openServices()}
                  className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-200 focus:outline-none group"
                >
                  <span
                    className="px-3 py-1.5 rounded-full  transition-colors duration-200"
                  >
                    {t("nav.services")}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown panel */}
                <div
                  ref={dropdownRef}
                  className="absolute top-[calc(100%+12px)] left-0 flex-col gap-1 py-3 px-1 rounded-xl shadow-2xl min-w-[200px] border border-white/10"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(19,2,24,0.98) 0%, rgba(30,4,40,0.98) 100%)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {/* Gradient accent top bar */}
                  <div
                    className="absolute top-0 left-4 right-4 h-[1px] rounded-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #9C27B0, #FF1A55)",
                    }}
                  />

                  {services.map((service, i) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      ref={(el) => { if (el) dropdownItemsRef.current[i] = el; }}
                      onClick={() => {
                        handleScrollTop(service.href);
                        closeServices();
                      }}
                      className="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover/item:scale-125"
                        style={{
                          background:
                            "linear-gradient(to right, #9C27B0, #FF1A55)",
                        }}
                      />
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Center: tagline */}
            <div
              className={`hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs tracking-wide transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="text-white">{t("regular")}</span>
              <span className="font-bold ml-2 text-white">{t("bold")}</span>
            </div>

            {/* Right: language + menu */}
            <div className="flex items-center gap-6 relative z-[60]">
              <div
                className={`flex items-center gap-4 text-xs font-bold tracking-widest transition-opacity duration-300 ${
                  isOpen ? "opacity-0 delay-0" : "opacity-100 delay-300"
                } text-gray-400`}
              >
                <Link
                  href={pathname}
                  locale="es"
                  className="hover:text-[#E91E63] transition-colors cursor-pointer uppercase"
                >
                  ES
                </Link>
                <Link
                  href={pathname}
                  locale="en"
                  className="hover:text-[#E91E63] transition-colors cursor-pointer uppercase"
                >
                  EN
                </Link>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-3 text-xs font-bold focus:outline-none tracking-widest uppercase hover:text-gray-300 transition-colors"
              >
                <span className="hidden sm:block">MENU</span>
                <div className="flex flex-col justify-center items-end w-6 h-6 gap-[5px] cursor-pointer">
                  <span
                    className={`block h-[2px] bg-white transition-all duration-500 ease-in-out ${
                      isOpen ? "w-6" : "w-4 group-hover:w-6"
                    }`}
                  />
                  <span
                    className={`block h-[2px] bg-white transition-all duration-500 ease-in-out ${
                      isOpen ? "w-6" : "w-6"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-[#130218] flex overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]
          ${isOpen
            ? "left-0 opacity-100 visible pointer-events-auto"
            : "left-1/2 opacity-0 invisible pointer-events-none"
          }`}
        style={{ width: isOpen ? "100%" : "0%", left: isOpen ? "0%" : "50%" }}
      >
        <div className="w-full h-full flex flex-col lg:flex-row">
          <div
            onClick={() => { setIsOpen(false); handleScrollTop("/"); }}
            className="hidden lg:flex flex-1 items-center justify-center bg-[#130218] relative border-r border-white/10"
          >
            <Link
              href="/"
              className={`relative h-100 w-100 cursor-pointer transition-all duration-700 delay-300 transform ${
                isOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-10"
              }`}
            >
              <Image
                src="/icons/LogoFull.webp"
                alt="3RCORE Logo Large"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-between bg-[#130218] p-8 sm:p-16 pt-28 lg:pt-16">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-sm font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              {t("clo")}
            </button>

            <ul className="flex flex-col space-y-0">
              {links.map((link, index) => (
                <li key={link.name} className="group overflow-hidden">
                  {link.isServices ? (
                    // Mobile: first tap opens dropdown, second tap navigates
                    <div>
                      <div
                        className={`flex items-center justify-between text-3xl sm:text-3xl font-bold tracking-tight text-white py-4 sm:py-6 border-b border-white/20 relative transition-all duration-500 transform cursor-pointer
                          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                          hover:text-white hover:pl-4
                        `}
                        style={{ transitionDelay: `${150 + index * 100}ms` }}
                        onClick={() => {
                          if (!mobileServicesTapped) {
                            // First tap: open dropdown
                            setMobileServicesOpen(true);
                            setMobileServicesTapped(true);
                          }
                          // Second tap: handled by the Link below, this div won't catch it
                        }}
                      >
                        <span className="absolute top-0 left-0 w-0 h-full z-[-1] transition-all duration-500 group-hover:w-full bg-gradient-to-r from-[rgba(156,39,176,0.25)] to-[rgba(233,30,99,0.25)]" />
                        {mobileServicesTapped ? (
                          // Second tap navigates to services page
                          <Link
                            href={link.href}
                            onClick={() => {
                              setIsOpen(false);
                              handleScrollTop("/");
                            }}
                            className="flex-1"
                          >
                            {link.name}
                          </Link>
                        ) : (
                          <span className="flex-1">{link.name}</span>
                        )}
                        {/* Chevron indicator */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 flex-shrink-0 transition-transform duration-300"
                          style={{
                            transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>

                      {/* Mobile services dropdown */}
                      <div
                        className={`overflow-hidden transition-all duration-400 ease-in-out ${
                          mobileServicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                        style={{ transitionDuration: "350ms" }}
                      >
                        <div className="pl-4 py-2 flex flex-col gap-1 border-b border-white/10">
                          {/* Gradient accent bar */}
                          <div
                            className="h-[1px] w-3/4 rounded-full mb-2"
                            style={{
                              backgroundImage: "linear-gradient(to right, #9C27B0, #FF1A55)",
                            }}
                          />
                          {services.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              onClick={() => {
                                setIsOpen(false);
                                handleScrollTop(service.href);
                              }}
                              className="flex items-center gap-2.5 py-2.5 text-base font-medium text-white/60 hover:text-white transition-colors duration-200"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{
                                  background: "linear-gradient(to right, #9C27B0, #FF1A55)",
                                }}
                              />
                              {service.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (link.isContact) {
                          scrollToContact(e);
                        } else {
                          setIsOpen(false);
                          handleScrollTop("/");
                        }
                      }}
                      className={`block text-3xl sm:text-3xl font-bold tracking-tight text-white py-4 sm:py-6 border-b border-white/20 relative transition-all duration-500 transform
                        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                        hover:text-white hover:pl-4
                      `}
                      style={{ transitionDelay: `${150 + index * 100}ms` }}
                    >
                      <span className="absolute top-0 left-0 w-0 h-full z-[-1] transition-all duration-500 group-hover:w-full bg-gradient-to-r from-[rgba(156,39,176,0.25)] to-[rgba(233,30,99,0.25)]" />
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-xs font-bold tracking-widest text-white/50 mt-12 transition-all duration-700 delay-700 transform ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex gap-4 sm:gap-6 mb-4 sm:mb-0">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
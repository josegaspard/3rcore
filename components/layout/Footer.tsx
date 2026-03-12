"use client"; 

import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const Footer = () => {

  const t = useTranslations('Footer');
  
  const pathname = usePathname();

  const handleScrollTop = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <footer className="text-white pt-16 pb-8 px-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="flex justify-start items-start">
            <div className="relative w-60 h-30"> 
              <Image 
                src="/icons/LogoLetrasBlanco.webp" 
                alt="3R Core Logo" 
                fill 
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold lg:text-sm 2xl:text-base uppercase tracking-widest mb-6">{ t('agency')}</h3>
            <div className="text-gray-200 text-sm lg:text-xs xl:text-sm leading-relaxed space-y-1">
              <p>
                Calle Las Caobas 170, Ofic. 400
                <br />
                 Urb El Remanso,La Molina. Lima - Perú
              </p>
              <p>
                { t('A')}<br />9am a 6pm
              </p>
            </div>
          </div>

          <div className="flex  lg:justify-center">
            <div className="2xl:w-[60%]">
              <h3 className="text-white font-bold lg:text-sm 2xl:text-base uppercase tracking-widest mb-6">{ t('services')}</h3>
              <ul className="space-y-3 text-sm lg:text-xs xl:text-sm text-gray-200">
                <li>
                  <Link 
                    href="/servicios/branding" 
                    onClick={() => handleScrollTop("/servicios/branding")}
                    className="hover:text-pink-500 transition-colors duration-300"
                  >
                    Branding
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/servicios/socialmedia" 
                    onClick={() => handleScrollTop("/servicios/socialmedia")}
                    className="hover:text-pink-500 transition-colors duration-300"
                  >
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/servicios/seo-sem" 
                    onClick={() => handleScrollTop("/servicios/google-ads")}
                    className="hover:text-pink-500 transition-colors duration-300"
                  >
                    Google Ads
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/servicios/web-deveploment" 
                    onClick={() => handleScrollTop("/servicios/web-deveploment")}
                    className="hover:text-pink-500 transition-colors duration-300"
                  >
                    Web Development
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-white font-bold lg:text-sm 2xl:text-base uppercase tracking-widest mb-6">{ t('socialMedia')}</h3>
            <div className="flex gap-4">
              <SocialIcon href="https://www.facebook.com/3Rcore/" icon={<FaFacebookF />} />
              <SocialIcon href="https://www.instagram.com/3rcore_/?hl=es" icon={<FaInstagram />} />
              <SocialIcon href="https://www.linkedin.com/company/3r-core/" icon={<FaLinkedinIn />} />
              <SocialIcon href="https://www.tiktok.com/@3rcore" icon={<FaTiktok />} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-[10px] tracking-widest text-gray-200">
            <Link 
              href="/politicas" 
              className="hover:text-pink-500 transition-colors duration-300 relative group"
            >
              { t('privacyPolicy')}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A21F8A] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/terminos" 
              className="hover:text-pink-500 transition-colors duration-300 relative group"
            >
              { t('termsConditions')}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A21F8A] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/preguntas" 
              className="hover:text-pink-500 transition-colors duration-300 relative group"
            >
              { t('pregunta')}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A21F8A] group-hover:w-full transition-all duration-300"></span>
            </Link>
            
          </div>
          
          <div className="text-[10px] uppercase tracking-widest text-white">
            { t('copyright')}
          </div>
        </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className="group relative text-white text-lg p-2 rounded-md border border-white/20 transition-all duration-500 ease-out hover:border-[#A21F8A] hover:-translate-y-0.5 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#A21F8A] to-[#6B0F5C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
    </a>
  );
};

export default Footer;
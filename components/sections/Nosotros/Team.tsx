"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);
const members = [
  { id: 1, name: "Maria Fernanda", role: "Directora de Operaciones", image: "/images/Equipo/Mafer.webp", area:"commercial" },
  { id: 2, name: "Diana", role:"Commercial Supervisor", image:"/images/Equipo/Diana.webp", area:"commercial"},
  { id: 3, name: "Gimena", role: "Commercial", image: "/images/Equipo/Gimena.webp", area:"commercial"},
  { id: 4, name: "Mariajose", role: "Commercial", image: "/images/Equipo/new.webp", area:"commercial"},
  

  { id: 5, name: "Elizabeth", role: "Creative Design Supervisor", image: "/images/Equipo/Elizabeth.webp", area:"branding"},
  { id: 6, name: "Nadia", role: "Brand Manager", image: "/images/Equipo/Nadia.webp", area:"branding" },
  { id: 7, name: "Odeth", role: "Brand Designer", image: "/images/Equipo/Odeth.webp", area:"branding"},
  { id: 8, name: "Sara", role: "Brand Designer", image: "/images/Equipo/Sara.webp", area:"branding" },
  { id: 9, name: "Tania", role: "Brand Designer", image: "/images/Equipo/novo.webp", area:"branding" },

  { id: 10, name: "Grecia", role: "Social Media Manager", image: "/images/Equipo/Grecia.webp", area:"social media"},
  { id: 11, name: "Nicole", role: "Content Manager", image: "/images/Equipo/Nicole.webp", area:"social media"},
  { id: 12, name: "Claudia", role: "Content Manager", image: "/images/Equipo/Claudia.webp", area:"social media"},

  { id: 13, name: "Josue", role: "Post-Production", image: "/images/Equipo/Josue.webp", area:"design multimedia"},
  { id: 14, name: "Sofia", role: "Film Maker & Designer", image: "/images/Equipo/Sofia.webp", area:"design multimedia"},
  { id: 15, name: "Aaron", role: "Designer", image: "/images/Equipo/Aaron.webp", area:"design multimedia" },
  { id: 16, name: "Franco", role: "Designer", image: "/images/Equipo/franco-2.webp", area:"design multimedia"},
  { id: 17, name: "Stefany", role: "Film Maker &Designer", image: "/images/Equipo/Stefany.webp", area:"design multimedia"},
  { id: 18, name: "Karol", role: "Film Maker & Designer", image: "/images/Equipo/Karol.webp", area:"design multimedia"},
  { id: 19, name: "Franco", role: "Designer", image: "/images/Equipo/Franco.webp", area:"design multimedia" },
   

  { id: 20, name: "Aymar", role: "Software Engineer", image: "/images/Equipo/Aymar.webp", area:"Web development & IT" },
  { id: 21, name: "Jose", role: "Seo Manager", image: "/images/Equipo/jose.webp", area:"Web development & IT" },

];

export default function Team() {
  const t = useTranslations('OurTeamSection');

  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const groupedMembers = members.reduce((acc, member) => {
    const area = member.area;
    if (!acc[area]) acc[area] = [];
    acc[area].push(member);
    return acc;
  }, {} as Record<string, typeof members>);

useEffect(() => {
  const section = sectionRef.current;
  const container = containerRef.current;
  const text = textRef.current;

  if (!section || !container) return;

  const mm = gsap.matchMedia();

  mm.add({
    isMobile: "(max-width: 768px)",
    isDesktop: "(min-width: 769px)",
  }, (context) => {
    const isMobile = context.conditions?.isMobile;

    const totalScroll = container.offsetHeight - window.innerHeight + (isMobile ? 100 : 0);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalScroll}`,
        pin: true,
        scrub: isMobile ? 0.5 : 1, 
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: true,
      },
    });

    tl.to(container, {
      y: -totalScroll,
      ease: "none",
      force3D: true, 
    });

    if (isMobile && text) {
      gsap.to(text, {
        opacity: 0,
        y: -60,
        ease: "power3.out",
        force3D: true, 
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "top+=400 top",
          scrub: 0.5, 
        },
      });
    }
  });

  return () => mm.revert();
}, []);

return (
    <section ref={sectionRef} className="relative flex flex-col md:flex-row h-[100vh] w-full overflow-hidden text-white">
      <div ref={textRef} className="flex w-full md:w-2/4 flex-col justify-center px-10 md:px-16 pt-30 md:pt-0 z-20">
        <h2 className="text-4xl  xl:text-5xl italic mb-6 text-white font-serif">{ t('title')}</h2>
        <p className="text-sm max-w-xs leading-relaxed">
          { t('description')}
        </p>
      </div>

      <div className="relative w-full md:w-3/4 ">
        <div ref={containerRef} className="pt-[20vh] pb-[8vh] px-6 md:px-10"style={{ willChange: 'transform' }} >
          
          {Object.entries(groupedMembers).map(([area, areaMembers]) => (
            <div key={area} className="mb-20">
              
              <div className="w-full mb-10 border-l-3 border-pink-500 pl-3">
                <h2 className="text-xl xl:text-3xl font-m uppercase tracking-[0.05em] text-pink-500">
                  {area}
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                {areaMembers.map((member, index) => {
                  const isMobileSecond = index % 2 === 1;
                  const isMiddle = index % 3 === 1;
                  const isLast = index % 3 === 2;

                  return (
                    <div key={member.id} className={`flex flex-col group transition-transform duration-300 ${isMobileSecond ? "mt-10" : "mt-0"} md:${isMiddle ? "-mt-16" : isLast ? "mt-8" : "mt-0"}`}>
                      <div className="relative p-[0px] transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#E91E63] group-hover:via-[#FF4081] group-hover:to-[#9C27B0] group-hover:shadow-[0_0_20px_rgba(233,30,99,0.7)]">
                        <div className="relative aspect-[2/3] w-full bg-neutral-800 overflow-hidden">
                          {member.image ? (
                            <Image src={member.image} alt={member.name} fill className="object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-neutral-500 italic">No image</div>
                          )}
                        </div>
                      </div>
                      <div className="px-1 mt-4">
                        <h3 className="font-bold text-base lg:text-xs xl:text-base uppercase tracking-tight leading-none">{member.name}</h3>
                        <p className="text-white text-[8px] xl:text-[10px] mt-2 uppercase tracking-widest">{member.role}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
} 
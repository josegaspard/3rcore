"use client"
import { useTranslations } from 'next-intl';
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WebFaq() {
  const t = useTranslations('webFAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const faqRefs = useRef<(HTMLElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { id: 1, question: t('faqs.q1.question'), answer: t('faqs.q1.answer') },
    { id: 2, question: t('faqs.q2.question'), answer: t('faqs.q2.answer') },
    { id: 3, question: t('faqs.q3.question'), answer: t('faqs.q3.answer') },
    { id: 4, question: t('faqs.q4.question'), answer: t('faqs.q4.answer') },
    { id: 5, question: t('faqs.q5.question'), answer: t('faqs.q5.answer') },
    { id: 6, question: t('faqs.q6.question'), answer: t('faqs.q6.answer') },
  ];

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !titleRef.current || !subtitleRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current && headerRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: "power3.out"
        });
      }

      if (subtitleRef.current && headerRef.current) {
        gsap.from(subtitleRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 75%",
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3
        });
      }

      const headerLine = headerRef.current?.querySelector('.header-line');
      if (headerLine && headerRef.current) {
        gsap.from(headerLine, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 75%",
          },
          scaleX: 0,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.5
        });
      }

      faqRefs.current.forEach((faq, index) => {
        if (!faq) return;

        gsap.from(faq, {
          scrollTrigger: {
            trigger: faq,
            start: "top 90%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []); 

  useEffect(() => {
    const eventListeners: Array<{ element: HTMLElement; events: { type: string; handler: () => void }[] }> = [];

    faqRefs.current.forEach((faq, index) => {
      if (!faq) return;

      const gradientBorder = faq.querySelector('.gradient-border');
      if (!gradientBorder) return;

      const handleMouseEnter = () => {
        gsap.to(gradientBorder, {
          opacity: 1,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        if (openIndex !== index) {
          gsap.to(gradientBorder, {
            opacity: 0.5,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      };

      faq.addEventListener('mouseenter', handleMouseEnter);
      faq.addEventListener('mouseleave', handleMouseLeave);

      eventListeners.push({
        element: faq,
        events: [
          { type: 'mouseenter', handler: handleMouseEnter },
          { type: 'mouseleave', handler: handleMouseLeave }
        ]
      });
    });

    return () => {
      eventListeners.forEach(({ element, events }) => {
        events.forEach(({ type, handler }) => {
          element.removeEventListener(type, handler);
        });
      });
    };
  }, [openIndex]);

  useEffect(() => {
    faqRefs.current.forEach((faq, index) => {
      if (!faq) return;

      const answer = faq.querySelector('.faq-answer');
      const icon = faq.querySelector('.toggle-icon');
      const gradientBorder = faq.querySelector('.gradient-border');

      if (!answer || !icon || !gradientBorder) return;

      if (openIndex === index) {
        gsap.to(answer, {
          maxHeight: 400,
          opacity: 1,
          duration: 0.5,
          ease: "power3.inOut"
        });

        gsap.to(icon, {
          rotation: 180,
          duration: 0.4,
          ease: "power2.inOut"
        });

        gsap.to(gradientBorder, {
          opacity: 1,
          duration: 0.3
        });
      } else {
        gsap.to(answer, {
          maxHeight: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut"
        });

        gsap.to(icon, {
          rotation: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });

        gsap.to(gradientBorder, {
          opacity: 0.5,
          duration: 0.3
        });
      }
    });
  }, [openIndex]);

  return (
    <section ref={sectionRef} className="relative z-10 pt-15 2xl:pt-40 pb-20 px-10 lg:px-6">
      <div className="max-w-4xl mx-auto">

        <header ref={headerRef} className="mb-12 pb-8 text-center relative">
          <h1 
            ref={titleRef}
            className={`
              leading-tight
              font-bold
              italic
              text-3xl md:text-5xl 
              bg-gradient-to-r from-[#9C27B0] to-[#E91E63] 
              bg-clip-text text-transparent font-m
              mb-3
            `}
          >
            {t('title')}
          </h1>
          <p 
            ref={subtitleRef}
            className="text-white text-lg uppercase tracking-widest font-light mb-6"
          >
            {t('topBadge')}
          </p>
          <div className="header-line h-[1px] w-full bg-gradient-to-r from-transparent via-white/90 to-transparent origin-center" />
        </header>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <article 
              key={faq.id}
              ref={(el) => { faqRefs.current[index] = el; }}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300"
            >
              <div className={`
                gradient-border
                absolute inset-0 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] 
                transition-opacity duration-300
                ${openIndex === index ? 'opacity-100' : 'opacity-50'}
              `} />
              
              <div className="relative bg-[#130218] m-[1px] rounded-[15px]">
                
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 transition-all"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-[#E91E63] font-mono text-sm border-b border-[#9C27B0] shrink-0 mt-1">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <h3 className="text-white font-semibold text-sm md:text-xl leading-relaxed">
                      {faq.question}
                    </h3>
                  </div>
                  
                  <svg 
                    className="toggle-icon shrink-0 w-6 h-6"
                    fill="none" 
                    stroke="url(#gradient)" 
                    viewBox="0 0 24 24"
                  >
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E91E63" />
                        <stop offset="100%" stopColor="#9C27B0" />
                      </linearGradient>
                    </defs>
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>

                <div className="faq-answer overflow-hidden max-h-0 opacity-0">
                  <div className="px-6 pb-6 pl-16">
                    <div>
                      <p className="text-gray-300 text-sm md:leading-relaxed md:font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-20 pb-0 text-center relative">
          <p 
            className="text-white text-lg uppercase tracking-widest font-light mb-6"
          >
            <span style={{ 
                  backgroundColor: '#A21F8A', 
                  padding: '2px 10px', 
                  borderRadius: '2px' 
                }}>
              {t('tipar')}
            </span>
          </p>
          <div className="header-line h-[1px] w-full bg-white/90 origin-center mb-5" />
          <p 
            className="text-white max-w-[900px] text-xs md:text-sm font-light w-full"
          >
            { t('par')}
          </p>
        </div>

      </div>
    </section>
  );
}

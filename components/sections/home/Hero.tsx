"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useTranslations } from "next-intl"

gsap.registerPlugin(ScrollTrigger);

export default function HeroHome() {

  const t = useTranslations('HeroHome');

  
  const sectionRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  const lettersCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]); 
  const frameRef = useRef({ frame: 0 });
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollVelocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const bottomArrowRef = useRef<HTMLDivElement>(null);

  const frameCount = 193;
  const palabrasAbajo = [
    t('impact'),
    t('values'),
    t('experience'),
    t('identity'),
    t('professionalism'),
    t('connection')
  ];

  const wordRanges = [
    { start: 23, end: 48 },   
    { start: 57, end: 83 },  
    { start: 90, end: 112 } 
  ];

  useEffect(() => {

    if ( !scrollIndicatorRef.current) return;

    const canvas = lettersCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    
  
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const words = [
      t('impact'),
      t('values'),
      t('experience'),
      t('identity'),
      t('professionalism'),
      t('connection')
    ];
    
    class Word {
      x!: number;
      y!: number;
      text!: string;
      vx!: number;
      vy!: number;
      opacity!: number;
      size!: number;
      assignedRange!: { start: number; end: number };
      birthFrame!: number;
      hasStarted!: boolean;
      initialX!: number;
      initialY!: number;
      padding!: number;
      borderRadius!: number;

      constructor(rangeIndex: number) {
        this.assignedRange = wordRanges[rangeIndex];
        this.init();
      }

      init() {
        if (!canvas) return;
        this.initialX = canvas.width / 2;
        this.initialY = canvas.height / 2;
        this.x = this.initialX;
        this.y = this.initialY;
        this.text = words[Math.floor(Math.random() * words.length)];
        
        const rangeDuration = this.assignedRange.end - this.assignedRange.start;
        this.birthFrame = this.assignedRange.start + Math.random() * (rangeDuration * 0.3);
        this.hasStarted = false;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.2 + 0.6;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.opacity = 0;
        this.size = Math.random() * 10 + 20;
        this.padding = 15; 
        this.borderRadius = 8; 
      }

      update(currentFrame: number) {
        if (!canvas) return;
        
        if (currentFrame >= this.birthFrame && !this.hasStarted) {
          this.hasStarted = true;
          this.x = this.initialX;
          this.y = this.initialY;
        }
        
        if (this.hasStarted) {
          this.x += this.vx;
          this.y += this.vy;
          
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const distanceFromCenter = Math.sqrt(
            Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2)
          );
          
          const maxDistance = Math.max(canvas.width, canvas.height) / 2;
          const distanceProgress = Math.min(distanceFromCenter / maxDistance, 1);
          
          if (distanceProgress < 0.05) {
            this.opacity = distanceProgress / 0.05 * 0.8;
          } else {
            this.opacity = Math.max(0, 0.8 - distanceProgress);
          }
          
          if (this.x < -200 || this.x > canvas.width + 200 ||
              this.y < -200 || this.y > canvas.height + 200) {
            this.opacity = 0;
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.hasStarted || this.opacity <= 0.01) return;
        
        ctx.save();
        
        ctx.font = `${this.size}px Arial, sans-serif`;
        const metrics = ctx.measureText(this.text);
        const textWidth = metrics.width;
        const textHeight = this.size;
        
        const boxWidth = textWidth + this.padding * 2;
        const boxHeight = textHeight + this.padding * 1.5;
        
        const boxX = this.x - boxWidth / 2;
        const boxY = this.y - boxHeight / 2;
        
        const bgGradient = ctx.createLinearGradient(boxX, boxY, boxX + boxWidth, boxY + boxHeight);
        bgGradient.addColorStop(0, `rgba(156, 39, 176, ${this.opacity * 0.7})`); 
        bgGradient.addColorStop(1, `rgba(233, 30, 99, ${this.opacity * 0.7})`);  
        
        ctx.fillStyle = bgGradient;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, this.borderRadius);
        ctx.fill();
        
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x, this.y);
        
        ctx.restore();
      }
    }

    const wordsPerRange = 5; 
    const wordParticles: Word[] = [];
    
    wordRanges.forEach((_, rangeIndex) => {
      for (let i = 0; i < wordsPerRange; i++) {
        wordParticles.push(new Word(rangeIndex));
      }
    });

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentFrame = frameRef.current.frame;
      
      wordParticles.forEach(word => {
        word.update(currentFrame);
        word.draw(ctx);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [t]);

  useEffect(() => {
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      x!: number;
      y!: number;
      baseX!: number;
      baseY!: number;
      size!: number;
      speedY!: number;
      opacity!: number;
      angle!: number;
      drift!: number;

      constructor() {
        this.reset();
      }

      reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.drift = Math.random() * 0.5 - 0.25;
      }

      update() {
        if (!canvas) return;
        
        this.y += this.speedY;
        this.x += Math.sin(this.angle) * 0.3 + this.drift;
        this.angle += 0.01;
        
        if (this.y > canvas.height + 10) {
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < -10 || this.x > canvas.width + 10) {
          this.x = Math.random() * canvas.width;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(209, 30, 104, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(209, 30, 104, ${this.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(209, 30, 104, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const particleCount = 80;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const images = imagesRef.current;

    const render = () => {
      if (!context || !canvas) return;
      const imgIndex = Math.round(frameRef.current.frame);
      const img = images[imgIndex];
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    if (images.length === 0) {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `/frames/frame_${(i + 1).toString().padStart(3, "0")}.webp`;
        if (i === 0) img.onload = render;
        images.push(img);
      }
    }

    const wordsBottom = gsap.utils.toArray<HTMLElement>(".word-bottom", containerRef.current);
    const wordsTop = gsap.utils.toArray<HTMLElement>(".word-top", containerRef.current);
    const step = 2; 
    gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", 
        scrub: 0.5, 
        pin: true,
        onRefresh: render,
        onUpdate: (self) => {
          const currentScroll = self.progress;
          const delta = currentScroll - lastScrollRef.current;
          scrollVelocityRef.current = delta * 10; 
          lastScrollRef.current = currentScroll;
        },
        onLeave: () => {
          gsap.to(frameRef.current, {
            frame: frameCount - 1,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: render
          });
        },
        onEnterBack: () => {
          render();
        }
      }
    });

    gsap.to(".scroll-arrow", {
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 0.8
    });

    tl.to(scrollIndicatorRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.5
    }, 0);

    tl.to(frameRef.current, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      duration: palabrasAbajo.length * step,
      onUpdate: render,
    }, 0);

    wordsBottom.forEach((word, i) => {
      const start = i * step;
      tl.to(word, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, start);
      if (i < wordsBottom.length - 1) {
        tl.to(word, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, start + step - 0.5);
      } else {
        tl.to(word, { opacity: 1, duration: 0.1 }, start + step);
      }
    });

    wordsTop.forEach((word, i) => {
      const start = (i * step) + 1; 
      tl.to(word, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, start);
      if (i < wordsTop.length - 1) {
        tl.to(word, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, start + step - 0.5);
      }
    }); 
    gsap.to(scrollIndicatorRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150',
          scrub: true,
        },
        opacity: 0,
        y: -30,
      });

    tl.to(frameRef.current, {
      frame: frameCount - 1,
      duration: 0.1,
      onUpdate: render
    }, "+=0");

    if (bottomArrowRef.current) {
        gsap.to(bottomArrowRef.current, {
          y: 5,
          opacity: 0.3,
          duration: 1.5,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        });
    }

  }, { scope: containerRef });

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#16021B] overflow-hidden">
      <canvas ref={canvasRef} width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover z-0" />
      <canvas 
        ref={lettersCanvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-[8] hidden md:block"
      /> 
       
      <canvas 
        ref={particlesCanvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={handleScrollClick}
      >
        <div className="flex flex-col items-center gap-3 group">
        
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-7 h-11 border-2 border-white/50 rounded-full flex items-start justify-center p-1 transition-all duration-300 group-hover:border-white group-hover:scale-105">
              <div className="w-1 h-2.5 bg-white/60 rounded-full animate-scroll-down group-hover:bg-white"></div>
            </div>
            
            <span className="text-white/70 text-xs font-light tracking-widest uppercase transition-colors group-hover:text-white">
              Scroll
            </span>
          </div>

          <div ref={bottomArrowRef}>
            <svg 
              className="w-5 h-5 text-white/60 transition-colors group-hover:text-white"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute top-25 left-5 lg:top-auto lg:bottom-5 2xl:bottom-20 lg:left-10 2xl:left-20 z-20 text-white pointer-events-none text-left lg:text-left">

        <h1 className="text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl bg-gradient-to-r from-[#9C27B0] to-[#E91E63] 
              bg-clip-text text-transparent font-semibold tracking-tighter leading-tight"
            style={{
              paintOrder: 'stroke fill'
            }}>
              
            3R CORE
        </h1>
        
        <h2 className="text-xl md:text-4xl xl:text-5xl font-light">
            {t('agency2')}  <span className="italic font-serif">{t('d')}</span>
        </h2>
        
        <div className="relative">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl bg-gradient-to-r from-[#9C27B0] to-[#E91E63] 
                bg-clip-text text-transparent font-semibold tracking-tighter leading-tight "
              style={{
                paintOrder: 'stroke fill'
              }}>
              {t('marketing')}
          </h1>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/40 z-[5] pointer-events-none" />

      </div>
    
  );
}


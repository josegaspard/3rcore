'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PostMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const postsRef = useRef<HTMLDivElement[]>([]);

  const posts = [
    {
      id: 1,
      image: '/images/social/postIg/img1.webp', 
      username: 'rest.asdeoros',
      caption: 'En As de Oros, nuestra pasión por la gastronomía y la hospitalidad... más'
    },
    {
      id: 2,
      image: '/images/social/postIg/img2.webp', 
      username: 'rest.asdeoros',
      caption: '¿Te atreves a probar algo diferente?... más'
    },
    {
      id: 3,
      image: '/images/social/postIg/img3.webp', 
      username: 'rest.asdeoros',
      caption: 'Celebramos a quienes cultivan nuestra historia... más'
    },
    {
      id: 4,
      image: '/images/social/postIg/img4.webp', 
      username: 'rest.asdeoros',
      caption: 'Un final dulce para cada comida. Descubre nuestra selección... más'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación para cada post con stagger
      postsRef.current.forEach((post, index) => {
        gsap.fromTo(
          post,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotateY: -15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: post,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15, // Efecto cascada
          }
        );

      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !postsRef.current.includes(el)) {
      postsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-[70vh] w-full overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/social/fondoas.webp"
          alt="Fondo decorativo de portafolio de redes sociales - 3R Core Lima"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-10 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {posts.map((post) => (
            <article 
              key={post.id}
              ref={addToRefs}
              className="bg-white rounded-[14px] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              style={{ perspective: '1000px' }}
            >
              <div className="flex items-center gap-3 p-3 bg-white">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src="/images/social/postIg/log.jpg"
                    alt="Logo de marca cliente en publicación de Instagram - portafolio 3R Core"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-black font-semibold text-sm">{post.username}</span>
              </div>

              <div className="post-image-container relative aspect-square w-full bg-gray-100 overflow-hidden">
                <Image
                  src={post.image}
                  alt={`Post de Instagram diseñado para ${post.username} por 3R Core - manejo de redes sociales Lima`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="p-3 bg-white">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{post.username}</span>{' '}
                  {post.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 
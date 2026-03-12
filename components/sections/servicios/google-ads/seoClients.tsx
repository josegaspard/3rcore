"use client";

import Image from 'next/image';

export function SeoClients() {
  

  return (
        <section className="relative md:h-[70vh] w-full overflow-hidden">
          <Image
            src="/images/seosem/image17.webp"
            alt="Sobre nosotros"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          
        </section>
  );
}
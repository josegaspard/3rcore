"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Ubuntu } from 'next/font/google';
import { useTranslations } from "next-intl"

interface Client {
  name: string;
  logo: string;
  className?: string; 
}

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });

const clients: Client[] = [
  { name: '2K Logo', logo: '/images/Logos/2kLogo.webp', className: "lg:-translate-y-5" },
  { name: 'Daska', logo: '/images/Logos/Daska.webp', className: "xl:-translate-y-25 2xl:-translate-y-35" },
  { name: 'Edifica', logo: '/images/Logos/Edifica.webp', className: "lg:scale-90" },
  { name: 'Clinica Familia', logo: '/images/Logos/clinicaFamilia.webp', className: "lg:translate-y-6" },
  { name: 'CGM', logo: '/images/Logos/cgm.webp', className: "lg:-translate-y-5 xl:-translate-y-25 2xl:-translate-y-30 2xl:translate-x-30" },
  { name: 'Capital Core', logo: '/images/Logos/capitalCore.webp', className: "xl:translate-x-15 2xl:-translate-y-6 2xl:translate-x-40" },
  { name: 'AGU', logo: '/images/Logos/agu.webp', className: "lg:-translate-x-10 lg:-translate-y-5 2xl:-translate-x-30" },
  { name: 'Vlissad', logo: '/images/Logos/vlissad.webp', className: "lg:scale-95" },
  { name: 'Vita Logo', logo: '/images/Logos/vitaLogo.webp', className: "lg:-translate-y-2" },
  { name: 'Venus Logo', logo: '/images/Logos/venusLogo.webp', className: "lg:translate-y-5" },
  { name: 'Ventura Logo', logo: '/images/Logos/venturaLogo.webp', className: "lg:-translate-y-1" },
  { name: 'Warner Bros', logo: '/images/Logos/warnerbros.png', className: "lg:translate-y-6 lg:scale-90" },
  { name: 'Pretties', logo: '/images/Logos/pretties.webp', className: "lg:-translate-y-4" },
  { name: 'PDK', logo: '/images/Logos/pdk.webp', className: "xl:translate-x-15 lg:translate-y-10 2xl:translate-x-30" },
  { name: 'Domus Logo', logo: '/images/Logos/domusLogo.webp', className: "lg:-translate-x-5 xl:-translate-y-6 xl:-translate-x-40" },
  { name: 'Auto Logo', logo: '/images/Logos/AutoLogo.webp', className: "lg:translate-y-10 lg:-translate-x-5 xl:translate-y-4 xl:-translate-x-30" },
  { name: 'DPS', logo: '/images/Logos/DPS.webp', className: "lg:scale-95" },
  { name: 'Glimsolar', logo: '/images/Logos/glimsolar.webp', className: "lg:translate-y-5" },
  { name: 'Instal Pro', logo: '/images/Logos/instalPro.webp', className: "lg:-translate-y-5" },
  { name: 'Italel', logo: '/images/Logos/Italel.webp', className: "lg:translate-y-20 xl:translate-y-3" },
  { name: 'Nexxum', logo: '/images/Logos/Nexxum.webp', className: "lg:scale-90" },
  { name: 'Oros', logo: '/images/Logos/Oros.webp', className: "lg:translate-y-10 lg:translate-x-10 xl:translate-y-25 xl:transalte-x-25 2xl:translate-y-30 2xl:translate-x-30" },
  { name: 'Plinius', logo: '/images/Logos/Plinius.webp', className: "lg:translate-y-4 lg:translate-x-30" },
  { name: 'Paypal', logo: '/images/Logos/paypal.png', className: "lg:translate-x-40 xl:translate-y-25 xl:translate-x-25 2xl:translate-y-30" }
];

export default function ClientsSection() {

  const t = useTranslations('ClientsSection');  
  return (
    <section className="py-10 lg:min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-5 md:px-10 lg:px-6">
        
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 items-center">
          
          <div className="
            /* Móvil: Ocupa la fila central y todas las columnas */
            col-span-3 order-first mb-8
            
            /* Desktop: Se posiciona en el centro exacto */
            lg:col-span-2 lg:col-start-3 
            lg:row-start-2 lg:row-span-2
            lg:order-none lg:mb-0

            flex flex-col justify-center items-center text-center 
            z-20 p-6 rounded-xl
          ">
            <h2 className={`
              tracking-[0.05em] uppercase leading-tight
              text-xl md:text-lg 
              bg-gradient-to-r from-[#9C27B0] to-[#E91E63] 
              bg-clip-text text-transparent font-m
            `}>
              {t('title')}
            </h2>
            <p className={`text-white text-s md:text-m max-w-[300px] ${ubuntu.className} mt-3 `}>
             {t('description')}
            </p>
          </div>

          {clients.map((client, i) => (
            <div key={i} className={`flex justify-center ${client.className}`}>
              <ClientCard client={client} />
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}

const ClientCard = ({ client }: { client: Client }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) return;

    const triggerRandomFlicker = () => {
      const randomTime = Math.floor(Math.random() * 1000) + 1000;
      setTimeout(() => {
        setVisible(prev => !prev);
        triggerRandomFlicker();
      }, randomTime);
    };

    const initialDelay = Math.floor(Math.random() * 5000);
    const timeout = setTimeout(triggerRandomFlicker, initialDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`
      group relative h-24 w-full max-w-[180px]
      md:border md:border-white/30 
      flex items-center justify-center 
      rounded-md md:p-4
      transition-all duration-1000 ease-in-out
      hover:border-white hover:bg-white/[0.03] hover:!opacity-100
      /* 2. Aseguramos que en móvil siempre sea opacity-100 ignorando el estado 'visible' */
      ${visible ? 'opacity-100' : 'opacity-0 lg:opacity-0'} 
      max-lg:!opacity-100
    `}>
      <div className="relative w-full h-full filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          fill
          className="object-contain md:px-2"
        />
      </div>
    </div>
  );
};
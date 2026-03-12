"use client"; 

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const WhatsAppBtnLanding = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    codigoPais: '+51',
    numero: '',
    paginaWeb: '',
    correo: '',
    proyecto: ''
  });

  const containerRef = useRef(null);
  const buttonContentRef = useRef(null);
  const formContentRef = useRef(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const phoneNumber = "969791251";

  const codigosPais = [
    { codigo: '+1', pais: 'Estados Unidos', iso: 'us' },
    { codigo: '+54', pais: 'Argentina', iso: 'ar' },
    { codigo: '+591', pais: 'Bolivia', iso: 'bo' },
    { codigo: '+55', pais: 'Brasil', iso: 'br' },
    { codigo: '+56', pais: 'Chile', iso: 'cl' },
    { codigo: '+57', pais: 'Colombia', iso: 'co' },
    { codigo: '+593', pais: 'Ecuador', iso: 'ec' },
    { codigo: '+595', pais: 'Paraguay', iso: 'py' },
    { codigo: '+51', pais: 'Perú', iso: 'pe' },
    { codigo: '+598', pais: 'Uruguay', iso: 'uy' },
    { codigo: '+58', pais: 'Venezuela', iso: 've' },
  ];

  const paisSeleccionado = codigosPais.find(p => p.codigo === formData.codigoPais) || codigosPais[8];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      const tl = gsap.timeline();
      
      tl.to(buttonContentRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.in'
      })
      .to(containerRef.current, {
        width: '350px',
        height: '520px',
        borderRadius: '16px',
        duration: 0.5,
        ease: 'power3.out'
      })
      .fromTo(formContentRef.current, 
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        },
        '-=0.2'
      );
    } else if (containerRef.current) {
      const tl = gsap.timeline();
      
      tl.to(formContentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: 'power2.in'
      })
      .to(containerRef.current, {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        duration: 0.5,
        ease: 'power3.out'
      })
      .fromTo(buttonContentRef.current,
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        },
        '-=0.2'
      );
    }
  }, [isExpanded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountrySelect = (codigo: string) => {
    setFormData(prev => ({
      ...prev,
      codigoPais: codigo
    }));
    setShowCountryDropdown(false);
  };
  const gtag_report_conversion = (url?: string) => {
    if (typeof window === "undefined" || !(window as any).gtag) return;

    const callback = () => {
      if (url) window.location.href = url;
    };

    (window as any).gtag("event", "conversion", {
      send_to: "AW-17933910865/AcOyCNuLq4ccENGGx-dC",
      value: 1.0,
      currency: "PEN",
      event_callback: callback,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  const message = `

    *INFORMACIÓN DEL CLIENTE*
    Nombre: ${formData.nombre}
    Teléfono: ${formData.codigoPais} ${formData.numero}
    Correo electrónico: ${formData.correo}
    ${formData.paginaWeb ? `Página web: ${formData.paginaWeb}` : ''}
    
    *DETALLES DEL PROYECTO*
    ${formData.proyecto}
      `.trim();

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      gtag_report_conversion(whatsappUrl);
      window.open(whatsappUrl, '_blank');
      
      
      setFormData({
        nombre: '',
        codigoPais: '+51',
        numero: '',
        paginaWeb: '',
        correo: '',
        proyecto: ''
      });
      setIsExpanded(false);
    };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-6 right-6 bg-white shadow-2xl z-50 border-2 border-[#25d366]"
      style={{ 
        width: '60px', 
        height: '60px', 
        borderRadius: '50%',
        overflow: 'visible'
      }}
    >
      <div 
        ref={buttonContentRef}
        className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${isExpanded ? 'pointer-events-none' : ''}`}
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-center w-full h-full">
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 24 24" 
            fill="#25d366" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.432 5.633 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>
      </div>

      <div 
        ref={formContentRef}
        className={`absolute inset-0 p-6 opacity-0 ${!isExpanded ? 'pointer-events-none' : ''}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-[#25d366]">Contáctanos</h3>
          <button 
            onClick={toggleExpanded}
            className="text-[#25d366] hover:text-[#128c7e] transition-colors p-1"
            aria-label="Cerrar formulario"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre *"
              required
              className="w-full px-3 py-2.5 bg-gray-50 border border-[#25d366] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:bg-white text-sm text-gray-800 placeholder-gray-500 transition-all"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="w-auto px-2 py-2.5 bg-gray-50 border border-[#25d366] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:bg-white text-sm text-gray-800 transition-all flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <img 
                    src={`https://flagcdn.com/w20/${paisSeleccionado.iso}.png`}
                    srcSet={`https://flagcdn.com/w40/${paisSeleccionado.iso}.png 2x`}
                    width="20"
                    alt={paisSeleccionado.pais}
                    className="rounded-sm"
                  />
                  <span>{paisSeleccionado.codigo}</span>
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showCountryDropdown && (
                <div 
                  className="absolute bottom-full left-0 mb-1 w-56 bg-white border-2 border-[#25d366] rounded-lg shadow-lg z-[9999]"
                  style={{ 
                    maxHeight: '700px',
                    overflowX: 'hidden'
                  }}
                >
                  {codigosPais.map((pais) => (
                    <button
                      key={pais.codigo}
                      type="button"
                      onClick={() => handleCountrySelect(pais.codigo)}
                      className="w-full px-3 py-2.5 text-black text-left hover:bg-[#25d366] hover:text-white transition-colors flex items-center gap-2 text-sm border-b border-gray-100 last:border-b-0"
                    >
                      <img 
                        src={`https://flagcdn.com/w20/${pais.iso}.png`}
                        srcSet={`https://flagcdn.com/w40/${pais.iso}.png 2x`}
                        width="24"
                        alt={pais.pais}
                        className="rounded-sm flex-shrink-0"
                      />
                      <span className="font-medium flex-shrink-0">{pais.codigo}</span>
                      <span className="text-xs opacity-75 truncate">{pais.pais}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="tel"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              placeholder="Número *"
              required
              className="flex-1 px-3 py-2.5 bg-gray-50 border border-[#25d366] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:bg-white text-sm text-gray-800 placeholder-gray-500 transition-all"
            />
          </div>

          <div>
            <input
              type="url"
              name="paginaWeb"
              value={formData.paginaWeb}
              onChange={handleInputChange}
              placeholder="Página web"
              className="w-full px-3 py-2.5 bg-gray-50 border border-[#25d366] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:bg-white text-sm text-gray-800 placeholder-gray-500 transition-all"
            />
          </div>

          <div>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              placeholder="Correo *"
              required
              className="w-full px-3 py-2.5 bg-gray-50 border border-[#25d366] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:bg-white text-sm text-gray-800 placeholder-gray-500 transition-all"
            />
          </div>

          <div>
            <textarea
              name="proyecto"
              value={formData.proyecto}
              onChange={handleInputChange}
              placeholder="Cuéntanos de tu proyecto *"
              required
              rows={3}
              className="w-full px-3 py-2.5 bg-gray-50 border border-[#25d366] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:bg-white resize-none text-sm text-gray-800 placeholder-gray-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#25d366] text-white py-3 rounded-lg font-bold hover:bg-[#128c7e] transition-colors duration-300 text-sm"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppBtnLanding;
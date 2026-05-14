import { useTranslations } from "next-intl";

export default function MediaApplications() {

  const t = useTranslations('SocialMediaHero');


  return (
    <section className="w-full flex items-center px-10 lg:px-6 md:px-20 py-12 md:py-18 bg-gradient-to-r from-[#4c0046] to-[#130218]"> 
      <div className="max-w-6xl lg:max-w-4xl 2xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 items-center">
        
        <div className="flex flex-col space-y-4 md:space-y-8 text-center md:text-left">
          <h2 className="text-white text-3xl  lg:text-4xl xl:text-5xl font-serif italic tracking-wide">
            { t('griPost')}
          </h2>
          
          <p className="text-white/90 text-base lg:text-base xl:text-lg 2xl:text-2xl font-light leading-relaxed max-w-xl mx-auto md:mx-0">
            { t('griParraf')}
          </p>
        </div>

        <div className="relative w-full h-auto mt-4 md:mt-0">
          <img
            src="/images/social/AplicPost3.webp"
            alt="Grilla de contenidos y aplicaciones de marca en redes sociales - agencia 3R Core Lima"
            className="w-full h-auto object-contain max-h-[300px] md:max-h-none"
          />
        </div>

      </div>
    </section>
  );
}
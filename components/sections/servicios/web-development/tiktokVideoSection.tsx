'use client';
import { useTranslations } from 'next-intl';
import { Montserrat, Playfair_Display } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], style: ['italic'] });

const TIKTOK_VIDEO_ID = '7614254330253790485';
const TIKTOK_URL = `https://www.tiktok.com/@3rcore/video/${TIKTOK_VIDEO_ID}`;
const EMBED_URL = `https://www.tiktok.com/embed/v2/${TIKTOK_VIDEO_ID}?autoplay=0`;

const TikTokVideoSection = () => {
  const t = useTranslations('WebHero');

  return (
    <section className={`${montserrat.className} relative w-full text-white py-12 md:py-16 px-6 md:px-12 overflow-hidden`}>
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <span
            className="inline-block text-[11px] md:text-xs tracking-[0.25em] uppercase mb-5"
            style={{ backgroundColor: '#A21F8A', padding: '4px 12px', borderRadius: '2px' }}
          >
            {t('videoBadge')}
          </span>
          <h2 className={`${playfair.className} text-white text-3xl md:text-4xl xl:text-5xl italic leading-[1.15] mb-5`}>
            {t('videoTitle')}
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {t('videoSubtitle')}
          </p>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center mt-8 px-8 py-3.5 overflow-hidden font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 border border-white/20 rounded-[15px] cursor-pointer text-white"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-transform duration-500 ease-out -translate-x-[101%] group-hover:translate-x-0" />
            <span className="relative z-10">@3rcore en TikTok</span>
          </a>
        </div>

        <div className="flex-1 w-full flex justify-center">
          <div
            className="relative w-full max-w-[340px] rounded-[20px] overflow-hidden border border-white/10 shadow-[0_20px_60px_-20px_rgba(233,30,99,0.35)]"
            style={{ aspectRatio: '9 / 16' }}
          >
            <iframe
              src={EMBED_URL}
              title="3R Core TikTok"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TikTokVideoSection;

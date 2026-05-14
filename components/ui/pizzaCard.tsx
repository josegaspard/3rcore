"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
}

interface PizzaCardProps {
  media: MediaItem[];
  showDots?: boolean;
  autoOnHover?: boolean; 
  className?: string;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ 
  media, 
  showDots = false, 
  autoOnHover = false, 
  className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const indexRef = useRef(0);

  const slideTo = (index: number) => {
    let targetIndex = index;
    if (index >= media.length) targetIndex = 0;
    if (index < 0) targetIndex = media.length - 1;

    const currentVideo = videoRefs.current[indexRef.current];
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }

    gsap.to(sliderRef.current, {
      xPercent: -100 * targetIndex,
      duration: 0.8,
      ease: "expo.out",
    });
    
    setCurrentIndex(targetIndex);
    indexRef.current = targetIndex;
    setVideoProgress(0);

    const newVideo = videoRefs.current[targetIndex];
    if (newVideo && media[targetIndex].type === "video") {
      newVideo.play();
    }
  };

  const handleVideoTimeUpdate = (videoElement: HTMLVideoElement, index: number) => {
    if (index === currentIndex && videoElement.duration) {
      const progress = (videoElement.currentTime / videoElement.duration) * 100;
      setVideoProgress(progress);
    }
  };

  const handleVideoEnded = () => {
    const next = (indexRef.current + 1) % media.length;
    slideTo(next);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);

    if (autoOnHover && media.length > 1) {
      if (media[currentIndex].type === "video") return;
      
      intervalRef.current = setInterval(() => {
        const next = (indexRef.current + 1) % media.length;
        slideTo(next);
      }, 1200);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Auto-play video when component mounts or currentIndex changes
    if (media[currentIndex]?.type === "video") {
      const currentVideo = videoRefs.current[currentIndex];
      if (currentVideo) {
        currentVideo.play();
      }
    }
  }, [currentIndex, media]);

  useEffect(() => {
    return () => {
      handleMouseLeave();
    };
  }, []);

  const isCurrentMediaVideo = media[currentIndex]?.type === "video";

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[1rem] bg-[#1a1a1a] group shadow-2xl ${className}`}
    >
      {isCurrentMediaVideo && (
        <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-3">
          <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-200 ease-linear"
              style={{ width: `${videoProgress}%` }}
            />
          </div>
        </div>
      )}

      <div ref={sliderRef} className="flex h-full w-full">
        {media.map((item, i) => (
          <div key={i} className="min-w-full h-full relative">
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt ?? ""}
                className="w-full h-full  select-none pointer-events-none"
              />
            ) : (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={item.src}
                className="w-full h-full object-cover select-none"
                playsInline
                muted
                loop={false}
                onTimeUpdate={(e) => handleVideoTimeUpdate(e.currentTarget, i)}
                onEnded={handleVideoEnded}
              />
            )}
          </div>
        ))}
      </div>

      {!autoOnHover && (
        <div className="absolute inset-0 flex z-10">
          <div className="w-1/2 h-full cursor-pointer" onClick={() => slideTo(currentIndex - 1)} />
          <div className="w-1/2 h-full cursor-pointer" onClick={() => slideTo(currentIndex + 1)} />
        </div>
      )}

      {showDots && media.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/20 backdrop-blur-md px-3 py-2 rounded-full">
          {media.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                currentIndex === i ? "bg-white w-5" : "bg-white/30 w-1.5"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PizzaCard;
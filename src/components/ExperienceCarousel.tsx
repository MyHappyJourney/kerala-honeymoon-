import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { TRAVEL_EXPERIENCES } from '../data/tourData';

interface ExperienceCarouselProps {
  onQuoteClick?: () => void;
}

export const ExperienceCarousel: React.FC<ExperienceCarouselProps> = ({ onQuoteClick }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const totalSlides = TRAVEL_EXPERIENCES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Automatic slide rotation every 4 seconds when playing and not hovered
  useEffect(() => {
    if (isHovered || !isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, isPlaying, nextSlide]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Keyboard navigation (left / right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <section id="travel-experiences" className="py-14 sm:py-20 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
          <span>REAL TRAVEL EXPERIENCES</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-3">
          What your Kerala trip could look like with{' '}
          <span className="text-[#0B3996]">My</span>
          <span className="text-[#FF4B00]">Happy</span>
          <span className="text-[#0B3996]">Journey</span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10">
          From misty tea gardens in Munnar to private houseboat sunsets in Alleppey backwaters — immerse yourself in God&apos;s Own Country.
        </p>

        {/* Standard Responsive Carousel */}
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-200/90 bg-gray-950 aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] group select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Slides with Crossfade */}
            {TRAVEL_EXPERIENCES.map((exp, idx) => (
              <div
                key={exp.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                <img
                  src={exp.url}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}

            {/* Top Right Controls (Autoplay Toggle) */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
                className="bg-black/50 hover:bg-black/75 backdrop-blur-md text-white p-2 rounded-full border border-white/20 transition-all cursor-pointer shadow-md active:scale-95"
                title={isPlaying ? "Pause auto-slide" : "Start auto-slide"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
              </button>
            </div>

            {/* Previous Slide Arrow */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20 cursor-pointer"
              id="experience-carousel-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Slide Arrow */}
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20 cursor-pointer"
              id="experience-carousel-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5" role="tablist" aria-label="Slides">
            {TRAVEL_EXPERIENCES.map((exp, idx) => (
              <button
                key={exp.id}
                type="button"
                role="tab"
                aria-selected={currentIndex === idx}
                aria-label={`Go to slide ${idx + 1}: ${exp.title}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 sm:w-8 bg-[#FF4B00]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 mt-4 overflow-x-auto py-2 px-1 max-w-5xl mx-auto scrollbar-thin">
            {TRAVEL_EXPERIENCES.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${exp.title}`}
                className={`relative rounded-xl overflow-hidden transition-all duration-200 cursor-pointer shrink-0 ${
                  idx === currentIndex
                    ? 'border-2 border-[#FF4B00] ring-3 ring-[#FF4B00]/25 scale-105 shadow-md opacity-100'
                    : 'border border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400'
                }`}
              >
                <img
                  src={exp.url}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  className="w-14 h-10 sm:w-20 sm:h-12 object-cover"
                />
              </button>
            ))}
          </div>

          {/* Optional CTA Button below carousel */}
          {onQuoteClick && (
            <div className="mt-6">
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B3996] hover:bg-[#082a70] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>Book a Similar Kerala Trip</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

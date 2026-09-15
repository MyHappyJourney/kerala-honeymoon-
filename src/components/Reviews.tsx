import React, { useState, useRef } from 'react';
import { REVIEWS } from '../data/tourData';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const Reviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const index = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.min(index, REVIEWS.length - 1));
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <section id="reviews-section" className="py-12 sm:py-16 bg-[#F6F7F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1 rounded-full border border-gray-200 shadow-xs mb-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span className="text-xs font-bold text-gray-800">4.9 ★ Google Rating</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-2 tracking-tight">
            LOVED BY 5000+ HAPPY HONEYMOONERS & COUPLES 🌴
          </h2>
          <p className="text-xs sm:text-base text-gray-600 mt-2">
            Read real verified experiences from couples who celebrated their dream honeymoon and loved our inclusions.
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Google Logo & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-200 fill-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <svg className="w-5 h-5 opacity-80" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0B3996] text-white font-black text-xs flex items-center justify-center shrink-0 uppercase">
                    {rev.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">
                      — {rev.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-medium">{rev.location}</p>
                  </div>
                </div>
                {rev.date && (
                  <span className="text-[11px] text-gray-400 font-medium">{rev.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipeable Carousel */}
        <div className="lg:hidden relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1 -mx-4 px-4"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="w-[85vw] max-w-[320px] shrink-0 snap-center bg-white rounded-2xl p-5 shadow-xs border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-200 fill-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">Google Review</span>
                  </div>

                  <p className="text-xs text-gray-700 italic leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0B3996] text-white font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                      {rev.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 leading-tight">
                        — {rev.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-medium">{rev.location}</p>
                    </div>
                  </div>
                  {rev.date && (
                    <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Nav & Dots */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="p-2 rounded-full bg-white shadow-md text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === idx ? 'w-6 bg-[#0B3996]' : 'w-2.5 bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollToCard(Math.min(REVIEWS.length - 1, activeIndex + 1))}
              disabled={activeIndex === REVIEWS.length - 1}
              className="p-2 rounded-full bg-white shadow-md text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

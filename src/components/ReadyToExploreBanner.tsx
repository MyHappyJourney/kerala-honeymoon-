import React, { useState, useEffect } from 'react';
import { Crown, AlertTriangle } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MSG } from '../data/tourData';

interface ReadyToExploreBannerProps {
  onQuoteClick: () => void;
}

export const ReadyToExploreBanner: React.FC<ReadyToExploreBannerProps> = ({ onQuoteClick }) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`;

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '15',
    minutes: '43',
    seconds: '21'
  });

  useEffect(() => {
    // Set a target end time that rolls over seamlessly
    const now = new Date();
    // End of current day or next 16 hours
    const target = new Date(now.getTime() + (15 * 3600 + 43 * 60 + 21) * 1000);

    const interval = setInterval(() => {
      const current = new Date().getTime();
      const difference = target.getTime() - current;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          minutes: String(m).padStart(2, '0'),
          seconds: String(s).padStart(2, '0')
        });
      } else {
        // Reset cycle if it reaches zero
        setTimeLeft({
          days: '00',
          hours: '12',
          minutes: '30',
          seconds: '00'
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative py-16 sm:py-24 lg:py-28 bg-fixed bg-center bg-cover overflow-hidden"
      style={{
        backgroundImage: `url('https://hczb7fxersozfdoh.public.blob.vercel-storage.com/swastik-arora-6R_k1QF1LCw-unsplash.jpg')`
      }}
    >
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Crown Icon Badge */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black/40 border border-white/25 text-amber-400 mb-6 shadow-lg">
          <Crown className="w-7 h-7 stroke-[2]" />
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
          Ready for Your Dream Kerala Honeymoon? 🌺
        </h2>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed mb-7 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Book now & get <span className="text-amber-300 font-extrabold">FREE Flowerbed Decor, Candle Light Dinner & Honeymoon Cake</span> during our Flash Sale!
        </p>

        {/* 4 Orange Countdown Blocks */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-6">
          {/* Days */}
          <div className="w-16 sm:w-20 py-2.5 sm:py-3 bg-[#FF9500] rounded-xl shadow-lg text-center flex flex-col items-center justify-center border border-amber-300/30">
            <span className="text-xl sm:text-2xl font-black text-white leading-none">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-white/95 uppercase tracking-wider mt-1">
              DAYS
            </span>
          </div>

          {/* Hours */}
          <div className="w-16 sm:w-20 py-2.5 sm:py-3 bg-[#FF9500] rounded-xl shadow-lg text-center flex flex-col items-center justify-center border border-amber-300/30">
            <span className="text-xl sm:text-2xl font-black text-white leading-none">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-white/95 uppercase tracking-wider mt-1">
              HOURS
            </span>
          </div>

          {/* Minutes */}
          <div className="w-16 sm:w-20 py-2.5 sm:py-3 bg-[#FF9500] rounded-xl shadow-lg text-center flex flex-col items-center justify-center border border-amber-300/30">
            <span className="text-xl sm:text-2xl font-black text-white leading-none">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-white/95 uppercase tracking-wider mt-1">
              MINUTES
            </span>
          </div>

          {/* Seconds */}
          <div className="w-16 sm:w-20 py-2.5 sm:py-3 bg-[#FF9500] rounded-xl shadow-lg text-center flex flex-col items-center justify-center border border-amber-300/30">
            <span className="text-xl sm:text-2xl font-black text-white leading-none">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-white/95 uppercase tracking-wider mt-1">
              SECONDS
            </span>
          </div>
        </div>

        {/* Urgency warning text */}
        <div className="inline-flex items-center justify-center gap-1.5 text-amber-300 font-bold text-xs sm:text-sm md:text-[15px] mb-8 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Limited Honeymoon Packages Available for Oct – Dec Season !!</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
          {/* Custom Quote Button */}
          <button
            onClick={onQuoteClick}
            id="flash-sale-quote-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#C8382B] hover:bg-[#b53023] active:scale-98 text-white font-bold text-sm sm:text-base px-7 py-3.5 sm:py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer"
          >
            Get FREE Honeymoon Quote Now
          </button>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="flash-sale-whatsapp-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 text-white font-bold text-sm sm:text-base px-7 py-3.5 sm:py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200"
          >
            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>WhatsApp Now</span>
          </a>
        </div>

      </div>
    </section>
  );
};

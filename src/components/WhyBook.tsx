import React from 'react';
import { Award, Car, ShieldCheck, Headphones } from 'lucide-react';
import { WHY_BOOK_ITEMS } from '../data/tourData';

export const WhyBook: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-7 h-7 sm:w-9 sm:h-9 text-[#0B3996]" />;
      case 'Car':
        return <Car className="w-7 h-7 sm:w-9 sm:h-9 text-[#0B3996]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 sm:w-9 sm:h-9 text-[#0B3996]" />;
      case 'Headphones':
        return <Headphones className="w-7 h-7 sm:w-9 sm:h-9 text-[#0B3996]" />;
      default:
        return <Award className="w-7 h-7 sm:w-9 sm:h-9 text-[#0B3996]" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[#0B3996] font-bold text-xs uppercase tracking-widest bg-[#EBF2FF] px-3.5 py-1 rounded-full border border-[#0B3996]/20">
            OUR PROMISE
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-2 tracking-tight">
            WHY BOOK WITH MYHAPPYJOURNEY? 🌴
          </h2>
          <p className="text-xs sm:text-base text-gray-600 mt-2">
            Trusted by over 5000+ happy families since 2007 with 100% transparent local tour management.
          </p>
        </div>

        {/* 4 Cards (2-column on mobile, 4-column on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WHY_BOOK_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-[#F6F7F6] hover:bg-[#EBF2FF] rounded-2xl p-5 sm:p-6 border border-gray-200/80 transition-all duration-300 text-center flex flex-col items-center group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getIcon(item.icon)}
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-gray-900 mb-1 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

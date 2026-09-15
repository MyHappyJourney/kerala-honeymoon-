import React from 'react';
import { Award, Users, Tag, Sliders, Headphones, ShieldCheck, Star, CheckCircle } from 'lucide-react';
import { TRUST_ITEMS } from '../data/tourData';

export const TrustStrip: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Google':
        return (
          <div className="relative flex items-center justify-center">
            <span className="font-black text-[#4285F4] text-base leading-none">G</span>
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 absolute -bottom-1 -right-1" />
          </div>
        );
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />;
      case 'Award':
        return <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B3996]" />;
      case 'Users':
        return <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B3996]" />;
      case 'Tag':
        return <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B3996]" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B3996]" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B3996]" />;
      default:
        return <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B3996]" />;
    }
  };

  return (
    <section className="bg-white border-b border-gray-100 py-4 sm:py-6 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Google Rating & Trust Intro */}
        <div className="mb-4 sm:mb-5 pb-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-[#F8FAFC] p-3 sm:p-4 rounded-2xl border border-gray-200/80">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white flex items-center justify-center shrink-0 border border-gray-200 shadow-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-gray-900 text-xs sm:text-sm">
                  Google 4.9/5 Rating
                </span>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-600 font-medium">
                Rated Excellent by 2,500+ verified customer reviews
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#0B3996] bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Verified Kerala Local Tour Operator</span>
          </div>
        </div>

        {/* 7-Item Trust Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-4">
          {TRUST_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-[#F6F7F6] sm:bg-white border border-gray-100 hover:border-blue-200 transition-colors shadow-2xs ${
                index === TRUST_ITEMS.length - 1 && TRUST_ITEMS.length % 2 !== 0 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#EBF2FF] flex items-center justify-center shrink-0 border border-[#0B3996]/10">
                {getIcon(item.iconName)}
              </div>
              <div className="text-left min-w-0">
                <p className="font-extrabold text-gray-900 text-[11px] sm:text-xs leading-tight truncate">
                  {item.title}
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-tight truncate">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated ISO 9001:2015 Certification Strip Below Trust Items */}
        <div className="mt-4 sm:mt-5 pt-3.5 border-t border-gray-100 flex flex-wrap items-center justify-center gap-3 sm:gap-4 bg-emerald-50/70 border border-emerald-100/90 rounded-2xl p-3 sm:p-3.5 text-center">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100/90 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300 shadow-2xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <span className="font-black text-gray-900 tracking-tight">
              ISO 9001:2015 Certified
            </span>
            <span className="bg-emerald-600 text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-2xs">
              <CheckCircle className="w-3 h-3" /> Quality Assured
            </span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-gray-700 font-bold">
              Government Recognized & Certified Travel Operator
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

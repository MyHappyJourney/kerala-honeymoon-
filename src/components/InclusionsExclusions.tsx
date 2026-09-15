import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { INCLUSIONS, EXCLUSIONS } from '../data/tourData';

export const InclusionsExclusions: React.FC = () => {
  return (
    <section id="inclusions-section" className="py-12 sm:py-16 bg-[#F6F7F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[#0B3996] font-bold text-xs uppercase tracking-widest bg-[#EBF2FF] px-3.5 py-1 rounded-full border border-[#0B3996]/20">
            TRANSPARENT HONEYMOON BOOKING
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-2 tracking-tight">
            HONEYMOON INCLUSIONS & EXCLUSIONS 🌴
          </h2>
          <p className="text-xs sm:text-base text-gray-600 mt-2">
            Complete transparency with romantic complimentary perks. Know exactly what is covered in your Kerala honeymoon package.
          </p>
        </div>

        {/* 2 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* PACKAGE INCLUSIONS CARD */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#EBF2FF] text-[#0B3996] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-[#0B3996]">
                    PACKAGE INCLUSIONS
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Included in base package price</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
                {INCLUSIONS.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B3996] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 bg-[#EBF2FF]/60 p-3.5 rounded-xl flex items-center gap-2 text-xs text-[#0B3996] font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Guaranteed service commitments as listed above.</span>
            </div>
          </div>

          {/* PACKAGE EXCLUSIONS CARD */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-red-600">
                    PACKAGE EXCLUSIONS
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Not included in standard price</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
                {EXCLUSIONS.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 bg-red-50/60 p-3.5 rounded-xl flex items-center gap-2 text-xs text-red-700 font-semibold">
              <span>* Can be arranged separately upon request during itinerary customization.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { FAQS } from '../data/tourData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-12 sm:py-16 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[#0B3996] font-bold text-xs uppercase tracking-widest bg-[#EBF2FF] px-3.5 py-1 rounded-full border border-[#0B3996]/20">
            HAVE QUESTIONS?
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-2 tracking-tight">
            FREQUENTLY ASKED QUESTIONS 🌴
          </h2>
          <p className="text-xs sm:text-base text-gray-600 mt-2">
            Clear answers to common questions about booking your romantic Kerala honeymoon package.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 bg-white shadow-2xs"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#0B3996] shrink-0" />
                    <span className="font-extrabold text-sm sm:text-base text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`p-1.5 rounded-full bg-gray-100 text-gray-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#EBF2FF] text-[#0B3996]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/60 pl-12">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

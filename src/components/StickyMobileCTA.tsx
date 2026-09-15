import React from 'react';
import { Phone, Send } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MSG } from '../data/tourData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface StickyMobileCTAProps {
  onQuoteClick: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onQuoteClick }) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl p-2 px-3 h-[68px] flex items-center justify-between gap-1.5">
      
      {/* 1. CALL NOW Button */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="flex-1 h-12 bg-[#082b75] hover:bg-[#0B3996] text-white font-bold text-xs rounded-xl flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-xs"
        id="sticky-call-btn"
      >
        <Phone className="w-4 h-4 fill-white" />
        <span className="text-[10px] uppercase font-black tracking-tight">CALL NOW</span>
      </a>

      {/* 2. GET INSTANT QUOTE Button (Main Orange CTA) */}
      <button
        onClick={onQuoteClick}
        className="flex-[1.5] h-12 bg-[#FF4B00] active:bg-[#e04200] text-white font-black text-xs rounded-xl flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-md uppercase tracking-tight"
        id="sticky-quote-btn"
      >
        <Send className="w-4 h-4" />
        <span className="text-[10px] font-black">GET INSTANT QUOTE</span>
      </button>

      {/* 3. WHATSAPP US Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-12 bg-[#25D366] active:bg-[#1fbd58] text-white font-bold text-xs rounded-xl flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-sm"
        id="sticky-whatsapp-btn"
      >
        <WhatsAppIcon className="w-4 h-4 fill-white" />
        <span className="text-[10px] uppercase font-black tracking-tight">WHATSAPP</span>
      </a>

    </div>
  );
};

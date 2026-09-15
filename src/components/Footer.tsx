import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE, WHATSAPP_NUMBER, ENQUIRY_EMAIL } from '../data/tourData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onQuoteClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onQuoteClick }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-24 md:pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[#FF4B00] font-black text-2xl">MY</span>
                <span className="text-white font-extrabold text-2xl">Happy</span>
                <span className="text-white font-bold text-2xl">Journey</span>
              </div>
              <p className="text-[11px] text-[#0B3996] font-bold bg-[#EBF2FF] inline-block px-2 py-0.5 rounded mt-1">
                ESTABLISHED SINCE 2007
              </p>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              MyHappyJourney is a premier Kerala tour operator with 18+ years of expertise in delivering customized family vacations, honeymoons, and backwater cruises.
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#0B3996]" />
              <span>Registered Kerala Tour Specialists</span>
            </div>
          </div>

          {/* Col 2: Popular Tour Packages */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#0B3996] pl-2.5">
              Kerala Packages
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><a href="#packages-section" className="hover:text-white transition-colors">4N / 5D Kerala Delight (₹15,999*)</a></li>
              <li><a href="#packages-section" className="hover:text-white transition-colors">5N / 6D Kerala Explorer (₹20,999*)</a></li>
              <li><a href="#packages-section" className="text-amber-400 font-bold hover:underline">6N / 7D Complete Kerala Package (₹22,999*)</a></li>
              <li><a href="#packages-section" className="hover:text-white transition-colors">7N / 8D Grand Kerala Odyssey (₹24,499*)</a></li>
              <li><a href="#itinerary-section" className="hover:text-white transition-colors">Customized Honeymoon Packages</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#0B3996] pl-2.5">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><a href="#hero-section" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#packages-section" className="hover:text-white transition-colors">Choose Packages</a></li>
              <li><a href="#itinerary-section" className="hover:text-white transition-colors">Why Kerala (6 Reasons)</a></li>
              <li><a href="#inclusions-section" className="hover:text-white transition-colors">Inclusions & Exclusions</a></li>
              <li><a href="#reviews-section" className="hover:text-white transition-colors">5000+ Guest Reviews</a></li>
              <li><a href="#faq-section" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#0B3996] pl-2.5">
              24x7 Support
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2.5 hover:text-white">
                <Phone className="w-4 h-4 text-[#0B3996] shrink-0" />
                <span>{DISPLAY_PHONE}</span>
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0 fill-current" />
                <span>WhatsApp Instant Support</span>
              </a>
              <a href={`mailto:${ENQUIRY_EMAIL}`} className="flex items-center gap-2.5 hover:text-white">
                <Mail className="w-4 h-4 text-[#0B3996] shrink-0" />
                <span>{ENQUIRY_EMAIL}</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0B3996] shrink-0 mt-0.5" />
                <span>Cochin & Trivandrum Regional Ground Operations, Kerala, India</span>
              </div>
            </div>

            <button
              onClick={onQuoteClick}
              className="mt-2 w-full py-2.5 bg-[#FF4B00] hover:bg-[#e04200] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Get Customised Quote
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4 text-center sm:text-left">
          <p>© 2007–{new Date().getFullYear()} MyHappyJourney. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5 justify-center font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>by <strong className="text-gray-300 font-bold">MyHappyJourney</strong></span>
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:underline">Cancellation Rules</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

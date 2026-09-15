import React, { useState } from 'react';
import { Phone, Menu, X, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import { PHONE_NUMBER, DISPLAY_PHONE } from '../data/tourData';
import { Logo } from './Logo';

interface HeaderProps {
  onQuoteClick: () => void;
  onPackageSelect?: (pkgId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onQuoteClick, onPackageSelect }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNavClick = (action?: () => void, elementId?: string) => {
    setIsDrawerOpen(false);
    if (action) {
      action();
    } else if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-[64px] sm:h-[72px] flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group focus:outline-none" id="brand-logo-link">
          <Logo size="md" />
        </a>

        {/* Desktop Trust & Stats (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-medium text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EBF2FF] flex items-center justify-center text-[#0B3996]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-tight">Since 2007</p>
              <p className="text-[11px] text-gray-500">18+ Years Experience</p>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-gray-200"></div>

          <div>
            <p className="font-bold text-gray-900 leading-tight">5000+ Happy</p>
            <p className="text-[11px] text-gray-500">Travellers Served</p>
          </div>

          <div className="h-8 w-[1px] bg-gray-200"></div>

          <div className="flex items-center gap-1.5 bg-yellow-50/80 px-2.5 py-1.5 rounded-lg border border-yellow-200/60">
            <span className="font-black text-gray-900 text-sm">4.9</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-[10px] font-semibold text-gray-600 ml-0.5">Google Rating</span>
          </div>
        </div>

        {/* Actions (Phone + Menu) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Phone Call Button */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center justify-center gap-1.5 bg-[#0B3996] hover:bg-[#082b75] text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-xs transition-all focus:ring-2 focus:ring-[#0B3996] focus:ring-offset-1"
            id="header-call-button"
            aria-label="Call MyHappyJourney"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            <span className="hidden sm:inline">{DISPLAY_PHONE}</span>
            <span className="sm:hidden text-[11px]">Call</span>
          </a>

          {/* Instant Quote Button (Desktop) */}
          <button
            onClick={onQuoteClick}
            className="hidden sm:flex items-center justify-center bg-[#FF4B00] hover:bg-[#e04200] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-xs transition-all focus:outline-none"
            id="header-quote-button"
          >
            Get Instant Quote
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B3996]"
            id="header-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {isDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Slide-out Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
          <div className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <Logo size="sm" />
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="space-y-1">
                <button
                  onClick={() => handleNavClick(undefined, 'hero-section')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-800 hover:bg-[#EBF2FF] hover:text-[#0B3996] flex items-center justify-between"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <div className="pt-2 pb-1 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Tour Packages
                </div>

                <button
                  onClick={() => {
                    handleNavClick(undefined, 'packages-section');
                    if (onPackageSelect) onPackageSelect('pkg-4n5d');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#EBF2FF] hover:text-[#0B3996] flex items-center justify-between pl-5"
                >
                  <span>4N / 5D Kerala Package</span>
                  <span className="text-xs text-[#0B3996] font-bold">GET BEST PRICE →</span>
                </button>

                <button
                  onClick={() => {
                    handleNavClick(undefined, 'packages-section');
                    if (onPackageSelect) onPackageSelect('pkg-5n6d');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#EBF2FF] hover:text-[#0B3996] flex items-center justify-between pl-5"
                >
                  <span>5N / 6D Kerala Package</span>
                  <span className="text-xs text-[#0B3996] font-bold">GET BEST PRICE →</span>
                </button>

                <button
                  onClick={() => {
                    handleNavClick(undefined, 'packages-section');
                    if (onPackageSelect) onPackageSelect('pkg-6n7d');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#EBF2FF] hover:text-[#0B3996] flex items-center justify-between pl-5 bg-amber-50/60"
                >
                  <span className="font-semibold text-gray-900">6N / 7D Package (Popular)</span>
                  <span className="text-xs text-[#0B3996] font-bold">GET BEST PRICE →</span>
                </button>

                <button
                  onClick={() => {
                    handleNavClick(undefined, 'packages-section');
                    if (onPackageSelect) onPackageSelect('pkg-7n8d');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#EBF2FF] hover:text-[#0B3996] flex items-center justify-between pl-5"
                >
                  <span>7N / 8D Grand Kerala</span>
                  <span className="text-xs text-[#0B3996] font-bold">GET BEST PRICE →</span>
                </button>

                <div className="pt-3 pb-1 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Details
                </div>

                <button
                  onClick={() => handleNavClick(undefined, 'itinerary-section')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#EBF2FF] hover:text-[#0B3996] flex items-center justify-between"
                >
                  <span>Why Kerala</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button
                  onClick={() => handleNavClick(undefined, 'inclusions-section')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#EBF2FF] hover:text-[#0B3996] flex items-center justify-between"
                >
                  <span>Inclusions & Exclusions</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button
                  onClick={() => handleNavClick(undefined, 'reviews-section')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#EBF2FF] hover:text-[#0B3996] flex items-center justify-between"
                >
                  <span>Customer Reviews</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button
                  onClick={() => handleNavClick(undefined, 'faq-section')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#EBF2FF] hover:text-[#0B3996] flex items-center justify-between"
                >
                  <span>FAQs</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t space-y-2.5">
              <button
                onClick={() => handleNavClick(onQuoteClick)}
                className="w-full py-3 bg-[#FF4B00] hover:bg-[#e04200] text-white font-bold rounded-xl text-center shadow-xs"
              >
                Get Instant Quote
              </button>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-full py-2.5 bg-[#EBF2FF] text-[#0B3996] font-bold rounded-xl text-center flex items-center justify-center gap-2 border border-[#0B3996]/30"
              >
                <Phone className="w-4 h-4" />
                <span>Call {DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


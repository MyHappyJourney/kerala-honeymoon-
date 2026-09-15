import React from 'react';
import { PackageItem } from '../types';
import { Zap } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/tourData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PackageCardProps {
  pkg: PackageItem;
  onViewDetails: (pkg: PackageItem) => void;
  onGetQuote: (pkg: PackageItem) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onViewDetails, onGetQuote }) => {
  const whatsappMsg = encodeURIComponent(
    `Hi MyHappyJourney, I am interested in "${pkg.title}" (${pkg.durationBadge} - ₹${pkg.price.toLocaleString('en-IN')}/Adult). Please share full itinerary and best quote.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  const originalPriceFormatted = pkg.originalPrice
    ? `₹${pkg.originalPrice.toLocaleString('en-IN')}`
    : `₹${(pkg.price + 4000).toLocaleString('en-IN')}`;

  const totalTwoAdults = (pkg.priceForTwo ?? pkg.price * 2).toLocaleString('en-IN');

  return (
    <div
      className={`bg-white rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-300 shadow-sm hover:shadow-xl ${
        pkg.isPopular
          ? 'border-2 border-[#FF4B00] relative ring-2 ring-[#FF4B00]/15'
          : 'border border-gray-200'
      }`}
    >
      {/* Most Popular Choice Banner */}
      {pkg.isPopular && (
        <div className="bg-[#FF4B00] text-white text-xs sm:text-sm font-black uppercase tracking-wider text-center py-2 px-3 flex items-center justify-center gap-1.5">
          <span>★</span>
          <span>MOST POPULAR CHOICE</span>
        </div>
      )}

      {/* Card Image */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-gray-100 group">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Top-Right Speed Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-emerald-300 flex items-center gap-1.5 z-10">
          <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          <span>Get quote in 10 minutes</span>
        </div>

        {/* Bottom-Left Duration Badge */}
        <div className="absolute bottom-3 left-3 bg-[#0B3996] text-white text-xs font-black px-3.5 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
          {pkg.durationBadge}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3.5">
          {/* Package Title */}
          <h3 className="font-extrabold text-xl sm:text-2xl text-gray-900 tracking-tight leading-snug">
            {pkg.title}
          </h3>

          {/* Route Box */}
          <div className="bg-[#F6F7F8] p-3 rounded-xl border border-gray-100 flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800">
            <span className="text-base leading-none">📍</span>
            <span className="leading-snug">{pkg.route}</span>
          </div>

          {/* Bullet Highlights */}
          <div className="space-y-2 pt-1 text-xs sm:text-sm text-gray-700">
            {pkg.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold leading-tight">✓</span>
                <span className="leading-snug text-gray-700 font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Price Box & CTAs */}
        <div className="space-y-3 pt-2">
          {/* Starting Price Box */}
          <div className="bg-[#FEF9E7] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#F6E3A0] min-h-[110px] sm:min-h-[116px] flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="bg-[#F7E7BA] text-[#865108] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap">
                STARTING PRICE OF THIS PACKAGE
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-400 line-through shrink-0">
                {originalPriceFormatted}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 my-0.5">
              <div className="flex items-baseline shrink-0">
                <span className="text-[#FF4B00] font-black text-lg sm:text-xl leading-none">₹</span>
                <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none ml-0.5">
                  {pkg.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-semibold text-gray-600 ml-1">
                  / Adult
                </span>
              </div>

              <button
                onClick={() => onViewDetails(pkg)}
                className="text-[#0B3996] hover:text-[#082a74] font-bold text-xs sm:text-sm hover:underline cursor-pointer flex items-center gap-0.5 whitespace-nowrap"
                id={`view-itinerary-${pkg.id}`}
              >
                <span>View Itinerary</span>
                <span>→</span>
              </button>
            </div>

            <p className="text-xs font-bold text-emerald-800">
              Total ₹{totalTwoAdults} for 2 Adults
            </p>
          </div>

          {/* Action CTAs: WhatsApp (English) + Get Quote in 10 Min */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 px-2 bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none"
              id={`whatsapp-btn-${pkg.id}`}
            >
              <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
              <span className="whitespace-nowrap">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => onGetQuote(pkg)}
              className="w-full h-11 px-2 bg-[#FF4B00] hover:bg-[#e04200] active:scale-98 text-white font-black text-[11px] sm:text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer select-none"
              id={`get-quote-btn-${pkg.id}`}
            >
              <Zap className="w-3.5 h-3.5 fill-white text-white shrink-0" />
              <span className="whitespace-nowrap uppercase tracking-tight">GET QUOTE IN 10 MIN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


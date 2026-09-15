import React from 'react';
import { PackageItem } from '../types';
import {
  X,
  CheckCircle2,
  Shield,
  MapPin,
  ArrowRight,
  Star,
  Zap,
  Hotel,
  Car,
  Ship,
  Utensils,
  Clock,
  Heart,
  Gift,
  Sparkles
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/tourData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PackageModalProps {
  pkg: PackageItem | null;
  onClose: () => void;
  onGetQuote: (pkg: PackageItem) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({ pkg, onClose, onGetQuote }) => {
  if (!pkg) return null;

  const whatsappMsg = encodeURIComponent(
    `Hi MyHappyJourney, I want more details regarding the "${pkg.title}" (${pkg.durationBadge}). Please share the best quote and detailed itinerary.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  const totalTwoAdults = (pkg.priceForTwo ?? pkg.price * 2).toLocaleString('en-IN');

  const renderInclusionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />;
      case 'Gift':
        return <Gift className="w-4 h-4 text-amber-500" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-yellow-500" />;
      case 'Hotel':
        return <Hotel className="w-4 h-4 text-[#0B3996]" />;
      case 'Car':
        return <Car className="w-4 h-4 text-[#0B3996]" />;
      case 'Ship':
        return <Ship className="w-4 h-4 text-[#0B3996]" />;
      case 'Utensils':
      default:
        return <Utensils className="w-4 h-4 text-[#0B3996]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col border border-gray-100 animate-fade-in">
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 bg-gray-900 shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Rating & Speed badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{pkg.rating || 4.9}</span>
              <span className="text-gray-300 text-[10px]">({pkg.reviewsCount || '1.2k+'} reviews)</span>
            </span>
            <span className="bg-white/95 text-emerald-900 text-[11px] font-black px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600 animate-pulse" />
              <span>Get quote in 10 mins</span>
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="bg-[#0B3996] text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider mb-1.5 inline-block border border-blue-400/30">
              {pkg.durationBadge}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">{pkg.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Price Box */}
          <div className="bg-[#FEF9E7] p-4 rounded-2xl border border-[#F6E3A0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#F7E7BA] text-[#865108] text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                  STARTING PRICE OF THIS PACKAGE
                </span>
                {pkg.originalPrice && (
                  <span className="text-xs font-semibold text-gray-400 line-through">
                    ₹{pkg.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[#FF4B00] font-black text-xl leading-none">₹</span>
                <span className="text-2xl sm:text-3xl font-black text-gray-900 leading-none">
                  {pkg.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-600 ml-1">
                  / Adult
                </span>
              </div>
              <p className="text-xs font-bold text-emerald-800 mt-1">
                Total ₹{totalTwoAdults} for 2 Adults
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-emerald-200 shadow-2xs">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-extrabold text-emerald-800">
                10-Minute Response
              </span>
            </div>
          </div>

          {/* Route Night Split Breakdown */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FF4B00]" />
              <span>Itinerary Route & Night Stay Split:</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {pkg.nightSplit && pkg.nightSplit.length > 0 ? (
                pkg.nightSplit.map((stop, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-50 text-gray-800 border border-gray-200 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0B3996]" />
                    <span>
                      {stop.nights} Night{stop.nights > 1 ? 's' : ''} in {stop.name}
                    </span>
                  </span>
                ))
              ) : (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800">
                  {pkg.route}
                </div>
              )}
            </div>
          </div>

          {/* Inclusions Grid */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-2">Key Inclusions:</h4>
            <div className="grid grid-cols-2 gap-2 bg-[#F8FAFC] p-3 rounded-2xl border border-gray-100">
              {pkg.inclusions && pkg.inclusions.length > 0 ? (
                pkg.inclusions.map((inc, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <div className="p-1.5 rounded-lg bg-white shadow-2xs border border-gray-100">
                      {renderInclusionIcon(inc.icon)}
                    </div>
                    <span>{inc.label}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <Hotel className="w-4 h-4 text-[#0B3996]" />
                    <span>3★ / 4★ Hotel Accommodations</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <Car className="w-4 h-4 text-[#0B3996]" />
                    <span>Private AC Vehicle & Driver</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <Ship className="w-4 h-4 text-[#0B3996]" />
                    <span>Deluxe Private Houseboat Stay</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <Utensils className="w-4 h-4 text-[#0B3996]" />
                    <span>Daily Breakfast & Houseboat Meals</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-2">Package Highlights:</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              {pkg.highlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-xs text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-200 flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#0B3996] shrink-0" />
            <span>Fully customizable itinerary based on your flight/train schedule and preferences.</span>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white" />
            <span>WhatsApp Enquiry</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onGetQuote(pkg);
            }}
            className="w-full py-3 bg-[#FF4B00] hover:bg-[#e04200] text-white font-extrabold rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Get Quote in 10 Mins</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};


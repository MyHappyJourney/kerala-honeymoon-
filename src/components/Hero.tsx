import React, { useState, useEffect } from 'react';
import { LeadFormData } from '../types';
import { submitLead } from '../services/leadService';
import {
  CheckCircle2,
  Shield,
  MapPin,
  Sparkles,
  User,
  Phone,
  Mail,
  Calendar,
  Users,
  DollarSign,
  Send,
  ExternalLink,
  Zap,
  Clock,
  Car,
  Hotel,
  Utensils,
  Star,
  Heart
} from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MSG, PACKAGES } from '../data/tourData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Loader } from './Loader';

interface HeroProps {
  onQuoteClick?: () => void;
  preselectedPackageId?: string;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, preselectedPackageId }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    city: '',
    travelDate: '',
    adults: 2,
    children: 0,
    budget: '',
    packagePreference: preselectedPackageId || 'pkg-6n7d'
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [leadId, setLeadId] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Update package preference if prop changes
  useEffect(() => {
    if (preselectedPackageId) {
      setFormData(prev => ({ ...prev, packagePreference: preselectedPackageId }));
    }
  }, [preselectedPackageId]);

  // Auto redirect after submission
  useEffect(() => {
    let timer: any;
    if (submitted) {
      setCountdown(5);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = 'https://www.myhappyjourney.com/holidays/kerala';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter your full name');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (!formData.city || formData.city.trim().length < 2) {
      setErrorMessage('Please enter your departure city (e.g. Bangalore, Mumbai)');
      return;
    }

    if (!formData.travelDate) {
      setErrorMessage('Please select your preferred travel date');
      return;
    }

    setLoading(true);
    const result = await submitLead(formData);
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setLeadId(result.leadId);
    } else {
      setErrorMessage(result.message);
    }
  };

  const selectedPkg = PACKAGES.find(p => p.id === formData.packagePreference) || PACKAGES[2];

  const whatsappMsg = encodeURIComponent(
    `Hi MyHappyJourney, I am interested in a customized Kerala Tour Package. Name: ${formData.name || 'Traveler'}, Package: ${selectedPkg.title} (${selectedPkg.durationBadge}), Travel Date: ${formData.travelDate || 'Upcoming'}, Guests: ${formData.adults} Adults. Please share best quote & itinerary.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <section id="hero-section" className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Hero Image with 100% clarity */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://hczb7fxersozfdoh.public.blob.vercel-storage.com/hero%20image.avif"
          alt="Kerala Houseboat Backwaters Alleppey"
          className="w-full h-full object-cover object-center opacity-100"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2560&q=95";
          }}
        />
        {/* Subtle lateral gradient scrim to maintain readability of text without washing out or darkening the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Heading & Route Details & Inclusions Summary */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left lg:pt-2">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0B3996]/90 backdrop-blur-md text-white text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-full border border-blue-400/30 shadow-md">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
              <span>SPECIAL HONEYMOON DEALS & FREE ROMANTIC PERKS!!</span>
            </div>

            {/* Main Title */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Honeymoon Kerala <br />
                <span className="text-amber-300">Tour Packages For you</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mt-2 font-medium">
                Celebrate your beginning amidst misty tea plantations, romantic private houseboats on calm backwaters, candlelit dinners, and handpicked luxury resorts designed exclusively for couples.
              </p>
            </div>

            {/* Itinerary Route Pills */}
            <div className="pt-1">
              <p className="text-xs text-gray-300 font-bold mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Romantic Couple Destinations:</span>
              </p>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl text-gray-100 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>2N Munnar (Misty Hills)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl text-gray-100 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>1N Thekkady (Spice Valley)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl text-gray-100 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>1N Alleppey (Private Houseboat)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl text-gray-100 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>2N Kovalam (Sunset Beaches)</span>
                </div>
              </div>
            </div>

            {/* Key Inclusions Card */}
            <div className="bg-black/45 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 text-gray-100 space-y-2.5 shadow-xl">
              <p className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Special Honeymoon Inclusions:</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-[#FF4B00] shrink-0" />
                  <span>Romantic 4★ Resort / Private Cottage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#FF4B00] shrink-0" />
                  <span>Private AC Sedan & Dedicated Chauffeur</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#FF4B00] shrink-0" />
                  <span>Candlelight Dinner & Honeymoon Cake</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF4B00] shrink-0" />
                  <span>Private Houseboat & Flower Bed Décor</span>
                </div>
              </div>
            </div>

            {/* Platform Ratings & Review Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 pt-1 max-w-xl">
              {/* Card 1: Google */}
              <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1.5 flex items-center gap-2 shadow-md hover:border-white/40 transition-all">
                <div className="flex -space-x-2 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80"
                    alt="Reviewer"
                    className="w-5.5 h-5.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ring-1.5 ring-white/90 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                    alt="Reviewer"
                    className="w-5.5 h-5.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ring-1.5 ring-white/90 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                    alt="Reviewer"
                    className="w-5.5 h-5.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ring-1.5 ring-white/90 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 pr-0.5">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-white font-black text-xs md:text-sm leading-none">4.9</span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] md:text-[10.5px] text-gray-300 font-medium tracking-tight mt-0.5 whitespace-nowrap leading-none">
                    2,100+ · Google
                  </p>
                </div>
              </div>

              {/* Card 2: TripAdvisor */}
              <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1.5 flex items-center gap-2 shadow-md hover:border-white/40 transition-all">
                <div className="flex -space-x-2 shrink-0">
                  <div className="w-5.5 h-5.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ring-1.5 ring-white/90 bg-[#7B52BA] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    A
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80"
                    alt="Reviewer"
                    className="w-5.5 h-5.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ring-1.5 ring-white/90 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80"
                    alt="Reviewer"
                    className="w-5.5 h-5.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ring-1.5 ring-white/90 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 pr-0.5">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-white font-black text-xs md:text-sm leading-none">4.8</span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] md:text-[10.5px] text-gray-300 font-medium tracking-tight mt-0.5 whitespace-nowrap leading-none">
                    1,800+ · TripAdvisor
                  </p>
                </div>
              </div>

              {/* Card 3: Facebook */}
              <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1.5 flex items-center gap-2 shadow-md hover:border-white/40 transition-all">
                <div className="flex -space-x-2 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80"
                    alt="Reviewer"
                    className="w-5.5 h-5.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ring-1.5 ring-white/90 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&h=80&q=80"
                    alt="Reviewer"
                    className="w-5.5 h-5.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ring-1.5 ring-white/90 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="w-5.5 h-5.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ring-1.5 ring-white/90 bg-[#FAD2E1] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" stroke="#E11D48" />
                      <circle cx="12" cy="12" r="4" stroke="#0D9488" />
                      <path d="M12 3v18M3 12h18" stroke="#F59E0B" strokeWidth="1.2" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 pr-0.5">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-white font-black text-xs md:text-sm leading-none">5.0</span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] md:text-[10.5px] text-gray-300 font-medium tracking-tight mt-0.5 whitespace-nowrap leading-none">
                    1,100+ · Facebook
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Interactive "Get Your Free Quote" Form */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white text-gray-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-gray-100 relative overflow-hidden">
              
              {/* Loading State with Uiverse Loader */}
              {loading && (
                <div className="absolute inset-0 z-40 bg-[#071739]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                  <Loader
                    title="Submitting your quote request..."
                    subtitle="Hold on while we connect you with our Kerala destination expert"
                  />
                </div>
              )}

              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-[#0B3996] text-white text-[10px] sm:text-xs font-black px-3.5 py-1 rounded-bl-2xl uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300 animate-pulse" />
                <span>10-MIN QUOTE</span>
              </div>

              {submitted ? (
                /* Success View */
                <div className="text-center py-6 sm:py-8 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 bg-[#EBF2FF] text-[#0B3996] rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="bg-[#EBF2FF] text-[#0B3996] font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      ENQUIRY RECEIVED
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                      Thank you, {formData.name}! 🎉
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-1 max-w-sm mx-auto">
                      Our Kerala travel expert will contact you within 30 minutes with a customized itinerary & best price quote!
                    </p>
                    {leadId && (
                      <p className="text-xs text-gray-400 font-mono mt-2">
                        Reference Lead ID: <span className="font-bold text-gray-700">{leadId}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 max-w-sm mx-auto space-y-3">
                    <div className="bg-[#EBF2FF] border border-[#0B3996]/20 rounded-xl p-3 text-xs text-[#0B3996] font-medium space-y-1 text-center">
                      <p className="font-bold text-xs sm:text-sm">
                        ⌛ Redirecting to MyHappyJourney in <span className="text-base font-extrabold text-[#FF4B00]">{countdown}s</span>...
                      </p>
                      <p className="text-[11px] text-gray-600">You will be automatically redirected to www.myhappyjourney.com</p>
                    </div>

                    <a
                      href="https://www.myhappyjourney.com/holidays/kerala"
                      className="w-full h-11 bg-[#0B3996] hover:bg-[#082b75] text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-xs sm:text-sm"
                    >
                      <span>Go to MyHappyJourney Now</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-11 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-xs sm:text-sm"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>WhatsApp Us Now for Instant Reply</span>
                    </a>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          travelDate: '',
                          adults: 2,
                          children: 0,
                          budget: '',
                          packagePreference: 'pkg-6n7d'
                        });
                      }}
                      className="text-xs text-gray-500 font-semibold underline hover:text-gray-800 cursor-pointer pt-1"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form View */
                <div>
                  {/* Form Header */}
                  <div className="text-center max-w-xl mx-auto mb-4">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
                      Get Your Free Quote
                    </h2>
                    <p className="text-xs text-gray-600 mt-1 font-semibold">
                      Fill in your details and we will call you within 30 minutes!
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-3.5 p-2.5 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200 text-center">
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                    
                    {/* Row 1: Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Your Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full pl-9 pr-3 h-11 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                          />
                        </div>
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="10-digit Mobile No."
                            maxLength={13}
                            className="w-full pl-9 pr-3 h-11 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Email & Departure City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Email Address */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            required
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. rahul@example.com"
                            className="w-full pl-9 pr-3 h-11 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                          />
                        </div>
                      </div>

                      {/* Departure City */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Departure City <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            value={formData.city || ''}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="e.g. Bangalore, Mumbai"
                            className="w-full pl-9 pr-3 h-11 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Travel Date & Interested Duration */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Travel Date */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Travel Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <input
                            type="date"
                            required
                            value={formData.travelDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                            className="w-full pl-9 pr-3 h-11 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                          />
                        </div>
                      </div>

                      {/* Package Preference Select */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Interested Duration
                        </label>
                        <select
                          value={formData.packagePreference}
                          onChange={(e) => setFormData({ ...formData, packagePreference: e.target.value })}
                          className="w-full px-3 h-11 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                        >
                          {PACKAGES.map((pkg) => (
                            <option key={pkg.id} value={pkg.id}>
                              {pkg.durationBadge} ({pkg.title}) - GET QUOTE IN 10 MINS
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Adults & Children Counter */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Adults Counter */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider">
                            Adults (12+ Yrs)
                          </label>
                          <span className="text-[10px] font-bold text-[#FF4B00] bg-orange-50 px-1.5 py-0.2 rounded border border-orange-200">
                            Min 2
                          </span>
                        </div>
                        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-xl h-11 px-3 justify-between">
                          <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-gray-400" />
                            Adults
                          </span>
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              disabled={formData.adults <= 2}
                              onClick={() => setFormData({ ...formData, adults: Math.max(2, formData.adults - 1) })}
                              className={`w-7 h-7 rounded-lg font-black text-sm flex items-center justify-center transition-colors ${
                                formData.adults <= 2
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                              }`}
                              title={formData.adults <= 2 ? "Minimum 2 adults required for tour packages" : "Decrease adults"}
                            >
                              -
                            </button>
                            <span className="font-bold text-sm text-gray-900 w-4 text-center">
                              {formData.adults}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                              className="w-7 h-7 rounded-lg bg-gray-200 text-gray-800 font-black text-sm flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Children Counter */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Children (&lt;12 Yrs)
                        </label>
                        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-xl h-11 px-3 justify-between">
                          <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-gray-400" />
                            Children
                          </span>
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                              className="w-7 h-7 rounded-lg bg-gray-200 text-gray-800 font-black text-sm flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-bold text-sm text-gray-900 w-4 text-center">
                              {formData.children}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                              className="w-7 h-7 rounded-lg bg-gray-200 text-gray-800 font-black text-sm flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 5: Budget Preference */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                        Budget Preference <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full pl-9 pr-3 h-11 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                        >
                          <option value="">Select Budget (Optional)</option>
                          <option value="Standard Economy">Standard Economy</option>
                          <option value="Deluxe 3-Star">Deluxe 3-Star</option>
                          <option value="Premium 4-Star">Premium 4-Star</option>
                          <option value="Luxury 5-Star">Luxury 5-Star / Treehouse</option>
                        </select>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 space-y-2.5">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-[#FF4B00] hover:bg-[#e04200] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 focus:outline-none"
                        id="hero-submit-quote-btn"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting Request...</span>
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>GET QUOTE IN 10 MINS</span>
                          </>
                        )}
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-10.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-md"
                        id="hero-whatsapp-btn"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-white" />
                        <span>WHATSAPP US NOW</span>
                      </a>
                    </div>

                    {/* Trust Subtext */}
                    <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-gray-500 pt-1">
                      <Shield className="w-3.5 h-3.5 text-[#0B3996]" />
                      <span>100% Secure • We respect your privacy. Zero spam guarantee.</span>
                    </div>

                  </form>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


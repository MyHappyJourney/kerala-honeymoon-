import React, { useState, useEffect } from 'react';
import { LeadFormData } from '../types';
import { submitLead } from '../services/leadService';
import { Shield, Send, CheckCircle2, MessageSquare, Calendar, Users, Phone, User, DollarSign, Mail, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER, PACKAGES } from '../data/tourData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Loader } from './Loader';

interface QuoteFormProps {
  preselectedPackageId?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ preselectedPackageId }) => {
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

    // Strict Validation
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

  const whatsappMsg = encodeURIComponent(
    `Hi MyHappyJourney, I submitted a quote request for Kerala Tour Package. Name: ${formData.name}, Travel Date: ${formData.travelDate}, Adults: ${formData.adults}. Please confirm.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <section id="quote-section" className="py-12 sm:py-16 bg-[#EBF2FF] border-t border-b border-[#0B3996]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-[#0B3996]/20 relative overflow-hidden">
          
          {/* Loading Overlay with Uiverse Loader */}
          {loading && (
            <div className="absolute inset-0 z-40 bg-[#071739]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in rounded-3xl">
              <Loader
                title="Submitting your quote request..."
                subtitle="Hold on while we connect you with our Kerala destination expert"
              />
            </div>
          )}
          
          {submitted ? (
            /* Success View */
            <div className="text-center py-8 space-y-5 animate-fade-in">
              <div className="w-16 h-16 bg-[#EBF2FF] text-[#0B3996] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="bg-[#EBF2FF] text-[#0B3996] font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  ENQUIRY RECEIVED
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                  Thank you! 🎉
                </h3>
                <p className="text-sm sm:text-base font-semibold text-gray-700 mt-1 max-w-md mx-auto">
                  Our Kerala travel expert will contact you within 30 minutes with a customized itinerary & price quote!
                </p>
                {leadId && (
                  <p className="text-xs text-gray-400 font-mono mt-2">
                    Reference Lead ID: <span className="font-bold text-gray-600">{leadId}</span>
                  </p>
                )}
              </div>

              <div className="pt-2 max-w-sm mx-auto space-y-3">
                <div className="bg-[#EBF2FF] border border-[#0B3996]/20 rounded-xl p-3 text-xs text-[#0B3996] font-medium space-y-1 text-center">
                  <p className="font-bold text-xs sm:text-sm">
                    ⌛ Redirecting to MyHappyJourney in <span className="text-base font-extrabold text-[#FF4B00]">{countdown}s</span>...
                  </p>
                  <p className="text-[11px] text-gray-600">You will be automatically redirected to www.myhappyjourney.com/holidays/kerala</p>
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
                  className="text-xs text-gray-500 font-semibold underline hover:text-gray-800"
                >
                  Submit another enquiry
                </button>
              </div>
            </div>
          ) : (
            /* Lead Form View */
            <div>
              <div className="text-center max-w-2xl mx-auto mb-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                  Get Your Free Quote
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1.5">
                  Just fill in your details and we will call you within 30 minutes!
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6 p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200 text-center">
                  ⚠️ {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {/* Row 1: Name, Phone, Email & Departure City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-10 pr-4 h-12 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit Mobile No."
                        maxLength={13}
                        className="w-full pl-10 pr-4 h-12 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className="w-full pl-10 pr-4 h-12 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* Departure City */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                      Departure City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.city || ''}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Bangalore, Mumbai"
                        className="w-full pl-10 pr-4 h-12 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Travel Date & Package Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Travel Date */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                      Travel Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="date"
                        required
                        value={formData.travelDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full pl-10 pr-4 h-12 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* Package Preference Select */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                      Interested Duration
                    </label>
                    <select
                      value={formData.packagePreference}
                      onChange={(e) => setFormData({ ...formData, packagePreference: e.target.value })}
                      className="w-full px-4 h-12 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                    >
                      {PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.durationBadge} ({pkg.title}) - GET QUOTE IN 10 MINS
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Adults & Children Counter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Adults Counter */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                        No. of Adults (12+ Yrs)
                      </label>
                      <span className="text-[10px] font-bold text-[#FF4B00] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                        Min 2 Adults
                      </span>
                    </div>
                    <div className="flex items-center bg-gray-50 border border-gray-300 rounded-xl h-12 px-3 justify-between">
                      <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-gray-400" />
                        Adults
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={formData.adults <= 2}
                          onClick={() => setFormData({ ...formData, adults: Math.max(2, formData.adults - 1) })}
                          className={`w-8 h-8 rounded-lg font-black text-base flex items-center justify-center transition-colors ${
                            formData.adults <= 2
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                          title={formData.adults <= 2 ? "Minimum 2 adults required for tour packages" : "Decrease adults"}
                        >
                          -
                        </button>
                        <span className="font-bold text-base text-gray-900 w-5 text-center">
                          {formData.adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                          className="w-8 h-8 rounded-lg bg-gray-200 text-gray-800 font-black text-base flex items-center justify-center hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Children Counter */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                      No. of Children (Below 12 Yrs)
                    </label>
                    <div className="flex items-center bg-gray-50 border border-gray-300 rounded-xl h-12 px-3 justify-between">
                      <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-gray-400" />
                        Children
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                          className="w-8 h-8 rounded-lg bg-gray-200 text-gray-800 font-black text-base flex items-center justify-center hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="font-bold text-base text-gray-900 w-5 text-center">
                          {formData.children}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                          className="w-8 h-8 rounded-lg bg-gray-200 text-gray-800 font-black text-base flex items-center justify-center hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional Budget Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                    Your Budget Preference <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full pl-10 pr-4 h-12 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                    >
                      <option value="">Select Budget Preference (Optional)</option>
                      <option value="Standard Economy">Standard Economy</option>
                      <option value="Deluxe 3-Star">Deluxe 3-Star</option>
                      <option value="Premium 4-Star">Premium 4-Star</option>
                      <option value="Luxury 5-Star">Luxury 5-Star / Treehouse</option>
                    </select>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-13 sm:h-14 bg-[#FF4B00] hover:bg-[#e04200] text-white font-extrabold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 focus:outline-none"
                    id="submit-quote-btn"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Request...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>GET QUOTE IN 10 MINS</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Trust Seal */}
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-500 pt-1">
                  <Shield className="w-4 h-4 text-[#0B3996]" />
                  <span>100% Secure • Your information is safe with us. Zero spam guarantee.</span>
                </div>

              </form>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

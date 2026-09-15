import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { PackageSection } from './components/PackageSection';
import ScrollExpand from './components/ScrollExpand';
import ClickSpark from './components/ClickSpark';
import { PackageModal } from './components/PackageModal';
import { QuoteModal } from './components/QuoteModal';
import { Itinerary } from './components/Itinerary';
import { InclusionsExclusions } from './components/InclusionsExclusions';
import { WhyBook } from './components/WhyBook';
import { ReadyToExploreBanner } from './components/ReadyToExploreBanner';
import { Reviews } from './components/Reviews';
import { ExperienceCarousel } from './components/ExperienceCarousel';
import { FAQ } from './components/FAQ';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { Footer } from './components/Footer';
import { PackageItem } from './types';
import { Loader } from './components/Loader';

export default function App() {
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<PackageItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quotePackageId, setQuotePackageId] = useState<string>('pkg-6n7d');
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  // Initial page load smooth transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  // Auto pop the lead form modal after exactly 30 seconds of page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsQuoteModalOpen(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const openQuoteModal = (pkgId?: string) => {
    if (pkgId) {
      setQuotePackageId(pkgId);
    }
    // Close package details modal if open
    setSelectedPackageForModal(null);
    setIsQuoteModalOpen(true);
  };

  return (
    <ClickSpark
      sparkColor="#FF4B00"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-[#EBF2FF] selection:text-[#0B3996] pb-[72px] md:pb-0">
        
        {/* Initial Page Preloader with Uiverse Loader */}
        {isInitialLoading && (
          <div className="fixed inset-0 z-[100] bg-[#071739] flex flex-col items-center justify-center transition-opacity duration-500">
            <Loader
              title="Loading Kerala Tour Packages..."
              subtitle="MyHappyJourney • Since 2007"
            />
          </div>
        )}

        {/* 1. Header */}
        <Header
          onQuoteClick={() => openQuoteModal()}
          onPackageSelect={(pkgId) => openQuoteModal(pkgId)}
        />

        <main>
          {/* 2. Hero Section */}
          <Hero
            onQuoteClick={() => openQuoteModal()}
            preselectedPackageId={quotePackageId}
          />

          {/* 3. Trust Strip */}
          <TrustStrip />

          {/* ScrollExpand Section (Window Scroll) */}
          <section className="relative w-full bg-[#05070f] border-y border-white/10">
            <ScrollExpand
              src="/hero.jpg"
              alt="Experience Kerala"
              title="Experience Kerala"
              scrollHint="Scroll down to expand"
              mediaZoom={1.35}
              startWidth={42}
              startHeight={58}
              startRadius={24}
              endRadius={0}
              scrollDistance={1.2}
              holdDistance={0.35}
              smoothing={0.1}
              overlayScrim={0.45}
              useWindowScroll={true}
              enabled={true}
            >
              <h2>Experience Kerala, exactly your way</h2>
              <p>Select your dates to build a custom itinerary and book trusted local stays instantly.</p>
            </ScrollExpand>
          </section>

          {/* 4. Choose Your Kerala Tour (Package Cards & Carousel) */}
          <PackageSection
            onViewDetails={(pkg) => setSelectedPackageForModal(pkg)}
            onGetQuote={(pkg) => openQuoteModal(pkg.id)}
          />

          {/* 5. Tour Itinerary (6N / 7D) */}
          <Itinerary />

          {/* 6. Loved By 5000+ Happy Travellers (Customer Reviews) */}
          <Reviews />

          {/* 7. Package Inclusions & Exclusions */}
          <InclusionsExclusions />

          {/* 8. Why Book With MyHappyJourney */}
          <WhyBook />

          {/* Ready to Explore Kerala Flash Sale Parallax Banner */}
          <ReadyToExploreBanner onQuoteClick={() => openQuoteModal()} />

          {/* 9. Real Travel Experiences Automatic Carousel */}
          <ExperienceCarousel onQuoteClick={() => openQuoteModal()} />

          {/* 10. Frequently Asked Questions (FAQs) */}
          <FAQ />
        </main>

        {/* 12. Footer */}
        <Footer onQuoteClick={() => openQuoteModal()} />

        {/* 13. Fixed Bottom Mobile CTA Bar */}
        <StickyMobileCTA onQuoteClick={() => openQuoteModal()} />

        {/* Package Details Modal */}
        <PackageModal
          pkg={selectedPackageForModal}
          onClose={() => setSelectedPackageForModal(null)}
          onGetQuote={(pkg) => openQuoteModal(pkg.id)}
        />

        {/* Quote Request Modal Pop-up */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          preselectedPackageId={quotePackageId}
        />

      </div>
    </ClickSpark>
  );
}

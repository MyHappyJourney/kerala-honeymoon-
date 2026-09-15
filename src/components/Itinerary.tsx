import React from 'react';
import { Compass, Mountain, Leaf, Camera, Shield, Landmark } from 'lucide-react';

interface ReasonItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const REASONS: ReasonItem[] = [
  {
    icon: Compass,
    title: "Alleppey Backwaters",
    description:
      "Cruise through Kerala's iconic palm-fringed canals on a traditional houseboat. Wake up to misty mornings, spot kingfishers, and dine on freshly cooked Kerala cuisine — all on water."
  },
  {
    icon: Mountain,
    title: "Munnar Tea Hills",
    description:
      "Endless carpets of emerald tea plantations, cool misty mornings, and panoramic mountain views. Munnar at 1,600m is Kerala's most romantic hill station and a photographer's paradise."
  },
  {
    icon: Leaf,
    title: "Periyar Wildlife",
    description:
      "Thekkady's Periyar Wildlife Sanctuary is home to wild elephants, tigers, and bison. Bamboo rafting on Periyar Lake and spice plantation walks make it an unforgettable adventure."
  },
  {
    icon: Camera,
    title: "Kovalam & Varkala Beaches",
    description:
      "Golden crescents of sand, dramatic cliff-top views, and Ayurvedic massage huts by the sea. Kovalam's lighthouse beach and Varkala's red cliffs are Kerala's coastal jewels."
  },
  {
    icon: Shield,
    title: "Ayurveda Heritage",
    description:
      "Kerala is the birthplace of Ayurveda. From rejuvenating massages to multi-day Panchakarma programs, authentic Ayurvedic treatments here are a 5,000-year-old tradition."
  },
  {
    icon: Landmark,
    title: "Fort Kochi Culture",
    description:
      "Walk through centuries of history — Chinese fishing nets, Dutch palaces, Jewish synagogues, and Portuguese churches. Fort Kochi is a living museum of Kerala's cosmopolitan past."
  }
];

export const WhyKerala: React.FC = () => {
  return (
    <section id="itinerary-section" className="py-12 sm:py-16 lg:py-20 bg-[#F6F7F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[#0B3996] font-bold text-xs sm:text-sm uppercase tracking-[0.2em] inline-block">
            WHY KERALA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
            6 Reasons Kerala Will Enchant You
          </h2>
          {/* Orange Accent Pill Bar */}
          <div className="w-14 h-1.5 bg-[#FF7A00] rounded-full mx-auto mt-3.5" />
        </div>

        {/* 6 Reasons Cards Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {REASONS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-start"
              >
                {/* Icon Container with Amber/Orange tint */}
                <div className="w-12 h-12 rounded-2xl bg-amber-50/90 border border-amber-100 flex items-center justify-center text-amber-500 mb-6 shrink-0">
                  <IconComponent className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 tracking-tight">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// Export as Itinerary as well for backwards compatibility
export const Itinerary = WhyKerala;

export interface PackageItem {
  id: string;
  title: string;
  durationBadge: string;
  nights: number;
  days: number;
  route: string;
  locations: string[];
  price: number;
  priceForTwo?: number;
  originalPrice?: number;
  isPopular?: boolean;
  tag?: string;
  rating?: number;
  reviewsCount?: number;
  nightSplit?: { name: string; nights: number }[];
  image: string;
  highlights: string[];
  inclusions?: { icon: string; label: string }[];
  honeymoonInclusions?: string[];
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  route: string;
  image: string;
  highlights: string[];
  description?: string;
  stayLocation?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date?: string;
  avatar?: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  travelDate: string;
  adults: number;
  children: number;
  budget?: string;
  packagePreference?: string;
  notes?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TrustItem {
  iconName: string;
  title: string;
  subtitle: string;
}

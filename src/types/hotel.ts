export type PageType = 
  | 'home'
  | 'rooms'
  | 'dining'
  | 'amenities'
  | 'experiences'
  | 'offers'
  | 'gallery'
  | 'location'
  | 'contact'
  | 'booking';

export interface Room {
  id: string;
  name: string;
  category: 'deluxe' | 'suite' | 'penthouse';
  headline: string;
  description: string;
  sizeSqm: number;
  sizeSqft: number;
  capacity: number;
  bedType: string;
  view: string;
  basePrice: number;
  featured: boolean;
  images: string[];
  amenities: string[];
  features: string[];
  policies: string[];
}

export interface DiningVenue {
  id: string;
  name: string;
  tagline: string;
  description: string;
  cuisine: string;
  hours: string;
  dressCode: string;
  image: string;
  menuHighlights: { name: string; description: string; price: string }[];
}

export interface Amenity {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  hours: string;
  image: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  pricePerGuest: number;
  inclusions: string[];
  image: string;
}

export interface SpecialOffer {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  discountPercentage?: number;
  inclusions: string[];
  validity: string;
  terms: string;
  image: string;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  location: string;
  stayType: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'policies' | 'services' | 'logistics';
}

export interface BookingAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  perNight: boolean;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomsCount: number;
  selectedRoomId: string | null;
  selectedAddons: string[];
  promoCode?: string;
  guest: {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests: string;
    estimatedArrivalTime: string;
  };
}

export interface ConfirmedBooking {
  bookingReference: string;
  createdAt: string;
  bookingDetails: BookingState;
  room: Room;
  nights: number;
  subtotal: number;
  addonsTotal: number;
  taxAmount: number;
  serviceCharge: number;
  totalAmount: number;
}

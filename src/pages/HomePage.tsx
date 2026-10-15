import React, { useState } from 'react';
import { PageType, Room, DiningVenue } from '../types/hotel';
import {
  HOTEL_INFO,
  HOTEL_IMAGES,
  ROOMS_DATA,
  AMENITIES_DATA,
  DINING_VENUES,
  OFFERS_DATA,
  TESTIMONIALS_DATA,
  GALLERY_ITEMS,
} from '../data/hotelData';
import { FloatingBookingBar } from '../components/FloatingBookingBar';
import { RoomCard } from '../components/RoomCard';
import { RoomDetailModal } from '../components/RoomDetailModal';
import { DiningReservationModal } from '../components/DiningReservationModal';
import { MenuModal } from '../components/MenuModal';
import { GalleryLightbox } from '../components/GalleryLightbox';
import {
  Wifi,
  Waves,
  Dumbbell,
  Sparkles,
  Utensils,
  Bell,
  Car,
  Clock,
  Plane,
  Briefcase,
  Star,
  ArrowRight,
  MapPin,
  Calendar,
  Compass,
  CheckCircle,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (roomId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeReservationVenue, setActiveReservationVenue] = useState<DiningVenue | null>(null);
  const [activeMenuVenue, setActiveMenuVenue] = useState<DiningVenue | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const featuredRooms = ROOMS_DATA.filter((r) => r.featured);
  const previewGallery = GALLERY_ITEMS.slice(0, 6);

  const handleBookingSearch = () => {
    onOpenBooking();
  };

  const amenitiesIconMap: Record<string, React.ReactNode> = {
    'Free Wi-Fi': <Wifi className="w-5 h-5 text-[#B89B5E]" />,
    'Hydrotherapy Pool': <Waves className="w-5 h-5 text-[#B89B5E]" />,
    'Fitness Studio': <Dumbbell className="w-5 h-5 text-[#B89B5E]" />,
    'Imperial Spa': <Sparkles className="w-5 h-5 text-[#B89B5E]" />,
    'Fine Dining': <Utensils className="w-5 h-5 text-[#B89B5E]" />,
    '24/7 Room Service': <Bell className="w-5 h-5 text-[#B89B5E]" />,
    'Valet & Chauffeur': <Car className="w-5 h-5 text-[#B89B5E]" />,
    '24-Hour Reception': <Clock className="w-5 h-5 text-[#B89B5E]" />,
    'Airport Transfers': <Plane className="w-5 h-5 text-[#B89B5E]" />,
    'Conference Salons': <Briefcase className="w-5 h-5 text-[#B89B5E]" />,
  };

  const amenitiesList = [
    { name: 'Free Wi-Fi', desc: 'Symmetric 1Gbps fiber Wi-Fi throughout all rooms and pool terraces.' },
    { name: 'Hydrotherapy Pool', desc: 'Heated indoor mineral water pool with submerged daybeds.' },
    { name: 'Fitness Studio', desc: 'Technogym Artis performance collection with private trainers.' },
    { name: 'Imperial Spa', desc: 'Finnish saunas, steam hammams, and Swiss biological facial rituals.' },
    { name: 'Fine Dining', desc: 'Seasonal Mediterranean cuisine under Executive Chef Julian Laurent.' },
    { name: '24/7 Room Service', desc: 'Bespoke in-suite dining delivered at any hour of day or night.' },
    { name: 'Valet & Chauffeur', desc: 'Dedicated Mercedes Maybach and S-Class fleet with EV fast charging.' },
    { name: '24-Hour Reception', desc: 'Clefs d’Or international concierge and white-glove luggage service.' },
    { name: 'Airport Transfers', desc: 'Private terminal pickups and white-glove luggage arrival assistance.' },
    { name: 'Conference Salons', desc: 'Acoustically isolated boardrooms with discreet 4K conferencing.' },
  ];

  return (
    <div className="bg-[#F7F3EA] text-[#20252B]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#101C2C]">
        {/* Full-width Background Image with measured dark contrast scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={HOTEL_IMAGES.heroFacade}
            alt="The Aurelia Hotel & Residences Facade at Twilight"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101C2C] via-[#101C2C]/50 to-[#101C2C]/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 flex-1 flex flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#B89B5E]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold">
                Luxury Hotel & Residences
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium text-white tracking-tight leading-[1.08] text-balance">
              A Sanctuary of Timeless Elegance & Refined Hospitality
            </h1>

            <p className="text-sm sm:text-base text-[#E8E0D3]/90 leading-relaxed font-normal max-w-xl">
              Immerse yourself in panoramic coastal vistas, Michelin-caliber gastronomy, and bespoke residential comfort along the Riviera coastline.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="bg-[#B89B5E] hover:bg-[#A3864A] text-white text-xs font-semibold uppercase tracking-[0.18em] px-8 py-4 transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Book Your Stay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('rooms')}
                className="border border-white/40 hover:border-white text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-[0.18em] px-8 py-4 transition-colors"
              >
                Explore Suites
              </button>
            </div>
          </div>
        </div>

        {/* Floating Booking Panel anchored to the base of the Hero */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-10 w-full">
          <FloatingBookingBar onSearch={handleBookingSearch} />
        </div>
      </section>

      {/* Spacer to accommodate floating bar */}
      <div className="h-16 lg:h-20" />

      {/* 2. EDITORIAL INTRODUCTION */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
              An Ode to Coastal Serenity
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#101C2C] leading-tight text-balance">
              Where Architectural Purity Meets Intuitive Hospitality
            </h2>
            <p className="text-sm sm:text-base text-[#20252B]/80 leading-relaxed">
              Conceived as a secluded coastal enclave, The Aurelia merges understated neoclassical grandeur with modern California naturalism. Here, every space is sculpted with natural travertine, fluted oak millwork, and expansive glass portals that frame the shifting colors of the sea.
            </p>
            <p className="text-xs sm:text-sm text-[#20252B]/70 leading-relaxed">
              Whether savoring an unhurried morning on your private terrace, unwinding in the thermal waters of the Imperial Spa, or embarking on an exclusive sunset yacht cruise, your stay is choreographed with effortless discretion.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('amenities')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#101C2C] hover:text-[#B89B5E] border-b border-[#101C2C] pb-1 hover:border-[#B89B5E] transition-all"
              >
                <span>Discover Our Heritage & Amenities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 overflow-hidden border border-[#E8E0D3] shadow-xl">
              <img
                src={HOTEL_IMAGES.suiteOceanView}
                alt="The Aurelia Ocean Suite Salon"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Subtle inset accreditation card */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-[#E8E0D3] p-5 shadow-lg max-w-xs hidden sm:block">
              <div className="flex items-center gap-1 text-[#B89B5E] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#B89B5E]" />
                ))}
              </div>
              <p className="text-xs font-serif font-semibold text-[#101C2C]">
                "A Masterpiece of Coastal Luxury"
              </p>
              <p className="text-[11px] text-[#20252B]/60 mt-0.5">
                The International Architectural Hospitality Digest
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ROOMS & SUITES */}
      <section className="py-20 bg-white border-y border-[#E8E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
                Accommodations
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#101C2C] mt-1">
                Featured Residences & Suites
              </h2>
              <p className="text-xs sm:text-sm text-[#20252B]/70 mt-1 max-w-lg">
                Crafted with Italian linens, marble rainwater baths, and sweeping horizons designed for restorative rest.
              </p>
            </div>

            <button
              onClick={() => onNavigate('rooms')}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#101C2C] hover:text-[#B89B5E] transition-colors flex items-center gap-2 shrink-0"
            >
              <span>View All 4 Suites</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onViewDetails={(r) => setSelectedRoom(r)}
                onBookNow={(r) => onOpenBooking(r.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE HOTEL AMENITIES */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
            Exclusive Amenities
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#101C2C] mt-1">
            Intuitive Comforts & Wellness
          </h2>
          <p className="text-xs sm:text-sm text-[#20252B]/70 mt-2">
            Every facility is curated to anticipate your requirements with quiet perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {amenitiesList.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E8E0D3] p-6 flex flex-col justify-between hover:border-[#B89B5E]/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 bg-[#F7F3EA] flex items-center justify-center border border-[#E8E0D3]/80">
                  {amenitiesIconMap[item.name] || <Sparkles className="w-5 h-5 text-[#B89B5E]" />}
                </div>
                <h3 className="text-sm font-semibold text-[#101C2C]">{item.name}</h3>
                <p className="text-xs text-[#20252B]/70 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('amenities')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#101C2C] hover:text-[#B89B5E] transition-colors"
          >
            <span>Explore All Wellness & Facilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 5. HOTEL EXPERIENCE EDITORIAL */}
      <section className="relative py-24 bg-[#101C2C] text-[#F7F3EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
                The Guest Experience
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white leading-tight">
                Curated Moments of Unhurried Indulgence
              </h2>
              <p className="text-sm text-[#E8E0D3]/80 leading-relaxed">
                From private cellar tastings hosted by our Master Sommelier to chartered sunset yacht voyages, we transform ordinary stays into treasured memories.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { title: 'Thermal Wellness & Restoration', text: 'Immerse in mineral waters and botanical spa treatments.' },
                  { title: 'Culinary Artistry & Private Salons', text: 'Tasting menus crafted from local organic micro-farms.' },
                  { title: 'Coastal Yacht & Helicopter Charters', text: 'Explore pristine coves and hidden Pacific beaches in total privacy.' },
                ].map((exp, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full border border-[#B89B5E] flex items-center justify-center text-[10px] text-[#B89B5E] font-semibold shrink-0 mt-0.5">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{exp.title}</h4>
                      <p className="text-xs text-[#E8E0D3]/70">{exp.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('experiences')}
                  className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
                >
                  View Bespoke Experiences
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="relative aspect-4/5 overflow-hidden border border-white/10">
                <img
                  src={HOTEL_IMAGES.wellnessSpa}
                  alt="Imperial Hydrotherapy Pool"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative aspect-4/5 overflow-hidden border border-white/10 translate-y-6">
                <img
                  src={HOTEL_IMAGES.loungeCocktails}
                  alt="The Obsidian Lounge Bar"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINE DINING & LOUNGES PREVIEW */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
              Gastronomy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#101C2C] mt-1">
              Culinary Destinations
            </h2>
            <p className="text-xs sm:text-sm text-[#20252B]/70 mt-1 max-w-lg">
              Michelin-caliber seasonal cuisine, rare vintage spirits, and sunlit breakfast verandas.
            </p>
          </div>

          <button
            onClick={() => onNavigate('dining')}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[#101C2C] hover:text-[#B89B5E] transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Explore All Dining Venues</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DINING_VENUES.map((venue) => (
            <div
              key={venue.id}
              className="bg-white border border-[#E8E0D3] overflow-hidden flex flex-col justify-between group hover:border-[#B89B5E]/50 transition-colors"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-[#101C2C]/5">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-serif font-semibold text-[#101C2C] group-hover:text-[#B89B5E] transition-colors">
                    {venue.name}
                  </h3>
                  <p className="text-xs text-[#20252B]/70 line-clamp-2 leading-relaxed">
                    {venue.description}
                  </p>
                  <p className="text-[11px] text-[#B89B5E] font-medium pt-1">
                    {venue.hours}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#E8E0D3]/60 flex items-center justify-between text-xs mt-3">
                <button
                  onClick={() => setActiveMenuVenue(venue)}
                  className="text-xs uppercase tracking-wider text-[#101C2C] hover:text-[#B89B5E] font-medium"
                >
                  View Menu
                </button>
                <button
                  onClick={() => setActiveReservationVenue(venue)}
                  className="bg-[#101C2C] hover:bg-[#B89B5E] text-white px-3 py-1.5 uppercase tracking-wider font-semibold text-[11px] transition-colors"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SPECIAL OFFERS PREVIEW */}
      <section className="py-20 bg-white border-y border-[#E8E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
                Privileges
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#101C2C] mt-1">
                Seasonal Offers & Escapes
              </h2>
              <p className="text-xs sm:text-sm text-[#20252B]/70 mt-1 max-w-lg">
                Exclusive packages featuring spa credits, breakfast on the veranda, and late checkouts.
              </p>
            </div>

            <button
              onClick={() => onNavigate('offers')}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#101C2C] hover:text-[#B89B5E] transition-colors flex items-center gap-2 shrink-0"
            >
              <span>View All Offers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFERS_DATA.map((offer) => (
              <div
                key={offer.id}
                className="bg-[#F7F3EA] border border-[#E8E0D3] p-6 flex flex-col justify-between hover:border-[#B89B5E] transition-colors space-y-4"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B89B5E] font-bold block">
                    Promo Code: {offer.code}
                  </span>
                  <h3 className="text-lg font-serif font-semibold text-[#101C2C] mt-1">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#20252B]/75 mt-2 line-clamp-3">
                    {offer.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#E8E0D3] space-y-1.5">
                    {offer.inclusions.slice(0, 2).map((inc, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#20252B]/80">
                        <CheckCircle className="w-3 h-3 text-[#B89B5E] shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenBooking()}
                    className="w-full bg-[#101C2C] hover:bg-[#B89B5E] text-white py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Book This Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
              Visual Narrative
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#101C2C] mt-1">
              Scenes of The Aurelia
            </h2>
            <p className="text-xs sm:text-sm text-[#20252B]/70 mt-1">
              Click any image to explore in our interactive high-resolution gallery.
            </p>
          </div>

          <button
            onClick={() => onNavigate('gallery')}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[#101C2C] hover:text-[#B89B5E] transition-colors flex items-center gap-2 shrink-0"
          >
            <span>View Full Gallery ({GALLERY_ITEMS.length} Photos)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {previewGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setLightboxIndex(idx);
                setLightboxOpen(true);
              }}
              className="relative aspect-4/3 overflow-hidden border border-[#E8E0D3] cursor-pointer group bg-[#101C2C]/5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#101C2C]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                <span className="text-white text-[11px] font-serif font-medium">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. GUEST REVIEWS */}
      <section className="py-20 bg-[#F7F3EA] border-t border-[#E8E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
              Guest Impressions
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#101C2C] mt-1">
              Reflections on The Aurelia
            </h2>
            <p className="text-[11px] uppercase tracking-wider text-[#20252B]/60 mt-1">
              Sample guest reviews representing typical guest satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-[#E8E0D3] p-8 flex flex-col justify-between shadow-xs hover:border-[#B89B5E]/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#B89B5E]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B89B5E]" />
                    ))}
                  </div>
                  <p className="text-sm font-serif italic text-[#101C2C] leading-relaxed">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8E0D3] text-xs">
                  <p className="font-semibold text-[#101C2C]">{rev.author}</p>
                  <p className="text-[#20252B]/60">{rev.location}</p>
                  <p className="text-[11px] text-[#B89B5E] mt-1">{rev.stayType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. LOCATION & ARRIVAL PREVIEW */}
      <section className="py-20 bg-white border-t border-[#E8E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
                Destination
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#101C2C]">
                Riviera Bay Coastline
              </h2>
              <p className="text-xs sm:text-sm text-[#20252B]/80 leading-relaxed">
                Positioned majestically on Aurelia Promenade, our enclave provides tranquil seclusion while situated minutes from world-class marina berths, historic architecture, and designer boutiques.
              </p>

              <div className="space-y-3 text-xs text-[#20252B]/80 border-t border-[#E8E0D3] pt-4">
                <div className="flex justify-between items-center py-1 border-b border-[#E8E0D3]/60">
                  <span className="font-medium">International Airport (LAX)</span>
                  <span className="text-[#B89B5E] font-semibold">25 min via Chauffeur</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#E8E0D3]/60">
                  <span className="font-medium">Private Executive Helipad</span>
                  <span className="text-[#B89B5E] font-semibold">On-site (Penthouse)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#E8E0D3]/60">
                  <span className="font-medium">Riviera Bay Marina & Yacht Club</span>
                  <span className="text-[#B89B5E] font-semibold">5 min / 1.5 km</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium">Historic Old Town & Cathedral</span>
                  <span className="text-[#B89B5E] font-semibold">8 min / 3 km</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('location')}
                  className="bg-[#101C2C] hover:bg-[#B89B5E] text-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
                >
                  View Directions & Attractions
                </button>
              </div>
            </div>

            {/* Stylized Interactive Map Preview Card */}
            <div className="lg:col-span-7 bg-[#F7F3EA] border border-[#E8E0D3] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E0D3] pb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#B89B5E]" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#101C2C]">{HOTEL_INFO.name}</h4>
                    <p className="text-xs text-[#20252B]/60">{HOTEL_INFO.address}</p>
                  </div>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#B89B5E] font-semibold">
                  34.0259° N, 118.7798° W
                </span>
              </div>

              <div className="relative aspect-16/9 bg-[#101C2C] overflow-hidden border border-[#E8E0D3] flex items-center justify-center text-center p-6">
                <div className="space-y-3 z-10 text-white max-w-sm">
                  <Compass className="w-10 h-10 text-[#B89B5E] mx-auto animate-pulse" />
                  <h5 className="font-serif text-lg font-medium">Riviera Bay Sanctuary</h5>
                  <p className="text-xs text-[#E8E0D3]/80">
                    Complimentary Mercedes chauffeur transfers within a 5-mile radius available 24/7 for resident guests.
                  </p>
                  <button
                    onClick={() => onNavigate('location')}
                    className="inline-block bg-[#B89B5E] text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold hover:bg-[#A3864A] transition-colors"
                  >
                    Open Area Guide
                  </button>
                </div>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#B89B5E_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FINAL BOOKING CTA BANNER */}
      <section className="relative py-24 bg-[#101C2C] text-[#F7F3EA] text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
            Begin Your Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white leading-tight">
            Your Stay Starts Here.
          </h2>
          <p className="text-xs sm:text-sm text-[#E8E0D3]/85 max-w-lg mx-auto leading-relaxed">
            Reserve directly with The Aurelia for guaranteed best rates, complimentary room category upgrades upon availability, and private arrival amenities.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="bg-[#B89B5E] hover:bg-[#A3864A] text-white text-xs font-semibold uppercase tracking-[0.18em] px-9 py-4 transition-all shadow-md"
            >
              Book Your Stay
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border border-white/40 hover:border-white text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-[0.18em] px-8 py-4 transition-colors"
            >
              Contact Concierge
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <RoomDetailModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onBookRoom={(r) => onOpenBooking(r.id)}
      />

      <DiningReservationModal
        venue={activeReservationVenue}
        isOpen={Boolean(activeReservationVenue)}
        onClose={() => setActiveReservationVenue(null)}
      />

      <MenuModal
        venue={activeMenuVenue}
        isOpen={Boolean(activeMenuVenue)}
        onClose={() => setActiveMenuVenue(null)}
        onReserveTable={(v) => {
          setActiveMenuVenue(null);
          setActiveReservationVenue(v);
        }}
      />

      <GalleryLightbox
        items={GALLERY_ITEMS}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};

import React from 'react';
import { PageType } from '../types/hotel';
import { HOTEL_INFO } from '../data/hotelData';
import { MapPin, Navigation, Plane, Anchor, ShoppingBag, Landmark, Compass, Car } from 'lucide-react';

interface LocationPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const LocationPage: React.FC<LocationPageProps> = () => {
  const nearbyAttractions = [
    {
      category: 'Maritime & Nautical',
      name: 'Riviera Bay Marina & Yacht Club',
      distance: '1.5 km / 5 minutes',
      desc: 'Private deep-water berths, ocean sailing charters, and exclusive seaside club amenities.',
      icon: <Anchor className="w-4 h-4 text-[#B89B5E]" />,
    },
    {
      category: 'Heritage & Culture',
      name: 'Historic Old Town & Colonnade Cathedral',
      distance: '3.0 km / 8 minutes',
      desc: 'Centuries of neoclassical Mediterranean architecture, stone courtyards, and local art galleries.',
      icon: <Landmark className="w-4 h-4 text-[#B89B5E]" />,
    },
    {
      category: 'Haute Horlogerie & Fashion',
      name: 'Via Aurelia Luxury Shopping Boulevard',
      distance: '4.2 km / 10 minutes',
      desc: 'Flagship boutiques including Hermès, Loro Piana, Brunello Cucinelli, and fine jewelry salons.',
      icon: <ShoppingBag className="w-4 h-4 text-[#B89B5E]" />,
    },
    {
      category: 'Aviation & Arrivals',
      name: 'Los Angeles International Airport (LAX)',
      distance: '28 km / 25 minutes via Hotel Chauffeur',
      desc: 'Private FBO terminals and commercial international arrivals with our white-glove meet & assist service.',
      icon: <Plane className="w-4 h-4 text-[#B89B5E]" />,
    },
  ];

  return (
    <div className="bg-[#F7F3EA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
            Coastline & Access
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#101C2C]">
            Location, Arrival & Surroundings
          </h1>
          <p className="text-xs sm:text-sm text-[#20252B]/75 leading-relaxed">
            Secluded upon the tranquil bluffs of Riviera Bay, yet within moments of fine culture, maritime adventures, and world-class luxury shopping.
          </p>
        </div>

        {/* Map & Coordinates Card */}
        <div className="bg-white border border-[#E8E0D3] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E0D3] pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#B89B5E] font-bold block">
                Primary Residence Address
              </span>
              <h2 className="text-2xl font-serif font-semibold text-[#101C2C] mt-0.5">
                {HOTEL_INFO.address}
              </h2>
              <p className="text-xs text-[#20252B]/70 mt-1">
                GPS Coordinates: {HOTEL_INFO.coordinates.lat}° N, {Math.abs(HOTEL_INFO.coordinates.lng)}° W
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(HOTEL_INFO.address)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#101C2C] hover:bg-[#B89B5E] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Interactive Styled Map Blueprint */}
          <div className="relative aspect-21/9 bg-[#101C2C] border border-[#E8E0D3] overflow-hidden flex items-center justify-center p-8 text-center">
            <div className="relative z-10 max-w-lg space-y-3 text-white">
              <div className="w-12 h-12 bg-[#B89B5E] text-[#101C2C] rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <MapPin className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-white">
                The Aurelia Coastal Promenade
              </h3>
              <p className="text-xs text-[#E8E0D3]/85 leading-relaxed">
                Direct coastal access with private valet gate on Promenade North. Chauffeur reception available 24 hours daily.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs pt-2 text-[#B89B5E]">
                <span>24/7 Valet Parking</span>
                <span>·</span>
                <span>Tesla & Universal EV Supercharging</span>
                <span>·</span>
                <span>Helipad Access</span>
              </div>
            </div>

            {/* Subtle architectural grid pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#B89B5E_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
        </div>

        {/* Nearby Destinations */}
        <div>
          <div className="border-b border-[#E8E0D3] pb-4 mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B89B5E] font-semibold block">
              Curated Neighborhood
            </span>
            <h3 className="text-2xl font-serif font-semibold text-[#101C2C] mt-1">
              Nearby Landmarks & Attractions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyAttractions.map((attr, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E8E0D3] p-6 space-y-3 shadow-xs hover:border-[#B89B5E]/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-[#F7F3EA] border border-[#E8E0D3]">
                    {attr.icon}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#B89B5E]">
                    {attr.distance}
                  </span>
                </div>

                <span className="text-[10px] uppercase tracking-wider text-[#20252B]/60 block font-semibold">
                  {attr.category}
                </span>

                <h4 className="text-base font-serif font-semibold text-[#101C2C]">
                  {attr.name}
                </h4>

                <p className="text-xs text-[#20252B]/75 leading-relaxed">
                  {attr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Transportation Options */}
        <div className="bg-[#101C2C] text-[#F7F3EA] p-8 sm:p-12 border border-[#B89B5E]/30 space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B89B5E] font-semibold block">
              Arrival Logistics
            </span>
            <h3 className="text-2xl font-serif font-semibold text-white">
              Effortless Transportation Modes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-2 border-l border-[#B89B5E] pl-4">
              <h4 className="font-serif text-base font-semibold text-[#B89B5E]">
                Hotel Mercedes Chauffeur
              </h4>
              <p className="text-[#E8E0D3]/80 leading-relaxed">
                Bookable directly through our concierge desk for direct airport pickups or local dining excursions.
              </p>
            </div>

            <div className="space-y-2 border-l border-[#B89B5E] pl-4">
              <h4 className="font-serif text-base font-semibold text-[#B89B5E]">
                Subterranean Valet Garaging
              </h4>
              <p className="text-[#E8E0D3]/80 leading-relaxed">
                Secure 24-hour video surveillance parking with white-glove luggage conveyance and vehicle wash services.
              </p>
            </div>

            <div className="space-y-2 border-l border-[#B89B5E] pl-4">
              <h4 className="font-serif text-base font-semibold text-[#B89B5E]">
                Private Helicopter Transfer
              </h4>
              <p className="text-[#E8E0D3]/80 leading-relaxed">
                Dedicated rooftop helipad with direct penthouse access for discreet, high-efficiency transit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

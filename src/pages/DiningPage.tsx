import React, { useState } from 'react';
import { PageType, DiningVenue } from '../types/hotel';
import { DINING_VENUES } from '../data/hotelData';
import { DiningReservationModal } from '../components/DiningReservationModal';
import { MenuModal } from '../components/MenuModal';
import { Clock, Shirt, Utensils, Calendar, ChevronRight } from 'lucide-react';

interface DiningPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const DiningPage: React.FC<DiningPageProps> = () => {
  const [activeReservationVenue, setActiveReservationVenue] = useState<DiningVenue | null>(null);
  const [activeMenuVenue, setActiveMenuVenue] = useState<DiningVenue | null>(null);

  return (
    <div className="bg-[#F7F3EA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
            Culinary Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#101C2C]">
            Restaurants, Lounges & Private In-Suite Dining
          </h1>
          <p className="text-xs sm:text-sm text-[#20252B]/75 leading-relaxed">
            Honoring coastal harvests and heritage recipes, our dining rooms blend culinary precision with the warm ease of coastal California luxury.
          </p>
        </div>

        {/* Venues Showcase List */}
        <div className="space-y-16">
          {DINING_VENUES.map((venue, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={venue.id}
                className="bg-white border border-[#E8E0D3] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center"
              >
                {/* Image Col */}
                <div
                  className={`lg:col-span-6 relative aspect-4/3 overflow-hidden bg-[#101C2C]/5 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#101C2C]/85 text-[#F7F3EA] text-[11px] uppercase tracking-widest px-3 py-1 font-medium backdrop-blur-xs">
                    {venue.cuisine}
                  </div>
                </div>

                {/* Content Col */}
                <div
                  className={`lg:col-span-6 p-8 sm:p-12 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B89B5E] block">
                      {venue.tagline}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#101C2C] mt-1">
                      {venue.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#20252B]/80 mt-3 leading-relaxed">
                      {venue.description}
                    </p>
                  </div>

                  {/* Highlights preview */}
                  <div className="border-t border-[#E8E0D3] pt-4 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#101C2C] block">
                      Featured Creations
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#20252B]/75">
                      {venue.menuHighlights.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="bg-[#F7F3EA] p-2.5 border border-[#E8E0D3]/80">
                          <p className="font-semibold text-[#101C2C] truncate">{item.name}</p>
                          <p className="text-[11px] text-[#B89B5E]">{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metadata hours & dress code */}
                  <div className="flex flex-wrap items-center gap-6 text-xs text-[#20252B]/70 border-t border-[#E8E0D3] pt-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B89B5E]" />
                      <span>{venue.hours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shirt className="w-3.5 h-3.5 text-[#B89B5E]" />
                      <span>{venue.dressCode}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => setActiveMenuVenue(venue)}
                      className="border border-[#101C2C] hover:border-[#B89B5E] text-[#101C2C] hover:text-[#B89B5E] px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Inspect Menu
                    </button>

                    <button
                      onClick={() => setActiveReservationVenue(venue)}
                      className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Reserve Table</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Private Dining Inquiries Callout */}
        <div className="bg-[#101C2C] text-[#F7F3EA] p-8 sm:p-12 border border-[#B89B5E]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B89B5E] font-semibold block">
              Private Banquets & Celebrations
            </span>
            <h3 className="text-2xl font-serif font-semibold text-white">
              Host an Unforgettable Private Luncheon or Dinner Salon
            </h3>
            <p className="text-xs text-[#E8E0D3]/75 leading-relaxed">
              Our Sommelier Vault and Terrace Colonnade are available for exclusive private gatherings, bespoke wine pairings, and customized tasting menus for up to 30 guests.
            </p>
          </div>

          <button
            onClick={() => setActiveReservationVenue(DINING_VENUES[0])}
            className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-colors"
          >
            Inquire for Private Events
          </button>
        </div>

        {/* Modals */}
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
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { PageType, Amenity } from '../types/hotel';
import { AMENITIES_DATA } from '../data/hotelData';
import { Sparkles, Waves, Activity, Car, Compass, Briefcase, Check, Clock, Calendar } from 'lucide-react';

interface AmenitiesPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const AmenitiesPage: React.FC<AmenitiesPageProps> = () => {
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [inquirySent, setInquirySent] = useState(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#B89B5E]" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-[#B89B5E]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-[#B89B5E]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#B89B5E]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#B89B5E]" />;
      default:
        return <Briefcase className="w-5 h-5 text-[#B89B5E]" />;
    }
  };

  return (
    <div className="bg-[#F7F3EA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
            Holistic Facilities & Comforts
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#101C2C]">
            The Imperial Spa, Pools & Bespoke Services
          </h1>
          <p className="text-xs sm:text-sm text-[#20252B]/75 leading-relaxed">
            Every amenity at The Aurelia is designed to cultivate restoration, focus, and indulgence with effortless grace.
          </p>
        </div>

        {/* Detailed Grid of Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AMENITIES_DATA.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-white border border-[#E8E0D3] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#B89B5E]/50 transition-colors"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-[#101C2C]/5">
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 p-2 shadow-xs">
                    {getIcon(amenity.iconName)}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#B89B5E] font-semibold block">
                    {amenity.subtitle}
                  </span>
                  <h3 className="text-xl font-serif font-semibold text-[#101C2C]">
                    {amenity.title}
                  </h3>
                  <p className="text-xs text-[#20252B]/75 leading-relaxed">
                    {amenity.description}
                  </p>

                  <div className="pt-3 border-t border-[#E8E0D3] space-y-1.5">
                    {amenity.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#20252B]/85">
                        <Check className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#E8E0D3]/60 flex items-center justify-between text-xs mt-4">
                <span className="text-[#20252B]/60 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>{amenity.hours}</span>
                </span>
                <button
                  onClick={() => setSelectedAmenity(amenity)}
                  className="bg-[#101C2C] hover:bg-[#B89B5E] text-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors"
                >
                  Inquire / Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Spa Treatment Menu Banner */}
        <div className="bg-[#101C2C] text-[#F7F3EA] p-8 sm:p-12 border border-[#B89B5E]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B89B5E] font-semibold block">
              The Imperial Spa Menu
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-white">
              Biological Skincare & Balneotherapy Rituals
            </h3>
            <p className="text-xs sm:text-sm text-[#E8E0D3]/80 leading-relaxed max-w-2xl">
              Partnering with Swiss biological cellular laboratories, our therapies incorporate alpine botanical extracts, hot basalt stones, and lymphatic hydrotherapy designed to counteract urban fatigue.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              onClick={() => setSelectedAmenity(AMENITIES_DATA[0])}
              className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap"
            >
              Reserve Spa Treatment
            </button>
          </div>
        </div>

        {/* Inquiry Modal */}
        {selectedAmenity && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-[#101C2C]/60 backdrop-blur-xs" onClick={() => setSelectedAmenity(null)} />
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-md bg-white border border-[#E8E0D3] shadow-2xl p-6 sm:p-8">
                {!inquirySent ? (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B89B5E] font-semibold block">
                      Facility Service Inquiries
                    </span>
                    <h3 className="text-xl font-serif font-semibold text-[#101C2C] mt-1">
                      {selectedAmenity.title}
                    </h3>
                    <p className="text-xs text-[#20252B]/70 mt-1 mb-4">
                      Operating hours: {selectedAmenity.hours}
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setInquirySent(true);
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                          Guest Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Lord Eleanor Sterling"
                          className="w-full border border-[#E8E0D3] p-2 text-xs focus:border-[#B89B5E] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="guest@domain.com"
                            className="w-full border border-[#E8E0D3] p-2 text-xs focus:border-[#B89B5E] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            required
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full border border-[#E8E0D3] p-2 text-xs focus:border-[#B89B5E] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                          Specific Requirements
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Treatment preferences, trainer goals, airport transfer flight numbers..."
                          className="w-full border border-[#E8E0D3] p-2 text-xs focus:border-[#B89B5E] focus:outline-none"
                        />
                      </div>

                      <div className="pt-3 border-t border-[#E8E0D3] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setSelectedAmenity(null)}
                          className="text-xs uppercase tracking-wider text-[#20252B]/60 hover:text-[#101C2C]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider"
                        >
                          Submit Request
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-6 space-y-3">
                    <Sparkles className="w-10 h-10 text-[#B89B5E] mx-auto" />
                    <h4 className="font-serif text-xl font-semibold text-[#101C2C]">
                      Request Received
                    </h4>
                    <p className="text-xs text-[#20252B]/75">
                      Our facility concierge has received your inquiry for {selectedAmenity.title} and will connect with your schedule.
                    </p>
                    <button
                      onClick={() => {
                        setInquirySent(false);
                        setSelectedAmenity(null);
                      }}
                      className="mt-2 bg-[#101C2C] text-white px-6 py-2 text-xs uppercase tracking-wider font-semibold"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { PageType, Experience } from '../types/hotel';
import { EXPERIENCES_DATA } from '../data/hotelData';
import { Clock, Users, Check, Sparkles, Calendar, ArrowRight } from 'lucide-react';

interface ExperiencesPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = () => {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [booked, setBooked] = useState(false);

  return (
    <div className="bg-[#F7F3EA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
            Bespoke Escapes
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#101C2C]">
            Curated Guest Experiences
          </h1>
          <p className="text-xs sm:text-sm text-[#20252B]/75 leading-relaxed">
            Immerse yourself in hand-crafted coastal journeys designed exclusively for residents of The Aurelia, led by masters of wine, navigation, and wellness.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES_DATA.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border border-[#E8E0D3] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#B89B5E]/50 transition-colors group"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-[#101C2C]/5">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 right-4 bg-white/95 text-[#101C2C] px-3 py-1 text-xs font-semibold shadow-xs">
                    <span className="font-serif font-bold text-sm text-[#B89B5E]">${exp.pricePerGuest}</span>
                    <span className="text-[#20252B]/70"> / guest</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B89B5E] font-bold block">
                      {exp.tagline}
                    </span>
                    <h3 className="text-2xl font-serif font-semibold text-[#101C2C] mt-1 group-hover:text-[#B89B5E] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#20252B]/75 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#20252B]/70 border-t border-[#E8E0D3] pt-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B89B5E]" />
                      <span>Duration: {exp.duration}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#B89B5E]" />
                      <span>Private / Small Groups</span>
                    </span>
                  </div>

                  <div className="space-y-1.5 border-t border-[#E8E0D3] pt-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#101C2C] block">
                      Included Privileges:
                    </span>
                    {exp.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#20252B]/85">
                        <Check className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-[#E8E0D3]/60 flex items-center justify-between mt-4">
                <span className="text-xs text-[#20252B]/60 italic">
                  Advance 24h booking advised
                </span>
                <button
                  onClick={() => setSelectedExp(exp)}
                  className="bg-[#101C2C] hover:bg-[#B89B5E] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Reserve Experience
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for reserving experiences */}
        {selectedExp && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-[#101C2C]/60 backdrop-blur-xs" onClick={() => setSelectedExp(null)} />
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-md bg-white border border-[#E8E0D3] shadow-2xl p-6 sm:p-8">
                {!booked ? (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B89B5E] font-semibold block">
                        Experience Reservation
                      </span>
                      <h3 className="text-xl font-serif font-semibold text-[#101C2C] mt-1">
                        {selectedExp.title}
                      </h3>
                      <p className="text-xs text-[#20252B]/70 mt-1">
                        ${selectedExp.pricePerGuest} per guest · {selectedExp.duration}
                      </p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setBooked(true);
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
                          placeholder="Lord Julian Sterling"
                          className="w-full border border-[#E8E0D3] p-2 text-xs focus:border-[#B89B5E] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                            Number of Guests
                          </label>
                          <select className="w-full border border-[#E8E0D3] p-2 text-xs focus:border-[#B89B5E] focus:outline-none">
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                          </select>
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

                      <div className="pt-3 border-t border-[#E8E0D3] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setSelectedExp(null)}
                          className="text-xs uppercase tracking-wider text-[#20252B]/60 hover:text-[#101C2C]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider"
                        >
                          Confirm Itinerary
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-6 space-y-3">
                    <Sparkles className="w-10 h-10 text-[#B89B5E] mx-auto" />
                    <h4 className="font-serif text-xl font-semibold text-[#101C2C]">
                      Experience Reserved
                    </h4>
                    <p className="text-xs text-[#20252B]/75">
                      Your reservation for <strong>{selectedExp.title}</strong> has been secured in our guest portfolio.
                    </p>
                    <button
                      onClick={() => {
                        setBooked(false);
                        setSelectedExp(null);
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

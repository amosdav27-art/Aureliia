import React from 'react';
import { PageType, SpecialOffer } from '../types/hotel';
import { OFFERS_DATA } from '../data/hotelData';
import { Check, Tag, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

interface OffersPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (roomId?: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-[#F7F3EA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
            Curated Privileges
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#101C2C]">
            Special Offers & Seasonal Stays
          </h1>
          <p className="text-xs sm:text-sm text-[#20252B]/75 leading-relaxed">
            Enhance your stay with thoughtfully bundled residential experiences, spa credits, and dining inclusions.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS_DATA.map((offer) => (
            <div
              key={offer.id}
              className="bg-white border border-[#E8E0D3] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#B89B5E]/50 transition-colors"
            >
              <div>
                <div className="relative aspect-16/9 overflow-hidden bg-[#101C2C]/5">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#B89B5E] text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Code: {offer.code}</span>
                  </div>
                  {offer.discountPercentage && (
                    <div className="absolute bottom-4 right-4 bg-white/95 text-[#101C2C] px-3 py-1 text-xs font-bold font-serif shadow-xs">
                      Save {offer.discountPercentage}%
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B89B5E] font-bold block">
                      {offer.subtitle}
                    </span>
                    <h3 className="text-2xl font-serif font-semibold text-[#101C2C] mt-1">
                      {offer.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#20252B]/75 mt-2 leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  {/* What's included */}
                  <div className="border-t border-[#E8E0D3] pt-4 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#101C2C] block">
                      Package Inclusions:
                    </span>
                    <div className="space-y-1.5">
                      {offer.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#20252B]/85">
                          <Check className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Validity & Terms */}
                  <div className="border-t border-[#E8E0D3] pt-4 space-y-1 text-xs text-[#20252B]/70">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
                      <span>{offer.validity}</span>
                    </p>
                    <p className="flex items-start gap-1.5 text-[11px] text-[#20252B]/60">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B89B5E] shrink-0 mt-0.5" />
                      <span>{offer.terms}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-[#E8E0D3]/60 flex items-center justify-between mt-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="w-full bg-[#101C2C] hover:bg-[#B89B5E] text-white py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Book With Code {offer.code}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { DiningVenue } from '../types/hotel';
import { X, UtensilsCrossed } from 'lucide-react';

interface MenuModalProps {
  venue: DiningVenue | null;
  isOpen: boolean;
  onClose: () => void;
  onReserveTable: (venue: DiningVenue) => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({ venue, isOpen, onClose, onReserveTable }) => {
  if (!isOpen || !venue) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-[#101C2C]/65 backdrop-blur-xs" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white border border-[#E8E0D3] shadow-2xl p-6 sm:p-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#20252B]/60 hover:text-[#101C2C]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center border-b border-[#E8E0D3] pb-6 mb-6">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#B89B5E] block">
              Curated Degustation & À La Carte
            </span>
            <h3 className="text-3xl font-serif font-semibold text-[#101C2C] mt-1">
              {venue.name}
            </h3>
            <p className="text-xs text-[#20252B]/70 mt-1 italic">
              Executive Chef Julian Laurent · Sommelier Jean-Paul Vane
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-[#E8E0D3]/60 pb-2">
                <UtensilsCrossed className="w-4 h-4 text-[#B89B5E]" />
                <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#101C2C]">
                  Signature Selections
                </h4>
              </div>

              <div className="space-y-4">
                {venue.menuHighlights.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-baseline gap-4 group">
                    <div className="space-y-0.5">
                      <h5 className="text-sm font-serif font-semibold text-[#101C2C] group-hover:text-[#B89B5E] transition-colors">
                        {item.name}
                      </h5>
                      <p className="text-xs text-[#20252B]/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-serif font-bold text-sm text-[#B89B5E] shrink-0 tabular-nums">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#F7F3EA] border border-[#E8E0D3] text-xs text-[#20252B]/75 space-y-1">
              <p><strong>Service Hours:</strong> {venue.hours}</p>
              <p><strong>Dress Attire:</strong> {venue.dressCode}</p>
              <p className="text-[11px] text-[#20252B]/60">
                A 20% service charge and applicable state sales tax will be added to the final dining check. Cellar wine pairings available upon request.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E8E0D3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-widest text-[#20252B]/70 hover:text-[#101C2C]"
            >
              Back to Overview
            </button>
            <button
              onClick={() => {
                onClose();
                onReserveTable(venue);
              }}
              className="w-full sm:w-auto bg-[#B89B5E] hover:bg-[#A3864A] text-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
            >
              Reserve A Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

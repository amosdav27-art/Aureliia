import React, { useState } from 'react';
import { Room } from '../types/hotel';
import { X, Check, Maximize2, Users, Bed, Eye, ArrowRight, ShieldCheck } from 'lucide-react';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (room: Room) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, onClose, onBookRoom }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="room-modal-title">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#101C2C]/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-4xl bg-white border border-[#E8E0D3] shadow-2xl overflow-hidden my-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 text-[#101C2C] hover:bg-[#101C2C] hover:text-white transition-colors border border-[#E8E0D3]"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Gallery View */}
          <div className="relative aspect-16/9 bg-[#101C2C]">
            <img
              src={room.images[activeImageIndex] || room.images[0]}
              alt={room.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {room.images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto p-1 bg-black/40 backdrop-blur-xs w-fit">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-10 shrink-0 border-2 overflow-hidden transition-all ${
                      activeImageIndex === idx ? 'border-[#B89B5E] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E0D3] pb-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B89B5E]">
                  {room.category === 'penthouse' ? 'Top-Floor Penthouse Enclave' : room.category === 'suite' ? 'Signature Suite' : 'Deluxe Guest Room'}
                </p>
                <h2 id="room-modal-title" className="text-2xl sm:text-3xl font-serif font-semibold text-[#101C2C] mt-1">
                  {room.name}
                </h2>
                <p className="text-xs text-[#20252B]/70 mt-1 italic">
                  {room.headline}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-xs text-[#20252B]/60 uppercase tracking-widest block">Starting from</span>
                <span className="text-2xl font-serif font-bold text-[#B89B5E]">${room.basePrice}</span>
                <span className="text-xs text-[#20252B]/70"> / night</span>
              </div>
            </div>

            {/* Room Dimensions & Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F7F3EA] border border-[#E8E0D3]">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#20252B]/60 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>Space</span>
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#101C2C]">{room.sizeSqm} m² ({room.sizeSqft} sq ft)</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#20252B]/60 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>Capacity</span>
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#101C2C]">Up to {room.capacity} Guests</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#20252B]/60 flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>Bed Configuration</span>
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#101C2C]">{room.bedType}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#20252B]/60 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>View</span>
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#101C2C]">{room.view}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.15em] font-semibold text-[#101C2C] mb-2">
                Overview & Architecture
              </h3>
              <p className="text-xs sm:text-sm text-[#20252B]/80 leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.15em] font-semibold text-[#101C2C] mb-3">
                In-Room Amenities & Finishes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {room.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#20252B]/85">
                    <Check className="w-4 h-4 text-[#B89B5E] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Policies */}
            <div className="pt-4 border-t border-[#E8E0D3]">
              <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#101C2C] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B89B5E]" />
                <span>Residence Policies & Guarantees</span>
              </h3>
              <ul className="space-y-1 text-xs text-[#20252B]/70">
                {room.policies.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#B89B5E] rounded-full" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Modal Actions */}
            <div className="pt-6 border-t border-[#E8E0D3] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={onClose}
                className="w-full sm:w-auto text-xs uppercase tracking-widest text-[#20252B]/70 hover:text-[#101C2C] py-2"
              >
                Close Window
              </button>

              <button
                onClick={() => {
                  onClose();
                  onBookRoom(room);
                }}
                className="w-full sm:w-auto bg-[#B89B5E] hover:bg-[#A3864A] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2"
              >
                <span>Reserve This Suite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

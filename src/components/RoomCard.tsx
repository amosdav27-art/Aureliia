import React from 'react';
import { Room } from '../types/hotel';
import { Maximize2, Users, Bed, ArrowRight } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onViewDetails: (room: Room) => void;
  onBookNow: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onViewDetails, onBookNow }) => {
  return (
    <article className="group bg-white border border-[#E8E0D3] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:border-[#B89B5E]/40">
      {/* Room Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#101C2C]/5">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-[#101C2C]/85 text-[#F7F3EA] text-[11px] uppercase tracking-[0.18em] px-3 py-1 font-medium backdrop-blur-xs">
          {room.category === 'penthouse' ? 'Penthouse Enclave' : room.category === 'suite' ? 'Signature Suite' : 'Deluxe Room'}
        </div>
        <div className="absolute bottom-4 right-4 bg-white/95 text-[#101C2C] px-3.5 py-1.5 shadow-sm text-xs font-semibold backdrop-blur-xs">
          From <span className="text-sm font-serif font-bold text-[#B89B5E]">${room.basePrice}</span> <span className="font-normal text-[#20252B]/70">/ night</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-serif font-semibold text-[#101C2C] group-hover:text-[#B89B5E] transition-colors">
            {room.name}
          </h3>
          <p className="text-xs text-[#20252B]/75 line-clamp-2 mt-2 leading-relaxed">
            {room.description}
          </p>

          {/* Clean Unboxed Metadata Specs with typographic separators */}
          <div className="mt-4 pt-4 border-t border-[#E8E0D3]/80 flex flex-wrap items-center gap-y-2 text-xs text-[#20252B]/80">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#B89B5E]" />
              <span>{room.sizeSqm} m² / {room.sizeSqft} sq ft</span>
            </span>
            <span className="mx-2 text-[#E8E0D3]" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#B89B5E]" />
              <span>Up to {room.capacity} Guests</span>
            </span>
            <span className="mx-2 text-[#E8E0D3]" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#B89B5E]" />
              <span>{room.bedType}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#E8E0D3]/80 flex items-center justify-between gap-3">
          <button
            onClick={() => onViewDetails(room)}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-[#101C2C] hover:text-[#B89B5E] transition-colors py-2 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B89B5E]"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onBookNow(room)}
            className="bg-[#101C2C] hover:bg-[#B89B5E] text-white text-xs font-semibold uppercase tracking-[0.14em] px-4 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101C2C]"
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
};

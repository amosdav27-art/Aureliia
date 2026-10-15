import React, { useState } from 'react';
import { PageType, Room } from '../types/hotel';
import { ROOMS_DATA } from '../data/hotelData';
import { RoomCard } from '../components/RoomCard';
import { RoomDetailModal } from '../components/RoomDetailModal';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface RoomsPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (roomId?: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'deluxe' | 'suite' | 'penthouse'>('all');
  const [capacityFilter, setCapacityFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'size-desc'>('recommended');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (categoryFilter !== 'all' && room.category !== categoryFilter) return false;
    if (capacityFilter > 0 && room.capacity < capacityFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
    if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
    if (sortBy === 'size-desc') return b.sizeSqm - a.sizeSqm;
    return 0; // recommended
  });

  return (
    <div className="bg-[#F7F3EA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
            The Residence Collection
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#101C2C]">
            Rooms, Suites & Rooftop Enclaves
          </h1>
          <p className="text-xs sm:text-sm text-[#20252B]/75 leading-relaxed">
            Every residence at The Aurelia is an individual sanctuary appointed with custom travertine finishes, acoustic isolation, Frette linens, and panoramic views.
          </p>
        </div>

        {/* Filter & Sorting Controls */}
        <div className="bg-white border border-[#E8E0D3] p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Segmented Buttons */}
            <div className="flex flex-wrap items-center gap-1.5" role="tablist">
              {[
                { id: 'all', label: 'All Residences' },
                { id: 'deluxe', label: 'Deluxe Rooms' },
                { id: 'suite', label: 'Executive Suites' },
                { id: 'penthouse', label: 'Penthouse' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCategoryFilter(tab.id as any)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
                    categoryFilter === tab.id
                      ? 'bg-[#101C2C] text-white'
                      : 'bg-[#F7F3EA] text-[#20252B]/80 hover:bg-[#E8E0D3]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Capacity & Sort Selectors */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 border border-[#E8E0D3] px-3 py-2 bg-[#F7F3EA]/30">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#B89B5E]" />
                <label className="text-[10px] uppercase font-semibold text-[#20252B]/60 mr-1">
                  Min Capacity:
                </label>
                <select
                  value={capacityFilter}
                  onChange={(e) => setCapacityFilter(Number(e.target.value))}
                  className="bg-transparent font-medium focus:outline-none cursor-pointer"
                >
                  <option value={0}>Any</option>
                  <option value={2}>2+ Guests</option>
                  <option value={3}>3+ Guests</option>
                  <option value={4}>4+ Guests</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 border border-[#E8E0D3] px-3 py-2 bg-[#F7F3EA]/30">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#B89B5E]" />
                <label className="text-[10px] uppercase font-semibold text-[#20252B]/60 mr-1">
                  Sort By:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-medium focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="size-desc">Largest Space</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onViewDetails={(r) => setSelectedRoom(r)}
              onBookNow={(r) => onOpenBooking(r.id)}
            />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16 bg-white border border-[#E8E0D3] p-8">
            <p className="font-serif text-lg text-[#101C2C]">No suites match your specific filter.</p>
            <button
              onClick={() => {
                setCategoryFilter('all');
                setCapacityFilter(0);
              }}
              className="mt-4 bg-[#B89B5E] text-white px-6 py-2 text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Guaranteed Amenities Banner */}
        <div className="bg-[#101C2C] text-[#F7F3EA] p-8 border border-[#B89B5E]/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#B89B5E] mb-1">
              Frette Italian Linens
            </h4>
            <p className="text-[#E8E0D3]/75">
              600-thread count Egyptian cotton woven exclusively for The Aurelia.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#B89B5E] mb-1">
              Bespoke Diptyque Paris
            </h4>
            <p className="text-[#E8E0D3]/75">
              Curated luxury botanical formulations in all residential bathrooms.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#B89B5E] mb-1">
              Clefs d'Or Butler Service
            </h4>
            <p className="text-[#E8E0D3]/75">
              Discreet residential valet, packing, pressing, and itinerary curation.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#B89B5E] mb-1">
              24-Hour In-Suite Dining
            </h4>
            <p className="text-[#E8E0D3]/75">
              Warm artisanal breakfasts and late-night comfort classics on demand.
            </p>
          </div>
        </div>

        {/* Modal */}
        <RoomDetailModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onBookRoom={(r) => onOpenBooking(r.id)}
        />
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Calendar, Users, ChevronDown, Search } from 'lucide-react';

interface FloatingBookingBarProps {
  onSearch: (params: { checkIn: string; checkOut: string; adults: number; children: number; rooms: number }) => void;
  className?: string;
}

export const FloatingBookingBar: React.FC<FloatingBookingBarProps> = ({ onSearch, className = '' }) => {
  // Default dates: tomorrow and 3 nights later
  const today = new Date();
  const defaultCheckIn = new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];
  const defaultCheckOut = new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ checkIn, checkOut, adults, children, rooms });
  };

  return (
    <div className={`relative bg-white border border-[#E8E0D3] shadow-xl p-4 lg:p-6 ${className}`}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        {/* Check-in */}
        <div className="border border-[#E8E0D3] p-3 hover:border-[#B89B5E] transition-colors bg-[#F7F3EA]/30">
          <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-[#101C2C]/70 mb-1">
            Check-In
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#B89B5E] shrink-0" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#20252B] focus:outline-none cursor-pointer"
              required
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="border border-[#E8E0D3] p-3 hover:border-[#B89B5E] transition-colors bg-[#F7F3EA]/30">
          <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-[#101C2C]/70 mb-1">
            Check-Out
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#B89B5E] shrink-0" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#20252B] focus:outline-none cursor-pointer"
              required
            />
          </div>
        </div>

        {/* Guests Selector */}
        <div className="relative border border-[#E8E0D3] p-3 hover:border-[#B89B5E] transition-colors bg-[#F7F3EA]/30">
          <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-[#101C2C]/70 mb-1">
            Guests
          </label>
          <button
            type="button"
            onClick={() => setGuestPickerOpen(!guestPickerOpen)}
            className="w-full flex items-center justify-between text-xs sm:text-sm font-medium text-[#20252B] focus:outline-none text-left"
          >
            <span className="flex items-center gap-2 truncate">
              <Users className="w-4 h-4 text-[#B89B5E] shrink-0" />
              <span>{adults + children} {adults + children === 1 ? 'Guest' : 'Guests'}</span>
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#20252B]/60" />
          </button>

          {/* Guest Count Popover */}
          {guestPickerOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#E8E0D3] shadow-xl p-4 z-50 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#101C2C]">Adults</p>
                  <p className="text-[11px] text-[#20252B]/60">Age 13+</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-6 h-6 border border-[#E8E0D3] flex items-center justify-center hover:bg-[#F7F3EA] text-sm font-semibold"
                  >
                    -
                  </button>
                  <span className="font-semibold tabular-nums w-4 text-center">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(Math.min(6, adults + 1))}
                    className="w-6 h-6 border border-[#E8E0D3] flex items-center justify-center hover:bg-[#F7F3EA] text-sm font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E8E0D3]">
                <div>
                  <p className="font-semibold text-[#101C2C]">Children</p>
                  <p className="text-[11px] text-[#20252B]/60">Ages 0–12</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-6 h-6 border border-[#E8E0D3] flex items-center justify-center hover:bg-[#F7F3EA] text-sm font-semibold"
                  >
                    -
                  </button>
                  <span className="font-semibold tabular-nums w-4 text-center">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(Math.min(4, children + 1))}
                    className="w-6 h-6 border border-[#E8E0D3] flex items-center justify-center hover:bg-[#F7F3EA] text-sm font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setGuestPickerOpen(false)}
                className="w-full bg-[#101C2C] text-white py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[#1E3048]"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Rooms Selector */}
        <div className="border border-[#E8E0D3] p-3 hover:border-[#B89B5E] transition-colors bg-[#F7F3EA]/30">
          <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-[#101C2C]/70 mb-1">
            Residences
          </label>
          <select
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#20252B] focus:outline-none cursor-pointer"
          >
            <option value={1}>1 Residence</option>
            <option value={2}>2 Residences</option>
            <option value={3}>3 Residences</option>
            <option value={4}>4+ Residences</option>
          </select>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#B89B5E] hover:bg-[#A3864A] text-white py-4 px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-xs group"
          >
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="whitespace-nowrap">Check Availability</span>
          </button>
        </div>
      </form>
    </div>
  );
};

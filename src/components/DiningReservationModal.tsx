import React, { useState } from 'react';
import { DiningVenue } from '../types/hotel';
import { X, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';

import { saveDiningReservation } from '../firebase/services';

interface DiningReservationModalProps {
  venue: DiningVenue | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DiningReservationModal: React.FC<DiningReservationModalProps> = ({
  venue,
  isOpen,
  onClose,
}) => {
  const [date, setDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !venue) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveDiningReservation({
        venueId: venue.id,
        venueName: venue.name,
        name,
        email,
        phone,
        date,
        time,
        guests,
        notes,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to save dining reservation to Firestore:', err);
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-[#101C2C]/65 backdrop-blur-xs" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white border border-[#E8E0D3] shadow-2xl p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#20252B]/60 hover:text-[#101C2C]"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B89B5E] block">
                Table Reservation
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#101C2C] mt-1">
                {venue.name}
              </h3>
              <p className="text-xs text-[#20252B]/70 mt-1 mb-6">
                {venue.cuisine} · {venue.dressCode}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="border border-[#E8E0D3] p-2.5 bg-[#F7F3EA]/30">
                    <label className="block text-[10px] uppercase tracking-wider text-[#20252B]/70 font-semibold mb-1">
                      Date
                    </label>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B89B5E]" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full text-xs font-medium bg-transparent focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="border border-[#E8E0D3] p-2.5 bg-[#F7F3EA]/30">
                    <label className="block text-[10px] uppercase tracking-wider text-[#20252B]/70 font-semibold mb-1">
                      Time
                    </label>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B89B5E]" />
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full text-xs font-medium bg-transparent focus:outline-none"
                      >
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="border border-[#E8E0D3] p-2.5 bg-[#F7F3EA]/30">
                    <label className="block text-[10px] uppercase tracking-wider text-[#20252B]/70 font-semibold mb-1">
                      Party Size
                    </label>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#B89B5E]" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full text-xs font-medium bg-transparent focus:outline-none"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6+ Guests (Private Salon)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#101C2C] font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lord Julian Sterling"
                      className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#101C2C] font-medium mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="guest@domain.com"
                        className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#101C2C] font-medium mb-1">
                        Telephone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 0123"
                        className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#101C2C] font-medium mb-1">
                      Dietary Preferences or Special Requests
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Allergies, anniversary, wine pairings..."
                      className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E0D3]">
                  <button
                    type="submit"
                    className="w-full bg-[#B89B5E] hover:bg-[#A3864A] text-white py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
                  >
                    Confirm Table Request
                  </button>
                  <p className="text-[11px] text-[#20252B]/60 text-center mt-2">
                    Our Maître d' will confirm your seating within 2 hours.
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#B89B5E] mx-auto" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B89B5E] block">
                Reservation Acknowledged
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#101C2C]">
                Table Requested for {name}
              </h3>
              <div className="bg-[#F7F3EA] border border-[#E8E0D3] p-4 text-xs text-[#20252B]/80 max-w-sm mx-auto space-y-1">
                <p><strong>Venue:</strong> {venue.name}</p>
                <p><strong>Date & Time:</strong> {date} at {time}</p>
                <p><strong>Party:</strong> {guests} {Number(guests) === 1 ? 'Guest' : 'Guests'}</p>
                <p className="text-[11px] text-[#20252B]/60 pt-1">
                  A confirmation summary has been dispatched to <strong>{email}</strong>.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="bg-[#101C2C] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#1E3048]"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

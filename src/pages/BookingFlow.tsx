import React, { useState, useEffect } from 'react';
import { Room, BookingState, ConfirmedBooking, PageType } from '../types/hotel';
import { ROOMS_DATA, BOOKING_ADDONS, HOTEL_INFO } from '../data/hotelData';
import { useAuth } from '../firebase/authContext';
import { saveBooking } from '../firebase/services';
import {
  Calendar,
  Users,
  Check,
  CreditCard,
  Printer,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  Download,
  Cloud
} from 'lucide-react';

interface BookingFlowProps {
  initialRoomId?: string | null;
  onNavigate: (page: PageType) => void;
  onClose?: () => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({
  initialRoomId,
  onNavigate,
}) => {
  const { user } = useAuth();
  // Step indicator: 1 = Dates & Rooms, 2 = Select Room, 3 = Extras, 4 = Guest Info, 5 = Review & Guarantee, 6 = Confirmed
  const [step, setStep] = useState<number>(initialRoomId ? 2 : 1);

  // Setup default dates: in 3 days, 3 nights stay
  const today = new Date();
  const defCheckIn = new Date(today.getTime() + 3 * 86400000).toISOString().split('T')[0];
  const defCheckOut = new Date(today.getTime() + 6 * 86400000).toISOString().split('T')[0];

  const [bookingState, setBookingState] = useState<BookingState>({
    checkIn: defCheckIn,
    checkOut: defCheckOut,
    adults: 2,
    children: 0,
    roomsCount: 1,
    selectedRoomId: initialRoomId || ROOMS_DATA[0].id,
    selectedAddons: [],
    promoCode: '',
    guest: {
      title: 'Mr',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: '',
      estimatedArrivalTime: '15:00 - 17:00',
    },
  });

  // Pre-fill guest info if user is authenticated
  useEffect(() => {
    if (user) {
      const names = (user.displayName || '').split(' ');
      setBookingState((prev) => ({
        ...prev,
        guest: {
          ...prev.guest,
          email: prev.guest.email || user.email || '',
          firstName: prev.guest.firstName || names[0] || '',
          lastName: prev.guest.lastName || names.slice(1).join(' ') || '',
        },
      }));
    }
  }, [user]);

  const [cardDetails, setCardDetails] = useState({
    number: '',
    nameOnCard: '',
    expiry: '',
    cvv: '',
  });

  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Calculate nights
  const checkInDate = new Date(bookingState.checkIn);
  const checkOutDate = new Date(bookingState.checkOut);
  const diffTime = Math.max(checkOutDate.getTime() - checkInDate.getTime(), 86400000);
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  const selectedRoom =
    ROOMS_DATA.find((r) => r.id === bookingState.selectedRoomId) || ROOMS_DATA[0];

  // Pricing calculations
  const rawRoomTotal = selectedRoom.basePrice * nights * bookingState.roomsCount;
  const discountAmount = promoApplied ? Math.round(rawRoomTotal * (promoDiscount / 100)) : 0;
  const discountedRoomTotal = rawRoomTotal - discountAmount;

  // Addons Total
  const addonsTotal = bookingState.selectedAddons.reduce((acc, addonId) => {
    const addon = BOOKING_ADDONS.find((a) => a.id === addonId);
    if (!addon) return acc;
    return acc + (addon.perNight ? addon.price * nights : addon.price);
  }, 0);

  const subtotal = discountedRoomTotal + addonsTotal;
  const taxAmount = Math.round(subtotal * 0.12); // 12% Hotel Occupancy Tax
  const serviceCharge = Math.round(subtotal * 0.05); // 5% Hospitality Service Charge
  const totalAmount = subtotal + taxAmount + serviceCharge;

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'WEEKEND15') {
      setPromoApplied(true);
      setPromoDiscount(15);
      setPromoMessage('Weekend Escape 15% discount applied!');
      setBookingState((prev) => ({ ...prev, promoCode: code }));
    } else if (code === 'ROMANCE') {
      setPromoApplied(true);
      setPromoDiscount(20);
      setPromoMessage('Romantic Sanctuary 20% discount applied!');
      setBookingState((prev) => ({ ...prev, promoCode: code }));
    } else if (code === 'CORP2026') {
      setPromoApplied(true);
      setPromoDiscount(10);
      setPromoMessage('Executive Residence 10% discount applied!');
      setBookingState((prev) => ({ ...prev, promoCode: code }));
    } else {
      setPromoApplied(false);
      setPromoDiscount(0);
      setPromoMessage('Invalid or expired promotional code.');
    }
  };

  const handleAddonToggle = (addonId: string) => {
    setBookingState((prev) => {
      const exists = prev.selectedAddons.includes(addonId);
      return {
        ...prev,
        selectedAddons: exists
          ? prev.selectedAddons.filter((id) => id !== addonId)
          : [...prev.selectedAddons, addonId],
      };
    });
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    const reference = `AUR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const confirmed: ConfirmedBooking = {
      bookingReference: reference,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      bookingDetails: bookingState,
      room: selectedRoom,
      nights,
      subtotal,
      addonsTotal,
      taxAmount,
      serviceCharge,
      totalAmount,
    };

    // Save to Cloud Firestore
    try {
      await saveBooking({
        bookingReference: reference,
        userId: user?.uid,
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        checkIn: bookingState.checkIn,
        checkOut: bookingState.checkOut,
        nights,
        roomsCount: bookingState.roomsCount,
        adults: bookingState.adults,
        children: bookingState.children,
        guestName: `${bookingState.guest.title} ${bookingState.guest.firstName} ${bookingState.guest.lastName}`.trim(),
        guestEmail: bookingState.guest.email,
        guestPhone: bookingState.guest.phone,
        specialRequests: bookingState.guest.specialRequests,
        estimatedArrivalTime: bookingState.guest.estimatedArrivalTime,
        totalAmount,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      });
    } catch (saveErr) {
      console.error('Firestore save note:', saveErr);
    }

    setConfirmedBooking(confirmed);
    setStep(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCalendar = () => {
    const title = `Stay at The Aurelia - ${selectedRoom.name}`;
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:Reservation Reference: ${confirmedBooking?.bookingReference}. Address: 18 Aurelia Promenade, Riviera Bay.`,
      `LOCATION:${HOTEL_INFO.address}`,
      `DTSTART:${bookingState.checkIn.replace(/-/g, '')}`,
      `DTEND:${bookingState.checkOut.replace(/-/g, '')}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `aurelia-booking-${confirmedBooking?.bookingReference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Booking Funnel Header */}
        <div className="text-center mb-10">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold hover:text-[#101C2C] transition-colors"
          >
            ← Return to The Aurelia Homepage
          </button>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-[#101C2C] mt-2">
            Online Reservation Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#20252B]/75 mt-1">
            Best rate guarantee · Complimentary cancellation 48h prior · Secure booking guarantee
          </p>

          {/* Stepper (Steps 1 through 5) */}
          {step < 6 && (
            <div className="mt-8 flex items-center justify-center overflow-x-auto pb-2">
              <div className="flex items-center text-xs">
                {[
                  { num: 1, label: 'Dates & Stay' },
                  { num: 2, label: 'Select Residence' },
                  { num: 3, label: 'Enhance Stay' },
                  { num: 4, label: 'Guest Information' },
                  { num: 5, label: 'Review & Guarantee' },
                ].map((s, idx) => (
                  <React.Fragment key={s.num}>
                    <button
                      onClick={() => s.num < step && setStep(s.num)}
                      disabled={s.num > step}
                      className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                        step === s.num
                          ? 'text-[#101C2C] font-semibold'
                          : step > s.num
                          ? 'text-[#B89B5E] font-medium cursor-pointer'
                          : 'text-[#20252B]/40 cursor-not-allowed'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 flex items-center justify-center text-[11px] font-semibold rounded-full ${
                          step === s.num
                            ? 'bg-[#101C2C] text-white'
                            : step > s.num
                            ? 'bg-[#B89B5E] text-white'
                            : 'bg-[#E8E0D3] text-[#20252B]/60'
                        }`}
                      >
                        {step > s.num ? '✓' : s.num}
                      </span>
                      <span>{s.label}</span>
                    </button>
                    {idx < 4 && (
                      <span className="mx-3 text-[#E8E0D3] hidden sm:inline" aria-hidden="true">
                        —
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Body & Split View */}
        {step < 6 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Interactive Form Column (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-[#E8E0D3] p-6 sm:p-8 shadow-sm">
              {/* STEP 1: Dates & Guests */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-[#E8E0D3] pb-4">
                    <h2 className="text-xl font-serif font-semibold text-[#101C2C]">
                      1. Confirm Dates & Party Size
                    </h2>
                    <p className="text-xs text-[#20252B]/70 mt-1">
                      Choose your arrival and departure dates to inspect real-time room availability.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-[#E8E0D3] p-4 bg-[#F7F3EA]/30">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-2">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        value={bookingState.checkIn}
                        onChange={(e) =>
                          setBookingState({ ...bookingState, checkIn: e.target.value })
                        }
                        className="w-full bg-white border border-[#E8E0D3] p-2 text-xs sm:text-sm font-medium focus:border-[#B89B5E] focus:outline-none"
                      />
                      <span className="text-[10px] text-[#20252B]/60 mt-1 block">Check-in from 15:00</span>
                    </div>

                    <div className="border border-[#E8E0D3] p-4 bg-[#F7F3EA]/30">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-2">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        value={bookingState.checkOut}
                        onChange={(e) =>
                          setBookingState({ ...bookingState, checkOut: e.target.value })
                        }
                        className="w-full bg-white border border-[#E8E0D3] p-2 text-xs sm:text-sm font-medium focus:border-[#B89B5E] focus:outline-none"
                      />
                      <span className="text-[10px] text-[#20252B]/60 mt-1 block">Check-out until 12:00</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="border border-[#E8E0D3] p-3.5">
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                        Adults (13+)
                      </label>
                      <select
                        value={bookingState.adults}
                        onChange={(e) =>
                          setBookingState({ ...bookingState, adults: Number(e.target.value) })
                        }
                        className="w-full bg-transparent text-sm font-medium focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Adult' : 'Adults'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="border border-[#E8E0D3] p-3.5">
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                        Children (0–12)
                      </label>
                      <select
                        value={bookingState.children}
                        onChange={(e) =>
                          setBookingState({ ...bookingState, children: Number(e.target.value) })
                        }
                        className="w-full bg-transparent text-sm font-medium focus:outline-none"
                      >
                        {[0, 1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Child' : 'Children'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="border border-[#E8E0D3] p-3.5">
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                        Number of Residences
                      </label>
                      <select
                        value={bookingState.roomsCount}
                        onChange={(e) =>
                          setBookingState({ ...bookingState, roomsCount: Number(e.target.value) })
                        }
                        className="w-full bg-transparent text-sm font-medium focus:outline-none"
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Residence' : 'Residences'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E8E0D3] flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors flex items-center gap-2"
                    >
                      <span>Continue to Select Residence</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Room Selection */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E8E0D3] pb-4">
                    <div>
                      <h2 className="text-xl font-serif font-semibold text-[#101C2C]">
                        2. Select Your Residence or Suite
                      </h2>
                      <p className="text-xs text-[#20252B]/70 mt-1">
                        Pricing displayed is per night for {bookingState.roomsCount} residence(s), staying {nights} night(s).
                      </p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-[#B89B5E] hover:underline flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Edit Dates</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {ROOMS_DATA.map((room) => {
                      const isSelected = bookingState.selectedRoomId === room.id;
                      return (
                        <div
                          key={room.id}
                          onClick={() =>
                            setBookingState({ ...bookingState, selectedRoomId: room.id })
                          }
                          className={`p-4 border transition-all cursor-pointer flex flex-col md:flex-row gap-5 items-start md:items-center justify-between ${
                            isSelected
                              ? 'border-[#B89B5E] bg-[#B89B5E]/5 ring-1 ring-[#B89B5E]'
                              : 'border-[#E8E0D3] hover:border-[#B89B5E]/50 bg-white'
                          }`}
                        >
                          <div className="flex gap-4 items-center">
                            <img
                              src={room.images[0]}
                              alt={room.name}
                              className="w-24 h-20 object-cover shrink-0 border border-[#E8E0D3]"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-base font-serif font-semibold text-[#101C2C]">
                                  {room.name}
                                </h3>
                                {isSelected && (
                                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[#B89B5E] bg-white border border-[#B89B5E] px-2 py-0.5">
                                    Selected
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#20252B]/70 line-clamp-1 mt-0.5">
                                {room.headline}
                              </p>
                              <div className="flex items-center gap-2 text-[11px] text-[#20252B]/60 mt-2">
                                <span>{room.sizeSqm} m²</span>
                                <span>·</span>
                                <span>Up to {room.capacity} Guests</span>
                                <span>·</span>
                                <span>{room.bedType}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0 w-full md:w-auto flex md:flex-col justify-between items-center md:items-end border-t md:border-t-0 pt-3 md:pt-0 border-[#E8E0D3]">
                            <div>
                              <span className="text-lg font-serif font-bold text-[#101C2C]">
                                ${room.basePrice}
                              </span>
                              <span className="text-xs text-[#20252B]/60"> / night</span>
                            </div>
                            <span className="text-[11px] text-[#B89B5E] font-medium block">
                              Total ${room.basePrice * nights * bookingState.roomsCount} ({nights} nights)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-6 border-t border-[#E8E0D3] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs uppercase tracking-widest text-[#20252B]/70 hover:text-[#101C2C] flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors flex items-center gap-2"
                    >
                      <span>Continue to Enhancements</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Curated Add-ons */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-[#E8E0D3] pb-4">
                    <h2 className="text-xl font-serif font-semibold text-[#101C2C]">
                      3. Curated Enhancements & Experiences
                    </h2>
                    <p className="text-xs text-[#20252B]/70 mt-1">
                      Customize your sojourn with bespoke arrival touches, private dining, or wellness credits.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {BOOKING_ADDONS.map((addon) => {
                      const isChecked = bookingState.selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => handleAddonToggle(addon.id)}
                          className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                            isChecked
                              ? 'border-[#B89B5E] bg-[#B89B5E]/5 ring-1 ring-[#B89B5E]'
                              : 'border-[#E8E0D3] hover:border-[#B89B5E]/40 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="mt-1 h-4 w-4 text-[#B89B5E] rounded-none border-[#E8E0D3] focus:ring-[#B89B5E]"
                            />
                            <div>
                              <h4 className="text-sm font-semibold text-[#101C2C]">
                                {addon.name}
                              </h4>
                              <p className="text-xs text-[#20252B]/70 mt-0.5 max-w-lg">
                                {addon.description}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0 pl-4">
                            <span className="font-serif font-bold text-sm text-[#101C2C]">
                              ${addon.price}
                            </span>
                            <span className="text-[11px] text-[#20252B]/60 block">
                              {addon.perNight ? '/ night' : 'one-time'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-6 border-t border-[#E8E0D3] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs uppercase tracking-widest text-[#20252B]/70 hover:text-[#101C2C] flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors flex items-center gap-2"
                    >
                      <span>Continue to Guest Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Guest Details */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-[#E8E0D3] pb-4">
                    <h2 className="text-xl font-serif font-semibold text-[#101C2C]">
                      4. Primary Guest Information
                    </h2>
                    <p className="text-xs text-[#20252B]/70 mt-1">
                      Please enter your contact details. Your reservation confirmation will be transmitted here.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-1">
                        <label className="block text-[11px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                          Title
                        </label>
                        <select
                          value={bookingState.guest.title}
                          onChange={(e) =>
                            setBookingState({
                              ...bookingState,
                              guest: { ...bookingState.guest, title: e.target.value },
                            })
                          }
                          className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                        >
                          <option value="Mr">Mr.</option>
                          <option value="Mrs">Mrs.</option>
                          <option value="Ms">Ms.</option>
                          <option value="Dr">Dr.</option>
                          <option value="Lord">Lord</option>
                          <option value="Lady">Lady</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingState.guest.firstName}
                          onChange={(e) =>
                            setBookingState({
                              ...bookingState,
                              guest: { ...bookingState.guest, firstName: e.target.value },
                            })
                          }
                          placeholder="Julian"
                          className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingState.guest.lastName}
                        onChange={(e) =>
                          setBookingState({
                            ...bookingState,
                            guest: { ...bookingState.guest, lastName: e.target.value },
                          })
                        }
                        placeholder="Sterling"
                        className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={bookingState.guest.email}
                          onChange={(e) =>
                            setBookingState({
                              ...bookingState,
                              guest: { ...bookingState.guest, email: e.target.value },
                            })
                          }
                          placeholder="guest@residence.com"
                          className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                          Mobile Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookingState.guest.phone}
                          onChange={(e) =>
                            setBookingState({
                              ...bookingState,
                              guest: { ...bookingState.guest, phone: e.target.value },
                            })
                          }
                          placeholder="+1 (555) 019-2834"
                          className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                        Estimated Arrival Time
                      </label>
                      <select
                        value={bookingState.guest.estimatedArrivalTime}
                        onChange={(e) =>
                          setBookingState({
                            ...bookingState,
                            guest: { ...bookingState.guest, estimatedArrivalTime: e.target.value },
                          })
                        }
                        className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                      >
                        <option value="14:00 - 15:00">Early Arrival (14:00 - 15:00, Subject to availability)</option>
                        <option value="15:00 - 17:00">Standard Arrival (15:00 - 17:00)</option>
                        <option value="17:00 - 19:00">Evening Arrival (17:00 - 19:00)</option>
                        <option value="After 19:00">Late Arrival (After 19:00, Concierge desk notified)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                        Special Requests or Dietary Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={bookingState.guest.specialRequests}
                        onChange={(e) =>
                          setBookingState({
                            ...bookingState,
                            guest: { ...bookingState.guest, specialRequests: e.target.value },
                          })
                        }
                        placeholder="Feather allergies, champagne chilling preferences, quiet suite placement..."
                        className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E8E0D3] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs uppercase tracking-widest text-[#20252B]/70 hover:text-[#101C2C] flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!bookingState.guest.firstName || !bookingState.guest.lastName || !bookingState.guest.email) {
                          alert('Please enter your full name and email address to continue.');
                          return;
                        }
                        setStep(5);
                      }}
                      className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors flex items-center gap-2"
                    >
                      <span>Review & Guarantee Reservation</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Guarantee */}
              {step === 5 && (
                <form onSubmit={handleConfirmReservation} className="space-y-6">
                  <div className="border-b border-[#E8E0D3] pb-4">
                    <h2 className="text-xl font-serif font-semibold text-[#101C2C]">
                      5. Review Reservation & Payment Guarantee
                    </h2>
                    <p className="text-xs text-[#20252B]/70 mt-1">
                      No charge is incurred today for flexible rates. A valid card secures the residence in our verified register.
                    </p>
                  </div>

                  {/* Summary card */}
                  <div className="p-4 bg-[#F7F3EA] border border-[#E8E0D3] space-y-2 text-xs text-[#20252B]/80">
                    <p>
                      <strong>Primary Guest:</strong> {bookingState.guest.title} {bookingState.guest.firstName} {bookingState.guest.lastName} ({bookingState.guest.email})
                    </p>
                    <p>
                      <strong>Residence:</strong> {selectedRoom.name} ({bookingState.roomsCount} Unit)
                    </p>
                    <p>
                      <strong>Stay Duration:</strong> {bookingState.checkIn} to {bookingState.checkOut} ({nights} nights)
                    </p>
                    <p>
                      <strong>Party Size:</strong> {bookingState.adults} Adults{bookingState.children > 0 ? `, ${bookingState.children} Children` : ''}
                    </p>
                  </div>

                  {/* Payment Card Guarantee */}
                  <div className="border border-[#E8E0D3] p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E8E0D3] pb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#B89B5E]" />
                        <span className="text-xs uppercase tracking-wider font-semibold text-[#101C2C]">
                          Credit Card Guarantee
                        </span>
                      </div>
                      <span className="text-[11px] text-[#20252B]/60">256-Bit SSL Encrypted</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          required
                          value={cardDetails.nameOnCard || `${bookingState.guest.firstName} ${bookingState.guest.lastName}`}
                          onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })}
                          placeholder="Name as it appears on card"
                          className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={19}
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            placeholder="•••• •••• •••• ••••"
                            className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                              Expiry
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="MM/YY"
                              maxLength={5}
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                              className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none text-center"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                              CVC
                            </label>
                            <input
                              type="password"
                              required
                              placeholder="•••"
                              maxLength={4}
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                              className="w-full border border-[#E8E0D3] p-2.5 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none text-center font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-[#20252B]/70 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#B89B5E] shrink-0 mt-0.5" />
                      <span>
                        Your card will not be charged now. Final settlement occurs during check-in or upon departure according to selected rate terms.
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E8E0D3] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="text-xs uppercase tracking-widest text-[#20252B]/70 hover:text-[#101C2C] flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors shadow-sm"
                    >
                      Confirm & Guarantee Residence
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Sticky Price Breakdown Column (4 cols) */}
            <div className="lg:col-span-4 bg-white border border-[#E8E0D3] p-6 shadow-sm sticky top-28 space-y-5">
              <h3 className="text-base font-serif font-semibold text-[#101C2C] border-b border-[#E8E0D3] pb-3">
                Reservation Summary
              </h3>

              {/* Selected Suite Preview */}
              <div className="flex gap-3 items-center">
                <img
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  className="w-16 h-14 object-cover border border-[#E8E0D3]"
                />
                <div>
                  <h4 className="text-xs font-serif font-bold text-[#101C2C]">
                    {selectedRoom.name}
                  </h4>
                  <p className="text-[11px] text-[#20252B]/60">
                    {bookingState.checkIn} to {bookingState.checkOut}
                  </p>
                  <p className="text-[11px] text-[#B89B5E]">
                    {nights} {nights === 1 ? 'Night' : 'Nights'} · {bookingState.adults + bookingState.children} Guests
                  </p>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-2">
                <label className="block text-[10px] uppercase tracking-wider text-[#101C2C] font-semibold mb-1">
                  Promotional or Corporate Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. WEEKEND15"
                    className="w-full border border-[#E8E0D3] px-2.5 py-1.5 text-xs uppercase text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-[#101C2C] text-white text-xs px-3 font-semibold uppercase hover:bg-[#1E3048]"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] mt-1 ${
                      promoApplied ? 'text-emerald-700 font-medium' : 'text-red-600'
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </div>

              {/* Detailed Line Item Price Breakdown */}
              <div className="space-y-2.5 pt-3 border-t border-[#E8E0D3] text-xs">
                <div className="flex justify-between text-[#20252B]/80">
                  <span>
                    ${selectedRoom.basePrice} × {nights} nights × {bookingState.roomsCount} room(s)
                  </span>
                  <span className="font-medium text-[#101C2C] tabular-nums">${rawRoomTotal}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Special Offer Reduction ({promoDiscount}%)</span>
                    <span className="tabular-nums">-${discountAmount}</span>
                  </div>
                )}

                {/* Addons lines */}
                {bookingState.selectedAddons.map((addonId) => {
                  const addon = BOOKING_ADDONS.find((a) => a.id === addonId);
                  if (!addon) return null;
                  const cost = addon.perNight ? addon.price * nights : addon.price;
                  return (
                    <div key={addon.id} className="flex justify-between text-[#20252B]/75 text-[11px]">
                      <span className="truncate pr-2">{addon.name}</span>
                      <span className="font-medium text-[#101C2C] tabular-nums shrink-0">
                        ${cost}
                      </span>
                    </div>
                  );
                })}

                <div className="flex justify-between text-[#20252B]/80 pt-1 border-t border-[#E8E0D3]/60">
                  <span>Lodging Occupancy Tax (12%)</span>
                  <span className="tabular-nums">${taxAmount}</span>
                </div>

                <div className="flex justify-between text-[#20252B]/80">
                  <span>Hospitality Service Charge (5%)</span>
                  <span className="tabular-nums">${serviceCharge}</span>
                </div>

                {/* Total */}
                <div className="pt-3 border-t border-[#E8E0D3] flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-semibold uppercase tracking-wider text-[#101C2C] block">
                      Total Due
                    </span>
                    <span className="text-[10px] text-[#20252B]/60">Taxes & fees included</span>
                  </div>
                  <span className="text-2xl font-serif font-bold text-[#B89B5E] tabular-nums">
                    ${totalAmount}
                  </span>
                </div>
              </div>

              {/* Guarantees list */}
              <div className="pt-2 text-[11px] text-[#20252B]/70 space-y-1.5 border-t border-[#E8E0D3]">
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Free cancellation up to 48h prior</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>Direct booking VIP arrival welcome</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>Complimentary high-speed fiber Wi-Fi</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 6: Confirmation Screen */
          confirmedBooking && (
            <div className="bg-white border border-[#E8E0D3] shadow-md p-8 sm:p-12 max-w-3xl mx-auto space-y-8 animate-fadeIn">
              <div className="text-center space-y-2 border-b border-[#E8E0D3] pb-8">
                <CheckCircle2 className="w-16 h-16 text-[#B89B5E] mx-auto mb-2" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B89B5E] block">
                  Reservation Confirmed & Guaranteed
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#101C2C]">
                  We Look Forward to Welcoming You
                </h2>
                <p className="text-xs sm:text-sm text-[#20252B]/75 max-w-md mx-auto">
                  A formal reservation portfolio and access code have been transmitted to{' '}
                  <strong>{confirmedBooking.bookingDetails.guest.email}</strong>.
                </p>
              </div>

              {/* Booking Reference Box */}
              <div className="bg-[#F7F3EA] border border-[#B89B5E]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#20252B]/60 block font-semibold">
                    Booking Reference Number
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#101C2C] tracking-wider">
                    {confirmedBooking.bookingReference}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-widest text-[#20252B]/60 block font-semibold">
                    Guaranteed Rate Total
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#B89B5E]">
                    ${confirmedBooking.totalAmount}
                  </span>
                </div>
              </div>

              {/* Guest & Stay Specification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#20252B]/85">
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-[0.16em] font-bold text-[#101C2C] border-b border-[#E8E0D3] pb-1">
                    Stay Particulars
                  </h4>
                  <p><strong>Residence:</strong> {confirmedBooking.room.name}</p>
                  <p><strong>Check-in:</strong> {confirmedBooking.bookingDetails.checkIn} (From 15:00)</p>
                  <p><strong>Check-out:</strong> {confirmedBooking.bookingDetails.checkOut} (Until 12:00)</p>
                  <p><strong>Duration:</strong> {confirmedBooking.nights} Night(s) · {confirmedBooking.bookingDetails.roomsCount} Unit(s)</p>
                  <p><strong>Party:</strong> {confirmedBooking.bookingDetails.adults} Adults{confirmedBooking.bookingDetails.children > 0 ? `, ${confirmedBooking.bookingDetails.children} Children` : ''}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-[0.16em] font-bold text-[#101C2C] border-b border-[#E8E0D3] pb-1">
                    Guest Credentials
                  </h4>
                  <p><strong>Name:</strong> {confirmedBooking.bookingDetails.guest.title} {confirmedBooking.bookingDetails.guest.firstName} {confirmedBooking.bookingDetails.guest.lastName}</p>
                  <p><strong>Email:</strong> {confirmedBooking.bookingDetails.guest.email}</p>
                  <p><strong>Phone:</strong> {confirmedBooking.bookingDetails.guest.phone}</p>
                  <p><strong>Est. Arrival:</strong> {confirmedBooking.bookingDetails.guest.estimatedArrivalTime}</p>
                  {confirmedBooking.bookingDetails.guest.specialRequests && (
                    <p><strong>Special Requests:</strong> {confirmedBooking.bookingDetails.guest.specialRequests}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons: Print, Calendar, Return */}
              <div className="pt-6 border-t border-[#E8E0D3] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="border border-[#E8E0D3] hover:border-[#101C2C] text-[#101C2C] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>

                  <button
                    onClick={handleDownloadCalendar}
                    className="border border-[#E8E0D3] hover:border-[#101C2C] text-[#101C2C] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Add to Calendar</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setConfirmedBooking(null);
                      setStep(1);
                    }}
                    className="text-xs uppercase tracking-wider text-[#20252B]/70 hover:text-[#101C2C]"
                  >
                    Book Another Stay
                  </button>
                  <button
                    onClick={() => onNavigate('home')}
                    className="bg-[#101C2C] hover:bg-[#B89B5E] text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Return to Home
                  </button>
                </div>
              </div>

              {/* Concierge Assistance notice */}
              <div className="bg-[#101C2C] text-[#F7F3EA] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div>
                  <p className="font-serif text-sm font-semibold text-[#B89B5E]">
                    Require airport chauffeur or custom itinerary arrangements?
                  </p>
                  <p className="text-[#E8E0D3]/75 mt-0.5">
                    Our 24-hour head concierge is at your service.
                  </p>
                </div>
                <a
                  href={`tel:${HOTEL_INFO.conciergePhone}`}
                  className="bg-[#B89B5E] hover:bg-[#A3864A] text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap"
                >
                  Call Concierge Desk
                </a>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase/authContext';
import { fetchUserBookings, cancelUserBooking, FirestoreBooking } from '../firebase/services';
import { X, Calendar, Clock, MapPin, XCircle, Loader2 } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<FirestoreBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !user) return;
    loadBookings();
  }, [isOpen, user]);

  const loadBookings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchUserBookings(user.uid);
      setBookings(data || []);
    } catch (err) {
      console.error('Failed to load user bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (booking: FirestoreBooking) => {
    if (!confirm(`Are you sure you wish to cancel reservation ${booking.bookingReference}?`)) {
      return;
    }
    const cleanId = booking.bookingReference.replace(/[^a-zA-Z0-9_-]/g, '-');
    setCancellingId(cleanId);
    try {
      await cancelUserBooking(cleanId);
      await loadBookings();
    } catch (err) {
      console.error('Failed to cancel booking:', err);
    } finally {
      setCancellingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-[#101C2C]/65 backdrop-blur-xs" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white border border-[#E8E0D3] shadow-2xl p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#20252B]/60 hover:text-[#101C2C]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="border-b border-[#E8E0D3] pb-4 mb-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B89B5E] block">
              Guest Portfolio
            </span>
            <h3 className="text-2xl font-serif font-semibold text-[#101C2C] mt-1">
              Your Aurelia Reservations
            </h3>
            <p className="text-xs text-[#20252B]/70 mt-1">
              Securely synchronized with your cloud guest record in real time.
            </p>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-xs text-[#20252B]/60">
              <Loader2 className="w-6 h-6 animate-spin text-[#B89B5E]" />
              <span>Retrieving your reservations from Firestore...</span>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Calendar className="w-12 h-12 text-[#E8E0D3] mx-auto" />
              <h4 className="text-base font-serif font-semibold text-[#101C2C]">
                No Active Reservations Found
              </h4>
              <p className="text-xs text-[#20252B]/70 max-w-sm mx-auto">
                You have no upcoming or past reservations associated with this guest account.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="bg-[#B89B5E] text-white text-xs uppercase tracking-widest px-6 py-3 font-semibold hover:bg-[#A3864A] transition-colors"
              >
                Reserve A Residence
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {bookings.map((booking) => (
                <div
                  key={booking.bookingReference}
                  className="p-5 border border-[#E8E0D3] bg-[#F7F3EA]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#B89B5E]/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#101C2C]">
                        {booking.bookingReference}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 border ${
                          booking.status === 'confirmed'
                            ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                            : 'text-amber-800 bg-amber-50 border-amber-200'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <h4 className="text-base font-serif font-bold text-[#101C2C]">
                      {booking.roomName}
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-[#20252B]/70">
                      <span>{booking.checkIn} to {booking.checkOut}</span>
                      <span>·</span>
                      <span>{booking.nights} night(s)</span>
                      <span>·</span>
                      <span>${booking.totalAmount} Total</span>
                    </div>

                    <p className="text-[11px] text-[#20252B]/60">
                      Guest: {booking.guestName} ({booking.guestEmail})
                    </p>
                  </div>

                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancel(booking)}
                      disabled={cancellingId === booking.bookingReference}
                      className="border border-red-300 text-red-700 hover:bg-red-50 text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 transition-colors flex items-center gap-1 shrink-0"
                    >
                      {cancellingId === booking.bookingReference ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      <span>Cancel Stay</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

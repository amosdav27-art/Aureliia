import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError, OperationType } from './errors';

export interface FirestoreBooking {
  bookingReference: string;
  userId?: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomsCount: number;
  adults: number;
  children?: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  specialRequests?: string;
  estimatedArrivalTime?: string;
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface FirestoreDiningReservation {
  venueId: string;
  venueName: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  guests: string;
  notes?: string;
  createdAt: string;
}

export interface FirestoreInquiry {
  name: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
  createdAt: string;
}

// 1. Save room booking
export async function saveBooking(booking: FirestoreBooking): Promise<string> {
  const cleanId = booking.bookingReference.replace(/[^a-zA-Z0-9_-]/g, '-');
  const path = `bookings/${cleanId}`;
  try {
    const docRef = doc(db, 'bookings', cleanId);
    // Construct clean sanitized payload according to blueprint
    const payload: Record<string, any> = {
      bookingReference: booking.bookingReference.slice(0, 32),
      roomId: booking.roomId.slice(0, 64),
      roomName: booking.roomName.slice(0, 128),
      checkIn: booking.checkIn.slice(0, 10),
      checkOut: booking.checkOut.slice(0, 10),
      nights: Number(booking.nights),
      roomsCount: Number(booking.roomsCount),
      adults: Number(booking.adults),
      guestName: booking.guestName.slice(0, 128),
      guestEmail: booking.guestEmail.slice(0, 128),
      totalAmount: Number(booking.totalAmount),
      status: booking.status,
      createdAt: booking.createdAt.slice(0, 64),
    };

    if (booking.userId) payload.userId = booking.userId.slice(0, 128);
    if (booking.children !== undefined) payload.children = Number(booking.children);
    if (booking.guestPhone) payload.guestPhone = booking.guestPhone.slice(0, 32);
    if (booking.specialRequests) payload.specialRequests = booking.specialRequests.slice(0, 1000);
    if (booking.estimatedArrivalTime) payload.estimatedArrivalTime = booking.estimatedArrivalTime.slice(0, 64);

    await setDoc(docRef, payload);
    return cleanId;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// 2. Fetch bookings for a specific user
export async function fetchUserBookings(userId: string): Promise<FirestoreBooking[]> {
  const path = 'bookings';
  try {
    const q = query(
      collection(db, path),
      where('userId', '==', userId)
    );
    const snap = await getDocs(q);
    const bookings: FirestoreBooking[] = [];
    snap.forEach((d) => {
      bookings.push(d.data() as FirestoreBooking);
    });
    return bookings;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

// 3. Cancel a booking
export async function cancelUserBooking(bookingId: string): Promise<void> {
  const path = `bookings/${bookingId}`;
  try {
    const docRef = doc(db, 'bookings', bookingId);
    await updateDoc(docRef, {
      status: 'cancelled',
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

// 4. Save dining reservation
export async function saveDiningReservation(data: FirestoreDiningReservation): Promise<string> {
  const id = `dine-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const path = `dining_reservations/${id}`;
  try {
    const docRef = doc(db, 'dining_reservations', id);
    const payload: Record<string, any> = {
      venueId: data.venueId.slice(0, 64),
      venueName: data.venueName.slice(0, 128),
      name: data.name.slice(0, 128),
      email: data.email.slice(0, 128),
      date: data.date.slice(0, 10),
      time: data.time.slice(0, 16),
      guests: String(data.guests).slice(0, 32),
      createdAt: data.createdAt.slice(0, 64),
    };
    if (data.phone) payload.phone = data.phone.slice(0, 32);
    if (data.notes) payload.notes = data.notes.slice(0, 500);

    await setDoc(docRef, payload);
    return id;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// 5. Save inquiry
export async function saveInquiry(data: FirestoreInquiry): Promise<string> {
  const id = `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const path = `inquiries/${id}`;
  try {
    const docRef = doc(db, 'inquiries', id);
    const payload: Record<string, any> = {
      name: data.name.slice(0, 128),
      email: data.email.slice(0, 128),
      category: data.category.slice(0, 64),
      message: data.message.slice(0, 2000),
      createdAt: data.createdAt.slice(0, 64),
    };
    if (data.phone) payload.phone = data.phone.slice(0, 32);

    await setDoc(docRef, payload);
    return id;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// 6. Save newsletter subscription
export async function saveNewsletterSubscription(email: string): Promise<string> {
  const cleanEmail = email.trim().toLowerCase();
  const id = `sub-${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
  const path = `newsletter_subscribers/${id}`;
  try {
    const docRef = doc(db, 'newsletter_subscribers', id);
    await setDoc(docRef, {
      email: cleanEmail.slice(0, 128),
      subscribedAt: new Date().toISOString(),
    });
    return id;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageType } from './types/hotel';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { DiningPage } from './pages/DiningPage';
import { AmenitiesPage } from './pages/AmenitiesPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { OffersPage } from './pages/OffersPage';
import { GalleryPage } from './pages/GalleryPage';
import { LocationPage } from './pages/LocationPage';
import { ContactPage } from './pages/ContactPage';
import { BookingFlow } from './pages/BookingFlow';
import { MyBookingsModal } from './components/MyBookingsModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [bookingRoomId, setBookingRoomId] = useState<string | null>(null);
  const [myBookingsOpen, setMyBookingsOpen] = useState(false);

  // Sync with URL query parameter on initial load and popstate
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') as PageType;
    if (pageParam && ['home', 'rooms', 'dining', 'amenities', 'experiences', 'offers', 'gallery', 'location', 'contact', 'booking'].includes(pageParam)) {
      setCurrentPage(pageParam);
    }

    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const popPage = (currentParams.get('page') as PageType) || 'home';
      setCurrentPage(popPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    setBookingRoomId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL query parameter without full reload
    const url = new URL(window.location.href);
    if (page === 'home') {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', page);
    }
    window.history.pushState({}, '', url.toString());

    // Update dynamic document title for SEO
    const pageTitles: Record<PageType, string> = {
      home: 'The Aurelia — Luxury Hotel & Residences',
      rooms: 'Suites & Residences | The Aurelia',
      dining: 'Michelin Dining & Obsidian Lounge | The Aurelia',
      amenities: 'Imperial Spa & Hydrotherapy Pool | The Aurelia',
      experiences: 'Curated Coastal Experiences | The Aurelia',
      offers: 'Special Offers & Packages | The Aurelia',
      gallery: 'Visual Gallery & Portfolio | The Aurelia',
      location: 'Location & Arrival | The Aurelia',
      contact: 'Concierge & FAQ | The Aurelia',
      booking: 'Online Reservation Portal | The Aurelia',
    };
    document.title = pageTitles[page] || 'The Aurelia — Luxury Hotel & Residences';
  };

  const handleOpenBooking = (roomId?: string) => {
    setBookingRoomId(roomId || null);
    handleNavigate('booking');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EA] text-[#20252B] selection:bg-[#B89B5E] selection:text-white">
      {/* Global Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenMyBookings={() => setMyBookingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1" id="main-content">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'rooms' && (
          <RoomsPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'dining' && (
          <DiningPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'amenities' && (
          <AmenitiesPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'experiences' && (
          <ExperiencesPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'offers' && (
          <OffersPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'location' && (
          <LocationPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'booking' && (
          <BookingFlow
            initialRoomId={bookingRoomId}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* My Reservations Cloud Modal */}
      <MyBookingsModal
        isOpen={myBookingsOpen}
        onClose={() => setMyBookingsOpen(false)}
        onOpenBooking={() => {
          setMyBookingsOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Global Luxury Footer */}
      <Footer onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { PageType } from '../types/hotel';
import { Menu, X, Phone, Calendar, User as UserIcon, LogOut, Bookmark } from 'lucide-react';
import { useAuth } from '../firebase/authContext';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenBooking: (roomId?: string) => void;
  onOpenMyBookings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenMyBookings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loginWithGoogle, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PageType }[] = [
    { label: 'Rooms & Suites', page: 'rooms' },
    { label: 'Dining', page: 'dining' },
    { label: 'Amenities', page: 'amenities' },
    { label: 'Experiences', page: 'experiences' },
    { label: 'Offers', page: 'offers' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Location', page: 'location' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#F7F3EA]/95 backdrop-blur-md shadow-xs border-b border-[#E8E0D3]'
            : 'bg-[#F7F3EA] border-b border-[#E8E0D3]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark (Single text element in serif display) */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-xl sm:text-2xl font-serif tracking-[0.2em] font-semibold text-[#101C2C] hover:text-[#B89B5E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B5E]"
            aria-label="The Aurelia Hotel & Residences Home"
          >
            THE AURELIA
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-xs uppercase tracking-[0.14em] font-medium transition-colors py-1 relative whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B5E] ${
                    isActive ? 'text-[#101C2C] font-semibold' : 'text-[#20252B]/75 hover:text-[#101C2C]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B89B5E]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Guest Profile + Book Now CTA) */}
          <div className="flex items-center gap-3">
            {/* Guest Authentication Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 text-xs text-[#101C2C] border border-[#E8E0D3] bg-white px-3 py-2 hover:border-[#B89B5E] transition-colors"
                  aria-label="Guest Account Menu"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Guest'}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-4 h-4 text-[#B89B5E]" />
                  )}
                  <span className="hidden sm:inline font-medium max-w-[100px] truncate">
                    {user.displayName?.split(' ')[0] || 'Guest'}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E8E0D3] shadow-xl py-2 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-[#E8E0D3]/80">
                      <p className="font-semibold text-[#101C2C] truncate">{user.displayName || 'Resident'}</p>
                      <p className="text-[11px] text-[#20252B]/60 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        if (onOpenMyBookings) onOpenMyBookings();
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#F7F3EA] text-[#101C2C] flex items-center gap-2"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-[#B89B5E]" />
                      <span>My Reservations</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#F7F3EA] text-[#20252B]/75 flex items-center gap-2 border-t border-[#E8E0D3]/60"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => loginWithGoogle()}
                className="hidden sm:flex items-center gap-1.5 text-xs text-[#101C2C] border border-[#E8E0D3] hover:border-[#B89B5E] px-3.5 py-2.5 transition-colors uppercase tracking-wider font-semibold"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#B89B5E]" />
                <span>Guest Sign In</span>
              </button>
            )}

            <button
              onClick={() => onOpenBooking()}
              className="bg-[#B89B5E] hover:bg-[#A3864A] text-white text-xs font-semibold uppercase tracking-[0.14em] px-5 py-3 rounded-none transition-colors shadow-xs whitespace-nowrap flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101C2C]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#101C2C] hover:text-[#B89B5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B5E]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="fixed inset-0 bg-[#101C2C]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-[#101C2C] text-[#F7F3EA] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="font-serif text-lg tracking-[0.2em] font-semibold text-white">THE AURELIA</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#E8E0D3] hover:text-white"
                  aria-label="Close Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Guest Account Status */}
              <div className="mb-6 pb-4 border-b border-white/10">
                {user ? (
                  <div className="space-y-2">
                    <p className="text-xs text-[#E8E0D3]/80">
                      Welcome, <span className="text-white font-semibold">{user.displayName || user.email}</span>
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (onOpenMyBookings) onOpenMyBookings();
                        }}
                        className="text-xs text-[#B89B5E] hover:underline flex items-center gap-1"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>My Reservations</span>
                      </button>
                      <span className="text-white/20">|</span>
                      <button
                        onClick={() => logout()}
                        className="text-xs text-[#E8E0D3]/60 hover:text-white"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      loginWithGoogle();
                    }}
                    className="w-full border border-white/20 text-white text-xs uppercase tracking-wider py-2.5 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#B89B5E]" />
                    <span>Sign In With Google</span>
                  </button>
                )}
              </div>

              <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`text-left text-sm uppercase tracking-widest py-2 transition-colors ${
                    currentPage === 'home' ? 'text-[#B89B5E] font-semibold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  Home
                </button>
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`text-left text-sm uppercase tracking-widest py-2 transition-colors ${
                      currentPage === item.page ? 'text-[#B89B5E] font-semibold' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#B89B5E] hover:bg-[#A3864A] text-white py-3.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Stay</span>
              </button>

              <div className="text-xs text-[#E8E0D3]/70 space-y-1 pt-2">
                <p className="flex items-center gap-2 text-white">
                  <Phone className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>Direct Reservations: +1 (800) 555-0199</span>
                </p>
                <p>18 Aurelia Promenade, Riviera Bay, CA</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

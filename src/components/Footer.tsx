import React, { useState } from 'react';
import { PageType } from '../types/hotel';
import { HOTEL_INFO } from '../data/hotelData';
import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

import { saveNewsletterSubscription } from '../firebase/services';

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    try {
      await saveNewsletterSubscription(newsletterEmail);
    } catch (err) {
      console.error('Failed to save newsletter subscription to Firestore:', err);
    }
    setSubscribed(true);
  };

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Rooms & Suites', page: 'rooms' },
    { label: 'Dining & Lounge', page: 'dining' },
    { label: 'Imperial Spa & Wellness', page: 'amenities' },
    { label: 'Curated Experiences', page: 'experiences' },
    { label: 'Seasonal Offers', page: 'offers' },
    { label: 'Visual Gallery', page: 'gallery' },
    { label: 'Location & Arrival', page: 'location' },
    { label: 'Contact & Concierge', page: 'contact' },
  ];

  return (
    <footer className="bg-[#101C2C] text-[#F7F3EA] border-t border-[#B89B5E]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Col 1: Brand & Heritage */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-serif tracking-[0.25em] font-semibold text-white hover:text-[#B89B5E] transition-colors text-left"
            >
              THE AURELIA
            </button>
            <p className="text-xs uppercase tracking-widest text-[#B89B5E]">
              Luxury Hotel & Residences
            </p>
            <p className="text-sm text-[#E8E0D3]/80 leading-relaxed max-w-sm">
              An intimate coastal sanctuary founded on timeless architectural elegance, Michelin-caliber culinary artistry, and intuitive hospitality.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] hover:text-white font-medium group transition-colors"
              >
                <span>Reserve A Residence</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.16em] text-white font-semibold">
              Explore The Hotel
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      onNavigate(link.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-sm text-[#E8E0D3]/75 hover:text-[#B89B5E] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Arrival */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.16em] text-white font-semibold">
              Direct Inquiries
            </h4>
            <div className="space-y-3 text-sm text-[#E8E0D3]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B89B5E] shrink-0 mt-0.5" />
                <span className="leading-snug">{HOTEL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B89B5E] shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-white transition-colors">
                  {HOTEL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B89B5E] shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white transition-colors">
                  {HOTEL_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.16em] text-white font-semibold">
              The Aurelia Gazette
            </h4>
            <p className="text-xs text-[#E8E0D3]/75 leading-relaxed">
              Receive curated invitations to seasonal culinary degustations, private suite previews, and cultural events.
            </p>

            {subscribed ? (
              <div className="bg-[#101C2C] border border-[#B89B5E] p-3 text-xs text-[#F7F3EA] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#B89B5E] shrink-0" />
                <span>Thank you. You have been added to our private guest register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-white/5 border border-white/15 px-3 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#B89B5E]"
                    aria-label="Email for hotel newsletter"
                  />
                  <button
                    type="submit"
                    className="bg-[#B89B5E] hover:bg-[#A3864A] text-white text-xs px-4 font-semibold tracking-wider uppercase transition-colors shrink-0"
                  >
                    Join
                  </button>
                </div>
                {emailError && <p className="text-xs text-red-300">{emailError}</p>}
                <p className="text-[11px] text-[#E8E0D3]/50">
                  We respect your privacy. You may unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Quiet legal, copyright */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8E0D3]/60 gap-4">
          <p>© {new Date().getFullYear()} {HOTEL_INFO.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors"
            >
              Terms of Residence
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors"
            >
              Accessibility (ADA)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

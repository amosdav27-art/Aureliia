import React, { useState } from 'react';
import { PageType, FAQItem } from '../types/hotel';
import { HOTEL_INFO, FAQ_DATA } from '../data/hotelData';
import { Mail, Phone, MapPin, Clock, MessageSquare, ChevronDown, CheckCircle2, Send } from 'lucide-react';

import { saveInquiry } from '../firebase/services';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Reservations & Rates',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_DATA[0].id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to save inquiry to Firestore:', err);
    }
    setFormSubmitted(true);
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="bg-[#F7F3EA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
            Direct Inquiries & Assistance
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#101C2C]">
            Contact Our Concierge & Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#20252B]/75 leading-relaxed">
            Our Clefs d'Or international concierge and reservation specialists are at your complete disposal around the clock.
          </p>
        </div>

        {/* Contact Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Col: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E8E0D3] p-6 sm:p-10 shadow-xs">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#B89B5E] font-bold block">
                    Online Correspondence
                  </span>
                  <h2 className="text-2xl font-serif font-semibold text-[#101C2C] mt-1">
                    Send a Discreet Inquiry
                  </h2>
                  <p className="text-xs text-[#20252B]/70 mt-1">
                    We endeavor to respond to all guest correspondence within two hours.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lady Vivienne Sterling"
                      className="w-full border border-[#E8E0D3] p-3 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="guest@residence.com"
                        className="w-full border border-[#E8E0D3] p-3 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 0192"
                        className="w-full border border-[#E8E0D3] p-3 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                      Inquiry Department
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full border border-[#E8E0D3] p-3 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none bg-white"
                    >
                      <option value="Reservations & Rates">Room & Suite Reservations</option>
                      <option value="Concierge & Chauffeur">Concierge & Chauffeur Transfers</option>
                      <option value="Dining & Banquets">Private Dining & Event Banquets</option>
                      <option value="Spa & Wellness">Imperial Spa Appointments</option>
                      <option value="General Management">General Hotel Management</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#101C2C] mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share your anticipated dates, room requirements, or private arrangement requests..."
                      className="w-full border border-[#E8E0D3] p-3 text-xs text-[#20252B] focus:border-[#B89B5E] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#B89B5E] hover:bg-[#A3864A] text-white py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Message to Concierge</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[#B89B5E] mx-auto" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B89B5E] block">
                  Message Dispatched
                </span>
                <h3 className="text-2xl font-serif font-semibold text-[#101C2C]">
                  Thank You, {formData.name}
                </h3>
                <p className="text-xs text-[#20252B]/75 max-w-md mx-auto leading-relaxed">
                  Your communication has been routed directly to our {formData.category} department. A senior concierge officer will contact you at <strong>{formData.email}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        category: 'Reservations & Rates',
                        message: '',
                      });
                    }}
                    className="bg-[#101C2C] text-white px-6 py-2.5 text-xs uppercase tracking-wider font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Direct Lines & WhatsApp (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#101C2C] text-[#F7F3EA] p-8 border border-[#B89B5E]/30 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#B89B5E] font-semibold block">
                  Direct Contact
                </span>
                <h3 className="text-2xl font-serif font-semibold text-white mt-1">
                  24-Hour Concierge Desk
                </h3>
                <p className="text-xs text-[#E8E0D3]/75 mt-1 leading-relaxed">
                  For immediate suite inquiries, flight updates, or emergency itinerary requests.
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#E8E0D3]/85 border-t border-white/10 pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B89B5E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Physical Address</span>
                    <span>{HOTEL_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B89B5E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Direct Reservations</span>
                    <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-[#B89B5E] transition-colors">
                      {HOTEL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B89B5E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Concierge Email</span>
                    <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-[#B89B5E] transition-colors">
                      {HOTEL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B89B5E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Reception & Valet</span>
                    <span>24 Hours Daily · 365 Days a Year</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Link */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/18005550199?text=${encodeURIComponent('Hello The Aurelia Concierge, I would like to inquire about reservation availability.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#B89B5E] hover:bg-[#A3864A] text-white py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message Concierge via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 15. FAQ ACCORDION SECTION */}
        <div className="bg-white border border-[#E8E0D3] p-6 sm:p-10 shadow-xs space-y-8">
          <div className="border-b border-[#E8E0D3] pb-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
              Guest Policies & Answers
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#101C2C] mt-1">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#20252B]/70 mt-1">
              Key guidance on arrival, check-in, children, pets, transport, and cancellations.
            </p>
          </div>

          <div className="divide-y divide-[#E8E0D3]">
            {FAQ_DATA.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div key={item.id} className="py-4">
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex items-center justify-between text-left group focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-serif font-semibold text-[#101C2C] group-hover:text-[#B89B5E] transition-colors pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B89B5E] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-[#20252B]/80 leading-relaxed pr-6 animate-fadeIn">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

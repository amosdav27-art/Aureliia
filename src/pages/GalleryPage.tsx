import React, { useState } from 'react';
import { PageType } from '../types/hotel';
import { GALLERY_ITEMS } from '../data/hotelData';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { Eye, Maximize } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const categories = ['All', 'Rooms', 'Hotel', 'Dining', 'Pool & Spa', 'Experiences'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="bg-[#F7F3EA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold block">
            Visual Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-[#101C2C]">
            The Aurelia Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#20252B]/75 leading-relaxed">
            A photographic tour through our architectural facades, suites, dining salons, and coastal gardens.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-[#101C2C] text-white shadow-xs'
                  : 'bg-white text-[#20252B]/80 hover:bg-[#E8E0D3] border border-[#E8E0D3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                const globalIndex = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
                setLightboxIndex(globalIndex >= 0 ? globalIndex : idx);
                setLightboxOpen(true);
              }}
              className="group relative aspect-4/3 overflow-hidden bg-[#101C2C]/10 border border-[#E8E0D3] cursor-pointer shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101C2C]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#B89B5E]">
                  {item.category}
                </span>
                <h4 className="font-serif text-base font-semibold mt-0.5">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#E8E0D3]/80 mt-2">
                  <Maximize className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <GalleryLightbox
          items={GALLERY_ITEMS}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      </div>
    </div>
  );
};

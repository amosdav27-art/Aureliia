import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101C2C]/95 backdrop-blur-md">
      {/* Top Header bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between text-white z-10 border-b border-white/10">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#B89B5E] block">
            {currentItem.category}
          </span>
          <h4 className="text-sm sm:text-base font-serif font-medium">{currentItem.title}</h4>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-[#E8E0D3]/70 tabular-nums">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-none transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Frame */}
      <div className="relative max-w-5xl max-h-[80vh] mx-auto p-4 flex items-center justify-center">
        <img
          src={currentItem.image}
          alt={currentItem.title}
          className="max-w-full max-h-[75vh] object-contain shadow-2xl border border-white/10"
        />

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-6 p-3 bg-black/40 hover:bg-black/80 text-white rounded-none border border-white/20 transition-all backdrop-blur-xs"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-6 p-3 bg-black/40 hover:bg-black/80 text-white rounded-none border border-white/20 transition-all backdrop-blur-xs"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-[11px] text-[#E8E0D3]/60 tracking-widest uppercase">
        Use Arrow Keys or Click Controls to Navigate
      </div>
    </div>
  );
};

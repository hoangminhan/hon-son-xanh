"use client";

import { useState } from 'react';
import { urlFor } from '../lib/sanity/image';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';

export default function TourGallery({ gallery }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!gallery || gallery.length === 0) return null;

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(gallery.length - 1, i + 1));

  return (
    <>
      {/* ── Main viewer ── */}
      <div
        className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 group cursor-zoom-in"
        style={{ aspectRatio: '16/9' }}
        onClick={() => setLightboxOpen(true)}
      >
        <img
          key={activeIndex}
          src={urlFor(gallery[activeIndex]).width(1200).height(800).url()}
          alt={`Ảnh ${activeIndex + 1} / ${gallery.length}`}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        />

        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Counter + expand hint */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
            <span>{activeIndex + 1}</span>
            <span className="opacity-50">/</span>
            <span>{gallery.length}</span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
            <Expand className="w-3.5 h-3.5" />
            Phóng to
          </div>
        </div>

        {/* Prev button */}
        {activeIndex > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-800 dark:text-white rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
        )}

        {/* Next button */}
        {activeIndex < gallery.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-800 dark:text-white rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* ── Thumbnails ── */}
      {gallery.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory">
          {gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative shrink-0 rounded-xl overflow-hidden snap-start cursor-pointer transition-all duration-200 ${
                activeIndex === idx
                  ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 opacity-100 scale-[1.03]'
                  : 'opacity-50 hover:opacity-80 hover:scale-[1.02]'
              }`}
              style={{ width: 'calc(20% - 0.4rem)', aspectRatio: '4/3' }}
              aria-label={`Xem ảnh ${idx + 1}`}
            >
              <img
                src={urlFor(img).width(240).height(180).url()}
                alt={`Thumbnail ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all text-xl font-bold cursor-pointer"
            onClick={() => setLightboxOpen(false)}
            aria-label="Đóng"
          >
            ✕
          </button>

          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={urlFor(gallery[activeIndex]).width(1600).height(1066).url()}
              alt={`Ảnh ${activeIndex + 1}`}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
            />

            <div className="absolute top-1/2 -translate-y-1/2 -left-14 hidden md:block">
              {activeIndex > 0 && (
                <button onClick={prev} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer">
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-14 hidden md:block">
              {activeIndex < gallery.length - 1 && (
                <button onClick={next} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer">
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            <p className="text-center text-white/50 text-sm mt-3 font-medium">
              {activeIndex + 1} / {gallery.length} — Nhấn bên ngoài để đóng
            </p>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/sanity/image';
import { Star, Heart, Loader2 } from 'lucide-react';

export default function PaginatedTourList({ tours = [], initialCount = 12 }) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  const visibleTours = tours.slice(0, visibleCount);
  const hasMore = visibleCount < tours.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + initialCount);
      setIsLoading(false);
    }, 300);
  };

  if (tours.length === 0) {
    return (
      <div className="text-center text-slate-500 dark:text-slate-400 py-12">
        <p className="text-xl">Hiện tại chưa có tour nào. Vui lòng quay lại sau.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {visibleTours.map((tour, index) => (
          <Link href={`/tour/${tour.slug}`} key={tour._id} className="group" data-aos="fade-up" data-aos-delay={index < initialCount ? Math.min(index, 5) * 100 : 0}>
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all flex flex-col h-full">
              <div className="h-56 bg-slate-200 dark:bg-slate-700 relative overflow-hidden flex-shrink-0">
                {tour.mainImage ? (
                  <img src={urlFor(tour.mainImage).width(600).height(400).url()} alt={`Hình ảnh minh họa cho ${tour.title}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600">
                    🏝️
                  </div>
                )}
                {/* Rating */}
                {/* <div className="absolute top-4 left-4 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star className="w-4 h-4 text-orange-600 fill-orange-600" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">4.9</span>
                </div> */}
                {/* Favorite */}
                {/* <button className="cursor-pointer absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-10" onClick={(e) => e.preventDefault()}>
                  <Heart className="w-5 h-5 text-white" strokeWidth={2.5} />
                </button> */}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200 text-xs font-semibold rounded-full">{tour.duration || 'Full Day'}</span>
                  <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200 text-xs font-semibold rounded-full">Khám phá</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white line-clamp-2">{tour.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-2 font-medium flex-1">{tour.excerpt}</p>
                <div className="mt-auto pt-4 flex flex-col justify-between gap-3 border-t border-slate-100 dark:border-slate-700">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Chỉ từ</p>
                    <p className="text-2xl font-black text-orange-600 truncate">{tour.priceText}</p>
                  </div>
                  <div className="w-full shrink-0 text-center px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white group-hover:bg-orange-500 group-hover:text-white font-bold rounded-xl transition-colors shadow-sm text-sm">
                    Xem Tour
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Nút Load More & Show Less ── */}
      <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-4">
        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 hover:shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang tải...
              </>
            ) : (
              <>Tải thêm tour ({tours.length - visibleCount} tour nữa)</>
            )}
          </button>
        )}

        {visibleCount > initialCount && (
          <button
            onClick={() => setVisibleCount(initialCount)}
            className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 font-bold rounded-2xl border border-transparent hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-800 dark:hover:text-white transition-all active:scale-95"
          >
            Thu gọn lại
          </button>
        )}
      </div>
    </div>
  );
}

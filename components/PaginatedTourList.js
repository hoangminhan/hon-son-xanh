"use client";

import React, { useState } from 'react';
import { Loader2, ChevronDown } from 'lucide-react';
import TourCard from './TourCard';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleTours.map((tour, index) => (
          <TourCard key={tour._id} tour={tour} index={index} initialCount={initialCount} />
        ))}
      </div>

      {/* ── Nút Load More ── */}
      {hasMore && (
        <div className="mt-12 md:mt-16 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="cursor-pointer group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.5)] hover:-translate-y-1 overflow-hidden transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {/* Shimmer — keyframe định nghĩa trong globals.css */}
            <div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
              style={{ animation: 'shimmer 1.5s infinite' }}
            />

            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang tải...
              </>
            ) : (
              <>
                Tải thêm tour
                <span className="font-medium text-orange-100 text-sm">
                  ({tours.length - visibleCount} tour nữa)
                </span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

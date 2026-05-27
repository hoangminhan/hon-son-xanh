"use client";

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {visibleTours.map((tour, index) => (
          <TourCard key={tour._id} tour={tour} index={index} initialCount={initialCount} />
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

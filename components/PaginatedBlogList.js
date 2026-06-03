"use client";

import React, { useState } from 'react';
import { ArrowRight, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import BlogCard from './BlogCard';

export default function PaginatedBlogList({ posts = [], initialCount = 9 }) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    // Giả lập thời gian load một chút xíu để thấy animation mượt mà (300ms)
    setTimeout(() => {
      setVisibleCount((prev) => prev + initialCount);
      setIsLoading(false);
    }, 300);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl">
          ✍️
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Chưa có bài viết nào</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Chúng tôi đang chuẩn bị những bài viết hay ho. Hãy quay lại sớm nhé!
        </p>
        <Link href="/" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors shadow-md">
          Về trang chủ <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ── Grid bài viết ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {visiblePosts.map((post, index) => {
          return (
            <BlogCard 
              key={post._id} 
              post={post} 
              index={index} 
              delayConfig={{ type: 'list', initialCount }} 
            />
          );
        })}
      </div>

      {/* ── Nút Load More & Show Less ── */}
      <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-4">
        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="cursor-pointer group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.5)] hover:-translate-y-1 overflow-hidden transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {/* Hiệu ứng shine bóng bẩy */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Đang tải...
              </>
            ) : (
              <>
                Tải thêm bài viết <span className="font-medium text-orange-100 text-sm">({posts.length - visibleCount} bài nữa)</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </button>
        )}

        {visibleCount > initialCount && (
          <button
            onClick={() => setVisibleCount(initialCount)}
             className="cursor-pointer group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-full shadow-md border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active:scale-95"
           >
             Thu gọn lại
             <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
           </button>
        )}
      </div>
    </div>
  );
}

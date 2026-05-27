"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/sanity/image';
import { getCategoryConfig } from '../lib/categoryConfig';
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';

function estimateReadTime(text = '') {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

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
        <Link href="/" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors">
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
          const cat = post.category ? getCategoryConfig(post.category) : null;
          return (
            <Link
              href={`/bai-viet/${post.slug}`}
              key={post._id}
              className="group"
              data-aos="fade-up"
              // Chỉ hiện delay animation cho lần load đầu tiên (9 bài đầu)
              data-aos-delay={index < initialCount ? Math.min(index, 5) * 80 : 0}
            >
              <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col">
                {/* ── Ảnh ── */}
                <div className="relative h-52 overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                  {post.mainImage ? (
                    <img
                      src={urlFor(post.mainImage).width(640).height(420).url()}
                      alt={`Hình ảnh bài viết ${post.title}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600">
                      🌊
                    </div>
                  )}
                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category badge */}
                  {cat && (
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm bg-white/90 dark:bg-slate-900/80 shadow-sm text-slate-700 dark:text-slate-200`}>
                        {cat.emoji} {cat.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* ── Nội dung ── */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3 text-xs text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : ''}
                    </span>
                    <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {estimateReadTime(post.excerpt)} phút đọc
                    </span>
                  </div>

                  <h2 className="text-base md:text-lg font-bold mb-2 text-slate-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug flex-shrink-0">
                    {post.title}
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end">
                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Đọc tiếp <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
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
              <>Tải thêm bài viết ({posts.length - visibleCount} bài nữa)</>
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

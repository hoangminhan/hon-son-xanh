import Link from 'next/link';
import { urlFor } from '../lib/sanity/image';
import { getCategoryConfig } from '../lib/categoryConfig';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export function estimateReadTime(text = '') {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogCard({ post, index, delayConfig = {} }) {
  const cat = post.category ? getCategoryConfig(post.category) : null;
  
  // Calculate delay based on config
  let delay = 0;
  if (delayConfig.type === 'list') {
    delay = index < delayConfig.initialCount ? Math.min(index, 5) * 80 : 0;
  } else if (delayConfig.type === 'carousel') {
    delay = index * 100;
  }

  return (
    <Link
      href={`/bai-viet/${post.slug}`}
      key={post._id}
      className="group block h-full"
      data-aos={delay !== undefined ? "fade-up" : undefined}
      data-aos-delay={delay}
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
}

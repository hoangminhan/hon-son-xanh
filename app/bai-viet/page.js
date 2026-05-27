import Link from 'next/link';
import { safeFetch } from '../../lib/sanity/client';
import { urlFor } from '../../lib/sanity/image';
import { allPostsQuery } from '../../lib/sanity/queries';
import { getCategoryConfig } from '../../lib/categoryConfig';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import PaginatedBlogList from '../../components/PaginatedBlogList';

export const metadata = {
  title: 'Cẩm Nang Du Lịch | Hòn Sơn Xanh',
  description: 'Kinh nghiệm du lịch Hòn Sơn, chia sẻ các địa điểm đẹp, ẩm thực và mẹo vặt khi du lịch tại đảo Hòn Sơn, Kiên Giang.',
  openGraph: {
    title: 'Cẩm Nang Du Lịch | Hòn Sơn Xanh',
    description: 'Kinh nghiệm du lịch Hòn Sơn tự túc, các bài viết mới nhất.',
    url: 'https://honsonxanh.com/bai-viet',
  },
};

function estimateReadTime(text = '') {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPage() {
  const posts = await safeFetch(allPostsQuery) || [];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors">

      {/* ── Hero Section ── */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        </div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl z-10 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6 text-sm font-semibold">
            <BookOpen className="w-4 h-4 text-orange-400" />
            Cẩm nang &amp; Kinh nghiệm
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Cẩm Nang{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              Du Lịch
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Những bài viết chân thực từ trải nghiệm thực tế — địa điểm đẹp, ẩm thực ngon và mẹo vặt hữu ích cho chuyến đi Hòn Sơn của bạn.
          </p>
          {posts.length > 0 && (
            <p className="mt-4 text-slate-400 text-sm">{posts.length} bài viết</p>
          )}
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 max-w-6xl py-12 md:py-16">
        {posts.length === 0 ? (
          /* Empty State */
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
        ) : (
          <PaginatedBlogList posts={posts} initialCount={12} />
        )}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { safeFetch } from '../../lib/sanity/client';
import { urlFor } from '../../lib/sanity/image';
import { allPostsQuery, siteSettingsQuery } from '../../lib/sanity/queries';
import { getCategoryConfig } from '../../lib/categoryConfig';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import PaginatedBlogList from '../../components/PaginatedBlogList';

export const metadata = {
  title: 'Cẩm Nang Du Lịch',
  description: 'Kinh nghiệm du lịch Hòn Sơn, chia sẻ các địa điểm đẹp, ẩm thực và mẹo vặt khi du lịch tại đảo Hòn Sơn, Kiên Giang.',
  openGraph: {
    title: 'Cẩm Nang Du Lịch | Hòn Sơn Xanh',
    description: 'Kinh nghiệm du lịch Hòn Sơn tự túc, các bài viết mới nhất.',
    url: '/bai-viet',
    images: ['/images/og-default.jpg'],
  },
};

function estimateReadTime(text = '') {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    safeFetch(allPostsQuery).then(res => res || []),
    safeFetch(siteSettingsQuery).then(res => res || {}),
  ]);
  const zaloUrl = settings.zaloUrl || 'https://zalo.me';
  const phone = settings.phone || '';
  const featuredPost = posts.find(p => p.isFeatured) || posts[0];
  const regularPosts = featuredPost ? posts.filter(p => p._id !== featuredPost._id) : posts;

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
            <Link href="/" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors shadow-md">
              Về trang chủ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                    <span className="relative flex h-3 w-3 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                    </span>
                    Bài Viết Nổi Bật
                  </h2>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                </div>
                
                <Link href={`/bai-viet/${featuredPost.slug}`} className="group block bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-3/5 h-64 lg:h-[400px] relative overflow-hidden">
                      {featuredPost.mainImage ? (
                        <img src={urlFor(featuredPost.mainImage).width(1200).height(800).url()} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-4xl">🏝️</div>
                      )}
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-orange-600 dark:text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm border border-white/20">
                          {getCategoryConfig(featuredPost.category).label}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent lg:hidden" />
                    </div>
                    
                    <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center relative bg-white dark:bg-slate-800 border-l border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredPost.publishedAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{estimateReadTime(featuredPost.excerpt)} phút đọc</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white mb-4 line-clamp-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-tight">
                        {featuredPost.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-8 line-clamp-4 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center text-orange-600 dark:text-orange-400 font-bold gap-2 group-hover:gap-3 transition-all uppercase tracking-wider text-sm">
                        Đọc Ngay <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            
            {/* Regular Posts Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">
                Bài Viết Mới Nhất
              </h2>
            </div>
            <PaginatedBlogList posts={regularPosts} initialCount={6} />
          </>
        )}
      </div>

      {/* ── Consultation CTA ── */}
      <section className="bg-orange-50 dark:bg-slate-900/50 py-16 md:py-24 border-t border-slate-200 dark:border-slate-800 transition-colors relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-orange-600 dark:text-orange-400 shadow-sm border border-orange-200 dark:border-orange-800/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-6 leading-tight">Bạn Vẫn Phân Vân Lịch Trình?</h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Đừng lo lắng! Đội ngũ tư vấn viên bản địa của Hòn Sơn Xanh luôn sẵn sàng hỗ trợ bạn thiết kế lịch trình tối ưu nhất, hoàn toàn miễn phí.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Nhắn Tin Qua Zalo
            </a>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="w-full sm:w-auto px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Gọi Hotline
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

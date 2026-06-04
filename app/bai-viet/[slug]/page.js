import Link from 'next/link';
import { notFound } from 'next/navigation';
import { safeFetch } from '../../../lib/sanity/client';
import { urlFor } from '../../../lib/sanity/image';
import { allPostSlugsQuery, postBySlugQuery, relatedPostsQuery, siteSettingsQuery } from '../../../lib/sanity/queries';
import PortableTextRenderer from '../../../components/PortableTextRenderer';
import { getCategoryConfig } from '../../../lib/categoryConfig';
import { Calendar, Clock, MessageCircle, ArrowRight } from 'lucide-react';

// ── Tính thời gian đọc ──────────────────────────────────────────────────────
function estimateReadTime(body = []) {
  const text = body
    .filter((b) => b._type === 'block' && b.children)
    .flatMap((b) => b.children.map((c) => c.text || ''))
    .join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateStaticParams() {
  const slugs = await safeFetch(allPostSlugsQuery) || [];
  if (slugs.length === 0) return [{ slug: 'dummy-fallback' }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await safeFetch(postBySlugQuery, { slug });

  if (!post) return { title: 'Không tìm thấy bài viết' };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.mainImage
        ? [{ url: urlFor(post.mainImage).width(1200).height(630).url(), width: 1200, height: 630, alt: post.seoTitle || post.title }]
        : [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Hòn Sơn Xanh' }],
    },
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;

  const post = await safeFetch(postBySlugQuery, { slug });
  if (!post) notFound();

  const [settings, relatedRaw] = await Promise.all([
    safeFetch(siteSettingsQuery).then((r) => r || {}),
    safeFetch(relatedPostsQuery, { currentSlug: slug, category: post.category || '' }).then((r) => r || []),
  ]);

  const zaloUrl = settings?.zaloUrl || 'https://zalo.me/0123456789';
  const cat = post.category ? getCategoryConfig(post.category) : null;
  const readTime = estimateReadTime(post.body || []);
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO — Cinematic full-bleed
      ═══════════════════════════════════════ */}
      <section className="relative w-full h-[55vh] min-h-[360px] md:h-[70vh] md:max-h-[600px] overflow-hidden bg-slate-900">
        {/* Background image */}
        {post.mainImage ? (
          <img
            src={urlFor(post.mainImage).width(1920).height(1080).auto('format').quality(85).url()}
            alt={post.title}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[10s] hover:scale-100"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Category badge – top left */}
        {cat && (
          <div className="absolute top-6 left-6 md:left-10 z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-sm">
              {cat.emoji} {cat.label}
            </span>
          </div>
        )}

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-10 md:pb-14 z-10 max-w-[1380px] mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-5 text-white/70 text-sm font-medium">
            {publishedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {publishedDate}
              </span>
            )}
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime} phút đọc
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight max-w-4xl text-balance drop-shadow-2xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-white/70 text-base md:text-lg max-w-2xl leading-relaxed line-clamp-2 hidden md:block">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BREADCRUMB BAR
      ═══════════════════════════════════════ */}
      <div className="bg-white dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700/60 backdrop-blur-sm">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-1.5 py-3 text-sm font-medium overflow-x-auto whitespace-nowrap scrollbar-none">
            <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors shrink-0">
              Trang chủ
            </Link>
            <span className="text-slate-300 dark:text-slate-600 shrink-0">/</span>
            <Link href="/bai-viet" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors shrink-0">
              Cẩm Nang
            </Link>
            <span className="text-slate-300 dark:text-slate-600 shrink-0">/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MAIN BODY — 2 cột: nội dung + sidebar
      ═══════════════════════════════════════ */}
      <div className="bg-slate-50 dark:bg-slate-900 transition-colors pb-20">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">
          <div className="flex flex-col xl:flex-row gap-8 pt-10">

            {/* ════════════════════════
                LEFT — Nội dung bài viết
            ════════════════════════ */}
            <article className="flex-1 min-w-0">
              {/* Excerpt card (mobile only) */}
              {post.excerpt && (
                <div className="xl:hidden bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 rounded-3xl p-5 mb-6">
                  <p className="text-base text-orange-800 dark:text-orange-300 leading-relaxed italic">
                    &ldquo;{post.excerpt}&rdquo;
                  </p>
                </div>
              )}

              {/* Body content */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700">
                <PortableTextRenderer value={post.body} />
              </div>


            </article>

            {/* ════════════════════════
                RIGHT — Sticky Sidebar
            ════════════════════════ */}
            <aside className="w-full xl:w-[320px] shrink-0">
              <div className="xl:sticky xl:top-24 space-y-4">

                {/* ── Meta card ── */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                    Thông tin bài viết
                  </p>
                  <div className="space-y-3">
                    {cat && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Chủ đề</span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${cat.className}`}>
                          {cat.emoji} {cat.label}
                        </span>
                      </div>
                    )}
                    {publishedDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Ngày đăng</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{publishedDate}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Thời gian đọc</span>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{readTime} phút</span>
                    </div>
                  </div>
                </div>

                {/* ── CTA Zalo ── */}
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700">
                  <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 px-6 pt-6 pb-8 relative overflow-hidden">
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />
                    <p className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">
                      Bạn muốn đặt tour?
                    </p>
                    <p className="text-white font-black text-xl leading-tight relative z-10">
                      Liên hệ tư vấn<br />miễn phí ngay!
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 px-6 py-5 space-y-3">
                    <a
                      href={zaloUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full bg-[#0068FF] hover:bg-[#0057d9] text-white font-black text-base px-6 py-4 rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Nhắn Zalo Ngay
                    </a>
                    <p className="text-center text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Phản hồi trong vòng 5 phút
                    </p>
                  </div>
                </div>


              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          RELATED POSTS
      ═══════════════════════════════════════ */}
      {relatedRaw.length > 0 && (
        <section className="bg-white dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 py-16 md:py-20">
          <div className="max-w-[1380px] mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">Khám phá thêm</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">Bài Viết Liên Quan</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedRaw.map((related) => {
                const relCat = related.category ? getCategoryConfig(related.category) : null;
                const relDate = related.publishedAt
                  ? new Date(related.publishedAt).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric', year: 'numeric' })
                  : null;
                return (
                  <Link
                    key={related._id}
                    href={`/bai-viet/${related.slug}`}
                    className="group block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                      {related.mainImage ? (
                        <img
                          src={urlFor(related.mainImage).width(640).height(360).url()}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600">
                          🌊
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      {relCat && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm bg-white/90 dark:bg-slate-900/80 shadow-sm text-slate-700 dark:text-slate-200">
                            {relCat.emoji} {relCat.label}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      {relDate && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {relDate}
                        </div>
                      )}
                      <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug mb-2">
                        {related.title}
                      </h3>
                      {related.excerpt && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {related.excerpt}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1 text-orange-500 font-bold text-xs group-hover:gap-2 transition-all">
                        Đọc tiếp <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

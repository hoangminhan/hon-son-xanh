import Link from 'next/link';
import { notFound } from 'next/navigation';
import { safeFetch } from '../../../lib/sanity/client';
import { urlFor } from '../../../lib/sanity/image';
import { allTourSlugsQuery, tourBySlugQuery, relatedToursQuery, siteSettingsQuery } from '../../../lib/sanity/queries';
import PortableTextRenderer from '../../../components/PortableTextRenderer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TourCard from '../../../components/TourCard';
import TourGallery from '../../../components/TourGallery';
import { Calendar, Clock, Ship, CheckCircle, XCircle, MessageCircle, Flame, ArrowLeft, Users, Star } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = await safeFetch(allTourSlugsQuery) || [];
  if (slugs.length === 0) return [{ slug: 'dummy-fallback' }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = await safeFetch(tourBySlugQuery, { slug });
  if (!tour) return { title: 'Không tìm thấy tour' };
  return {
    title: tour.seoTitle || tour.title,
    description: tour.seoDescription || tour.excerpt,
    openGraph: {
      title: tour.seoTitle || tour.title,
      description: tour.seoDescription || tour.excerpt,
      images: tour.mainImage
        ? [{ url: urlFor(tour.mainImage).width(1200).height(630).url(), width: 1200, height: 630, alt: tour.seoTitle || tour.title }]
        : [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Hòn Sơn Xanh' }],
    },
  };
}

export default async function TourDetail({ params }) {
  const { slug } = await params;
  const tour = await safeFetch(tourBySlugQuery, { slug });
  if (!tour) notFound();

  const relatedTours = await safeFetch(relatedToursQuery, { currentSlug: slug }) || [];
  const settings = await safeFetch(siteSettingsQuery) || {};
  const zaloUrl = settings?.zaloUrl || 'https://zalo.me/0123456789';

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO — Cinematic full-bleed
      ═══════════════════════════════════════ */}
      <section className="relative w-full h-[60vh] min-h-[400px] md:h-[88vh] md:max-h-[700px] overflow-hidden bg-slate-900">
        {/* Background image */}
        {tour.mainImage && (
          <img
            // Fallback cho trình duyệt không hỗ trợ srcset
            src={urlFor(tour.mainImage).width(1920).height(1080).auto('format').url()}
            // Browser tự chọn size phù hợp: mobile → 800px, tablet → 1280px, desktop → 1920px, 2K → 2560px, 4K → 3840px
            srcSet={[
              `${urlFor(tour.mainImage).width(800).height(450).auto('format').quality(80).url()} 800w`,
              `${urlFor(tour.mainImage).width(1280).height(720).auto('format').quality(82).url()} 1280w`,
              `${urlFor(tour.mainImage).width(1920).height(1080).auto('format').quality(85).url()} 1920w`,
              `${urlFor(tour.mainImage).width(2560).height(1440).auto('format').quality(85).url()} 2560w`,
              `${urlFor(tour.mainImage).width(3840).height(2160).auto('format').quality(80).url()} 3840w`,
            ].join(', ')}
            // Ảnh luôn chiếm 100% viewport width → browser tính đúng kích thước cần fetch
            sizes="100vw"
            alt={tour.title}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[10s] hover:scale-100"
          />
        )}

        {/* Layered gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Top bar — badge only (breadcrumb moved below hero) */}
        {tour.hasPromotion && tour.promotionBadgeLabel && (
          <div className="absolute top-6 right-6 md:right-10 z-10">
            <div className={`flex items-center gap-1.5 ${tour.promotionBadgeColor || 'bg-red-500'} text-white text-xs font-black px-4 py-2 rounded-full shadow-lg animate-pulse`}>
              <Flame className="w-3.5 h-3.5" />
              {tour.promotionBadgeLabel}
            </div>
          </div>
        )}

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-10 md:pb-14 z-10">
          {/* Tag pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {tour.duration && (
              <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                <Clock className="w-3.5 h-3.5" />
                {tour.duration}
              </span>
            )}
            {(tour.transportation || true) && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                <Ship className="w-3.5 h-3.5" />
                {tour.transportation || 'Tàu cao tốc'}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold px-4 py-1.5 rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              {tour.departure || 'Hàng ngày'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight max-w-4xl text-balance drop-shadow-2xl">
            {tour.title}
          </h1>

          {/* Excerpt below title */}
          {tour.excerpt && (
            <p className="mt-4 text-white/75 text-base md:text-lg max-w-2xl leading-relaxed line-clamp-2 hidden md:block">
              {tour.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BREADCRUMB BAR — below hero, above content
      ═══════════════════════════════════════ */}
      <div className="bg-white dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700/60 backdrop-blur-sm">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-1.5 py-3 text-sm font-medium overflow-x-auto whitespace-nowrap scrollbar-none">
            <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors shrink-0">Trang chủ</Link>
            <span className="text-slate-300 dark:text-slate-600 shrink-0">/</span>
            <Link href="/tour" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors shrink-0">Tours</Link>
            <span className="text-slate-300 dark:text-slate-600 shrink-0">/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">{tour.title}</span>
          </nav>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MAIN BODY
      ═══════════════════════════════════════ */}
      <div className="bg-slate-50 dark:bg-slate-900 transition-colors pb-24 md:pb-16">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">

          {/* ── 2-Column Grid ── */}
          <div className="flex flex-col xl:flex-row gap-8 pt-10">

            {/* ════════════════════════
                LEFT — Main content
            ════════════════════════ */}
            <div className="flex-1 min-w-0 space-y-6">

              {/* Excerpt card (mobile only full, desktop hidden since in hero) */}
              {tour.excerpt && (
                <div className="xl:hidden bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {tour.excerpt}
                  </p>
                </div>
              )}

              {/* ── Gallery ── */}
              {tour.gallery && tour.gallery.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="px-6 pt-6 pb-1 flex items-center justify-between">
                    <SectionHeading emoji="📸" label="Hình ảnh thực tế" />
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                      {tour.gallery.length} ảnh
                    </span>
                  </div>
                  <div className="p-4 md:p-6">
                    <TourGallery gallery={tour.gallery} />
                  </div>
                </div>
              )}

              {/* ── Itinerary ── */}
              {tour.itinerary && (
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                  <SectionHeading emoji="🗺️" label="Lịch trình chi tiết" />
                  <div className="mt-6 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-slate-800 [&_h2]:dark:text-white [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-slate-100 [&_h2]:dark:border-slate-700 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-700 [&_h3]:dark:text-slate-200 [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:text-slate-600 [&_p]:dark:text-slate-300 [&_p]:leading-relaxed [&_p]:mb-3 [&_p]:text-sm [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:text-slate-600 [&_li]:dark:text-slate-300 [&_li]:text-sm [&_li]:leading-relaxed [&_li]:flex [&_li]:gap-2 [&_li]:before:content-['•'] [&_li]:before:text-orange-400 [&_li]:before:font-bold [&_li]:before:shrink-0">
                    <PortableTextRenderer value={tour.itinerary} />
                  </div>
                </div>
              )}

              {/* ── Included / Excluded ── */}
              {((tour.included?.length > 0) || (tour.excluded?.length > 0)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {tour.included?.length > 0 && (
                    <div className="group relative bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-7 border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                      {/* Accent strip */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-3xl" />
                      <div className="flex items-center gap-3 mb-5 pt-2">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />
                        </div>
                        <div>
                          <h2 className="font-black text-slate-800 dark:text-white text-lg">Bao gồm</h2>
                          <p className="text-xs text-slate-400">{tour.included.length} dịch vụ</p>
                        </div>
                      </div>
                      <ul className="space-y-2.5">
                        {tour.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tour.excluded?.length > 0 && (
                    <div className="group relative bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-7 border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                      {/* Accent strip */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-red-500 rounded-t-3xl" />
                      <div className="flex items-center gap-3 mb-5 pt-2">
                        <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center">
                          <XCircle className="w-5 h-5 text-rose-500" strokeWidth={2.5} />
                        </div>
                        <div>
                          <h2 className="font-black text-slate-800 dark:text-white text-lg">Không bao gồm</h2>
                          <p className="text-xs text-slate-400">{tour.excluded.length} mục</p>
                        </div>
                      </div>
                      <ul className="space-y-2.5">
                        {tour.excluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center shrink-0 mt-0.5">
                              <XCircle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" strokeWidth={3} />
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ── Lưu ý ── */}
              {tour.note && (
                <div className="relative bg-amber-50 dark:bg-amber-950/25 rounded-3xl p-6 md:p-8 border border-amber-200/60 dark:border-amber-800/40 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-t-3xl" />
                  <div className="flex items-start gap-4 pt-1">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                      <span className="text-xl">⚠️</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-black text-amber-800 dark:text-amber-400 text-lg mb-3">Lưu ý quan trọng</h2>
                      <div className="text-sm text-amber-700 dark:text-amber-500 leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0">
                        <PortableTextRenderer value={tour.note} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ════════════════════════
                RIGHT — Sticky Sidebar
            ════════════════════════ */}
            <div className="w-full xl:w-[340px] shrink-0">
              <div className="xl:sticky xl:top-24 space-y-4">

                {/* ── Price Card ── */}
                <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 dark:shadow-slate-900/60 border border-slate-100 dark:border-slate-700">
                  {/* Gradient header */}
                  <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 px-6 pt-6 pb-8 relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />

                    <p className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">Giá tour</p>

                    {tour.hasPromotion && tour.promotionPrice ? (
                      <div className="relative z-10">
                        <p className="text-white/60 text-sm line-through font-semibold truncate">{tour.priceText || 'Liên hệ để biết giá'}</p>
                        <p className="text-2xl md:text-3xl font-black text-white leading-tight mt-1 break-words">{tour.promotionPrice}</p>
                        <p className="text-orange-200 text-sm font-semibold mt-1">/ người lớn</p>
                        {tour.promotionSavingsMessage && (
                          <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            <Flame className="w-3.5 h-3.5" />
                            {tour.promotionSavingsMessage}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative z-10">
                        <p className="text-2xl md:text-3xl font-black text-white leading-tight break-words">{tour.priceText || 'Liên hệ để biết giá'}</p>
                        <p className="text-orange-200 text-sm font-semibold mt-1">/ người lớn</p>
                      </div>
                    )}
                  </div>

                  {/* CTA section */}
                  <div className="bg-white dark:bg-slate-800 px-6 py-5 space-y-3">
                    <a
                      href={zaloUrl}
                      target="_blank"
                      rel="noreferrer"
                      id="tour-zalo-cta"
                      className="flex items-center justify-center gap-2.5 w-full bg-[#0068FF] hover:bg-[#0057d9] text-white font-black text-base px-6 py-4 rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Nhận Tư Vấn Miễn Phí
                    </a>
                    <p className="text-center text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Phản hồi trong vòng 5 phút
                    </p>
                  </div>
                </div>

                {/* ── Quick Info ── */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Thông tin nhanh</p>
                  <div className="space-y-3">
                    <QuickInfoRow
                      icon={<Clock className="w-4 h-4 text-orange-500" />}
                      bg="bg-orange-50 dark:bg-orange-900/20"
                      label="Thời gian"
                      value={tour.duration || 'Liên hệ'}
                    />
                    <QuickInfoRow
                      icon={<Calendar className="w-4 h-4 text-sky-500" />}
                      bg="bg-sky-50 dark:bg-sky-900/20"
                      label="Khởi hành"
                      value={tour.departure || 'Hàng ngày'}
                    />
                    <QuickInfoRow
                      icon={<Ship className="w-4 h-4 text-teal-500" />}
                      bg="bg-teal-50 dark:bg-teal-900/20"
                      label="Phương tiện"
                      value={tour.transportation || 'Tàu cao tốc'}
                    />
                  </div>
                </div>

                {/* ── Promotion Banner ── */}
                {tour.hasPromotion && tour.promotionBadgeLabel && (
                  <div className="relative bg-gradient-to-br from-rose-500 to-orange-500 rounded-3xl p-5 text-white overflow-hidden shadow-lg shadow-orange-500/25">
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                    <div className="flex items-center gap-2 mb-1.5 relative z-10">
                      <Flame className="w-5 h-5" />
                      <span className="font-black text-sm uppercase tracking-wider">{tour.promotionBadgeLabel}</span>
                    </div>
                    {tour.promotionSavingsMessage && (
                      <p className="text-2xl font-black relative z-10">{tour.promotionSavingsMessage}</p>
                    )}
                  </div>
                )}

                {/* ── Back to list ── */}
                <Link
                  href="/tour"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold hover:border-orange-400 hover:text-orange-500 dark:hover:border-orange-600 dark:hover:text-orange-400 transition-all text-sm group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Xem tất cả tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          RELATED TOURS
      ═══════════════════════════════════════ */}
      {relatedTours.length > 0 && (
        <section className="bg-white dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 py-16 md:py-20">
          <div className="max-w-[1380px] mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">Khám phá thêm</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">Có thể bạn sẽ thích</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTours.map((rt) => (
                <TourCard key={rt._id} tour={rt} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ─── Sub-components ─── */

function SectionHeading({ emoji, label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-700/60 flex items-center justify-center text-xl shrink-0">
        {emoji}
      </div>
      <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">{label}</h2>
    </div>
  );
}

function QuickInfoRow({ icon, bg, label, value }) {
  return (
    <div className="flex items-center gap-3.5">
      <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</span>
        <span className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right">{value}</span>
      </div>
    </div>
  );
}

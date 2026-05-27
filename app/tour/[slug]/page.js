import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client, safeFetch } from '../../../lib/sanity/client';
import { urlFor } from '../../../lib/sanity/image';
import { allTourSlugsQuery, tourBySlugQuery } from '../../../lib/sanity/queries';
import PortableTextRenderer from '../../../components/PortableTextRenderer';
import Breadcrumbs from '../../../components/Breadcrumbs';

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
        : [{ url: 'https://hon-son-xanh.vercel.app/images/og-default.jpg', width: 1200, height: 630, alt: 'Hòn Sơn Xanh' }],
    },
  };
}

export default async function TourDetail({ params }) {
  const { slug } = await params;
  const tour = await safeFetch(tourBySlugQuery, { slug });

  if (!tour) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs items={[
          { label: 'Danh Sách Tour', href: '/tour' },
          { label: tour.title }
        ]} />
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md">
          <div className="h-64 md:h-96 relative overflow-hidden">
             {tour.mainImage && <img src={urlFor(tour.mainImage).width(1200).height(800).url()} alt={`Hình ảnh minh họa cho ${tour.title}`} className="absolute inset-0 w-full h-full object-cover z-0" />}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
             <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white z-20 absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 text-balance leading-tight">{tour.title}</h1>
          </div>
          <div className="p-5 md:p-8">
            <div className="flex flex-wrap items-center gap-6 mb-8 border-b dark:border-slate-700 pb-6">
               <div>
                 <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Thời gian</p>
                 <p className="font-semibold text-slate-800 dark:text-slate-100">{tour.duration}</p>
               </div>
               <div>
                 <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Giá từ</p>
                 {tour.hasPromotion && tour.promotionPrice ? (
                   <div>
                     <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 line-through">{tour.priceText}</p>
                     <p className="font-bold text-orange-600 text-xl">{tour.promotionPrice}</p>
                   </div>
                 ) : (
                   <p className="font-bold text-orange-600 text-xl">{tour.priceText}</p>
                 )}
               </div>
               {tour.hasPromotion && (tour.promotionBadgeLabel || tour.promotionSavingsMessage) && (
                 <div className="bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl border border-red-100 dark:border-red-800/30">
                   <p className="text-xs text-red-500 dark:text-red-400 uppercase tracking-wider mb-1 font-bold flex items-center gap-1">
                     <span className="text-base">🔥</span> {tour.promotionBadgeLabel || 'Ưu đãi đặc biệt'}
                   </p>
                   {tour.promotionSavingsMessage && <p className="font-bold text-red-600 dark:text-red-400 text-base">{tour.promotionSavingsMessage}</p>}
                 </div>
               )}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Lịch trình</h2>
              <div className="prose prose-orange prose-lg max-w-none text-slate-600 dark:text-slate-300">
                <PortableTextRenderer value={tour.itinerary} />
              </div>
            </div>

            {tour.included && tour.included.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Bao gồm</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                  {tour.included.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {tour.note && (
              <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/50">
                <h2 className="text-xl font-bold mb-3 text-amber-800 dark:text-amber-400">Lưu ý quan trọng</h2>
                <div className="text-amber-700 dark:text-amber-500 text-sm">
                  <PortableTextRenderer value={tour.note} />
                </div>
              </div>
            )}

            <div className="mt-12 text-center">
              <Link href="/lien-he" className="inline-block bg-orange-600 text-white font-semibold px-8 py-4 rounded-full shadow-md shadow-orange-200 hover:bg-orange-700 hover:shadow-lg transition-all hover:-translate-y-1">
                Đặt tour ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

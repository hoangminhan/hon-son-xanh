import Link from 'next/link';
import { client, safeFetch } from '../../lib/sanity/client';
import { urlFor } from '../../lib/sanity/image';
import { allToursQuery } from '../../lib/sanity/queries';
import { Star, Heart } from 'lucide-react';

export const metadata = {
  title: 'Danh sách Tour',
  description: 'Khám phá các tour du lịch hấp dẫn tại Hòn Sơn. Tour 2 ngày 1 đêm, 3 ngày 2 đêm với giá rẻ và chất lượng hàng đầu.',
  openGraph: {
    title: 'Danh sách Tour | Hòn Sơn Xanh',
    description: 'Khám phá các tour du lịch hấp dẫn tại Hòn Sơn.',
    url: 'https://honsonxanh.com/tour',
  },
};

export default async function TourPage() {
  const tours = await safeFetch(allToursQuery) || [];

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-12 text-center">Các Tour Du Lịch</h1>
        
        {tours.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 py-12">
            <p className="text-xl">Hiện tại chưa có tour nào. Vui lòng quay lại sau.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div key={tour._id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all flex flex-col group">
                <div className="h-56 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                  {tour.mainImage && <img src={urlFor(tour.mainImage).width(600).height(400).url()} alt={`Hình ảnh minh họa cho ${tour.title}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                  {/* Rating */}
                  <div className="absolute top-4 left-4 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Star className="w-4 h-4 text-orange-600 fill-orange-600" />
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">4.9</span>
                  </div>
                  {/* Favorite */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center transition-colors">
                    <Heart className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </button>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200 text-xs font-semibold rounded-full">{tour.duration || 'Full Day'}</span>
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200 text-xs font-semibold rounded-full">Khám phá</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white line-clamp-2">{tour.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-2 font-medium flex-1">{tour.excerpt}</p>
                  <div className="flex items-end justify-between mt-auto pt-2">
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Starting at</p>
                      <p className="text-3xl font-black text-orange-600">{tour.priceText}</p>
                    </div>
                    <Link href={`/tour/${tour.slug}`} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-sm">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

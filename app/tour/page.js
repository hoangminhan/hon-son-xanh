import Link from 'next/link';
import { client, safeFetch } from '../../lib/sanity/client';
import { urlFor } from '../../lib/sanity/image';
import { allToursQuery } from '../../lib/sanity/queries';

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
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-800 mb-12 text-center">Các Tour Du Lịch</h1>
        
        {tours.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            <p className="text-xl">Hiện tại chưa có tour nào. Vui lòng quay lại sau.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div key={tour._id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all flex flex-col group">
                <div className="h-56 bg-slate-200 relative overflow-hidden">
                  {tour.mainImage && <img src={urlFor(tour.mainImage).width(600).height(400).url()} alt={`Hình ảnh minh họa cho ${tour.title}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                  {/* Rating */}
                  <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-sm font-bold text-slate-800">4.9</span>
                  </div>
                  {/* Favorite */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                  </button>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-900 text-xs font-semibold rounded-full">{tour.duration || 'Full Day'}</span>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-900 text-xs font-semibold rounded-full">Khám phá</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 line-clamp-2">{tour.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-2 font-medium flex-1">{tour.excerpt}</p>
                  <div className="flex items-end justify-between mt-auto pt-2">
                    <div>
                      <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Starting at</p>
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

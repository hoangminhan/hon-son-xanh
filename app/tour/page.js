import Link from 'next/link';
import { client, safeFetch } from '../../lib/sanity/client';
import { urlFor } from '../../lib/sanity/image';
import { allToursQuery } from '../../lib/sanity/queries';
import PaginatedTourList from '../../components/PaginatedTourList';
import { Compass } from 'lucide-react';

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
            <Compass className="w-4 h-4 text-orange-400" />
            Khám phá & Trải nghiệm
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Danh Sách <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Tour</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Khám phá vẻ đẹp hoang sơ của Hòn Sơn với những lịch trình được thiết kế tỉ mỉ, mang lại trải nghiệm tuyệt vời nhất.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl py-12 md:py-16">
        
        {tours.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 py-12">
            <p className="text-xl">Hiện tại chưa có tour nào. Vui lòng quay lại sau.</p>
          </div>
        ) : (
          <PaginatedTourList tours={tours} initialCount={12} />
        )}
      </div>
    </div>
  );
}

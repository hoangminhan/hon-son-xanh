"use client";

import Link from 'next/link';
import { urlFor } from '../lib/sanity/image';
import { Star, Heart } from 'lucide-react';

export default function TourCard({ tour, index, initialCount }) {
  const delay = index !== undefined && initialCount !== undefined 
    ? (index < initialCount ? Math.min(index, 5) * 100 : 0) 
    : (index ? index * 100 : 0);

  return (
    <Link href={`/tour/${tour.slug}`} className="group" data-aos="fade-up" data-aos-delay={delay}>
      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all flex flex-col h-full">
        <div className="h-72 bg-slate-200 dark:bg-slate-700 relative overflow-hidden flex-shrink-0">
          {tour.mainImage ? (
            <img src={urlFor(tour.mainImage).width(600).height(400).url()} alt={`Hình ảnh minh họa cho ${tour.title}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600">
              🏝️
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 pointer-events-none" />

          {tour.hasPromotion && tour.promotionBadgeLabel && (
            <div className={`absolute top-4 right-4 ${tour.promotionBadgeColor || 'bg-red-500'} text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md z-20 flex items-center gap-1.5 transform hover:scale-105 transition-transform duration-300`}>
              <span>{tour.promotionBadgeLabel}</span>
            </div>
          )}

          {/* Rating */}
          {/* <div className="absolute top-4 left-4 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm z-20">
            <Star className="w-4 h-4 text-orange-600 fill-orange-600" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">4.9</span>
          </div> */}
          
    

          <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col justify-end">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full">{tour.duration || 'Full Day'}</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full">Khám phá</span>
            </div>
            <h3 className="text-2xl font-bold text-white line-clamp-2 drop-shadow-md">{tour.title}</h3>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1 pt-5">
          <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-3 font-medium flex-1">{tour.excerpt}</p>
          <div className="mt-auto pt-4 flex flex-col justify-between gap-3 border-t border-slate-100 dark:border-slate-700">
            <div className="min-w-0">
              {tour.hasPromotion && tour.promotionPrice ? (
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 line-through truncate">{tour.priceText}</p>
                  <p className="text-2xl font-black text-orange-600 truncate">{tour.promotionPrice}</p>
                </div>
              ) : (
                <p className="text-2xl font-black text-orange-600 truncate">{tour.priceText}</p>
              )}
            </div>
            <div className="w-full shrink-0 text-center px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white group-hover:bg-orange-500 group-hover:text-white font-bold rounded-xl transition-colors shadow-sm text-sm">
              Xem Tour
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

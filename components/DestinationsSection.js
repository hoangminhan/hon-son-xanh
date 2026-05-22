"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { Map, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data if destinations from sanity are not sufficient for the UI mockup
const defaultDestinations = [
  { id: 1, title: 'Bãi Bàng', slug: 'bai-bang', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop', toursCount: 5 },
  { id: 2, title: 'Ma Thiên Lãnh', slug: 'ma-thien-lanh', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop', toursCount: 3 },
  { id: 3, title: 'Bãi Bấc', slug: 'bai-bac', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=600&auto=format&fit=crop', toursCount: 4 },
  { id: 4, title: 'Làng chài Bãi Giếng', slug: 'lang-chai-bai-gieng', image: 'https://images.unsplash.com/photo-1582236390117-062e24d772f4?q=80&w=600&auto=format&fit=crop', toursCount: 2 },
  { id: 5, title: 'Bãi Thiên Tuế', slug: 'bai-thien-tue', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', toursCount: 6 },
];

export default function DestinationsSection({ destinations = [] }) {
  const scrollContainerRef = useRef(null);

  // Use mock data if no Sanity destinations exist, or map Sanity data
  const displayData = destinations.length > 0 ? destinations.map((d, index) => ({
    id: d._id || index,
    title: d.title,
    slug: d.slug,
    image: d.imageUrl || defaultDestinations[index % defaultDestinations.length].image,
    toursCount: Math.floor(Math.random() * 15) // Mock count if not available
  })) : defaultDestinations;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -344, behavior: 'smooth' }); // 320 width + 24 gap
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 344, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 bg-slate-200 overflow-hidden">
      {/* Background styling for the section */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950/80 z-10" />
        {/* Placeholder for an actual background image like in the screenshot */}
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col xl:flex-row items-center xl:items-start gap-12 xl:gap-16">

          {/* Left Text Content */}
          <div className="w-full xl:w-1/3 text-white xl:pt-12" data-aos="fade-up">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-1 uppercase tracking-tight drop-shadow-lg">Popular</h2>
            <div className="bg-orange-500 inline-block px-6 py-1 mb-10 transform -skew-x-12 shadow-lg rounded-lg">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white transform skew-x-12">Destination</h2>
            </div>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-12 max-w-xl">
              Khám phá vẻ đẹp hoang sơ của Hòn Sơn cùng những điểm đến nổi bật nhất.
              Từ những bãi biển cát trắng mịn trải dài đến những đỉnh núi hùng vĩ,
              chúng tôi mang đến cho bạn những trải nghiệm du lịch đích thực và khó quên nhất tại vùng biển Kiên Giang.
            </p>


          </div>

          {/* Right Carousel */}
          <div className="w-full xl:w-2/3 relative" data-aos="fade-up" data-aos-delay="200">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {displayData.map((dest) => (
                <div
                  key={dest.id}
                  className="relative flex-none w-[280px] md:w-[320px] h-[400px] md:h-[450px] rounded-2xl overflow-hidden snap-center group cursor-pointer shadow-xl shadow-black/50 hover:-translate-y-2 transition-transform duration-300"
                >
                  <img src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/80" />

                  {/* Cursive Title */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-5xl md:text-6xl font-['Caveat',_cursive] -rotate-6 transform drop-shadow-xl px-4 text-center">{dest.title}</h3>
                  </div>

                  {/* Footer Info */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2 text-white font-bold drop-shadow-md">
                    <Map className="w-[22px] h-[22px]" strokeWidth={2} />
                    <span className="text-lg">{dest.toursCount} Tour</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute -bottom-12 right-8 flex gap-4 xl:justify-center w-full xl:w-auto xl:left-1/2 xl:-translate-x-1/2">
              <button
                onClick={scrollLeft}
                className="p-3 md:p-4 bg-orange-500 hover:bg-orange-400 text-white rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={3} />
              </button>
              <button
                onClick={scrollRight}
                className="p-3 md:p-4 bg-orange-500 hover:bg-orange-400 text-white rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 z-10"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Google Font for Cursive specifically for this component */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}

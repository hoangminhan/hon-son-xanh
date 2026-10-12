"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_SLIDE_CLASS = 'flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] 2xl:flex-[0_0_20%]';

// slideClassName: độ rộng mỗi slide theo breakpoint (class Tailwind viết sẵn ở nơi gọi)
// controls: 'bar' (chấm trái + mũi tên phải, mặc định) | 'sides' (mũi tên hai bên, chấm căn giữa)
export default function AutoCarousel({ children, slideClassName = DEFAULT_SLIDE_CLASS, controls = 'bar' }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 2500, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  // Tăng mỗi lần Embla reInit (đổi kích thước màn hình) để đọc lại số chấm
  const [snapVersion, setSnapVersion] = useState(0);
  const scrollSnaps = useMemo(
    () => (emblaApi ? emblaApi.scrollSnapList() : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- snapVersion chỉ để tính lại sau reInit
    [emblaApi, snapVersion]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  // Chỉ setState trong callback sự kiện của Embla, không gọi đồng bộ trong effect
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onReInit = () => {
      setSnapVersion((v) => v + 1);
      onSelect();
    };
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onReInit);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onReInit);
    };
  }, [emblaApi]);

  const isSides = controls === 'sides';
  const arrowClass = 'w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-900/30 dark:hover:text-orange-400 transition-all duration-300 shadow-sm active:scale-95 cursor-pointer';

  const prevButton = (
    <button
      onClick={scrollPrev}
      aria-label="Slide trước"
      className={`${arrowClass} ${isSides ? 'hidden md:flex absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 shadow-md' : 'flex'}`}
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
  const nextButton = (
    <button
      onClick={scrollNext}
      aria-label="Slide tiếp theo"
      className={`${arrowClass} ${isSides ? 'hidden md:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 shadow-md' : 'flex'}`}
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );

  const dots = (
    <div className="flex gap-2 items-center">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollTo(index)}
          className={`transition-all duration-300 rounded-full ${
            index === selectedIndex
              ? 'w-8 h-2.5 bg-orange-500'
              : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );

  return (
    // Không đặt class "group" ở đây: thẻ con dùng group-hover sẽ bị kích hoạt cùng lúc
    <div className="w-full">
      <div className="relative">
        {/* Viewport */}
        <div className="overflow-hidden pb-8 pt-4 px-2 sm:px-0" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-6">
            {React.Children.map(children, (child) => (
              // Bắt buộc phải có flex flex-col để thẻ con (Card) có thể stretch full height
              <div className={`pl-4 md:pl-6 ${slideClassName} min-w-0 flex flex-col`}>
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* 'sides': mũi tên hai bên nội dung (ẩn trên điện thoại, dùng vuốt) */}
        {isSides && prevButton}
        {isSides && nextButton}
      </div>

      {isSides ? (
        <div className="flex justify-center mt-2">{dots}</div>
      ) : (
        // 'bar' (mặc định): chấm bên trái, mũi tên bên phải
        <div className="flex items-center justify-between mt-2 px-4 sm:px-2">
          {dots}
          <div className="flex items-center gap-3">
            {prevButton}
            {nextButton}
          </div>
        </div>
      )}
    </div>
  );
}

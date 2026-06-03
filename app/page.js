import Link from 'next/link';
import { client, safeFetch } from '../lib/sanity/client';
import { urlFor } from '../lib/sanity/image';
import DestinationsSection from '../components/DestinationsSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import AutoCarousel from '../components/AutoCarousel';
import TourCard from '../components/TourCard';
import BlogCard from '../components/BlogCard';
import { Star, Heart, Compass, ArrowRight } from 'lucide-react';
import { getCategoryConfig } from '../lib/categoryConfig';
import { featuredToursQuery, recentPostsQuery, allDestinationsQuery } from '../lib/sanity/queries';

export default async function Home() {
  const [featuredTours, recentPosts, destinations] = await Promise.all([
    safeFetch(featuredToursQuery).then(res => res || []),
    safeFetch(recentPostsQuery).then(res => res || []),
    safeFetch(allDestinationsQuery).then(res => {
      return (res || []).map(d => ({
        ...d,
        imageUrl: d.mainImage ? urlFor(d.mainImage).width(600).height(800).url() : null
      }));
    })
  ]);

  return (
    <div>
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10" />
          <div 
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
            style={{ transform: 'scale(1.05)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto w-full pt-20 pb-24 sm:pb-0">
          <div data-aos="fade-down" data-aos-duration="1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8 shadow-xl max-w-xs sm:max-w-none">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 animate-spin-slow flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase">Hành trình khám phá thiên nhiên</span>
            </div>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] leading-tight"
            data-aos="zoom-in" 
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            Khám Phá Vẻ Đẹp <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 drop-shadow-sm">Hoang Sơ Hòn Sơn</span>
          </h1>
          
          <p 
            className="text-lg md:text-2xl mb-12 text-slate-200 max-w-3xl mx-auto font-medium drop-shadow-md leading-relaxed"
            data-aos="fade-up" 
            data-aos-delay="400"
          >
            Tận hưởng bãi biển cát trắng, nước trong xanh và hải sản tươi ngon cùng những trải nghiệm nghỉ dưỡng không thể nào quên.
          </p>
          
          <div data-aos="fade-up" data-aos-delay="600">
            <Link 
              href="/tour" 
              className="group inline-flex items-center justify-center gap-3 bg-orange-500 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl hover:bg-orange-400 transition-all shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] hover:-translate-y-1 active:translate-y-0"
            >
              Xem Các Tour Hot Nhất
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator — ẩn trên mobile để tránh đè lên button */}
        <div className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce" data-aos="fade-in" data-aos-delay="1000">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center p-2">
            <div className="w-1.5 h-3 bg-orange-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Destinations Carousel Section */}
      <DestinationsSection destinations={destinations} />

      {/* Featured Tours */}
      <section className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">Tour Nổi Bật</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Khám phá những hành trình được yêu thích nhất với lịch trình hấp dẫn và dịch vụ trọn gói chuẩn mực.</p>
          </div>
          <AutoCarousel>
            {featuredTours.map((tour, index) => (
              <TourCard key={tour._id} tour={tour} index={index} />
            ))}
          </AutoCarousel>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Trải nghiệm nổi bật */}
      {/* <section className="py-12 md:py-20 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-12">Trải Nghiệm Đáng Nhớ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-950/20">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🌊</div>
              <h3 className="text-xl font-bold mb-2 dark:text-slate-100">Tắm Biển</h3>
              <p className="text-slate-600 dark:text-slate-300">Đắm mình trong làn nước trong vắt tại Bãi Bàng.</p>
            </div>
            <div className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-950/20">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🦞</div>
              <h3 className="text-xl font-bold mb-2 dark:text-slate-100">Hải Sản Tươi Sống</h3>
              <p className="text-slate-600 dark:text-slate-300">Thưởng thức hải sản vừa đánh bắt từ biển Hòn Sơn.</p>
            </div>
            <div className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-950/20">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⛰️</div>
              <h3 className="text-xl font-bold mb-2 dark:text-slate-100">Leo Núi</h3>
              <p className="text-slate-600 dark:text-slate-300">Chinh phục đỉnh Ma Thiên Lãnh hùng vĩ.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Recent Blog */}
      <section className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Cẩm Nang Du Lịch</h2>
          </div>
          <AutoCarousel>
            {recentPosts.map((post, index) => (
              <BlogCard 
                key={post._id} 
                post={post} 
                index={index} 
                delayConfig={{ type: 'carousel' }} 
              />
            ))}
          </AutoCarousel>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-orange-600 text-white text-center">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Bạn đã sẵn sàng cho chuyến đi?</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto text-lg">
            Liên hệ với chúng tôi để được tư vấn lịch trình chi tiết và nhận những ưu đãi hấp dẫn nhất cho chuyến du lịch Hòn Sơn của bạn.
          </p>
          <Link href="/lien-he" className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg">
            Liên hệ ngay
          </Link>
        </div>
      </section>
    </div>
  );
}

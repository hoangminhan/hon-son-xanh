import Link from 'next/link';
import { client, safeFetch } from '../lib/sanity/client';
import { urlFor } from '../lib/sanity/image';

export default async function Home() {
  const featuredToursQuery = `*[_type == "tour"] | order(_createdAt desc)[0...3] {
    _id, title, "slug": slug.current, excerpt, mainImage, duration, priceText
  }`;
  const recentPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0...3] {
    _id, title, "slug": slug.current, excerpt, mainImage, publishedAt
  }`;

  const [featuredTours, recentPosts] = await Promise.all([
    safeFetch(featuredToursQuery).then(res => res || []),
    safeFetch(recentPostsQuery).then(res => res || [])
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-orange-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          {/* Placeholder for hero image */}
          <div className="absolute inset-0 bg-orange-600/40 mix-blend-multiply z-10" />
          <div className="w-full h-full bg-gradient-to-r from-orange-500 to-amber-400" />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Khám Phá Vẻ Đẹp Hoang Sơ Hòn Sơn
          </h1>
          <p className="text-lg md:text-xl mb-8 text-orange-50 text-balance">
            Tận hưởng bãi biển cát trắng, nước trong xanh và hải sản tươi ngon cùng những trải nghiệm khó quên.
          </p>
          <Link href="/tour" className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg">
            Khám phá Tours
          </Link>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Tour Nổi Bật</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Những chuyến đi được yêu thích nhất do khách hàng bình chọn.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
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
        </div>
      </section>

      {/* Trải nghiệm nổi bật */}
      <section className="py-20 bg-white">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-12">Trải Nghiệm Đáng Nhớ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-6 rounded-2xl bg-orange-50">
                  <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🌊</div>
                  <h3 className="text-xl font-bold mb-2">Tắm Biển</h3>
                  <p className="text-slate-600">Đắm mình trong làn nước trong vắt tại Bãi Bàng.</p>
               </div>
               <div className="p-6 rounded-2xl bg-orange-50">
                  <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🦞</div>
                  <h3 className="text-xl font-bold mb-2">Hải Sản Tươi Sống</h3>
                  <p className="text-slate-600">Thưởng thức hải sản vừa đánh bắt từ biển Hòn Sơn.</p>
               </div>
               <div className="p-6 rounded-2xl bg-orange-50">
                  <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⛰️</div>
                  <h3 className="text-xl font-bold mb-2">Leo Núi</h3>
                  <p className="text-slate-600">Chinh phục đỉnh Ma Thiên Lãnh hùng vĩ.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Recent Blog */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Cẩm Nang Du Lịch</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post._id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="h-48 bg-slate-200 relative overflow-hidden">
                     {post.mainImage && <img src={urlFor(post.mainImage).width(600).height(400).url()} alt={`Hình ảnh minh họa cho bài viết ${post.title}`} className="w-full h-full object-cover" />}
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-orange-600 mb-2">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : ''}</p>
                    <h3 className="text-lg font-bold mb-2 text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-2">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Bạn đã sẵn sàng cho chuyến đi?</h2>
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

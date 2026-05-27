import Link from 'next/link';
import { client, safeFetch } from '../../lib/sanity/client';
import { urlFor } from '../../lib/sanity/image';
import { allToursQuery } from '../../lib/sanity/queries';
import PaginatedTourList from '../../components/PaginatedTourList';
import { Compass, Ticket, Clock, MapPin, MessageCircle, CalendarCheck, Send, ThumbsUp, ShieldCheck, Phone } from 'lucide-react';

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

  const coupons = [
    { id: 1, discount: 'Giảm 10%', desc: 'Áp dụng cho nhóm từ 4 khách trở lên. Liên hệ tư vấn viên để nhận ưu đãi.', color: 'from-orange-500 to-red-500' },
    { id: 2, discount: 'Giảm 200K', desc: 'Giảm trực tiếp khi đặt Tour 3 Ngày 2 Đêm trọn gói qua Zalo/Hotline.', color: 'from-teal-500 to-emerald-500' },
    { id: 3, discount: 'Giảm 15%', desc: 'Dành cho khách hàng chốt lịch sớm trước 30 ngày.', color: 'from-blue-500 to-indigo-500' },
  ];

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

      {/* Coupon Codes Section */}
      <section className="container mx-auto px-4 max-w-7xl relative z-30 -mt-16 md:-mt-20 mb-8 md:mb-12">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-5 md:p-8 rounded-[2rem] shadow-xl border border-white/50 dark:border-slate-700/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
              <span className="bg-orange-100 dark:bg-orange-900/50 text-orange-600 p-2.5 rounded-xl">
                <Ticket className="w-6 h-6" />
              </span>
              Ưu Đãi Đặc Quyền
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Áp dụng mã giảm giá khi liên hệ đặt tour trực tiếp</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {coupons.map((coupon, index) => (
              <div key={coupon.id} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group" data-aos="fade-up" data-aos-delay={index * 100}>
                {/* Left stub (Colored) */}
                <div className={`w-1/3 shrink-0 bg-gradient-to-br ${coupon.color} p-4 flex flex-col items-center justify-center text-white relative`}>
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 dark:bg-slate-900/50 rounded-full z-10" />
                  <h3 className="text-xl md:text-2xl font-black text-center leading-tight drop-shadow-sm">{coupon.discount}</h3>
                </div>
                
                {/* Right stub (Details) */}
                <div className="w-2/3 p-4 flex flex-col relative border-l-2 border-dashed border-slate-200 dark:border-slate-700 pl-6 bg-white dark:bg-slate-800/50">
                  <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm font-medium mb-4 line-clamp-3">{coupon.desc}</p>
                  
                  <div className="mt-auto flex items-center justify-end">
                    <Link href="/lien-he" className="text-[10px] sm:text-xs font-bold text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30 px-3 py-1.5 rounded-lg hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors uppercase tracking-wider shrink-0 flex items-center gap-1">
                      Nhận Ưu Đãi
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl pb-12 md:pb-16 pt-6">
        
        {tours.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 py-12">
            <p className="text-xl">Hiện tại chưa có tour nào. Vui lòng quay lại sau.</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">
                Tất Cả Các Tour
              </h2>
            </div>
            <PaginatedTourList tours={tours} initialCount={6} />
          </>
        )}
      </div>

      {/* ── Booking Guide ── */}
      <section className="bg-white dark:bg-slate-800/50 py-16 md:py-20 border-y border-slate-100 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-4">Quy Trình Đặt Tour Dễ Dàng</h2>
            <p className="text-slate-600 dark:text-slate-400">Vì trải nghiệm cá nhân hóa, chúng tôi hỗ trợ tư vấn trực tiếp để chọn lịch trình phù hợp nhất cho bạn.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[17%] w-[66%] h-0.5 bg-transparent border-t-2 border-dashed border-slate-200 dark:border-slate-700 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-white dark:border-slate-800">
                <MapPin className="w-10 h-10 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">1. Chọn Tour Yêu Thích</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Tham khảo danh sách các tour Hòn Sơn hoặc combo phòng + vé tàu phù hợp với nhu cầu.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-white dark:border-slate-800">
                <MessageCircle className="w-10 h-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">2. Nhận Tư Vấn Trực Tiếp</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Nhắn tin Zalo hoặc gọi Hotline. Tư vấn viên sẽ kiểm tra lịch trống và báo giá ưu đãi nhất.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-white dark:border-slate-800">
                <CalendarCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">3. Chốt Lịch & Khởi Hành</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Chuyển khoản cọc giữ chỗ. Chuẩn bị hành lý và sẵn sàng tận hưởng chuyến đi tuyệt vời.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/lien-he" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-orange-500/30">
              <Send className="w-5 h-5" />
              Liên Hệ Đặt Tour Ngay
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-black rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="text-center mb-10 text-white">
                <h2 className="text-2xl md:text-3xl font-black mb-4">Tại Sao Nên Đặt Tour Cùng Hòn Sơn Xanh?</h2>
                <p className="text-slate-300">Chúng tôi cam kết mang lại trải nghiệm du lịch trọn vẹn và an tâm tuyệt đối.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-orange-400">
                    <ThumbsUp className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">Giá Tốt, Không Phụ Phí</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Cam kết báo giá trọn gói minh bạch ngay từ đầu, tuyệt đối không có chi phí ẩn hay phụ phí bất ngờ trong chuyến đi.</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-teal-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">An Toàn & Chuyên Nghiệp</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Đội ngũ hướng dẫn viên bản địa am hiểu địa hình, đảm bảo an toàn tối đa cho du khách trong mọi hoạt động khám phá.</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">Hỗ Trợ Nhanh Chóng 24/7</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Tư vấn viên và hướng dẫn viên luôn đồng hành và sẵn sàng hỗ trợ giải quyết mọi vấn đề phát sinh của bạn 24/7.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

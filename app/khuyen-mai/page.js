import Link from 'next/link';
import { Tag, Ticket, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Khuyến Mãi',
  description: 'Tổng hợp các chương trình khuyến mãi, ưu đãi giảm giá và combo tiết kiệm khi du lịch Hòn Sơn.',
  openGraph: {
    title: 'Khuyến Mãi | Hòn Sơn Xanh',
    description: 'Tổng hợp các chương trình khuyến mãi, ưu đãi giảm giá.',
    url: '/khuyen-mai',
    images: ['/images/og-default.jpg'],
  },
};

export default function PromotionPage() {
  const coupons = [
    { id: 1, code: 'HONSON2026', discount: 'Giảm 10%', desc: 'Áp dụng cho nhóm từ 4 khách trở lên. Áp dụng cho mọi tour.', expiry: '31/12/2026', color: 'from-orange-500 to-red-500' },
    { id: 2, code: 'MUAHEVUIVE', discount: 'Giảm 200K', desc: 'Áp dụng trực tiếp cho Tour 3 Ngày 2 Đêm trọn gói.', expiry: '30/08/2026', color: 'from-teal-500 to-emerald-500' },
    { id: 3, code: 'EARLYBIRD', discount: 'Giảm 15%', desc: 'Ưu đãi đặc biệt khi khách hàng đặt trước 30 ngày.', expiry: 'Không thời hạn', color: 'from-blue-500 to-indigo-500' },
  ];

  const saleTours = [
    { id: 1, title: 'Tour Khám Phá Hòn Sơn 2N1D', oldPrice: '1,500,000đ', newPrice: '1,290,000đ', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop', badge: 'HOT DEAL' },
    { id: 2, title: 'Tour Trải Nghiệm 3N2D Trọn Gói', oldPrice: '2,200,000đ', newPrice: '1,890,000đ', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=600&auto=format&fit=crop', badge: '-15%' },
    { id: 3, title: 'Combo Tiết Kiệm: Vé Tàu + Khách Sạn', oldPrice: '900,000đ', newPrice: '750,000đ', image: 'https://images.unsplash.com/photo-1582236390117-062e24d772f4?q=80&w=600&auto=format&fit=crop', badge: 'BEST SELLER' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/70 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-500/30 blur-3xl rounded-full -translate-y-1/2 z-10" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-teal-500/30 blur-3xl rounded-full -translate-y-1/2 z-10" />

        <div className="container mx-auto px-4 relative z-20 text-center" data-aos="zoom-in" data-aos-duration="1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
            <Tag className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-semibold tracking-wider uppercase">Siêu Ưu Đãi 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-lg leading-tight">
            Khám Phá Hòn Sơn <br />
            <span className="text-orange-500">Tiết Kiệm Hơn Bao Giờ Hết</span>
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
            Tổng hợp các chương trình khuyến mãi, mã giảm giá và combo siêu hời chỉ có tại Hòn Sơn Xanh. Đặt sớm, giá tốt!
          </p>
        </div>
      </section>

      {/* Coupon Codes Section */}
      <section className="py-12 md:py-20 container mx-auto px-4 -mt-10 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((coupon, index) => (
            <div key={coupon.id} className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay={index * 100}>
              {/* Top part with color */}
              <div className={`bg-gradient-to-r ${coupon.color} p-6 text-white text-center relative`}>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-white dark:bg-slate-800 rounded-full" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white dark:bg-slate-800 rounded-full" />
                <Ticket className="w-10 h-10 mx-auto mb-2 opacity-80" />
                <h3 className="text-3xl font-black">{coupon.discount}</h3>
              </div>
              
              {/* Bottom part with details */}
              <div className="p-6 flex flex-col flex-grow relative border-t-2 border-dashed border-slate-200 dark:border-slate-600">
                <p className="text-slate-600 dark:text-slate-300 font-medium mb-4 flex-grow text-center">{coupon.desc}</p>
                
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-xl flex items-center justify-between group cursor-pointer mb-4 border border-transparent hover:border-orange-300 transition-colors">
                  <span className="font-mono font-bold text-lg text-slate-800 dark:text-white tracking-widest">{coupon.code}</span>
                  <span className="text-xs font-bold bg-orange-500 text-white px-3 py-1.5 rounded-lg group-hover:bg-orange-600 transition-colors uppercase">Copy Code</span>
                </div>
                
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Hạn sử dụng: {coupon.expiry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale Tours Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 dark:border-slate-700 pb-6" data-aos="fade-up">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Flash Sale</h2>
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">Giảm giá cực sốc - Số lượng có hạn</p>
            </div>
            <Link href="/tour" className="mt-4 md:mt-0 text-orange-600 hover:text-orange-700 font-bold flex items-center gap-2 group">
              Xem tất cả Tour
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {saleTours.map((tour, index) => (
              <div key={tour.id} className="bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col group border border-slate-100 dark:border-slate-700" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="h-60 relative overflow-hidden">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {tour.badge}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white line-clamp-2 leading-snug">{tour.title}</h3>
                  
                  <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-through mb-1 decoration-red-500/50">{tour.oldPrice}</p>
                        <p className="text-2xl font-black text-orange-600 dark:text-orange-400">{tour.newPrice}</p>
                      </div>
                      <Link href="/tour" className="px-5 py-2.5 bg-slate-900 dark:bg-orange-500 text-white font-bold rounded-full hover:bg-slate-800 dark:hover:bg-orange-600 transition-colors shadow-md">
                        Đặt Ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Trust Section below Promos */}
      <section className="py-12 md:py-20 bg-orange-50 dark:bg-slate-900 transition-colors border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl" data-aos="zoom-in-up">
          <div className="bg-white dark:bg-slate-800 p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 text-center">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8">Tại Sao Nên Đặt Tour Cùng Hòn Sơn Xanh?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Giá Luôn Tốt Nhất</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Cam kết không có chi phí ẩn, luôn cập nhật các deal tốt nhất cho khách hàng.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Hỗ Trợ 24/7</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Đội ngũ CSKH luôn sẵn sàng giải đáp mọi thắc mắc của bạn trước và trong chuyến đi.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Thanh Toán An Toàn</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Đa dạng phương thức thanh toán, bảo mật thông tin tuyệt đối.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


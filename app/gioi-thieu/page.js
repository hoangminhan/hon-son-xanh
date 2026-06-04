import Link from 'next/link';
import { Shield, Heart, Leaf, Users, Map, Award, Smile, Info } from 'lucide-react';

export const metadata = {
  title: 'Giới Thiệu',
  description: 'Tìm hiểu về Hòn Sơn Xanh và đội ngũ của chúng tôi. Chúng tôi tự hào mang đến những trải nghiệm du lịch tốt nhất tại Hòn Sơn.',
  openGraph: {
    title: 'Giới Thiệu | Hòn Sơn Xanh',
    description: 'Tìm hiểu về Hòn Sơn Xanh và đội ngũ của chúng tôi.',
    url: '/gioi-thieu',
    images: ['/images/og-default.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      {/* ── Hero Section ── */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        </div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl z-10 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6 text-sm font-semibold">
            <Info className="w-4 h-4 text-orange-400" />
            Về Chúng Tôi
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Đam Mê Khám Phá <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Biển Đảo</span> Quê Hương
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Hòn Sơn Xanh không chỉ là một công ty du lịch, chúng tôi là những người con của biển, mang sứ mệnh lan tỏa vẻ đẹp hoang sơ của Hòn Sơn đến mọi người.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 relative w-full" data-aos="fade-right">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 aspect-[3/4] md:aspect-square lg:aspect-[4/5]">
              <img src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop" alt="Câu chuyện Hòn Sơn Xanh" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            {/* Decoration blocks */}
            <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 w-32 h-32 md:w-48 md:h-48 bg-orange-100 dark:bg-orange-900/30 rounded-3xl -z-10" />
            <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-32 h-32 md:w-48 md:h-48 bg-slate-100 dark:bg-slate-800 rounded-full -z-10" />
          </div>
          <div className="lg:w-1/2" data-aos="fade-left">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Câu Chuyện Của <br className="hidden md:block" />
              <span className="text-orange-600 dark:text-orange-500">Hòn Sơn Xanh</span>
            </h2>
            <div className="prose md:prose-lg prose-slate dark:prose-invert">
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                Bắt nguồn từ tình yêu mãnh liệt với thiên nhiên và khát khao bảo tồn vẻ đẹp hoang sơ của quê hương, <strong>Hòn Sơn Xanh</strong> được thành lập bởi những thanh niên sinh ra và lớn lên tại hòn đảo này.
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                Những ngày đầu, Hòn Sơn chỉ là một điểm đến xa lạ với du khách. Chúng tôi bắt đầu bằng việc tự tay dẫn dắt những vị khách đầu tiên đi khám phá các bãi tắm ẩn mình, những con suối róc rách và đỉnh Ma Thiên Lãnh đầy sương mù.
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                Ngày nay, dù đã phục vụ hàng ngàn du khách, triết lý của chúng tôi vẫn không thay đổi: Mang đến trải nghiệm du lịch <strong>chân thực nhất, gần gũi nhất</strong> và luôn đặt ý thức bảo vệ môi trường lên hàng đầu.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 shrink-0">
                <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format&fit=crop" alt="Founder" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg">Anh Hoàng</p>
                <p className="text-orange-600 dark:text-orange-500 font-medium">Nhà sáng lập Hòn Sơn Xanh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-orange-50 dark:bg-slate-800/30 transition-colors border-y border-orange-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-x-0 lg:divide-x lg:divide-orange-200 dark:divide-slate-700 text-center">
            <div className="flex flex-col items-center p-2 md:p-4" data-aos="fade-up" data-aos-delay="0">
              <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4 shadow-sm">
                <Award className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">5+</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Năm Kinh Nghiệm</p>
            </div>
            <div className="flex flex-col items-center p-2 md:p-4 lg:pl-8" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4 shadow-sm">
                <Smile className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">2,000+</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Khách Hàng Hài Lòng</p>
            </div>
            <div className="flex flex-col items-center p-2 md:p-4 lg:pl-8" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4 shadow-sm">
                <Users className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">100%</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Hướng Dẫn Viên Bản Địa</p>
            </div>
            <div className="flex flex-col items-center p-2 md:p-4 lg:pl-8" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4 shadow-sm">
                <Map className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">300+</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Chuyến Đi Mỗi Năm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12 md:py-20 container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-sm font-bold tracking-[0.2em] text-slate-400 mb-4 uppercase">Tại sao chọn chúng tôi</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Giá Trị Cốt Lõi</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 lg:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-700 text-center group hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="0">
            <div className="w-20 h-20 mx-auto bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform">
              <Heart className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tận Tâm & Chu Đáo</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Phục vụ khách hàng như người thân trong gia đình, chăm lo từng bữa ăn, giấc ngủ để chuyến đi trọn vẹn nhất.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 lg:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-700 text-center group hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
            <div className="w-20 h-20 mx-auto bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-8 -rotate-3 group-hover:-rotate-6 transition-transform">
              <Leaf className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Du Lịch Xanh</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Ưu tiên các hoạt động bảo vệ môi trường, dọn rác bãi biển và hạn chế rác thải nhựa trong mọi hành trình.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 lg:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-700 text-center group hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
            <div className="w-20 h-20 mx-auto bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform">
              <Shield className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Uy Tín Hàng Đầu</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Cam kết chất lượng dịch vụ đúng như quảng cáo, không phụ thu ẩn, đảm bảo an toàn tuyệt đối cho du khách.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8">Sẵn Sàng Cho Chuyến Đi Đáng Nhớ?</h2>
          <p className="text-orange-50 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
            Hãy để chúng tôi đồng hành cùng bạn khám phá những bãi biển tuyệt đẹp và thưởng thức hải sản tươi ngon nhất Hòn Sơn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tour" className="px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-full hover:bg-slate-50 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center">
              Khám Phá Tour Ngay
            </Link>
            <Link href="/lien-he" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
              Liên Hệ Tư Vấn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

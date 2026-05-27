import { client, safeFetch } from '../../lib/sanity/client';
import { siteSettingsQuery } from '../../lib/sanity/queries';
import { Mail } from 'lucide-react';

export const metadata = {
  title: 'Liên Hệ',
  description: 'Liên hệ với chúng tôi để đặt tour và nhận tư vấn miễn phí về du lịch Hòn Sơn.',
  openGraph: {
    title: 'Liên Hệ | Hòn Sơn Xanh',
    description: 'Liên hệ với chúng tôi để đặt tour và nhận tư vấn miễn phí.',
    url: 'https://honsonxanh.com/lien-he',
  },
};

export default async function ContactPage() {
  const settings = await safeFetch(siteSettingsQuery) || {};

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors">
      
      {/* ── Hero Section ── */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        </div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl z-10 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6 text-sm font-semibold">
            <Mail className="w-4 h-4 text-orange-400" />
            Hỗ trợ & Tư vấn
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Liên Hệ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Với Chúng Tôi</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn thiết kế một chuyến đi Hòn Sơn hoàn hảo nhất.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Thông tin liên hệ</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ qua các kênh dưới đây hoặc điền vào form, chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-xl">📞</div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Hotline</h3>
                  <p className="text-slate-600 dark:text-slate-300">{settings.phone || 'Đang cập nhật'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-xl">💬</div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Zalo</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {settings.zaloUrl ? (
                      <a href={settings.zaloUrl} target="_blank" rel="noreferrer" className="text-orange-600 dark:text-orange-400 hover:underline">Chat Zalo ngay</a>
                    ) : 'Đang cập nhật'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-xl">📘</div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Facebook</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {settings.facebookUrl ? (
                      <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="text-orange-600 dark:text-orange-400 hover:underline">Fanpage của chúng tôi</a>
                    ) : 'Đang cập nhật'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-xl">📍</div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Địa chỉ</h3>
                  <p className="text-slate-600 dark:text-slate-300">{settings.address || 'Đảo Hòn Sơn, Kiên Hải, Kiên Giang'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Gửi tin nhắn</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="name">Họ và tên</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent dark:text-white dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="phone">Số điện thoại</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent dark:text-white dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="message">Nội dung</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent dark:text-white dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                  placeholder="Nhập nội dung cần tư vấn"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="cursor-pointer w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Gửi Yêu Cầu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import { client, safeFetch } from '../../lib/sanity/client';
import { siteSettingsQuery } from '../../lib/sanity/queries';

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
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold text-slate-800 mb-12 text-center">Liên Hệ Với Chúng Tôi</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Thông tin liên hệ</h2>
            <p className="text-slate-600 mb-8">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ qua các kênh dưới đây hoặc điền vào form, chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">📞</div>
                <div>
                  <h3 className="font-bold text-slate-800">Hotline</h3>
                  <p className="text-slate-600">{settings.phone || 'Đang cập nhật'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">💬</div>
                <div>
                  <h3 className="font-bold text-slate-800">Zalo</h3>
                  <p className="text-slate-600">
                    {settings.zaloUrl ? (
                      <a href={settings.zaloUrl} target="_blank" rel="noreferrer" className="text-orange-600 hover:underline">Chat Zalo ngay</a>
                    ) : 'Đang cập nhật'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">📘</div>
                <div>
                  <h3 className="font-bold text-slate-800">Facebook</h3>
                  <p className="text-slate-600">
                    {settings.facebookUrl ? (
                      <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="text-orange-600 hover:underline">Fanpage của chúng tôi</a>
                    ) : 'Đang cập nhật'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">📍</div>
                <div>
                  <h3 className="font-bold text-slate-800">Địa chỉ</h3>
                  <p className="text-slate-600">{settings.address || 'Đảo Hòn Sơn, Kiên Hải, Kiên Giang'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Gửi tin nhắn</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">Họ và tên</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="phone">Số điện thoại</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="message">Nội dung</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                  placeholder="Nhập nội dung cần tư vấn"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors"
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

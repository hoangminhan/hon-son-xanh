import { safeFetch } from '../lib/sanity/client';
import { siteSettingsQuery } from '../lib/sanity/queries';

export default async function FloatingZalo() {
  const settings = await safeFetch(siteSettingsQuery);
  const zaloUrl = settings?.zaloUrl || 'https://zalo.me/0123456789'; // Thay bằng URL mặc định nếu chưa cài

  return (
    <a 
      href={zaloUrl} 
      target="_blank" 
      rel="noreferrer" 
      className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 group flex items-center justify-center w-14 h-14 bg-[#0068FF] rounded-full shadow-[0_4px_15px_rgba(0,104,255,0.4)] hover:shadow-[0_6px_25px_rgba(0,104,255,0.6)] hover:-translate-y-1 transition-all duration-300"
      aria-label="Chat Zalo"
    >
      {/* Hiệu ứng sóng toả ra xung quanh */}
      <div className="absolute inset-0 rounded-full bg-[#0068FF] animate-ping opacity-60 group-hover:opacity-100 duration-1000"></div>
      
      {/* Nút chính */}
      <div className="relative z-10 flex items-center justify-center w-full h-full bg-[#0068FF] rounded-full">
        <span className="font-black text-white text-sm tracking-wider">Zalo</span>
      </div>
    </a>
  );
}

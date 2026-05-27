import { safeFetch } from '../lib/sanity/client';
import { siteSettingsQuery } from '../lib/sanity/queries';
import { Phone } from 'lucide-react';

export default async function FloatingContacts() {
  const settings = await safeFetch(siteSettingsQuery) || {};
  const zaloUrl = settings?.zaloUrl || 'https://zalo.me/0123456789'; // Thay bằng URL mặc định nếu chưa cài
  const facebookUrl = settings?.facebookUrl || 'https://facebook.com';
  const phone = settings?.phone || '0123456789';

  return (
    <div className="fixed bottom-6 left-6 lg:bottom-10 lg:left-5 z-50 flex flex-col gap-4">
      {/* Facebook */}
      <a 
        href={facebookUrl} 
        target="_blank" 
        rel="noreferrer" 
        className="group relative flex items-center justify-center w-14 h-14 bg-[#1877F2] rounded-full shadow-[0_4px_15px_rgba(24,119,242,0.4)] hover:shadow-[0_6px_25px_rgba(24,119,242,0.6)] hover:-translate-y-1 transition-all duration-300"
        aria-label="Facebook"
      >
        <div className="absolute inset-0 rounded-full bg-[#1877F2] animate-ping opacity-50" style={{ animationDuration: '2s' }}></div>
        <div className="absolute inset-0 rounded-full bg-[#1877F2] animate-ping opacity-30" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
        <div className="relative z-10 flex items-center justify-center w-full h-full bg-[#1877F2] rounded-full">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white pb-0.5 pr-0.5">
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10V22h4v-8.5z"/>
          </svg>
        </div>
      </a>

      {/* Zalo */}
      <a 
        href={zaloUrl} 
        target="_blank" 
        rel="noreferrer" 
        className="group relative flex items-center justify-center w-14 h-14 bg-[#0068FF] rounded-full shadow-[0_4px_15px_rgba(0,104,255,0.4)] hover:shadow-[0_6px_25px_rgba(0,104,255,0.6)] hover:-translate-y-1 transition-all duration-300"
        aria-label="Chat Zalo"
      >
        <div className="absolute inset-0 rounded-full bg-[#0068FF] animate-ping opacity-50" style={{ animationDuration: '2s', animationDelay: '0.2s' }}></div>
        <div className="absolute inset-0 rounded-full bg-[#0068FF] animate-ping opacity-30" style={{ animationDuration: '2.5s', animationDelay: '0.7s' }}></div>
        <div className="relative z-10 flex items-center justify-center w-full h-full bg-[#0068FF] rounded-full">
          <span className="font-black text-white text-[15px] tracking-wide">Zalo</span>
        </div>
      </a>

      {/* Phone */}
      <a 
        href={`tel:${phone.replace(/\s+/g, '')}`} 
        className="group relative flex items-center justify-center w-14 h-14 bg-[#F27024] rounded-full shadow-[0_4px_15px_rgba(242,112,36,0.4)] hover:shadow-[0_6px_25px_rgba(242,112,36,0.6)] hover:-translate-y-1 transition-all duration-300"
        aria-label="Call Now"
      >
        <div className="absolute inset-0 rounded-full bg-[#F27024] animate-ping opacity-50" style={{ animationDuration: '2s', animationDelay: '0.4s' }}></div>
        <div className="absolute inset-0 rounded-full bg-[#F27024] animate-ping opacity-30" style={{ animationDuration: '2.5s', animationDelay: '0.9s' }}></div>
        <div className="relative z-10 flex items-center justify-center w-full h-full bg-[#F27024] rounded-full">
          <Phone className="w-6 h-6 text-white fill-white" />
        </div>
      </a>
    </div>
  );
}

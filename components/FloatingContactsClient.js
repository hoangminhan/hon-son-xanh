"use client";

import { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

export default function FloatingContactsClient({ facebookUrl, zaloUrl, phone }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Các nút liên hệ con */}
      <div 
        className={`flex flex-col gap-4 items-center transition-all duration-300 origin-bottom ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Facebook */}
        <a 
          href={facebookUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="group relative flex items-center justify-center w-12 h-12 bg-[#1877F2] rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white pb-0.5 pr-0.5">
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10V22h4v-8.5z"/>
          </svg>
          <span className="absolute right-full mr-4 px-3 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm font-medium rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Messenger
          </span>
        </a>

        {/* Zalo */}
        <a 
          href={zaloUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="group relative flex items-center justify-center w-12 h-12 bg-[#0068FF] rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Chat Zalo"
        >
          <span className="font-black text-white text-[13px] tracking-wide">Zalo</span>
          <span className="absolute right-full mr-4 px-3 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm font-medium rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Zalo
          </span>
        </a>

        {/* Phone */}
        <a 
          href={`tel:${phone.replace(/\s+/g, '')}`} 
          className="group relative flex items-center justify-center w-12 h-12 bg-[#F27024] rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Call Now"
        >
          <Phone className="w-5 h-5 text-white fill-white" />
          <span className="absolute right-full mr-4 px-3 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm font-medium rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Hotline
          </span>
        </a>
      </div>

      {/* Nút chính (Toggle Button) */}
      <button 
        onClick={toggleMenu}
        className="relative flex items-center justify-center w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full shadow-[0_4px_15px_rgba(249,115,22,0.4)] transition-colors z-10"
        aria-label="Toggle Contact Menu"
      >
        {/* Hiệu ứng toả sáng (Pulse) chỉ chạy khi đóng */}
        {!isOpen && (
          <>
            <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-50" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-30" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
          </>
        )}
        
        <div className={`relative z-10 transition-transform duration-300 ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}>
          <MessageCircle className="w-7 h-7 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className={`relative z-10 transition-transform duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`}>
          <X className="w-7 h-7 text-white" />
        </div>
      </button>
    </div>
  );
}

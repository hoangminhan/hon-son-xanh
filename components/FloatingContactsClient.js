"use client";

import { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

export default function FloatingContactsClient({ facebookUrl, zaloUrl, phone }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Các nút liên hệ con */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Facebook (Top) */}
        <a 
          href={facebookUrl} 
          target="_blank" 
          rel="noreferrer" 
          className={`absolute top-1 left-1 flex items-center justify-center w-12 h-12 bg-[#1877F2] rounded-full shadow-lg transition-all duration-300 pointer-events-auto hover:scale-110 group ${
            isOpen ? 'opacity-100 -translate-y-[85px] translate-x-0 scale-100' : 'opacity-0 translate-y-0 translate-x-0 scale-50 pointer-events-none'
          }`}
          aria-label="Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white pb-0.5 pr-0.5">
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7.5v4H10V22h4v-8.5z"/>
          </svg>
          <span className="absolute right-full mr-4 px-3 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm font-medium rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Messenger
          </span>
        </a>

        {/* Zalo (Top Left) */}
        <a 
          href={zaloUrl} 
          target="_blank" 
          rel="noreferrer" 
          className={`absolute top-1 left-1 flex items-center justify-center w-12 h-12 bg-[#0068FF] rounded-full shadow-lg transition-all duration-300 pointer-events-auto hover:scale-110 group ${
            isOpen ? 'opacity-100 -translate-x-[65px] -translate-y-[65px] scale-100' : 'opacity-0 translate-x-0 translate-y-0 scale-50 pointer-events-none'
          }`}
          aria-label="Chat Zalo"
        >
          <span className="font-black text-white text-[14px] tracking-wide">Zalo</span>
          <span className="absolute right-full mr-4 px-3 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm font-medium rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Zalo
          </span>
        </a>

        {/* Phone (Left) */}
        <a 
          href={`tel:${phone.replace(/\s+/g, '')}`} 
          className={`absolute top-1 left-1 flex items-center justify-center w-12 h-12 bg-[#22c55e] rounded-full shadow-lg transition-all duration-300 pointer-events-auto hover:scale-110 group ${
            isOpen ? 'opacity-100 -translate-x-[85px] translate-y-0 scale-100' : 'opacity-0 translate-x-0 translate-y-0 scale-50 pointer-events-none'
          }`}
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
        className="relative flex items-center justify-center w-14 h-14 bg-teal-600 hover:bg-teal-700 rounded-full shadow-[0_4px_15px_rgba(13,148,136,0.4)] transition-colors z-10"
        aria-label="Toggle Contact Menu"
      >
        {/* Hiệu ứng toả sáng (Pulse) chỉ chạy khi đóng */}
        {!isOpen && (
          <>
            <div className="absolute inset-0 rounded-full bg-teal-500 animate-ping opacity-50" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-0 rounded-full bg-teal-500 animate-ping opacity-30" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
          </>
        )}
        
        {/* Icon Chat */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white ml-0.5 mt-0.5">
            <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
            <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
          </svg>
        </div>
        
        {/* Icon X */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}>
          <X className="w-7 h-7 text-white" strokeWidth={2.5} />
        </div>
      </button>
    </div>
  );
}

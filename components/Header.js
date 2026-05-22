"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const getLinkClasses = (path) => {
    const isActive = path === '/' ? pathname === path : pathname.startsWith(path);
    return `font-medium transition-colors ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400'}`;
  };

  const getMobileLinkClasses = (path) => {
    const isActive = path === '/' ? pathname === path : pathname.startsWith(path);
    return `block py-3 text-lg font-medium transition-colors ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-slate-800 dark:text-slate-200'}`;
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const ThemeToggle = () => {
    if (!mounted) return <div className="w-9 h-9"></div>;
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors rounded-full"
        aria-label="Toggle Dark Mode"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    );
  };

  return (
    <>
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-orange-600" onClick={closeMobileMenu}>
            <Image src="/logo.png" alt="Logo" width={120} height={120} className="dark:brightness-200 dark:contrast-200 transition-all" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={getLinkClasses('/')}>Trang chủ</Link>
            <Link href="/gioi-thieu" className={getLinkClasses('/gioi-thieu')}>Giới thiệu</Link>
            <Link href="/tour" className={getLinkClasses('/tour')}>Tours</Link>
            <Link href="/khuyen-mai" className={getLinkClasses('/khuyen-mai')}>Khuyến mãi</Link>
            <Link href="/blog" className={getLinkClasses('/blog')}>Blog</Link>
            <Link href="/lien-he" className={getLinkClasses('/lien-he')}>Liên hệ</Link>
            <div className="border-l border-slate-200 dark:border-slate-700 pl-6 ml-2">
              <ThemeToggle />
            </div>
          </nav>
          
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button 
              className="text-slate-600 dark:text-slate-300 p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <div 
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
          <div className="flex flex-col h-full p-6 pt-12">
            
            {/* Header of Mobile Menu */}
            <div className="relative flex items-center justify-center mb-10">
              <button 
                onClick={closeMobileMenu}
                className="absolute left-0 p-2 text-slate-800 dark:text-slate-200"
              >
                <X className="w-6 h-6" />
              </button>
              <Image src="/logo.png" alt="Logo" width={100} height={100} className="dark:brightness-200 dark:contrast-200" />
            </div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Menu</h2>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-2 flex-grow">
              <Link href="/" className={getMobileLinkClasses('/')} onClick={closeMobileMenu}>Trang chủ</Link>
              <Link href="/gioi-thieu" className={getMobileLinkClasses('/gioi-thieu')} onClick={closeMobileMenu}>Giới thiệu</Link>
              <Link href="/tour" className={getMobileLinkClasses('/tour')} onClick={closeMobileMenu}>Tours</Link>
              <Link href="/khuyen-mai" className={getMobileLinkClasses('/khuyen-mai')} onClick={closeMobileMenu}>Khuyến mãi</Link>
              <Link href="/blog" className={getMobileLinkClasses('/blog')} onClick={closeMobileMenu}>Blog</Link>
              <Link href="/lien-he" className={getMobileLinkClasses('/lien-he')} onClick={closeMobileMenu}>Liên hệ</Link>
            </nav>

            {/* Footer Links */}
            <div className="mt-auto pt-8 flex flex-col space-y-4 pb-8">
              <Link href="/#" className="text-sm font-medium text-slate-600 dark:text-slate-400" onClick={closeMobileMenu}>Điều khoản dịch vụ</Link>
              <Link href="/#" className="text-sm font-medium text-slate-600 dark:text-slate-400" onClick={closeMobileMenu}>Chính sách bảo mật</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

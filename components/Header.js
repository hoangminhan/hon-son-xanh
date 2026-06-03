"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Trang chủ' },
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/tour', label: 'Tours' },
  { href: '/bai-viet', label: 'Bài viết' },
  { href: '/lien-he', label: 'Liên hệ' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const ThemeToggle = () => {
    if (!mounted) return <div className="w-9 h-9" />;
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-200"
        aria-label="Chuyển giao diện sáng/tối"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    );
  };

  return (
    <>
      {/* ── Sticky Header ── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-md shadow-black/5 border-b border-slate-100/80 dark:border-slate-800/60 py-0'
            : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/50 py-0'
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16 md:h-18' : 'h-20 md:h-24'}`}>

            {/* Logo — shrinks on scroll */}
            <Link href="/" onClick={closeMobileMenu} className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="Hòn Sơn Xanh"
                width={280}
                height={112}
                className={`w-auto object-contain origin-left dark:brightness-200 dark:contrast-200 transition-all duration-300 ${
                  scrolled ? 'h-12 md:h-14' : 'h-14 md:h-20'
                }`}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {label}
                    {/* Active bottom line */}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-orange-500" />
                    )}
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-2" />

              <ThemeToggle />

              {/* CTA */}
              <Link
                href="/tour"
                className="ml-1 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.03] hover:-translate-y-px transition-all duration-200"
              >
                Đặt tour ngay
              </Link>
            </nav>

            {/* Mobile controls */}
            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle />
              <button
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Mở menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />

      {/* Slide panel from right */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[100] w-[78vw] max-w-[320px] flex flex-col bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <Image
            src="/logo.png"
            alt="Hòn Sơn Xanh"
            width={150}
            height={60}
            className="h-9 w-auto object-contain dark:brightness-200 dark:contrast-200"
          />
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col p-3 gap-0.5 flex-grow overflow-y-auto">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{label}</span>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-orange-400' : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <Link
            href="/tour"
            onClick={closeMobileMenu}
            className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Đặt tour ngay 🏝️
          </Link>
        </div>
      </div>
    </>
  );
}

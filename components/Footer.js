import Link from 'next/link';
import { safeFetch } from '../lib/sanity/client';
import { siteSettingsQuery } from '../lib/sanity/queries';
import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react';

export default async function Footer() {
  const settings = await safeFetch(siteSettingsQuery) || {};

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/gioi-thieu', label: 'Giới thiệu' },
    { href: '/tour', label: 'Tours' },
    { href: '/khuyen-mai', label: 'Khuyến mãi' },
    { href: '/bai-viet', label: 'Bài viết' },
    { href: '/lien-he', label: 'Liên hệ' },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-black text-white mt-auto">
      {/* Accent line top */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="relative overflow-hidden">
        {/* Decorative blur orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Main grid */}
        <div className="max-w-[1380px] mx-auto px-4 md:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* ── Col 1: Brand (chiếm 2 cột trên lg) ── */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌿</span>
                <span className="text-2xl font-black text-white tracking-tight">
                  {settings.siteName || 'Hòn Sơn Xanh'}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-7 max-w-sm">
                {settings.description || 'Trải nghiệm vẻ đẹp hoang sơ của Hòn Sơn cùng những dịch vụ du lịch tốt nhất. Chúng tôi mang đến hành trình khó quên trên đảo Hòn Sơn, Kiên Giang.'}
              </p>

              {/* Social / Contact icon buttons */}
              <div className="flex items-center gap-3">
                {settings.facebookUrl && (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {settings.zaloUrl && (
                  <a
                    href={settings.zaloUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Zalo"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#0068FF] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg text-xs font-black"
                  >
                    Zalo
                  </a>
                )}
                {settings.phone && (
                  <a
                    href={`tel:${settings.phone}`}
                    aria-label="Gọi điện"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
                {settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    aria-label="Email"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-teal-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* ── Col 2: Nav links ── */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-5">
                Khám phá
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-all duration-200 text-sm group"
                    >
                      <span className="w-1 h-1 rounded-full bg-orange-500/60 group-hover:bg-orange-400 group-hover:w-2 transition-all duration-200 shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Contact info ── */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-5">
                Liên hệ
              </h3>
              <ul className="space-y-4">
                {settings.phone && (
                  <li>
                    <a
                      href={`tel:${settings.phone}`}
                      className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Hotline</p>
                        <p className="text-sm font-semibold">{settings.phone}</p>
                      </div>
                    </a>
                  </li>
                )}
                {settings.zaloUrl && (
                  <li>
                    <a
                      href={settings.zaloUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#0068FF]/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors text-[10px] font-black text-[#0068FF]">
                        ZL
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Zalo</p>
                        <p className="text-sm font-semibold">Nhắn tin ngay</p>
                      </div>
                    </a>
                  </li>
                )}
                {settings.email && (
                  <li>
                    <a
                      href={`mailto:${settings.email}`}
                      className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-teal-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Email</p>
                        <p className="text-sm font-semibold">{settings.email}</p>
                      </div>
                    </a>
                  </li>
                )}
                {settings.address && (
                  <li>
                    <div className="flex items-start gap-3 text-slate-400">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Địa chỉ</p>
                        <p className="text-sm font-semibold leading-snug">{settings.address}</p>
                      </div>
                    </div>
                  </li>
                )}
                {/* Fallback khi chưa cập nhật settings */}
                {!settings.phone && !settings.zaloUrl && !settings.email && !settings.address && (
                  <li>
                    <div className="flex items-start gap-3 text-slate-400">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Địa chỉ</p>
                        <p className="text-sm font-semibold">Đảo Hòn Sơn, Kiên Hải, Kiên Giang</p>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-[1380px] mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} {settings.siteName || 'Hòn Sơn Xanh'}. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs flex items-center gap-1.5">
              <span>Đảo Hòn Sơn, Kiên Hải, Kiên Giang</span>
              <span>🇻🇳</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

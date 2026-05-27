import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black text-white py-12 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-orange-400">Hòn Sơn Xanh</h3>
          <p className="text-slate-300 dark:text-slate-400">
            Trải nghiệm vẻ đẹp hoang sơ của Hòn Sơn cùng những dịch vụ du lịch tốt nhất.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-orange-400">Liên kết</h3>
          <ul className="space-y-2 text-slate-300 dark:text-slate-400">
            <li><Link href="/" className="hover:text-orange-400 transition-colors">Trang chủ</Link></li>
            <li><Link href="/gioi-thieu" className="hover:text-orange-400 transition-colors">Giới thiệu</Link></li>
            <li><Link href="/tour" className="hover:text-orange-400 transition-colors">Tours</Link></li>
            <li><Link href="/bai-viet" className="hover:text-orange-400 transition-colors">Bài viết</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-orange-400">Liên hệ</h3>
          <ul className="space-y-2 text-slate-300 dark:text-slate-400">
            <li>Hotline: 0909.123.456</li>
            <li>Zalo: 0909.123.456</li>
            <li>Facebook: /honsonxanh</li>
            <li>Địa chỉ: Đảo Hòn Sơn, Kiên Hải, Kiên Giang</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-700 dark:border-slate-800 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} Hòn Sơn Xanh. All rights reserved.
      </div>
    </footer>
  );
}

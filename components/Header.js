import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-orange-600">
          <Image src="/logo.png" alt="Logo" width={120} height={120} />
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium">Trang chủ</Link>
          <Link href="/gioi-thieu" className="text-gray-600 hover:text-orange-600 font-medium">Giới thiệu</Link>
          <Link href="/tour" className="text-gray-600 hover:text-orange-600 font-medium">Tours</Link>
          <Link href="/blog" className="text-gray-600 hover:text-orange-600 font-medium">Blog</Link>
          <Link href="/lien-he" className="text-gray-600 hover:text-orange-600 font-medium">Liên hệ</Link>
        </nav>
        <button className="md:hidden text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}

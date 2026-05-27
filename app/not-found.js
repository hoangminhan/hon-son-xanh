import Link from 'next/link';
import { Home, Compass } from 'lucide-react';

export const metadata = {
  title: '404 - Không tìm thấy trang',
  description: 'Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 transition-colors">
      <div className="text-center max-w-lg mx-auto">
        <div className="relative mb-8 inline-block">
          <h1 className="text-9xl font-black text-slate-200 dark:text-slate-800">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass className="w-20 h-20 text-orange-500 animate-pulse" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Ôi không! Bị lạc mất rồi 🏝️
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không thể truy cập. Hãy thử quay lại trang chủ để khám phá tiếp nhé!
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-orange-600/30 hover:bg-orange-700 hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <Home className="w-5 h-5" />
          Về Trang Chủ
        </Link>
      </div>
    </div>
  );
}

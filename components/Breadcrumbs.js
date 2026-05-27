import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs Component
 * @param {Array} items - Mảng chứa các object { label, href }
 */
export default function Breadcrumbs({ items }) {
  // Cấu trúc Schema JSON-LD cho BreadcrumbList
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": "https://honsonxanh.com/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2, // Vị trí thứ 2 trở đi (1 là trang chủ)
        "name": item.label,
        "item": item.href ? `https://honsonxanh.com${item.href}` : undefined
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
      {/* 1. Nhúng Schema JSON-LD vào thẻ script để Google đọc */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 2. Hiển thị UI cho người dùng */}
      <ol className="flex items-center flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
        <li className="flex items-center">
          <Link href="/" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5 font-medium">
            <Home className="w-4 h-4" />
            Trang chủ
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
              {isLast ? (
                <span className="font-bold text-slate-800 dark:text-white line-clamp-1" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

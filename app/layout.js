import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://honsonxanh.com'),
  title: {
    default: 'Hòn Sơn Xanh - Du lịch Hòn Sơn',
    template: '%s | Hòn Sơn Xanh',
  },
  description: 'Khám phá vẻ đẹp hoang sơ của Hòn Sơn, Kiên Giang. Đặt tour du lịch Hòn Sơn giá rẻ, chất lượng, trọn gói.',
  openGraph: {
    title: 'Hòn Sơn Xanh - Du lịch Hòn Sơn',
    description: 'Khám phá vẻ đẹp hoang sơ của Hòn Sơn, Kiên Giang. Đặt tour du lịch Hòn Sơn giá rẻ, chất lượng, trọn gói.',
    url: 'https://honsonxanh.com',
    siteName: 'Hòn Sơn Xanh',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Hòn Sơn Xanh',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

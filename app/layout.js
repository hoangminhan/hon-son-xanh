import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import { AOSInit } from '../components/AOSInit';
import FloatingContacts from '../components/FloatingContacts';
import LayoutWrapper from '../components/LayoutWrapper';
import Footer from '../components/Footer';

const mainFont = Plus_Jakarta_Sans({ subsets: ['latin', 'vietnamese'] });

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
        url: 'https://hon-son-xanh.vercel.app/images/og-default.jpg',
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
    <html lang="vi" suppressHydrationWarning>
      <body className={`${mainFont.className} min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300`}>
        <AOSInit />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LayoutWrapper footer={<Footer />} floatingContacts={<FloatingContacts />}>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

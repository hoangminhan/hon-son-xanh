"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function LayoutWrapper({ children, footer, floatingContacts }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith('/studio');

  if (isStudio) {
    return (
      <main className="flex-grow h-screen overflow-hidden">
        {children}
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow min-w-0">
        {children}
      </main>
      {footer}
      {floatingContacts}
    </>
  );
}

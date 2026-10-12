"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// next-themes tự xử lý SSR (kèm suppressHydrationWarning trên <html>), không cần chờ mount
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

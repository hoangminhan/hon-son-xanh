# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Các lệnh thường dùng

- `npm run dev` — chạy dev server Next.js (website ở `/`, Sanity Studio nhúng ở `/studio`).
- `npm run build` — xuất bản tĩnh (static export) ra thư mục `out/`, lấy toàn bộ nội dung từ Sanity tại thời điểm build.
- `npm start` — phục vụ thư mục `out/` đã build bằng `serve` (không phải `next start`).
- `npm run lint` — ESLint 9 với flat config (`eslint.config.mjs`).
- `node scripts/seed.js` — đổ dữ liệu mẫu (tour/bài viết) lên Sanity; cần `SANITY_API_WRITE_TOKEN` trong `.env.local`.

Dự án không có bộ test. Biến môi trường đặt trong `.env.local` (xem `.env.example`): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, cùng các biến tuỳ chọn `NEXT_PUBLIC_SITE_URL` và `NEXT_PUBLIC_CLOUDFLARE_DEPLOY_HOOK`.

## Kiến trúc

Website du lịch tiếng Việt (tour đảo Hòn Sơn + blog), viết bằng JavaScript thuần (không TypeScript), Next.js 16 App Router + React 19, bật React Compiler.

**Xuất bản tĩnh hoàn toàn.** `next.config.mjs` đặt `output: 'export'` và `images.unoptimized: true`. Hệ quả:
- Không có server runtime: không API routes, server actions, middleware, ISR hay dữ liệu theo từng request. Mỗi trang chỉ được render một lần lúc build.
- Các route động (`app/tour/[slug]`, `app/bai-viet/[slug]`) bắt buộc phải có `generateStaticParams`; khi Sanity không trả về gì thì trả về slug `dummy-fallback` để quá trình export không bị lỗi.
- Nội dung mới chỉ lên website sau khi build lại. Biên tập viên kích hoạt việc này bằng công cụ "Deploy Website" tự viết trong Studio (`sanity/components/DeployTool.jsx`), công cụ này gửi POST tới Cloudflare deploy hook qua một form/iframe ẩn.

**Luồng nội dung (Sanity → trang).**
- `lib/sanity/client.js` — `safeFetch` nuốt lỗi và trả về `null`, vì vậy nơi gọi luôn dùng fallback `|| []` / `|| {}` và `notFound()` khi không có document.
- `lib/sanity/queries.js` — toàn bộ truy vấn GROQ nằm ở đây (site settings, bài viết, tour, slug, nội dung liên quan). Thêm truy vấn mới vào đây thay vì viết trực tiếp trong trang.
- `lib/sanity/image.js` — hàm dựng URL ảnh `urlFor()`.
- Schema nằm trong `sanity/schemaTypes/` (`post`, `tour`, `siteSettings`, `blockContent`, `youtube`); cấu hình Studio ở `sanity.config.js`. `siteSettings` là singleton (`documentId` cố định, đã tắt tạo mới/xoá/nhân bản) chứa thông tin liên hệ (số điện thoại, Zalo, Facebook) dùng cho header/footer/nút liên hệ nổi.
- Rich text được render qua `components/PortableTextRenderer.jsx`.

**Layout và Studio dùng chung.** `app/layout.js` bọc mọi thứ trong `LayoutWrapper` (client component), dùng `usePathname()` để ẩn Header/Footer/FloatingContacts ở `/studio`. Các phần chạy phía server (`Footer`, `FloatingContacts`) được truyền vào wrapper client này dưới dạng props để vẫn fetch được dữ liệu từ Sanity. Mô hình tách server-fetch → client-con này cũng được dùng ở nơi khác (ví dụ `FloatingContacts` → `FloatingContactsClient`).

**Lưu ý khác.**
- Route dùng slug tiếng Việt: `/tour`, `/bai-viet` (blog), `/gioi-thieu` (giới thiệu), `/lien-he` (liên hệ).
- Nhãn/màu của danh mục blog được quản lý tập trung trong `lib/categoryConfig.js`.
- `app/sitemap.js` tạo sitemap từ slug trên Sanity. `scripts/generate-sitemap.js`, `public/sitemap.xml` và `data/*.js` là phần còn sót lại từ thời dùng dữ liệu mẫu (`data/` chỉ được script đó dùng).
- Hiện đang tắt index với công cụ tìm kiếm (`robots: { index: false }` trong metadata của root layout).
- Alias `@/*` trong `jsconfig.json` trỏ tới `./src` không tồn tại; hãy dùng import tương đối như code hiện có.
- Hiệu ứng chuyển động dùng AOS (`components/AOSInit.js`, thuộc tính `data-aos`); carousel dùng Embla.

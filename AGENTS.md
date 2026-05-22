<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PROJECT SPECIFIC RULES & CONVENTIONS

Chào các Agent! Khi làm việc trên dự án Hòn Sơn Xanh, các bạn bắt buộc phải tuân thủ nghiêm ngặt các quy tắc dưới đây để bảo toàn tính đồng nhất, thẩm mỹ và chất lượng của codebase.

## 1. Quy chuẩn viết code (React 19 & Next.js 16)
*   **React 19 & Client/Server Components**:
    *   Mặc định các file trong `app/` là Server Components để tối ưu hiệu suất và SEO.
    *   Chỉ sử dụng `"use client"` ở đầu file khi component cần sử dụng React state (`useState`, `useEffect`), context, event listeners hoặc thư viện client-side (ví dụ: `next-themes`).
    *   Tận dụng các tính năng mới của React 19 (như truyền `ref` trực tiếp dưới dạng prop thay vì `forwardRef`).
*   **Import Convention**:
    *   Sắp xếp thứ tự import từ trên xuống dưới:
        1. Thư viện cốt lõi (React, Next.js).
        2. Thư viện bên ngoài (Sanity client, icons, hooks bên thứ ba).
        3. Các helper, query, utility nội bộ (`../../lib/sanity/...`).
        4. Các component nội bộ.
    *   Sử dụng import tương đối chính xác và tránh import dư thừa.
*   **Data Fetching & Sanity CMS**:
    *   Luôn dùng hàm bọc an toàn `safeFetch` từ `lib/sanity/client` để truy vấn dữ liệu từ Sanity.
    *   Khi hiển thị ảnh từ Sanity, bắt buộc sử dụng `urlFor(image)` kết hợp tối ưu kích thước `.width(N).height(M).url()` để tối ưu băng thông.
    *   Đối với ảnh tĩnh hoặc logo tĩnh, bắt buộc sử dụng component `<Image>` của Next.js để tự động tối ưu hóa dung lượng và lazy loading.

## 2. Thiết kế CSS & Giao diện (Tailwind CSS v4 & UX)
*   **Tailwind CSS v4 & Mobile-First**:
    *   Sử dụng Tailwind CSS v4 class để tạo giao diện.
    *   Áp dụng tư duy **Mobile-first**: Viết style cho màn hình điện thoại trước, sau đó dùng các tiền tố `md:`, `lg:`, `xl:` cho các màn hình lớn hơn.
*   **Đồng nhất Hệ màu & Dark Mode**:
    *   Dự án đang dùng `next-themes` để hỗ trợ Light & Dark Mode. Mọi thành phần giao diện khi viết class màu sắc bắt buộc phải đi kèm phiên bản `dark:` tương ứng (Ví dụ: `bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100`).
    *   Màu chủ đạo (Primary): Tông cam rực rỡ (`orange-500`, `orange-600`) cho nút bấm kêu gọi hành động (CTA), liên kết nổi bật và hiệu ứng hover.
    *   Màu nền và chữ (Background/Text): Tông Slate hiện đại (`slate-50` cho nền sáng, `slate-900` cho nền tối, kết hợp `slate-600` / `slate-300` cho phần text).
*   **Thẩm mỹ cao cấp & Micro-animations**:
    *   Bo góc mềm mại: Ưu tiên các class `rounded-2xl` hoặc `rounded-3xl` cho card, modal, button để tạo cảm giác giao diện hiện đại, thân thiện.
    *   Hiệu ứng chuyển động mịn màng: Luôn thêm class `transition-all duration-300` khi hover hoặc tương tác phần tử (Ví dụ: `hover:scale-105`, `hover:shadow-xl`).
    *   Sử dụng `backdrop-blur-md bg-white/80 dark:bg-slate-900/80` cho thanh header hoặc các thành phần sticky nổi để tạo hiệu ứng phủ kính (glassmorphism) sang trọng.

## 3. Quy trình làm việc & Best Practices
*   **Kiểm tra và Tránh Trùng lặp**:
    *   Trước khi viết mới một utility, hook hay component, phải kiểm tra các thư mục `/components` và `/lib` xem đã tồn tại cái tương tự chưa.
*   **Tối ưu SEO**:
    *   Mọi trang (page) trong thư mục `app/` bắt buộc phải export một `metadata` object hợp lý chứa `title` và `description` tối ưu chuẩn SEO bằng Tiếng Việt.
*   **Giữ Dev Server Hoạt động**:
    *   Trước khi hoàn thành turn, đảm bảo lệnh `npm run dev` chạy không có lỗi cảnh báo (warning) hay lỗi biên dịch (compile error).
*   **Lưu trữ Tài liệu**:
    *   Khi thực hiện các thay đổi lớn hoặc thêm tính năng phức tạp, hãy tạo file `walkthrough.md` trong thư mục artifact để mô tả chi tiết những gì đã thay đổi và kết quả kiểm thử.

*   **Gải thích rõ ràng**:
    * Khi hỏi để chạy 1 lệnh gì ở terminal thì phải giải thích rõ lý do tại sao phải chạy lệnh đó, và giải thích cặn kẽ ý nghĩa của lệnh đó.

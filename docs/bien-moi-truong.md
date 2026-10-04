# Biến môi trường

Website cần 4 biến môi trường khi build và 1 khóa ghi chỉ dùng cho script đổ dữ liệu mẫu. Trên máy local, các biến nằm trong `.env.local`. File này bị loại khỏi git bởi dòng `.env*` trong `.gitignore`, nên khi build trên Cloudflare phải khai báo riêng (xem [Cấu hình trên Cloudflare Pages](#cấu-hình-trên-cloudflare-pages)).

## Các biến

| Biến | Dùng để làm gì | Nơi dùng trong code | Lấy từ đâu |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Mã dự án Sanity: website và Studio kết nối tới kho dữ liệu nào | `lib/sanity/client.js`, `sanity.config.js`, `sanity/env.js`, `scripts/seed.js` | [sanity.io/manage](https://www.sanity.io/manage) → chọn dự án → Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Tên bộ dữ liệu trong dự án, thường là `production` | Như trên | sanity.io/manage → dự án → tab **Datasets** |
| `NEXT_PUBLIC_SITE_URL` | Địa chỉ chính thức của website (`metadataBase`), làm gốc cho link ảnh khi chia sẻ lên Facebook/Zalo | `app/layout.js` | Tự đặt, ví dụ `https://honsonxanh.com`. Bỏ trống thì dùng `https://honsonxanh.vn` |
| `NEXT_PUBLIC_CLOUDFLARE_DEPLOY_HOOK` | Link mà nút "Cập Nhật Website Ngay" trong Studio gọi tới để Cloudflare build lại website | `sanity/components/DeployTool.jsx` | Cloudflare → Workers & Pages → project → **Settings** → **Builds** → **Deploy hooks** → tạo hook cho nhánh `main` |
| `SANITY_API_WRITE_TOKEN` | Khóa có quyền ghi vào Sanity, chỉ dùng cho script đổ dữ liệu mẫu | `scripts/seed.js` | sanity.io/manage → dự án → **API** → **Tokens** → Add API token, quyền Editor |

`NEXT_PUBLIC_SANITY_API_VERSION` là biến tùy chọn. Nếu không khai báo, code dùng mặc định `2026-05-20`.

## Bảo mật

Biến có tiền tố `NEXT_PUBLIC_` được chép thẳng vào file JavaScript công khai lúc build, nên ai cũng xem được giá trị.

- **Project ID, dataset, site URL**: để công khai không sao.
- **`NEXT_PUBLIC_CLOUDFLARE_DEPLOY_HOOK`**: nằm trong mã JavaScript của trang `/studio`. Trang này ai cũng tải được, kể cả khi chưa đăng nhập.
  - Người lấy được link có thể gọi liên tục để kích hoạt build, làm tốn giới hạn 500 build/tháng.
  - Hook không cho phép sửa nội dung.
  - Nếu link bị lộ, xóa hook cũ và tạo hook mới trong Cloudflare, rồi cập nhật biến.
  - Cách an toàn hơn: cho nút Deploy gọi qua một lớp trung gian có kiểm tra quyền, ví dụ Cloudflare Worker.
- **`SANITY_API_WRITE_TOKEN`**: không có tiền tố nên không lọt ra ngoài. Đây là khóa quan trọng nhất, có quyền sửa và xóa toàn bộ dữ liệu. Không đưa lên Cloudflare, không chia sẻ, không commit. Không dùng nữa thì xóa token trong sanity.io/manage.

## Cấu hình trên máy local

1. Sao chép `.env.example` thành `.env.local`.
2. Điền các giá trị theo bảng trên.
3. Khởi động lại `npm run dev`, vì Next.js chỉ đọc biến môi trường lúc khởi động.

`SANITY_API_WRITE_TOKEN` chỉ cần khi chạy `node scripts/seed.js`.

## Cấu hình trên Cloudflare Pages

Vào project → **Settings** → **Variables and Secrets** (tên mục có thể khác tùy giao diện Cloudflare) và khai báo 4 biến:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CLOUDFLARE_DEPLOY_HOOK`

Vì website là bản xuất tĩnh (`output: 'export'`), biến chỉ được đọc lúc build. Sau khi thêm hoặc sửa biến, phải build lại thì website mới nhận giá trị mới.

Nếu thiếu biến deploy hook, nút Deploy trong Studio trên website thật sẽ báo "Chưa cấu hình NEXT_PUBLIC_CLOUDFLARE_DEPLOY_HOOK trong file .env.local".

/**
 * Địa chỉ chính thức của website (không có dấu "/" ở cuối).
 * honsonxanh.com được redirect về đây ở tầng Cloudflare, nên mọi link tuyệt đối
 * (metadata, sitemap, structured data) đều phải dùng giá trị này.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://honsonxanh.vn').replace(/\/+$/, '');

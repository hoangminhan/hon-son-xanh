/**
 * Lấy toàn bộ thông tin cấu hình chung của website (Logo, số điện thoại, link mạng xã hội,...)
 * Thường dùng ở Layout tổng (Header, Footer) hoặc trang Liên Hệ.
 */
export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

/**
 * Lấy danh sách tất cả các bài viết Blog, sắp xếp theo ngày đăng mới nhất.
 * Dữ liệu trả về rút gọn (chỉ lấy tiêu đề, ảnh thumbnail, mô tả ngắn) để tối ưu tốc độ load cho trang Danh sách Blog.
 */
export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  isFeatured,
  excerpt,
  mainImage,
  publishedAt,
  category,
  seoTitle,
  seoDescription
}`;

/**
 * Lấy CHI TIẾT của một bài viết Blog dựa vào đường dẫn URL (slug).
 * Truy vấn này lấy toàn bộ dữ liệu bao gồm cả nội dung chi tiết (body) để hiển thị trong trang Đọc bài viết.
 */
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  body,
  publishedAt,
  category,
  seoTitle,
  seoDescription
}`;

/**
 * Lấy danh sách tất cả các đường dẫn (slug) của bài viết Blog hiện có.
 * Hàm này dùng trong Next.js để tự động tạo trước các trang tĩnh (Static Generation - SSG) lúc build web.
 */
export const allPostSlugsQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;

/**
 * Lấy danh sách bài viết liên quan (cùng category, loại trừ bài hiện tại).
 * Nếu không đủ bài cùng category, lấy bổ sung từ các bài mới nhất.
 * Dùng ở cuối trang chi tiết bài viết.
 */
export const relatedPostsQuery = `*[_type == "post" && slug.current != $currentSlug && category == $category] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  category
}`;

/**
 * Lấy danh sách tất cả các Tour du lịch, sắp xếp theo thời gian tạo mới nhất.
 * Dữ liệu trả về chỉ gồm thông tin cơ bản (giá, thời gian, hình ảnh) để hiển thị dưới dạng các thẻ (Card) ở trang Danh sách Tour.
 */
export const allToursQuery = `*[_type == "tour"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  duration,
  priceText,
  hasPromotion,
  promotionPrice,
  promotionBadgeLabel,
  promotionBadgeColor,
  promotionSavingsMessage,
  seoTitle,
  seoDescription
}`;

/**
 * Lấy CHI TIẾT của một Tour du lịch cụ thể dựa vào URL (slug).
 * Lấy đầy đủ thông tin: Lịch trình chi tiết (itinerary), Các dịch vụ bao gồm (included), và Lưu ý (note).
 */
export const tourBySlugQuery = `*[_type == "tour" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  gallery,
  duration,
  departure,
  transportation,
  priceText,
  hasPromotion,
  promotionPrice,
  promotionBadgeLabel,
  promotionBadgeColor,
  promotionSavingsMessage,
  itinerary,
  included,
  excluded,
  note,
  seoTitle,
  seoDescription
}`;

/**
 * Lấy danh sách tất cả các đường dẫn (slug) của Tour hiện có.
 * Dùng cho Next.js tạo trước các trang tĩnh (SSG) chi tiết Tour.
 */
export const allTourSlugsQuery = `*[_type == "tour" && defined(slug.current)][].slug.current`;

/**
 * Lấy danh sách các Điểm đến (Địa điểm du lịch nổi bật).
 * Dùng để hiển thị ngoài trang chủ (Mục "Khám phá các điểm đến").
 */
export const allDestinationsQuery = `*[_type == "destination"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  seoTitle,
  seoDescription
}`;

/**
 * Lấy danh sách 3 Tour du lịch nổi bật nhất (hiện tại đang lấy 3 tour mới nhất).
 * Dùng để hiển thị ở mục "Tour Nổi Bật" ngoài Trang Chủ.
 */
export const featuredToursQuery = `*[_type == "tour" && isFeatured == true] | order(_createdAt desc)[0...8] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  duration,
  priceText,
  hasPromotion,
  promotionPrice,
  promotionBadgeLabel,
  promotionBadgeColor,
  promotionSavingsMessage
}`;

/**
 * Lấy danh sách 3 bài viết Blog mới nhất.
 * Dùng để hiển thị ở mục "Cẩm Nang Du Lịch Mới Nhất" ngoài Trang Chủ.
 */
export const recentPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0...8] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  category
}`;

/**
 * Lấy danh sách Tour liên quan (loại trừ tour hiện tại)
 */
export const relatedToursQuery = `*[_type == "tour" && slug.current != $currentSlug] | order(_createdAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  duration,
  priceText,
  hasPromotion,
  promotionPrice,
  promotionBadgeLabel,
  promotionBadgeColor,
  promotionSavingsMessage
}`;

import { validateMainImage } from '../helpers';

export const tour = {
  name: 'tour',
  title: 'Tour Du Lịch',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Đường dẫn (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Hiển thị trang chủ (Nổi bật)',
      type: 'boolean',
      description: 'Bật tùy chọn này để hiển thị Tour ở mục "Tour Nổi Bật" ngoài trang chủ',
      initialValue: false,
    },
    {
      name: 'hasPromotion',
      title: 'Có chương trình khuyến mãi',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'promotionPrice',
      title: 'Giá Khuyến Mãi',
      type: 'string',
      description: 'Ví dụ: "1.290.000đ"',
      hidden: ({ document }) => !document?.hasPromotion,
    },
    {
      name: 'promotionBadgeLabel',
      title: 'Nhãn Badge',
      type: 'string',
      description: 'Ví dụ: "HOT" hoặc "-15%"',
      hidden: ({ document }) => !document?.hasPromotion,
    },
    {
      name: 'promotionBadgeColor',
      title: 'Màu Badge',
      type: 'string',
      options: {
        list: [
          { title: 'Đỏ (Red)', value: 'bg-red-500' },
          { title: 'Cam (Orange)', value: 'bg-orange-500' },
          { title: 'Vàng (Yellow)', value: 'bg-yellow-500' },
          { title: 'Xanh lá (Green)', value: 'bg-green-500' },
          { title: 'Xanh dương (Blue)', value: 'bg-blue-500' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'bg-red-500',
      hidden: ({ document }) => !document?.hasPromotion,
    },
    {
      name: 'promotionSavingsMessage',
      title: 'Thông điệp tiết kiệm',
      type: 'string',
      description: 'Ví dụ: "Tiết kiệm 210K"',
      hidden: ({ document }) => !document?.hasPromotion,
    },
    {
      name: 'excerpt',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Hình ảnh chính',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: validateMainImage,
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Văn bản thay thế (Alt)',
          description: 'Quan trọng cho SEO và người khiếm thị.',
        }
      ]
    },
    {
      name: 'gallery',
      title: 'Thư viện ảnh',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Thêm nhiều hình ảnh khác về tour (khách sạn, món ăn, cảnh đẹp, v.v.)',
    },
    {
      name: 'duration',
      title: 'Thời gian',
      type: 'string',
      description: 'Ví dụ: "2 Ngày 1 Đêm"',
    },
    {
      name: 'departure',
      title: 'Lịch khởi hành',
      type: 'string',
      description: 'Ví dụ: "Hàng ngày", "Thứ 7 hàng tuần"',
    },
    {
      name: 'transportation',
      title: 'Phương tiện',
      type: 'string',
      description: 'Ví dụ: "Tàu cao tốc & Xe máy"',
    },
    {
      name: 'priceText',
      title: 'Giá tiền',
      type: 'string',
      description: 'Ví dụ: "1.500.000đ"',
    },
    {
      name: 'itinerary',
      title: 'Lịch trình chi tiết',
      type: 'blockContent',
    },
    {
      name: 'included',
      title: 'Dịch vụ bao gồm',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'excluded',
      title: 'Dịch vụ KHÔNG bao gồm',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'note',
      title: 'Lưu ý quan trọng',
      type: 'blockContent',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title (Tiêu đề SEO)',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description (Mô tả SEO)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Mô tả SEO nên dưới 160 ký tự'),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'duration',
      media: 'mainImage',
    },
  },
};

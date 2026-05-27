import { validateMainImage } from '../helpers';

export const post = {
  name: 'post',
  title: 'Bài Viết (Blog)',
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
      name: 'publishedAt',
      title: 'Ngày xuất bản',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Nội dung bài viết',
      type: 'blockContent',
    },
    {
      name: 'category',
      title: 'Danh mục',
      type: 'string',
      options: {
        list: [
          { title: '🧭 Kinh nghiệm du lịch', value: 'kinh-nghiem' },
          { title: '📍 Địa điểm', value: 'dia-diem' },
          { title: '🦞 Ẩm thực', value: 'am-thuc' },
          { title: '🏄 Hoạt động', value: 'hoat-dong' },
          { title: '📰 Tin tức', value: 'tin-tuc' },
        ],
        layout: 'radio',
      },
      description: 'Chọn danh mục phù hợp cho bài viết.',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title (Tiêu đề SEO)',
      type: 'string',
      description: 'Không bắt buộc. Tự động lấy Tiêu đề bài viết nếu để trống.',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description (Mô tả SEO)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Mô tả SEO nên dưới 160 ký tự'),
      description: 'Không bắt buộc. Tự động lấy Mô tả ngắn nếu để trống.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
};

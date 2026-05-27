import { validateMainImage } from '../helpers';

export const destination = {
  name: 'destination',
  title: 'Điểm Đến',
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
      name: 'body',
      title: 'Nội dung chi tiết',
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
      media: 'mainImage',
    },
  },
};

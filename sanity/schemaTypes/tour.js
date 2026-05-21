export const tour = {
  name: 'tour',
  title: 'Tour',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
        }
      ]
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "2 Ngày 1 Đêm"',
    },
    {
      name: 'priceText',
      title: 'Price Text',
      type: 'string',
      description: 'e.g. "1,500,000đ"',
    },
    {
      name: 'itinerary',
      title: 'Itinerary',
      type: 'blockContent',
    },
    {
      name: 'included',
      title: 'Included',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'note',
      title: 'Note',
      type: 'blockContent',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('SEO description should be less than 160 characters'),
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

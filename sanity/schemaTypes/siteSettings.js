export const siteSettings = {
  name: 'siteSettings',
  title: 'Cấu Hình Chung',
  type: 'document',
  fields: [
    {
      name: 'showDevNotice',
      title: 'Hiện thông báo "Website đang phát triển"',
      type: 'boolean',
      description: 'Dải thông báo trên cùng mọi trang. Tắt khi website chính thức ra mắt (nhớ Publish rồi Deploy).',
      initialValue: true,
    },
    {
      name: 'devNoticeText',
      title: 'Nội dung thông báo',
      type: 'string',
      description: 'Để trống sẽ dùng câu mặc định.',
      hidden: ({ document }) => document?.showDevNotice === false,
    },
    {
      name: 'coupons',
      title: 'Ưu đãi đặc quyền (trang Tours)',
      type: 'array',
      description: 'Kéo thả để đổi thứ tự. Để trống sẽ ẩn cả phần "Ưu Đãi Đặc Quyền".',
      validation: (Rule) => Rule.max(6),
      of: [
        {
          type: 'object',
          name: 'coupon',
          title: 'Ưu đãi',
          fields: [
            {
              name: 'discount',
              title: 'Mức giảm',
              type: 'string',
              description: 'Ví dụ: "Giảm 10%", "Giảm 200K"',
              validation: (Rule) => Rule.required().max(12),
            },
            {
              name: 'desc',
              title: 'Điều kiện áp dụng',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required().max(120),
            },
            {
              name: 'color',
              title: 'Màu',
              type: 'string',
              options: {
                list: [
                  { title: 'Cam', value: 'orange' },
                  { title: 'Xanh ngọc', value: 'teal' },
                  { title: 'Xanh dương', value: 'blue' },
                  { title: 'Tím', value: 'purple' },
                  { title: 'Đỏ', value: 'red' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'orange',
            },
          ],
          preview: {
            select: { title: 'discount', subtitle: 'desc' },
          },
        },
      ],
    },
    {
      name: 'phone',
      title: 'Số Điện Thoại (Hotline)',
      type: 'string',
    },
    {
      name: 'zaloUrl',
      title: 'Link Zalo / SĐT Zalo',
      type: 'string',
    },
    {
      name: 'facebookUrl',
      title: 'Link Facebook (Fanpage)',
      type: 'url',
    },
    {
      name: 'email',
      title: 'Địa chỉ Email',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Địa chỉ văn phòng',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo Website',
      type: 'image',
      options: {
        hotspot: true,
      },
      // Ẩn vì website chưa dùng trường này: logo đang là file tĩnh public/logo.png
      hidden: true,
    },
  ],
};

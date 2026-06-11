export const siteSettings = {
  name: 'siteSettings',
  title: 'Cấu Hình Chung',
  type: 'document',
  fields: [
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
    },
  ],
};

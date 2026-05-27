import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load biến môi trường từ file .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// YÊU CẦU: Bạn phải tạo một Token có quyền WRITE trên Sanity Dashboard
// và thêm vào .env.local: SANITY_API_WRITE_TOKEN=sk...
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// Hàm hỗ trợ upload ảnh từ URL ngoài (Unsplash) lên kho Sanity
async function uploadImageAsset(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: 'mock-image.jpg',
    });
    return asset._id;
  } catch (error) {
    console.error(`Lỗi khi upload ảnh ${imageUrl}:`, error.message);
    return null;
  }
}

async function seedData() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ THẤT BẠI: Bạn chưa thêm SANITY_API_WRITE_TOKEN vào .env.local');
    return;
  }

  console.log('🚀 Bắt đầu tạo dữ liệu mẫu...');

  // 1. Tạo 15 bài Blog mẫu
  const categories = ['kinh-nghiem', 'dia-diem', 'am-thuc', 'hoat-dong', 'tin-tuc'];
  const mockImageUrl = 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80';
  
  console.log('Đang tải ảnh mẫu lên Sanity...');
  const assetId = await uploadImageAsset(mockImageUrl);

  if (!assetId) {
    console.error('❌ Không thể tải ảnh, dừng script.');
    return;
  }

  console.log('✅ Đã tải ảnh xong. Đang tạo 15 bài Blog...');
  for (let i = 1; i <= 15; i++) {
    const doc = {
      _type: 'post',
      title: `Bài viết mẫu số ${i} về Hòn Sơn`,
      slug: { _type: 'slug', current: `bai-viet-mau-so-${i}` },
      category: categories[i % categories.length],
      publishedAt: new Date().toISOString(),
      excerpt: `Đây là đoạn mô tả ngắn cho bài viết số ${i}. Hòn Sơn Xanh mang đến những trải nghiệm du lịch tuyệt vời nhất cho du khách.`,
      mainImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt: `Hình ảnh bài ${i}`,
      },
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              marks: [],
              text: `Nội dung chi tiết của bài viết số ${i}. Đây là dữ liệu được tạo tự động để test tính năng phân trang và giao diện của trang web.`,
            },
          ],
        },
      ],
    };

    await client.create(doc);
    console.log(`Đã tạo bài: ${doc.title}`);
  }

  console.log('✅ Đã tạo xong Blog. Đang tạo 15 Tour mẫu...');
  for (let i = 1; i <= 15; i++) {
    const doc = {
      _type: 'tour',
      title: `Tour trải nghiệm Hòn Sơn ${i}`,
      slug: { _type: 'slug', current: `tour-trai-nghiem-hon-son-${i}` },
      isFeatured: i <= 8, // Bật nổi bật cho 8 tour đầu tiên
      duration: i % 2 === 0 ? '3 Ngày 2 Đêm' : '2 Ngày 1 Đêm',
      priceText: i % 2 === 0 ? '1.850.000đ' : '1.250.000đ',
      excerpt: `Lịch trình tour ${i} khám phá trọn vẹn vẻ đẹp hoang sơ của đảo Hòn Sơn. Thưởng thức hải sản tươi ngon và lưu giữ những bức ảnh kỷ niệm tuyệt vời.`,
      mainImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt: `Hình ảnh tour ${i}`,
      },
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              marks: [],
              text: `Nội dung chi tiết của Tour số ${i}. Đây là dữ liệu được tạo tự động để test tính năng phân trang.`,
            },
          ],
        },
      ],
    };

    await client.create(doc);
    console.log(`Đã tạo tour: ${doc.title}`);
  }

  console.log('🎉 Hoàn tất thêm toàn bộ dữ liệu mẫu!');
}

seedData().catch(console.error);

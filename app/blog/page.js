import Link from 'next/link';
import { client, safeFetch } from '../../lib/sanity/client';
import { urlFor } from '../../lib/sanity/image';
import { allPostsQuery } from '../../lib/sanity/queries';

export const metadata = {
  title: 'Blog',
  description: 'Kinh nghiệm du lịch Hòn Sơn, chia sẻ các địa điểm đẹp và mẹo vặt khi du lịch tại đảo.',
  openGraph: {
    title: 'Blog Du Lịch | Hòn Sơn Xanh',
    description: 'Kinh nghiệm du lịch Hòn Sơn tự túc, các bài viết mới nhất.',
    url: 'https://honsonxanh.com/blog',
  },
};

export default async function BlogPage() {
  const posts = await safeFetch(allPostsQuery) || [];

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold text-slate-800 mb-12 text-center">Blog Du Lịch</h1>
        
        {posts.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            <p className="text-xl">Chưa có bài viết nào. Vui lòng quay lại sau.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post._id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="h-64 bg-slate-200 relative overflow-hidden">
                     {post.mainImage && <img src={urlFor(post.mainImage).width(800).height(600).url()} alt={`Hình ảnh minh họa cho bài viết ${post.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-sm text-orange-600 mb-3 font-medium">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : ''}
                    </p>
                    <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-3 flex-1">{post.excerpt}</p>
                    <span className="text-orange-600 font-medium group-hover:translate-x-2 transition-transform inline-block">
                      Đọc tiếp &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

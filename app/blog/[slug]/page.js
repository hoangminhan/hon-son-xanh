import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client, safeFetch } from '../../../lib/sanity/client';
import { urlFor } from '../../../lib/sanity/image';
import { allPostSlugsQuery, postBySlugQuery } from '../../../lib/sanity/queries';
import PortableTextRenderer from '../../../components/PortableTextRenderer';

export async function generateStaticParams() {
  const slugs = await safeFetch(allPostSlugsQuery) || [];
  if (slugs.length === 0) return [{ slug: 'dummy-fallback' }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await safeFetch(postBySlugQuery, { slug });

  if (!post) return { title: 'Không tìm thấy bài viết' };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const post = await safeFetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog" className="text-orange-600 hover:underline mb-8 inline-block font-medium">
          &larr; Quay lại danh sách bài viết
        </Link>
        
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">{post.title}</h1>
          <p className="text-slate-500 font-medium">
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : ''}
          </p>
        </div>
        
        {post.mainImage && (
          <div className="h-64 md:h-96 w-full rounded-2xl mb-12 relative overflow-hidden bg-slate-200">
             <img src={urlFor(post.mainImage).width(1200).height(800).url()} alt={`Hình ảnh minh họa cho bài viết ${post.title}`} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-orange prose-lg max-w-none text-slate-700">
          <PortableTextRenderer value={post.body} />
        </div>
      </div>
    </div>
  );
}

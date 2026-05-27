import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client, safeFetch } from '../../../lib/sanity/client';
import { urlFor } from '../../../lib/sanity/image';
import { allPostSlugsQuery, postBySlugQuery } from '../../../lib/sanity/queries';
import PortableTextRenderer from '../../../components/PortableTextRenderer';
import { getCategoryConfig } from '../../../lib/categoryConfig';
import Breadcrumbs from '../../../components/Breadcrumbs';

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
      images: post.mainImage
        ? [{ url: urlFor(post.mainImage).width(1200).height(630).url(), width: 1200, height: 630, alt: post.seoTitle || post.title }]
        : [{ url: 'https://hon-son-xanh.vercel.app/images/og-default.jpg', width: 1200, height: 630, alt: 'Hòn Sơn Xanh' }],
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
    <div className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors">
      <div className="container mx-auto px-4 max-w-3xl">
        <Breadcrumbs items={[
          { label: 'Cẩm Nang', href: '/bai-viet' },
          { label: post.title }
        ]} />
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4 md:mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            {post.category && (() => {
              const cat = getCategoryConfig(post.category);
              return (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${cat.className}`}>
                  {cat.emoji} {cat.label}
                </span>
              );
            })()}
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
            </p>
          </div>
        </div>
        
        {post.mainImage && (
          <div className="h-64 md:h-96 w-full rounded-2xl mb-12 relative overflow-hidden bg-slate-200 dark:bg-slate-700">
             <img src={urlFor(post.mainImage).width(1200).height(800).url()} alt={`Hình ảnh minh họa cho bài viết ${post.title}`} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-orange prose-lg max-w-none text-slate-700 dark:text-slate-300 dark:prose-invert">
          <PortableTextRenderer value={post.body} />
        </div>
      </div>
    </div>
  );
}

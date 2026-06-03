import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanity/image';

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || 'Hình ảnh'}
          loading="lazy"
          src={urlFor(value).width(800).auto('format').url()}
          className="rounded-2xl shadow-md my-8 w-full h-auto object-contain"
        />
      );
    },
    youtube: ({ value }) => {
      const { url } = value;
      if (!url) return null;
      
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const id = (match && match[2].length === 11) ? match[2] : null;

      if (!id) {
        return <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg text-center my-8">Link video không hợp lệ</div>;
      }

      return (
        <div className="relative w-full aspect-video my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800 dark:text-white">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3 text-slate-800 dark:text-slate-100">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold mt-4 mb-2 text-slate-800 dark:text-slate-100">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-orange-400 pl-4 py-2 my-4 bg-orange-50 dark:bg-orange-950/30 text-slate-700 dark:text-slate-300 italic rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="pl-5 mb-4 text-slate-600 dark:text-slate-300 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-slate-600 dark:text-slate-300 space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <a href={value.href} rel={rel} target={target} className="text-blue-600 hover:underline">
          {children}
        </a>
      );
    },
  },
};

export default function PortableTextRenderer({ value }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}

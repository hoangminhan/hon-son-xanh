import { safeFetch } from '../lib/sanity/client';
import { allPostSlugsQuery, allTourSlugsQuery } from '../lib/sanity/queries';

export const dynamic = 'force-static';

export default async function sitemap() {
  const baseUrl = 'https://honsonxanh.com';

  // Lấy danh sách slug từ Sanity
  const postSlugs = await safeFetch(allPostSlugsQuery) || [];
  const tourSlugs = await safeFetch(allTourSlugsQuery) || [];

  const postUrls = postSlugs.map((slug) => ({
    url: `${baseUrl}/bai-viet/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const tourUrls = tourSlugs.map((slug) => ({
    url: `${baseUrl}/tour/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticUrls = [
    '',
    '/gioi-thieu',
    '/tour',
    '/bai-viet',
    '/lien-he',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticUrls, ...postUrls, ...tourUrls];
}

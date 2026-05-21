import fs from 'fs';
import path from 'path';

// Mock data (we can also import them directly if we use ES modules, but this is a simple script)
// To keep it simple without needing babel or ts-node, let's just require the mock data if they were commonjs,
// But they are ES modules (`export const tours = ...`). Since this script will run via `node scripts/generate-sitemap.js`,
// it's easier to just read the files and parse them using regex or we can just import them since Node supports ES modules.
// Let's use dynamic import.

async function generateSitemap() {
  // Use relative path from the project root where the script is executed
  const { tours } = await import('../data/tours.js');
  const { posts } = await import('../data/posts.js');

  const baseUrl = 'https://honsonxanh.com';

  const staticPages = [
    '',
    '/gioi-thieu',
    '/tour',
    '/blog',
    '/lien-he',
  ];

  const tourPages = tours.map(tour => `/tour/${tour.slug}`);
  const postPages = posts.map(post => `/blog/${post.slug}`);

  const allPages = [...staticPages, ...tourPages, ...postPages];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map((page) => {
    return `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemapContent);
  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);

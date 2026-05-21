export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  seoTitle,
  seoDescription
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  body,
  publishedAt,
  seoTitle,
  seoDescription
}`;

export const allPostSlugsQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;

export const allToursQuery = `*[_type == "tour"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  duration,
  priceText,
  seoTitle,
  seoDescription
}`;

export const tourBySlugQuery = `*[_type == "tour" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  duration,
  priceText,
  itinerary,
  included,
  note,
  seoTitle,
  seoDescription
}`;

export const allTourSlugsQuery = `*[_type == "tour" && defined(slug.current)][].slug.current`;

export const allDestinationsQuery = `*[_type == "destination"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  seoTitle,
  seoDescription
}`;

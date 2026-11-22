import { MetadataRoute } from 'next';
import { SERVICES_DATA, PROJECTS_DATA, BLOG_POSTS_DATA } from '@/lib/data/seedData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ecreation.vercel.app').replace(/\/$/, '');
  const buildDate = new Date('2026-11-22T00:00:00.000Z');

  // Static public SEO routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: buildDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/projects`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/contact`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/faq`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/sla-security`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/cookie-policy`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/refund-policy`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/disclaimer`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.4 },
  ];

  // Dynamic services
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Dynamic portfolio case studies
  const projectRoutes: MetadataRoute.Sitemap = PROJECTS_DATA.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Dynamic technical blog articles
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS_DATA.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}

import { MetadataRoute } from 'next';
import { SERVICES_DATA, PROJECTS_DATA, BLOG_POSTS_DATA } from '@/lib/data/seedData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ecreation.in';
  const buildDate = new Date('2026-11-11T00:00:00.000Z');

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: buildDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic services
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Dynamic projects
  const projectRoutes: MetadataRoute.Sitemap = PROJECTS_DATA.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic blog posts
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS_DATA.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}

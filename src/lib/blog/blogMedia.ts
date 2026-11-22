export type CoverTheme =
  | 'emerald-gold'
  | 'indigo-slate'
  | 'amber-obsidian'
  | 'teal-ivory'
  | 'rose-graphite'
  | 'cyan-midnight';

export interface ManagedBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  primaryKeyword: string;
  keywordDensity: number;
  seoDescription: string;
  coverTheme: CoverTheme;
  coverImage?: string;
  author: {
    name: string;
    role: string;
  };
  readTime: string;
  relatedServiceSlug: string;
  relatedProjectSlug: string;
  status: 'published' | 'draft';
  sourceType: 'manual' | 'auto';
  publishedAt: string;
  updatedAt?: string;
}

export interface AutoBlogSettings {
  id: string;
  enabled: boolean;
  intervalDays: number;
  lastAutoPublishedAt: string | null;
  nextScheduledAt: string | null;
  defaultAuthorName: string;
  defaultAuthorRole: string;
  updatedAt: string;
}

export const BLOG_COVER_IMAGES: { label: string; url: string }[] = [
  { label: 'ERP Architecture Studio', url: '/images/blog/erp-architecture.jpg' },
  { label: 'Cloud & Microservices', url: '/images/blog/microservices-cloud.jpg' },
  { label: 'AI & Workflow Automation', url: '/images/blog/ai-b2b-automation.jpg' },
  { label: 'SEO & Digital Growth', url: '/images/blog/seo-web-growth.jpg' },
  { label: 'Office ERP Showcase', url: '/images/showcase/erp-automation-showcase.jpg' },
  { label: 'Web Engineering Studio', url: '/images/showcase/web-design-showcase.jpg' },
  { label: 'Mobile App Engineering', url: '/images/showcase/mobile-app-showcase.jpg' },
  { label: 'Cloud & Cyber Security', url: '/images/showcase/cloud-security-showcase.jpg' }
];

export function resolveBlogCoverImage(
  category?: string,
  coverTheme?: CoverTheme,
  explicit?: string
): string {
  if (explicit && explicit.trim()) return explicit.trim();
  const cat = (category || '').toLowerCase();
  if (cat.includes('industrial') || cat.includes('qr')) return '/images/showcase/erp-automation-showcase.jpg';
  if (cat.includes('erp') || cat.includes('architecture') || cat.includes('edtech')) return '/images/blog/erp-architecture.jpg';
  if (cat.includes('ai') || cat.includes('artificial') || cat.includes('insurtech')) return '/images/blog/ai-b2b-automation.jpg';
  if (cat.includes('seo') || cat.includes('web') || cat.includes('marketing')) return '/images/blog/seo-web-growth.jpg';
  if (cat.includes('mobile')) return '/images/showcase/mobile-app-showcase.jpg';
  if (cat.includes('cloud') || cat.includes('security') || cat.includes('engineering')) return '/images/blog/microservices-cloud.jpg';
  if (coverTheme === 'indigo-slate') return '/images/blog/microservices-cloud.jpg';
  if (coverTheme === 'amber-obsidian') return '/images/blog/ai-b2b-automation.jpg';
  return '/images/blog/erp-architecture.jpg';
}

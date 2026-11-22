import React from 'react';
import { Metadata } from 'next';
import { BookOpen, Sparkles, ShieldCheck } from 'lucide-react';
import { loadAllBlogPosts } from '@/lib/blog/blogEngine';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Engineering Blogs, ERP Guides & SEO Insights | Ecreation IT Solution',
  description:
    'Read original, in-depth technical articles on custom ERP software, Next.js SEO architecture, AI workflow automation, cloud security, and mobile engineering by Ecreation IT Solution.',
  keywords: [
    'ERP software blog',
    'Next.js SEO architecture',
    'AI workflow automation guide',
    'custom software engineering insights',
    'Ecreation IT Solution blog'
  ]
};

export default async function BlogPage() {
  const initialPosts = await loadAllBlogPosts(false);

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-300/80 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Engineering Knowledge Base &amp; SEO Insights</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-950 dark:text-white leading-tight">
            Actionable Architecture &amp;{' '}
            <span className="text-amber-700 dark:text-amber-400">Digital Growth Guides</span>
          </h1>

          <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Original, easy-to-read engineering playbooks on ERP automation, scalable cloud platforms, technical SEO, and AI systems — crafted to help modern businesses build smarter and convert more enquiries.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-2 text-xs font-mono font-semibold text-stone-600 dark:text-stone-400">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              100% Original &amp; Copyright-Free Visuals
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Updated Every 3–4 Days
            </span>
          </div>
        </div>

        {/* Interactive Search, Categories, Tags & Articles */}
        <BlogListClient initialPosts={initialPosts} />
      </div>
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import { BookOpen, Sparkles, ShieldCheck, Layers } from 'lucide-react';
import { getSeedManagedBlogs } from '@/lib/blog/blogEngine';
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

export default function BlogPage() {
  const initialPosts = getSeedManagedBlogs();

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Luxury Magazine Hero Banner Card (Option 3 Warm Sage-Cream & 24K Gold) */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-7 sm:p-10 lg:p-12 text-center space-y-5 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-amber-400/70 text-emerald-900 text-xs font-mono font-black uppercase tracking-wider shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Ecreation Engineering Journal &amp; SEO Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-950 leading-tight max-w-4xl mx-auto">
            Actionable Architecture &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-emerald-800">
              Digital Growth Guides
            </span>
          </h1>

          <p className="text-stone-700 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Original, easy-to-read engineering playbooks on ERP automation, scalable cloud platforms, technical SEO, and AI systems — crafted to help modern businesses scale smarter.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 pt-2 text-[11px] sm:text-xs font-mono font-bold text-stone-800">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              100% Original Editorial Photography
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Fresh Guides Every 3–4 Days
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 border border-amber-500/30">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              ERP · Cloud · AI · SEO
            </span>
          </div>
        </div>

        {/* Interactive Search, Categories, Tags, Featured Editorial & Grid */}
        <BlogListClient initialPosts={initialPosts} />
      </div>
    </div>
  );
}

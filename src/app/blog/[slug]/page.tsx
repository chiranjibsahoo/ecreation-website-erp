import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Tag,
  Layers,
  Briefcase,
  Sparkles,
  CheckCircle2,
  ListTree,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import {
  getBlogPostBySlug,
  getSeedManagedBlogs,
  resolveBlogCoverImage
} from '@/lib/blog/blogEngine';
import { SERVICES_DATA, PROJECTS_DATA, BLOG_POSTS_DATA } from '@/lib/data/seedData';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS_DATA.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seedPost = getSeedManagedBlogs().find((p) => p.slug === slug);
  const post = seedPost || (await getBlogPostBySlug(slug));
  if (!post) return { title: 'Article Not Found | Ecreation IT Solution' };

  const coverImg = resolveBlogCoverImage(post.category, post.coverTheme, post.coverImage);

  return {
    title: `${post.title} | Ecreation Blogs`,
    description: post.seoDescription || post.excerpt,
    keywords: [post.primaryKeyword, post.category, ...post.tags].filter(Boolean),
    openGraph: {
      type: 'article',
      title: `${post.title} | Ecreation IT Solution`,
      description: post.seoDescription || post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [coverImg]
    }
  };
}

function renderInlineRichText(text: string): React.ReactNode[] {
  const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return tokens.map((tok, i) => {
    const linkMatch = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      if (href.startsWith('/')) {
        return (
          <Link
            key={i}
            href={href}
            className="text-amber-700 dark:text-amber-400 font-bold underline underline-offset-4 decoration-amber-500/60 hover:text-stone-950 dark:hover:text-white"
          >
            {label}
          </Link>
        );
      }
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-700 font-bold underline underline-offset-4"
        >
          {label}
        </a>
      );
    }
    const boldMatch = tok.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={i} className="font-extrabold text-stone-950 dark:text-white">
          {boldMatch[1]}
        </strong>
      );
    }
    return <React.Fragment key={i}>{tok}</React.Fragment>;
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const seedBlogs = getSeedManagedBlogs();
  const post = seedBlogs.find((p) => p.slug === slug) || (await getBlogPostBySlug(slug));

  if (!post) {
    notFound();
  }

  const coverImg = resolveBlogCoverImage(post.category, post.coverTheme, post.coverImage);
  const relatedPosts = seedBlogs.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedService =
    SERVICES_DATA.find((s) => s.slug === post.relatedServiceSlug) || SERVICES_DATA[0];
  const relatedProject =
    PROJECTS_DATA.find((p) => p.slug === post.relatedProjectSlug) || PROJECTS_DATA[0];

  // Parse blocks + build clean Table of Contents
  const contentBlocks = post.content
    .split('\n\n')
    .map((b) => b.trim())
    .filter(Boolean);

  const headings: { id: string; text: string }[] = [];
  contentBlocks.forEach((b, idx) => {
    if (b.startsWith('### ') || b.startsWith('## ')) {
      headings.push({ id: `section-${idx}`, text: b.replace(/^#{2,3}\s+/, '') });
    }
  });

  return (
    <article className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <SchemaMarkup type="Article" data={post as unknown as Record<string, unknown>} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/blog"
            className="subsection-bordered-item inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-stone-900 text-xs font-bold text-stone-800 dark:text-stone-200 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-600" />
            Back to All Blogs
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <Link href="/" className="hover:text-stone-950">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-stone-950">Blogs</Link>
            <span>/</span>
            <span className="text-amber-800 dark:text-amber-400 font-bold">{post.category}</span>
          </div>
        </div>

        {/* Luxury Editorial Hero Banner Card */}
        <header className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Hero Image */}
            <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] bg-stone-950 overflow-hidden">
              <img
                src={coverImg}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/15" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500 text-stone-950 shadow-md">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Hero Metadata & Title */}
            <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between space-y-6 bg-gradient-to-br from-white via-[#FFFDF9] to-[#F7F1E3] dark:from-stone-900 dark:via-stone-900 dark:to-stone-950">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500">
                  <span className="flex items-center gap-1.5 font-semibold text-stone-700 dark:text-stone-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-stone-950 dark:text-white leading-tight">
                  {post.title}
                </h1>

                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed border-l-4 border-amber-500 pl-4 py-1">
                  {post.excerpt}
                </p>
              </div>

              {/* Author Byline */}
              <div className="pt-5 border-t border-amber-500/25 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-stone-950 text-amber-400 border border-amber-500/50 flex items-center justify-center font-black text-base">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-stone-950 dark:text-white">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-stone-500">{post.author.role}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Editorial
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* 2-Column Reading Layout: Main Editorial Canvas (8 Cols) + Sticky Sidebar (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols: Comfortable Eye-Friendly Reading Body */}
          <div className="lg:col-span-8 space-y-8">
            <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 lg:p-12 space-y-6 text-stone-700 dark:text-stone-300 leading-[1.9] text-[15.5px] sm:text-[17px]">
              {contentBlocks.map((trimmed, index) => {
                if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
                  return (
                    <h2
                      id={`section-${index}`}
                      key={index}
                      className="scroll-mt-28 text-xl sm:text-2xl font-black text-stone-950 dark:text-white pt-5 pb-2 border-b border-amber-500/25 flex items-center gap-2.5"
                    >
                      <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-amber-500 to-amber-700 shrink-0" />
                      <span>{trimmed.replace(/^#{2,3}\s+/, '')}</span>
                    </h2>
                  );
                }

                if (trimmed.startsWith('1. ') || trimmed.startsWith('- ')) {
                  const lines = trimmed.split('\n').filter(Boolean);
                  return (
                    <div
                      key={index}
                      className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE0]/60 dark:from-stone-800/80 dark:to-stone-900 border border-amber-500/25 space-y-3.5"
                    >
                      {lines.map((line, lIdx) => (
                        <div key={lIdx} className="flex items-start gap-3 text-sm sm:text-[15.5px]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                          <p className="leading-relaxed">
                            {renderInlineRichText(line.replace(/^(\d+\.\s+|-\s+)/, ''))}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                }

                return (
                  <p key={index} className="leading-[1.9]">
                    {renderInlineRichText(trimmed)}
                  </p>
                );
              })}
            </div>

            {/* Article Topic Tags */}
            <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-2xl p-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5 mr-1">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                Topics Covered:
              </span>
              {post.tags.map((t) => (
                <Link
                  key={t}
                  href="/blog"
                  className="text-xs font-mono px-3 py-1 rounded-lg bg-[#FAF8F5] dark:bg-stone-800 border border-amber-500/25 text-stone-800 dark:text-stone-200 hover:border-amber-500 hover:text-amber-800 transition-colors"
                >
                  #{t}
                </Link>
              ))}
            </div>

            {/* Blue Conversion CTA Callout */}
            <div className="subsection-bordered-card p-8 rounded-3xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/20">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-indigo-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ready to build this for your business?</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Request a Free Architecture &amp; Cost Proposal
                </h3>
                <p className="text-xs sm:text-sm text-indigo-100">
                  Talk directly with our Principal Solutions Architects — 100% NDA protected, fixed-cost milestones.
                </p>
              </div>
              <Link href="/contact#enquiry" className="shrink-0">
                <Button
                  size="lg"
                  className="bg-white text-indigo-700 hover:bg-stone-100 font-bold rounded-xl text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  Start Free Enquiry
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right 4 Cols: Sticky Table of Contents, Internal Links & Quick Consultation */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-6 space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-stone-950 dark:text-white pb-2.5 border-b border-amber-500/25">
                  <ListTree className="w-4 h-4 text-amber-600" />
                  <span>In This Article</span>
                </div>
                <ul className="space-y-2 text-xs font-semibold">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 flex items-start gap-2 transition-colors"
                      >
                        <span className="text-amber-600 font-mono">→</span>
                        <span>{h.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Consultation Sidebar Card (Warm Sage-Cream & Gold) */}
            <div className="subsection-bordered-card rounded-3xl bg-gradient-to-br from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950 p-6 space-y-3.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-emerald-800 text-[10px] font-mono font-black uppercase border border-emerald-200">
                <Sparkles className="w-3 h-3 text-amber-600" />
                25% Launch Offer Active
              </span>
              <h3 className="text-base font-black text-stone-950 leading-snug">
                Need help implementing {post.primaryKeyword || post.category}?
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Get a complimentary live demo, architecture roadmap, and timeline estimate from our engineering team within 4 business hours.
              </p>
              <Link href="/contact#enquiry" className="block pt-1">
                <Button className="w-full rounded-xl bg-stone-950 hover:bg-stone-900 text-amber-400 font-black text-xs h-10 cursor-pointer">
                  Book Free Consultation
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>

            {/* Related Service Internal Link Card */}
            {relatedService && (
              <Link
                href={`/services/${relatedService.slug}`}
                className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-5 space-y-2 block group"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono font-black text-amber-700 uppercase">
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  <span>Related Service</span>
                </div>
                <h4 className="text-sm font-black text-stone-950 dark:text-white group-hover:text-amber-700 transition-colors">
                  {relatedService.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                  {relatedService.shortDescription}
                </p>
                <span className="text-xs font-bold text-amber-800 inline-flex items-center gap-1 pt-1">
                  Explore Service <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            )}

            {/* Related Portfolio Project Internal Link Card */}
            {relatedProject && (
              <Link
                href={`/projects/${relatedProject.slug}`}
                className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl overflow-hidden block group"
              >
                {relatedProject.image && (
                  <div className="aspect-[16/9] w-full bg-stone-950 overflow-hidden border-b border-amber-500/20">
                    <img
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono font-black text-emerald-700 uppercase">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Case Study</span>
                  </div>
                  <h4 className="text-sm font-black text-stone-950 dark:text-white group-hover:text-emerald-700 transition-colors">
                    {relatedProject.title}
                  </h4>
                  <span className="text-xs font-bold text-emerald-800 inline-flex items-center gap-1">
                    View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            )}
          </aside>
        </div>

        {/* Continue Reading Grid with Real Images */}
        {relatedPosts.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-amber-500/25">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-stone-950 dark:text-white">
                Continue Reading on Ecreation Blogs
              </h3>
              <Link href="/blog" className="text-xs font-bold text-amber-800 hover:underline">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => {
                const rpImg = resolveBlogCoverImage(rp.category, rp.coverTheme, rp.coverImage);
                return (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="group subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] w-full bg-stone-950 overflow-hidden relative">
                        <img
                          src={rpImg}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-white/95 text-stone-950">
                          {rp.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="text-base font-extrabold text-stone-950 dark:text-white group-hover:text-amber-700 line-clamp-2 leading-snug">
                          {rp.title}
                        </h4>
                        <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                          {rp.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 py-3 border-t border-amber-500/15 text-[11px] font-mono text-stone-500 flex items-center justify-between">
                      <span>{rp.readTime}</span>
                      <span className="font-bold text-amber-800">Read →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

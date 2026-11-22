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
  CheckCircle2
} from 'lucide-react';
import { getBlogPostBySlug, loadAllBlogPosts } from '@/lib/blog/blogEngine';
import { SERVICES_DATA, PROJECTS_DATA } from '@/lib/data/seedData';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { BlogCoverArt } from '@/components/blog/BlogCoverArt';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await loadAllBlogPosts(false);
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Article Not Found | Ecreation IT Solution' };

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
      tags: post.tags
    }
  };
}

/**
 * Renders inline markdown links `[label](/path)` and bold `**text**` safely into React elements
 * so internal SEO links are real crawlable Next.js <Link> anchors.
 */
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
            className="text-amber-700 dark:text-amber-400 font-bold underline underline-offset-4 hover:text-stone-950 dark:hover:text-white"
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
        <strong key={i} className="font-bold text-stone-950 dark:text-white">
          {boldMatch[1]}
        </strong>
      );
    }
    return <React.Fragment key={i}>{tok}</React.Fragment>;
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await loadAllBlogPosts(false);
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedService =
    SERVICES_DATA.find((s) => s.slug === post.relatedServiceSlug) || SERVICES_DATA[0];
  const relatedProject =
    PROJECTS_DATA.find((p) => p.slug === post.relatedProjectSlug) || PROJECTS_DATA[0];

  return (
    <article className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <SchemaMarkup type="Article" data={post as unknown as Record<string, unknown>} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/blog"
            className="subsection-bordered-item inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-stone-900 text-xs font-bold text-stone-700 dark:text-stone-300 hover:text-stone-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-600" />
            Back to All Blogs
          </Link>

          <span className="text-[11px] font-mono text-stone-500">
            Category: <strong className="text-amber-800 dark:text-amber-400">{post.category}</strong>
          </span>
        </div>

        {/* Main Article Header Card */}
        <header className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl overflow-hidden">
          <BlogCoverArt
            theme={post.coverTheme}
            category={post.category}
            keyword={post.primaryKeyword}
          />

          <div className="p-6 sm:p-10 space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500">
              <span className="font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-md border border-amber-300/80">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-white leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed border-l-4 border-amber-500 pl-4 bg-[#FAF8F5] dark:bg-stone-800/50 py-3 rounded-r-xl">
              {post.excerpt}
            </p>

            {/* Author Byline */}
            <div className="pt-3 border-t border-amber-500/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-950 text-amber-400 flex items-center justify-center font-black text-sm">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-stone-950 dark:text-white">{post.author.name}</p>
                <p className="text-xs text-stone-500">{post.author.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Readable Editorial Body */}
        <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 space-y-6 text-stone-700 dark:text-stone-300 leading-[1.85] text-[15px] sm:text-[16.5px]">
          {post.content.split('\n\n').map((block, index) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
              return (
                <h2
                  key={index}
                  className="text-xl sm:text-2xl font-extrabold text-stone-950 dark:text-white pt-4 pb-1 border-b border-amber-500/20"
                >
                  {trimmed.replace(/^#{2,3}\s+/, '')}
                </h2>
              );
            }

            if (trimmed.startsWith('1. ') || trimmed.startsWith('- ')) {
              const lines = trimmed.split('\n').filter(Boolean);
              return (
                <div
                  key={index}
                  className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] dark:bg-stone-800/70 border border-amber-500/25 space-y-3"
                >
                  {lines.map((line, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-2.5 text-sm sm:text-[15px]">
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
              <p key={index} className="leading-[1.85]">
                {renderInlineRichText(trimmed)}
              </p>
            );
          })}
        </div>

        {/* Internal SEO Linking Cards: Related Service + Related Case Study */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {relatedService && (
            <Link
              href={`/services/${relatedService.slug}`}
              className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-2xl p-6 space-y-2.5 block group"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Related Engineering Service</span>
              </div>
              <h3 className="text-base font-black text-stone-950 dark:text-white group-hover:text-amber-700 transition-colors">
                {relatedService.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                {relatedService.shortDescription}
              </p>
              <span className="text-xs font-bold text-amber-800 dark:text-amber-400 inline-flex items-center gap-1 pt-1">
                Explore Service Deliverables <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          )}

          {relatedProject && (
            <Link
              href={`/projects/${relatedProject.slug}`}
              className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-2xl p-6 space-y-2.5 block group"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span>Verified Case Study</span>
              </div>
              <h3 className="text-base font-black text-stone-950 dark:text-white group-hover:text-emerald-700 transition-colors">
                {relatedProject.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                {relatedProject.summary}
              </p>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 inline-flex items-center gap-1 pt-1">
                Inspect Production Architecture <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          )}
        </div>

        {/* Tags Bar */}
        <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-2xl p-5 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 mr-1">
            <Tag className="w-3.5 h-3.5 text-amber-600" />
            Article Tags:
          </span>
          {post.tags.map((t) => (
            <Link
              key={t}
              href="/blog"
              className="text-xs font-mono px-3 py-1 rounded-lg bg-[#FAF8F5] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-amber-500"
            >
              #{t}
            </Link>
          ))}
        </div>

        {/* High-Converting Enquiry CTA Banner (Blue with Border) */}
        <div className="subsection-bordered-card p-8 rounded-3xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/20">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-indigo-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to implement this in your business?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Request a Free Technical Architecture &amp; Cost Proposal
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100">
              Connect directly with our Solutions Architects — 100% NDA protected, fixed-cost milestones.
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

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="space-y-4 pt-4">
            <h3 className="text-lg font-black text-stone-950 dark:text-white">
              Continue Reading on Ecreation Blogs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-2xl p-4 space-y-2 block group"
                >
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-700">
                    {rp.category}
                  </span>
                  <h4 className="text-sm font-bold text-stone-950 dark:text-white group-hover:text-amber-700 line-clamp-2">
                    {rp.title}
                  </h4>
                  <span className="text-[11px] text-stone-500 block">{rp.readTime}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

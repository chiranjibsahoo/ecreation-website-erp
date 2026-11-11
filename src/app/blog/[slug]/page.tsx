import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, BookOpen } from 'lucide-react';
import { BLOG_POSTS_DATA } from '@/lib/data/seedData';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

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
  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | Ecreation Engineering Blog`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      type: 'article',
      title: `${post.title} | Ecreation Engineering Blog`,
      description: post.seoDescription || post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-28 pb-24 bg-background">
      <SchemaMarkup type="Article" data={post as unknown as Record<string, unknown>} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="space-y-4 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-md">
              {post.category}
            </span>
            <span className="text-muted-foreground flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed italic">
            "{post.excerpt}"
          </p>

          {/* Author Byline */}
          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold text-sm">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed text-base">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl sm:text-2xl font-bold text-foreground pt-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              return (
                <div key={index} className="bg-card border border-border p-5 rounded-xl my-4 text-sm space-y-2">
                  {paragraph.split('\n').map((line, lIdx) => (
                    <p key={lIdx} className="leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              );
            }
            return (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <footer className="pt-8 border-t border-border space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground mr-1" />
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1 rounded-md bg-muted text-muted-foreground"
              >
                #{t}
              </span>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-foreground">Want to discuss this architecture?</p>
              <p className="text-xs text-muted-foreground">Schedule a technical consultation with our engineering team.</p>
            </div>
            <Link
              href="/contact"
              className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}

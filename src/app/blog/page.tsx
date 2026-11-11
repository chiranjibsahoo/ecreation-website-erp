import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen, Calendar, User } from 'lucide-react';
import { BLOG_POSTS_DATA } from '@/lib/data/seedData';
import { CardHover } from '@/components/animations/CardHover';

export const metadata: Metadata = {
  title: 'Engineering Blog & Technical Insights',
  description: 'Deep-dive architectural insights, ERP strategies, cloud migration guides, and AI integration best practices from Ecreation IT Solution engineers.'
};

export default function BlogPage() {
  return (
    <div className="pt-28 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-200/80">
            Insights & Architecture
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
            Engineering Knowledge Base
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Technical breakdowns, ERP design principles, and cloud migration frameworks written by our practitioners.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS_DATA.map((post) => (
            <CardHover
              key={post.id}
              className="bg-card border border-border p-8 rounded-2xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground font-mono">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="font-medium text-foreground">{post.author.name}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </CardHover>
          ))}
        </div>
      </div>
    </div>
  );
}

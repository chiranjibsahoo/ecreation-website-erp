'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  ArrowRight,
  Search,
  Tag,
  User,
  Calendar,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { ManagedBlogPost } from '@/lib/blog/blogEngine';
import { BlogCoverArt } from '@/components/blog/BlogCoverArt';
import { CardHover } from '@/components/animations/CardHover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BlogListClientProps {
  initialPosts: ManagedBlogPost[];
}

export default function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [posts, setPosts] = useState<ManagedBlogPost[]>(initialPosts);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Live refresh published blogs from API so newly auto-published / manual blogs appear immediately
  useEffect(() => {
    fetch('/api/blogs', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.posts && Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts);
        }
      })
      .catch(() => {});
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(['All']);
    posts.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [posts]);

  const popularTags = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) =>
      p.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1))
    );
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [posts, search, activeCategory, activeTag]);

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="space-y-12">
      {/* Search, Category Tabs & Tag Chips */}
      <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ERP, SEO, Cloud, AI, Mobile Apps..."
              className="pl-10 h-10 rounded-xl text-xs sm:text-sm bg-[#FAF8F5] dark:bg-stone-800 border-amber-500/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveTag(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'bg-[#FAF8F5] dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-50 border border-stone-200 dark:border-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Topic Tags */}
        {popularTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-amber-500/20">
            <span className="text-[11px] font-mono font-bold text-stone-500 flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3 text-amber-600" />
              Topics:
            </span>
            {activeTag && (
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-900 text-white cursor-pointer"
              >
                Clear #{activeTag} ✕
              </button>
            )}
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer ${
                  activeTag === tag
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-500'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 ? (
        <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-12 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-amber-600 mx-auto" />
          <h3 className="text-lg font-bold text-stone-950 dark:text-white">No matching articles found</h3>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Try clearing your search or selecting another engineering category.
          </p>
          <Button
            size="sm"
            onClick={() => {
              setSearch('');
              setActiveCategory('All');
              setActiveTag(null);
            }}
            className="rounded-xl bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer"
          >
            Show All Articles
          </Button>
        </div>
      ) : (
        <>
          {/* Featured Latest Editorial Spotlight */}
          {featuredPost && (
            <CardHover className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <BlogCoverArt
                  theme={featuredPost.coverTheme}
                  category={featuredPost.category}
                  keyword={featuredPost.primaryKeyword}
                />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5">
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500">
                    <span className="inline-flex items-center gap-1 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-300 font-bold">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      Featured Guide
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-white leading-tight">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                    >
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredPost.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-xs">
                    <div className="w-8 h-8 rounded-full bg-stone-950 text-amber-400 flex items-center justify-center font-black">
                      {featuredPost.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-stone-950 dark:text-white">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-[11px] text-stone-500">{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button className="rounded-xl bg-stone-950 hover:bg-stone-900 text-amber-400 font-bold text-xs px-5 cursor-pointer">
                      Read Full Article
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHover>
          )}

          {/* Editorial Articles Grid */}
          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {gridPosts.map((post) => (
                <CardHover
                  key={post.id}
                  className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <BlogCoverArt
                      theme={post.coverTheme}
                      category={post.category}
                      keyword={post.primaryKeyword}
                      compact
                    />

                    <div className="p-6 space-y-3.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-600" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-600" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-stone-950 dark:text-white leading-snug">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-amber-500/20 bg-[#FAF8F5]/60 dark:bg-stone-950/40 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 truncate">
                      <User className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{post.author.name}</span>
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-black text-amber-800 dark:text-amber-400 hover:underline inline-flex items-center gap-1 shrink-0"
                    >
                      Read
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </CardHover>
              ))}
            </div>
          )}
        </>
      )}

      {/* High-Converting Content Marketing CTA Banner */}
      <div className="subsection-bordered-card p-8 sm:p-10 rounded-3xl bg-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/20">
        <div className="space-y-1.5 text-center md:text-left max-w-2xl">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-200">
            TURN ARCHITECTURE INTO GROWTH
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need a Custom Website, ERP, or AI Automation Roadmap?
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100">
            Speak directly with our Principal Solutions Architects for a complimentary technical blueprint and fixed-cost estimate.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link href="/contact#enquiry">
            <Button
              size="lg"
              className="bg-white text-indigo-700 hover:bg-stone-100 font-bold rounded-xl text-xs sm:text-sm shadow-md cursor-pointer"
            >
              Get Free Project Consultation
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  ArrowLeft,
  Clock,
  Trash2,
  Edit,
  ExternalLink,
  Save,
  Tag,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BLOG_POSTS_DATA } from '@/lib/data/seedData';
import { BlogPost } from '@/types';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS_DATA);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const calculateReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const handleSave = (postToSave: BlogPost) => {
    const updated = {
      ...postToSave,
      readTime: calculateReadTime(postToSave.content)
    };

    if (isCreating) {
      setPosts((prev) => [updated, ...prev]);
      setIsCreating(false);
    } else {
      setPosts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
    }
    setEditingPost(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to unpublish and delete this article?')) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      if (editingPost?.id === id) {
        setEditingPost(null);
      }
    }
  };

  const handleCreateNew = () => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: 'scalable-engineering-principles',
      title: 'Architectural Strategies for Enterprise Scalability',
      excerpt: 'Executive summary detailing how to structure high-throughput applications with Next.js and PostgreSQL.',
      content: `### Executive Overview\n\nModern cloud systems demand resilience, type-safety, and minimal cold-start latencies.\n\n### Architectural Strategy\n\n1. Enforce strict database policies at the persistence layer.\n2. Leverage edge caching for global read performance.\n3. Implement optimistic client-side updates for interactive workflows.`,
      category: 'Architecture',
      author: {
        name: 'Ecreation Editorial',
        role: 'Principal Solutions Architect'
      },
      tags: ['Architecture', 'Next.js', 'PostgreSQL', 'Cloud'],
      readTime: '4 min read',
      publishedAt: new Date().toISOString().slice(0, 10),
      seoDescription: 'A technical analysis by Ecreation IT Solution on engineering enterprise-scale software.'
    };
    setEditingPost(newPost);
    setIsCreating(true);
  };

  return (
    <div className="pt-28 pb-24 bg-muted/20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/admin" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Admin Overview
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Blog CMS & SEO Management</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">Blog CMS & Technical Publishing</h1>
            <p className="text-sm text-muted-foreground">
              Publish technical write-ups, maintain reading times, and manage structured SEO metadata.
            </p>
          </div>
          <Button
            onClick={handleCreateNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Write New Technical Article
          </Button>
        </div>

        {/* Grid: Article List & Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Article List */}
          <div className={`space-y-4 ${editingPost ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className={`bg-card border rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-3 transition-all ${
                    editingPost?.id === post.id
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'border-border hover:border-border/80'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="outline" className="text-[10px] uppercase font-mono">
                        {post.category}
                      </Badge>
                      <span className="text-muted-foreground font-mono flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground leading-snug">{post.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-[11px] text-muted-foreground">
                      By {post.author.name}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg"
                        title="View Published Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingPost({ ...post });
                          setIsCreating(false);
                        }}
                        className="h-7 text-xs rounded-lg"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(post.id)}
                        className="h-7 w-7 text-destructive hover:bg-destructive/10 rounded-lg"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Article Editor Form */}
          {editingPost && (
            <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg space-y-6 animate-in fade-in-50">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase block">
                    {isCreating ? 'Publishing New Article' : 'Editing Article'}
                  </span>
                  <h3 className="text-lg font-bold text-foreground truncate max-w-md">{editingPost.title}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingPost(null)}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Article Headline</label>
                  <Input
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="text-xs rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">URL Slug</label>
                    <Input
                      value={editingPost.slug}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                      className="text-xs rounded-xl font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Category</label>
                    <Input
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                      className="text-xs rounded-xl"
                      placeholder="Architecture, DevOps, AI"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Executive Excerpt (Preview Cards)</label>
                  <Textarea
                    rows={2}
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    className="text-xs rounded-xl resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-foreground">Article Body Content (Markdown Supported)</label>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      Estimated: {calculateReadTime(editingPost.content)}
                    </span>
                  </div>
                  <Textarea
                    rows={8}
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="text-xs rounded-xl font-mono leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-border">
                  <div className="flex items-center gap-1.5 text-indigo-600 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SEO & Structured Metadata</span>
                  </div>
                  <Textarea
                    rows={2}
                    value={editingPost.seoDescription}
                    onChange={(e) => setEditingPost({ ...editingPost, seoDescription: e.target.value })}
                    className="text-xs rounded-xl resize-none"
                    placeholder="Search engine meta description (under 160 characters)..."
                  />
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingPost(null)}
                    className="text-xs rounded-xl"
                  >
                    Discard Changes
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSave(editingPost)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
                  >
                    <Save className="w-3.5 h-3.5 mr-1.5" />
                    Save & Publish Article
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

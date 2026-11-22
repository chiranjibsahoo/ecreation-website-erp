'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Clock,
  Trash2,
  Edit,
  ExternalLink,
  Save,
  Sparkles,
  Calendar,
  Bot,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { SERVICES_DATA, PROJECTS_DATA } from '@/lib/data/seedData';
import { BLOG_COVER_IMAGES } from '@/lib/blog/blogMedia';
import type { ManagedBlogPost, AutoBlogSettings, CoverTheme } from '@/lib/blog/blogMedia';

const COVER_THEME_OPTIONS: { value: CoverTheme; label: string }[] = [
  { value: 'emerald-gold', label: 'Emerald & 24K Gold' },
  { value: 'indigo-slate', label: 'Indigo & Slate' },
  { value: 'amber-obsidian', label: 'Amber & Obsidian' },
  { value: 'teal-ivory', label: 'Teal & Ivory' },
  { value: 'rose-graphite', label: 'Rose & Graphite' },
  { value: 'cyan-midnight', label: 'Cyan & Midnight' }
];

function computeClientSeo(title: string, content: string, keyword: string, seoDesc: string) {
  const full = `${title} ${content}`.toLowerCase();
  const words = full.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const kw = keyword.trim().toLowerCase();
  let kwCount = 0;
  if (kw && wordCount > 0) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matches = full.match(new RegExp(`\\b${escaped}\\b`, 'gi'));
    kwCount = matches ? matches.length : 0;
  }
  const kwWords = kw ? kw.split(/\s+/).filter(Boolean).length : 1;
  const density = wordCount > 0 ? Number((((kwCount * kwWords) / wordCount) * 100).toFixed(2)) : 0;
  const densityOk = density >= 0.8 && density <= 2.8;
  const noStuffing = density <= 3.5;
  const hasHeadings = content.includes('### ') || content.includes('## ');
  const hasInternalLinks =
    content.includes('/services') || content.includes('/projects') || content.includes('/contact');
  const metaOk = seoDesc.trim().length >= 90 && seoDesc.trim().length <= 165;

  let score = 30;
  if (wordCount >= 250) score += 20;
  if (densityOk) score += 20;
  if (hasHeadings) score += 10;
  if (hasInternalLinks) score += 10;
  if (metaOk) score += 10;

  return { wordCount, kwCount, density, densityOk, noStuffing, hasHeadings, hasInternalLinks, metaOk, score };
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<ManagedBlogPost[]>([]);
  const [automation, setAutomation] = useState<AutoBlogSettings>({
    id: 'default',
    enabled: true,
    intervalDays: 3,
    lastAutoPublishedAt: null,
    nextScheduledAt: null,
    defaultAuthorName: 'Ecreation Engineering Editorial',
    defaultAuthorRole: 'Principal Solutions Architecture Team',
    updatedAt: ''
  });

  const [editingPost, setEditingPost] = useState<ManagedBlogPost | null>(null);
  const [tagsInput, setTagsInput] = useState('');
  const [savingPost, setSavingPost] = useState(false);
  const [savingAuto, setSavingAuto] = useState(false);
  const [generatingNow, setGeneratingNow] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const loadBlogs = useCallback(async () => {
    try {
      const res = await fetch('/api/blogs?admin=true', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.posts)) setPosts(data.posts);
        if (data.automation) setAutomation(data.automation);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const startNewPost = () => {
    const draft: ManagedBlogPost = {
      id: `blog-${Date.now().toString().slice(-6)}`,
      slug: '',
      title: '',
      excerpt: '',
      content: `### Executive Summary\n\nExplain the core business challenge and how modern engineering solves it cleanly.\n\n### Key Implementation Steps\n\n1. Define measurable KPIs and clean database schemas.\n2. Ensure fast Core Web Vitals and SEO-friendly semantic markup.\n3. Explore our dedicated [Enterprise ERP Services](/services/enterprise-erp-crm) or [Request a Consultation](/contact).`,
      category: 'Enterprise ERP',
      tags: ['ERP', 'SEO', 'Cloud Architecture'],
      primaryKeyword: 'custom ERP software',
      keywordDensity: 1.5,
      seoDescription: '',
      coverTheme: 'emerald-gold',
      author: {
        name: automation.defaultAuthorName,
        role: automation.defaultAuthorRole
      },
      readTime: '4 min read',
      relatedServiceSlug: 'enterprise-erp-crm',
      relatedProjectSlug: 'nsfs-erp-system',
      status: 'published',
      sourceType: 'manual',
      publishedAt: new Date().toISOString().slice(0, 10)
    };
    setEditingPost(draft);
    setTagsInput(draft.tags.join(', '));
  };

  const openEditPost = (post: ManagedBlogPost) => {
    setEditingPost({ ...post });
    setTagsInput(post.tags.join(', '));
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setSavingPost(true);
    setStatusMessage('');
    try {
      const parsedTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingPost,
          tags: parsedTags.length > 0 ? parsedTags : ['Engineering', 'SEO']
        })
      });

      const data = await res.json();
      if (res.ok && data.post) {
        setStatusMessage(`Published "${data.post.title}" successfully!`);
        setEditingPost(null);
        loadBlogs();
      } else {
        setStatusMessage(data.error || 'Failed to save blog post.');
      }
    } catch {
      setStatusMessage('Network error while saving blog post.');
    } finally {
      setSavingPost(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Delete this blog article permanently?')) return;
    try {
      await fetch(`/api/blogs?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      setPosts((prev) => prev.filter((p) => p.id !== id));
      if (editingPost?.id === id) setEditingPost(null);
      setStatusMessage('Article deleted.');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveAutomation = async () => {
    setSavingAuto(true);
    setStatusMessage('');
    try {
      const res = await fetch('/api/blogs/auto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(automation)
      });
      const data = await res.json();
      if (res.ok && data.automation) {
        setAutomation(data.automation);
        setStatusMessage(
          `Auto-Blog schedule saved (${data.automation.enabled ? `Every ${data.automation.intervalDays} days` : 'Paused'}).`
        );
      }
    } finally {
      setSavingAuto(false);
    }
  };

  const handleGenerateAutoNow = async () => {
    setGeneratingNow(true);
    setStatusMessage('');
    try {
      const res = await fetch('/api/blogs/auto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ generateNow: true })
      });
      const data = await res.json();
      if (res.ok && data.post) {
        setStatusMessage(data.reason || `Auto-published "${data.post.title}"!`);
        if (data.automation) setAutomation(data.automation);
        loadBlogs();
      } else {
        setStatusMessage(data.reason || data.error || 'Could not generate auto-blog.');
      }
    } finally {
      setGeneratingNow(false);
    }
  };

  const liveSeo = useMemo(() => {
    if (!editingPost) return null;
    return computeClientSeo(
      editingPost.title,
      editingPost.content,
      editingPost.primaryKeyword,
      editingPost.seoDescription
    );
  }, [editingPost]);

  return (
    <div className="pt-6 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                SEO Content Marketing &amp; Auto-Publishing CMS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
              Blogs Management (Manual + Auto-Blog)
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Publish original, copyright-free English SEO articles manually or automate unique blog publishing every 3–4 days with keyword-density guardrails.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/blog" target="_blank">
              <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold cursor-pointer">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                View Live Blogs
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={startNewPost}
              className="bg-stone-950 hover:bg-stone-900 text-amber-400 border border-amber-500/40 rounded-xl text-xs font-black cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Write Manual Blog
            </Button>
          </div>
        </div>

        {statusMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Auto-Blog Engine Control Card (Every 3–4 Days) */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950 p-5 sm:p-6 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-emerald-800 text-[11px] font-mono font-black border border-emerald-200">
                  <Bot className="w-3.5 h-3.5 text-emerald-600" />
                  Auto-Blog Publishing Engine
                </span>
                <span className="text-[11px] font-mono text-stone-600">
                  100% Original • Zero Copyright Risk • 1.2%–2.2% Keyword Density
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-stone-950">
                Automatic Unique SEO Blog Publishing (Every {automation.intervalDays} Days)
              </h2>
              <p className="text-xs text-stone-700 max-w-2xl">
                Automatically generates and publishes a unique, copyright-free English technical article with custom SVG cover art, internal service/portfolio links, and JSON-LD SEO schema on schedule.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-amber-500/30 text-xs font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={automation.enabled}
                  onChange={(e) => setAutomation({ ...automation, enabled: e.target.checked })}
                  className="w-4 h-4 accent-emerald-600"
                />
                <span>{automation.enabled ? 'Auto-Publish ON' : 'Paused'}</span>
              </label>

              <select
                value={automation.intervalDays}
                onChange={(e) => setAutomation({ ...automation, intervalDays: Number(e.target.value) })}
                className="h-9 px-3 rounded-xl bg-white border border-amber-500/30 text-xs font-bold text-stone-900"
              >
                <option value={3}>Every 3 Days</option>
                <option value={4}>Every 4 Days</option>
                <option value={7}>Every 7 Days</option>
              </select>

              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={savingAuto}
                onClick={handleSaveAutomation}
                className="h-9 rounded-xl bg-white text-stone-900 border-amber-500/40 text-xs font-bold cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                {savingAuto ? 'Saving...' : 'Save Schedule'}
              </Button>

              <Button
                type="button"
                size="sm"
                disabled={generatingNow}
                onClick={handleGenerateAutoNow}
                className="h-9 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-black cursor-pointer"
              >
                {generatingNow ? (
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                )}
                {generatingNow ? 'Generating Unique Blog...' : 'Generate & Publish Auto-Blog Now'}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-stone-700 pt-2 border-t border-amber-500/25">
            <span>
              Last Auto-Published:{' '}
              <strong>
                {automation.lastAutoPublishedAt
                  ? new Date(automation.lastAutoPublishedAt).toLocaleString()
                  : 'Ready for first run'}
              </strong>
            </span>
            <span>•</span>
            <span>
              Next Scheduled:{' '}
              <strong>
                {automation.nextScheduledAt
                  ? new Date(automation.nextScheduledAt).toLocaleDateString()
                  : `In ${automation.intervalDays} days`}
              </strong>
            </span>
          </div>
        </div>

        {/* Manual Blog Editor (When Creating or Editing) */}
        {editingPost && liveSeo && (
          <form
            onSubmit={handleSavePost}
            className="subsection-bordered-card bg-card rounded-3xl p-5 sm:p-7 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
              <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                <Edit className="w-4 h-4 text-amber-600" />
                <span>Manual SEO Blog Editor</span>
              </h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-300 font-mono text-xs">
                  SEO Score: {liveSeo.score}/100
                </Badge>
                <Badge
                  className={`font-mono text-xs ${
                    liveSeo.densityOk
                      ? 'bg-emerald-500/15 text-emerald-700 border-emerald-300'
                      : 'bg-amber-500/15 text-amber-800 border-amber-300'
                  }`}
                >
                  Keyword Density: {liveSeo.density}% ({liveSeo.kwCount}x / {liveSeo.wordCount} words)
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">Article Title (English) *</label>
                    <Input
                      required
                      value={editingPost.title}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          title: e.target.value,
                          slug:
                            editingPost.slug ||
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/^-|-$/g, '')
                        })
                      }
                      placeholder="e.g. How Custom ERP Software Scales Operations"
                      className="rounded-xl text-xs h-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">SEO URL Slug *</label>
                    <Input
                      required
                      value={editingPost.slug}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                      placeholder="custom-erp-software-guide"
                      className="rounded-xl text-xs h-10 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">Category</label>
                    <Input
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                      placeholder="Enterprise ERP"
                      className="rounded-xl text-xs h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">Primary Focus Keyword</label>
                    <Input
                      value={editingPost.primaryKeyword}
                      onChange={(e) => setEditingPost({ ...editingPost, primaryKeyword: e.target.value })}
                      placeholder="custom ERP software"
                      className="rounded-xl text-xs h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">Tags (comma-separated)</label>
                    <Input
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="ERP, SEO, Next.js, Cloud"
                      className="rounded-xl text-xs h-9"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Short Excerpt</label>
                  <Textarea
                    rows={2}
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    placeholder="Concise summary shown on the Blogs index page..."
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">
                    Article Body (Markdown supported: ### Headings, 1. Lists, [Internal Links](/services/enterprise-erp-crm)) *
                  </label>
                  <Textarea
                    required
                    rows={12}
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="rounded-xl text-xs font-mono leading-relaxed"
                  />
                </div>
              </div>

              {/* Right Column: SEO Checklist, Internal Linking & Cover Theme */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-3">
                  <h3 className="text-xs font-black uppercase text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Live SEO &amp; Anti-Spam Audit
                  </h3>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      {liveSeo.densityOk ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      )}
                      <span>Keyword Density: {liveSeo.density}% (Ideal 0.8%–2.8%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {liveSeo.hasHeadings ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      )}
                      <span>Structured ### Subheadings</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {liveSeo.hasInternalLinks ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      )}
                      <span>Internal Links to Services / Contact</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {liveSeo.metaOk ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      )}
                      <span>Meta Description: {editingPost.seoDescription.length}/160 chars</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">SEO Meta Description (90–160 chars)</label>
                  <Textarea
                    rows={3}
                    value={editingPost.seoDescription}
                    onChange={(e) => setEditingPost({ ...editingPost, seoDescription: e.target.value })}
                    placeholder="Compelling meta description for Google search snippets..."
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Editorial Cover Image (Original Copyright-Free)</label>
                  <select
                    value={editingPost.coverImage || BLOG_COVER_IMAGES[0].url}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, coverImage: e.target.value })
                    }
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-semibold"
                  >
                    {BLOG_COVER_IMAGES.map((img) => (
                      <option key={img.url} value={img.url}>
                        {img.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Original Cover Art Theme</label>
                  <select
                    value={editingPost.coverTheme}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, coverTheme: e.target.value as CoverTheme })
                    }
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-semibold"
                  >
                    {COVER_THEME_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Internal Link: Related Service</label>
                  <select
                    value={editingPost.relatedServiceSlug}
                    onChange={(e) => setEditingPost({ ...editingPost, relatedServiceSlug: e.target.value })}
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-semibold"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Internal Link: Related Case Study</label>
                  <select
                    value={editingPost.relatedProjectSlug}
                    onChange={(e) => setEditingPost({ ...editingPost, relatedProjectSlug: e.target.value })}
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-semibold"
                  >
                    {PROJECTS_DATA.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Publish Status</label>
                  <select
                    value={editingPost.status}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        status: e.target.value as 'published' | 'draft'
                      })
                    }
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs font-bold"
                  >
                    <option value="published">Published (Live for SEO Bots)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingPost(null)}
                className="rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={savingPost}
                className="rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs px-6 cursor-pointer"
              >
                <Save className="w-4 h-4 mr-1.5" />
                {savingPost ? 'Saving Article...' : 'Publish & Save Blog'}
              </Button>
            </div>
          </form>
        )}

        {/* All Published & Draft Blogs List */}
        <div className="space-y-3">
          <h2 className="text-base font-black text-foreground">
            All Managed Blog Articles ({posts.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="subsection-bordered-card bg-card rounded-2xl p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="outline" className="text-[10px]">
                        {post.category}
                      </Badge>
                      <Badge
                        className={
                          post.sourceType === 'auto'
                            ? 'bg-emerald-500/15 text-emerald-700 border-emerald-300 text-[10px]'
                            : 'bg-amber-500/15 text-amber-800 border-amber-300 text-[10px]'
                        }
                      >
                        {post.sourceType === 'auto' ? 'Auto-Blog' : 'Manual'}
                      </Badge>
                      {post.status === 'draft' && (
                        <Badge className="bg-stone-200 text-stone-700 text-[10px]">Draft</Badge>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      KW Density: {post.keywordDensity}%
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-foreground leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-600" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1"
                  >
                    View Live <ExternalLink className="w-3 h-3" />
                  </Link>

                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditPost(post)}
                      className="h-8 rounded-xl text-[11px] font-bold cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1 text-amber-600" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeletePost(post.id)}
                      className="h-8 rounded-xl text-[11px] font-bold text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

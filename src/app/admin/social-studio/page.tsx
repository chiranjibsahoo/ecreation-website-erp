'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Video,
  Image as ImageIcon,
  Share2,
  ExternalLink,
  Copy,
  CheckCircle2,
  Send,
  Settings,
  Upload,
  Wand2,
  Clock,
  AlertCircle,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type PlatformId = 'instagram' | 'youtube' | 'facebook' | 'linkedin' | 'x';

interface SocialAccountView {
  platform: string;
  display_name: string;
  account_handle: string;
  account_id: string;
  is_connected: boolean;
  auto_share_enabled: boolean;
  last_status: string;
}

interface PublishResult {
  platform: string;
  status: 'published' | 'queued_mobile_share' | 'webhook_sent' | 'failed';
  detail: string;
  postUrl?: string;
}

interface SocialPost {
  id: string;
  title: string;
  caption: string;
  hashtags: string;
  media_url: string;
  media_type: 'video' | 'image';
  source_tool: string;
  flow_prompt: string;
  platforms: PlatformId[];
  status: string;
  publish_results: PublishResult[];
  created_at: string;
}

const PROMO_PRESETS = [
  {
    id: 'erp-offer',
    label: 'ERP & Office Automation 25% OFF',
    title: 'Automate Your Entire Business with Custom ERP — Flat 25% OFF',
    flowPrompt:
      'Ultra-cinematic 4K vertical commercial video (9:16) for Ecreation IT Solution: sleek modern executive office transitioning into glowing 3D holographic GST billing, real-time inventory QR scanning, and mobile ERP analytics dashboards in 24K gold and emerald glass aesthetic, smooth camera dolly, crisp motion graphics.',
    caption:
      'Still managing billing, inventory & staff on spreadsheets? Upgrade to Ecreation Custom ERP Software — automated GST invoicing, multi-branch inventory, HR payroll & mobile admin app with Flat 25% OFF + Free 1-Year Cloud Hosting!',
    hashtags: '#EcreationIT #ERPSoftware #BusinessAutomation #CustomSoftware #DigitalIndia #SaaS #SmallBusinessGrowth'
  },
  {
    id: 'web-launch',
    label: 'Luxury Website Design Promo',
    title: 'High-Converting Luxury Corporate Website + AI Chatbot',
    flowPrompt:
      'High-end luxury tech agency promo reel (9:16), macro shots of MacBook and iPhone displaying ultra-fast gold-and-ivory corporate websites with 24/7 AI Sales Chatbot capturing live leads, dramatic studio lighting, sleek kinetic typography.',
    caption:
      'Your website is your 24/7 salesperson. Get a blazing-fast Next.js luxury website with built-in AI Consultant Chatbot, SEO #1 architecture & mobile admin panel. Claim your Free Quote & 25% Launch Discount today at ecreation.vercel.app!',
    hashtags: '#WebDesign #WebDevelopment #NextJS #AIChatbot #DigitalMarketing #EcreationITSolution'
  },
  {
    id: 'mobile-app',
    label: 'Mobile App & Gaming Showcase',
    title: 'Custom Android & iOS Apps Built for Scale — Ecreation IT',
    flowPrompt:
      'Futuristic 9:16 showcase video showing floating smartphones running high-speed EdTech, QR ERP, InsurTech, and short-video streaming apps with vibrant UI transitions, smooth 60fps animations, warm gold rim lighting.',
    caption:
      'From Study Tracker Lockon & Duragrit QR ERP to 50+ live Games — Ecreation IT Solution engineers production-grade Android, iOS & Web platforms built for massive scale. DM or visit ecreation.vercel.app for a free architecture roadmap!',
    hashtags: '#MobileAppDevelopment #AndroidApp #Flutter #ReactNative #TechStartup #EcreationIT'
  }
];

export default function SocialStudioPage() {
  const [accounts, setAccounts] = useState<SocialAccountView[]>([]);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>([]);

  const [title, setTitle] = useState(PROMO_PRESETS[0].title);
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const [flowPrompt, setFlowPrompt] = useState(PROMO_PRESETS[0].flowPrompt);
  const [caption, setCaption] = useState(PROMO_PRESETS[0].caption);
  const [hashtags, setHashtags] = useState(PROMO_PRESETS[0].hashtags);
  const [mediaUrl, setMediaUrl] = useState('');
  const [localPreviewUrl, setLocalPreviewUrl] = useState('');
  const [localFileName, setLocalFileName] = useState('');

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [latestResults, setLatestResults] = useState<PublishResult[]>([]);
  const [statusBanner, setStatusBanner] = useState('');

  const loadData = useCallback(async () => {
    try {
      const [accRes, postsRes] = await Promise.all([
        fetch('/api/social/settings', { cache: 'no-store' }),
        fetch('/api/social/publish', { cache: 'no-store' })
      ]);

      if (accRes.ok) {
        const accData = await accRes.json();
        if (Array.isArray(accData.accounts)) {
          const filtered = accData.accounts.filter((a: SocialAccountView) => a.platform !== 'google_flow');
          setAccounts(filtered);
          // Auto-select all accounts connected & auto-share enabled in Social Settings
          const autoEnabled = filtered
            .filter((a: SocialAccountView) => a.is_connected && a.auto_share_enabled)
            .map((a: SocialAccountView) => a.platform as PlatformId);
          setSelectedPlatforms((prev) => (prev.length > 0 ? prev : autoEnabled));
        }
      }

      if (postsRes.ok) {
        const pData = await postsRes.json();
        if (Array.isArray(pData.posts)) {
          setPosts(pData.posts);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadData();
    const handleSync = () => loadData();
    window.addEventListener('ecreation:admin-sync', handleSync);
    return () => window.removeEventListener('ecreation:admin-sync', handleSync);
  }, [loadData]);

  const togglePlatform = (p: PlatformId) => {
    setSelectedPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const handleOpenGoogleFlow = async () => {
    try {
      await navigator.clipboard.writeText(flowPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 4000);
    } catch {
      // ignore clipboard errors
    }
    if (typeof window !== 'undefined' && window.AndroidBridge?.openExternal) {
      window.AndroidBridge.openExternal('https://labs.google/fx/tools/flow');
    } else {
      window.open('https://labs.google/fx/tools/flow', '_blank', 'noopener,noreferrer');
    }
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalFileName(file.name);
    setMediaType(file.type.startsWith('image/') ? 'image' : 'video');
    const url = URL.createObjectURL(file);
    setLocalPreviewUrl(url);
  };

  const handleAutoPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishing(true);
    setStatusBanner('');
    setLatestResults([]);

    try {
      const res = await fetch('/api/social/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          caption,
          hashtags,
          mediaUrl: mediaUrl.trim(),
          mediaType,
          sourceTool: 'google_flow',
          flowPrompt,
          platforms: selectedPlatforms
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLatestResults(data.results || []);
        setPosts((prev) => [data.post, ...prev]);
        setStatusBanner(
          `Promotion campaign "${title}" processed for ${selectedPlatforms.length || 0} platform(s)!`
        );
      } else {
        setStatusBanner(data.error || 'Could not publish — please check Social Settings.');
      }
    } catch (err) {
      console.error(err);
      setStatusBanner('Network error while auto-sharing.');
    } finally {
      setPublishing(false);
    }
  };

  const handleNativeMobileShare = async () => {
    const fullText = `${title}\n\n${caption}\n\n${hashtags}`;
    if (typeof window !== 'undefined' && window.AndroidBridge?.shareContent) {
      window.AndroidBridge.shareContent(title, fullText, mediaUrl || 'https://ecreation.vercel.app');
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: fullText,
          url: mediaUrl || 'https://ecreation.vercel.app'
        });
        return;
      } catch {
        // cancelled
      }
    }
    try {
      await navigator.clipboard.writeText(fullText);
      setStatusBanner('Caption + Hashtags copied to clipboard — ready to paste into Instagram/YouTube/Facebook!');
    } catch {
      // ignore
    }
  };

  const connectedAccounts = accounts.filter((a) => a.is_connected);

  return (
    <div className="pt-6 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Google Flow Creative &amp; Video Auto-Publisher
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
              Social Promotion Studio
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Generate cinematic creatives/videos in Google Flow and auto-upload to your connected Instagram, YouTube, Facebook &amp; LinkedIn accounts.
            </p>
          </div>

          <Link href="/admin/settings">
            <Button size="sm" variant="outline" className="rounded-xl text-xs font-bold cursor-pointer">
              <Settings className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
              Manage Connected Accounts ({connectedAccounts.length})
            </Button>
          </Link>
        </div>

        {/* Warning if no accounts connected yet */}
        {connectedAccounts.length === 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Connect your Social Accounts first:</strong> Save your Instagram, YouTube, and Facebook accounts in Social Settings so auto-share works with 1 tap from Web &amp; Mobile App.
              </span>
            </div>
            <Link href="/admin/settings" className="shrink-0">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold cursor-pointer">
                Connect Accounts Now
              </Button>
            </Link>
          </div>
        )}

        {/* Quick Promo Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground mr-1">Quick Promo Templates:</span>
          {PROMO_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setTitle(p.title);
                setFlowPrompt(p.flowPrompt);
                setCaption(p.caption);
                setHashtags(p.hashtags);
              }}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-stone-900 border border-amber-500/40 hover:bg-amber-50 text-foreground cursor-pointer transition-colors"
            >
              <Wand2 className="w-3 h-3 inline mr-1 text-amber-600" />
              {p.label}
            </button>
          ))}
        </div>

        {/* Main Studio Grid */}
        <form onSubmit={handleAutoPublish} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 cols: Step 1 (Google Flow) & Step 2 (Attach Creative + Caption) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Google Flow Video/Creative Generator */}
            <div className="subsection-bordered-card bg-gradient-to-br from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950 p-5 sm:p-6 rounded-3xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-stone-950 text-amber-400 font-mono text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-base font-black text-stone-950">Create Video / Creative with Google Flow</h2>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-200">
                  Google Flow (Veo) Ready
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase text-stone-700 block">
                  Google Flow AI Video / Creative Prompt
                </label>
                <textarea
                  rows={3}
                  value={flowPrompt}
                  onChange={(e) => setFlowPrompt(e.target.value)}
                  className="w-full rounded-2xl border border-amber-500/35 bg-white p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  type="button"
                  onClick={handleOpenGoogleFlow}
                  className="rounded-xl bg-stone-950 hover:bg-stone-900 text-amber-300 border border-amber-500/50 text-xs font-black cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  Copy Prompt &amp; Open Google Flow
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(flowPrompt).catch(() => {});
                    setCopiedPrompt(true);
                    setTimeout(() => setCopiedPrompt(false), 3000);
                  }}
                  className="rounded-xl bg-white text-stone-900 text-xs font-bold cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                  {copiedPrompt ? 'Prompt Copied!' : 'Copy Prompt'}
                </Button>
              </div>
            </div>

            {/* Step 2: Attach Generated Video / Creative & Caption */}
            <div className="subsection-bordered-card bg-card p-5 sm:p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-stone-950 font-mono text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-black text-foreground">Attach Creative / Video &amp; Promo Copy</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Campaign Title *</label>
                  <Input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Custom ERP 25% OFF Reel"
                    className="rounded-xl text-xs h-10"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Format Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMediaType('video')}
                      className={`h-10 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                        mediaType === 'video'
                          ? 'bg-amber-500 text-stone-950 border-amber-500'
                          : 'bg-background text-muted-foreground border-border'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" /> Video / Reel
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaType('image')}
                      className={`h-10 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                        mediaType === 'image'
                          ? 'bg-amber-500 text-stone-950 border-amber-500'
                          : 'bg-background text-muted-foreground border-border'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" /> Creative Image
                    </button>
                  </div>
                </div>
              </div>

              {/* Media URL or Phone Gallery Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Public Video / Image URL (for API Auto-Upload)</label>
                  <Input
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://... (Google Drive / Cloudinary / S3 MP4 or JPG)"
                    className="rounded-xl text-xs h-10"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Or Pick from Phone / Computer</label>
                  <label className="h-10 px-3 rounded-xl border border-dashed border-amber-500/60 bg-amber-50/40 dark:bg-stone-900 flex items-center justify-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 cursor-pointer hover:bg-amber-50">
                    <Upload className="w-3.5 h-3.5" />
                    <span className="truncate">{localFileName || 'Upload Google Flow Video / Image'}</span>
                    <input type="file" accept="video/*,image/*" onChange={handleFileAttach} className="hidden" />
                  </label>
                </div>
              </div>

              {localPreviewUrl && (
                <div className="rounded-2xl overflow-hidden border border-border bg-black max-h-60 flex items-center justify-center">
                  {mediaType === 'video' ? (
                    <video src={localPreviewUrl} controls className="max-h-60 w-auto" />
                  ) : (
                    <img src={localPreviewUrl} alt="Creative preview" className="max-h-60 object-contain" />
                  )}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Post Caption *</label>
                <textarea
                  required
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Viral Hashtags</label>
                <Input
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="rounded-xl text-xs h-10 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Right 5 cols: Step 3 (Auto-Share Destinations & Publish) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="subsection-bordered-card bg-card p-5 sm:p-6 rounded-3xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-mono text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-base font-black text-foreground">Auto-Share Accounts</h2>
                </div>
                <Link href="/admin/settings" className="text-[11px] font-bold text-amber-700 hover:underline">
                  Edit Settings →
                </Link>
              </div>

              <div className="space-y-2.5">
                {accounts.map((acc) => {
                  const p = acc.platform as PlatformId;
                  const checked = selectedPlatforms.includes(p);
                  return (
                    <label
                      key={acc.platform}
                      className={`flex items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        checked
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500/60'
                          : 'bg-muted/30 border-border'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => togglePlatform(p)}
                          className="w-4 h-4 rounded accent-emerald-600"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-black text-foreground">{acc.display_name}</div>
                          <div className="text-[11px] text-muted-foreground truncate">
                            {acc.is_connected
                              ? acc.account_handle || acc.account_id || 'Connected'
                              : 'Not connected — configure in Settings'}
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`text-[10px] shrink-0 ${
                          acc.is_connected
                            ? 'bg-emerald-500/15 text-emerald-700 border-emerald-300'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {acc.is_connected ? 'Connected' : 'Setup'}
                      </Badge>
                    </label>
                  );
                })}
              </div>

              <div className="space-y-2.5 pt-2">
                <Button
                  type="submit"
                  disabled={publishing}
                  className="w-full h-11 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-black text-xs sm:text-sm shadow-lg cursor-pointer"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {publishing
                    ? 'Auto-Publishing to Connected Accounts...'
                    : `Auto-Upload & Share Now (${selectedPlatforms.length})`}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleNativeMobileShare}
                  className="w-full h-10 rounded-2xl border-emerald-500/50 text-emerald-800 dark:text-emerald-300 font-bold text-xs cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 mr-1.5" />
                  1-Tap Mobile Share (Insta / YouTube / FB App)
                </Button>
              </div>

              {statusBanner && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{statusBanner}</span>
                </div>
              )}

              {latestResults.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">
                    Live Auto-Publish Delivery Report
                  </span>
                  {latestResults.map((r) => (
                    <div key={r.platform} className="p-2.5 rounded-xl bg-muted/40 border border-border text-[11px] space-y-0.5">
                      <div className="flex items-center justify-between font-bold">
                        <span className="uppercase">{r.platform}</span>
                        <span
                          className={
                            r.status === 'published' || r.status === 'webhook_sent'
                              ? 'text-emerald-600'
                              : r.status === 'queued_mobile_share'
                              ? 'text-amber-700'
                              : 'text-red-600'
                          }
                        >
                          {r.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{r.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Published Campaign History */}
        <div className="subsection-bordered-card bg-card rounded-3xl p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-foreground flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-600" />
              Promotion Campaign History ({posts.length})
            </h2>
          </div>

          {posts.length === 0 ? (
            <p className="text-xs text-muted-foreground py-6 text-center">
              No social promotion campaigns published yet. Generate your first Google Flow video above and tap Auto-Upload!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post) => (
                <div key={post.id} className="p-4 rounded-2xl border border-border bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-amber-700">{post.id}</span>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {post.status}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{post.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{post.caption}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border text-[10px] font-mono">
                    <div className="flex flex-wrap gap-1">
                      {post.platforms.map((p) => (
                        <span key={p} className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-900 dark:text-amber-300 uppercase font-bold">
                          {p}
                        </span>
                      ))}
                    </div>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Code2,
  Search,
  Share2,
  TrendingUp,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BarChart3,
  Globe,
  Laptop,
  Smartphone,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Layers,
  Zap,
  Target,
  LineChart,
  Activity,
  Cpu,
  MousePointer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';

export interface ServiceSlide {
  id: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  metrics: { label: string; value: string; change: string }[];
  features: string[];
  ctaText: string;
  ctaHref: string;
  accentColor: string;
  accentBg: string;
  borderColor: string;
}

export const ServicesVideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);

  const slides: ServiceSlide[] = [
    {
      id: 'automation',
      category: 'Enterprise Automation',
      badge: 'Bespoke ERP & Office Software',
      title: 'Automated Office Workflows & ERP Softwares',
      subtitle:
        'Eliminate repetitive manual data entry, streamline invoice generation, synchronize multi-department inventory, and manage employee roles with custom cloud portals.',
      metrics: [
        { label: 'Manual Hours Saved', value: '84%', change: 'per department' },
        { label: 'Invoice Gen Speed', value: '<2.4s', change: 'instant dispatch' },
        { label: 'Uptime Reliability', value: '99.99%', change: 'Postgres RLS' }
      ],
      features: [
        'Automated Invoicing & GST-compliant billing engines',
        'Custom Role-Based Access Control (RBAC) & audit logs',
        'Multi-warehouse inventory synchronization in real time',
        'Biometric & HR attendance automated payroll workflows'
      ],
      ctaText: 'Explore ERP Solutions',
      ctaHref: '/services/enterprise-erp-crm',
      accentColor: 'text-blue-600 dark:text-blue-400',
      accentBg: 'bg-blue-50 dark:bg-blue-950/50',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 'webdev',
      category: 'Web Design & Engineering',
      badge: 'Next.js App Router & Ultra-Fast UI',
      title: 'High-Performance Website Design & Development',
      subtitle:
        'Bespoke, conversion-engineered web applications crafted with Next.js, TypeScript, and modern UI. Engineered for 60 FPS fluidity, fluid responsiveness, and top Core Web Vitals.',
      metrics: [
        { label: 'Google Lighthouse', value: '99/100', change: 'Performance & SEO' },
        { label: 'First Contentful Paint', value: '0.4s', change: 'instant edge delivery' },
        { label: 'Conversion Lift', value: '+68%', change: 'avg. client uplift' }
      ],
      features: [
        'Pixel-perfect bespoke design systems (no generic AI templates)',
        'Full responsive fidelity (Mobile, Tablet, Desktop, 4K Screens)',
        'Server-Side Rendering (SSR) & Edge API caching for lightning speed',
        'WCAG AAA accessible UI with micro-interactions & smooth transitions'
      ],
      ctaText: 'View Web Engineering',
      ctaHref: '/services/custom-software-engineering',
      accentColor: 'text-indigo-600 dark:text-indigo-400',
      accentBg: 'bg-indigo-50 dark:bg-indigo-950/50',
      borderColor: 'border-indigo-200 dark:border-indigo-800'
    },
    {
      id: 'seo',
      category: 'Search Engine Optimization',
      badge: 'Google #1 Page Dominance',
      title: 'Technical SEO & High-Intent Search Dominance',
      subtitle:
        'Dominate search engine rankings for commercial keywords. We implement deep technical audits, semantic Schema markup, high-velocity content architectures, and authoritative backlink strategies.',
      metrics: [
        { label: 'Organic Traffic Lift', value: '+340%', change: 'over 6 months' },
        { label: 'Page 1 Keywords', value: '1,200+', change: 'high commercial intent' },
        { label: 'Domain Authority', value: 'Top 5%', change: 'industry benchmark' }
      ],
      features: [
        'Advanced technical SEO: Core Web Vitals, crawl budget & canonicals',
        'JSON-LD Structured Data Schema (Organization, Service, FAQ, Article)',
        'High-intent commercial keyword clustering & competitor gap analysis',
        'Automated XML sitemap & search console indexing verification'
      ],
      ctaText: 'Discover Technical SEO',
      ctaHref: '/services/custom-software-engineering',
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/50',
      borderColor: 'border-emerald-200 dark:border-emerald-800'
    },
    {
      id: 'social',
      category: 'Social Media Growth',
      badge: 'Brand Authority & Engagement',
      title: 'Strategic Social Media Management & Viral Reach',
      subtitle:
        'Transform your brand presence on LinkedIn, Twitter/X, Instagram, and YouTube. We craft engaging technical thought-leadership content, data visuals, and community growth engines.',
      metrics: [
        { label: 'Monthly Impressions', value: '2.4M+', change: 'multi-platform' },
        { label: 'Engagement Rate', value: '8.4%', change: '4x industry standard' },
        { label: 'Lead Generation', value: '+145%', change: 'social inbound pipeline' }
      ],
      features: [
        'Multi-platform creative content calendars & visual identity branding',
        'Executive LinkedIn thought-leadership & B2B networking funnels',
        'Short-form motion graphics, technical infographics & reels',
        'Community moderation, sentiment analysis & active follower growth'
      ],
      ctaText: 'Explore Social Campaigns',
      ctaHref: '/services/custom-software-engineering',
      accentColor: 'text-cyan-600 dark:text-cyan-400',
      accentBg: 'bg-cyan-50 dark:bg-cyan-950/50',
      borderColor: 'border-cyan-200 dark:border-cyan-800'
    },
    {
      id: 'marketing',
      category: 'Performance Digital Marketing',
      badge: 'High-ROI Customer Acquisition',
      title: 'Digital Marketing & Conversion-Driven Funnels',
      subtitle:
        'Maximize your marketing budget with precision Google Ads, LinkedIn PPC campaigns, and conversion rate optimization (CRO) that turn clicks into high-value qualified client deals.',
      metrics: [
        { label: 'Target ROAS', value: '4.8x', change: 'verified campaign average' },
        { label: 'Cost Per Acquisition', value: '-42%', change: 'ad spend efficiency' },
        { label: 'Monthly Pipeline', value: '$3.2M', change: 'pipeline generated' }
      ],
      features: [
        'Google Search, Display & Performance Max ad campaign architecture',
        'Targeted B2B LinkedIn sponsored content & account-based marketing (ABM)',
        'Full-funnel conversion tracking with GA4, Google Tag Manager & Meta Pixel',
        'Landing page A/B testing & heat-mapping for continuous CRO uplift'
      ],
      ctaText: 'Start Marketing Campaign',
      ctaHref: '/contact#enquiry',
      accentColor: 'text-purple-600 dark:text-purple-400',
      accentBg: 'bg-purple-50 dark:bg-purple-950/50',
      borderColor: 'border-purple-200 dark:border-purple-800'
    }
  ];

  // Auto-slide ticker
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + 2; // ~5 seconds per slide (50 ticks * 100ms)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const selectSlide = (index: number) => {
    setCurrentSlide(index);
    setSlideProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setSlideProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setSlideProgress(0);
  };

  const active = slides[currentSlide];

  return (
    <section className="py-20 bg-slate-50/70 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 relative overflow-hidden" id="interactive-showcase">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800 text-xs font-bold text-amber-800 dark:text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Full-Stack Digital & Growth Powerhouse</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-3">
              Everything Your Business Needs to Grow Online
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Explore our synchronized ecosystem: from custom ERP automation and bespoke web development to SEO dominance, social media reach, and high-ROI digital marketing.
            </p>
          </FadeIn>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {slides.map((s, idx) => {
            const isSelected = currentSlide === idx;
            return (
              <button
                key={s.id}
                onClick={() => selectSlide(idx)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {idx === 0 && <Briefcase className="w-3.5 h-3.5 shrink-0" />}
                {idx === 1 && <Code2 className="w-3.5 h-3.5 shrink-0" />}
                {idx === 2 && <Search className="w-3.5 h-3.5 shrink-0" />}
                {idx === 3 && <Share2 className="w-3.5 h-3.5 shrink-0" />}
                {idx === 4 && <TrendingUp className="w-3.5 h-3.5 shrink-0" />}
                <span>{s.category}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Animated Video & Showcase Frame */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          {/* Top Player Window Bar with Telemetry & Controls */}
          <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md gap-3">
            <div className="flex items-center gap-3">
              {/* Window dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
              </div>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold hidden sm:inline">
                ecreation.solutions // {active.id}.stream
              </span>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-slate-500 hidden md:inline">
                SLIDE {currentSlide + 1} OF {slides.length}
              </span>

              <button
                onClick={prevSlide}
                className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors"
                aria-label="Previous service showcase"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors"
                aria-label={isPlaying ? 'Pause showcase slider' : 'Resume showcase slider'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={nextSlide}
                className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors"
                aria-label="Next service showcase"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thin Slide Progress Bar */}
          <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-100 ease-linear"
              style={{ width: `${slideProgress}%` }}
            />
          </div>

          {/* Slide Content: 2-Column Split */}
          <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${active.accentBg} ${active.accentColor} border ${active.borderColor}`}>
                  <Zap className="w-3.5 h-3.5" />
                  <span>{active.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {active.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {active.subtitle}
                </p>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {active.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700"
                  >
                    <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
                      {m.value}
                    </div>
                    <div className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                      {m.label}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {m.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-2">
                {active.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link href={active.ctaHref}>
                  <Button className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 rounded-xl font-bold px-6 py-5 text-xs sm:text-sm shadow-md shadow-amber-500/25 hover:scale-[1.02] transition-all">
                    {active.ctaText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact#enquiry">
                  <Button
                    variant="outline"
                    className="rounded-xl font-semibold border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm py-5 hover:bg-slate-50 hover:border-amber-400"
                  >
                    Request Custom Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Simulation Column (The "Video Animation Screen") */}
            <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-5 sm:p-7 border border-slate-800 text-white shadow-2xl relative min-h-[380px] flex flex-col justify-between overflow-hidden">
              {/* Screen Top Status */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400 font-bold">SIMULATED LIVE INTERFACE</span>
                </div>
                <span className="text-slate-400 text-[11px]">4K 60FPS ENGINE</span>
              </div>

              {/* Dynamic Animated UI Mockup by Slide Type */}
              <div className="py-6 my-auto">
                {/* 1. Office Automation Mockup */}
                {active.id === 'automation' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                          INV
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Invoice #EC-2026-891</div>
                          <div className="text-[10px] text-slate-400">Auto-Generated & Dispatched</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                        PAID $42,500
                      </span>
                    </div>

                    {/* Progress steps */}
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-emerald-400">
                        ✓ PO Approved
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-emerald-400">
                        ✓ Tax Calculated
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-blue-400 animate-pulse">
                        ⟳ Bank Synced
                      </div>
                    </div>

                    {/* Real-time event log */}
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-1">
                      <div className="text-slate-300 font-semibold text-[10px] uppercase">Automated Trigger Log:</div>
                      <div className="text-emerald-400">▶ Role RBAC: Director approved PO-9842</div>
                      <div className="text-cyan-400">▶ Inventory: Stock updated across 4 warehouses</div>
                      <div className="text-slate-500">▶ Telemetry: 0 manual touches required</div>
                    </div>
                  </div>
                )}

                {/* 2. Web Design & Dev Mockup */}
                {active.id === 'webdev' && (
                  <div className="space-y-4">
                    {/* Viewport bar */}
                    <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-3">
                        <Laptop className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-mono text-slate-300">Desktop · 1920x1080</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-slate-500" />
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                          100% RESPONSIVE
                        </span>
                      </div>
                    </div>

                    {/* Performance metrics dashboard */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <div className="text-xl font-black text-emerald-400">100</div>
                        <div className="text-[10px] text-slate-400 font-mono">Performance</div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <div className="text-xl font-black text-emerald-400">100</div>
                        <div className="text-[10px] text-slate-400 font-mono">Accessibility</div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <div className="text-xl font-black text-emerald-400">100</div>
                        <div className="text-[10px] text-slate-400 font-mono">Best Practices</div>
                      </div>
                    </div>

                    {/* Code animation snippet */}
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1">
                      <div className="text-indigo-400">export default async function Page() &#123;</div>
                      <div className="pl-4 text-emerald-400">const ui = await fetchEdgeOptimizedUI();</div>
                      <div className="pl-4 text-cyan-400">return &lt;FluidExperience data=&#123;ui&#125; /&gt;;</div>
                      <div className="text-indigo-400">&#125;</div>
                    </div>
                  </div>
                )}

                {/* 3. SEO Mockup */}
                {active.id === 'seo' && (
                  <div className="space-y-4">
                    {/* Simulated Google Search result */}
                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                        <span>https://ecreation.in › services › erp</span>
                        <span className="text-emerald-400 font-bold ml-auto">RANK #1</span>
                      </div>
                      <div className="text-xs font-bold text-blue-400 hover:underline">
                        Best Enterprise ERP Software Company 2026 | Ecreation IT Solution
                      </div>
                      <div className="text-[11px] text-slate-400 leading-tight">
                        Scalable ERP portals, custom software engineering, and cloud deployment with 99.99% uptime guarantees...
                      </div>
                    </div>

                    {/* Ranking curve */}
                    <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LineChart className="w-5 h-5 text-emerald-400" />
                        <div>
                          <div className="text-xs font-bold text-white">Keyword Positions</div>
                          <div className="text-[10px] text-slate-400">+1,420 Keywords in Top 3</div>
                        </div>
                      </div>
                      <div className="text-xs font-mono font-black text-emerald-400">
                        ▲ +340%
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400">#1 "Enterprise ERP"</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400">#1 "Custom SaaS Dev"</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400">#2 "Cloud Architecture"</span>
                    </div>
                  </div>
                )}

                {/* 4. Social Media Mockup */}
                {active.id === 'social' && (
                  <div className="space-y-4">
                    {/* Multi-channel bar */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400">LinkedIn</div>
                        <div className="text-sm font-bold text-blue-400">142K Reach</div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400">Twitter / X</div>
                        <div className="text-sm font-bold text-sky-400">89K Reach</div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400">Instagram</div>
                        <div className="text-sm font-bold text-pink-400">210K Views</div>
                      </div>
                    </div>

                    {/* Live engagement card */}
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-white">Viral Tech Carousel Campaign</span>
                        <span className="text-emerald-400 text-xs font-mono">8.4% ER</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="w-[84%] h-full bg-blue-600 rounded-full" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>4,820 Reposts</span>
                        <span>12,400 Saves</span>
                        <span>820 Inbound DMs</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400">
                      ⚡ Scheduled queue: 14 high-impact technical posts staged
                    </div>
                  </div>
                )}

                {/* 5. Digital Marketing Mockup */}
                {active.id === 'marketing' && (
                  <div className="space-y-4">
                    {/* Funnel overview */}
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-slate-400">Campaign ROAS</div>
                        <div className="text-2xl font-black text-emerald-400">4.8x Return</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono uppercase text-slate-400">Ad Spend Efficiency</div>
                        <div className="text-xs font-mono font-bold text-cyan-400">-42% CAC Reduced</div>
                      </div>
                    </div>

                    {/* Conversion stages */}
                    <div className="space-y-1.5 text-[11px] font-mono">
                      <div className="flex items-center justify-between bg-slate-900/70 p-2 rounded-lg border border-slate-800/80">
                        <span className="text-slate-300">Target Impressions</span>
                        <span className="text-white font-bold">1,480,000</span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-900/70 p-2 rounded-lg border border-slate-800/80">
                        <span className="text-slate-300">Qualified Clicks (4.2% CTR)</span>
                        <span className="text-cyan-400 font-bold">62,160</span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-900/70 p-2 rounded-lg border border-slate-800/80">
                        <span className="text-slate-300">Enterprise SQL Leads Generated</span>
                        <span className="text-emerald-400 font-bold">1,840 Leads</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-[11px] font-mono text-emerald-400 flex items-center gap-2">
                      <Target className="w-3.5 h-3.5" />
                      <span>Pipeline Revenue: $3,240,000 generated this quarter</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Screen Bottom Telemetry Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-blue-400" />
                  Latency: 18ms
                </span>
                <span>Active Engine: Next.js + Edge Cache</span>
                <span className="text-emerald-400">STATUS: HEALTHY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

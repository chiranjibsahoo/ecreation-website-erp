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
  Globe,
  Laptop,
  Smartphone,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  LineChart,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';

export interface ServiceSlide {
  id: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  metrics: { label: string; value: string; change: string }[];
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export const ServicesVideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);

  const slides: ServiceSlide[] = [
    {
      id: 'automation',
      category: 'Office Automation & ERP',
      badge: 'Bespoke ERP & Office Software',
      title: 'Automated Office Workflows, Billing & ERP Softwares',
      subtitle:
        'Eliminate repetitive manual data entry, streamline GST invoice generation, synchronize multi-department inventory, and manage employee roles with custom cloud portals.',
      imageSrc: '/images/showcase/erp-automation-showcase.jpg',
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
      ctaHref: '/services/enterprise-erp-crm'
    },
    {
      id: 'webdev',
      category: 'Website Design & Dev',
      badge: 'Next.js App Router & Ultra-Fast UI',
      title: 'High-Performance Website Design & Development',
      subtitle:
        'Bespoke, conversion-engineered corporate websites and E-commerce platforms crafted with Next.js and TypeScript. Engineered for 60 FPS fluidity and 100/100 Core Web Vitals.',
      imageSrc: '/images/showcase/web-design-showcase.jpg',
      metrics: [
        { label: 'Google Lighthouse', value: '100/100', change: 'Performance & SEO' },
        { label: 'First Contentful Paint', value: '0.4s', change: 'instant edge delivery' },
        { label: 'Conversion Lift', value: '+68%', change: 'avg. client uplift' }
      ],
      features: [
        'Pixel-perfect bespoke luxury design systems (no generic templates)',
        'Full responsive fidelity (Mobile, Tablet, Desktop, 4K Screens)',
        'Dynamic Admin CMS panel to update pages & blogs without code',
        'WCAG AAA accessible UI with micro-interactions & smooth transitions'
      ],
      ctaText: 'View Web Engineering',
      ctaHref: '/services/custom-software-engineering'
    },
    {
      id: 'seo',
      category: 'Google #1 SEO',
      badge: 'Google #1 Page Dominance',
      title: 'Technical SEO & High-Intent Search Dominance',
      subtitle:
        'Dominate Google search rankings for high-value commercial keywords. We implement deep technical audits, semantic Schema markup, and authoritative content strategies.',
      imageSrc: '/images/showcase/social-marketing-showcase.jpg',
      metrics: [
        { label: 'Organic Traffic Lift', value: '+340%', change: 'over 6 months' },
        { label: 'Page 1 Keywords', value: '1,200+', change: 'high commercial intent' },
        { label: 'Domain Authority', value: 'Top 5%', change: 'industry benchmark' }
      ],
      features: [
        'Advanced technical SEO: Core Web Vitals, crawl budget & canonicals',
        'JSON-LD Structured Data Schema (Organization, Service, FAQ, Article)',
        'High-intent commercial keyword clustering & competitor gap analysis',
        'Automated XML sitemap & Google Search Console verification'
      ],
      ctaText: 'Discover Technical SEO',
      ctaHref: '/contact#enquiry'
    },
    {
      id: 'social',
      category: 'Social Media Growth',
      badge: 'Brand Authority & Viral Reach',
      title: 'Strategic Social Media Management & Brand Creatives',
      subtitle:
        'Transform your brand presence across Instagram, LinkedIn, Facebook, and YouTube. We design luxury brand posts, viral reels, thought-leadership carousels, and community funnels.',
      imageSrc: '/images/showcase/mobile-app-showcase.jpg',
      metrics: [
        { label: 'Monthly Impressions', value: '2.4M+', change: 'multi-platform' },
        { label: 'Engagement Rate', value: '8.4%', change: '4x industry standard' },
        { label: 'Lead Generation', value: '+145%', change: 'social inbound pipeline' }
      ],
      features: [
        'Multi-platform creative content calendars & luxury visual branding',
        'Executive LinkedIn thought-leadership & B2B networking funnels',
        'Short-form motion graphics, product reels & interactive carousels',
        'Active audience growth, DM automation & lead capture'
      ],
      ctaText: 'Explore Social Campaigns',
      ctaHref: '/contact#enquiry'
    },
    {
      id: 'marketing',
      category: 'Digital Marketing & Ads',
      badge: 'High-ROI Customer Acquisition',
      title: 'Performance Digital Marketing & Lead Generation Funnels',
      subtitle:
        'Maximize your marketing ROI with precision Google Search Ads, Meta/Instagram campaigns, and high-converting landing pages that turn clicks into qualified business deals.',
      imageSrc: '/images/showcase/ai-workflow-showcase.jpg',
      metrics: [
        { label: 'Verified ROAS', value: '4.8x', change: 'campaign average' },
        { label: 'Cost Per Lead', value: '-42%', change: 'ad spend efficiency' },
        { label: 'Client Pipeline', value: '3.2x', change: 'qualified inquiries' }
      ],
      features: [
        'Google Search, Display & Performance Max ad campaign architecture',
        'Targeted B2B LinkedIn & Meta lead generation funnels',
        'Full-funnel conversion tracking with GA4, Tag Manager & Pixel',
        'Landing page A/B testing & conversion rate optimization (CRO)'
      ],
      ctaText: 'Start Marketing Campaign',
      ctaHref: '/contact#enquiry'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + 2;
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
    <section
      className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-stone-950 border-b border-stone-200/80 dark:border-stone-800 relative overflow-hidden"
      id="interactive-showcase"
    >
      {/* Subtle Warm Gold Glow (Zero Blue) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-300/80 dark:border-amber-800 text-xs font-bold text-amber-900 dark:text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Interactive Service Simulator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-white mt-2">
              How Our Solutions Power Your Business
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg">
              Switch between our core departments to see live operational workflows, deliverables, and verified client metrics.
            </p>
          </FadeIn>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {slides.map((s, idx) => {
            const isSelected = currentSlide === idx;
            return (
              <button
                key={s.id}
                onClick={() => selectSlide(idx)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-stone-950 text-white border-amber-500/60 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:text-stone-950 border-stone-200/90 dark:border-stone-800'
                }`}
              >
                {idx === 0 && <Briefcase className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />}
                {idx === 1 && <Code2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />}
                {idx === 2 && <Search className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />}
                {idx === 3 && <Share2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />}
                {idx === 4 && <TrendingUp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />}
                <span>{s.category}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Showcase Frame */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl shadow-xl overflow-hidden">
          {/* Top Window Bar */}
          <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-stone-100 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-950/90 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              </div>
              <span className="font-mono text-xs text-stone-500 dark:text-stone-400 font-semibold hidden sm:inline">
                ecreation.in // {active.id}-engine
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-stone-500 hidden md:inline">
                DEPARTMENT 0{currentSlide + 1} / 0{slides.length}
              </span>

              <button
                onClick={prevSlide}
                className="w-7 h-7 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 flex items-center justify-center text-stone-600 hover:text-amber-600 transition-colors"
                aria-label="Previous service showcase"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 flex items-center justify-center text-stone-600 hover:text-amber-600 transition-colors"
                aria-label={isPlaying ? 'Pause showcase slider' : 'Resume showcase slider'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={nextSlide}
                className="w-7 h-7 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 flex items-center justify-center text-stone-600 hover:text-amber-600 transition-colors"
                aria-label="Next service showcase"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slide Progress Bar */}
          <div className="w-full h-1 bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-100 ease-linear"
              style={{ width: `${slideProgress}%` }}
            />
          </div>

          {/* 2-Column Content */}
          <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-300/80 dark:border-amber-800">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>{active.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-stone-950 dark:text-white tracking-tight leading-tight">
                  {active.title}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
                  {active.subtitle}
                </p>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                {active.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700 flex sm:block items-center justify-between gap-2"
                  >
                    <div className="text-lg sm:text-2xl font-black text-amber-700 dark:text-amber-400 font-mono">
                      {m.value}
                    </div>
                    <div className="text-right sm:text-left">
                      <div className="text-[11px] font-bold text-stone-900 dark:text-white truncate">
                        {m.label}
                      </div>
                      <div className="text-[10px] text-stone-500 font-mono">
                        {m.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-1">
                {active.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link href={active.ctaHref}>
                  <Button className="bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/40 rounded-xl font-bold px-6 py-5 text-xs sm:text-sm shadow-md">
                    {active.ctaText}
                    <ArrowRight className="w-4 h-4 ml-2 text-amber-400" />
                  </Button>
                </Link>
                <Link href="/contact#enquiry">
                  <Button
                    variant="outline"
                    className="rounded-xl font-bold border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs sm:text-sm py-5 hover:bg-stone-100"
                  >
                    Request Custom Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual + Live Interface Column (Warm Obsidian & Gold, Zero Blue) */}
            <div className="lg:col-span-6 bg-stone-950 rounded-2xl p-4 sm:p-6 border border-stone-800 text-white shadow-2xl flex flex-col justify-between space-y-5 overflow-hidden">
              {/* Top Visual Preview Banner inside the Simulator */}
              <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden border border-stone-800">
                <img
                  src={active.imageSrc}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-950/85 border border-amber-500/40 text-[10px] font-mono text-amber-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>LIVE INTERFACE PREVIEW</span>
                </div>
              </div>

              {/* Dynamic Interactive Telemetry Widgets by Slide Type */}
              <div>
                {active.id === 'automation' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-stone-900 p-3 rounded-xl border border-stone-800">
                      <div>
                        <div className="text-xs font-bold text-white">GST Invoice #EC-2026-891</div>
                        <div className="text-[10px] text-stone-400">Auto-Generated &amp; Synced with Inventory</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-700/60 px-2.5 py-1 rounded">
                        PAID · ₹3,42,500
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                      <div className="bg-stone-900 p-2 rounded-lg border border-stone-800 text-amber-300">
                        ✓ PO Approved
                      </div>
                      <div className="bg-stone-900 p-2 rounded-lg border border-stone-800 text-amber-300">
                        ✓ GST Filed
                      </div>
                      <div className="bg-stone-900 p-2 rounded-lg border border-stone-800 text-emerald-400">
                        ✓ Stock Updated
                      </div>
                    </div>
                  </div>
                )}

                {active.id === 'webdev' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-stone-900 p-3 rounded-xl border border-stone-800">
                      <div className="flex items-center gap-2.5">
                        <Laptop className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-mono text-stone-200">Responsive 4K + Mobile UI</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700/60">
                        100/100 LIGHTHOUSE
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800">
                        <div className="text-lg font-black text-amber-400">100</div>
                        <div className="text-[10px] text-stone-400 font-mono">Performance</div>
                      </div>
                      <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800">
                        <div className="text-lg font-black text-amber-400">100</div>
                        <div className="text-[10px] text-stone-400 font-mono">Accessibility</div>
                      </div>
                      <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800">
                        <div className="text-lg font-black text-amber-400">100</div>
                        <div className="text-[10px] text-stone-400 font-mono">SEO Score</div>
                      </div>
                    </div>
                  </div>
                )}

                {active.id === 'seo' && (
                  <div className="space-y-3">
                    <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                        <Globe className="w-3.5 h-3.5 text-amber-400" />
                        <span>https://ecreation.in › enterprise-solutions</span>
                        <span className="text-amber-400 font-bold ml-auto">GOOGLE RANK #1</span>
                      </div>
                      <div className="text-xs font-bold text-white">
                        Best Enterprise ERP &amp; Website Development Company | Ecreation IT
                      </div>
                    </div>
                    <div className="p-2.5 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-between">
                      <span className="text-xs text-stone-300 font-medium">+1,420 Commercial Keywords in Top 3</span>
                      <span className="text-xs font-mono font-black text-amber-400">▲ +340% Traffic</span>
                    </div>
                  </div>
                )}

                {active.id === 'social' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 text-center">
                        <div className="text-[10px] font-mono text-stone-400">LinkedIn</div>
                        <div className="text-sm font-bold text-amber-400">142K Reach</div>
                      </div>
                      <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 text-center">
                        <div className="text-[10px] font-mono text-stone-400">Instagram</div>
                        <div className="text-sm font-bold text-amber-400">210K Views</div>
                      </div>
                      <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 text-center">
                        <div className="text-[10px] font-mono text-stone-400">YouTube</div>
                        <div className="text-sm font-bold text-amber-400">95K Watch</div>
                      </div>
                    </div>
                    <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                      <span className="text-stone-300">Inbound Social Leads</span>
                      <span className="font-mono font-bold text-amber-400">+145% Monthly Pipeline</span>
                    </div>
                  </div>
                )}

                {active.id === 'marketing' && (
                  <div className="space-y-3">
                    <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-stone-400">Verified Campaign ROAS</div>
                        <div className="text-xl font-black text-amber-400">4.8x Return on Ad Spend</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-stone-300">-42% Cost/Lead</span>
                    </div>
                    <div className="p-2.5 bg-stone-900 rounded-xl border border-stone-800 text-[11px] font-mono text-amber-300 flex items-center gap-2">
                      <Target className="w-3.5 h-3.5 text-amber-400" />
                      <span>Google Search + Meta Retargeting Active</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Telemetry */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  SLA: 99.99% Uptime
                </span>
                <span className="text-amber-400 font-semibold">ECREATION PRODUCTION ENGINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

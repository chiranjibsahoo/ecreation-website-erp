'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  Globe,
  Building2,
  TrendingUp,
  Bot,
  Layers,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface HeroShowcaseSlide {
  id: string;
  pillarNumber: string;
  tabTitle: string;
  badge: string;
  headline: string;
  highlightText: string;
  subheadline: string;
  deliverables: string[];
  imageSrc: string;
  videoSrc: string;
  posterSrc: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  liveCardTitle: string;
  liveCardSubtitle: string;
  liveCardBadge: string;
  metrics: { label: string; value: string }[];
}

export const FullscreenVideoHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVideoMode, setShowVideoMode] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const slides: HeroShowcaseSlide[] = [
    {
      id: 'web-development',
      pillarNumber: '01',
      tabTitle: 'Website Design & Dev',
      badge: 'Website Design & Custom Web Development',
      headline: 'World-Class Business Websites & ',
      highlightText: 'High-Converting Web Portals',
      subheadline:
        'We design and develop luxury corporate websites, custom E-commerce stores, and ultra-fast Next.js web applications that establish instant brand authority and turn visitors into paying clients.',
      deliverables: [
        'Bespoke Corporate & Brand Websites',
        'Custom E-Commerce & Payment Gateways',
        '100% Mobile Responsive & Ultra-Fast Load',
        'Admin CMS (Manage Content Without Code)'
      ],
      imageSrc: '/images/showcase/web-design-showcase.jpg',
      videoSrc: '/videos/hero/web-development.webm',
      posterSrc: '/images/hero/poster-web.svg',
      primaryCtaText: 'Start Website Project',
      primaryCtaHref: '/contact#enquiry',
      secondaryCtaText: 'Explore Web Portfolio',
      secondaryCtaHref: '/projects',
      liveCardTitle: 'Corporate & E-Commerce Suite',
      liveCardSubtitle: '0.4s Page Load · 100/100 Core Web Vitals',
      liveCardBadge: 'LIVE PREVIEW',
      metrics: [
        { label: 'Load Speed', value: '0.4s' },
        { label: 'Google Score', value: '100/100' },
        { label: 'Lead Conversion Lift', value: '+68%' }
      ]
    },
    {
      id: 'software-engineering',
      pillarNumber: '02',
      tabTitle: 'Office Automation & ERP',
      badge: 'Office Automation & Custom ERP Softwares',
      headline: 'Automate Your Entire Business With ',
      highlightText: 'Custom ERP & Billing Software',
      subheadline:
        'Replace messy spreadsheets and manual paperwork with custom-built Office Automation Software. Manage GST invoicing, multi-branch inventory, HR attendance, payroll, and client CRM from one secure dashboard.',
      deliverables: [
        'Automated Billing & GST Invoicing Software',
        'Multi-Warehouse Inventory & Stock Alerts',
        'HR Attendance, Biometric & Payroll System',
        'Role-Based Staff & Client Portal Access'
      ],
      imageSrc: '/images/showcase/erp-automation-showcase.jpg',
      videoSrc: '/videos/hero/software-engineering.webm',
      posterSrc: '/images/hero/poster-software.svg',
      primaryCtaText: 'Book Free ERP Demo',
      primaryCtaHref: '/contact#enquiry',
      secondaryCtaText: 'Explore ERP Solutions',
      secondaryCtaHref: '/services/enterprise-erp-crm',
      liveCardTitle: 'Enterprise ERP & GST Billing Hub',
      liveCardSubtitle: 'Automated Invoicing · Real-Time Inventory Sync',
      liveCardBadge: '84% TIME SAVED',
      metrics: [
        { label: 'Manual Work Cut', value: '84%' },
        { label: 'Data Security', value: 'Bank-Grade' },
        { label: 'System Uptime', value: '99.99%' }
      ]
    },
    {
      id: 'digital-marketing',
      pillarNumber: '03',
      tabTitle: 'SEO & Social Media',
      badge: 'Digital Marketing, Technical SEO & Social Media',
      headline: 'Rank #1 on Google & Dominate ',
      highlightText: 'Social Media & Lead Generation',
      subheadline:
        'Grow your customer pipeline with full-funnel Digital Marketing. From ranking #1 on Google Search (SEO) to complete Instagram, LinkedIn, and Facebook brand management, reels, and high-ROI paid ads.',
      deliverables: [
        'Google #1 Page Technical SEO Dominance',
        'Instagram, LinkedIn & Facebook Management',
        'High-ROI Google Ads & Meta Lead Funnels',
        'Brand Creatives, Reels & Ad Copywriting'
      ],
      imageSrc: '/images/showcase/social-marketing-showcase.jpg',
      videoSrc: '/videos/hero/digital-marketing.webm',
      posterSrc: '/images/hero/poster-marketing.svg',
      primaryCtaText: 'Get Free SEO & Growth Audit',
      primaryCtaHref: '/contact#enquiry',
      secondaryCtaText: 'See Marketing Results',
      secondaryCtaHref: '/#interactive-showcase',
      liveCardTitle: 'Omnichannel Growth & SEO Engine',
      liveCardSubtitle: 'Page #1 Google Rankings · 4.8x Ad Return',
      liveCardBadge: '+340% TRAFFIC',
      metrics: [
        { label: 'Organic Traffic', value: '+340%' },
        { label: 'Average Ad ROAS', value: '4.8x' },
        { label: 'Qualified Leads', value: '3.2x' }
      ]
    },
    {
      id: 'ai-technology',
      pillarNumber: '04',
      tabTitle: 'AI & Mobile Apps',
      badge: 'AI Workflow Automation & Mobile App Engineering',
      headline: '24/7 AI Sales Chatbots, Smart Workflows & ',
      highlightText: 'iOS / Android Mobile Apps',
      subheadline:
        'Deploy intelligent AI assistants on your website and WhatsApp to capture leads 24/7, automate repetitive office tasks, and launch sleek native iOS & Android mobile apps for your customers.',
      deliverables: [
        '24/7 AI Customer Support & WhatsApp Bots',
        'Native iOS & Android Mobile Applications',
        'Automated Lead Qualification & CRM Sync',
        'Smart OCR Document & Invoice Processing'
      ],
      imageSrc: '/images/showcase/ai-workflow-showcase.jpg',
      videoSrc: '/videos/hero/ai-neural-network.webm',
      posterSrc: '/images/hero/poster-ai.svg',
      primaryCtaText: 'Build AI / Mobile Solution',
      primaryCtaHref: '/contact#enquiry',
      secondaryCtaText: 'Calculate Project Cost',
      secondaryCtaHref: '/#estimator',
      liveCardTitle: 'Autonomous AI & Mobile Ecosystem',
      liveCardSubtitle: 'Instant Lead Response · iOS & Android Ready',
      liveCardBadge: '24/7 ACTIVE AI',
      metrics: [
        { label: 'Response Speed', value: '<2 Sec' },
        { label: 'App Store Rating', value: '4.9 ★' },
        { label: 'Cost Saved', value: '70%' }
      ]
    }
  ];

  const SLIDE_DURATION = 6500;
  const TICK_INTERVAL = 50;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + (TICK_INTERVAL / SLIDE_DURATION) * 100;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  useEffect(() => {
    if (!showVideoMode) return;
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentSlide) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [currentSlide, showVideoMode]);

  const selectSlide = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgress(0);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = nextMuted;
    });
  };

  const active = slides[currentSlide];

  return (
    <section
      id="hero"
      className="relative w-full bg-[#FAF8F5] dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 sm:pt-34 pb-14 sm:pb-18 overflow-hidden border-b border-stone-200/80 dark:border-stone-800"
      aria-label="Ecreation IT Solution Hero Showcase"
    >
      {/* Subtle Warm Architectural Grid & Champagne Gold Ambient Glow */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1c1917_1px,transparent_1px),linear-gradient(to_bottom,#1c1917_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-1/4 w-[650px] h-[400px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Main Split Hero Showcase FIRST (Directly below Header) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Executive Pitch & Clear Deliverables */}
          <div className="lg:col-span-6 space-y-6">
            {/* Active Category Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-600/30 text-amber-900 dark:text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{active.badge}</span>
            </div>

            {/* Display H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-stone-950 dark:text-white leading-[1.1]">
              {active.headline}
              <span className="text-amber-700 dark:text-amber-400 block mt-1">
                {active.highlightText}
              </span>
            </h1>

            {/* Plain-English Value Proposition */}
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {active.subheadline}
            </p>

            {/* 2x2 Deliverables Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {active.deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link href={active.primaryCtaHref} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-13 px-7 bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/50 font-bold rounded-xl shadow-lg shadow-stone-950/15 transition-all hover:scale-[1.02] text-sm sm:text-base"
                >
                  <span>{active.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-amber-400" />
                </Button>
              </Link>

              <Link href={active.secondaryCtaHref} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-13 px-6 rounded-xl font-bold border-stone-300 dark:border-stone-700 bg-white hover:bg-stone-100 text-stone-900 dark:bg-stone-900 dark:text-white text-sm sm:text-base transition-colors"
                >
                  <Layers className="w-4 h-4 mr-2 text-amber-700" />
                  {active.secondaryCtaText}
                </Button>
              </Link>
            </div>

            {/* Metrics & Special Launch Offer Strip */}
            <div className="pt-4 border-t border-stone-200/90 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6 sm:gap-8">
                {active.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-black text-stone-950 dark:text-white font-mono">
                      {m.value}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/#offers"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800 text-xs font-bold text-amber-900 dark:text-amber-300 hover:bg-amber-100 transition-colors"
              >
                <Tag className="w-3.5 h-3.5 text-amber-700" />
                <span>Flat 25% Launch Discount</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right Column: Luxury Interactive Image & Video Showcase Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-stone-950 p-2.5 sm:p-3.5 border border-stone-800 shadow-2xl shadow-stone-950/25 overflow-hidden">
              {/* Top Studio Browser Frame Bar */}
              <div className="flex items-center justify-between px-3.5 py-2.5 mb-2.5 rounded-2xl bg-stone-900/90 border border-stone-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="ml-2 font-mono text-[11px] text-stone-300 font-semibold truncate">
                    ecreation.in // {active.id}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowVideoMode(!showVideoMode)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors border ${
                      showVideoMode
                        ? 'bg-amber-500 text-stone-950 border-amber-400'
                        : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
                    }`}
                    title="Toggle between Studio Image Showcase and Motion Video"
                  >
                    {showVideoMode ? 'VIDEO ACTIVE' : 'STUDIO VISUAL'}
                  </button>

                  {showVideoMode && (
                    <button
                      onClick={toggleMute}
                      className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  )}

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
                    aria-label={isPlaying ? 'Pause slider' : 'Play slider'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                </div>
              </div>

              {/* Main Visual Viewport */}
              <div className="relative h-[360px] sm:h-[430px] w-full rounded-2xl overflow-hidden bg-stone-900">
                {slides.map((s, idx) => {
                  const isSelected = idx === currentSlide;
                  return (
                    <div
                      key={s.id}
                      className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                        isSelected
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-105 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={s.imageSrc}
                        alt={s.badge}
                        className="w-full h-full object-cover object-center"
                      />

                      {showVideoMode && (
                        <video
                          ref={(el) => {
                            videoRefs.current[idx] = el;
                          }}
                          src={s.videoSrc}
                          poster={s.imageSrc}
                          autoPlay
                          muted={isMuted}
                          loop
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                    </div>
                  );
                })}

                {/* Floating Live Telemetry / Outcome Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold text-white">
                        {active.liveCardTitle}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-stone-300">
                      {active.liveCardSubtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-mono font-black text-[11px]">
                      {active.liveCardBadge}
                    </span>
                    <button
                      onClick={prevSlide}
                      className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition-colors border border-stone-700"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition-colors border border-stone-700"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Bottom 4-Pillar Slider Section Buttons — Placed BELOW the Hero Slider as requested */}
        <div className="mt-10 pt-8 border-t border-stone-200/80 dark:border-stone-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {slides.map((s, idx) => {
              const isSelected = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => selectSlide(idx)}
                  className={`relative p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 border overflow-hidden group cursor-pointer ${
                    isSelected
                      ? 'bg-stone-950 text-white border-amber-500/80 shadow-xl shadow-stone-950/15 scale-[1.01]'
                      : 'bg-white/95 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-stone-800 hover:border-amber-500/40 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                        isSelected ? 'text-amber-400' : 'text-amber-700 dark:text-amber-500'
                      }`}
                    >
                      PILLAR {s.pillarNumber}
                    </span>
                    {idx === 0 && <Globe className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />}
                    {idx === 1 && <Building2 className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />}
                    {idx === 2 && <TrendingUp className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />}
                    {idx === 3 && <Bot className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />}
                  </div>

                  <div className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-stone-900 dark:text-white'}`}>
                    {s.tabTitle}
                  </div>

                  {/* Animated Progress Line */}
                  <div className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-full mt-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-75 ${
                        isSelected ? 'bg-amber-500' : 'bg-transparent'
                      }`}
                      style={{ width: isSelected ? `${progress}%` : '0%' }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

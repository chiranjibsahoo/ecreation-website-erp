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
  ShieldCheck,
  Zap,
  Volume2,
  VolumeX,
  Terminal,
  Activity,
  Layers,
  Cpu,
  Globe,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollDownIndicator } from '@/components/home/ScrollDownIndicator';

export interface VideoHeroSlide {
  id: string;
  badge: string;
  headline: string;
  highlightText: string;
  subheadline: string;
  videoSrc: string;
  posterSrc: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  metrics: { label: string; value: string }[];
  licenseTag: string;
}

export const FullscreenVideoHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const slides: VideoHeroSlide[] = [
    {
      id: 'ai-technology',
      badge: 'Autonomous AI & Neural Vectors',
      headline: 'Architecting Enterprise AI Systems & ',
      highlightText: 'Autonomous Workflow Engines',
      subheadline:
        'Deploy custom LLM agents, semantic vector databases, and real-time intelligence pipelines that eliminate operational friction and transform enterprise data into competitive dominance.',
      videoSrc: '/videos/hero/ai-neural-network.webm',
      posterSrc: '/images/hero/poster-ai.svg',
      primaryCtaText: 'Deploy AI Architecture',
      primaryCtaHref: '/services/ai-solutions-workflow-automation',
      secondaryCtaText: 'Explore Case Studies',
      secondaryCtaHref: '/projects',
      metrics: [
        { label: 'Pipeline Speed', value: '<18ms' },
        { label: 'Efficiency Gain', value: '+380%' },
        { label: 'Uptime SLA', value: '99.99%' }
      ],
      licenseTag: 'Creative Commons CC-BY-SA · Royalty-Free'
    },
    {
      id: 'software-engineering',
      badge: 'Mission-Critical Engineering',
      headline: 'Scalable Enterprise ERP Systems & ',
      highlightText: 'Custom Cloud Portals',
      subheadline:
        'Eliminate legacy system bottlenecks with bespoke ERP software. Synchronize multi-warehouse inventories, automated GST invoicing, and granular role-based security in one resilient stack.',
      videoSrc: '/videos/hero/software-engineering.webm',
      posterSrc: '/images/hero/poster-software.svg',
      primaryCtaText: 'Explore ERP Solutions',
      primaryCtaHref: '/services/enterprise-erp-crm',
      secondaryCtaText: 'Scope Estimator',
      secondaryCtaHref: '/#estimator',
      metrics: [
        { label: 'Manual Work Cut', value: '84%' },
        { label: 'Postgres RLS', value: 'SOC-2 Ready' },
        { label: 'Deployment', value: 'Zero Downtime' }
      ],
      licenseTag: 'Creative Commons Public Domain · Royalty-Free'
    },
    {
      id: 'web-development',
      badge: 'Next.js App Router Architecture',
      headline: 'High-Performance Web Platforms & ',
      highlightText: 'Conversion-Led Experiences',
      subheadline:
        'Engineered for 60 FPS fluidity with Next.js, TypeScript, and modern cloud primitives. Sub-second initial paints, 100/100 Core Web Vitals, and bespoke UI crafted without template shortcuts.',
      videoSrc: '/videos/hero/web-development.webm',
      posterSrc: '/images/hero/poster-web.svg',
      primaryCtaText: 'Start Web Engineering',
      primaryCtaHref: '/services/custom-software-engineering',
      secondaryCtaText: 'View Tech Stack',
      secondaryCtaHref: '/services',
      metrics: [
        { label: 'Edge First Paint', value: '0.4s' },
        { label: 'Lighthouse Score', value: '100/100' },
        { label: 'Avg. Conversion Lift', value: '+68%' }
      ],
      licenseTag: 'Creative Commons CC0 · Royalty-Free'
    },
    {
      id: 'digital-marketing',
      badge: 'High-Intent Revenue Generation',
      headline: 'Performance Digital Marketing & ',
      highlightText: 'Technical SEO Dominance',
      subheadline:
        'Transform online clicks into high-value B2B client contracts. Full-funnel precision Google Ads, account-based LinkedIn marketing, and algorithmic search optimization that scales predictable revenue.',
      videoSrc: '/videos/hero/digital-marketing.webm',
      posterSrc: '/images/hero/poster-marketing.svg',
      primaryCtaText: 'Scale Your Pipeline',
      primaryCtaHref: '/contact#enquiry',
      secondaryCtaText: 'Review Testimonials',
      secondaryCtaHref: '/#testimonials',
      metrics: [
        { label: 'Verified ROAS', value: '4.8x' },
        { label: 'Organic Traffic Lift', value: '+340%' },
        { label: 'Lead Velocity', value: '4hr SLA' }
      ],
      licenseTag: 'Creative Commons CC-BY · Royalty-Free'
    }
  ];

  // Auto-play timer for slide transition (6.5 seconds per slide)
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

  // Synchronize active video playback
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentSlide) {
        vid.currentTime = 0;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked by browser policy; poster image fallback remains active
          });
        }
      } else {
        vid.pause();
      }
    });
  }, [currentSlide]);

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
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-slate-950 text-white select-none pt-24 pb-8 sm:pb-12"
      aria-label="Full-Screen Video Hero"
    >
      {/* 1. Full-Bleed Continuous Autoplaying Video Slides */}
      <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden">
        {slides.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
              }`}
              style={{ transitionProperty: 'opacity, transform' }}
            >
              {/* Static Poster Fallback (Zero delay on slow connections) */}
              <img
                src={s.posterSrc}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center -z-10 pointer-events-none"
              />

              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={s.videoSrc}
                poster={s.posterSrc}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      {/* 2. Cinematic Dark Gradients & Film Tint Overlay (Ensures 100% WCAG Contrast) */}
      <div
        className="absolute inset-0 -z-10 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-slate-950/70 via-slate-950/85 to-slate-950/95 backdrop-blur-[1px]"
        aria-hidden="true"
      />
      {/* Subtle luxury golden lighting vignette */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-amber-500/10 via-yellow-500/5 to-amber-600/10 blur-[150px] rounded-full -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Main Center Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto z-10 flex flex-col justify-center py-6 sm:py-10">
        <div className="max-w-4xl space-y-6">
          {/* Top Golden Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/40 backdrop-blur-md shadow-lg shadow-amber-500/10 transition-all duration-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-300 tracking-wide uppercase">
              {active.badge}
            </span>
            <span className="text-amber-500/60">·</span>
            <span className="text-xs text-slate-300 flex items-center gap-1 font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              SLIDE 0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>

          {/* Display Headline with High-Contrast Typography */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] transition-all duration-500">
            {active.headline}
            <span className="text-amber-400 block sm:inline">
              {active.highlightText}
            </span>
          </h1>

          {/* Subheading Narrative */}
          <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl leading-relaxed font-normal transition-all duration-500">
            {active.subheadline}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link href={active.primaryCtaHref} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-13 px-8 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-bold rounded-xl shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02] text-sm sm:text-base"
              >
                {active.primaryCtaText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href={active.secondaryCtaHref} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-13 px-7 rounded-xl font-semibold border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 hover:border-amber-400/50 text-white text-sm sm:text-base backdrop-blur-md shadow-xs transition-colors"
              >
                <Terminal className="w-4 h-4 mr-2 text-amber-400" />
                {active.secondaryCtaText}
              </Button>
            </Link>

            {/* Sound Toggle & Play/Pause Controls */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:ml-2">
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-xl border border-slate-700/80 bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label={isMuted ? 'Unmute background video' : 'Mute background video'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-xl border border-slate-700/80 bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label={isPlaying ? 'Pause auto slideshow' : 'Play auto slideshow'}
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400" />}
              </button>
            </div>
          </div>

          {/* Real-Time Live Telemetry Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-10 border-t border-slate-800/80 max-w-2xl">
            {active.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                  {m.value}
                </span>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
            ))}
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-500 ml-auto self-end pb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{active.licenseTag}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Interactive Slider Carousel Dock (MediaBoom & GoPro inspired) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 pt-4">
        {/* Horizontal Navigation Tiles with Live Progress Bars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-4">
          {slides.map((s, idx) => {
            const isSelected = idx === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => selectSlide(idx)}
                className={`relative p-3.5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between overflow-hidden backdrop-blur-md ${
                  isSelected
                    ? 'bg-slate-900/90 border-amber-500/80 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
                aria-label={`Select slide 0${idx + 1}: ${s.badge}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    0{idx + 1}
                  </span>
                  {idx === 0 && <Cpu className="w-3.5 h-3.5 text-slate-400" />}
                  {idx === 1 && <Layers className="w-3.5 h-3.5 text-slate-400" />}
                  {idx === 2 && <Globe className="w-3.5 h-3.5 text-slate-400" />}
                  {idx === 3 && <TrendingUp className="w-3.5 h-3.5 text-slate-400" />}
                </div>

                <div className="text-xs font-bold text-white truncate">
                  {s.badge}
                </div>

                {/* Progress bar line */}
                <div className="w-full h-1 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-75 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                        : 'bg-transparent'
                    }`}
                    style={{ width: isSelected ? `${progress}%` : '0%' }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Bar: Prev/Next Arrows & Scroll Indicator */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-400 text-[11px] font-semibold px-2">
              0{currentSlide + 1} / 0{slides.length}
            </span>
            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Centered Scroll Down Indicator */}
          <div className="hidden sm:block">
            <ScrollDownIndicator targetId="tech-engine" label="Explore Architecture Engine" />
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="hidden md:inline">CONTINUOUS 4K STREAMING</span>
            <span>AUTOPLAY ON</span>
          </div>
        </div>
      </div>
    </section>
  );
};

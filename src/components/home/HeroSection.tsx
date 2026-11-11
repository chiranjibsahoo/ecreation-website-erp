'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Terminal, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';
import { TechVideoHeroAnimation } from '@/components/home/TechVideoHeroAnimation';
import { ScrollDownIndicator } from '@/components/home/ScrollDownIndicator';

export const HeroSection = () => {
  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-white dark:bg-slate-950">
      {/* Ambient background colorful glows & subtle tech grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f60a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60a_1px,transparent_1px)] bg-[size:32px_32px] -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/15 to-cyan-400/15 blur-[140px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[400px] h-[300px] bg-emerald-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 w-[400px] h-[300px] bg-purple-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Status Pill */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 shadow-xs mb-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                Enterprise Engineering & Cloud Delivery
              </span>
              <span className="text-blue-400">·</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Q4 Capacity Open
              </span>
            </div>
          </FadeIn>

          {/* Main Display Headline */}
          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Engineering Scalable Systems for{' '}
              <span className="text-blue-600 dark:text-blue-400">
                High-Growth Enterprises
              </span>
            </h1>
          </FadeIn>

          {/* Subtitle with clear value proposition */}
          <FadeIn delay={0.3}>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
              We architect and build bespoke ERP portals, mission-critical web applications, and intelligent cloud systems. Built with zero-compromise craft, rock-solid security, and transparent delivery.
            </p>
          </FadeIn>

          {/* Primary Action Buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <Link href="/contact#enquiry" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] text-base"
                >
                  Schedule Architecture Call
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-7 rounded-xl font-semibold border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-base shadow-xs"
                >
                  <Terminal className="w-4 h-4 mr-2 text-blue-600" />
                  Explore Case Studies
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Trust Guarantees */}
          <FadeIn delay={0.5}>
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800 max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">Production-Ready Codebase</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Enterprise Security & RLS</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="font-medium">99.99% Cloud SLA Target</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Technology Architecture Video / Interactive Demo Engine */}
        <div id="tech-engine" className="pt-10">
          <FadeIn delay={0.6}>
            <TechVideoHeroAnimation />
          </FadeIn>
        </div>

        {/* Scroll Down Indicator */}
        <ScrollDownIndicator targetId="services" label="Scroll to Explore Services" />
      </div>
    </section>
  );
};

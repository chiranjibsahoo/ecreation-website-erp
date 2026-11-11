'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Terminal, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-background">
      {/* Ambient background glow & grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[350px] h-[250px] bg-cyan-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Status Pill */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 shadow-xs mb-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                Enterprise Engineering & Cloud Delivery
              </span>
              <span className="text-indigo-400">·</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                Q4 Capacity Open
              </span>
            </div>
          </FadeIn>

          {/* Main Display Headline */}
          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
              Engineering Scalable Systems for{' '}
              <span className="text-blue-600 dark:text-blue-400">
                High-Growth Enterprises
              </span>
            </h1>
          </FadeIn>

          {/* Subtitle with clear value proposition */}
          <FadeIn delay={0.3}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We architect and build bespoke ERP portals, mission-critical web applications, and intelligent cloud systems. Built with zero-compromise craft, rock-solid security, and transparent delivery.
            </p>
          </FadeIn>

          {/* Primary Action Buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/25 transition-all text-base"
                >
                  Schedule Architecture Call
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-7 rounded-xl font-medium border-border hover:bg-muted/60 text-base"
                >
                  <Terminal className="w-4 h-4 mr-2 text-indigo-600" />
                  Explore Case Studies
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Trust Guarantees */}
          <FadeIn delay={0.5}>
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-muted-foreground border-t border-border/60 max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Production-Ready Codebase</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                <span>Enterprise Security & RLS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>99.99% Cloud SLA Target</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

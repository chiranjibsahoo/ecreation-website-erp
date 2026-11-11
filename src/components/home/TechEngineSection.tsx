'use client';

import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';
import { TechVideoHeroAnimation } from '@/components/home/TechVideoHeroAnimation';
import { FadeIn } from '@/components/animations/FadeIn';

export const TechEngineSection = () => {
  return (
    <section id="tech-engine" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-amber-500/40 text-xs font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Architecture Simulation</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-3">
              Real-Time Systems Engine & Cloud Telemetry
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Observe how Ecreation IT Solution orchestrates high-throughput ERP transactions, edge caching pipelines, and AI vector embeddings in production.
            </p>
          </FadeIn>
        </div>

        {/* The Interactive Telemetry Engine Box */}
        <FadeIn delay={0.2}>
          <TechVideoHeroAnimation />
        </FadeIn>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { TechVideoHeroAnimation } from '@/components/home/TechVideoHeroAnimation';
import { FadeIn } from '@/components/animations/FadeIn';

export const TechEngineSection = () => {
  return (
    <section id="tech-engine" className="py-20 bg-stone-950 text-white relative overflow-hidden border-t border-stone-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900 border border-amber-500/40 text-xs font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Enterprise Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-3">
              Engineered for Speed, Security &amp; Scale
            </h2>
            <p className="text-stone-400 text-base sm:text-lg">
              Observe how Ecreation IT Solution powers high-speed websites, automated ERP transactions, and AI workflows with 99.99% uptime.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <TechVideoHeroAnimation />
        </FadeIn>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { TechVideoHeroAnimation } from '@/components/home/TechVideoHeroAnimation';
import { FadeIn } from '@/components/animations/FadeIn';

export const TechEngineSection = () => {
  return (
    <section
      id="tech-engine"
      className="py-20 bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <FadeIn>
            <div className="subsection-bordered-item inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 text-xs font-bold text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Live Enterprise Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 mt-3">
              Engineered for Speed, Security &amp; Scale
            </h2>
            <p className="text-stone-700 text-base sm:text-lg font-medium">
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

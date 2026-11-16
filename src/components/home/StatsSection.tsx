import React from 'react';
import { COMPANY_INFO } from '@/lib/data/seedData';
import { FadeIn } from '@/components/animations/FadeIn';

export const StatsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] border-y border-amber-500/35 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {COMPANY_INFO.stats.map((stat, idx) => (
            <FadeIn key={stat.label} delay={idx * 0.08}>
              <div className="subsection-bordered-card rounded-2xl bg-white/85 p-5 sm:p-6 space-y-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-amber-700 block">
                  {stat.value}
                </span>
                <p className="text-xs sm:text-sm text-stone-700 font-bold">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

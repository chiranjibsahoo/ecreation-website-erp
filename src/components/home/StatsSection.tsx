import React from 'react';
import { COMPANY_INFO } from '@/lib/data/seedData';
import { FadeIn } from '@/components/animations/FadeIn';

export const StatsSection = () => {
  return (
    <section className="py-12 bg-neutral-900 border-y border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          {COMPANY_INFO.stats.map((stat, idx) => (
            <FadeIn key={stat.label} delay={idx * 0.1} className="pt-4 md:pt-0">
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-amber-400">
                  {stat.value}
                </span>
                <p className="text-xs sm:text-sm text-neutral-400 font-medium">
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


import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/data/seedData';
import { CardHover } from '@/components/animations/CardHover';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Case Studies & Client Work',
  description: 'Verified enterprise project case studies and software solutions delivered by Ecreation IT Solution.'
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 sm:pt-36 pb-20 sm:pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-200/80">
            Portfolio &amp; Impact
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 dark:text-white">
            Proven Engineering Engagements
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Real systems, real scale, and measurable ROI. Explore how our custom ERP, cloud, and web engineering architectures transformed our clients&apos; operations.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS_DATA.map((project) => (
            <CardHover
              key={project.id}
              className="subsection-bordered-card bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-500/35">
                    {project.category}
                  </span>
                  <span className="text-xs text-stone-500 font-mono">
                    {project.client}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-stone-950 dark:text-white">
                  {project.title}
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {project.summary}
                </p>

                {/* Measurable Results */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-4 border-t border-amber-500/25">
                  {project.results.map((res) => (
                    <div
                      key={res.label}
                      className="subsection-bordered-item p-3 rounded-xl bg-[#FAF8F5] dark:bg-stone-800/80"
                    >
                      <div className="text-base font-extrabold text-stone-950 dark:text-white flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                        <span>{res.metric}</span>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">{res.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-amber-500/25 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="subsection-bordered-item text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-stone-800 text-stone-800 dark:text-stone-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/projects/${project.slug}`}>
                  <Button variant="outline" size="sm" className="subsection-bordered-item rounded-xl text-xs">
                    Read Full Case Study
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </CardHover>
          ))}
        </div>
      </div>
    </div>
  );
}


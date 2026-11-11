import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/data/seedData';
import { CardHover } from '@/components/animations/CardHover';
import { FadeIn } from '@/components/animations/FadeIn';

export const CaseStudiesSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-200/80">
              Proven Delivery
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-3">
              Featured Case Studies & Work
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl mt-2">
              Explore how we have engineered scalable systems and transformed operational efficiency for global enterprises.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 dark:text-amber-400 group"
            >
              View All Client Engagements
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.slice(0, 3).map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.15}>
              <CardHover className="h-full bg-slate-50/70 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-400/60 rounded-2xl p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Highlight Metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                    {project.results.slice(0, 2).map((res) => (
                      <div key={res.label} className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 shadow-xs">
                        <div className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                          <span className="text-amber-700 dark:text-amber-400">{res.metric}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{res.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200/60 text-slate-600 dark:text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Read Study
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </CardHover>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

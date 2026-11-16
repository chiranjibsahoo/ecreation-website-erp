import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/data/seedData';
import { CardHover } from '@/components/animations/CardHover';
import { FadeIn } from '@/components/animations/FadeIn';

export const CaseStudiesSection = () => {
  const projectImages = [
    '/images/showcase/erp-automation-showcase.jpg',
    '/images/showcase/web-design-showcase.jpg',
    '/images/showcase/mobile-app-showcase.jpg'
  ];

  return (
    <section className="py-24 bg-white dark:bg-stone-950 border-t border-stone-200/80 dark:border-stone-800" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3.5 py-1 rounded-full border border-amber-300/80">
              Proven Client Delivery
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-white mt-3">
              Featured Case Studies &amp; Results
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg max-w-xl mt-2">
              See how Ecreation IT Solution has delivered custom websites, enterprise ERPs, and digital growth for leading companies.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-950 hover:text-amber-700 dark:text-amber-400 group"
            >
              View All Client Engagements
              <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.slice(0, 3).map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.12}>
              <CardHover className="group h-full bg-[#FAF8F5] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-amber-500/60 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300">
                <div>
                  {/* Project Visual Preview Image */}
                  <div className="relative h-52 w-full bg-stone-950 overflow-hidden border-b border-stone-200/60 dark:border-stone-800">
                    <img
                      src={project.image || projectImages[idx % projectImages.length]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-stone-950/85 px-2.5 py-1 rounded-md border border-stone-800">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-7 space-y-5">
                    <h3 className="text-xl font-black text-stone-950 dark:text-white leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Highlight Metrics */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200/80 dark:border-stone-800">
                      {project.results.slice(0, 2).map((res) => (
                        <div key={res.label} className="p-3 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700">
                          <div className="text-lg font-black text-stone-950 dark:text-white flex items-center gap-1.5 font-mono">
                            <TrendingUp className="w-4 h-4 text-amber-600" />
                            <span className="text-amber-700 dark:text-amber-400">{res.metric}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-tight">{res.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-7 py-4 bg-white dark:bg-stone-950/60 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200/80 text-stone-700 dark:text-stone-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-bold text-stone-950 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Case Study
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
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

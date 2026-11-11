import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/data/seedData';
import { CardHover } from '@/components/animations/CardHover';
import { FadeIn } from '@/components/animations/FadeIn';

export const CaseStudiesSection = () => {
  return (
    <section className="py-24 bg-background" id="case-studies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Proven Delivery
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-2">
              Featured Case Studies & Work
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mt-2">
              Explore how we have engineered scalable systems and transformed operational efficiency for global enterprises.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 group"
            >
              View All Client Engagements
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.slice(0, 3).map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.15}>
              <CardHover className="h-full bg-card border border-border rounded-2xl p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Highlight Metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                    {project.results.slice(0, 2).map((res) => (
                      <div key={res.label} className="p-3 rounded-xl bg-muted/40 border border-border/50">
                        <div className="text-lg font-extrabold text-foreground flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{res.metric}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{res.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-muted text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
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

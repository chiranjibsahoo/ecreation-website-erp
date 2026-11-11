import React from 'react';
import { Compass, Code, ShieldCheck, Rocket } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

export const ProcessWorkflow = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery & System Architecture',
      description: 'We analyze your business workflows, define database schemas, establish security boundaries, and deliver an interactive prototype before writing production code.',
      icon: Compass,
      tags: ['Domain Analysis', 'Schema Design', 'Architecture Plan']
    },
    {
      number: '02',
      title: 'Agile Engineering Sprints',
      description: 'Our senior developers write modular, type-safe Next.js and Supabase code in transparent bi-weekly sprints, providing continuous staging preview access.',
      icon: Code,
      tags: ['TypeScript', 'Supabase RLS', 'Sprint Demos']
    },
    {
      number: '03',
      title: 'Rigorous Verification & Security',
      description: 'Every interface and API undergoes automated regression tests, WCAG accessibility auditing, and vulnerability scans to guarantee enterprise durability.',
      icon: ShieldCheck,
      tags: ['OWASP Top 10', 'Performance Auditing', 'Zero-Bug Policy']
    },
    {
      number: '04',
      title: 'Global Deployment & 24/7 SLA',
      description: 'We orchestrate zero-downtime production launches with edge CDN caching, multi-region replication, continuous telemetry, and ongoing SLA maintenance.',
      icon: Rocket,
      tags: ['CI/CD Pipelines', 'Edge Routing', 'Ongoing SLA Support']
    }
  ];

  return (
    <section id="process" className="py-24 bg-slate-50/70 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200/60">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-3">
              Predictable, Transparent Delivery
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              No guesswork, no bloated meetings. A battle-tested engineering pipeline engineered for clarity, speed, and uncompromising quality.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.number} delay={idx * 0.15}>
                <div className="relative bg-card border border-border rounded-2xl p-7 shadow-xs h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black font-mono text-muted-foreground/30">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-border/60 flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-muted text-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

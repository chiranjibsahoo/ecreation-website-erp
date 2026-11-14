import React from 'react';
import { Database, Layers, Cpu, Cloud, Shield, Zap } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

export const TechStackBento = () => {
  return (
    <section className="py-24 bg-[#FAF8F5] dark:bg-stone-950 border-y border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3.5 py-1 rounded-full border border-amber-300/80">
              Technical Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-white mt-3">
              Modern Enterprise Technology Stack
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg">
              We build with production-hardened technologies that guarantee fast loading speeds, bank-grade security, and zero vendor lock-in.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <FadeIn className="md:col-span-2 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-8 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-stone-950 dark:text-white">Next.js App Router &amp; React Architecture</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Sub-second page transitions, dynamic server-side rendering, and instant edge streaming. Optimized for 100/100 Core Web Vitals and Google search ranking dominance.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Next.js 16', 'TypeScript', 'Tailwind CSS', 'React 19', 'Turbopack'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-[11px] font-mono font-semibold text-stone-800 dark:text-stone-200">
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="md:col-span-1 lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-8 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-stone-950 dark:text-white">PostgreSQL &amp; Supabase Cloud</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Relational data integrity, real-time synchronization, automated daily backups, and strict database Row-Level Security (RLS) protecting your company records.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['PostgreSQL', 'Supabase Auth', 'RLS Policies', 'pgvector', 'Cloud Storage'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-[11px] font-mono font-semibold text-stone-800 dark:text-stone-200">
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-6 rounded-3xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center">
              <Cloud className="w-4 h-4" />
            </div>
            <h4 className="text-base font-black text-stone-950 dark:text-white">Cloud Infrastructure</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Automated multi-region deployments on AWS &amp; Vercel with zero-downtime rollbacks and DDoS mitigation.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-6 rounded-3xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="text-base font-black text-stone-950 dark:text-white">Enterprise Security</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              OWASP Top 10 protection, encrypted secrets, Role-Based Access Control (RBAC), and complete audit trails.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-6 rounded-3xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-base font-black text-stone-950 dark:text-white">AI &amp; Automation</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              24/7 AI chatbots, WhatsApp lead routing, and smart OCR document pipelines integrated into your workflow.
            </p>
          </FadeIn>

          <FadeIn delay={0.5} className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-6 rounded-3xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-base font-black text-stone-950 dark:text-white">Performance SLA</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Sub-100ms API responses, global edge caching, and 99.99% uptime availability guarantees.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

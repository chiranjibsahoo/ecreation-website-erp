import React from 'react';
import { Database, Layers, Cpu, Cloud, Shield, Zap, Terminal, Lock } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

export const TechStackBento = () => {
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Technical Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-2">
              Modern Enterprise Technology Stack
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              We leverage production-hardened tools and cloud primitives that guarantee high availability, developer velocity, and zero vendor lock-in.
            </p>
          </FadeIn>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Bento Cell 1: Next.js & Frontend Edge */}
          <FadeIn className="md:col-span-2 bg-card border border-border p-8 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Next.js App Router & React Server Components</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sub-second page transitions, dynamic server-side rendering, and instant edge streaming. Optimized for 100/100 Core Web Vitals and search crawler indexing.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['TypeScript', 'Tailwind CSS v4', 'shadcn/ui', 'Turbopack', 'Motion'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-muted text-[11px] font-mono font-medium text-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Bento Cell 2: Supabase & Postgres */}
          <FadeIn delay={0.1} className="md:col-span-1 lg:col-span-2 bg-card border border-border p-8 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">PostgreSQL & Supabase Cloud</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Relational integrity, real-time WebSocket replication, automated backups, and strict database Row-Level Security (RLS) guaranteeing total multi-tenant tenant isolation.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['PostgreSQL', 'Supabase Auth', 'RLS Policies', 'pgvector', 'Storage'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-muted text-[11px] font-mono font-medium text-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Bento Cell 3: Cloud & DevOps */}
          <FadeIn delay={0.2} className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 flex items-center justify-center">
              <Cloud className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-foreground">Cloud Infrastructure</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automated multi-region deployments on AWS & Vercel with zero-downtime rollbacks and DDoS mitigation.
            </p>
          </FadeIn>

          {/* Bento Cell 4: Security & Zero Trust */}
          <FadeIn delay={0.3} className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-foreground">Enterprise Security</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              OWASP Top 10 mitigation, encrypted environment secrets, RBAC authentication, and full audit trails.
            </p>
          </FadeIn>

          {/* Bento Cell 5: AI & Automation */}
          <FadeIn delay={0.4} className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-foreground">AI Integration</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              RAG pipelines, custom domain embeddings, and real-time LLM agents directly embedded into business logic.
            </p>
          </FadeIn>

          {/* Bento Cell 6: Performance SLA */}
          <FadeIn delay={0.5} className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-foreground">Performance SLA</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sub-100ms API responses, client caching strategies, and 99.99% availability targets.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};


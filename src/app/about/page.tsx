import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Award, Users, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/seedData';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us | Ecreation IT Solution',
  description: 'Learn about Ecreation IT Solution, our engineering standards, company philosophy, and our team of senior software architects.'
};

export default function AboutPage() {
  const values = [
    {
      title: 'Architectural Integrity',
      description: 'We do not take shortcuts. We build maintainable, type-safe, and self-documenting codebases that scale cleanly across organizational growth.'
    },
    {
      title: 'Zero AI Slop',
      description: 'Every layout, interaction, and database query is crafted with deliberate intention, avoiding low-effort generative templates.'
    },
    {
      title: 'Transparent Collaboration',
      description: 'Clients receive live repository access, bi-weekly staging demos, and direct access to senior developers without administrative layers.'
    },
    {
      title: 'Security as a Default',
      description: 'From Row-Level Security (RLS) to encrypted secret vaults, enterprise defense-in-depth is woven into every tier of our development.'
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-200/80">
            About Ecreation IT Solution
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
            Bespoke Engineering for High-Growth Enterprises
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Founded with a conviction that enterprise software should be fast, secure, and intuitive, Ecreation IT Solution operates as a high-velocity engineering partner for ambitious companies worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="subsection-bordered-card grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950">
          {COMPANY_INFO.stats.map((s) => (
            <div key={s.label} className="subsection-bordered-item rounded-2xl bg-white/85 p-5 text-center space-y-1">
              <span className="text-3xl sm:text-5xl font-black text-amber-700 block">
                {s.value}
              </span>
              <p className="text-xs sm:text-sm text-stone-700 font-bold">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Our Core Engineering Values</h2>
            <p className="text-sm text-muted-foreground">The foundational principles that guide every pull request and architecture decision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border p-8 rounded-2xl shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-bold text-foreground">{v.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/20">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold">Partner with our engineering team</h3>
            <p className="text-indigo-100 text-sm">
              Discover how Ecreation IT Solution can streamline your operations and build high-performance software.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-neutral-100 font-bold rounded-xl shadow-md">
              Start Project Conversation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


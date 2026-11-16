import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, Award, Layers } from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/data/seedData';
import { Button } from '@/components/ui/button';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Client Portfolio & Proven Case Studies | Ecreation IT Solution',
  description: 'Explore verified production case studies delivered by Ecreation IT Solution: Study Tracker Lockon, NSFS Education ERP, Duragrit QR ERP, Insurance Tracker, Social Video App, and 50+ Games Suite.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 sm:pt-36 pb-20 sm:pb-28 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-300/80 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Proven Client Delivery &amp; Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-950 dark:text-white leading-tight">
            Engineered for Scale. <br className="hidden sm:inline" />
            <span className="text-amber-700 dark:text-amber-400">Delivered with Precision.</span>
          </h1>

          <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Explore our real-world enterprise engineering engagements across ERP systems, educational focus tools, industrial QR logistics, InsurTech portals, short-video platforms, and a 50+ games portfolio.
          </p>

          {/* Mini Trust Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono font-semibold text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Production Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>99.98% System Uptime SLA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Full IP &amp; Code Handover</span>
            </div>
          </div>
        </div>

        {/* Client Interactive Projects List with Filters & Screenshots */}
        <ProjectsClient projects={PROJECTS_DATA} />

        {/* Blue CTA Banner with Architectural Border */}
        <div className="subsection-bordered-card p-8 sm:p-12 rounded-3xl bg-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-600/25">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-200">
              CUSTOM ARCHITECTURE CONSULTATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to build your next mission-critical system?
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
              Connect with our principal architects to scope your software, mobile app, or enterprise ERP architecture with fixed-cost guarantees and strict SLA timelines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white hover:bg-stone-100 text-indigo-700 font-bold rounded-2xl px-6 py-6 text-sm shadow-xl transition-transform duration-200 hover:-translate-y-0.5"
              >
                Schedule Technical Discovery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

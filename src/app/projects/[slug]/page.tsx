import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp, 
  Target, 
  Award, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/data/seedData';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found | Ecreation IT Solution' };

  return {
    title: `${project.title} | Case Study & Architecture | Ecreation IT Solution`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.summary,
      images: [project.image || '/images/showcase/erp-automation-showcase.jpg']
    }
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Back Link */}
        <Link
          href="/projects"
          className="subsection-bordered-item inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-stone-900 text-xs font-bold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-amber-600" />
          Back to all portfolio case studies
        </Link>

        {/* Header Title Card */}
        <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-7 sm:p-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-md border border-amber-500/35">
              {project.category}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono font-bold">
              Client: {project.client}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* High-Fidelity UI Screenshot Showcase Frame */}
        {project.image && (
          <div className="subsection-bordered-card bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30">
            {/* macOS Chrome Header Bar */}
            <div className="px-5 py-3.5 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-stone-400 hidden sm:inline">
                  {project.client} • Live Production Architecture
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-400 bg-stone-800/80 px-2.5 py-0.5 rounded-md border border-stone-700">
                100% Production Verified
              </span>
            </div>

            {/* Main Screenshot Visual */}
            <div className="relative aspect-[16/10] w-full bg-stone-950">
              <img
                src={project.image}
                alt={`${project.title} Screenshot Preview`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        )}

        {/* Quantifiable Results Banner */}
        <div className="subsection-bordered-card grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900">
          {project.results.map((r) => (
            <div key={r.label} className="subsection-bordered-item p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-stone-800/70 space-y-1.5">
              <div className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-white flex items-center gap-1.5 font-mono">
                <TrendingUp className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-amber-700 dark:text-amber-400">{r.metric}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium leading-snug">
                {r.label}
              </p>
            </div>
          ))}
        </div>

        {/* Case Study Narrative: Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="subsection-bordered-card p-7 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 space-y-3">
            <div className="flex items-center gap-2 text-amber-600 pb-2 border-b border-amber-500/25">
              <Target className="w-5 h-5" />
              <h2 className="text-xl font-bold text-stone-950 dark:text-white">The Operational Challenge</h2>
            </div>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="subsection-bordered-card p-7 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 pb-2 border-b border-amber-500/25">
              <Award className="w-5 h-5" />
              <h2 className="text-xl font-bold text-stone-950 dark:text-white">The Architectural Solution</h2>
            </div>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Deliverables & System Features */}
        {project.deliverables && (
          <div className="subsection-bordered-card p-7 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 space-y-5">
            <div className="flex items-center gap-2 text-stone-950 dark:text-white pb-3 border-b border-amber-500/25">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold">Included Deliverables &amp; System Modules</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="subsection-bordered-item p-4 rounded-xl bg-[#FAF8F5] dark:bg-stone-800/80 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Architecture & Engineering Primitives */}
        {project.architecture && (
          <div className="subsection-bordered-card p-7 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 space-y-5">
            <div className="flex items-center gap-2 text-stone-950 dark:text-white pb-3 border-b border-amber-500/25">
              <Cpu className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold">Engineering Primitives &amp; Data Pipeline</h2>
            </div>
            <div className="space-y-3">
              {project.architecture.map((arch, aIdx) => (
                <div key={aIdx} className="subsection-bordered-item p-4 rounded-xl bg-[#FAF8F5] dark:bg-stone-800/80 flex items-start gap-3">
                  <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 shrink-0">
                    0{aIdx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    {arch}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Used */}
        <div className="subsection-bordered-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 space-y-4">
          <div className="flex items-center gap-2 text-stone-900 dark:text-white">
            <Layers className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">
              Core Production Stack Deployed:
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="subsection-bordered-item px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-stone-800 text-xs font-mono font-semibold text-stone-900 dark:text-stone-200 border border-stone-200 dark:border-stone-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Blue CTA Callout Banner */}
        <div className="subsection-bordered-card p-8 sm:p-10 rounded-3xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/25">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Have a similar technical challenge?</h3>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
              Connect directly with our lead solutions architect to scope deliverables, timeline commitments, and fixed-cost milestones.
            </p>
          </div>
          <Link href="/contact" className="shrink-0">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-stone-100 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-transform duration-200 hover:-translate-y-0.5">
              Request Project Proposal
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

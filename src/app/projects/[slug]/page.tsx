import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, TrendingUp, CheckCircle, Target, Award } from 'lucide-react';
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
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Ecreation IT Solution Case Study`,
      description: project.summary
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/projects"
          className="subsection-bordered-item inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-900 text-xs font-bold text-stone-700 dark:text-stone-300"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-amber-600" />
          Back to all case studies
        </Link>

        {/* Header Sub-Card */}
        <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-7 sm:p-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-md border border-amber-500/35">
              {project.category}
            </span>
            <span className="text-xs text-stone-500 font-mono">
              Client: {project.client}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 dark:text-white leading-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Quantifiable Results Banner */}
        <div className="subsection-bordered-card grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900">
          {project.results.map((r) => (
            <div key={r.label} className="subsection-bordered-item p-4 rounded-2xl bg-[#FAF8F5] dark:bg-stone-800/70 space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-white flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                <span>{r.metric}</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">{r.label}</p>
            </div>
          ))}
        </div>

        {/* Case Study Narrative: Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="subsection-bordered-card p-7 rounded-3xl bg-white dark:bg-stone-900 space-y-3">
            <div className="flex items-center gap-2 text-amber-600 pb-2 border-b border-amber-500/25">
              <Target className="w-5 h-5" />
              <h2 className="text-xl font-bold text-stone-950 dark:text-white">The Operational Challenge</h2>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="subsection-bordered-card p-7 rounded-3xl bg-white dark:bg-stone-900 space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 pb-2 border-b border-amber-500/25">
              <Award className="w-5 h-5" />
              <h2 className="text-xl font-bold text-stone-950 dark:text-white">The Architectural Solution</h2>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Tech Stack Used */}
        <div className="subsection-bordered-card p-6 sm:p-7 rounded-3xl bg-white dark:bg-stone-900 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white block">
            Core Technologies Deployed:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="subsection-bordered-item px-3 py-1 rounded-lg bg-[#FAF8F5] dark:bg-stone-800 text-xs font-mono font-semibold text-stone-900 dark:text-stone-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Next Steps CTA — Blue with Border */}
        <div className="subsection-bordered-card p-8 rounded-3xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/20">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">Have a similar enterprise challenge?</h3>
            <p className="text-xs text-indigo-100">
              Schedule a technical discovery session to discuss system scope.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-neutral-100 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-transform duration-200 hover:-translate-y-0.5">
              Schedule Architecture Call
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


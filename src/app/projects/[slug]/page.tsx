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
    <div className="pt-28 pb-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all case studies
        </Link>

        {/* Header */}
        <div className="space-y-4 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-md">
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              Client: {project.client}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Quantifiable Results Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 sm:p-8 rounded-2xl bg-muted/40 border border-border">
          {project.results.map((r) => (
            <div key={r.label} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <span>{r.metric}</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">{r.label}</p>
            </div>
          ))}
        </div>

        {/* Case Study Narrative: Challenge & Solution */}
        <div className="space-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-600">
              <Target className="w-5 h-5" />
              <h2 className="text-2xl font-bold text-foreground">The Operational Challenge</h2>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <Award className="w-5 h-5" />
              <h2 className="text-2xl font-bold text-foreground">The Architectural Solution</h2>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Tech Stack Used */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground block">
              Core Technologies Deployed:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-md bg-muted text-xs font-mono font-medium text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Next Steps CTA */}
        <div className="p-8 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold">Have a similar enterprise challenge?</h3>
            <p className="text-xs text-neutral-400">
              Schedule a technical discovery session to discuss system scope.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs sm:text-sm">
              Schedule Architecture Call
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

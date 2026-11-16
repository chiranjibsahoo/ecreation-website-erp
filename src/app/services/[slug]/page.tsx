import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/data/seedData';
import { Button } from '@/components/ui/button';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} | Ecreation IT Solution`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Ecreation IT Solution`,
      description: service.shortDescription
    }
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <SchemaMarkup type="Service" data={service as unknown as Record<string, unknown>} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/services"
          className="subsection-bordered-item inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-900 text-xs font-bold text-stone-700 dark:text-stone-300"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-amber-600" />
          Back to all services
        </Link>

        {/* Hero Section Sub-Card */}
        <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-7 sm:p-10 space-y-4">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-md border border-indigo-200/80">
            {service.category} Service Specification
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 dark:text-white">
            {service.title}
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
            {service.fullDescription}
          </p>
        </div>

        {/* Main Grid: Features and Deliverables Sub-Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Capabilities & Architecture */}
          <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-7 sm:p-8 space-y-6">
            <div className="flex items-center gap-2.5 pb-3 border-b border-amber-500/25">
              <Cpu className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-stone-950 dark:text-white">Capabilities &amp; Architecture</h2>
            </div>
            <ul className="space-y-3">
              {service.features.map((feat) => (
                <li
                  key={feat}
                  className="subsection-bordered-item flex items-start gap-3 text-sm text-stone-700 dark:text-stone-300 p-3 rounded-xl bg-[#FAF8F5] dark:bg-stone-800/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables & Guarantees */}
          <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-7 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-amber-500/25">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-stone-950 dark:text-white">Deliverables &amp; Guarantees</h2>
              </div>
              <ul className="space-y-3">
                {service.deliverables.map((del) => (
                  <li
                    key={del}
                    className="subsection-bordered-item flex items-start gap-3 text-sm text-stone-700 dark:text-stone-300 p-3 rounded-xl bg-[#FAF8F5] dark:bg-stone-800/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-5 border-t border-amber-500/25">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-2.5">
                Technology Primitives:
              </span>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="subsection-bordered-item px-3 py-1 rounded-lg bg-[#FAF8F5] dark:bg-stone-800 text-xs font-mono font-semibold text-stone-900 dark:text-stone-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Callout Sub-Section — Restored Blue (bg-indigo-600) with Border */}
        <div className="subsection-bordered-card p-8 sm:p-10 rounded-3xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/20">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Ready to implement this service?</h3>
            <p className="text-indigo-100 text-sm">
              Connect directly with our lead solutions architect to scope deliverables and timelines.
            </p>
          </div>
          <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-neutral-100 font-bold rounded-xl shadow-md transition-transform duration-200 hover:-translate-y-0.5">
              Request Project Proposal
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


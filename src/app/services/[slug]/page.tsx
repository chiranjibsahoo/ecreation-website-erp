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
    <div className="pt-28 pb-24 bg-background">
      <SchemaMarkup type="Service" data={service as unknown as Record<string, unknown>} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all services
        </Link>

        {/* Hero Section */}
        <div className="space-y-4 border-b border-border pb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-md">
            {service.category} Service Specification
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            {service.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {service.fullDescription}
          </p>
        </div>

        {/* Main Grid: Features and Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Features */}
          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-foreground">Capabilities & Architecture</h2>
            </div>
            <ul className="space-y-3">
              {service.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-foreground">Deliverables & Guarantees</h2>
            </div>
            <ul className="space-y-3">
              {service.deliverables.map((del) => (
                <li key={del} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                Technology Primitives:
              </span>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-muted text-xs font-mono font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="p-8 sm:p-10 rounded-2xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/20">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Ready to implement this service?</h3>
            <p className="text-indigo-100 text-sm">
              Connect directly with our lead solutions architect to scope deliverables and timelines.
            </p>
          </div>
          <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-neutral-100 font-bold rounded-xl shadow-md">
              Request Project Proposal
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

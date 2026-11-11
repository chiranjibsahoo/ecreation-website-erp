import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/data/seedData';
import { CardHover } from '@/components/animations/CardHover';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Engineering & Software Services',
  description: 'Explore the full spectrum of software engineering, ERP solutions, cloud DevOps, and AI automation delivered by Ecreation IT Solution.'
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            What We Engineer
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
            Enterprise Digital Services
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From high-throughput cloud architectures to custom enterprise ERP solutions, our engineering practices deliver measurable business outcomes.
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service) => (
            <CardHover
              key={service.id}
              className="bg-card border border-border p-8 rounded-2xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md">
                    {service.category}
                  </span>
                  <div className="flex gap-1.5 font-mono text-[11px] text-muted-foreground">
                    {service.techStack.slice(0, 2).join(' · ')}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-foreground">
                  {service.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.fullDescription}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground block">
                    Core Capabilities:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <Link href={`/services/${service.slug}`}>
                  <Button variant="outline" size="sm" className="rounded-xl text-xs">
                    View Specifications & Scope
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
                <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs">
                    Inquire
                  </Button>
                </Link>
              </div>
            </CardHover>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold">Have unique architecture requirements?</h3>
            <p className="text-sm text-neutral-400">
              Our principal engineers regularly handle custom protocols, legacy migrations, and proprietary integrations.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold px-6">
              <Terminal className="w-4 h-4 mr-2" />
              Discuss Custom Architecture
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

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
    <div className="pt-32 sm:pt-36 pb-20 sm:pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-200/80">
            What We Engineer
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 dark:text-white">
            Enterprise Digital Services
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            From high-throughput cloud architectures to custom enterprise ERP solutions, our engineering practices deliver measurable business outcomes.
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service) => (
            <CardHover
              key={service.id}
              className="subsection-bordered-card bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-500/35">
                    {service.category}
                  </span>
                  <div className="flex gap-1.5 font-mono text-[11px] text-stone-500">
                    {service.techStack.slice(0, 2).join(' · ')}
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-stone-950 dark:text-white">
                  {service.title}
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {service.fullDescription}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-amber-500/25">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white block">
                    Core Capabilities:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {service.features.map((feat) => (
                      <div
                        key={feat}
                        className="subsection-bordered-item flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300 p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-stone-800/60"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-amber-500/25 flex flex-wrap items-center justify-between gap-3">
                <Link href={`/services/${service.slug}`}>
                  <Button variant="outline" size="sm" className="subsection-bordered-item rounded-xl text-xs">
                    View Specifications &amp; Scope
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
                <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
                  <Button size="sm" className="bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/50 rounded-xl text-xs transition-transform duration-200 hover:-translate-y-0.5">
                    Inquire Now
                  </Button>
                </Link>
              </div>
            </CardHover>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="subsection-bordered-card p-6 sm:p-12 rounded-3xl bg-stone-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Have unique architecture requirements?</h3>
            <p className="text-sm text-stone-400">
              Our principal engineers regularly handle custom protocols, legacy migrations, and proprietary integrations.
            </p>
          </div>
          <Link href="/contact#enquiry">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl px-6 shadow-md shadow-amber-500/20">
              <Terminal className="w-4 h-4 mr-2" />
              Discuss Custom Architecture
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


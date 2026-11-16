import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/seedData';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Disclaimer | Ecreation IT Solution',
  description: 'Corporate, technical, and project estimation disclaimer for Ecreation IT Solution.'
};

export default function DisclaimerPage() {
  const sections = [
    {
      title: '1. General Information & Project Estimates',
      content:
        'The information, interactive cost estimators, and timeline calculators provided on the Ecreation IT Solution website are intended for general planning and preliminary budgeting purposes. Final project pricing and sprint schedules are confirmed in a formal written Statement of Work (SOW) after a complimentary technical discovery session with our Solutions Architects.'
    },
    {
      title: '2. Case Studies, SEO Rankings & Growth Metrics',
      content:
        'Case study metrics displayed on our website reflect verified historical outcomes achieved for specific enterprise clients. While our engineering and digital growth teams apply the same battle-tested methodologies to every engagement, search engine ranking timelines and ad conversion rates may vary depending on industry competition, market conditions, and ad spend.'
    },
    {
      title: '3. Third-Party Platforms & Trademarks',
      content:
        'References to third-party technologies, frameworks, or cloud providers (such as Next.js, React, AWS, Google Cloud, Supabase, Vercel, Razorpay, or Stripe) are for technical specification purposes only. All respective trademarks belong to their rightful owners.'
    }
  ];

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Card */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-7 sm:p-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Corporate &amp; Technical Notice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950">
            Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 font-medium">
            Effective Date: November 2026 · Ecreation IT Solution ({COMPANY_INFO.email})
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-5">
          {sections.map((sec) => (
            <div
              key={sec.title}
              className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-7 space-y-2.5"
            >
              <h2 className="text-lg sm:text-xl font-bold text-stone-950 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{sec.title}</span>
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Related Policies Footer */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-stone-950 flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>Related Legal &amp; Compliance Documents</span>
            </h3>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs font-bold text-amber-800">
              <Link href="/terms" className="underline hover:text-stone-950">Terms &amp; Conditions</Link>
              <span>•</span>
              <Link href="/privacy-policy" className="underline hover:text-stone-950">Privacy Policy</Link>
              <span>•</span>
              <Link href="/refund-policy" className="underline hover:text-stone-950">Refund Policy</Link>
              <span>•</span>
              <Link href="/cookie-policy" className="underline hover:text-stone-950">Cookie Policy</Link>
            </div>
          </div>

          <Link href="/contact#enquiry">
            <Button className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs px-5 h-10 shrink-0">
              Ask a Question
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

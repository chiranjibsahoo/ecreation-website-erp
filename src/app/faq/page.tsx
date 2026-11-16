import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'FAQs & Help Center | Ecreation IT Solution',
  description: 'Frequently asked questions about Website Design, Custom ERP Software, Pricing, 25% Special Offer, Delivery Timelines, and 1-Year Free Support.'
};

export default function FaqPage() {
  const faqs = [
    {
      q: 'What is included in the Flat 25% Special Business Offer (Code: ECREATION25)?',
      a: 'Every new project booked under our Special Business Offer receives an instant 25% discount on development fees, plus 1-Year Free Cloud Hosting, Free Enterprise SSL, Free Custom Domain Registration (.com/.in), and 1-Year Complimentary Technical Support.'
    },
    {
      q: 'How long does it take to design and launch a website or custom ERP?',
      a: 'Corporate & Brand Websites typically launch within 1 to 2 weeks. Custom E-Commerce stores and client portals take 3 to 5 weeks, while multi-module Office Automation & Enterprise ERP suites take 4 to 8 weeks with weekly live staging demos.'
    },
    {
      q: 'Will we own 100% of the source code and database after completion?',
      a: 'Yes! Upon final milestone completion, 100% ownership of the custom source code, GitHub repository, UI assets, and database schema transfers to your company with zero vendor lock-in.'
    },
    {
      q: 'How do your payment milestones work?',
      a: 'We follow transparent milestone-based sprint billing: Milestone 1 covers Architecture Blueprint & UI/UX Prototype sign-off; Milestone 2 covers Core Staging Build & Module Review; and Milestone 3 covers Final QA Testing, Cloud Launch & Team Training.'
    },
    {
      q: 'Can you migrate data from our old website, Tally, or Excel spreadsheets into the new ERP?',
      a: 'Absolutely. Our engineers handle complete, zero-data-loss migration from Excel sheets, Tally, legacy PHP/WordPress databases, or older CRM tools into your new cloud ERP and website.'
    },
    {
      q: 'What happens after the website or ERP software goes live?',
      a: 'Every project includes 1 Full Year of Free Technical Support & Maintenance backed by our 99.99% Uptime SLA. We handle security updates, automated backups, bug fixes, and staff training.'
    }
  ];

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Card */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-7 sm:p-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Client Help Center</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 font-medium">
            Everything you need to know about our engineering process, pricing, timelines, and guarantees.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-7 space-y-2"
            >
              <h2 className="text-base sm:text-lg font-bold text-stone-950 dark:text-white flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span>{item.q}</span>
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed pl-6">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-stone-950 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Still have a specific technical question?</span>
            </h3>
            <p className="text-xs text-stone-700 font-medium">
              Ask our 24/7 AI Consultant in the bottom-right corner or schedule a free discovery call.
            </p>
          </div>

          <Link href="/contact#enquiry">
            <Button className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs px-5 h-10 shrink-0">
              Book Free Consultation
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

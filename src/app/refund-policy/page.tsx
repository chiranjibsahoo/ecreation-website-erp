import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CreditCard, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/seedData';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Ecreation IT Solution',
  description: 'Transparent milestone billing, project cancellation, and refund policy for Ecreation IT Solution.'
};

export default function RefundPolicyPage() {
  const sections = [
    {
      title: '1. Transparent Milestone-Based Billing',
      content:
        'At Ecreation IT Solution, we protect our clients from risk by dividing every software, ERP, website, and mobile app project into clear, verifiable delivery milestones (1. Architecture & UI Prototype, 2. Core Staging Build, and 3. Final QA & Production Deployment). You only approve and pay for the next stage after reviewing real progress.'
    },
    {
      title: '2. Project Cancellation & Pre-Kickoff Refunds',
      content:
        'If a client requests cancellation in writing within 48 hours of initial kickoff payment—and before architecture blueprint or custom UI/UX design work has commenced—100% of the initial deposit (minus standard payment gateway processing charges, if any) is eligible for a full refund.'
    },
    {
      title: '3. Milestone Refunds During Active Sprints',
      content:
        'Once a project milestone has been formally reviewed, approved, and signed off by the client, payments for that completed milestone are non-refundable, as dedicated engineering hours and cloud resources have been allocated. If a project is cancelled mid-sprint, any unutilized balance for future unstarted milestones is refunded within 7–10 business days, and all work completed up to that date is handed over.'
    },
    {
      title: '4. Third-Party Licenses, Domains & Cloud Hosting',
      content:
        'Costs incurred for third-party services purchased specifically on behalf of the client—such as custom domain names (.com/.in), dedicated cloud servers, paid third-party APIs, or app store developer accounts—are governed by the respective third-party provider’s refund policies, though full account ownership is transferred to the client.'
    },
    {
      title: '5. How to Request a Cancellation or Billing Review',
      content:
        'To request a billing review, scope adjustment, or cancellation, please email our accounts and project management desk at contact@ecreation.in with your Project Reference ID. Every request is acknowledged within 4 business hours and resolved within 5–7 working days.'
    }
  ];

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Card */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-7 sm:p-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            <CreditCard className="w-3.5 h-3.5 text-amber-600" />
            <span>Client Billing Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 font-medium">
            Effective Date: November 2026 · Accounts &amp; Billing Desk: {COMPANY_INFO.email}
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
              <Link href="/cookie-policy" className="underline hover:text-stone-950">Cookie Policy</Link>
              <span>•</span>
              <Link href="/sla-security" className="underline hover:text-stone-950">SLA &amp; Security</Link>
            </div>
          </div>

          <Link href="/contact#enquiry">
            <Button className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs px-5 h-10 shrink-0">
              Contact Billing Support
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/seedData';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Cookie Policy | Ecreation IT Solution',
  description: 'Learn how Ecreation IT Solution uses cookies and local storage to deliver a fast, secure browsing experience.'
};

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      title: '1. Essential & Security Cookies (Strictly Necessary)',
      content:
        'These cookies and session tokens are required for core website functionality, including CSRF protection, Admin ERP authentication guards (ecreation_admin_auth), and storing your Cookie Consent decision (ecreation_cookie_consent). They do not track you across external websites.'
    },
    {
      title: '2. Functional & Experience Preferences',
      content:
        'We use lightweight browser storage to remember your visual preferences (such as the Gold Gradient theme toggle), active 24/7 AI Consultant chat session IDs (so you do not lose your conversation while navigating between pages), and whether you have already seen or claimed the 25% Special Business Offer popup.'
    },
    {
      title: '3. Performance & Analytics Telemetry',
      content:
        'When enabled via our Cookie Consent banner, anonymized performance metrics help us monitor Core Web Vitals, page load latency, and popular service sections so we can continuously improve site speed across mobile and desktop devices.'
    },
    {
      title: '4. Managing or Withdrawing Your Cookie Consent',
      content:
        'You can accept all cookies, restrict to essential cookies only, or customize your preferences using our bottom Cookie Consent banner. You may also clear cookies at any time via your browser settings to re-open the consent prompt.'
    }
  ];

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Card */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-7 sm:p-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            <Cookie className="w-3.5 h-3.5 text-amber-600" />
            <span>Transparency &amp; Browser Storage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950">
            Cookie Policy
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 font-medium">
            Last Updated: November 2026 · Ecreation IT Solution ({COMPANY_INFO.email})
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-5">
          {cookieTypes.map((sec) => (
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
              <Link href="/privacy-policy" className="underline hover:text-stone-950">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="underline hover:text-stone-950">Terms &amp; Conditions</Link>
              <span>•</span>
              <Link href="/refund-policy" className="underline hover:text-stone-950">Refund Policy</Link>
              <span>•</span>
              <Link href="/sla-security" className="underline hover:text-stone-950">SLA &amp; Security</Link>
            </div>
          </div>

          <Link href="/privacy-policy">
            <Button className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs px-5 h-10 shrink-0">
              View Privacy Policy
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

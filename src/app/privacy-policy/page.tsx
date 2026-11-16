import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/seedData';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ecreation IT Solution',
  description: 'Privacy Policy, DPDP & GDPR compliance, and enterprise data governance standards of Ecreation IT Solution.'
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: '1. Introduction & Data Governance Commitment',
      content:
        'Ecreation IT Solution ("we", "our", or "us") is committed to protecting the privacy, confidentiality, and security of all personal and corporate information shared with us through our website, Quick Enquiry forms, Exit-Intent / VIP Offer popups, and the 24/7 Ecreation AI Consultant.'
    },
    {
      title: '2. Information We Collect',
      content:
        'We only collect information that you voluntarily provide to request a project demo, quotation, or consultation: (a) Business contact details including your Name, Official Email ID, Mobile/Phone Number, and Company Name; (b) Project scope, selected service category, and estimated budget; and (c) Chat messages exchanged with our AI Consultant to help our Solutions Architects prepare your technical proposal.'
    },
    {
      title: '3. How We Use & Protect Your Information',
      content:
        'All submitted enquiries and chat logs are stored in encrypted databases protected by strict Row-Level Security (RLS) and server-side authentication guards. We never sell, rent, trade, or share your contact details or business requirements with third-party marketers. Your details are used solely by our internal engineering and consulting team to respond to your request.'
    },
    {
      title: '4. GDPR & Indian DPDP Act Compliance',
      content:
        'In accordance with the Digital Personal Data Protection (DPDP) Act and international GDPR standards, you have the right to access, update, export, or request permanent deletion of your personal data at any time by emailing our Data Protection Officer at contact@ecreation.in.'
    },
    {
      title: '5. Cookies & Session Storage',
      content:
        'We use minimal first-party cookies and browser storage to remember your cookie consent preferences, theme settings, and active chat session ID. You can customize or revoke non-essential cookies at any time via our Cookie Policy page.'
    }
  ];

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Card */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-7 sm:p-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Compliance &amp; Data Governance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 font-medium">
            Last Updated: November 2026 · Data Protection Officer: {COMPANY_INFO.email}
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
              <span>Explore All Legal &amp; Policy Pages</span>
            </h3>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs font-bold text-amber-800">
              <Link href="/terms" className="underline hover:text-stone-950">Terms &amp; Conditions</Link>
              <span>•</span>
              <Link href="/refund-policy" className="underline hover:text-stone-950">Refund Policy</Link>
              <span>•</span>
              <Link href="/cookie-policy" className="underline hover:text-stone-950">Cookie Policy</Link>
              <span>•</span>
              <Link href="/sla-security" className="underline hover:text-stone-950">SLA &amp; Security</Link>
            </div>
          </div>

          <a href={`mailto:${COMPANY_INFO.email}?subject=Privacy%20Data%20Request`}>
            <Button className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs px-5 h-10 shrink-0">
              Email Privacy Officer
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

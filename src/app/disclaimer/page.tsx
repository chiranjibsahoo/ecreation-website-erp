import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, ShieldCheck, ArrowRight, FileWarning, Cookie } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/seedData';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Disclaimer, Copyright & Intellectual Property Notice | Ecreation IT Solution',
  description:
    'Official legal disclaimer, original content & media copyright statement, DMCA good-faith takedown policy, cookie consent, and technical notice for Ecreation IT Solution.'
};

export default function DisclaimerPage() {
  const sections = [
    {
      title: '1. Original Content, Images, Videos, JavaScript & Source Code',
      content:
        'All text copy, UI architecture, SVG illustrations, visual showcase graphics, promotional videos, JavaScript/TypeScript source code, CSS stylesheets, and interactive software components published on Ecreation IT Solution are either original bespoke works created in-house by our engineering and design teams, custom-generated visual assets, or open-source libraries used strictly under their respective permissive licenses (such as MIT and Apache 2.0). We do not knowingly copy, scrape, or republish any third-party copyrighted content, images, videos, or proprietary code.'
    },
    {
      title: '2. Zero Copyright Infringement, Fair Use & Good-Faith Takedown Policy (DMCA Safe Harbor)',
      content:
        'Ecreation IT Solution fully respects global intellectual property and copyright laws. All visual previews, architectural mockups, and demonstrative portfolio screens are original illustrative works produced for showcasing our engineering capabilities. If any individual, brand, or rights holder believes in good faith that any text, image, video, icon, script, or code snippet on this website inadvertently resembles or overlaps with their protected intellectual property, please notify us directly at contact@ecreation.in with the exact page URL and proof of ownership. Upon receipt of a valid notice, we commit to reviewing and promptly removing, replacing, or attributing the material within 48 business hours in complete good faith, without requiring formal legal escalation or complaint.'
    },
    {
      title: '3. Third-Party Trademarks & Technical References',
      content:
        'Any mention of third-party platforms, frameworks, or cloud infrastructure providers (such as Next.js, React, Node.js, PostgreSQL, Supabase, AWS, Google Cloud, Vercel, Stripe, or Razorpay) is made strictly for nominative technical specification and compatibility purposes. All product names, logos, and trademarks remain the sole property of their respective owners, and their mention does not imply endorsement or affiliation.'
    },
    {
      title: '4. User Data Privacy, Cookies & Explicit Consent',
      content:
        'We respect every visitor’s privacy and comply with modern data-protection principles (including GDPR and India’s Digital Personal Data Protection Act, 2023). Essential and optional analytics/offer cookies are governed by our interactive Cookie Consent Banner, allowing visitors to accept, customize, or restrict cookies to Essential Only at any time. Personal contact details submitted through our enquiry forms are used exclusively to respond to your requested project consultation and are never sold or shared with unauthorized third parties.'
    },
    {
      title: '5. General Information, Project Estimates & Case Study Metrics',
      content:
        'Interactive cost estimators, timeline calculators, and case study metrics displayed on this website are provided for preliminary planning and represent verified historical client engagements. Final project pricing, deliverables, and SLA commitments are confirmed in a formal written Statement of Work (SOW) following a technical discovery session. Search engine rankings, digital marketing ROI, and ad conversion metrics vary based on industry competition, budget, and market dynamics.'
    },
    {
      title: '6. Anti-Spam & Genuine Enquiry Protection',
      content:
        'To protect our engineering team and ensure rapid response times for genuine businesses, all enquiry forms on this website are protected by automated anti-spam verification, disposable-email filtering, rate limiting, and bot-detection mechanisms. Automated spam, abusive submissions, or fraudulent enquiries are automatically blocked.'
    }
  ];

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Card */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-7 sm:p-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Legal, Copyright &amp; Compliance Notice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950">
            Disclaimer &amp; Copyright Policy
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

        {/* Copyright / Good-Faith Resolution Box */}
        <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-amber-500">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-stone-950 dark:text-white flex items-center gap-2">
              <FileWarning className="w-4 h-4 text-amber-600" />
              <span>Copyright &amp; Good-Faith Takedown Desk</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              For any intellectual property inquiry, attribution request, or good-faith removal notice, email{' '}
              <a href={`mailto:${COMPANY_INFO.email}`} className="font-bold text-amber-700 underline">
                {COMPANY_INFO.email}
              </a>{' '}
              for guaranteed review and resolution within 48 hours.
            </p>
          </div>
          <Link href="/cookie-policy" className="shrink-0">
            <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold">
              <Cookie className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
              Cookie Consent Policy
            </Button>
          </Link>
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
              <span>•</span>
              <Link href="/sla-security" className="underline hover:text-stone-950">SLA &amp; Security</Link>
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

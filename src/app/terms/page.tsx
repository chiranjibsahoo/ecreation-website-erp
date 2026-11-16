import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldCheck, Scale, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/seedData';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Ecreation IT Solution',
  description: 'Terms of Service, Master Services Agreement standards, IP ownership, and commercial engagement policies for Ecreation IT Solution.'
};

export default function TermsPage() {
  const sections = [
    {
      title: '1. Scope of Services & Engagement Principles',
      content:
        'By accessing the website of Ecreation IT Solution or submitting a project enquiry, you agree to these Terms & Conditions. All Website Design, Custom ERP/CRM Software, Mobile App Engineering, AI Automation, Cloud DevOps, and Digital Marketing engagements are governed by a mutually signed Statement of Work (SOW) or Master Services Agreement (MSA) detailing exact deliverables, sprint timelines, and milestone pricing.'
    },
    {
      title: '2. 100% Intellectual Property & Source Code Ownership',
      content:
        'Upon completion and final milestone settlement in accordance with the agreed SOW, 100% ownership of bespoke source code, GitHub repositories, custom UI/UX assets, and database schemas transfers in full to the client. Ecreation IT Solution retains zero lock-in rights over your custom business logic or proprietary company data.'
    },
    {
      title: '3. Milestone Billing, Taxes & Promotional Offers',
      content:
        'Projects are billed transparently across agreed delivery milestones (e.g., Architecture & UI Sign-off, Core Staging Build, and Final Production Launch). All invoices are GST-compliant. Promotional offers such as the Flat 25% Special Business Offer (Code: ECREATION25) and complimentary 1-Year Cloud Hosting/SSL apply to new qualifying project engagements confirmed within the offer validity window.'
    },
    {
      title: '4. 1-Year Free Support, Warranties & SLA',
      content:
        'Every custom website, ERP, and software platform delivered by Ecreation IT Solution includes 12 months of complimentary technical support covering bug fixes, security patches, and 99.99% cloud uptime monitoring. Enhancements or new feature modules requested outside the original SOW are scoped transparently as add-on sprints.'
    },
    {
      title: '5. Confidentiality & Mutual NDA',
      content:
        'Both parties agree to maintain strict confidentiality regarding proprietary business processes, trade secrets, customer databases, and credentials shared during discovery and execution. We execute a formal Mutual Non-Disclosure Agreement (NDA) prior to accessing any internal client systems.'
    },
    {
      title: '6. Governing Law & Jurisdiction',
      content:
        'These Terms & Conditions are governed by and construed in accordance with the laws of India, with exclusive jurisdiction in the courts of Noida / Gautam Buddha Nagar, Uttar Pradesh, subject to any international arbitration clauses specified in a client MSA.'
    }
  ];

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Card */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-7 sm:p-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            <span>Legal &amp; Commercial Standards</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950">
            Terms &amp; Conditions
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

        {/* Related Policies Navigation */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-stone-950 flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>Related Legal &amp; Compliance Documents</span>
            </h3>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs font-bold text-amber-800">
              <Link href="/privacy-policy" className="underline hover:text-stone-950">Privacy Policy</Link>
              <span>•</span>
              <Link href="/refund-policy" className="underline hover:text-stone-950">Refund &amp; Cancellation Policy</Link>
              <span>•</span>
              <Link href="/cookie-policy" className="underline hover:text-stone-950">Cookie Policy</Link>
              <span>•</span>
              <Link href="/sla-security" className="underline hover:text-stone-950">SLA &amp; Security</Link>
            </div>
          </div>

          <Link href="/contact#enquiry">
            <Button className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs px-5 h-10 shrink-0">
              Contact Legal Desk
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

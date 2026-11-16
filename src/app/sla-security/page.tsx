import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Server, Lock, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/seedData';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'SLA & Security Compliance | Ecreation IT Solution',
  description: '99.99% Cloud Uptime SLA, 1-Year Free Maintenance, Incident Response Timelines, and OWASP/RLS Security Compliance at Ecreation IT Solution.'
};

export default function SlaSecurityPage() {
  const slaTiers = [
    {
      level: 'Priority 1 (Critical Outage)',
      response: '< 30 Minutes',
      resolution: '1 – 2 Hours',
      desc: 'Production website, payment gateway, or core ERP database unreachable.'
    },
    {
      level: 'Priority 2 (Major Module Issue)',
      response: '< 2 Hours',
      resolution: '4 – 8 Hours',
      desc: 'Specific ERP workflow, invoice generation, or API integration degraded.'
    },
    {
      level: 'Priority 3 (Standard Support / UI)',
      response: '< 4 Business Hours',
      resolution: '24 Hours',
      desc: 'Minor UI adjustments, content updates, report formatting, or staff queries.'
    }
  ];

  const securityPillars = [
    {
      title: '99.99% Uptime Service Level Agreement (SLA)',
      content:
        'All cloud-hosted websites, E-Commerce stores, and enterprise ERP systems deployed by Ecreation IT Solution are backed by multi-region edge caching, automated health checks, and a 99.99% availability guarantee.'
    },
    {
      title: '1-Year Complimentary Support & Maintenance',
      content:
        'Every new project delivery includes 12 months of free technical support covering bug resolution, security dependency patches, SSL certificate renewals, and automated daily database backups.'
    },
    {
      title: 'Row-Level Security (RLS) & OWASP Top-10 Hardening',
      content:
        'Our PostgreSQL and Supabase backends enforce strict Row-Level Security (RLS), role-based access control (RBAC), parameterized queries against SQL injection, CSRF/XSS protection, and 256-bit TLS encryption in transit and at rest.'
    }
  ];

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Card */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] p-7 sm:p-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>99.99% Uptime &amp; Enterprise Security</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950">
            SLA &amp; Security Compliance
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 font-medium">
            Service Level Agreement &amp; Cyber Security Standards · {COMPANY_INFO.email}
          </p>
        </div>

        {/* Incident Response Matrix */}
        <div className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 border-b border-amber-500/25 pb-3">
            <Clock className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold text-stone-950 dark:text-white">
              Guaranteed Incident Response &amp; Resolution Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slaTiers.map((tier) => (
              <div
                key={tier.level}
                className="subsection-bordered-item rounded-2xl bg-[#FAF8F5] dark:bg-stone-800/70 p-4 space-y-2"
              >
                <span className="text-xs font-black text-stone-950 dark:text-white block">
                  {tier.level}
                </span>
                <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 inline-block font-bold">
                  Response: {tier.response}
                </div>
                <div className="text-[11px] font-mono text-amber-800 font-bold">
                  Target Fix: {tier.resolution}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Pillars */}
        <div className="space-y-5">
          {securityPillars.map((sec) => (
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
              <Lock className="w-5 h-5 text-emerald-700" />
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
              Request Security NDA
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

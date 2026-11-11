import React from 'react';
import { Metadata } from 'next';
import { COMPANY_INFO } from '@/lib/data/seedData';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and data governance standards of Ecreation IT Solution.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-border pb-6 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Compliance & Data Governance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground">Last updated: November 2026 · Ecreation IT Solution</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-6 text-foreground/90">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Introduction & Overview</h2>
            <p>
              Ecreation IT Solution ("we", "our", or "us") operates the website located at{' '}
              <a href={COMPANY_INFO.website} className="text-indigo-600 hover:underline">
                {COMPANY_INFO.website}
              </a>{' '}
              and associated client ERP portals. We are committed to maintaining the confidentiality, integrity, and security of all personal and enterprise client data collected in connection with our software engineering and consulting services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Data We Collect</h2>
            <p>We collect information strictly necessary to scope, execute, and deliver professional technology engagements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li><strong>Contact & Business Identification:</strong> Name, professional email address, telephone number, and organization name submitted through discovery forms.</li>
              <li><strong>Project Architecture Information:</strong> Technical requirements, system specifications, and budget ranges voluntarily provided during consultation.</li>
              <li><strong>System Diagnostics & Telemetry:</strong> Technical session data, browser user-agent, and anonymized referral source data utilized to enhance site performance and prevent bot abuse.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. How We Use and Protect Client Data</h2>
            <p>
              Client information is stored within encrypted cloud databases protected by Row-Level Security (RLS) policies. We do not sell, rent, or monetize client data. Information submitted is used exclusively for project feasibility analysis, client communication, and service fulfillment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Data Subject Rights & Contact</h2>
            <p>
              Under international privacy frameworks (including GDPR and Indian Digital Personal Data Protection guidelines), you retain the right to request access, rectification, or complete erasure of your business contact information. For all privacy inquiries, contact our Data Protection Officer at{' '}
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-indigo-600 hover:underline">
                {COMPANY_INFO.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


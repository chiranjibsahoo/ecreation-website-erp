import React from 'react';
import { Metadata } from 'next';
import { COMPANY_INFO } from '@/lib/data/seedData';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms of Service and commercial client engagement standards for Ecreation IT Solution.'
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-border pb-6 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Commercial Standards
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Terms & Conditions</h1>
          <p className="text-xs text-muted-foreground">Effective Date: November 2026 · Ecreation IT Solution</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-6 text-foreground/90">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Engagement Principles</h2>
            <p>
              By accessing the website of Ecreation IT Solution or submitting an RFP/discovery request, you agree to comply with these terms. All software engineering, cloud architecture, and ERP design services provided by Ecreation IT Solution are governed by formal Master Services Agreements (MSA) and project Statements of Work (SOW) executed between authorized representatives.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Intellectual Property Rights</h2>
            <p>
              Upon receipt of final milestone settlement in accordance with an agreed SOW, complete ownership of bespoke software code, database schemas, and digital deliverables transitions to the client. Pre-existing proprietary modules, architectural libraries, and open-source frameworks remain subject to their respective perpetual licenses.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. Warranties & SLA Commitments</h2>
            <p>
              Ecreation IT Solution commits to delivering production-grade code that satisfies mutually agreed technical specifications, including automated test coverage and security audit criteria. Post-launch maintenance and 99.99% availability targets are fulfilled through dedicated Service Level Agreements (SLAs).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Governing Law & Jurisdiction</h2>
            <p>
              These terms are governed in accordance with the laws of India, with jurisdiction situated in Noida, Uttar Pradesh, without prejudice to any international cross-border arbitration provisions stipulated in client MSAs.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, ShieldCheck, MessageSquare, Loader2 } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/seedData';
import { SmartContactForm } from '@/components/forms/SmartContactForm';

export const metadata: Metadata = {
  title: 'Contact Us & Schedule Technical Discovery',
  description: 'Reach out to Ecreation IT Solution for bespoke software engineering, enterprise ERP systems, and cloud architecture inquiries.'
};

export default function ContactPage() {
  return (
    <div className="pt-32 sm:pt-36 pb-20 sm:pb-24 bg-[#FAF8F5] dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-200/80">
            Let&apos;s Collaborate
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 dark:text-white">
            Initiate Project Discovery
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Discuss your technical requirements with a Senior Solutions Architect. We respond within 4 business hours with an initial architectural evaluation.
          </p>
        </div>

        {/* 2-Column Grid: Form and Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form */}
          <div id="enquiry" className="lg:col-span-7 scroll-mt-36">
            <Suspense
              fallback={
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-12 flex items-center justify-center text-stone-500 text-sm">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin text-amber-600" />
                  Loading enquiry form...
                </div>
              }
            >
              <SmartContactForm />
            </Suspense>
          </div>

          {/* Right Column: Contact Details & Guarantee */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Quick Contact Card */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-lg font-bold text-stone-950 dark:text-white">Direct Engagement Channels</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-950 dark:text-white block">Corporate Headquarters</span>
                    <span>{COMPANY_INFO.headquarters}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-950 dark:text-white block">Official Email &amp; RFPs</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-700 dark:text-amber-400 hover:underline font-medium">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Project%20Inquiry%20-%20Ecreation%20IT%20Solution`}
                  className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-stone-950 hover:bg-stone-900 border border-amber-500/40 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  Email Us Directly ({COMPANY_INFO.email})
                </a>
              </div>
            </div>

            {/* Engagement Guarantees */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-950 dark:text-white">
                Our Engagement Commitments
              </h4>
              <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Comprehensive Mutual Non-Disclosure Agreement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Dedicated Architect response within 4 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Transparent milestone-based sprint billing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


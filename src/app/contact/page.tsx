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
    <div className="pt-28 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Let's Collaborate
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
            Initiate Project Discovery
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Discuss your technical requirements with a Senior Solutions Architect. We respond within 4 business hours with an initial architectural evaluation.
          </p>
        </div>

        {/* 2-Column Grid: Form and Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div id="enquiry" className="lg:col-span-7 scroll-mt-32">
            <Suspense
              fallback={
                <div className="bg-card border border-border rounded-2xl p-12 flex items-center justify-center text-muted-foreground text-sm">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin text-blue-600" />
                  Loading enquiry form...
                </div>
              }
            >
              <SmartContactForm />
            </Suspense>
          </div>

          {/* Right Column: Contact Details & Guarantee */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Card */}
            <div className="bg-card border border-border rounded-2xl p-8 space-y-6 shadow-xs">
              <h3 className="text-lg font-bold text-foreground">Direct Engagement Channels</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground block">Corporate Headquarters</span>
                    <span>{COMPANY_INFO.headquarters}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground block">Inquiries & RFPs</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-indigo-600 hover:underline">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground block">Direct Line</span>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-foreground">
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-border">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                    COMPANY_INFO.defaultWhatsAppMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  Instant WhatsApp Message
                </a>
              </div>
            </div>

            {/* Engagement Guarantees */}
            <div className="bg-muted/40 border border-border rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Our Engagement Commitments
              </h4>
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Comprehensive Mutual Non-Disclosure Agreement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Dedicated Architect response within 4 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
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


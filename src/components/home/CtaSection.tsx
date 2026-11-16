import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';

export const CtaSection = () => {
  return (
    <section
      id="contact"
      className="py-20 sm:py-24 bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="subsection-bordered-card max-w-5xl mx-auto rounded-3xl bg-white/85 backdrop-blur-sm p-8 sm:p-12 lg:p-14 text-center space-y-7">
          <FadeIn>
            <span className="subsection-bordered-item inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-[#E3F1EB] px-4 py-1.5 rounded-full">
              Ready to Scale Your Business?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 mt-4 leading-tight">
              Let&apos;s Build Your Website, Custom ERP or Growth Engine
            </h2>
            <p className="text-stone-700 text-base sm:text-lg max-w-2xl mx-auto mt-3 leading-relaxed font-medium">
              Whether you need a luxury business website, office automation &amp; billing software, or Google #1 SEO and social media marketing, our team is ready to deliver.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact#enquiry" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-13 px-8 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-black shadow-md text-base transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Get Free Project Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a
                href="mailto:contact@ecreation.in?subject=Project%20Consultation%20-%20Ecreation%20IT%20Solution"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="subsection-bordered-item w-full sm:w-auto h-13 px-7 rounded-xl font-bold bg-[#F5EFE0] text-stone-900 text-base"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-amber-700" />
                  Email: contact@ecreation.in
                </Button>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs text-stone-700 font-semibold">
              <div className="subsection-bordered-item flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% IP Ownership &amp; Strict NDA Protection</span>
              </div>
              <div className="subsection-bordered-item flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Proposal &amp; Cost Roadmap in &lt; 4 Hours</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

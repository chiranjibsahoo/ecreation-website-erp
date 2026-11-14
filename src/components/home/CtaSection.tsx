import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';

export const CtaSection = () => {
  return (
    <section id="contact" className="py-24 bg-stone-950 text-white relative overflow-hidden border-t border-stone-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-stone-900 border border-amber-500/40 px-3.5 py-1 rounded-full">
              Ready to Scale Your Business?
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mt-4 leading-tight">
              Let&apos;s Build Your Website, Custom ERP or Growth Engine
            </h2>
            <p className="text-stone-400 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Whether you need a luxury business website, office automation &amp; billing software, or Google #1 SEO and social media marketing, our team is ready to deliver.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact#enquiry" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-13 px-8 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-black shadow-lg shadow-amber-500/20 text-base hover:scale-[1.02] transition-all"
                >
                  Book Free Strategy Call
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hello%20Ecreation%20IT%20Solution%2C%20I%20would%20like%20to%20consult%20on%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-13 px-7 rounded-xl font-bold border-stone-700 bg-stone-900 text-white hover:bg-stone-800 text-base"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-amber-400" />
                  WhatsApp Direct Inquiry
                </Button>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>100% IP Ownership &amp; Strict NDA Protection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Proposal &amp; Cost Roadmap in &lt; 4 Hours</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

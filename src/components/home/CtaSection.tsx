import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';

export const CtaSection = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-neutral-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/60 border border-blue-800/80 px-3 py-1 rounded-full">
              Ready to Accelerate?
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mt-4 leading-tight">
              Let's Build Your Next Mission-Critical Platform
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Whether you require a bespoke enterprise ERP, a ground-up software rebuild, or high-throughput cloud architecture, our engineers are ready to deliver.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact#enquiry" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-13 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 text-base hover:scale-[1.02] transition-all"
                >
                  Schedule Technical Discovery
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
                  className="w-full sm:w-auto h-13 px-7 rounded-xl font-semibold border-slate-700 text-white hover:bg-slate-900 text-base shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" />
                  WhatsApp Direct Inquiry
                </Button>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Strict Mutual Non-Disclosure Agreement (NDA)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Consultation Response in &lt; 4 Hours</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};


import React from 'react';
import { Star, Quote } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Marcus Vance',
      role: 'Chief Technology Officer',
      company: 'OmniLogistics International',
      quote: 'Ecreation IT Solution built our entire global logistics ERP in under five months. The architectural choices they made around PostgreSQL RLS and Next.js enabled us to cut dispatch paperwork by 94% with zero downtime.',
      rating: 5
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Digital Banking',
      company: 'FinEdge Capital Group',
      quote: 'Their attention to detail and strict security posture blew away our internal compliance team. Passing SOC2 Type II on the first attempt with a custom portal was a massive milestone made possible by Ecreation.',
      rating: 5
    },
    {
      name: 'Dr. Alistair Chen',
      role: 'Medical Director & Co-Founder',
      company: 'MediHealth Networks',
      quote: 'Building HIPAA-compliant telemedicine tools is fraught with technical pitfalls. Ecreation delivered an offline-first mobile app and web portal that our clinicians love using every day.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-stone-950 border-t border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3.5 py-1 rounded-full border border-amber-300/80">
              Client Endorsements
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-white mt-3">
              Trusted by Business &amp; Technical Leaders
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg">
              Here is what executives and founders say about partnering with Ecreation IT Solution.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <FadeIn key={t.name} delay={idx * 0.12}>
              <div className="bg-[#FAF8F5] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl p-8 shadow-xs flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-amber-600/25" />
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800">
                  <h3 className="text-sm font-black text-stone-950 dark:text-white">{t.name}</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {t.role} · <span className="text-amber-800 dark:text-amber-400 font-bold">{t.company}</span>
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

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
      quote: 'Building HIPAA-compliant telemedicine tools is fraught with technical pitfalls. Ecreation delivered an offline-first mobile app that our clinicians actually love using every day.',
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Client Endorsements
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-2">
              Trusted by Technical Leaders
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Here is what executives and product teams say about working with Ecreation IT Solution.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <FadeIn key={t.name} delay={idx * 0.15}>
              <div className="bg-card border border-border rounded-2xl p-8 shadow-xs flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-indigo-500/20" />
                  <p className="text-sm text-foreground leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-bold text-foreground">{t.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · <span className="text-indigo-600 dark:text-indigo-400 font-medium">{t.company}</span>
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


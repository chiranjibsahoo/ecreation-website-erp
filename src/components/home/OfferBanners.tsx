'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Tag,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  Gift,
  ShieldCheck,
  Clock,
  Zap,
  TrendingUp,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';

/**
 * OFFER BANNER 1 (Upper-Middle Page):
 * Complete Business Digital Transformation Launch Discount (Flat 25% OFF)
 */
export const PrimaryLaunchOfferBanner = () => {
  const [copied, setCopied] = useState(false);
  const promoCode = 'ECREATION25';

  const copyPromo = () => {
    navigator.clipboard?.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const freeBonuses = [
    'Free 1-Year Cloud Hosting & Enterprise SSL',
    'Free Custom Domain Registration (.com / .in)',
    'Free On-Page Technical SEO & Google Indexing',
    'Free 6-Month Priority Maintenance & Support'
  ];

  return (
    <section
      id="offers"
      className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-stone-950 border-b border-stone-200/80 dark:border-stone-800 relative overflow-hidden"
      aria-label="Special Business Package Discount Offer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative rounded-3xl bg-stone-950 text-white border border-amber-500/40 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
            {/* Warm Gold Studio Glow */}
            <div
              className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 blur-[120px] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Offer Pitch (8 Cols) */}
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider">
                    <Gift className="w-3.5 h-3.5" />
                    SPECIAL BUSINESS PACKAGE OFFER
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-700 text-amber-300 text-xs font-mono font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Available for All New Business Projects
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-black tracking-tight text-white leading-[1.15]">
                  Get <span className="text-amber-400">Flat 25% OFF</span> on Complete Business Website Design, Custom ERP or Digital Marketing Package
                </h2>

                <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Upgrade your company with an A-class Website, Automated Billing/ERP Software, or Google #1 SEO &amp; Social Media Package—and receive 4 high-value business bonuses completely free:
                </p>

                {/* 4 Free Bonuses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {freeBonuses.map((bonus) => (
                    <div
                      key={bonus}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs sm:text-sm font-semibold text-stone-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{bonus}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Promo Code & Action Box (4 Cols) */}
              <div className="lg:col-span-4 bg-stone-900/95 border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between space-y-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">
                      INSTANT SAVING
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-amber-400">
                      25% OFF
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">
                      FREE BONUSES
                    </span>
                    <span className="text-lg font-bold text-white">
                      Worth ₹35,000
                    </span>
                  </div>
                </div>

                {/* Interactive Promo Code Box */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
                    Click to Copy Offer Code:
                  </span>
                  <button
                    onClick={copyPromo}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-stone-950 border border-dashed border-amber-500/60 hover:border-amber-400 text-amber-300 font-mono font-bold text-sm transition-colors"
                    aria-label="Copy promo code ECREATION25"
                  >
                    <span>{promoCode}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-stone-300">
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>

                <Link href="/contact#enquiry" className="block">
                  <Button className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]">
                    Claim 25% Special Offer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <p className="text-[11px] text-center text-stone-400 font-mono">
                  ✓ No Hidden Charges · Free Consultation in 4 Hours
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/**
 * OFFER BANNER 2 (Lower-Middle Page):
 * Dual Executive Combo Offers (ERP Automation Suite 30% OFF + Free SEO & Social Media Audit)
 */
export const SecondaryComboOffersBanner = () => {
  return (
    <section
      className="py-16 sm:py-20 bg-[#FAF8F5] dark:bg-stone-950 border-t border-stone-200/80 dark:border-stone-800"
      aria-label="Enterprise Combo Offers and Free Audit"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <FadeIn>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-300/80 text-xs font-bold text-amber-900 dark:text-amber-300">
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>EXCLUSIVE BUNDLE PACKAGES &amp; FREE AUDITS</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-950 dark:text-white mt-2">
              Special Business Growth &amp; Automation Offers
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
              Choose an all-in-one automation bundle or claim a complimentary 360° digital audit of your existing website and social media channels.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Combo Offer Card 1: Office Automation & ERP Suite */}
          <FadeIn>
            <div className="h-full rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 overflow-hidden shadow-lg flex flex-col justify-between">
              <div className="relative h-48 w-full bg-stone-950 overflow-hidden">
                <img
                  src="/images/showcase/erp-automation-showcase.jpg"
                  alt="Office Automation and ERP Software Bundle"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider">
                  FLAT 30% OFF BUNDLE
                </div>
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-sm sm:text-base">Office Automation &amp; ERP Suite</span>
                  </div>
                  <span className="text-xs font-mono text-amber-300">+ Free Data Migration</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-stone-950 dark:text-white leading-snug">
                    Complete Office ERP: Billing, Inventory, HR Payroll &amp; Client CRM
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    Get our complete custom Office Automation software tailored to your company with <strong>Flat 30% OFF implementation</strong>, free migration from Tally/Excel, and 30 days of live staff training.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs font-semibold text-stone-800 dark:text-stone-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Automated GST Billing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Multi-Branch Stock Sync</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Free Legacy Data Import</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Role-Based Staff Logins</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-stone-500 block">OFFER CODE: ERP30</span>
                    <span className="text-sm font-black text-stone-950 dark:text-white">Save 30% + Free Demo</span>
                  </div>
                  <Link href="/contact#enquiry">
                    <Button className="bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/40 rounded-xl font-bold px-5 h-11 text-xs sm:text-sm">
                      Book ERP Bundle
                      <ArrowRight className="w-4 h-4 ml-1.5 text-amber-400" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Combo Offer Card 2: Website + SEO + Social Media Growth Pack */}
          <FadeIn delay={0.15}>
            <div className="h-full rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 overflow-hidden shadow-lg flex flex-col justify-between">
              <div className="relative h-48 w-full bg-stone-950 overflow-hidden">
                <img
                  src="/images/showcase/social-marketing-showcase.jpg"
                  alt="SEO and Social Media Growth Offer"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider">
                  FREE ₹25,000 AUDIT + 20% OFF
                </div>
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-sm sm:text-base">SEO, Social Media &amp; Ads Pack</span>
                  </div>
                  <span className="text-xs font-mono text-amber-300">Rank #1 on Google</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-stone-950 dark:text-white leading-snug">
                    360° Digital Marketing: Google #1 SEO, Instagram/LinkedIn &amp; Lead Ads
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    Claim a <strong>100% Free Website Speed, SEO &amp; Competitor Growth Report (Worth ₹25,000)</strong> plus <strong>20% OFF</strong> on our quarterly Social Media Management &amp; Google Ads package.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs font-semibold text-stone-800 dark:text-stone-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Free Technical SEO Audit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Social Media Reels &amp; Posts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Google &amp; Meta Lead Funnels</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Dedicated Growth Manager</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-stone-500 block">OFFER CODE: GROWTH20</span>
                    <span className="text-sm font-black text-stone-950 dark:text-white">Free Audit + 20% OFF</span>
                  </div>
                  <Link href="/contact#enquiry">
                    <Button className="bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/40 rounded-xl font-bold px-5 h-11 text-xs sm:text-sm">
                      Claim Free SEO Audit
                      <ArrowRight className="w-4 h-4 ml-1.5 text-amber-400" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};


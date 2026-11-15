'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  X,
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  Gift,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const ExitOfferPopup = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [triggerReason, setTriggerReason] = useState<'offer' | 'exit'>('offer');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const hasShownInitialRef = useRef(false);
  const hasShownExitRef = useRef(false);
  const hasConvertedRef = useRef(false);

  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) return;

    // 1. Automatic Offer Popup on Visit (opens after 2.5 seconds)
    const timer = setTimeout(() => {
      if (!hasShownInitialRef.current && !hasConvertedRef.current) {
        hasShownInitialRef.current = true;
        setTriggerReason('offer');
        setIsOpen(true);
      }
    }, 2500);

    // 2. Exit-Intent Detection (when visitor moves cursor toward top tab/close bar to leave website)
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasConvertedRef.current) return;
      if (e.clientY <= 20 && !hasShownExitRef.current) {
        hasShownExitRef.current = true;
        setTriggerReason('exit');
        setIsOpen(true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (hasConvertedRef.current) return;
      if (e.clientY <= 10 && e.movementY < -4 && !hasShownExitRef.current) {
        hasShownExitRef.current = true;
        setTriggerReason('exit');
        setIsOpen(true);
      }
    };

    const handleCustomOpen = () => {
      setTriggerReason('offer');
      setIsOpen(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('open-offer-popup', handleCustomOpen);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('open-offer-popup', handleCustomOpen);
    };
  }, [isAdminRoute]);

  if (isAdminRoute || !isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedPhone || trimmedPhone.replace(/\D/g, '').length < 7) {
      setErrorMsg('Please enter a valid mobile / phone number.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email ID.');
      return;
    }

    setIsSubmitting(true);
    try {
      const sourceLabel =
        triggerReason === 'exit'
          ? 'Exit-Intent 25% Offer Popup'
          : 'Special 25% Offer Conversion Popup';

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Offer Lead (${trimmedPhone})`,
          phone: trimmedPhone,
          email: trimmedEmail,
          serviceRequired: 'Flat 25% Special Business Offer',
          budgetRange: '25% Special Offer Claimed',
          source: sourceLabel,
          message: `Visitor claimed Flat 25% Special Offer via ${sourceLabel}. Phone: ${trimmedPhone} | Email: ${trimmedEmail}`
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not submit offer claim.');
      }

      hasConvertedRef.current = true;
      try {
        sessionStorage.setItem('ecreation_offer_converted', 'true');
      } catch {
        // ignore
      }

      setSubmittedRef(data.leadId || 'EC-OFFER25');
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-stone-950/75 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-offer-title"
    >
      {/* Backdrop click to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Offer Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-gradient-to-b from-[#161310] via-[#110F0D] to-[#0B0A09] text-white border-2 border-amber-400/70 shadow-[0_25px_80px_-15px_rgba(245,158,11,0.45)] animate-in zoom-in-95 duration-200">
        {/* Top Glowing Gold & Sunset Ribbon */}
        <div className="bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#D97706] px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-white animate-bounce" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-white">
              {triggerReason === 'exit'
                ? 'WAIT! BEFORE YOU LEAVE — EXCLUSIVE OFFER'
                : 'LIMITED-TIME SPECIAL BUSINESS OFFER'}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 rounded-full bg-black/25 hover:bg-black/45 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Offer Popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Decorative Ambient Glows */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-orange-600/20 blur-3xl" />

        <div className="relative p-6 sm:p-8">
          {submittedRef ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[11px] font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                OFFER LOCKED • REF: {submittedRef}
              </div>
              <h3 className="text-2xl font-black text-white">
                Your Flat 25% Special Offer is Activated!
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                We have registered your contact details (<strong className="text-amber-300">{phone}</strong> &amp; <strong className="text-amber-300">{email}</strong>). Our Senior Solutions Architect will reach out with your custom demo &amp; 25% discount voucher.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer"
              >
                Continue Exploring Website
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Offer Headline & Value Badges */}
              <div className="text-center space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-extrabold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>FLAT 25% OFF + FREE 1-YEAR CLOUD HOSTING</span>
                </div>

                <h2
                  id="exit-offer-title"
                  className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight"
                >
                  Don&apos;t Miss Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                    25% Special Offer
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md mx-auto">
                  Get a <strong className="text-white">Custom Website, Office Automation ERP, AI Solution, or SEO Growth Package</strong> with our exclusive 25% discount &amp; free live prototype demo.
                </p>
              </div>

              {/* 3 Quick Perks */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="block text-sm font-black text-amber-400">25% OFF</span>
                  <span className="text-[10px] text-stone-300 font-medium">Instant Discount</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="block text-sm font-black text-amber-400">FREE</span>
                  <span className="text-[10px] text-stone-300 font-medium">Live Project Demo</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="block text-sm font-black text-amber-400">1 YEAR</span>
                  <span className="text-[10px] text-stone-300 font-medium">Free Support &amp; SSL</span>
                </div>
              </div>

              {/* Strictly 2-Field Form: Only Phone Number & Email ID */}
              <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
                <div>
                  <label
                    htmlFor="popup-phone"
                    className="block text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1.5"
                  >
                    Mobile / Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="popup-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your 10-digit mobile number"
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/10 border border-amber-400/40 focus:border-amber-400 text-white placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="popup-email"
                    className="block text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1.5"
                  >
                    Email ID *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="popup-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your official email ID"
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/10 border border-amber-400/40 focus:border-amber-400 text-white placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_12px_30px_-6px_rgba(234,88,12,0.65)] hover:shadow-[0_15px_35px_-5px_rgba(234,88,12,0.85)] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-60"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>
                    {isSubmitting
                      ? 'Activating Your 25% Offer...'
                      : 'Claim My Flat 25% Special Offer Now'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Trust Footer */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-stone-400">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Privacy Guaranteed
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-stone-400 hover:text-white underline underline-offset-2 cursor-pointer"
                >
                  No thanks, I&apos;ll pay full price
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

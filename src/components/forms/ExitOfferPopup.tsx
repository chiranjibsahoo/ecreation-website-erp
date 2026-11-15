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
  Zap,
  Clock,
  AlertCircle,
  Award
} from 'lucide-react';

type PopupMode = 'engaged_idle' | 'exit';

export const ExitOfferPopup = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [popupMode, setPopupMode] = useState<PopupMode>('engaged_idle');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submittedSource, setSubmittedSource] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState(299); // 04:59 VIP Offer timer

  const hasShownInitialRef = useRef(false);
  const hasShownOneMinRef = useRef(false);
  const hasShownTwoMinRef = useRef(false);
  const hasShownExitRef = useRef(false);
  const hasConvertedRef = useRef(false);

  const isAdminRoute = pathname?.startsWith('/admin');

  // Strict Validation Helpers
  const validatePhone = (val: string): { valid: boolean; message: string } => {
    const trimmed = val.trim();
    if (!trimmed) {
      return { valid: false, message: 'Mobile / Phone number is required.' };
    }
    const digitsOnly = trimmed.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return {
        valid: false,
        message: `Enter at least 10 digits (${digitsOnly.length}/10 entered).`
      };
    }
    if (digitsOnly.length > 15) {
      return { valid: false, message: 'Phone number cannot exceed 15 digits.' };
    }
    if (/^(\d)\1+$/.test(digitsOnly)) {
      return { valid: false, message: 'Please enter a real, active phone number.' };
    }
    if (digitsOnly.length === 10 && !/^[6-9]\d{9}$/.test(digitsOnly)) {
      return {
        valid: false,
        message: '10-digit mobile number should start with 6, 7, 8, or 9.'
      };
    }
    return { valid: true, message: 'Valid phone number' };
  };

  const validateEmail = (val: string): { valid: boolean; message: string } => {
    const trimmed = val.trim();
    if (!trimmed) {
      return { valid: false, message: 'Email ID is required.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      return {
        valid: false,
        message: 'Please enter a valid email ID (e.g. name@company.com).'
      };
    }
    return { valid: true, message: 'Valid email ID' };
  };

  const phoneValidation = validatePhone(phone);
  const emailValidation = validateEmail(email);

  // Countdown timer when popup is open
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 299));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isAdminRoute) return;

    // Listen if visitor submits any enquiry anywhere on the site (Chatbot, Contact Form, etc.)
    const handleGlobalEnquirySubmitted = () => {
      hasConvertedRef.current = true;
    };
    window.addEventListener('ecreation-enquiry-submitted', handleGlobalEnquirySubmitted);

    // 0. Initial Offer Popup on Visit (opens after 4 seconds)
    const initialTimer = setTimeout(() => {
      if (!hasConvertedRef.current && !hasShownInitialRef.current) {
        hasShownInitialRef.current = true;
        setSubmittedRef(null);
        setErrorMsg(null);
        setPopupMode('engaged_idle');
        setIsOpen(true);
      }
    }, 4000);

    // 1. Engaged Visitor Popup at 1 Minute (60s) if visitor is on website without enquiring
    const oneMinuteTimer = setTimeout(() => {
      if (!hasConvertedRef.current && !hasShownOneMinRef.current) {
        hasShownOneMinRef.current = true;
        setSubmittedRef(null);
        setErrorMsg(null);
        setPopupMode('engaged_idle');
        setIsOpen(true);
      }
    }, 60000); // 60 seconds (1 minute)

    // 2. Engaged Visitor Follow-up at 2 Minutes (120s) if still no enquiry submitted
    const twoMinuteTimer = setTimeout(() => {
      if (!hasConvertedRef.current && !hasShownTwoMinRef.current) {
        hasShownTwoMinRef.current = true;
        setSubmittedRef(null);
        setErrorMsg(null);
        setPopupMode('engaged_idle');
        setIsOpen(true);
      }
    }, 120000); // 120 seconds (2 minutes)

    // 3. Exit-Intent Detection (when visitor moves cursor to top browser bar to close/leave website)
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasConvertedRef.current) return;
      if (e.clientY <= 20 && !hasShownExitRef.current) {
        hasShownExitRef.current = true;
        setSubmittedRef(null);
        setErrorMsg(null);
        setPopupMode('exit');
        setIsOpen(true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (hasConvertedRef.current) return;
      if (e.clientY <= 10 && e.movementY < -4 && !hasShownExitRef.current) {
        hasShownExitRef.current = true;
        setSubmittedRef(null);
        setErrorMsg(null);
        setPopupMode('exit');
        setIsOpen(true);
      }
    };

    // Custom trigger so visitor or admin can also open the Offer Popup anytime
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: PopupMode }>;
      setSubmittedRef(null);
      setErrorMsg(null);
      setPopupMode(customEvent.detail?.mode || 'engaged_idle');
      setIsOpen(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('open-offer-popup', handleCustomOpen);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(oneMinuteTimer);
      clearTimeout(twoMinuteTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('open-offer-popup', handleCustomOpen);
      window.removeEventListener('ecreation-enquiry-submitted', handleGlobalEnquirySubmitted);
    };
  }, [isAdminRoute]);

  if (isAdminRoute || !isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneTouched(true);
    setEmailTouched(true);
    setErrorMsg(null);

    if (!phoneValidation.valid) {
      setErrorMsg(phoneValidation.message);
      return;
    }

    if (!emailValidation.valid) {
      setErrorMsg(emailValidation.message);
      return;
    }

    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    setIsSubmitting(true);
    try {
      const sourceLabel =
        popupMode === 'engaged_idle'
          ? '1-2 Min Engaged Visitor Offer Popup'
          : 'Exit-Intent 25% Offer Popup';

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:
            popupMode === 'engaged_idle'
              ? `Engaged Visitor (${trimmedPhone})`
              : `Exit Offer Lead (${trimmedPhone})`,
          phone: trimmedPhone,
          email: trimmedEmail,
          serviceRequired: 'Flat 25% Special Business Offer',
          budgetRange: '25% Special Offer Claimed',
          source: sourceLabel,
          message: `Visitor claimed Flat 25% Special Offer via [${sourceLabel}]. Validated Phone: ${trimmedPhone} | Validated Email: ${trimmedEmail}`
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not submit offer claim.');
      }

      hasConvertedRef.current = true;
      window.dispatchEvent(new CustomEvent('ecreation-enquiry-submitted'));

      setSubmittedSource(sourceLabel);
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-popup-title"
    >
      {/* Backdrop click to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* =====================================================================
          STYLE 1: NEW-STYLE 1-2 MINUTE ENGAGED VISITOR SPLIT LUXURY POPUP
          (Royal Emerald-Teal & 24K Gold Left Panel + Warm Champagne-Ivory Form)
         ===================================================================== */}
      {popupMode === 'engaged_idle' ? (
        <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-[#FFFDF9] border-2 border-amber-400 shadow-[0_28px_90px_-15px_rgba(6,95,70,0.65)] animate-in zoom-in-95 duration-200 grid grid-cols-1 md:grid-cols-12">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-stone-900/10 hover:bg-stone-900/20 text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Offer Popup"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Royal Emerald-Teal & 24K Gold Visual Offer Showcase */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#0F766E] text-white p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
            <div className="pointer-events-none absolute -top-12 -left-12 w-40 h-40 rounded-full bg-amber-400/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-emerald-300/20 blur-2xl" />

            <div className="relative space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-widest shadow-md">
                <Award className="w-3.5 h-3.5" />
                <span>VIP VISITOR BONUS</span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">
                  Special Business Offer
                </p>
                <div className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight drop-shadow-sm">
                  25% OFF
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed pt-1">
                  Still exploring our solutions? Lock in your <strong className="text-white">Flat 25% Discount + Free Custom Prototype Demo</strong> right now!
                </p>
              </div>

              {/* Perks List */}
              <ul className="space-y-2 pt-2 text-xs text-emerald-50 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Flat 25% Off Website, ERP &amp; AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Free 1-Year Cloud Hosting &amp; SSL</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Free Live Architecture Blueprint</span>
                </li>
              </ul>
            </div>

            {/* Live VIP Offer Countdown Pill */}
            <div className="relative mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                Offer Reserved:
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-950/60 border border-amber-400/50 font-mono text-xs font-black text-amber-300">
                {formatCountdown(countdownSeconds)}
              </span>
            </div>
          </div>

          {/* Right Column: Warm Champagne-Ivory 2-Field Validated Enquiry Form */}
          <div className="md:col-span-7 p-6 sm:p-8 bg-gradient-to-b from-[#FFFDF9] to-[#F9F1DF] text-stone-950 flex flex-col justify-center">
            {submittedRef ? (
              <div className="text-center py-4 space-y-3.5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-amber-300 text-[10px] font-mono font-bold">
                  <Sparkles className="w-3 h-3" />
                  REF: {submittedRef} • {submittedSource}
                </div>
                <h3 className="text-xl font-black text-stone-950">
                  Your 25% VIP Offer is Locked!
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  We have verified and saved your number (<strong className="text-stone-950">{phone}</strong>) &amp; email (<strong className="text-stone-950">{email}</strong>). Our Senior Architect will reach out shortly.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-900 text-amber-400 font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-800 block">
                    INSTANT 10-SECOND CLAIM
                  </span>
                  <h2
                    id="offer-popup-title"
                    className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight mt-0.5"
                  >
                    Unlock Your 25% Special Offer
                  </h2>
                  <p className="text-xs text-stone-600 mt-1">
                    Enter only your <strong className="text-stone-900">Mobile Number &amp; Email ID</strong> below to claim your discount voucher &amp; free consultation.
                  </p>
                </div>

                {/* Strictly 2-Field Form with Live Validation */}
                <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                  {/* Field 1: Mobile / Phone Number */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="engaged-popup-phone"
                        className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800"
                      >
                        Mobile / Phone Number <span className="text-rose-600">*</span>
                      </label>
                      {phoneTouched && (
                        <span
                          className={`text-[10px] font-bold flex items-center gap-1 ${
                            phoneValidation.valid ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {phoneValidation.valid ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </>
                          ) : (
                            'Required (10 digits)'
                          )}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="engaged-popup-phone"
                        type="tel"
                        required
                        value={phone}
                        onBlur={() => setPhoneTouched(true)}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errorMsg) setErrorMsg(null);
                        }}
                        placeholder="e.g. 9876543210"
                        className={`w-full h-11 pl-10 pr-4 rounded-xl bg-white border-2 text-stone-950 placeholder:text-stone-400 text-sm font-semibold focus:outline-none transition-all ${
                          phoneTouched
                            ? phoneValidation.valid
                              ? 'border-emerald-500 focus:border-emerald-600'
                              : 'border-rose-400 focus:border-rose-500'
                            : 'border-amber-300 focus:border-emerald-700'
                        }`}
                      />
                    </div>
                    {phoneTouched && !phoneValidation.valid && (
                      <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{phoneValidation.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 2: Official Email ID */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="engaged-popup-email"
                        className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800"
                      >
                        Email ID <span className="text-rose-600">*</span>
                      </label>
                      {emailTouched && (
                        <span
                          className={`text-[10px] font-bold flex items-center gap-1 ${
                            emailValidation.valid ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {emailValidation.valid ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </>
                          ) : (
                            'Valid Email Required'
                          )}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="engaged-popup-email"
                        type="email"
                        required
                        value={email}
                        onBlur={() => setEmailTouched(true)}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMsg) setErrorMsg(null);
                        }}
                        placeholder="you@company.com"
                        className={`w-full h-11 pl-10 pr-4 rounded-xl bg-white border-2 text-stone-950 placeholder:text-stone-400 text-sm font-semibold focus:outline-none transition-all ${
                          emailTouched
                            ? emailValidation.valid
                              ? 'border-emerald-500 focus:border-emerald-600'
                              : 'border-rose-400 focus:border-rose-500'
                            : 'border-amber-300 focus:border-emerald-700'
                        }`}
                      />
                    </div>
                    {emailTouched && !emailValidation.valid && (
                      <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{emailValidation.message}</span>
                      </p>
                    )}
                  </div>

                  {errorMsg && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#065F46] via-[#047857] to-[#0F766E] hover:from-[#064E3B] hover:to-[#047857] text-white border border-amber-400/80 font-black text-xs uppercase tracking-wider shadow-[0_12px_28px_-6px_rgba(6,95,70,0.55)] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-60"
                  >
                    <Zap className="w-4 h-4 text-amber-300 fill-current" />
                    <span>
                      {isSubmitting
                        ? 'Activating 25% VIP Offer...'
                        : 'Claim My 25% Special Offer Now'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                </form>

                <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    100% Privacy Guaranteed
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-stone-500 hover:text-stone-900 underline cursor-pointer"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* =====================================================================
           STYLE 2: EXIT-INTENT OFFER POPUP (When visitor tries to leave/close)
           (Deep Obsidian & Sunset Amber-Orange Luxury Modal)
           ===================================================================== */
        <div className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-gradient-to-b from-[#161310] via-[#110F0D] to-[#0B0A09] text-white border-2 border-amber-400/70 shadow-[0_25px_80px_-15px_rgba(245,158,11,0.45)] animate-in zoom-in-95 duration-200">
          {/* Top Glowing Gold & Sunset Ribbon */}
          <div className="bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#D97706] px-5 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-white animate-bounce" />
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-white">
                WAIT! BEFORE YOU LEAVE — EXCLUSIVE 25% OFFER
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
                <div className="text-center space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-extrabold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>FLAT 25% OFF + FREE 1-YEAR CLOUD HOSTING</span>
                  </div>

                  <h2
                    id="offer-popup-title"
                    className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight"
                  >
                    Don&apos;t Leave Without Your{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                      25% Special Offer
                    </span>
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md mx-auto">
                    Enter only your <strong className="text-white">Mobile Number &amp; Email ID</strong> to lock in Flat 25% OFF on Website Design, Office Automation ERP, AI, or SEO.
                  </p>
                </div>

                {/* Strictly 2-Field Form with Live Validation */}
                <form onSubmit={handleSubmit} className="space-y-3.5 pt-1" noValidate>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="exit-popup-phone"
                        className="text-[11px] font-bold uppercase tracking-wider text-amber-300"
                      >
                        Mobile / Phone Number *
                      </label>
                      {phoneTouched && (
                        <span
                          className={`text-[10px] font-bold ${
                            phoneValidation.valid ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {phoneValidation.valid ? '✓ Verified' : phoneValidation.message}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="exit-popup-phone"
                        type="tel"
                        required
                        value={phone}
                        onBlur={() => setPhoneTouched(true)}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errorMsg) setErrorMsg(null);
                        }}
                        placeholder="Enter your 10-digit mobile number"
                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/10 border border-amber-400/40 focus:border-amber-400 text-white placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="exit-popup-email"
                        className="text-[11px] font-bold uppercase tracking-wider text-amber-300"
                      >
                        Email ID *
                      </label>
                      {emailTouched && (
                        <span
                          className={`text-[10px] font-bold ${
                            emailValidation.valid ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {emailValidation.valid ? '✓ Verified' : emailValidation.message}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="exit-popup-email"
                        type="email"
                        required
                        value={email}
                        onBlur={() => setEmailTouched(true)}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMsg) setErrorMsg(null);
                        }}
                        placeholder="Enter your official email ID"
                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/10 border border-amber-400/40 focus:border-amber-400 text-white placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-semibold text-rose-300 bg-rose-500/15 border border-rose-500/40 rounded-lg px-3 py-2 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_12px_30px_-6px_rgba(234,88,12,0.65)] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-60"
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
                    No thanks, I&apos;ll pass on 25% off
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

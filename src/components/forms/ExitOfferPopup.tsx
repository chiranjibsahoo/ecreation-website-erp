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
  Award,
  Tag
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

  const popupStepRef = useRef(0);
  const nextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pageLoadedAtRef = useRef<number>(Date.now());
  const isOpenRef = useRef(false);
  const hasShownExitRef = useRef(false);
  const hasConvertedRef = useRef(false);

  const isSuppressedRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

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

  // Progressive non-intrusive schedule: 1st at 30s, 2nd after 1m 30s (90s), 3rd after 3m (180s)
  const PROGRESSIVE_DELAYS_MS = [30000, 90000, 180000];

  const scheduleNextPopup = (stepIndex: number) => {
    if (nextTimerRef.current) {
      clearTimeout(nextTimerRef.current);
      nextTimerRef.current = null;
    }
    if (hasConvertedRef.current || stepIndex >= PROGRESSIVE_DELAYS_MS.length) return;

    nextTimerRef.current = setTimeout(() => {
      if (!hasConvertedRef.current && !isOpenRef.current) {
        popupStepRef.current = stepIndex + 1;
        setSubmittedRef(null);
        setErrorMsg(null);
        setPopupMode('engaged_idle');
        setIsOpen(true);
      }
    }, PROGRESSIVE_DELAYS_MS[stepIndex]);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
    // Schedule the next progressive reminder only after the visitor dismisses the current one
    if (!hasConvertedRef.current && popupStepRef.current < PROGRESSIVE_DELAYS_MS.length) {
      scheduleNextPopup(popupStepRef.current);
    }
  };

  useEffect(() => {
    if (isSuppressedRoute) return;

    pageLoadedAtRef.current = Date.now();

    const handleGlobalEnquirySubmitted = () => {
      hasConvertedRef.current = true;
      if (nextTimerRef.current) {
        clearTimeout(nextTimerRef.current);
        nextTimerRef.current = null;
      }
    };
    window.addEventListener('ecreation-enquiry-submitted', handleGlobalEnquirySubmitted);

    // 1st popup appears after 30 seconds (then 1m 30s after dismiss, then 3m after dismiss)
    scheduleNextPopup(0);

    // Exit-Intent Detection (only after 30s on page & never while already open)
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasConvertedRef.current || isOpenRef.current) return;
      if (Date.now() - pageLoadedAtRef.current < 30000) return;
      if (e.clientY <= 20 && !hasShownExitRef.current) {
        hasShownExitRef.current = true;
        setSubmittedRef(null);
        setErrorMsg(null);
        setPopupMode('exit');
        setIsOpen(true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (hasConvertedRef.current || isOpenRef.current) return;
      if (Date.now() - pageLoadedAtRef.current < 30000) return;
      if (e.clientY <= 10 && e.movementY < -4 && !hasShownExitRef.current) {
        hasShownExitRef.current = true;
        setSubmittedRef(null);
        setErrorMsg(null);
        setPopupMode('exit');
        setIsOpen(true);
      }
    };

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
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('open-offer-popup', handleCustomOpen);
      window.removeEventListener('ecreation-enquiry-submitted', handleGlobalEnquirySubmitted);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuppressedRoute]);

  if (isSuppressedRoute || !isOpen) return null;

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-stone-950/60 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-popup-title"
    >
      {/* Backdrop click to dismiss */}
      <div
        className="absolute inset-0"
        onClick={handleClosePopup}
        aria-hidden="true"
      />

      {/* =====================================================================
          STYLE 1: LIGHT-THEMED COMMERCIAL E-COMMERCE SPLIT VOUCHER POPUP
          (Warm Pearl-Ivory + 24K Metallic Gold Gradient Showcase — ZERO SCROLLBAR)
         ===================================================================== */}
      {popupMode === 'engaged_idle' ? (
        <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EE] to-[#FDF4DE] border-2 border-amber-400/90 shadow-[0_28px_80px_-15px_rgba(217,119,6,0.42)] animate-in zoom-in-95 duration-200 grid grid-cols-1 md:grid-cols-12">
          {/* Close Button */}
          <button
            onClick={handleClosePopup}
            className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-stone-800 flex items-center justify-center transition-all duration-200 hover:rotate-90 cursor-pointer"
            aria-label="Close Offer Popup"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Light Golden Champagne E-Commerce Voucher Showcase */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A]/85 to-[#F59E0B]/30 text-stone-950 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-amber-300/80">
            <div className="pointer-events-none absolute -top-12 -left-12 w-36 h-36 rounded-full bg-white/70 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-amber-400/30 blur-2xl" />

            <div className="relative space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#B45309] text-white text-[10px] font-black uppercase tracking-widest shadow-sm">
                <Award className="w-3.5 h-3.5" />
                <span>VIP VISITOR VOUCHER</span>
              </div>

              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-amber-900/80">
                  Special Business Offer
                </p>
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#92400E] via-[#D97706] to-[#EA580C] tracking-tight">
                  25% OFF
                </div>
                <p className="text-xs text-stone-800 font-medium leading-snug pt-1">
                  Upgrade your business with our <strong className="text-stone-950">Flat 25% Discount + Free Custom Prototype Demo</strong>!
                </p>
              </div>

              {/* Dashed E-Commerce Coupon Box */}
              <div className="p-2.5 rounded-xl bg-white/90 border-2 border-dashed border-amber-500/80 flex items-center justify-between shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-amber-600" />
                  Coupon:
                </span>
                <span className="font-mono text-xs font-black text-amber-800">
                  ECREATION25
                </span>
              </div>

              {/* Perks List */}
              <ul className="space-y-1.5 pt-1 text-xs text-stone-800 font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Flat 25% Off Website, ERP &amp; AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free 1-Year Cloud Hosting &amp; SSL</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Live Architecture Demo</span>
                </li>
              </ul>
            </div>

            {/* Live VIP Offer Countdown Pill */}
            <div className="relative mt-4 pt-3 border-t border-amber-400/50 flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                Offer Reserved:
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-400 font-mono text-xs font-black text-amber-800 shadow-2xs">
                {formatCountdown(countdownSeconds)}
              </span>
            </div>
          </div>

          {/* Right Column: Light Ivory 2-Field Validated Enquiry Form (Single View, Zero Scroll) */}
          <div className="md:col-span-7 p-5 sm:p-6 bg-gradient-to-b from-[#FFFDF9] to-[#FDF6E7] text-stone-950 flex flex-col justify-center">
            {submittedRef ? (
              <div className="text-center py-3 space-y-3">
                <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono font-bold">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  REF: {submittedRef} • {submittedSource}
                </div>
                <h3 className="text-xl font-black text-stone-950">
                  Your 25% VIP Voucher is Activated!
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We have verified and saved your number (<strong className="text-amber-800">{phone}</strong>) &amp; email (<strong className="text-amber-800">{email}</strong>). Our Senior Architect will reach out shortly.
                </p>
                <button
                  onClick={handleClosePopup}
                  className="mt-1 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#B45309] text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Continue Exploring
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-700 block">
                    INSTANT VOUCHER ACTIVATION
                  </span>
                  <h2
                    id="offer-popup-title"
                    className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight mt-0.5"
                  >
                    Unlock Your{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#EA580C]">
                      25% Special Offer
                    </span>
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5 leading-snug">
                    Enter only your <strong className="text-stone-900">Mobile Number &amp; Email ID</strong> below to unlock your 25% discount voucher &amp; free live consultation.
                  </p>
                </div>

                {/* Strictly 2-Field Form with Live Validation */}
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  {/* Field 1: Mobile / Phone Number */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="engaged-popup-phone"
                        className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800"
                      >
                        Mobile / Phone Number <span className="text-amber-600">*</span>
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
                      <Phone className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                        placeholder="Enter your 10-digit mobile number"
                        className={`w-full h-10 pl-10 pr-4 rounded-xl bg-white border-2 text-stone-950 placeholder:text-stone-400 text-sm font-semibold focus:outline-none transition-all shadow-2xs ${
                          phoneTouched
                            ? phoneValidation.valid
                              ? 'border-emerald-500 focus:border-emerald-600'
                              : 'border-rose-400 focus:border-rose-500'
                            : 'border-amber-300 focus:border-amber-500'
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
                        Email ID <span className="text-amber-600">*</span>
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
                      <Mail className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                        placeholder="Enter your official email ID"
                        className={`w-full h-10 pl-10 pr-4 rounded-xl bg-white border-2 text-stone-950 placeholder:text-stone-400 text-sm font-semibold focus:outline-none transition-all shadow-2xs ${
                          emailTouched
                            ? emailValidation.valid
                              ? 'border-emerald-500 focus:border-emerald-600'
                              : 'border-rose-400 focus:border-rose-500'
                            : 'border-amber-300 focus:border-amber-500'
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
                    <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#EA580C] hover:from-[#B45309] hover:via-[#D97706] hover:to-[#C2410C] text-white font-black text-xs uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(217,119,6,0.55)] hover:shadow-[0_14px_30px_-5px_rgba(217,119,6,0.75)] hover:-translate-y-0.5 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-60"
                  >
                    <Zap className="w-4 h-4 text-white fill-current" />
                    <span>
                      {isSubmitting
                        ? 'Activating 25% Voucher...'
                        : 'Claim My 25% Special Offer Now'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </form>

                <div className="flex items-center justify-between pt-0.5 text-[11px] text-stone-500">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    100% Privacy Guaranteed
                  </span>
                  <button
                    type="button"
                    onClick={handleClosePopup}
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
           STYLE 2: LIGHT-THEMED EXIT-INTENT E-COMMERCE OFFER POPUP
           (Single-Go Layout, Zero Scrollbar, Warm Pearl & 24K Gold Gradient)
           ===================================================================== */
        <div className="relative w-full max-w-[440px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EE] to-[#FDF3DC] text-stone-950 border-2 border-amber-400/90 shadow-[0_25px_75px_-15px_rgba(217,119,6,0.42)] animate-in zoom-in-95 duration-200">
          {/* Top Metallic 24K Gold Ribbon */}
          <div className="bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#EA580C] px-5 py-2.5 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-white animate-bounce shrink-0" />
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-white">
                WAIT! BEFORE YOU LEAVE — FLAT 25% OFF
              </span>
            </div>
            <button
              onClick={handleClosePopup}
              className="w-6 h-6 rounded-full bg-black/15 hover:bg-black/30 text-white flex items-center justify-center transition-all duration-200 hover:rotate-90 cursor-pointer"
              aria-label="Close Offer Popup"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative px-6 pt-4 pb-5">
            {submittedRef ? (
              <div className="text-center py-4 space-y-3.5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  VOUCHER LOCKED • REF: {submittedRef}
                </div>
                <h3 className="text-xl font-black text-stone-950">
                  Your Flat 25% Special Offer is Activated!
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  We have registered your contact details (<strong className="text-amber-800">{phone}</strong> &amp; <strong className="text-amber-800">{email}</strong>). Our Senior Solutions Architect will reach out with your 25% discount voucher.
                </p>
                <button
                  onClick={handleClosePopup}
                  className="mt-1 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#B45309] text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Continue Exploring Website
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>FLAT 25% OFF + FREE 1-YR HOSTING</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-dashed border-emerald-400 text-emerald-800 text-[10px] font-mono font-bold">
                      <Tag className="w-2.5 h-2.5 text-emerald-600" />
                      ECREATION25
                    </span>
                  </div>

                  <h2
                    id="offer-popup-title"
                    className="text-2xl font-black tracking-tight text-stone-950 leading-tight pt-0.5"
                  >
                    Quick Enquiry &amp;{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#EA580C]">
                      25% Special Offer
                    </span>
                  </h2>

                  <p className="text-xs text-stone-600 leading-snug">
                    Enter your <strong className="text-stone-900">Mobile Number &amp; Email ID</strong> below to unlock your Flat 25% Special Offer and free live project consultation.
                  </p>
                </div>

                {/* 3 Crisp Light E-Commerce Value Cards */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="py-2 px-2 rounded-xl bg-white border border-amber-300/80 text-center shadow-2xs">
                    <span className="block text-xs font-black text-amber-700">25% OFF</span>
                    <span className="text-[10px] text-stone-600 font-semibold">Special Offer</span>
                  </div>
                  <div className="py-2 px-2 rounded-xl bg-white border border-amber-300/80 text-center shadow-2xs">
                    <span className="block text-xs font-black text-amber-700">FREE</span>
                    <span className="text-[10px] text-stone-600 font-semibold">Live Demo</span>
                  </div>
                  <div className="py-2 px-2 rounded-xl bg-white border border-amber-300/80 text-center shadow-2xs">
                    <span className="block text-xs font-black text-amber-700">1 YEAR</span>
                    <span className="text-[10px] text-stone-600 font-semibold">Free Support</span>
                  </div>
                </div>

                {/* Strictly 2-Field Form with Live Validation */}
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="exit-popup-phone"
                        className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800"
                      >
                        Mobile / Phone Number <span className="text-amber-600">*</span>
                      </label>
                      {phoneTouched && (
                        <span
                          className={`text-[10px] font-bold ${
                            phoneValidation.valid ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {phoneValidation.valid ? '✓ Verified' : '10 digits required'}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                        className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-amber-300 focus:border-amber-500 text-stone-950 placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/25 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="exit-popup-email"
                        className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800"
                      >
                        Email ID <span className="text-amber-600">*</span>
                      </label>
                      {emailTouched && (
                        <span
                          className={`text-[10px] font-bold ${
                            emailValidation.valid ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {emailValidation.valid ? '✓ Verified' : 'Valid email required'}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                        className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-amber-300 focus:border-amber-500 text-stone-950 placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/25 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#EA580C] hover:from-[#B45309] hover:via-[#D97706] hover:to-[#C2410C] text-white font-black text-xs uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(217,119,6,0.55)] hover:shadow-[0_14px_30px_-5px_rgba(217,119,6,0.75)] hover:-translate-y-0.5 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-60"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>
                      {isSubmitting
                        ? 'Activating Your 25% Voucher...'
                        : 'Claim 25% Special Offer & Submit'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex items-center justify-between pt-0.5 text-[11px] text-stone-500">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    100% Confidential · Instant Voucher
                  </span>
                  <button
                    type="button"
                    onClick={handleClosePopup}
                    className="text-stone-500 hover:text-stone-900 underline underline-offset-2 cursor-pointer"
                  >
                    Maybe later
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

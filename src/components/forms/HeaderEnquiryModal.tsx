'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  Gift,
  Zap,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

interface HeaderEnquiryModalProps {
  triggerClassName?: string;
  triggerText?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'dock' | 'vertical-tab';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
  sourceLabel?: string;
}

export const HeaderEnquiryModal: React.FC<HeaderEnquiryModalProps> = ({
  triggerClassName = '',
  triggerText = 'Quick Enquiry',
  variant = 'default',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  hideTrigger = false,
  sourceLabel = 'Quick Enquiry 25% Offer Popup'
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (val: boolean) => {
    if (isControlled && setControlledOpen) {
      setControlledOpen(val);
    } else {
      setInternalOpen(val);
    }
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leadId, setLeadId] = useState('');
  const formStartedAtRef = useRef<number>(0);

  useEffect(() => {
    formStartedAtRef.current = Date.now();
  }, [open]);

  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    honeypot: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.honeypot) {
      setSuccess(true);
      return;
    }

    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();
    const digitsOnly = trimmedPhone.replace(/\D/g, '');

    if (digitsOnly.length < 10 || digitsOnly.length > 15 || /^(\d)\1+$/.test(digitsOnly)) {
      setErrorMessage('Please enter a valid 10-digit mobile / phone number.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid official email ID.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Quick Offer Lead (${trimmedPhone})`,
          phone: trimmedPhone,
          email: trimmedEmail,
          serviceRequired: 'Flat 25% Special Business Offer',
          budgetRange: '25% Special Offer Claimed',
          source: sourceLabel,
          honeypot: formData.honeypot,
          formStartedAt: formStartedAtRef.current,
          message: `Quick Enquiry submitted via ${sourceLabel}. Phone: ${trimmedPhone} | Email: ${trimmedEmail}`
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      window.dispatchEvent(new CustomEvent('ecreation-enquiry-submitted'));
      setLeadId(data.leadId || `EC-${Math.floor(100000 + Math.random() * 900000)}`);
      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unexpected submission error.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setFormData({
      phone: '',
      email: '',
      honeypot: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!hideTrigger && (
        <DialogTrigger
          className={`inline-flex items-center justify-center relative group rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer ${
            variant === 'vertical-tab'
              ? 'bg-stone-950 hover:bg-stone-900 text-white border-l border-y border-amber-500/50 shadow-xl px-3 py-3.5 rounded-l-2xl rounded-r-none'
              : variant === 'default'
              ? 'bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/50 shadow-md h-10 px-4 text-xs sm:text-sm'
              : 'border border-stone-200 text-stone-800 hover:bg-stone-100 h-9 px-3 text-xs'
          } ${triggerClassName}`}
          aria-label="Open Quick Project Enquiry Form"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-2 inline-block shrink-0" />
          <span>{triggerText}</span>
          <Send className="w-3.5 h-3.5 ml-1.5 text-amber-400 group-hover:translate-x-1 transition-transform duration-300" />
        </DialogTrigger>
      )}

      {/* Light-Themed Commercial E-Commerce Offer Modal — Single View, Zero Scrollbar */}
      <DialogContent className="max-w-[440px] p-0 bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EE] to-[#FDF3DC] text-stone-950 border-2 border-amber-400/90 rounded-3xl shadow-[0_25px_70px_-15px_rgba(217,119,6,0.38)] overflow-hidden">
        {/* Top Metallic 24K Gold Offer Ribbon */}
        <div className="bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#B45309] px-5 py-2.5 flex items-center gap-2 text-white shadow-xs">
          <Gift className="w-4 h-4 text-white animate-bounce shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-[0.15em] text-white">
            SPECIAL BUSINESS OFFER — FLAT 25% OFF
          </span>
        </div>

        <div className="px-6 pt-4 pb-5 space-y-3.5">
          {success ? (
            <div className="py-4 text-center space-y-3.5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-stone-950">25% Special Offer Unlocked!</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  We have saved your Phone (<strong className="text-amber-700">{formData.phone}</strong>) &amp; Email (<strong className="text-amber-700">{formData.email}</strong>). Our team will contact you shortly.
                </p>
              </div>
              <div className="px-3.5 py-2 bg-amber-100/80 rounded-xl inline-block border border-amber-300 font-mono text-xs text-amber-900">
                Voucher Ref: <span className="font-bold text-stone-950">{leadId}</span>
              </div>
              <div className="pt-1 flex items-center justify-center">
                <Button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#B45309] text-white font-bold text-xs rounded-xl px-6 h-10 cursor-pointer shadow-md"
                >
                  Done &amp; Continue
                </Button>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader className="text-left space-y-1.5">
                {/* E-Commerce Auto-Applied Coupon Pill */}
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>25% OFF + FREE 1-YR HOSTING</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border border-dashed border-emerald-400 text-emerald-800 text-[10px] font-mono font-bold">
                    <Tag className="w-2.5 h-2.5 text-emerald-600" />
                    ECREATION25
                  </span>
                </div>

                <DialogTitle className="text-2xl font-black text-stone-950 leading-tight pt-0.5">
                  Unlock Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#EA580C]">
                    25% Special Offer
                  </span>
                </DialogTitle>
                <p className="text-xs text-stone-600 leading-snug">
                  Enter your <strong className="text-stone-900">Mobile Number &amp; Email ID</strong> to instantly claim your 25% discount voucher &amp; free live project demo.
                </p>
              </DialogHeader>

              {/* 3 Commercial E-Commerce Value Badges */}
              <div className="grid grid-cols-3 gap-2">
                <div className="py-2 px-2 rounded-xl bg-white border border-amber-300/80 text-center shadow-2xs">
                  <span className="block text-xs font-black text-amber-700">25% OFF</span>
                  <span className="text-[10px] text-stone-600 font-semibold">Instant Voucher</span>
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

              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only opacity-0 absolute"
                  aria-hidden="true"
                />

                {errorMessage && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Field 1: Phone / Mobile Number */}
                <div className="space-y-1">
                  <Label htmlFor="qe-phone" className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800">
                    Mobile / Phone Number <span className="text-amber-600">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Input
                      id="qe-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your 10-digit mobile number"
                      required
                      className="h-10 pl-10 text-sm rounded-xl bg-white border-amber-300 focus:border-amber-500 text-stone-950 placeholder:text-stone-400 font-medium shadow-2xs"
                    />
                  </div>
                </div>

                {/* Field 2: Official Email ID */}
                <div className="space-y-1">
                  <Label htmlFor="qe-email" className="text-[11px] font-extrabold uppercase tracking-wider text-stone-800">
                    Email ID <span className="text-amber-600">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Input
                      id="qe-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your official email ID"
                      required
                      className="h-10 pl-10 text-sm rounded-xl bg-white border-amber-300 focus:border-amber-500 text-stone-950 placeholder:text-stone-400 font-medium shadow-2xs"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#EA580C] hover:from-[#B45309] hover:via-[#D97706] hover:to-[#C2410C] text-white font-black text-xs uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(217,119,6,0.55)] hover:shadow-[0_14px_30px_-5px_rgba(217,119,6,0.75)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1.5 animate-spin text-white" />
                      Activating Your 25% Voucher...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-1.5 fill-current" />
                      Claim 25% Special Offer &amp; Submit
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Confidential · Instant Voucher Activation</span>
                </div>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

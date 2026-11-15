'use client';

import React, { useState } from 'react';
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
  Zap
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

  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    honeypot: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    if (!trimmedPhone || trimmedPhone.replace(/\D/g, '').length < 7) {
      setErrorMessage('Please enter a valid 10-digit mobile / phone number.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email ID.');
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
          message: `Quick Enquiry submitted via ${sourceLabel}. Phone: ${trimmedPhone} | Email: ${trimmedEmail}`
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

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
          className={`inline-flex items-center justify-center relative group rounded-xl font-bold transition-all duration-200 cursor-pointer ${
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
          <Send className="w-3.5 h-3.5 ml-1.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
        </DialogTrigger>
      )}

      <DialogContent className="max-w-md p-0 bg-gradient-to-b from-[#161310] via-[#110F0D] to-[#0B0A09] text-white border-2 border-amber-400/70 rounded-3xl shadow-[0_25px_80px_-15px_rgba(245,158,11,0.45)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Glowing Gold & Sunset Offer Ribbon */}
        <div className="bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#D97706] px-5 py-2.5 flex items-center gap-2">
          <Gift className="w-4 h-4 text-white animate-bounce shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-[0.16em] text-white">
            SPECIAL BUSINESS OFFER — FLAT 25% OFF
          </span>
        </div>

        <DialogHeader className="px-6 pt-5 pb-2 text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[11px] font-extrabold w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>25% DISCOUNT + FREE 1-YEAR CLOUD HOSTING</span>
          </div>
          <DialogTitle className="text-2xl font-black text-white leading-tight">
            Quick Enquiry &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              25% Special Offer
            </span>
          </DialogTitle>
          <p className="text-xs text-stone-300 leading-relaxed">
            Enter your <strong className="text-white">Mobile Number &amp; Email ID</strong> below to unlock your Flat 25% Special Offer and free live project consultation.
          </p>
        </DialogHeader>

        <div className="px-6 pb-6 pt-2 overflow-y-auto">
          {success ? (
            <div className="py-5 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-white">25% Special Offer Activated!</h3>
                <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                  We have saved your Phone (<strong className="text-amber-300">{formData.phone}</strong>) &amp; Email (<strong className="text-amber-300">{formData.email}</strong>). Our team will reach out shortly.
                </p>
              </div>
              <div className="p-2.5 bg-white/10 rounded-xl inline-block border border-amber-400/40 font-mono text-xs text-amber-300">
                Enquiry Ref: <span className="font-bold text-white">{leadId}</span>
              </div>
              <div className="pt-2 flex items-center justify-center">
                <Button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs rounded-xl px-6 h-10 cursor-pointer"
                >
                  Done &amp; Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* 3 Value Perks */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="block text-xs font-black text-amber-400">25% OFF</span>
                  <span className="text-[10px] text-stone-300">Special Offer</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="block text-xs font-black text-amber-400">FREE</span>
                  <span className="text-[10px] text-stone-300">Live Demo</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="block text-xs font-black text-amber-400">1 YEAR</span>
                  <span className="text-[10px] text-stone-300">Free Support</span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs rounded-xl flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Field 1: Phone / Mobile Number */}
              <div className="space-y-1.5">
                <Label htmlFor="qe-phone" className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Mobile / Phone Number <span className="text-amber-400">*</span>
                </Label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input
                    id="qe-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your 10-digit mobile number"
                    required
                    className="h-11 pl-10 text-sm rounded-xl bg-white/10 border-amber-400/40 text-white placeholder:text-stone-400"
                  />
                </div>
              </div>

              {/* Field 2: Official Email ID */}
              <div className="space-y-1.5">
                <Label htmlFor="qe-email" className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Email ID <span className="text-amber-400">*</span>
                </Label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input
                    id="qe-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your official email ID"
                    required
                    className="h-11 pl-10 text-sm rounded-xl bg-white/10 border-amber-400/40 text-white placeholder:text-stone-400"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white font-black text-xs uppercase tracking-wider shadow-[0_12px_30px_-6px_rgba(234,88,12,0.65)] cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin text-white" />
                    Activating Your 25% Offer...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-1.5 fill-current" />
                    Claim 25% Special Offer &amp; Submit
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 font-medium pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Confidential · Instant Priority Callback</span>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

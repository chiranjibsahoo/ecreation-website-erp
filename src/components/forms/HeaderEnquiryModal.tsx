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
  User,
  Mail,
  MessageSquareText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
}

export const HeaderEnquiryModal: React.FC<HeaderEnquiryModalProps> = ({
  triggerClassName = '',
  triggerText = 'Quick Enquiry',
  variant = 'default',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  hideTrigger = false
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
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: 'Website Design & Web Development',
    budgetRange: 'Standard Business Package (25% OFF)',
    message: '',
    honeypot: '',
    source: 'right_nav_quick_enquiry'
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.honeypot) {
      setSuccess(true);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and project requirements.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
      name: '',
      email: '',
      phone: '',
      company: '',
      serviceRequired: 'Website Design & Web Development',
      budgetRange: 'Standard Business Package (25% OFF)',
      message: '',
      honeypot: '',
      source: 'right_nav_quick_enquiry'
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

      <DialogContent className="max-w-lg p-0 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Luxury Top Obsidian & Gold Header */}
        <DialogHeader className="p-6 bg-stone-950 text-white border-b border-stone-800 text-left space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-md shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-widest block">
                FLAT 25% LAUNCH OFFER ACTIVE
              </span>
              <DialogTitle className="text-xl font-black text-white">
                Quick Project Enquiry
              </DialogTitle>
            </div>
          </div>
          <p className="text-xs text-stone-300 pt-1 leading-relaxed">
            Share your requirements for Website Design, Office Automation ERP, SEO, or Social Media. Our team replies with a custom quote &amp; demo within 4 hours.
          </p>
        </DialogHeader>

        <div className="p-6 overflow-y-auto">
          {success ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto border border-amber-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-stone-950 dark:text-white">Enquiry Submitted!</h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-stone-950 dark:text-white">{formData.name}</span>. Our Senior Architect has received your details and will contact you shortly.
                </p>
              </div>
              <div className="p-3 bg-stone-100 dark:bg-stone-900 rounded-xl inline-block border border-stone-200 dark:border-stone-800 font-mono text-xs text-stone-600 dark:text-stone-300">
                Enquiry ID: <span className="text-amber-700 dark:text-amber-400 font-bold">{leadId}</span>
              </div>
              <div className="pt-3 flex items-center justify-center">
                <Button
                  onClick={handleReset}
                  className="bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs rounded-xl px-6 h-10"
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

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="qe-name" className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="qe-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    required
                    className="h-10 text-xs rounded-xl border-stone-200 dark:border-stone-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="qe-phone" className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Phone / Mobile Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="qe-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="h-10 text-xs rounded-xl border-stone-200 dark:border-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="qe-email" className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Business Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="qe-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className="h-10 text-xs rounded-xl border-stone-200 dark:border-stone-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="qe-service" className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Service Required
                  </Label>
                  <select
                    id="qe-service"
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-medium focus-visible:outline-hidden"
                  >
                    <option value="Website Design & Web Development">Website Design &amp; Web Development</option>
                    <option value="Office Automation & Custom ERP Software">Office Automation &amp; Custom ERP</option>
                    <option value="SEO, Social Media & Digital Marketing">SEO, Social Media &amp; Digital Marketing</option>
                    <option value="AI Chatbots & Workflow Automation">AI Chatbots &amp; Workflow Automation</option>
                    <option value="Mobile App Development (iOS & Android)">Mobile App (iOS &amp; Android)</option>
                    <option value="Complete Business Combo Package (25% OFF)">Complete Business Combo (25% OFF)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="qe-message" className="text-xs font-bold text-stone-800 dark:text-stone-200">
                  Project Details / Requirements <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="qe-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about the website, software, or marketing goals you want to achieve..."
                  required
                  className="text-xs rounded-xl resize-none border-stone-200 dark:border-stone-800"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>100% Confidential · Fast 4-Hr Response</span>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/50 rounded-xl text-xs font-bold px-6 h-11 shadow-md"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1.5 animate-spin text-amber-400" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Quick Enquiry
                      <Send className="w-3.5 h-3.5 ml-2 text-amber-400" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

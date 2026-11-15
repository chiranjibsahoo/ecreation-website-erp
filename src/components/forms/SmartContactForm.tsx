'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const SmartContactForm = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leadId, setLeadId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: 'Custom Software & Web Engineering',
    budgetRange: '$10k - $25k',
    message: '',
    // Honeypot spam prevention
    honeypot: '',
    source: 'direct'
  });

  useEffect(() => {
    // Detect marketing UTM sources or referral tags
    const utmSource = searchParams?.get('utm_source') || searchParams?.get('ref');
    if (utmSource) {
      setFormData((prev) => ({ ...prev, source: utmSource }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Spam honeypot trap
    if (formData.honeypot) {
      // Silently discard bot submission
      setSuccess(true);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid business email address.');
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
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setLeadId(data.leadId || `EC-${Math.floor(100000 + Math.random() * 900000)}`);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 shadow-lg text-center space-y-5 animate-in fade-in-50 zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Inquiry Received Successfully</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. A Senior Solutions Architect from Ecreation IT Solution will review your requirements and respond within 4 business hours.
          </p>
        </div>

        <div className="p-4 bg-muted/40 rounded-xl inline-block border border-border text-xs text-muted-foreground font-mono">
          Reference ID: <span className="text-indigo-600 font-semibold">{leadId}</span>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => {
              setSuccess(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                serviceRequired: 'Custom Software & Web Engineering',
                budgetRange: '$10k - $25k',
                message: '',
                honeypot: '',
                source: formData.source
              });
            }}
            variant="outline"
            className="text-xs"
          >
            Submit Another Project Inquiry
          </Button>
          <a
            href="mailto:contact@ecreation.in?subject=Priority%20Project%20Escalation"
            className="inline-flex"
          >
            <Button className="bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/40 text-xs font-semibold">
              Email: contact@ecreation.in
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-lg space-y-6 relative"
      noValidate
    >
      {/* Honeypot hidden input for anti-bot trap */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="sr-only opacity-0 absolute -z-10"
        aria-hidden="true"
      />

      {errorMessage && (
        <div className="p-3.5 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Johnathan Miller"
            required
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Business Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johnathan@company.com"
            required
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Phone Number (Optional)
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Contact Number"
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Company / Organization
          </Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Acme Enterprises Ltd"
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="serviceRequired" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Primary Service Required
          </Label>
          <select
            id="serviceRequired"
            name="serviceRequired"
            value={formData.serviceRequired}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="Custom Software & Web Engineering">Custom Software & Web Engineering</option>
            <option value="Enterprise ERP & Client Portals">Enterprise ERP & Client Portals</option>
            <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
            <option value="AI Solutions & Workflow Automation">AI Solutions & Workflow Automation</option>
            <option value="Mobile App Engineering (iOS & Android)">Mobile App Engineering (iOS & Android)</option>
            <option value="UI/UX Design & Product Strategy">UI/UX Design & Product Strategy</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budgetRange" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Estimated Budget Range
          </Label>
          <select
            id="budgetRange"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="Under $10,000">Under $10,000 (Small sprint / MVP)</option>
            <option value="$10k - $25k">$10,000 - $25,000 (Standard implementation)</option>
            <option value="$25k - $50k">$25,000 - $50,000 (Full-scale application)</option>
            <option value="$50,000+">$50,000+ (Enterprise ERP / Multi-quarter)</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Project Scope & Objectives <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe your business goals, target timelines, and core deliverables..."
          required
          className="rounded-xl resize-none"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Strict NDA Protection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>&lt; 4hr Response SLA</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 rounded-xl font-bold shadow-lg shadow-amber-500/25 hover:scale-[1.02] transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting Securely...
            </>
          ) : (
            <>
              Submit Project Inquiry
              <Send className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};


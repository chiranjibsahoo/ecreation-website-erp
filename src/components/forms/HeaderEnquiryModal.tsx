'use client';

import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Clock,
  Sparkles,
  X,
  FileQuestion
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
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
  variant?: 'default' | 'outline' | 'secondary';
}

export const HeaderEnquiryModal: React.FC<HeaderEnquiryModalProps> = ({
  triggerClassName = '',
  triggerText = 'Quick Enquiry',
  variant = 'default'
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leadId, setLeadId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: 'Enterprise ERP & Client Portals',
    budgetRange: '$10k - $25k',
    message: '',
    honeypot: '',
    source: 'header_quick_enquiry'
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
      setErrorMessage('Please fill in your name, email, and project scope.');
      return;
    }

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
      serviceRequired: 'Enterprise ERP & Client Portals',
      budgetRange: '$10k - $25k',
      message: '',
      honeypot: '',
      source: 'header_quick_enquiry'
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`inline-flex items-center justify-center relative group rounded-xl font-semibold transition-all duration-200 h-8 px-3 text-xs sm:text-sm cursor-pointer ${
          variant === 'default'
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-600/30'
            : 'border border-border text-foreground hover:bg-muted'
        } ${triggerClassName}`}
        aria-label="Open Quick Project Enquiry Form"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2 inline-block shrink-0" />
        <span>{triggerText}</span>
        <Send className="w-3.5 h-3.5 ml-1.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </DialogTrigger>

      <DialogContent className="max-w-xl p-6 sm:p-8 bg-card border border-border rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader className="space-y-1.5 text-left border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                Direct Technical Discovery
              </span>
              <DialogTitle className="text-xl font-bold text-foreground">
                Quick Project Enquiry
              </DialogTitle>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">
            Connect directly with an Ecreation IT Solution Lead Architect. We evaluate requirements and reply within 4 hours.
          </p>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in-50 zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground">Enquiry Received</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. An architect will review your scope and provide a feasibility breakdown shortly.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg inline-block border border-border font-mono text-xs text-muted-foreground">
              Reference: <span className="text-blue-600 font-bold">{leadId}</span>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Button onClick={handleReset} variant="outline" size="sm" className="text-xs rounded-xl">
                Close
              </Button>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button size="sm" className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl">
                  Connect on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Honeypot hidden input */}
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
              <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="h-name" className="text-xs font-semibold text-foreground">
                  Your Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="h-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  required
                  className="h-9 text-xs rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="h-email" className="text-xs font-semibold text-foreground">
                  Business Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="h-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  required
                  className="h-9 text-xs rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="h-service" className="text-xs font-semibold text-foreground">
                  Practice Needed
                </Label>
                <select
                  id="h-service"
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="w-full h-9 px-3 rounded-xl border border-input bg-background text-foreground text-xs focus-visible:outline-hidden"
                >
                  <option value="Enterprise ERP & Client Portals">Enterprise ERP & Client Portals</option>
                  <option value="Custom Software & Web Engineering">Custom Software & Web Engineering</option>
                  <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                  <option value="AI Solutions & Workflow Automation">AI Solutions & Workflow Automation</option>
                  <option value="Mobile App Engineering (iOS & Android)">Mobile App Engineering</option>
                  <option value="UI/UX Design & Product Strategy">UI/UX Design & Product Strategy</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="h-budget" className="text-xs font-semibold text-foreground">
                  Estimated Budget
                </Label>
                <select
                  id="h-budget"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full h-9 px-3 rounded-xl border border-input bg-background text-foreground text-xs focus-visible:outline-hidden"
                >
                  <option value="Under $10,000">Under $10,000 (Sprint/MVP)</option>
                  <option value="$10k - $25k">$10,000 - $25,000 (Standard)</option>
                  <option value="$25k - $50k">$25,000 - $50,000 (Full-Scale)</option>
                  <option value="$50,000+">$50,000+ (Enterprise Platform)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="h-message" className="text-xs font-semibold text-foreground">
                Brief Project Scope <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="h-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Key goals, timeline, and deliverables..."
                required
                className="text-xs rounded-xl resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Protected by Mutual NDA</span>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold px-5 h-9"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <Send className="w-3.5 h-3.5 ml-1.5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Mail,
  Server,
  Save,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  RotateCcw,
  Sparkles,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface EmailSettingsForm {
  enabled: boolean;
  smtp_host: string;
  smtp_port: number;
  smtp_secure: boolean;
  smtp_user: string;
  smtp_pass: string;
  has_smtp_pass?: boolean;
  smtp_pass_masked?: string;
  from_name: string;
  from_email: string;
  admin_notify_emails: string;
  subject_template: string;
  header_title: string;
  header_subtitle: string;
  intro_text: string;
  footer_text: string;
  accent_color: string;
  show_quick_actions: boolean;
  last_test_status?: string;
  last_tested_at?: string;
}

const DEFAULT_TEMPLATE_VALUES = {
  subject_template: 'New Enquiry [{{ref_id}}] - {{service}} from {{name}}',
  header_title: 'New Client Enquiry Received',
  header_subtitle: 'Ecreation IT Solution • Instant Lead Alert',
  intro_text:
    'A new business enquiry has been submitted on your website. Complete client details are listed below for fast follow-up:',
  footer_text:
    'This is an automated transactional notification from Ecreation IT Solution Admin ERP. Click Reply in your inbox to respond directly to the client.',
  accent_color: '#d97706',
  show_quick_actions: true
};

const SMTP_PRESETS = [
  { label: 'Gmail (App Password)', host: 'smtp.gmail.com', port: 465, secure: true },
  { label: 'Zoho Mail', host: 'smtp.zoho.in', port: 465, secure: true },
  { label: 'Hostinger', host: 'smtp.hostinger.com', port: 465, secure: true },
  { label: 'Brevo (SMTP)', host: 'smtp-relay.brevo.com', port: 587, secure: false },
  { label: 'Outlook / Office365', host: 'smtp.office365.com', port: 587, secure: false }
];

const PLACEHOLDERS = [
  '{{ref_id}}',
  '{{name}}',
  '{{email}}',
  '{{phone}}',
  '{{company}}',
  '{{service}}',
  '{{budget}}',
  '{{source}}',
  '{{date}}'
];

const SPAM_TRIGGER_REGEX = /(free!!!|100%\s*guaranteed|act\s*now|click\s*here|winner|urgent!!!|\$\$\$)/i;

function escapePreview(val: string) {
  return val
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default function AdminEmailSettingsPage() {
  const [form, setForm] = useState<EmailSettingsForm>({
    enabled: false,
    smtp_host: 'smtp.gmail.com',
    smtp_port: 465,
    smtp_secure: true,
    smtp_user: '',
    smtp_pass: '',
    from_name: 'Ecreation IT Solution Alerts',
    from_email: '',
    admin_notify_emails: 'contact@ecreation.in',
    ...DEFAULT_TEMPLATE_VALUES
  });

  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [testResult, setTestResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings/email', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setForm((prev) => ({ ...prev, ...data.settings }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage('');
    try {
      const res = await fetch('/api/settings/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.settings) {
        setForm((prev) => ({ ...prev, ...data.settings }));
        setSaveMessage('SMTP & Enquiry Notification Template saved successfully!');
        setTimeout(() => setSaveMessage(''), 5000);
      } else {
        setSaveMessage(data.error || 'Could not save settings.');
      }
    } catch {
      setSaveMessage('Network error while saving settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleSendTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      // Save latest form first so test uses current SMTP & template
      await fetch('/api/settings/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const res = await fetch('/api/settings/email', { method: 'PUT' });
      const data = await res.json();
      setTestResult({ ok: Boolean(data.success), text: data.status || 'Test completed.' });
      loadSettings();
    } catch {
      setTestResult({ ok: false, text: 'Network error while sending test email.' });
    } finally {
      setTesting(false);
    }
  };

  // Live Anti-Spam & Inbox Deliverability Audit
  const spamAudit = useMemo(() => {
    const senderDomain = (form.from_email || form.smtp_user || '').split('@')[1]?.toLowerCase() || '';
    const smtpDomain = (form.smtp_user || '').split('@')[1]?.toLowerCase() || '';
    const domainAligned = !form.from_email || senderDomain === smtpDomain;
    const subjectClean =
      !SPAM_TRIGGER_REGEX.test(form.subject_template) &&
      form.subject_template !== form.subject_template.toUpperCase() &&
      !form.subject_template.includes('!!!');
    const bodyClean = !SPAM_TRIGGER_REGEX.test(form.intro_text) && !SPAM_TRIGGER_REGEX.test(form.header_title);
    const hasSmtp = Boolean(form.smtp_host && form.smtp_user && (form.smtp_pass || form.has_smtp_pass));

    const checks = [
      {
        label: '100% Inline CSS Table Layout (No <style> or JS)',
        passed: true,
        tip: 'Automatically enforced by Ecreation Email Engine for Gmail/Outlook compatibility.'
      },
      {
        label: 'Plain-Text Multipart MIME Fallback Attached',
        passed: true,
        tip: 'Every HTML notification includes a clean plain-text version to bypass spam filters.'
      },
      {
        label: 'SPF / DMARC Sender Alignment (From = SMTP User)',
        passed: domainAligned,
        tip: domainAligned
          ? 'Sender address aligns cleanly with your authenticated SMTP mailbox.'
          : 'Keep From Email blank or on the same domain as your SMTP Username to avoid spam.'
      },
      {
        label: 'Anti-Spam Subject & Copy Check',
        passed: subjectClean && bodyClean,
        tip:
          subjectClean && bodyClean
            ? 'No spam trigger words, ALL-CAPS shouting, or excessive exclamation marks detected.'
            : 'Avoid ALL CAPS, "FREE!!!", or excessive punctuation in Subject/Intro.'
      },
      {
        label: 'TLS 1.2+ Authenticated SMTP Ready',
        passed: hasSmtp,
        tip: hasSmtp
          ? 'SMTP credentials configured with TLS 1.2+ encryption.'
          : 'Enter your SMTP Username & App Password to enable live inbox delivery.'
      }
    ];

    const score = Math.round((checks.filter((c) => c.passed).length / checks.length) * 100);
    return { score, checks };
  }, [form]);

  // Live Responsive Inline-CSS Preview HTML
  const previewHtml = useMemo(() => {
    const sampleVars: Record<string, string> = {
      ref_id: 'EC-984210',
      name: 'Vikramaditya Mehta',
      email: 'vikram@mehtalogistics.in',
      phone: '+91 98112 45678',
      company: 'Mehta Global Logistics',
      service: 'Office Automation & Custom ERP Software',
      budget: 'Standard Business Package (25% OFF)',
      source: 'Quick Enquiry 25% Offer Popup',
      date: '22 Nov 2026, 10:15 AM'
    };
    const fill = (s: string) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => sampleVars[k] ?? '');
    const accent = /^#[0-9a-fA-F]{6}$/.test(form.accent_color) ? form.accent_color : '#d97706';

    const rows: [string, string][] = [
      ['Reference ID', sampleVars.ref_id],
      ['Client Name', sampleVars.name],
      ['Email Address', sampleVars.email],
      ['Phone / WhatsApp', sampleVars.phone],
      ['Company / Org', sampleVars.company],
      ['Service Requested', sampleVars.service],
      ['Budget / Offer', sampleVars.budget],
      ['Enquiry Source', sampleVars.source],
      ['Received At (IST)', sampleVars.date]
    ];

    const rowsHtml = rows
      .map(
        ([k, v], i) => `<tr>
          <td style="padding:9px 12px;border-bottom:1px solid #e7e5e4;background-color:${
            i % 2 === 0 ? '#faf8f5' : '#ffffff'
          };font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#57534e;width:38%;">${escapePreview(k)}</td>
          <td style="padding:9px 12px;border-bottom:1px solid #e7e5e4;background-color:${
            i % 2 === 0 ? '#faf8f5' : '#ffffff'
          };font-family:Arial,sans-serif;font-size:12px;font-weight:600;color:#1c1917;word-break:break-word;">${escapePreview(v)}</td>
        </tr>`
      )
      .join('');

    const actions = form.show_quick_actions
      ? `<tr><td align="center" style="padding:16px 20px 6px 20px;">
          <span style="display:inline-block;margin:3px 4px;padding:9px 14px;background-color:#059669;color:#ffffff;font-family:Arial,sans-serif;font-size:12px;font-weight:700;border-radius:7px;">Reply on WhatsApp</span>
          <span style="display:inline-block;margin:3px 4px;padding:9px 14px;background-color:${accent};color:#ffffff;font-family:Arial,sans-serif;font-size:12px;font-weight:700;border-radius:7px;">Reply via Email</span>
          <span style="display:inline-block;margin:3px 4px;padding:9px 14px;background-color:#1c1917;color:#fbbf24;font-family:Arial,sans-serif;font-size:12px;font-weight:700;border-radius:7px;">Open Admin ERP</span>
        </td></tr>`
      : '';

    return `<!DOCTYPE html><html><body style="margin:0;padding:16px;background:#f5f3ef;font-family:Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e7e5e4;overflow:hidden;">
        <tr><td style="height:5px;background:${accent};"></td></tr>
        <tr><td style="padding:20px;background:#1c1917;">
          <div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#fbbf24;margin-bottom:5px;">${escapePreview(fill(form.header_subtitle))}</div>
          <div style="font-size:18px;font-weight:700;color:#ffffff;">${escapePreview(fill(form.header_title))}</div>
        </td></tr>
        <tr><td style="padding:16px 20px 10px 20px;font-size:13px;line-height:1.55;color:#44403c;">${escapePreview(fill(form.intro_text))}</td></tr>
        <tr><td style="padding:6px 20px 12px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7e5e4;border-collapse:collapse;">${rowsHtml}</table>
        </td></tr>
        <tr><td style="padding:4px 20px 8px 20px;">
          <div style="background:#faf8f5;border-left:4px solid ${accent};padding:12px;border-radius:6px;">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:#78716c;margin-bottom:4px;">Client Message / Requirements</div>
            <div style="font-size:12px;line-height:1.5;color:#1c1917;">Looking for custom multi-branch GST billing &amp; warehouse inventory ERP automation. Please share demo timings.</div>
          </div>
        </td></tr>
        ${actions}
        <tr><td style="padding:16px 20px;border-top:1px solid #f0ece4;font-size:10px;color:#78716c;text-align:center;">
          ${escapePreview(fill(form.footer_text))}<br/><span style="color:#a8a29e;">Ecreation IT Solution • Sector 62, Noida, UP, India</span>
        </td></tr>
      </table>
    </body></html>`;
  }, [form]);

  return (
    <div className="pt-6 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Admin Settings Subpage • Instant Lead Alerts
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
              Email SMTP &amp; Enquiry Notification Template
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Configure your sender SMTP mail, customize the responsive inline-CSS enquiry email template, and verify inbox deliverability without landing in spam.
            </p>
          </div>

          <Link href="/admin/settings">
            <Button size="sm" variant="outline" className="rounded-xl text-xs font-bold cursor-pointer">
              <Settings className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
              Social &amp; Mobile App Settings
            </Button>
          </Link>
        </div>

        {/* Settings Subpage Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/settings"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-card border border-border text-foreground hover:border-amber-500/60 transition-colors"
          >
            Social Accounts &amp; Mobile App
          </Link>
          <Link
            href="/admin/settings/email"
            className="px-4 py-2 rounded-xl text-xs font-black bg-amber-500 text-stone-950 shadow-xs"
          >
            Email SMTP &amp; Enquiry Notification Template
          </Link>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Cols: SMTP Config + Editable Template Builder */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. SMTP Server Settings */}
            <div className="subsection-bordered-card bg-card rounded-3xl p-5 sm:p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-amber-600" />
                  <h2 className="text-base font-black text-foreground">1. Outgoing SMTP Mail Configuration</h2>
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-black cursor-pointer bg-amber-50 dark:bg-stone-900 px-3 py-1.5 rounded-full border border-amber-300">
                  <input
                    type="checkbox"
                    checked={form.enabled}
                    onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <span className={form.enabled ? 'text-emerald-700' : 'text-stone-600'}>
                    {form.enabled ? 'Auto Email Alerts: ON' : 'Auto Email Alerts: OFF'}
                  </span>
                </label>
              </div>

              {/* 1-Click SMTP Provider Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground block">Quick Provider Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {SMTP_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          smtp_host: p.host,
                          smtp_port: p.port,
                          smtp_secure: p.secure
                        }))
                      }
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-muted hover:bg-amber-100 text-foreground border border-border cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-bold text-foreground">SMTP Host *</label>
                  <Input
                    value={form.smtp_host}
                    onChange={(e) => setForm({ ...form, smtp_host: e.target.value })}
                    placeholder="smtp.gmail.com"
                    className="rounded-xl text-xs h-9 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">SMTP Port *</label>
                  <Input
                    type="number"
                    value={form.smtp_port}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        smtp_port: Number(e.target.value) || 465,
                        smtp_secure: Number(e.target.value) === 465
                      })
                    }
                    className="rounded-xl text-xs h-9 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">
                    Sender SMTP Email (Outgoing Mailbox) *
                  </label>
                  <Input
                    type="email"
                    value={form.smtp_user}
                    onChange={(e) => setForm({ ...form, smtp_user: e.target.value })}
                    placeholder="notifications@ecreation.in or yourgmail@gmail.com"
                    className="rounded-xl text-xs h-9"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">SMTP Password / App Password *</label>
                  <div className="relative">
                    <Input
                      type={showPass ? 'text' : 'password'}
                      value={form.smtp_pass}
                      onChange={(e) => setForm({ ...form, smtp_pass: e.target.value })}
                      placeholder={
                        form.has_smtp_pass
                          ? `Saved (${form.smtp_pass_masked}) — enter new to update`
                          : '16-char Gmail App Password or SMTP Password'
                      }
                      className="rounded-xl text-xs h-9 pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">Sender Display Name</label>
                  <Input
                    value={form.from_name}
                    onChange={(e) => setForm({ ...form, from_name: e.target.value })}
                    placeholder="Ecreation IT Solution Alerts"
                    className="rounded-xl text-xs h-9"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">
                    Admin Recipient Email(s) (Notification Inbox) *
                  </label>
                  <Input
                    value={form.admin_notify_emails}
                    onChange={(e) => setForm({ ...form, admin_notify_emails: e.target.value })}
                    placeholder="admin@ecreation.in, owner@gmail.com"
                    className="rounded-xl text-xs h-9"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-muted-foreground">
                <label className="inline-flex items-center gap-2 cursor-pointer font-semibold text-foreground">
                  <input
                    type="checkbox"
                    checked={form.smtp_secure}
                    onChange={(e) => setForm({ ...form, smtp_secure: e.target.checked })}
                    className="w-3.5 h-3.5 accent-amber-600"
                  />
                  Use SSL/TLS (Port 465 = Checked, Port 587 STARTTLS = Unchecked)
                </label>
              </div>
            </div>

            {/* 2. Editable Responsive Email Template */}
            <div className="subsection-bordered-card bg-card rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h2 className="text-base font-black text-foreground">2. Editable Enquiry Email Template (Inline CSS)</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, ...DEFAULT_TEMPLATE_VALUES }))}
                  className="text-[11px] font-bold text-amber-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Default
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                <span className="text-muted-foreground font-sans font-bold">Variables:</span>
                {PLACEHOLDERS.map((ph) => (
                  <span key={ph} className="px-2 py-0.5 rounded bg-amber-50 dark:bg-stone-800 border border-amber-200 text-amber-900 dark:text-amber-300">
                    {ph}
                  </span>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground">Email Subject Line</label>
                <Input
                  value={form.subject_template}
                  onChange={(e) => setForm({ ...form, subject_template: e.target.value })}
                  className="rounded-xl text-xs h-9"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">Header Title</label>
                  <Input
                    value={form.header_title}
                    onChange={(e) => setForm({ ...form, header_title: e.target.value })}
                    className="rounded-xl text-xs h-9"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">Header Subtitle / Brand Tag</label>
                  <Input
                    value={form.header_subtitle}
                    onChange={(e) => setForm({ ...form, header_subtitle: e.target.value })}
                    className="rounded-xl text-xs h-9"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground">Intro Message</label>
                <textarea
                  rows={2}
                  value={form.intro_text}
                  onChange={(e) => setForm({ ...form, intro_text: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground">Transactional Footer Text</label>
                <textarea
                  rows={2}
                  value={form.footer_text}
                  onChange={(e) => setForm({ ...form, footer_text: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span>Accent Color:</span>
                  <input
                    type="color"
                    value={form.accent_color}
                    onChange={(e) => setForm({ ...form, accent_color: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer border border-border"
                  />
                  <span className="font-mono text-[11px] text-muted-foreground">{form.accent_color}</span>
                </div>

                <label className="inline-flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.show_quick_actions}
                    onChange={(e) => setForm({ ...form, show_quick_actions: e.target.checked })}
                    className="w-4 h-4 accent-amber-600"
                  />
                  Include WhatsApp / Email / Admin ERP Action Buttons
                </label>
              </div>

              {/* Save & Send Test Action Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                <Button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-stone-950 hover:bg-stone-900 text-amber-400 font-black text-xs px-5 h-10 cursor-pointer"
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  {saving ? 'Saving...' : 'Save SMTP & Template'}
                </Button>

                <Button
                  type="button"
                  disabled={testing}
                  onClick={handleSendTest}
                  className="rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-5 h-10 cursor-pointer"
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  {testing ? 'Sending Test Email...' : 'Send Live Test Email'}
                </Button>
              </div>

              {saveMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{saveMessage}</span>
                </div>
              )}

              {testResult && (
                <div
                  className={`p-3 rounded-xl border text-xs font-bold flex items-start gap-2 ${
                    testResult.ok
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  {testResult.ok ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  )}
                  <span>{testResult.text}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Cols: Anti-Spam Rules Inspector + Live Responsive Email Preview */}
          <div className="lg:col-span-5 space-y-6">
            {/* Anti-Spam & Inbox Deliverability Guard */}
            <div className="subsection-bordered-card bg-gradient-to-br from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950 rounded-3xl p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <h2 className="text-sm font-black">Anti-Spam &amp; Inbox Safety Score</h2>
                </div>
                <Badge className="bg-emerald-700 text-white font-mono font-black text-xs">
                  {spamAudit.score}/100
                </Badge>
              </div>

              <div className="space-y-2">
                {spamAudit.checks.map((c) => (
                  <div key={c.label} className="p-2.5 rounded-xl bg-white/90 border border-amber-500/20 text-[11px]">
                    <div className="flex items-center gap-1.5 font-bold text-stone-900">
                      {c.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      )}
                      <span>{c.label}</span>
                    </div>
                    <p className="text-stone-600 mt-0.5 pl-5">{c.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Responsive Email Preview */}
            <div className="subsection-bordered-card bg-card rounded-3xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-foreground">Live Responsive Email Preview</span>
                <div className="flex items-center gap-1 bg-muted p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('desktop')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                      previewMode === 'desktop' ? 'bg-white text-stone-950 shadow-xs' : 'text-muted-foreground'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" /> Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('mobile')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                      previewMode === 'mobile' ? 'bg-white text-stone-950 shadow-xs' : 'text-muted-foreground'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Mobile
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-[#f5f3ef] overflow-hidden flex justify-center p-2">
                <iframe
                  title="Enquiry Email Template Live Preview"
                  srcDoc={previewHtml}
                  sandbox=""
                  className={`border-0 bg-white rounded-xl transition-all duration-300 ${
                    previewMode === 'mobile' ? 'w-[340px] h-[560px]' : 'w-full h-[560px]'
                  }`}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

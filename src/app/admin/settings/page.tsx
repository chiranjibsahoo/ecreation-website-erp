'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Settings,
  CheckCircle2,
  Eye,
  EyeOff,
  Save,
  Zap,
  Smartphone,
  Download,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Unplug,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { APP_VERSION, APK_VERSION, APP_BUILD_DATE, APK_DOWNLOAD_PATH, APP_RELEASE_NOTES } from '@/lib/appVersion';

interface SocialAccountRow {
  platform: 'instagram' | 'youtube' | 'facebook' | 'linkedin' | 'x' | 'google_flow';
  display_name: string;
  account_handle: string;
  account_id: string;
  page_or_channel_id: string;
  credential_secret: string;
  credential_secret_masked?: string;
  has_secret?: boolean;
  webhook_url: string;
  is_connected: boolean;
  auto_share_enabled: boolean;
  last_status: string;
  last_tested_at?: string;
}

const PLATFORM_HELP: Record<string, { idLabel: string; secretLabel: string; pageLabel: string; hint: string }> = {
  instagram: {
    idLabel: 'Instagram Username / Email ID',
    secretLabel: 'Meta Graph Access Token / App Password',
    pageLabel: 'Instagram Business Account ID',
    hint: 'Connect via Meta Business Graph Token (starts with EAA...) for unattended auto-upload, or save account handle + webhook for Make/Zapier & 1-Tap Mobile Share.'
  },
  youtube: {
    idLabel: 'YouTube Google Email / Handle (@channel)',
    secretLabel: 'YouTube Data API OAuth Token / App Secret',
    pageLabel: 'YouTube Channel ID (UC...)',
    hint: 'Connect your YouTube Channel ID + OAuth Token or Make/n8n Webhook URL so Google Flow videos auto-upload directly to YouTube Shorts.'
  },
  facebook: {
    idLabel: 'Facebook Business Email / Page Handle',
    secretLabel: 'Facebook Page Access Token / App Password',
    pageLabel: 'Facebook Page ID',
    hint: 'Enter your Facebook Page ID & Page Access Token (EAA...) to publish videos, creatives & captions live to your Facebook Page automatically.'
  },
  linkedin: {
    idLabel: 'LinkedIn Company Email / Handle',
    secretLabel: 'LinkedIn Access Token / Password',
    pageLabel: 'Organization URN / Page ID',
    hint: 'Connect LinkedIn Company Page credentials or Automation Webhook for B2B lead promotion.'
  },
  x: {
    idLabel: 'X (Twitter) Handle (@ecreation_it)',
    secretLabel: 'X API Bearer Token / App Secret',
    pageLabel: 'X Account ID',
    hint: 'Save X account handle & API credentials or webhook for instant tech announcement sharing.'
  },
  google_flow: {
    idLabel: 'Google Flow Account Email',
    secretLabel: 'Google Labs / Gemini API Key (Optional)',
    pageLabel: 'Workspace / Project ID',
    hint: 'Links your Google Flow workspace (labs.google/fx/tools/flow) to the Ecreation Social Promotion Studio.'
  }
};

export default function AdminSettingsPage() {
  const [accounts, setAccounts] = useState<SocialAccountRow[]>([]);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [savingPlatform, setSavingPlatform] = useState<string | null>(null);
  const [testingPlatform, setTestingPlatform] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [syncInterval, setSyncInterval] = useState<string>('30');

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/social/settings', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.accounts)) {
          setAccounts(data.accounts);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadSettings();
    if (typeof window !== 'undefined') {
      setSyncInterval(localStorage.getItem('ecreation_sync_interval') || '30');
    }
  }, [loadSettings]);

  const updateField = (platform: string, field: keyof SocialAccountRow, value: string | boolean) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.platform === platform ? { ...acc, [field]: value } : acc))
    );
  };

  const handleSaveAccount = async (acc: SocialAccountRow, disconnect = false) => {
    setSavingPlatform(acc.platform);
    setFeedback((prev) => ({ ...prev, [acc.platform]: '' }));
    try {
      const res = await fetch('/api/social/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: acc.platform,
          account_handle: acc.account_handle,
          account_id: acc.account_id,
          page_or_channel_id: acc.page_or_channel_id,
          credential_secret: acc.credential_secret,
          webhook_url: acc.webhook_url,
          auto_share_enabled: acc.auto_share_enabled,
          disconnect
        })
      });
      const data = await res.json();
      if (res.ok && data.account) {
        setAccounts((prev) =>
          prev.map((row) => (row.platform === acc.platform ? data.account : row))
        );
        setFeedback((prev) => ({
          ...prev,
          [acc.platform]: disconnect
            ? 'Disconnected and cleared.'
            : 'Saved & Connected! Auto-Share is active on Web & Mobile App.'
        }));
      }
    } catch (err) {
      console.error(err);
      setFeedback((prev) => ({ ...prev, [acc.platform]: 'Failed to save settings.' }));
    } finally {
      setSavingPlatform(null);
    }
  };

  const handleTestConnection = async (platform: string) => {
    setTestingPlatform(platform);
    try {
      const res = await fetch('/api/social/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform })
      });
      const data = await res.json();
      setFeedback((prev) => ({ ...prev, [platform]: data.status || 'Connection checked.' }));
      loadSettings();
    } catch {
      setFeedback((prev) => ({ ...prev, [platform]: 'Test failed — check network.' }));
    } finally {
      setTestingPlatform(null);
    }
  };

  const handleSaveSyncInterval = (val: string) => {
    setSyncInterval(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecreation_sync_interval', val);
    }
  };

  return (
    <div className="pt-6 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Centralized Social Connections &amp; Mobile App Control
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
              Social Accounts &amp; App Settings
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Save your Instagram, YouTube, Facebook, LinkedIn &amp; Google Flow accounts once — your Mobile App &amp; Promotion Studio automatically sync and share to all connected accounts.
            </p>
          </div>

          <Link href="/admin/social-studio">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-black cursor-pointer">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Open Social Promotion Studio
            </Button>
          </Link>
        </div>

        {/* Settings Subpage Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/settings"
            className="px-4 py-2 rounded-xl text-xs font-black bg-amber-500 text-stone-950 shadow-xs"
          >
            Social Accounts &amp; Mobile App
          </Link>
          <Link
            href="/admin/settings/email"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-card border border-border text-foreground hover:border-amber-500/60 transition-colors"
          >
            Email SMTP &amp; Enquiry Notification Template
          </Link>
        </div>

        {/* Mobile App (.APK + PWA) & OTA Auto-Update Panel */}
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950 p-6 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-emerald-800 text-[11px] font-mono font-black border border-emerald-200">
                  <Smartphone className="w-3.5 h-3.5" />
                  Admin Mobile App v{APP_VERSION} (APK v{APK_VERSION})
                </span>
                <span className="text-xs font-mono text-stone-600">Build: {APP_BUILD_DATE}</span>
              </div>
              <h2 className="text-lg font-black text-stone-950">
                Installable Android .APK &amp; PWA with Live Auto-Update + Auto-Sync
              </h2>
              <p className="text-xs text-stone-700 max-w-2xl">
                Because the Android .APK and PWA sync directly with your live cloud ERP, every future feature update or UI change automatically appears inside your installed mobile app without rebuilding or reinstalling.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a href={APK_DOWNLOAD_PATH} download={`Ecreation-Admin-ERP-v${APK_VERSION}.apk`}>
                <Button className="rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold cursor-pointer">
                  <Download className="w-4 h-4 mr-1.5" />
                  Download Android .APK
                </Button>
              </a>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-amber-500/30 text-xs font-bold">
                <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                <span>Auto-Sync:</span>
                <select
                  value={syncInterval}
                  onChange={(e) => handleSaveSyncInterval(e.target.value)}
                  className="bg-transparent font-mono font-black text-emerald-800 focus:outline-none"
                >
                  <option value="15">15 sec</option>
                  <option value="30">30 sec</option>
                  <option value="60">60 sec</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pt-3 border-t border-amber-500/25">
            {APP_RELEASE_NOTES.map((note) => (
              <div key={note} className="flex items-start gap-2 text-[11px] text-stone-800 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Accounts Configuration Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-foreground flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-600" />
              Connected Social Media Accounts
            </h2>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Encrypted server-side storage (masked in UI)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {accounts.map((acc) => {
              const help = PLATFORM_HELP[acc.platform] || PLATFORM_HELP.instagram;
              const isSaving = savingPlatform === acc.platform;
              const isTesting = testingPlatform === acc.platform;
              const showSec = !!showSecrets[acc.platform];

              return (
                <div
                  key={acc.platform}
                  className="subsection-bordered-card bg-card rounded-3xl p-5 sm:p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Platform Card Header */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-border">
                      <div>
                        <h3 className="text-base font-black text-foreground">{acc.display_name}</h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{acc.last_status}</p>
                      </div>
                      <Badge
                        className={
                          acc.is_connected
                            ? 'bg-emerald-500/15 text-emerald-700 border-emerald-300 text-[10px]'
                            : 'bg-stone-100 text-stone-600 text-[10px]'
                        }
                      >
                        {acc.is_connected ? 'Connected' : 'Not Connected'}
                      </Badge>
                    </div>

                    {/* Credential Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-foreground">{help.idLabel}</label>
                        <Input
                          value={acc.account_id}
                          onChange={(e) => updateField(acc.platform, 'account_id', e.target.value)}
                          placeholder="e.g. ecreation.official@gmail.com"
                          className="rounded-xl text-xs h-9"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-foreground">Account Handle / Name</label>
                        <Input
                          value={acc.account_handle}
                          onChange={(e) => updateField(acc.platform, 'account_handle', e.target.value)}
                          placeholder="e.g. @ecreation_it"
                          className="rounded-xl text-xs h-9"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-foreground">{help.secretLabel}</label>
                        <div className="relative">
                          <Input
                            type={showSec ? 'text' : 'password'}
                            value={acc.credential_secret}
                            onChange={(e) => updateField(acc.platform, 'credential_secret', e.target.value)}
                            placeholder={
                              acc.has_secret
                                ? `Saved (${acc.credential_secret_masked}) — enter new to replace`
                                : 'Enter Access Token / Password / API Key'
                            }
                            className="rounded-xl text-xs h-9 pr-9"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowSecrets((prev) => ({ ...prev, [acc.platform]: !prev[acc.platform] }))
                            }
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showSec ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-foreground">{help.pageLabel}</label>
                        <Input
                          value={acc.page_or_channel_id}
                          onChange={(e) => updateField(acc.platform, 'page_or_channel_id', e.target.value)}
                          placeholder="Optional Page / Business / Channel ID"
                          className="rounded-xl text-xs h-9"
                        />
                      </div>
                    </div>

                    {/* Optional Make.com / Zapier / n8n Webhook URL */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-foreground">
                        Auto-Upload Webhook URL (Optional — Make.com / Zapier / n8n)
                      </label>
                      <Input
                        value={acc.webhook_url}
                        onChange={(e) => updateField(acc.platform, 'webhook_url', e.target.value)}
                        placeholder="https://hook.eu2.make.com/..."
                        className="rounded-xl text-xs h-9 font-mono"
                      />
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed bg-muted/40 p-2.5 rounded-xl">
                      {help.hint}
                    </p>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="space-y-2.5 pt-3 border-t border-border">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="inline-flex items-center gap-2 text-xs font-bold text-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acc.auto_share_enabled}
                          onChange={(e) => updateField(acc.platform, 'auto_share_enabled', e.target.checked)}
                          className="w-4 h-4 rounded accent-amber-600"
                        />
                        <span>Auto-Share Enabled</span>
                      </label>

                      <div className="flex flex-wrap items-center gap-2">
                        {acc.is_connected && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            disabled={isTesting}
                            onClick={() => handleTestConnection(acc.platform)}
                            className="h-8 rounded-xl text-[11px] font-bold cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5 mr-1 text-amber-600" />
                            {isTesting ? 'Testing...' : 'Test'}
                          </Button>
                        )}
                        {acc.is_connected && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            disabled={isSaving}
                            onClick={() => handleSaveAccount(acc, true)}
                            className="h-8 rounded-xl text-[11px] font-bold text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                          >
                            <Unplug className="w-3.5 h-3.5 mr-1" />
                            Disconnect
                          </Button>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          disabled={isSaving}
                          onClick={() => handleSaveAccount(acc, false)}
                          className="h-8 px-3.5 rounded-xl bg-stone-950 hover:bg-stone-900 text-amber-400 text-[11px] font-black cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5 mr-1.5" />
                          {isSaving ? 'Saving...' : 'Save & Connect'}
                        </Button>
                      </div>
                    </div>

                    {feedback[acc.platform] && (
                      <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5">
                        {feedback[acc.platform]}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

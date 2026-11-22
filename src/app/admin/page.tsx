'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  Layers,
  FileText,
  ArrowUpRight,
  ShieldCheck,
  Bot,
  MessageSquare,
  Gift,
  TrendingUp,
  BarChart3,
  Download,
  Smartphone,
  Sparkles,
  Settings,
  CheckCircle2,
  Clock,
  Share2,
  PhoneCall
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SERVICES_DATA, PROJECTS_DATA, BLOG_POSTS_DATA } from '@/lib/data/seedData';
import { APP_VERSION, APK_DOWNLOAD_PATH } from '@/lib/appVersion';
import { Lead } from '@/types';

interface SocialPostSummary {
  id: string;
  title: string;
  platforms: string[];
  status: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [chatCount, setChatCount] = useState<number>(0);
  const [socialPosts, setSocialPosts] = useState<SocialPostSummary[]>([]);
  const [connectedSocialCount, setConnectedSocialCount] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const isChatbotLead = (source?: string) => {
    if (!source) return false;
    const lower = source.toLowerCase();
    return lower.includes('ai assistant') || lower.includes('chatbot');
  };

  const isOfferPopupLead = (source?: string) => {
    if (!source) return false;
    const lower = source.toLowerCase();
    return lower.includes('popup') || lower.includes('exit-intent') || lower.includes('offer');
  };

  const isEngagedIdleLead = (source?: string) => {
    if (!source) return false;
    const lower = source.toLowerCase();
    return lower.includes('1-2 min') || lower.includes('engaged visitor');
  };

  const loadDashboardData = useCallback(async () => {
    try {
      const [leadsRes, chatsRes, postsRes, settingsRes] = await Promise.allSettled([
        fetch('/api/leads', { cache: 'no-store' }),
        fetch('/api/chat-logs', { cache: 'no-store' }),
        fetch('/api/social/publish', { cache: 'no-store' }),
        fetch('/api/social/settings', { cache: 'no-store' })
      ]);

      if (leadsRes.status === 'fulfilled' && leadsRes.value.ok) {
        const data = await leadsRes.value.json();
        if (Array.isArray(data.leads)) {
          const normalized = data.leads.map((l: Record<string, unknown>) => ({
            id: String(l.id || ''),
            name: String(l.name || ''),
            email: String(l.email || ''),
            phone: l.phone ? String(l.phone) : undefined,
            company: l.company ? String(l.company) : undefined,
            serviceRequired: String(l.service_required || l.serviceRequired || ''),
            budgetRange: l.budget_range || l.budgetRange ? String(l.budget_range || l.budgetRange) : undefined,
            message: String(l.message || ''),
            source: String(l.source || 'direct'),
            status: (l.status as Lead['status']) || 'new',
            createdAt: String(l.created_at || l.createdAt || '')
          }));
          setLeads(normalized);
        }
      }

      if (chatsRes.status === 'fulfilled' && chatsRes.value.ok) {
        const data = await chatsRes.value.json();
        if (Array.isArray(data.sessions)) {
          setChatCount(data.sessions.length);
        }
      }

      if (postsRes.status === 'fulfilled' && postsRes.value.ok) {
        const data = await postsRes.value.json();
        if (Array.isArray(data.posts)) {
          setSocialPosts(data.posts);
        }
      }

      if (settingsRes.status === 'fulfilled' && settingsRes.value.ok) {
        const data = await settingsRes.value.json();
        if (Array.isArray(data.accounts)) {
          setConnectedSocialCount(
            data.accounts.filter((a: { is_connected?: boolean }) => a.is_connected).length
          );
        }
      }

      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
    const handleSync = () => loadDashboardData();
    window.addEventListener('ecreation:admin-sync', handleSync);
    return () => window.removeEventListener('ecreation:admin-sync', handleSync);
  }, [loadDashboardData]);

  const updateStatus = async (id: string, newStatus: Lead['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    try {
      await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Analytics Calculations
  const totalLeads = leads.length;
  const newCount = leads.filter((l) => l.status === 'new').length;
  const contactedCount = leads.filter((l) => l.status === 'contacted').length;
  const qualifiedCount = leads.filter((l) => l.status === 'qualified').length;
  const convertedCount = leads.filter((l) => l.status === 'converted').length;
  const conversionRate = totalLeads > 0 ? Math.round(((qualifiedCount + convertedCount) / totalLeads) * 100) : 0;

  const botLeadsCount = leads.filter((l) => isChatbotLead(l.source)).length;
  const offerPopupLeadsCount = leads.filter((l) => isOfferPopupLead(l.source)).length;
  const directLeadsCount = Math.max(0, totalLeads - botLeadsCount - offerPopupLeadsCount);

  const exportAnalyticsReport = () => {
    const lines = [
      ['Ecreation IT Solution — Live ERP Analytics Report'],
      [`Generated At: ${new Date().toISOString()}`, `App Version: v${APP_VERSION}`],
      [],
      ['METRIC', 'VALUE'],
      ['Total Inbound Enquiries', String(totalLeads)],
      ['New / Pending Action', String(newCount)],
      ['Contacted', String(contactedCount)],
      ['Qualified', String(qualifiedCount)],
      ['Converted', String(convertedCount)],
      ['Qualification + Conversion Rate', `${conversionRate}%`],
      ['AI Chatbot Leads', String(botLeadsCount)],
      ['25% Offer Popup Leads', String(offerPopupLeadsCount)],
      ['Direct / Organic / Campaign Leads', String(directLeadsCount)],
      ['AI Assistant Chat Sessions', String(chatCount)],
      ['Social Campaigns Published', String(socialPosts.length)],
      ['Connected Social Accounts', String(connectedSocialCount)],
      [],
      ['REF ID', 'NAME', 'EMAIL', 'PHONE', 'SERVICE', 'SOURCE', 'STATUS', 'DATE'],
      ...leads.map((l) => [
        l.id,
        `"${l.name}"`,
        l.email,
        l.phone || '',
        `"${l.serviceRequired}"`,
        `"${l.source}"`,
        l.status,
        l.createdAt
      ])
    ];
    const csv = 'data:text/csv;charset=utf-8,' + lines.map((r) => r.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `ecreation-analytics-report-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = [
    {
      label: 'Total Enquiries',
      value: `${totalLeads}`,
      sub: `${newCount} new pending reply`,
      icon: Users,
      accent: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40'
    },
    {
      label: 'Conversion & Pipeline',
      value: `${conversionRate}%`,
      sub: `${qualifiedCount} qualified • ${convertedCount} won`,
      icon: TrendingUp,
      accent: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      label: 'AI Chat Sessions',
      value: `${chatCount}`,
      sub: `${botLeadsCount} bot leads captured`,
      icon: Bot,
      accent: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40'
    },
    {
      label: 'Social Promotion Hub',
      value: `${socialPosts.length}`,
      sub: `${connectedSocialCount} accounts connected`,
      icon: Share2,
      accent: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40'
    }
  ];

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30">New</Badge>;
      case 'contacted':
        return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">Contacted</Badge>;
      case 'qualified':
        return <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">Qualified</Badge>;
      case 'converted':
        return <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">Converted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const funnelStages = [
    { label: 'New Enquiries', count: newCount, color: 'bg-amber-500' },
    { label: 'Contacted', count: contactedCount, color: 'bg-blue-500' },
    { label: 'Qualified', count: qualifiedCount, color: 'bg-emerald-500' },
    { label: 'Converted', count: convertedCount, color: 'bg-purple-600' }
  ];

  const sourceChannels = [
    { label: '25% Offer Popups', count: offerPopupLeadsCount, color: 'bg-orange-500' },
    { label: 'AI Assistant Chatbot', count: botLeadsCount, color: 'bg-amber-500' },
    { label: 'Organic / Direct / Ads', count: directLeadsCount, color: 'bg-emerald-600' }
  ];

  return (
    <div className="pt-6 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Overview Dashboard &amp; Live Reports {lastUpdated ? `• Synced ${lastUpdated}` : ''}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
              Admin Operations &amp; Promotion Center
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Live mobile-synced enquiries, instant reply CRM, analytics reports &amp; Google Flow social auto-uploader.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              size="sm"
              variant="outline"
              onClick={exportAnalyticsReport}
              className="rounded-xl text-xs font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
              Export Report (CSV)
            </Button>
            <Link href="/admin/social-studio">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-black cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Create &amp; Auto-Share Promo
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="subsection-bordered-card bg-card p-5 rounded-2xl shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-bold text-muted-foreground">{s.label}</span>
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.accent}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-foreground">{s.value}</div>
                <p className="text-[11px] text-muted-foreground font-medium">{s.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Reports & Analytics Visual Grid + Mobile App Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Funnel & Pipeline Report */}
          <div className="subsection-bordered-card bg-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                <h2 className="text-sm font-extrabold text-foreground">Enquiry Pipeline Funnel</h2>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                LIVE SYNC
              </span>
            </div>

            <div className="space-y-3">
              {funnelStages.map((stage) => {
                const pct = totalLeads > 0 ? Math.round((stage.count / totalLeads) * 100) : 0;
                return (
                  <div key={stage.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">{stage.label}</span>
                      <span className="font-mono font-bold text-muted-foreground">
                        {stage.count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                        style={{ width: `${Math.max(pct, stage.count > 0 ? 8 : 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lead Sources Breakdown */}
          <div className="subsection-bordered-card bg-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-extrabold text-foreground">Lead Source Analytics</h2>
              </div>
              <Link href="/admin/leads" className="text-[11px] font-bold text-amber-700 hover:underline">
                Open CRM →
              </Link>
            </div>

            <div className="space-y-3">
              {sourceChannels.map((ch) => {
                const pct = totalLeads > 0 ? Math.round((ch.count / totalLeads) * 100) : 0;
                return (
                  <div key={ch.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">{ch.label}</span>
                      <span className="font-mono font-bold text-muted-foreground">
                        {ch.count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${ch.color} transition-all duration-500`}
                        style={{ width: `${Math.max(pct, ch.count > 0 ? 8 : 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Catalog: {SERVICES_DATA.length} Services • {PROJECTS_DATA.length} Projects</span>
              <span>{BLOG_POSTS_DATA.length} Blogs</span>
            </div>
          </div>

          {/* Mobile App (APK + PWA) OTA Auto-Update Card */}
          <div className="subsection-bordered-card bg-gradient-to-br from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950 p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-white text-emerald-800 border border-emerald-200">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  Mobile App v{APP_VERSION}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  OTA Auto-Update
                </span>
              </div>
              <h2 className="text-base font-black text-stone-950">
                Ecreation Admin Android .APK &amp; PWA
              </h2>
              <p className="text-xs text-stone-700 leading-relaxed">
                Install once on your phone. Any code or feature update auto-syncs live inside the app without reinstalling! Reply to enquiries &amp; auto-upload Google Flow videos on the go.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a href={APK_DOWNLOAD_PATH} download={`Ecreation-Admin-ERP-v${APP_VERSION}.apk`} className="flex-1">
                <Button size="sm" className="w-full rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold cursor-pointer">
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Download .APK
                </Button>
              </a>
              <Link href="/admin/settings" className="flex-1">
                <Button size="sm" variant="outline" className="w-full rounded-xl bg-white text-stone-900 border-amber-500/40 text-xs font-bold cursor-pointer">
                  <Settings className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                  Social Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Enquiries with Mobile-Friendly Quick Actions */}
        <div className="subsection-bordered-card bg-card rounded-2xl shadow-xs overflow-hidden space-y-4 p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">Live Inbound Enquiries &amp; Quick Reply</h2>
              <p className="text-xs text-muted-foreground">
                Auto-syncs every 30s. Tap WhatsApp/Reply or update status directly from mobile or desktop.
              </p>
            </div>
            <Link href="/admin/leads">
              <Button variant="outline" size="sm" className="text-xs rounded-xl font-bold">
                Full Enquiries &amp; Reply CRM ({leads.length})
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto border border-border rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="p-3.5">Ref ID / Client</th>
                  <th className="p-3.5">Phone &amp; Email</th>
                  <th className="p-3.5">Service</th>
                  <th className="p-3.5">Source</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Quick Reply &amp; Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-sans">
                {leads.slice(0, 8).map((lead) => {
                  const fromBot = isChatbotLead(lead.source);
                  const fromOfferPopup = isOfferPopupLead(lead.source);
                  const cleanPhone = (lead.phone || '').replace(/[^\d+]/g, '');
                  return (
                    <tr
                      key={lead.id}
                      className={`transition-colors ${
                        fromBot
                          ? 'bg-amber-50/50 dark:bg-amber-950/20 border-l-4 border-l-amber-500'
                          : fromOfferPopup
                          ? 'bg-orange-50/50 dark:bg-orange-950/20 border-l-4 border-l-orange-500'
                          : 'hover:bg-muted/30'
                      }`}
                    >
                      <td className="p-3.5">
                        <span className="font-mono text-amber-700 dark:text-amber-400 font-bold block">{lead.id}</span>
                        <span className="font-bold text-foreground block text-xs">{lead.name}</span>
                        <span className="text-[11px] text-muted-foreground">{lead.company}</span>
                      </td>
                      <td className="p-3.5">
                        <a href={`mailto:${lead.email}`} className="text-amber-700 dark:text-amber-400 font-semibold hover:underline block">
                          {lead.email}
                        </a>
                        <span className="text-foreground font-mono font-bold">{lead.phone || 'No phone'}</span>
                      </td>
                      <td className="p-3.5 max-w-[200px]">
                        <span className="font-medium text-foreground block truncate">{lead.serviceRequired}</span>
                        <span className="text-[11px] text-muted-foreground truncate block">{lead.message}</span>
                      </td>
                      <td className="p-3.5">
                        {fromBot ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-950 text-amber-400 font-bold text-[10px]">
                            <Bot className="w-3 h-3" /> AI Bot
                          </span>
                        ) : isEngagedIdleLead(lead.source) || fromOfferPopup ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-600 text-white font-bold text-[10px]">
                            <Gift className="w-3 h-3" /> Offer Popup
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground">
                            {lead.source}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">{getStatusBadge(lead.status)}</td>
                      <td className="p-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone.replace(/^\+/, '')}?text=${encodeURIComponent(
                                `Hello ${lead.name}, thank you for contacting Ecreation IT Solution regarding ${lead.serviceRequired}. How can we assist you today?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold"
                            >
                              WhatsApp
                            </a>
                          )}
                          <Link
                            href="/admin/leads"
                            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-300 text-[10px] font-bold"
                          >
                            Reply
                          </Link>
                          <select
                            value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                            className="text-[11px] bg-background border border-border rounded-lg px-2 py-1 text-foreground"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Command Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link href="/admin/social-studio" className="subsection-bordered-card bg-gradient-to-br from-amber-50 to-orange-50/70 dark:from-stone-900 dark:to-stone-900 p-5 rounded-2xl space-y-2.5 block">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-black text-foreground">Google Flow Social Studio</h3>
            <p className="text-xs text-muted-foreground">
              Generate creatives/videos with Google Flow &amp; auto-upload to Instagram, YouTube &amp; Facebook.
            </p>
            <span className="text-xs font-bold text-amber-700 inline-flex items-center gap-1">
              Launch Studio <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link href="/admin/settings" className="subsection-bordered-card bg-card p-5 rounded-2xl space-y-2.5 block">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-black text-foreground">Social Accounts Settings</h3>
            <p className="text-xs text-muted-foreground">
              Save &amp; connect Instagram, YouTube, Facebook, LinkedIn &amp; X accounts for 1-click auto-share.
            </p>
            <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1">
              Configure Accounts ({connectedSocialCount}) <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link href="/admin/chats" className="subsection-bordered-card bg-card p-5 rounded-2xl space-y-2.5 block">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-black text-foreground">AI Assistant Chat Logs</h3>
            <p className="text-xs text-muted-foreground">
              Review all {chatCount} visitor chat sessions and auto-captured phone/email leads.
            </p>
            <span className="text-xs font-bold text-indigo-700 inline-flex items-center gap-1">
              Open Chat Analysis <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link href="/admin/projects" className="subsection-bordered-card bg-card p-5 rounded-2xl space-y-2.5 block">
            <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-black text-foreground">Portfolio &amp; Services CMS</h3>
            <p className="text-xs text-muted-foreground">
              Manage {SERVICES_DATA.length} services, {PROJECTS_DATA.length} portfolio projects &amp; {BLOG_POSTS_DATA.length} blogs.
            </p>
            <span className="text-xs font-bold text-stone-800 dark:text-stone-300 inline-flex items-center gap-1">
              Manage Content <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

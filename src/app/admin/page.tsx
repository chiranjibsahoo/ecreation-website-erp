'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  Layers,
  FileText,
  ArrowUpRight,
  ShieldCheck,
  Bot,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SERVICES_DATA, PROJECTS_DATA, BLOG_POSTS_DATA } from '@/lib/data/seedData';
import { Lead } from '@/types';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [chatCount, setChatCount] = useState<number>(2);

  const isChatbotLead = (source?: string) => {
    if (!source) return false;
    const lower = source.toLowerCase();
    return lower.includes('ai assistant') || lower.includes('chatbot');
  };

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
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
      })
      .catch((err) => console.error(err));

    fetch('/api/chat-logs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.sessions)) {
          setChatCount(data.sessions.length);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = async (id: string, newStatus: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
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

  const botLeadsCount = leads.filter((l) => isChatbotLead(l.source)).length;

  const stats = [
    {
      label: 'Total Inbound Enquiries',
      value: `${leads.length}`,
      change: `${botLeadsCount} from AI Assistant Bot`,
      icon: Users,
      color: 'text-amber-600'
    },
    {
      label: 'AI Assistant Chat Logs',
      value: `${chatCount}`,
      change: 'Saved for full analysis',
      icon: Bot,
      color: 'text-amber-500'
    },
    {
      label: 'Active Services',
      value: `${SERVICES_DATA.length}`,
      change: 'Active catalog',
      icon: Layers,
      color: 'text-emerald-600'
    },
    {
      label: 'Case Studies & Blogs',
      value: `${PROJECTS_DATA.length + BLOG_POSTS_DATA.length}`,
      change: 'SEO indexed',
      icon: Briefcase,
      color: 'text-stone-700 dark:text-stone-300'
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

  return (
    <div className="pt-8 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Ecreation Management ERP
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground mt-1">Admin Operations Center</h1>
            <p className="text-sm text-muted-foreground">
              Manage client enquiries, analyze Ecreation AI Assistant chat logs, and update website content.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/admin/chats">
              <Button size="sm" className="bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/50 rounded-xl text-xs font-bold">
                <Bot className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                Analyze AI Chat Logs ({chatCount})
              </Button>
            </Link>
            <Link href="/admin/leads">
              <Button variant="outline" size="sm" className="rounded-xl text-xs">
                Open Full Leads CRM
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div className="text-2xl font-black text-foreground">{s.value}</div>
                <p className="text-[11px] text-muted-foreground">{s.change}</p>
              </div>
            );
          })}
        </div>

        {/* Leads Management CRM */}
        <div className="bg-card border border-border rounded-2xl shadow-xs overflow-hidden space-y-4 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">Inbound Enquiries &amp; AI Chatbot Leads</h2>
              <p className="text-xs text-muted-foreground">
                Enquiries captured via Ecreation AI Assistant Chatbot are highlighted automatically.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/leads">
                <Button variant="outline" size="sm" className="text-xs rounded-xl">
                  View All &amp; Filter ({leads.length})
                </Button>
              </Link>
            </div>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto border border-border rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="p-3.5">Ref ID / Client</th>
                  <th className="p-3.5">Captured Phone &amp; Email</th>
                  <th className="p-3.5">Service Requested</th>
                  <th className="p-3.5">Enquiry Source</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-sans">
                {leads.map((lead) => {
                  const fromBot = isChatbotLead(lead.source);
                  return (
                    <tr
                      key={lead.id}
                      className={`transition-colors ${
                        fromBot
                          ? 'bg-amber-50/60 dark:bg-amber-950/30 hover:bg-amber-100/60 border-l-4 border-l-amber-500'
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
                      <td className="p-3.5 max-w-[220px]">
                        <span className="font-medium text-foreground block">{lead.serviceRequired}</span>
                        <span className="text-[11px] text-muted-foreground truncate block">{lead.message}</span>
                      </td>
                      <td className="p-3.5">
                        {fromBot ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-950 text-amber-400 border border-amber-500/60 font-bold text-[10px] shadow-xs">
                            <Bot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Ecreation AI Assistant Chatbot</span>
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] bg-muted px-2 py-0.5 rounded text-muted-foreground">
                            {lead.source}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="p-3.5 text-right space-x-1.5">
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                          className="text-[11px] bg-background border border-border rounded-lg px-2 py-1 text-foreground focus-visible:outline-hidden"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="converted">Converted</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* CMS Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-stone-950 text-white border border-amber-500/50 p-6 rounded-2xl shadow-md space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">AI Assistant Chat Logs</h3>
            <p className="text-xs text-stone-300">
              Inspect all visitor chat transcripts, questions asked, and phone/email leads captured by the AI Bot.
            </p>
            <Link href="/admin/chats" className="text-xs font-bold text-amber-400 hover:underline inline-flex items-center gap-1 pt-1">
              Open Chat Logs &amp; Analysis <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-foreground">Services Catalog CMS</h3>
            <p className="text-xs text-muted-foreground">
              Modify deliverables, technology tags, and feature bullets across the {SERVICES_DATA.length} active service offerings.
            </p>
            <Link href="/admin/services" className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1 pt-1">
              Manage Services CMS <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-foreground">Blog CMS &amp; Metadata</h3>
            <p className="text-xs text-muted-foreground">
              Publish technical write-ups, maintain reading times, and edit structured JSON-LD Article descriptions.
            </p>
            <Link href="/admin/blog" className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1 pt-1">
              Manage Articles CMS <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-foreground">Project Case Studies</h3>
            <p className="text-xs text-muted-foreground">
              Manage client metrics, challenge/solution narratives, and portfolio spotlight selections.
            </p>
            <Link href="/admin/projects" className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1 pt-1">
              Manage Case Studies CMS <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

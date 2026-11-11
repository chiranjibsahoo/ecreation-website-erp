'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  Layers,
  FileText,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SERVICES_DATA, PROJECTS_DATA, BLOG_POSTS_DATA } from '@/lib/data/seedData';
import { Lead } from '@/types';

export default function AdminDashboardPage() {
  // Mock active leads for immediate demonstration & review
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'EC-849102',
      name: 'Sarah Jenkins',
      email: 's.jenkins@acme-enterprises.com',
      company: 'Acme Enterprises',
      phone: '+1 (415) 890-1234',
      serviceRequired: 'Enterprise ERP & Client Portals',
      budgetRange: '$25k - $50k',
      message: 'Looking to replace an internal spreadsheet logistics tracker with a bespoke web portal with role permissions.',
      source: 'google_organic',
      status: 'new',
      createdAt: '2026-11-10T14:32:00Z'
    },
    {
      id: 'EC-712903',
      name: 'David O’Connor',
      email: 'doconnor@apexpayments.io',
      company: 'Apex Payments',
      phone: '+44 20 7946 0912',
      serviceRequired: 'Custom Software & Web Engineering',
      budgetRange: '$50,000+',
      message: 'Need a high-throughput financial transactions dashboard built on Next.js and Supabase.',
      source: 'linkedin_campaign',
      status: 'qualified',
      createdAt: '2026-11-09T09:15:00Z'
    },
    {
      id: 'EC-632198',
      name: 'Ananya Deshmukh',
      email: 'ananya@healthpulse.org',
      company: 'HealthPulse Labs',
      phone: '+91 98201 54321',
      serviceRequired: 'Mobile App Engineering (iOS & Android)',
      budgetRange: '$10k - $25k',
      message: 'Patient-facing mobile application with appointment booking and secure document retrieval.',
      source: 'direct',
      status: 'contacted',
      createdAt: '2026-11-08T16:45:00Z'
    }
  ]);

  const updateStatus = (id: string, newStatus: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const stats = [
    { label: 'Total Inbound Leads', value: `${leads.length + 12}`, change: '+18% this month', icon: Users, color: 'text-indigo-600' },
    { label: 'Active Projects', value: `${PROJECTS_DATA.length}`, change: '4 in delivery', icon: Briefcase, color: 'text-emerald-600' },
    { label: 'Dynamic Services', value: `${SERVICES_DATA.length}`, change: 'Active catalog', icon: Layers, color: 'text-cyan-600' },
    { label: 'Published Articles', value: `${BLOG_POSTS_DATA.length}`, change: 'SEO optimized', icon: FileText, color: 'text-purple-600' }
  ];

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">New</Badge>;
      case 'contacted':
        return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">Contacted</Badge>;
      case 'qualified':
        return <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">Qualified</Badge>;
      case 'converted':
        return <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20">Converted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="pt-28 pb-24 bg-muted/20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
                Ecreation Management ERP
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground mt-1">Admin Operations Center</h1>
            <p className="text-sm text-muted-foreground">Manage client leads, services catalog, and dynamic blog content without touching source code.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="rounded-xl text-xs">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Live Website
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold">
                Test Inquiry Form
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
              <h2 className="text-xl font-bold text-foreground">Inbound Leads & Inquiry Pipeline</h2>
              <p className="text-xs text-muted-foreground">Real-time submissions from contact forms, chatbot, and campaign landing pages.</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-mono">
                {leads.length} Active Records
              </Badge>
            </div>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto border border-border rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="p-3.5">Ref ID / Client</th>
                  <th className="p-3.5">Contact Details</th>
                  <th className="p-3.5">Service Requested</th>
                  <th className="p-3.5">Budget</th>
                  <th className="p-3.5">Source</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-sans">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5">
                      <span className="font-mono text-indigo-600 font-semibold block">{lead.id}</span>
                      <span className="font-bold text-foreground block text-xs">{lead.name}</span>
                      <span className="text-[11px] text-muted-foreground">{lead.company}</span>
                    </td>
                    <td className="p-3.5">
                      <a href={`mailto:${lead.email}`} className="text-indigo-600 hover:underline block">
                        {lead.email}
                      </a>
                      <span className="text-muted-foreground">{lead.phone || 'No phone'}</span>
                    </td>
                    <td className="p-3.5 max-w-[200px]">
                      <span className="font-medium text-foreground block">{lead.serviceRequired}</span>
                      <span className="text-[11px] text-muted-foreground truncate block">{lead.message}</span>
                    </td>
                    <td className="p-3.5 font-mono text-foreground font-medium">
                      {lead.budgetRange}
                    </td>
                    <td className="p-3.5">
                      <span className="font-mono text-[11px] bg-muted px-2 py-0.5 rounded text-muted-foreground">
                        {lead.source}
                      </span>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CMS Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-foreground">Services Catalog CMS</h3>
            <p className="text-xs text-muted-foreground">
              Modify deliverables, technology tags, and feature bullets across the {SERVICES_DATA.length} active service offerings.
            </p>
            <Link href="/admin/services" className="text-xs font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1 pt-1">
              Manage Services CMS <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-foreground">Blog CMS & Metadata</h3>
            <p className="text-xs text-muted-foreground">
              Publish technical write-ups, maintain reading times, and edit structured JSON-LD Article descriptions.
            </p>
            <Link href="/admin/blog" className="text-xs font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1 pt-1">
              Manage Articles CMS <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-foreground">Project Case Studies</h3>
            <p className="text-xs text-muted-foreground">
              Manage client metrics, challenge/solution narratives, and portfolio spotlight selections.
            </p>
            <Link href="/admin/projects" className="text-xs font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1 pt-1">
              Manage Case Studies CMS <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


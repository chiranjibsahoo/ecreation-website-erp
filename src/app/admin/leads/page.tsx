'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Download,
  Filter,
  ArrowLeft,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Bot,
  Sparkles,
  MessageSquareText,
  Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/types';

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'chatbot' | 'offer_popup'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) {
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
          if (normalized.length > 0) {
            setSelectedLead(normalized[0]);
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );

    if (selectedLead?.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

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

  const chatbotLeadsCount = leads.filter((l) => isChatbotLead(l.source)).length;
  const offerPopupLeadsCount = leads.filter((l) => isOfferPopupLead(l.source)).length;

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      (lead.phone && lead.phone.toLowerCase().includes(search.toLowerCase())) ||
      (lead.company && lead.company.toLowerCase().includes(search.toLowerCase())) ||
      lead.serviceRequired.toLowerCase().includes(search.toLowerCase()) ||
      (lead.source && lead.source.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource =
      sourceFilter === 'all' ||
      (sourceFilter === 'chatbot' && isChatbotLead(lead.source)) ||
      (sourceFilter === 'offer_popup' && isOfferPopupLead(lead.source));

    return matchesSearch && matchesStatus && matchesSource;
  });

  const exportCSV = () => {
    const headers = ['Ref ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Enquiry Source', 'Status', 'Date'];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name}"`,
      l.email,
      l.phone || '',
      `"${l.company || ''}"`,
      `"${l.serviceRequired}"`,
      `"${l.source || 'direct'}"`,
      l.status,
      l.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecreation-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-8 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Admin Overview
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Leads &amp; Enquiries CRM</span>
          </div>

          <Link href="/admin/chats">
            <Button size="sm" className="bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/50 rounded-xl text-xs h-8">
              <Bot className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              View All AI Assistant Chat Logs
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">Inbound Enquiries &amp; Leads CRM</h1>
            <p className="text-sm text-muted-foreground">
              Enquiries captured from Ecreation AI Assistant Chatbot are automatically highlighted below.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setSourceFilter(sourceFilter === 'offer_popup' ? 'all' : 'offer_popup')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                sourceFilter === 'offer_popup'
                  ? 'bg-gradient-to-r from-[#EA580C] to-[#D97706] text-white border-amber-300 shadow-md'
                  : 'bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-300 border-orange-300 dark:border-orange-800 hover:bg-orange-100'
              }`}
            >
              <Gift className="w-4 h-4 text-orange-600" />
              <span>25% Offer Popup Leads ({offerPopupLeadsCount})</span>
            </button>

            <button
              onClick={() => setSourceFilter(sourceFilter === 'chatbot' ? 'all' : 'chatbot')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                sourceFilter === 'chatbot'
                  ? 'bg-stone-950 text-amber-400 border-amber-500 shadow-md'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-100'
              }`}
            >
              <Bot className="w-4 h-4 text-amber-500" />
              <span>AI Assistant Chatbot Enquiries ({chatbotLeadsCount})</span>
            </button>

            <Button onClick={exportCSV} variant="outline" size="sm" className="rounded-xl text-xs h-9">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-card border border-border p-4 rounded-2xl shadow-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client name, phone, email, service, or source..."
              className="pl-9 text-xs rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-input bg-background text-foreground text-xs focus-visible:outline-hidden"
            >
              <option value="all">All Statuses ({leads.length})</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Main Grid: Table & Lead Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className={`space-y-4 ${selectedLead ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div className="bg-card border border-border rounded-2xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3.5">Ref / Client &amp; Contact</th>
                      <th className="p-3.5">Service</th>
                      <th className="p-3.5">Enquiry Source</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground text-xs">
                          No enquiries matching current search or filter.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const fromBot = isChatbotLead(lead.source);
                        const fromOfferPopup = isOfferPopupLead(lead.source);
                        const isSelected = selectedLead?.id === lead.id;
                        return (
                          <tr
                            key={lead.id}
                            onClick={() => setSelectedLead(lead)}
                            className={`cursor-pointer transition-colors ${
                              fromBot
                                ? isSelected
                                  ? 'bg-amber-100/80 dark:bg-amber-950/60 border-l-4 border-l-amber-500'
                                  : 'bg-amber-50/50 dark:bg-amber-950/25 hover:bg-amber-100/60 border-l-4 border-l-amber-500'
                                : fromOfferPopup
                                ? isSelected
                                  ? 'bg-orange-100/80 dark:bg-orange-950/60 border-l-4 border-l-orange-500'
                                  : 'bg-orange-50/60 dark:bg-orange-950/25 hover:bg-orange-100/60 border-l-4 border-l-orange-500'
                                : isSelected
                                ? 'bg-stone-100 dark:bg-stone-800/60'
                                : 'hover:bg-muted/30'
                            }`}
                          >
                            <td className="p-3.5">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] text-amber-700 dark:text-amber-400 font-bold">
                                  {lead.id}
                                </span>
                                {fromBot && (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-stone-950 text-amber-400 text-[9px] font-mono font-bold">
                                    <Bot className="w-2.5 h-2.5" />
                                    AI BOT
                                  </span>
                                )}
                                {fromOfferPopup && (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gradient-to-r from-[#EA580C] to-[#D97706] text-white text-[9px] font-mono font-bold">
                                    <Gift className="w-2.5 h-2.5" />
                                    25% POPUP
                                  </span>
                                )}
                              </div>
                              <span className="font-bold text-foreground block text-xs mt-0.5">{lead.name}</span>
                              <span className="text-[11px] text-muted-foreground block">{lead.email}</span>
                              {lead.phone && (
                                <span className="text-[11px] font-mono text-stone-700 dark:text-stone-300 font-semibold block">
                                  {lead.phone}
                                </span>
                              )}
                            </td>
                            <td className="p-3.5 text-muted-foreground font-medium">
                              {lead.serviceRequired}
                            </td>
                            <td className="p-3.5">
                              {fromBot ? (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-950 text-amber-400 border border-amber-500/60 font-bold text-[10px] shadow-xs">
                                  <Bot className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                  <span>Ecreation AI Assistant Chatbot</span>
                                </div>
                              ) : isEngagedIdleLead(lead.source) ? (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#065F46] to-[#0F766E] text-amber-300 border border-amber-400/70 font-bold text-[10px] shadow-xs">
                                  <Gift className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                                  <span>{lead.source}</span>
                                </div>
                              ) : fromOfferPopup ? (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#EA580C] to-[#D97706] text-white border border-amber-300/70 font-bold text-[10px] shadow-xs">
                                  <Gift className="w-3.5 h-3.5 text-white shrink-0" />
                                  <span>{lead.source}</span>
                                </div>
                              ) : (
                                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                                  {lead.source || 'direct'}
                                </span>
                              )}
                            </td>
                            <td className="p-3.5">
                              <Badge variant="outline" className="text-[10px] uppercase font-mono">
                                {lead.status}
                              </Badge>
                            </td>
                            <td className="p-3.5 text-right">
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Lead Detail Panel */}
          {selectedLead && (
            <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-6 shadow-md space-y-5 animate-in fade-in-50">
              {/* Highlighted Banner if Lead came from Exit-Intent / 25% Offer Popup */}
              {isOfferPopupLead(selectedLead.source) && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#EA580C] via-[#D97706] to-[#B45309] text-white border border-amber-300/70 flex items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-100 font-bold block">
                        HIGHLIGHTED CONVERSION POPUP SOURCE
                      </span>
                      <span className="text-xs font-black text-white">
                        {selectedLead.source}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {isChatbotLead(selectedLead.source) && (
                <div className="p-3.5 rounded-2xl bg-stone-950 text-white border border-amber-500/60 flex items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                        HIGHLIGHTED ENQUIRY SOURCE
                      </span>
                      <span className="text-xs font-black text-white">
                        Ecreation AI Assistant Chatbot
                      </span>
                    </div>
                  </div>
                  <Link href="/admin/chats">
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] h-8 px-3 rounded-xl">
                      View Chat
                    </Button>
                  </Link>
                </div>
              )}

              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold block">
                    {selectedLead.id}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{selectedLead.name}</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedLead(null)} className="text-xs h-7">
                  Close
                </Button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <span className="text-muted-foreground font-semibold block">Captured Contact Details</span>
                  <p className="flex items-center gap-2 text-foreground font-semibold">
                    <Mail className="w-3.5 h-3.5 text-amber-600" />
                    <a href={`mailto:${selectedLead.email}`} className="hover:underline">{selectedLead.email}</a>
                  </p>
                  {selectedLead.phone && (
                    <p className="flex items-center gap-2 text-foreground font-mono font-bold">
                      <Phone className="w-3.5 h-3.5 text-amber-600" />
                      <span>{selectedLead.phone}</span>
                    </p>
                  )}
                  <p className="flex items-center gap-2 text-muted-foreground pt-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>
                      Enquiry Source:{' '}
                      <strong className="text-foreground">{selectedLead.source || 'Direct Website'}</strong>
                    </span>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground font-semibold block">Service &amp; Package</span>
                  <p className="text-foreground font-bold">{selectedLead.serviceRequired}</p>
                  <p className="font-mono text-muted-foreground">{selectedLead.budgetRange}</p>
                </div>

                <div className="space-y-1 bg-muted/40 p-3.5 rounded-xl border border-border">
                  <span className="text-muted-foreground font-semibold block">Enquiry Summary &amp; Chat Context:</span>
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">{selectedLead.message}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <span className="text-muted-foreground font-semibold block">Update Enquiry Status:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['new', 'contacted', 'qualified', 'converted', 'archived'] as Lead['status'][]).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(selectedLead.id, st)}
                        className={`px-2.5 py-1 rounded-lg font-mono text-[11px] capitalize transition-colors ${
                          selectedLead.status === st
                            ? 'bg-stone-950 text-amber-400 font-bold border border-amber-500/50'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

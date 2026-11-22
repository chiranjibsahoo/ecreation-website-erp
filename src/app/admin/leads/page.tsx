'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Download,
  ArrowLeft,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Clock,
  Bot,
  MessageSquareText,
  Gift,
  Send,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/types';

interface LeadReply {
  id: string;
  lead_id: string;
  channel: 'whatsapp' | 'email' | 'call' | 'note';
  message: string;
  sent_by: string;
  created_at: string;
}

const REPLY_TEMPLATES = [
  {
    label: '25% Offer + Demo',
    text: 'Namaste {name}! Thank you for reaching out to Ecreation IT Solution regarding {service}. Your Flat 25% Special Business Offer is reserved. When is a good time for a quick 10-min live demo today?'
  },
  {
    label: 'Pricing & Roadmap',
    text: 'Hello {name}, thanks for your enquiry with Ecreation IT Solution for {service}. Our Solutions Architect has reviewed your scope and prepared a fixed-cost roadmap. Please let us know if we can connect on WhatsApp or call.'
  },
  {
    label: 'Follow-Up Reminder',
    text: 'Hi {name}, following up on your {service} requirement with Ecreation IT Solution. Let us know if you would like to see our live ERP & portfolio demos.'
  }
];

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [replies, setReplies] = useState<LeadReply[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'chatbot' | 'offer_popup'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [replyFeedback, setReplyFeedback] = useState('');

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

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/leads', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data.leads)) {
        const normalized: Lead[] = data.leads.map((l: Record<string, unknown>) => ({
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
        setSelectedLead((prev) => {
          if (!prev && normalized.length > 0) return normalized[0];
          if (prev) return normalized.find((item) => item.id === prev.id) || normalized[0] || null;
          return null;
        });
      }
      if (Array.isArray(data.replies)) {
        setReplies(data.replies);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
    const handleSync = () => fetchLeads();
    window.addEventListener('ecreation:admin-sync', handleSync);
    return () => window.removeEventListener('ecreation:admin-sync', handleSync);
  }, [fetchLeads]);

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
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

  const handleSendReply = async (channel: 'whatsapp' | 'email' | 'call' | 'note') => {
    if (!selectedLead) return;
    const text =
      replyText.trim() ||
      `Replied via ${channel.toUpperCase()} regarding ${selectedLead.serviceRequired}.`;

    setSendingReply(true);
    setReplyFeedback('');
    try {
      const adminEmail =
        typeof window !== 'undefined'
          ? localStorage.getItem('ecreation_admin_email') || 'admin@ecreation.in'
          : 'admin@ecreation.in';

      const nextStatus: Lead['status'] =
        selectedLead.status === 'new' ? 'contacted' : selectedLead.status;

      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedLead.id,
          status: nextStatus,
          replyMessage: text,
          replyChannel: channel,
          sentBy: adminEmail
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setReplies((prev) => [data.reply, ...prev]);
        }
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, status: nextStatus } : l))
        );
        setSelectedLead((prev) => (prev ? { ...prev, status: nextStatus } : null));
        setReplyText('');
        setReplyFeedback(`Reply logged & status updated to "${nextStatus}"!`);
        setTimeout(() => setReplyFeedback(''), 4000);
      }

      // Launch native channel action on mobile / desktop
      const cleanPhone = (selectedLead.phone || '').replace(/[^\d+]/g, '');
      if (channel === 'whatsapp' && cleanPhone) {
        window.open(
          `https://wa.me/${cleanPhone.replace(/^\+/, '')}?text=${encodeURIComponent(text)}`,
          '_blank'
        );
      } else if (channel === 'email' && selectedLead.email) {
        window.location.href = `mailto:${selectedLead.email}?subject=${encodeURIComponent(
          `Re: ${selectedLead.serviceRequired} — Ecreation IT Solution (${selectedLead.id})`
        )}&body=${encodeURIComponent(text)}`;
      } else if (channel === 'call' && cleanPhone) {
        window.location.href = `tel:${cleanPhone}`;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingReply(false);
    }
  };

  const applyTemplate = (tpl: string) => {
    if (!selectedLead) return;
    setReplyText(
      tpl
        .replace('{name}', selectedLead.name.split('(')[0].trim() || 'there')
        .replace('{service}', selectedLead.serviceRequired || 'your project')
    );
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

  const selectedReplies = selectedLead
    ? replies.filter((r) => r.lead_id === selectedLead.id)
    : [];

  const exportCSV = () => {
    const headers = ['Ref ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Source', 'Status', 'Date'];
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
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `ecreation-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-6 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Overview
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2">
              <Users className="w-6 h-6 text-amber-600" />
              Enquiries &amp; Instant Reply CRM
            </h1>
            <p className="text-xs text-muted-foreground">
              Auto-synced across Web &amp; Mobile App. Reply via WhatsApp, Email, or Call and maintain lead status in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="outline" onClick={fetchLeads} className="rounded-xl text-xs cursor-pointer">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
              Refresh
            </Button>
            <Button size="sm" variant="outline" onClick={exportCSV} className="rounded-xl text-xs cursor-pointer">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="subsection-bordered-card bg-card p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, email, service..."
              className="pl-9 h-9 rounded-xl text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 rounded-xl border border-border bg-background px-3 text-xs font-semibold"
            >
              <option value="all">All Status ({leads.length})</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="archived">Archived</option>
            </select>

            <button
              type="button"
              onClick={() => setSourceFilter(sourceFilter === 'chatbot' ? 'all' : 'chatbot')}
              className={`h-9 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                sourceFilter === 'chatbot'
                  ? 'bg-stone-950 text-amber-400 border-amber-500'
                  : 'bg-background text-foreground border-border'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              AI Bot ({chatbotLeadsCount})
            </button>

            <button
              type="button"
              onClick={() => setSourceFilter(sourceFilter === 'offer_popup' ? 'all' : 'offer_popup')}
              className={`h-9 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                sourceFilter === 'offer_popup'
                  ? 'bg-orange-600 text-white border-orange-500'
                  : 'bg-background text-foreground border-border'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              Offer Popups ({offerPopupLeadsCount})
            </button>
          </div>
        </div>

        {/* Split View: Leads List + Direct Reply Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Enquiries List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[760px] overflow-y-auto pr-1">
            {filteredLeads.length === 0 ? (
              <div className="subsection-bordered-card bg-card p-8 rounded-2xl text-center text-xs text-muted-foreground">
                No matching enquiries found.
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const isSelected = selectedLead?.id === lead.id;
                const fromBot = isChatbotLead(lead.source);
                const fromPopup = isOfferPopupLead(lead.source);
                return (
                  <button
                    key={lead.id}
                    type="button"
                    onClick={() => setSelectedLead(lead)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-500 shadow-md'
                        : 'bg-card border-border hover:border-amber-400/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold text-amber-700 dark:text-amber-400">
                        {lead.id}
                      </span>
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {lead.status}
                      </Badge>
                    </div>
                    <div className="font-bold text-sm text-foreground">{lead.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{lead.serviceRequired}</div>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="font-mono text-foreground font-semibold">{lead.phone || lead.email}</span>
                      {fromBot ? (
                        <span className="text-[10px] font-bold text-amber-700">AI Bot</span>
                      ) : fromPopup ? (
                        <span className="text-[10px] font-bold text-orange-600">25% Popup</span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">{lead.source}</span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right: Selected Lead Details + Instant Reply Panel */}
          <div className="lg:col-span-7">
            {selectedLead ? (
              <div className="subsection-bordered-card bg-card rounded-3xl p-5 sm:p-7 space-y-6">
                {/* Lead Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                        {selectedLead.id}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : 'Recent'}
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-foreground">{selectedLead.name}</h2>
                    {selectedLead.company && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-amber-600" />
                        {selectedLead.company}
                      </p>
                    )}
                  </div>

                  {/* Status Maintenance Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">
                      Maintain Status
                    </label>
                    <select
                      value={selectedLead.status}
                      onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as Lead['status'])}
                      className="h-9 rounded-xl border border-amber-500/40 bg-amber-50/50 dark:bg-stone-900 px-3 text-xs font-bold text-foreground"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted (Won)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border flex items-center gap-3">
                    <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono text-muted-foreground block">Email</span>
                      <a href={`mailto:${selectedLead.email}`} className="text-xs font-bold text-foreground truncate block hover:underline">
                        {selectedLead.email}
                      </a>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono text-muted-foreground block">Phone / WhatsApp</span>
                      <span className="text-xs font-mono font-bold text-foreground block">
                        {selectedLead.phone || 'Not provided'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enquiry Message */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-stone-900 border border-amber-500/20 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-800 dark:text-amber-400">{selectedLead.serviceRequired}</span>
                    <span className="font-mono text-muted-foreground">{selectedLead.source}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed">{selectedLead.message}</p>
                </div>

                {/* Direct Reply Composer (Mobile & Web) */}
                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-black text-foreground flex items-center gap-1.5">
                      <MessageSquareText className="w-4 h-4 text-amber-600" />
                      Reply Directly to Client
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {REPLY_TEMPLATES.map((tpl) => (
                        <button
                          key={tpl.label}
                          type="button"
                          onClick={() => applyTemplate(tpl.text)}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/70 cursor-pointer"
                        >
                          + {tpl.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply message here (or tap a quick template above)..."
                    className="w-full rounded-2xl border border-border bg-background p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button
                      type="button"
                      size="sm"
                      disabled={sendingReply || !selectedLead.phone}
                      onClick={() => handleSendReply('whatsapp')}
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      WhatsApp
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      disabled={sendingReply || !selectedLead.email}
                      onClick={() => handleSendReply('email')}
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 mr-1.5" />
                      Email Reply
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      disabled={sendingReply || !selectedLead.phone}
                      onClick={() => handleSendReply('call')}
                      className="rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 text-xs font-bold cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 mr-1.5" />
                      Call Client
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={sendingReply || !replyText.trim()}
                      onClick={() => handleSendReply('note')}
                      className="rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Save Note
                    </Button>
                  </div>

                  {replyFeedback && (
                    <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{replyFeedback}</span>
                    </div>
                  )}
                </div>

                {/* Reply History */}
                <div className="space-y-2.5 pt-3 border-t border-border">
                  <span className="text-[11px] font-mono font-bold uppercase text-muted-foreground block">
                    Reply &amp; Follow-up Timeline ({selectedReplies.length})
                  </span>
                  {selectedReplies.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No replies logged yet for this enquiry.</p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedReplies.map((r) => (
                        <div key={r.id} className="p-3 rounded-xl bg-muted/40 border border-border text-xs space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="uppercase font-bold text-amber-700">{r.channel}</span>
                            <span className="text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
                          </div>
                          <p className="text-foreground">{r.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="subsection-bordered-card bg-card p-12 rounded-3xl text-center text-sm text-muted-foreground">
                Select an enquiry on the left to view full details and reply.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

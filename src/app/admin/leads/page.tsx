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
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/types';

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    // Initial fetch from /api/leads
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) {
          // Normalize field names if needed
          const normalized = data.leads.map((l: Record<string, unknown>) => ({
            id: l.id,
            name: l.name,
            email: l.email,
            phone: l.phone,
            company: l.company,
            serviceRequired: l.service_required || l.serviceRequired,
            budgetRange: l.budget_range || l.budgetRange,
            message: l.message,
            source: l.source,
            status: l.status,
            createdAt: l.created_at || l.createdAt
          }));
          setLeads(normalized);
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

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(search.toLowerCase())) ||
      lead.serviceRequired.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['Ref ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Date'];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name}"`,
      l.email,
      l.phone || '',
      `"${l.company || ''}"`,
      `"${l.serviceRequired}"`,
      `"${l.budgetRange || ''}"`,
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
    <div className="pt-28 pb-24 bg-muted/20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/admin" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Admin Overview
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Leads CRM</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">Inbound Leads CRM</h1>
            <p className="text-sm text-muted-foreground">Review, qualify, and update status of prospective client inquiries.</p>
          </div>
          <Button onClick={exportCSV} variant="outline" size="sm" className="rounded-xl text-xs">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export to CSV
          </Button>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-card border border-border p-4 rounded-2xl shadow-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client name, email, company, or service..."
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
                      <th className="p-3.5">Ref / Client</th>
                      <th className="p-3.5">Service</th>
                      <th className="p-3.5">Budget</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground text-xs">
                          No leads matching current search or status filter.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`cursor-pointer transition-colors ${
                            selectedLead?.id === lead.id ? 'bg-indigo-50/50 dark:bg-indigo-950/30' : 'hover:bg-muted/30'
                          }`}
                        >
                          <td className="p-3.5">
                            <span className="font-mono text-[10px] text-indigo-600 font-semibold block">{lead.id}</span>
                            <span className="font-bold text-foreground block text-xs">{lead.name}</span>
                            <span className="text-[11px] text-muted-foreground">{lead.company || 'Private Client'}</span>
                          </td>
                          <td className="p-3.5 text-muted-foreground">
                            {lead.serviceRequired}
                          </td>
                          <td className="p-3.5 font-mono text-foreground font-medium">
                            {lead.budgetRange || 'Unspecified'}
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Lead Detail Panel */}
          {selectedLead && (
            <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-6 shadow-md space-y-6 animate-in fade-in-50">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-[10px] font-mono text-indigo-600 font-bold block">{selectedLead.id}</span>
                  <h3 className="text-lg font-bold text-foreground">{selectedLead.name}</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedLead(null)} className="text-xs h-7">
                  Close
                </Button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="text-muted-foreground font-semibold block">Contact Details</span>
                  <p className="flex items-center gap-2 text-foreground font-medium">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    <a href={`mailto:${selectedLead.email}`} className="hover:underline">{selectedLead.email}</a>
                  </p>
                  {selectedLead.phone && (
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{selectedLead.phone}</span>
                    </p>
                  )}
                  {selectedLead.company && (
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Building className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{selectedLead.company}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground font-semibold block">Service & Budget</span>
                  <p className="text-foreground font-medium">{selectedLead.serviceRequired}</p>
                  <p className="font-mono text-muted-foreground">{selectedLead.budgetRange}</p>
                </div>

                <div className="space-y-1 bg-muted/40 p-3.5 rounded-xl border border-border">
                  <span className="text-muted-foreground font-semibold block">Project Scope / Message:</span>
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">{selectedLead.message}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <span className="text-muted-foreground font-semibold block">Update Status:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['new', 'contacted', 'qualified', 'converted', 'archived'] as Lead['status'][]).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(selectedLead.id, st)}
                        className={`px-2.5 py-1 rounded-lg font-mono text-[11px] capitalize transition-colors ${
                          selectedLead.status === st
                            ? 'bg-indigo-600 text-white font-bold'
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


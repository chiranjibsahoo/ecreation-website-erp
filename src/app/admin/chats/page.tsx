'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bot,
  User,
  Search,
  ArrowLeft,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Download,
  TrendingUp,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ChatMessageItem {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

interface ChatSessionItem {
  sessionId: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  serviceInterested: string;
  leadCaptured: boolean;
  leadId?: string;
  messages: ChatMessageItem[];
  startedAt: string;
  updatedAt: string;
}

export default function AdminChatLogsPage() {
  const [sessions, setSessions] = useState<ChatSessionItem[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSessionItem | null>(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'captured' | 'browsing'>('all');
  const [loading, setLoading] = useState(true);

  const loadChatLogs = () => {
    setLoading(true);
    fetch('/api/chat-logs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.sessions)) {
          setSessions(data.sessions);
          if (data.sessions.length > 0 && !selectedSession) {
            setSelectedSession(data.sessions[0]);
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadChatLogs();
  }, []);

  const filteredSessions = sessions.filter((s) => {
    const matchesSearch =
      s.visitorName.toLowerCase().includes(search.toLowerCase()) ||
      s.visitorEmail.toLowerCase().includes(search.toLowerCase()) ||
      s.visitorPhone.toLowerCase().includes(search.toLowerCase()) ||
      s.serviceInterested.toLowerCase().includes(search.toLowerCase()) ||
      s.sessionId.toLowerCase().includes(search.toLowerCase()) ||
      s.messages.some((m) => m.text.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'captured' && s.leadCaptured) ||
      (filterType === 'browsing' && !s.leadCaptured);

    return matchesSearch && matchesFilter;
  });

  const totalSessions = sessions.length;
  const capturedCount = sessions.filter((s) => s.leadCaptured).length;
  const conversionRate = totalSessions > 0 ? Math.round((capturedCount / totalSessions) * 100) : 0;
  const totalMessages = sessions.reduce((acc, s) => acc + s.messages.length, 0);

  const exportChatsCSV = () => {
    const headers = ['Session ID', 'Visitor Name', 'Phone', 'Email', 'Service Interested', 'Lead Captured', 'Lead ID', 'Messages Count', 'Last Updated'];
    const rows = filteredSessions.map((s) => [
      s.sessionId,
      `"${s.visitorName}"`,
      `"${s.visitorPhone}"`,
      `"${s.visitorEmail}"`,
      `"${s.serviceInterested}"`,
      s.leadCaptured ? 'YES' : 'NO',
      s.leadId || '',
      s.messages.length,
      s.updatedAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecreation-ai-chats-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-8 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Admin Overview
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Ecreation AI Assistant Chat Logs &amp; Analysis</span>
          </div>

          <Link href="/admin/leads">
            <Button variant="outline" size="sm" className="rounded-xl text-xs h-8">
              View Highlighted Leads in CRM →
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-[11px] font-bold mb-2">
              <Bot className="w-3.5 h-3.5 text-amber-600" />
              <span>AI CONVERSATION INTELLIGENCE</span>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">
              Ecreation AI Assistant — All Chats &amp; Lead Analysis
            </h1>
            <p className="text-sm text-muted-foreground">
              Analyze every visitor conversation, review questions asked, and inspect phone/email leads captured by the AI Assistant.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button onClick={loadChatLogs} variant="outline" size="sm" className="rounded-xl text-xs h-9">
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Logs
            </Button>
            <Button onClick={exportChatsCSV} variant="outline" size="sm" className="rounded-xl text-xs h-9">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Analytics KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-5 rounded-2xl shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Total Chat Sessions</span>
              <MessageSquare className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-foreground">{totalSessions}</div>
            <p className="text-[11px] text-muted-foreground">Recorded visitor conversations</p>
          </div>

          <div className="bg-stone-950 text-white border border-amber-500/50 p-5 rounded-2xl shadow-md space-y-1">
            <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
              <span>Enquiries Captured via Bot</span>
              <Bot className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">{capturedCount}</div>
            <p className="text-[11px] text-stone-300">Auto-saved to Leads CRM with Phone &amp; Email</p>
          </div>

          <div className="bg-card border border-border p-5 rounded-2xl shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Chat-to-Lead Conversion</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-foreground">{conversionRate}%</div>
            <p className="text-[11px] text-muted-foreground">Visitors who shared Phone &amp; Email</p>
          </div>

          <div className="bg-card border border-border p-5 rounded-2xl shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Total Messages Analyzed</span>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-foreground">{totalMessages}</div>
            <p className="text-[11px] text-muted-foreground">User &amp; AI Assistant interactions</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-card border border-border p-4 rounded-2xl shadow-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chat transcripts by visitor name, phone, email, or message keywords..."
              className="pl-9 text-xs rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'captured' | 'browsing')}
              className="h-10 px-3 rounded-xl border border-input bg-background text-foreground text-xs focus-visible:outline-hidden"
            >
              <option value="all">All Chat Sessions ({sessions.length})</option>
              <option value="captured">Enquiry Captured ({capturedCount})</option>
              <option value="browsing">Browsing Only ({totalSessions - capturedCount})</option>
            </select>
          </div>
        </div>

        {/* 2-Column Chat Sessions List & Full Transcript Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Sessions List (5 Cols) */}
          <div className="lg:col-span-5 bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
            <div className="p-3.5 bg-muted/50 border-b border-border text-[11px] font-mono uppercase text-muted-foreground font-bold flex items-center justify-between">
              <span>Saved Chat Sessions ({filteredSessions.length})</span>
              <span>Click to Inspect</span>
            </div>

            <div className="divide-y divide-border max-h-[620px] overflow-y-auto">
              {filteredSessions.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground">
                  No chat sessions match your current filter.
                </div>
              ) : (
                filteredSessions.map((session) => {
                  const isSelected = selectedSession?.sessionId === session.sessionId;
                  return (
                    <div
                      key={session.sessionId}
                      onClick={() => setSelectedSession(session)}
                      className={`p-4 cursor-pointer transition-colors space-y-2 ${
                        session.leadCaptured
                          ? isSelected
                            ? 'bg-amber-100/70 dark:bg-amber-950/50 border-l-4 border-l-amber-500'
                            : 'bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-100/50 border-l-4 border-l-amber-500'
                          : isSelected
                          ? 'bg-stone-100 dark:bg-stone-800/60'
                          : 'hover:bg-muted/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-bold text-amber-700 dark:text-amber-400">
                          {session.sessionId}
                        </span>
                        {session.leadCaptured ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-950 text-amber-400 border border-amber-500/50 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            Enquiry Saved ({session.leadId})
                          </span>
                        ) : (
                          <Badge variant="outline" className="text-[10px] font-mono">
                            Browsing ({session.messages.length} msgs)
                          </Badge>
                        )}
                      </div>

                      <div>
                        <div className="text-xs font-bold text-foreground">{session.visitorName}</div>
                        <div className="text-[11px] text-muted-foreground font-medium">
                          Topic: {session.serviceInterested}
                        </div>
                      </div>

                      {(session.visitorPhone || session.visitorEmail) && (
                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-stone-700 dark:text-stone-300 pt-1">
                          {session.visitorPhone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-amber-600" />
                              {session.visitorPhone}
                            </span>
                          )}
                          {session.visitorEmail && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-amber-600" />
                              {session.visitorEmail}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Full Chat Transcript & Captured Lead Metadata (7 Cols) */}
          <div className="lg:col-span-7 bg-card border border-border rounded-2xl overflow-hidden shadow-md">
            {selectedSession ? (
              <div className="flex flex-col h-[660px]">
                {/* Transcript Header */}
                <div className="p-4 sm:p-5 bg-stone-950 text-white border-b border-stone-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black text-white">{selectedSession.visitorName}</h3>
                        <span className="text-[10px] font-mono text-amber-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-700">
                          {selectedSession.sessionId}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400">
                        Interested in: <strong className="text-stone-200">{selectedSession.serviceInterested}</strong>
                      </p>
                    </div>
                  </div>

                  {selectedSession.leadCaptured && (
                    <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <span>Enquiry Ref: {selectedSession.leadId}</span>
                    </div>
                  )}
                </div>

                {/* Captured Contact Metadata Strip */}
                <div className="px-5 py-3 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5 font-medium text-stone-700 dark:text-stone-300">
                      <Phone className="w-3.5 h-3.5 text-amber-600" />
                      <strong>Phone:</strong> {selectedSession.visitorPhone || 'Not provided yet'}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-stone-700 dark:text-stone-300">
                      <Mail className="w-3.5 h-3.5 text-amber-600" />
                      <strong>Email:</strong> {selectedSession.visitorEmail || 'Not provided yet'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-stone-500">
                    {selectedSession.messages.length} Messages in Session
                  </span>
                </div>

                {/* Message-by-Message Transcript */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF8F5] dark:bg-stone-950">
                  {selectedSession.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {m.sender === 'bot' && (
                        <div className="w-7 h-7 rounded-lg bg-stone-950 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/40">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div className="max-w-[80%] space-y-1">
                        <div
                          className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            m.sender === 'user'
                              ? 'bg-stone-950 text-white border border-amber-500/40 rounded-tr-xs'
                              : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 border border-stone-200 dark:border-stone-800 shadow-2xs rounded-tl-xs'
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="text-[10px] text-stone-400 font-mono block px-1">
                          {m.sender === 'user' ? 'Visitor' : 'Ecreation AI Assistant'} · {m.time}
                        </span>
                      </div>
                      {m.sender === 'user' && (
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-sm text-muted-foreground">
                Select a chat session on the left to inspect its full conversation transcript.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


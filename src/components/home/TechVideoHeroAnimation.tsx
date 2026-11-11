'use client';

import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Activity,
  Layers,
  Database,
  Cloud,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Server,
  Zap,
  Globe,
  Radio
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TechVideoHeroAnimation = () => {
  const [activeTab, setActiveTab] = useState<'erp' | 'cloud' | 'ai'>('erp');
  const [isPlaying, setIsPlaying] = useState(true);
  const [pulseIndex, setPulseIndex] = useState(0);

  // Live telemetry counter simulation
  const [throughput, setThroughput] = useState(14250);
  const [latency, setLatency] = useState(38);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 4);
      setThroughput(14000 + Math.floor(Math.random() * 800));
      setLatency(34 + Math.floor(Math.random() * 8));
    }, 1800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 rounded-2xl border border-neutral-800 bg-[#0A0D14] shadow-2xl overflow-hidden text-neutral-300">
      {/* Top Window Bar with Live Telemetry Badge */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md gap-3">
        {/* Terminal Controls */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-3 font-mono text-[11px] text-neutral-400 hidden sm:inline">
            ecreation-core-v2.5 // architecture-telemetry.stream
          </span>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 font-mono text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE TELEMETRY</span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded-md text-neutral-400 hover:text-white transition-colors"
            aria-label={isPlaying ? 'Pause telemetry animation' : 'Play telemetry animation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center border-b border-neutral-800/80 bg-neutral-900/40 px-4 sm:px-6 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('erp')}
          className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'erp'
              ? 'border-amber-500 text-amber-400 font-semibold'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>01. High-Throughput ERP Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('cloud')}
          className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'cloud'
              ? 'border-cyan-500 text-white font-semibold'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Cloud className="w-3.5 h-3.5 text-cyan-400" />
          <span>02. Cloud DevOps & Edge Pipeline</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'ai'
              ? 'border-purple-500 text-white font-semibold'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>03. AI Vector Automation</span>
        </button>
      </div>

      {/* Active Tab Visualization Screen */}
      <div className="p-6 sm:p-8 min-h-[320px] flex flex-col justify-between">
        {/* TAB 1: ERP Engine Node Pipeline */}
        {activeTab === 'erp' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            {/* Top Pipeline Flowchart Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
              {/* Node 1 */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  pulseIndex === 0
                    ? 'border-amber-500 bg-amber-950/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'border-neutral-800 bg-neutral-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                  <span>ENTRYPOINT</span>
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <h4 className="font-bold text-white text-sm">Client Portal / Web</h4>
                <p className="text-[10px] text-neutral-400 mt-1 font-mono">Route: /api/erp/dispatch</p>
                <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>200 OK · 12ms</span>
                </div>
              </div>

              {/* Node 2 */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  pulseIndex === 1
                    ? 'border-indigo-500 bg-indigo-950/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                    : 'border-neutral-800 bg-neutral-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                  <span>EDGE RUNTIME</span>
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <h4 className="font-bold text-white text-sm">Next.js Turbopack</h4>
                <p className="text-[10px] text-neutral-400 mt-1 font-mono">Global Edge Caching</p>
                <div className="mt-2 text-[10px] text-blue-400 font-mono flex items-center gap-1">
                  <span>HIT · 18 Regional Pods</span>
                </div>
              </div>

              {/* Node 3 */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  pulseIndex === 2
                    ? 'border-emerald-500 bg-emerald-950/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'border-neutral-800 bg-neutral-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                  <span>SECURITY CORE</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white text-sm">Supabase RLS Policy</h4>
                <p className="text-[10px] text-neutral-400 mt-1 font-mono">Tenant Isolation Verified</p>
                <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span>Zero Leaks · Passed</span>
                </div>
              </div>

              {/* Node 4 */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  pulseIndex === 3
                    ? 'border-cyan-500 bg-cyan-950/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'border-neutral-800 bg-neutral-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                  <span>PERSISTENCE</span>
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <h4 className="font-bold text-white text-sm">PostgreSQL Cluster</h4>
                <p className="text-[10px] text-neutral-400 mt-1 font-mono">ACID Transactions</p>
                <div className="mt-2 text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                  <span>Synced · Read Replicas</span>
                </div>
              </div>
            </div>

            {/* Live Metrics Meter Bar */}
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-neutral-400">Throughput:</span>
                <span className="text-white font-bold">{throughput.toLocaleString()} req/s</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-blue-400" />
                <span className="text-neutral-400">P99 Latency:</span>
                <span className="text-white font-bold">{latency}ms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span className="text-neutral-400">Availability:</span>
                <span className="text-white font-bold">99.999% SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-purple-400" />
                <span className="text-neutral-400">Database Locks:</span>
                <span className="text-emerald-400 font-bold">0 Detected</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Cloud & DevOps Build Stream */}
        {activeTab === 'cloud' && (
          <div className="space-y-4 animate-in fade-in-50 duration-300 font-mono text-xs">
            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-neutral-300 overflow-x-auto">
              <p className="text-neutral-500">$ git push origin main --tags</p>
              <p className="text-neutral-400">&gt; Building multi-stage container: Ecreation Enterprise ERP v2.5</p>
              <p className="text-emerald-400">✓ Compiling TypeScript 5.8 with strict type checking (0 errors)</p>
              <p className="text-emerald-400">✓ Turbopack bundling complete (1,842ms)</p>
              <p className="text-emerald-400">✓ Supabase RLS migrations applied to production cluster</p>
              <p className="text-blue-400">ℹ Distributing static assets to 32 global edge points</p>
              <p className="text-emerald-400">✓ Health checks 100% passed across all zones (us-east, eu-west, ap-south)</p>
              <p className="text-white font-bold pt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                DEPLOYMENT SUCCESSFUL · ZERO DOWNTIME ROLLOUT CONFIRMED
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: AI Vector Automation */}
        {activeTab === 'ai' && (
          <div className="space-y-4 animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">Step 1 · Input</span>
                <h4 className="text-sm font-bold text-white">Client Inquiry Ingestion</h4>
                <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                  "Need custom logistics ERP with real-time GPS tracking and automated freight invoicing."
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-purple-800/60 bg-purple-950/10 space-y-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">Step 2 · RAG Matching</span>
                <h4 className="text-sm font-bold text-white">pgvector Semantic Match</h4>
                <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                  Matched Architecture: OmniLogistics (Cosine similarity: 0.984).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-emerald-800/60 bg-emerald-950/10 space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Step 3 · Automation</span>
                <h4 className="text-sm font-bold text-white">Automated Proposal Draft</h4>
                <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                  Sprint scope generated, CRM lead created, lead architect alerted in &lt; 850ms.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Technology Badge Bar */}
      <div className="px-6 py-3 border-t border-neutral-800/80 bg-neutral-950/90 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-400 gap-2">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">Tech Primitives:</span>
          <span className="hover:text-white transition-colors">Next.js 16</span>
          <span>·</span>
          <span className="hover:text-white transition-colors">Supabase RLS</span>
          <span>·</span>
          <span className="hover:text-white transition-colors">PostgreSQL</span>
          <span>·</span>
          <span className="hover:text-white transition-colors">TypeScript</span>
          <span>·</span>
          <span className="hover:text-white transition-colors">Tailwind CSS</span>
        </div>

        <div className="flex items-center gap-2 text-emerald-400">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>Multi-Cloud Global Failover Ready</span>
        </div>
      </div>
    </div>
  );
};

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}


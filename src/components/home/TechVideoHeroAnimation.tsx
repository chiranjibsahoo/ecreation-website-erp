'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Layers,
  Database,
  Cloud,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Play,
  Pause,
  Server,
  Zap,
  Globe,
  Radio
} from 'lucide-react';

export const TechVideoHeroAnimation = () => {
  const [activeTab, setActiveTab] = useState<'erp' | 'cloud' | 'ai'>('erp');
  const [isPlaying, setIsPlaying] = useState(true);
  const [pulseIndex, setPulseIndex] = useState(0);

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
    <div className="w-full max-w-5xl mx-auto mt-10 rounded-3xl border border-stone-800 bg-[#141210] shadow-2xl overflow-hidden text-stone-300">
      {/* Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-800 bg-stone-950/90 gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-600 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
          <span className="ml-3 font-mono text-[11px] text-stone-400 hidden sm:inline">
            ecreation-core-v2.5 // architecture-telemetry.stream
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-stone-900 border border-amber-500/40 text-amber-400 font-mono text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE SYSTEM STATUS</span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded-md text-stone-400 hover:text-white transition-colors"
            aria-label={isPlaying ? 'Pause telemetry animation' : 'Play telemetry animation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center border-b border-stone-800 bg-stone-900/50 px-4 sm:px-6 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('erp')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'erp'
              ? 'border-amber-500 text-amber-400 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>01. High-Throughput ERP &amp; Web Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('cloud')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'cloud'
              ? 'border-amber-500 text-amber-400 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Cloud className="w-3.5 h-3.5 text-amber-400" />
          <span>02. Cloud DevOps &amp; Zero-Downtime Pipeline</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'ai'
              ? 'border-amber-500 text-amber-400 font-bold'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <span>03. AI Workflow &amp; Lead Automation</span>
        </button>
      </div>

      {/* Active Tab Visualization Screen */}
      <div className="p-6 sm:p-8 min-h-[300px] flex flex-col justify-between">
        {activeTab === 'erp' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
              {[
                {
                  step: 'ENTRYPOINT',
                  title: 'Website / Client Portal',
                  sub: 'Route: /api/erp/dispatch',
                  stat: '200 OK · 12ms',
                  icon: Globe
                },
                {
                  step: 'EDGE RUNTIME',
                  title: 'Next.js Turbopack',
                  sub: 'Global Edge Caching',
                  stat: 'HIT · 18 Regional Pods',
                  icon: Zap
                },
                {
                  step: 'SECURITY CORE',
                  title: 'Supabase RLS Policy',
                  sub: 'Tenant Isolation Verified',
                  stat: 'Zero Leaks · Passed',
                  icon: ShieldCheck
                },
                {
                  step: 'PERSISTENCE',
                  title: 'PostgreSQL Cluster',
                  sub: 'ACID Transactions',
                  stat: 'Synced · Read Replicas',
                  icon: Database
                }
              ].map((node, i) => {
                const Icon = node.icon;
                const active = pulseIndex === i;
                return (
                  <div
                    key={node.step}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      active
                        ? 'border-amber-500 bg-amber-950/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'border-stone-800 bg-stone-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2">
                      <span>{node.step}</span>
                      <Icon className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <h4 className="font-bold text-white text-sm">{node.title}</h4>
                    <p className="text-[10px] text-stone-400 mt-1 font-mono">{node.sub}</p>
                    <div className="mt-2 text-[10px] text-amber-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{node.stat}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span className="text-stone-400">Throughput:</span>
                <span className="text-white font-bold">{throughput.toLocaleString()} req/s</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-stone-400">P99 Latency:</span>
                <span className="text-white font-bold">{latency}ms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span className="text-stone-400">Availability:</span>
                <span className="text-white font-bold">99.99% SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-amber-400" />
                <span className="text-stone-400">Database Locks:</span>
                <span className="text-amber-400 font-bold">0 Detected</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cloud' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-stone-300 overflow-x-auto">
              <p className="text-stone-500">$ git push origin main --tags</p>
              <p className="text-stone-400">&gt; Building multi-stage container: Ecreation Enterprise Suite v2.5</p>
              <p className="text-amber-400">✓ Compiling TypeScript 5.8 with strict type checking (0 errors)</p>
              <p className="text-amber-400">✓ Turbopack bundling complete (1,842ms)</p>
              <p className="text-amber-400">✓ Supabase RLS migrations applied to production cluster</p>
              <p className="text-stone-300">ℹ Distributing static assets to 32 global edge points</p>
              <p className="text-white font-bold pt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                DEPLOYMENT SUCCESSFUL · ZERO DOWNTIME ROLLOUT CONFIRMED
              </p>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">Step 1 · Capture</span>
              <h4 className="text-sm font-bold text-white">Client Inquiry Ingestion</h4>
              <p className="text-xs text-stone-400 font-mono leading-relaxed">
                &quot;Need custom office ERP with GST billing, inventory sync, and corporate website.&quot;
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-amber-700/50 space-y-2">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">Step 2 · AI Matching</span>
              <h4 className="text-sm font-bold text-white">Architecture &amp; Cost Match</h4>
              <p className="text-xs text-stone-400 font-mono leading-relaxed">
                Matched Blueprint: Enterprise ERP + Web Portal (Estimated timeline: 6 Weeks).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/60 space-y-2">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">Step 3 · Dispatch</span>
              <h4 className="text-sm font-bold text-white">Instant Proposal &amp; CRM Sync</h4>
              <p className="text-xs text-stone-400 font-mono leading-relaxed">
                Scope roadmap generated, CRM lead logged, senior architect assigned in &lt; 2s.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Technology Badge Bar */}
      <div className="px-6 py-3 border-t border-stone-800 bg-stone-950 flex flex-wrap items-center justify-between text-[11px] font-mono text-stone-400 gap-2">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">Core Stack:</span>
          <span>Next.js 16</span>
          <span>·</span>
          <span>TypeScript</span>
          <span>·</span>
          <span>PostgreSQL &amp; Supabase</span>
          <span>·</span>
          <span>Tailwind CSS</span>
        </div>

        <div className="flex items-center gap-2 text-amber-400">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>Multi-Region Cloud Failover Active</span>
        </div>
      </div>
    </div>
  );
};

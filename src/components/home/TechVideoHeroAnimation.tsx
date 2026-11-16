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
    <div className="subsection-bordered-card w-full max-w-5xl mx-auto mt-10 rounded-3xl bg-white/92 overflow-hidden text-stone-800">
      {/* Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-amber-500/30 bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300 inline-block" />
          <span className="ml-3 font-mono text-[11px] text-stone-700 font-semibold hidden sm:inline">
            ecreation-core-v2.5 // architecture-telemetry.stream
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="subsection-bordered-item flex items-center gap-2 px-3 py-1 rounded-full bg-white text-emerald-800 font-mono font-bold text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>LIVE SYSTEM STATUS</span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="subsection-bordered-item p-1.5 rounded-lg bg-white text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause telemetry animation' : 'Play telemetry animation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center border-b border-amber-500/25 bg-[#FAF8F5] px-4 sm:px-6 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('erp')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'erp'
              ? 'border-amber-600 text-stone-950 font-black'
              : 'border-transparent text-stone-600 hover:text-stone-950'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          <span>01. High-Throughput ERP &amp; Web Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('cloud')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'cloud'
              ? 'border-amber-600 text-stone-950 font-black'
              : 'border-transparent text-stone-600 hover:text-stone-950'
          }`}
        >
          <Cloud className="w-3.5 h-3.5 text-emerald-600" />
          <span>02. Cloud DevOps &amp; Zero-Downtime Pipeline</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'ai'
              ? 'border-amber-600 text-stone-950 font-black'
              : 'border-transparent text-stone-600 hover:text-stone-950'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-amber-600" />
          <span>03. AI Workflow &amp; Lead Automation</span>
        </button>
      </div>

      {/* Active Tab Visualization Screen */}
      <div className="p-6 sm:p-8 min-h-[290px] flex flex-col justify-between bg-white">
        {activeTab === 'erp' && (
          <div className="space-y-6">
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
                    className={`subsection-bordered-item p-4 rounded-2xl transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-br from-[#E3F1EB] to-[#F5EFE0] shadow-md'
                        : 'bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold mb-2">
                      <span>{node.step}</span>
                      <Icon className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <h4 className="font-bold text-stone-950 text-sm">{node.title}</h4>
                    <p className="text-[10px] text-stone-600 mt-1 font-mono">{node.sub}</p>
                    <div className="mt-2 text-[10px] text-emerald-700 font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{node.stat}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="subsection-bordered-item p-4 rounded-2xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-700" />
                <span className="text-stone-600">Throughput:</span>
                <span className="text-stone-950 font-bold">{throughput.toLocaleString()} req/s</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600" />
                <span className="text-stone-600">P99 Latency:</span>
                <span className="text-stone-950 font-bold">{latency}ms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-stone-600">Availability:</span>
                <span className="text-stone-950 font-bold">99.99% SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-amber-600" />
                <span className="text-stone-600">Database Locks:</span>
                <span className="text-emerald-700 font-bold">0 Detected</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cloud' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="subsection-bordered-item p-5 rounded-2xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] space-y-2 text-stone-800 overflow-x-auto">
              <p className="text-stone-500">$ git push origin main --tags</p>
              <p className="text-stone-700">&gt; Building multi-stage container: Ecreation Enterprise Suite v2.5</p>
              <p className="text-emerald-700 font-bold">✓ Compiling TypeScript 5.8 with strict type checking (0 errors)</p>
              <p className="text-emerald-700 font-bold">✓ Turbopack bundling complete (1,842ms)</p>
              <p className="text-emerald-700 font-bold">✓ Supabase RLS migrations applied to production cluster</p>
              <p className="text-stone-700">ℹ Distributing static assets to 32 global edge points</p>
              <p className="text-stone-950 font-extrabold pt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                DEPLOYMENT SUCCESSFUL · ZERO DOWNTIME ROLLOUT CONFIRMED
              </p>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="subsection-bordered-item p-4 rounded-2xl bg-gradient-to-br from-[#E3F1EB] to-[#EFF4EC] space-y-2">
              <span className="text-[10px] font-mono text-emerald-800 uppercase font-bold">Step 1 · Capture</span>
              <h4 className="text-sm font-bold text-stone-950">Client Inquiry Ingestion</h4>
              <p className="text-xs text-stone-700 font-mono leading-relaxed">
                &quot;Need custom office ERP with GST billing, inventory sync, and corporate website.&quot;
              </p>
            </div>

            <div className="subsection-bordered-item p-4 rounded-2xl bg-[#FAF8F5] space-y-2">
              <span className="text-[10px] font-mono text-amber-700 uppercase font-bold">Step 2 · AI Matching</span>
              <h4 className="text-sm font-bold text-stone-950">Architecture &amp; Cost Match</h4>
              <p className="text-xs text-stone-700 font-mono leading-relaxed">
                Matched Blueprint: Enterprise ERP + Web Portal (Estimated timeline: 6 Weeks).
              </p>
            </div>

            <div className="subsection-bordered-item p-4 rounded-2xl bg-gradient-to-br from-[#EFF4EC] to-[#F5EFE0] space-y-2">
              <span className="text-[10px] font-mono text-amber-800 uppercase font-bold">Step 3 · Dispatch</span>
              <h4 className="text-sm font-bold text-stone-950">Instant Proposal &amp; CRM Sync</h4>
              <p className="text-xs text-stone-700 font-mono leading-relaxed">
                Scope roadmap generated, CRM lead logged, senior architect assigned in &lt; 2s.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Technology Badge Bar */}
      <div className="px-6 py-3 border-t border-amber-500/25 bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] flex flex-wrap items-center justify-between text-[11px] font-mono text-stone-700 gap-2">
        <div className="flex items-center gap-3">
          <span className="text-stone-950 font-bold">Core Stack:</span>
          <span>Next.js 16</span>
          <span>·</span>
          <span>TypeScript</span>
          <span>·</span>
          <span>PostgreSQL &amp; Supabase</span>
          <span>·</span>
          <span>Tailwind CSS</span>
        </div>

        <div className="flex items-center gap-2 text-emerald-800 font-bold">
          <Radio className="w-3 h-3 animate-pulse text-emerald-600" />
          <span>Multi-Region Cloud Failover Active</span>
        </div>
      </div>
    </div>
  );
};

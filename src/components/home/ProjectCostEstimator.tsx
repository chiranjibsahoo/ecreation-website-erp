'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Layers,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';

export const ProjectCostEstimator = () => {
  const [projectType, setProjectType] = useState<'erp' | 'saas' | 'mobile' | 'cloud' | 'ai'>('erp');
  const [speed, setSpeed] = useState<'standard' | 'accelerated'>('standard');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'web_portal',
    'rbac_security',
    'admin_analytics'
  ]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const projectTypes = [
    { id: 'erp', label: 'Enterprise ERP & Portal', baseWeeks: 8, baseTeam: '1 Lead Architect, 2 Full-Stack, 1 QA' },
    { id: 'saas', label: 'Custom SaaS & Web Platform', baseWeeks: 6, baseTeam: '1 Architect, 2 Engineers' },
    { id: 'mobile', label: 'Cross-Platform Mobile App', baseWeeks: 7, baseTeam: '1 Mobile Lead, 1 Backend, 1 QA' },
    { id: 'cloud', label: 'Cloud Infrastructure & DevOps', baseWeeks: 4, baseTeam: '1 Cloud/DevOps Architect, 1 SRE' },
    { id: 'ai', label: 'AI & Workflow Automation', baseWeeks: 5, baseTeam: '1 AI/Data Engineer, 1 Full-Stack' }
  ];

  const optionalFeatures = [
    { id: 'web_portal', label: 'High-Throughput Web App', weeks: 1 },
    { id: 'rbac_security', label: 'Enterprise RBAC & RLS Security', weeks: 1 },
    { id: 'admin_analytics', label: 'Admin Dashboard & Real-Time BI', weeks: 1 },
    { id: 'native_mobile', label: 'iOS & Android Native Shells', weeks: 2 },
    { id: 'third_party_api', label: 'ERP & Payment API Integrations', weeks: 1 },
    { id: 'multi_tenant', label: 'Multi-Tenant Cloud Isolation', weeks: 2 }
  ];

  const currentType = projectTypes.find((p) => p.id === projectType) || projectTypes[0];
  const featureWeeks = selectedFeatures.reduce((acc, fId) => {
    const f = optionalFeatures.find((opt) => opt.id === fId);
    return acc + (f ? f.weeks : 0);
  }, 0);

  const totalWeeks = Math.max(
    4,
    Math.round((currentType.baseWeeks + featureWeeks) * (speed === 'accelerated' ? 0.75 : 1))
  );

  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 relative overflow-hidden" id="estimator">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200/60">
              Interactive Scope Calculator
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-3">
              Estimate Your Project Scope & Timeline
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Transparent sprint estimations modeled on 40+ delivered enterprise systems. Select your technical criteria to view timeline and pod architecture.
            </p>
          </FadeIn>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="max-w-5xl mx-auto bg-slate-50/70 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Selections */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Project Archetype */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                01. Core Architecture Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {projectTypes.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setProjectType(pt.id as any)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                      projectType === pt.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/25'
                        : 'bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Capabilities Checklist */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                02. Included Capabilities
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {optionalFeatures.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs transition-all ${
                        isChecked
                          ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800 font-semibold'
                          : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="truncate">{feat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Sprint Cadence */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                03. Delivery Cadence
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSpeed('standard')}
                  className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                    speed === 'standard'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-blue-500 ring-2 ring-blue-500/10 font-bold'
                      : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-0.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    Standard Sprints
                  </div>
                  <span className="text-[11px] text-slate-500">Bi-weekly preview releases</span>
                </button>

                <button
                  onClick={() => setSpeed('accelerated')}
                  className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                    speed === 'accelerated'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-blue-500 ring-2 ring-blue-500/10 font-bold'
                      : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-0.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Accelerated Pod
                  </div>
                  <span className="text-[11px] text-slate-500">Dedicated sprint velocity (-25%)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Blueprint & Summary */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block">
                Engineering Blueprint
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {currentType.label}
              </h3>
            </div>

            {/* Timeline Metric */}
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 space-y-1">
              <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                ESTIMATED DELIVERY TIMELINE
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                {totalWeeks} – {totalWeeks + 2} Weeks
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                To production launch with staging environment and test suites.
              </p>
            </div>

            {/* Team Structure */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 dark:text-white block uppercase tracking-wider text-[11px]">
                Dedicated Pod Structure:
              </span>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/70 dark:border-slate-800">
                <Users className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{currentType.baseTeam}</span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Comprehensive NDA & IP Assignment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Daily Git commits & automated test passes</span>
              </div>
            </div>

            {/* Action CTA */}
            <Link
              href={`/contact#enquiry`}
              className="block pt-2"
            >
              <Button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-5 font-bold shadow-md shadow-blue-500/25 text-xs sm:text-sm">
                Discuss This Scope With Our Architect
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, Activity, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export const OpeningPreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Only run on fresh sessions or let it run briefly
    const hasSeenIntro = sessionStorage.getItem('ecreation_intro_seen');
    if (hasSeenIntro) {
      setShouldRender(false);
      return;
    }

    // Fast, smooth counter simulation up to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            sessionStorage.setItem('ecreation_intro_seen', 'true');
            setTimeout(() => setShouldRender(false), 900); // Allow curtain slide-up
          }, 250);
          return 100;
        }
        const jump = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + jump, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-white text-slate-900 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isLoaded ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      style={{ willChange: 'transform, opacity' }}
      aria-live="polite"
      aria-label="Site Loading Screen"
    >
      {/* Top Header inside Preloader */}
      <div className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between border-b border-slate-100">
        <Logo size="md" href="" />

        <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span>SYSTEM_INIT // 2026.1</span>
        </div>
      </div>

      {/* Center Content: Brand Title, Equalizer Animation & Percentage */}
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8 my-auto">
        {/* Animated equalizer waves */}
        <div className="flex items-center justify-center gap-1.5 h-12" aria-hidden="true">
          {[40, 75, 25, 90, 60, 100, 45, 80, 30, 95, 55, 85, 70, 35, 90].map((h, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full bg-gradient-to-t from-blue-600 via-indigo-600 to-cyan-400 transition-all duration-300"
              style={{
                height: `${Math.max(12, (h * progress) / 100)}px`,
                opacity: 0.3 + (progress / 100) * 0.7,
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>

        {/* Big Impact Title */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Architecting High-Throughput{' '}
            <span className="text-blue-600">
              Digital Systems
            </span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-500 tracking-wider uppercase">
            Enterprise ERP • Cloud Infrastructure • AI Automation
          </p>
        </div>

        {/* Progress Counter & High-Tech Line */}
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              PREPARING WORKSPACE
            </span>
            <span className="text-blue-600 text-sm font-black">{progress}%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 transition-all duration-150 ease-out shadow-xs shadow-blue-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Marquee Strip */}
      <div className="w-full py-4 border-t border-slate-100 overflow-hidden bg-slate-50/70">
        <div className="flex items-center gap-8 whitespace-nowrap text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest animate-[marquee_20s_linear_infinite]">
          <span>Full-Stack Engineering</span>
          <span className="text-blue-600">•</span>
          <span>Next.js App Router Architecture</span>
          <span className="text-blue-600">•</span>
          <span>Supabase Enterprise RLS</span>
          <span className="text-blue-600">•</span>
          <span>Cloud Microservices & DevOps</span>
          <span className="text-blue-600">•</span>
          <span>Real-Time Business Intelligence</span>
          <span className="text-blue-600">•</span>
          <span>Bespoke Logistics Portals</span>
          <span className="text-blue-600">•</span>
          <span>Full-Stack Engineering</span>
        </div>
      </div>
    </div>
  );
};

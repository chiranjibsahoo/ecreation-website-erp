'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

const STORAGE_KEY = 'ecreation_gold_gradient';

/**
 * Reversible Gold Gradient Theme Preview Toggle.
 *
 * - ON  → <html data-gold-gradient="true">  (metallic gold gradients, see globals.css)
 * - OFF → <html data-gold-gradient="false"> (original flat gold theme)
 *
 * PERMANENT REVERT: delete <GoldGradientToggle /> from src/app/layout.tsx and
 * remove the `data-gold-gradient` attribute on <html>. Nothing else needs to change.
 */
export const GoldGradientToggle = () => {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
    const initial = stored !== 'off';
    setEnabled(initial);
    document.documentElement.setAttribute('data-gold-gradient', String(initial));
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    document.documentElement.setAttribute('data-gold-gradient', String(next));
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
    } catch {
      // ignore storage errors
    }
  };

  if (pathname?.startsWith('/admin')) return null;

  return (
    <button
      onClick={toggle}
      aria-pressed={enabled}
      aria-label="Toggle gold gradient theme preview"
      title="Preview: switch between gold gradient and flat gold theme"
      className="fixed bottom-4 left-4 md:left-[92px] z-40 group inline-flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-amber-400/70 shadow-lg shadow-amber-900/10 text-[11px] font-extrabold text-stone-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:border-amber-500 cursor-pointer select-none"
    >
      <Sparkles className="w-3.5 h-3.5 text-amber-600 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
      <span>Gold Gradient</span>
      <span
        className={`relative w-8 h-[18px] rounded-full transition-colors duration-300 ${
          enabled ? 'bg-gradient-to-r from-[#F59E0B] to-[#B45309]' : 'bg-stone-300'
        }`}
      >
        <span
          className={`absolute top-[2px] left-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-300 ${
            enabled ? 'translate-x-[14px]' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  );
};

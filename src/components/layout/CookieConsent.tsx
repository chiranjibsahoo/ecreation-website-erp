'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cookie, Check, ShieldCheck, SlidersHorizontal, X } from 'lucide-react';

const CONSENT_STORAGE_KEY = 'ecreation_cookie_consent_v1';

export const CookieConsent = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!saved) {
        const timer = setTimeout(() => setVisible(true), 900);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, [pathname]);

  const saveConsent = (mode: 'all' | 'essential' | 'custom') => {
    const payload = {
      mode,
      essential: true,
      analytics: mode === 'all' ? true : mode === 'essential' ? false : analyticsEnabled,
      marketing: mode === 'all' ? true : mode === 'essential' ? false : marketingEnabled,
      timestamp: new Date().toISOString()
    };

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
      document.cookie = `ecreation_cookie_consent=${mode}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore storage errors
    }

    setVisible(false);
  };

  if (!visible || pathname?.startsWith('/admin')) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] w-[calc(100vw-1.5rem)] max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB]/98 via-[#EFF4EC]/98 to-[#F5EFE0]/98 backdrop-blur-xl p-4 sm:p-5 text-stone-900 shadow-[0_20px_50px_-12px_rgba(20,18,16,0.25)] space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 border border-amber-600/40 shadow-2xs">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black text-stone-950">
                  We Value Your Privacy &amp; Cookie Preferences
                </h3>
                <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-800">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  GDPR &amp; DPDP Ready
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-700 leading-relaxed font-medium">
                We use cookies to enhance site speed, remember your session preferences, and analyze traffic. Read our{' '}
                <Link
                  href="/privacy-policy"
                  className="text-amber-800 font-bold underline underline-offset-2 hover:text-stone-950"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <button
            onClick={() => saveConsent('essential')}
            className="w-7 h-7 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-950 flex items-center justify-center border border-amber-500/30 transition-colors shrink-0 cursor-pointer"
            aria-label="Dismiss cookie banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Optional Customize Preferences Drawer */}
        {showPreferences && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-amber-500/25">
            <div className="subsection-bordered-item p-2.5 rounded-xl bg-white/90 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-extrabold text-stone-950 block">Essential</span>
                <span className="text-[10px] text-stone-500">Always Active</span>
              </div>
              <input
                type="checkbox"
                checked
                disabled
                className="accent-emerald-600 w-3.5 h-3.5"
                aria-label="Essential cookies always active"
              />
            </div>

            <label className="subsection-bordered-item p-2.5 rounded-xl bg-white/90 flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-[11px] font-extrabold text-stone-950 block">Analytics</span>
                <span className="text-[10px] text-stone-500">Speed &amp; UX</span>
              </div>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                className="accent-amber-600 w-3.5 h-3.5 cursor-pointer"
              />
            </label>

            <label className="subsection-bordered-item p-2.5 rounded-xl bg-white/90 flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-[11px] font-extrabold text-stone-950 block">Offers</span>
                <span className="text-[10px] text-stone-500">25% Voucher</span>
              </div>
              <input
                type="checkbox"
                checked={marketingEnabled}
                onChange={(e) => setMarketingEnabled(e.target.checked)}
                className="accent-amber-600 w-3.5 h-3.5 cursor-pointer"
              />
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-0.5">
          <button
            type="button"
            onClick={() => setShowPreferences((prev) => !prev)}
            className="subsection-bordered-item px-3 py-2 rounded-xl bg-white/90 text-stone-700 hover:text-stone-950 text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3 text-amber-700" />
            <span>{showPreferences ? 'Hide Options' : 'Customize'}</span>
          </button>

          <button
            type="button"
            onClick={() => saveConsent('essential')}
            className="subsection-bordered-item px-3.5 py-2 rounded-xl bg-white/90 text-stone-800 hover:text-stone-950 text-[11px] font-bold cursor-pointer"
          >
            Essential Only
          </button>

          {showPreferences ? (
            <button
              type="button"
              onClick={() => saveConsent('custom')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black inline-flex items-center gap-1.5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => saveConsent('all')}
              className="px-4.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black inline-flex items-center gap-1.5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept All Cookies</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

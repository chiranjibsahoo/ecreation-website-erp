'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Smartphone,
  Download,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  Wifi,
  ArrowDownToLine
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_VERSION, APK_DOWNLOAD_PATH } from '@/lib/appVersion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Window {
    AndroidBridge?: {
      getAppVersion: () => string;
      shareContent: (title: string, text: string, url: string) => void;
      openExternal: (url: string) => void;
      clearCacheAndReload: () => void;
    };
  }
}

interface AdminAppControlsProps {
  onManualSync?: () => void;
}

export const AdminAppControls: React.FC<AdminAppControlsProps> = ({ onManualSync }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInsideApk, setIsInsideApk] = useState(false);
  const [apkShellVersion, setApkShellVersion] = useState<string | null>(null);
  const [liveVersion, setLiveVersion] = useState(APP_VERSION);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string>('');
  const [pwaMessage, setPwaMessage] = useState<string>('');

  const checkLiveVersion = useCallback(async (manual = false) => {
    if (manual) setSyncing(true);
    try {
      const res = await fetch('/api/app-version', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.version) {
          setLiveVersion(data.version);
          if (data.version !== APP_VERSION) {
            setUpdateAvailable(true);
          }
        }
        setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
      if (manual) {
        window.dispatchEvent(new CustomEvent('ecreation:admin-sync'));
        onManualSync?.();
      }
    } catch {
      // ignore transient offline
    } finally {
      if (manual) {
        setTimeout(() => setSyncing(false), 500);
      }
    }
  }, [onManualSync]);

  useEffect(() => {
    // Detect native Android APK shell or standalone PWA
    if (typeof window !== 'undefined') {
      if (window.AndroidBridge?.getAppVersion) {
        setIsInsideApk(true);
        setIsInstalled(true);
        try {
          setApkShellVersion(window.AndroidBridge.getAppVersion());
        } catch {
          setApkShellVersion(APP_VERSION);
        }
      } else if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone
      ) {
        setIsInstalled(true);
      }

      // Register Service Worker for PWA & OTA Auto-Update
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    setUpdateAvailable(true);
                  }
                });
              }
            });
          })
          .catch(() => {});
      }

      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
      };

      const handleAppInstalled = () => {
        setIsInstalled(true);
        setDeferredPrompt(null);
        setPwaMessage('PWA Installed! Auto-Updates enabled.');
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);
      window.addEventListener('appinstalled', handleAppInstalled);

      // Initial version check + Auto-Sync heartbeat every 30 seconds
      checkLiveVersion(false);
      const savedInterval = Number(localStorage.getItem('ecreation_sync_interval') || '30');
      const intervalMs = Math.max(15, savedInterval) * 1000;
      const timer = setInterval(() => {
        checkLiveVersion(false);
        window.dispatchEvent(new CustomEvent('ecreation:admin-sync'));
      }, intervalMs);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        window.removeEventListener('appinstalled', handleAppInstalled);
        clearInterval(timer);
      };
    }
  }, [checkLiveVersion]);

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    } else {
      setPwaMessage('Open your browser menu (⋮) → tap "Install App / Add to Home Screen", or download the Android .APK directly.');
      setTimeout(() => setPwaMessage(''), 7000);
    }
  };

  const handleApplyUpdate = () => {
    if (window.AndroidBridge?.clearCacheAndReload) {
      window.AndroidBridge.clearCacheAndReload();
      return;
    }
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  };

  return (
    <div className="space-y-2.5">
      {/* Live Auto-Update Notification Bar */}
      {updateAvailable && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>New Admin ERP Update Ready (v{liveVersion}) — Tap to apply instantly without reinstalling!</span>
          </div>
          <Button
            size="sm"
            onClick={handleApplyUpdate}
            className="h-7 px-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-[11px] font-black cursor-pointer"
          >
            Update Now
          </Button>
        </div>
      )}

      {/* Version, Auto-Sync & Mobile App Download Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-amber-500/30 text-stone-800 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>v{liveVersion}</span>
            {isInsideApk && <span className="text-amber-700">• APK v{apkShellVersion || APP_VERSION}</span>}
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
            <Wifi className="w-3 h-3 text-emerald-600" />
            <span>Auto-Sync Live{lastSynced ? ` (${lastSynced})` : ''}</span>
          </span>

          <button
            type="button"
            onClick={() => checkLiveVersion(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-amber-50 border border-stone-200 text-stone-700 font-bold transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 text-amber-600 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>

        {/* APK + PWA Install Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {!isInstalled && (
            <Button
              type="button"
              size="sm"
              onClick={handleInstallPwa}
              className="h-8 px-3 rounded-xl bg-stone-950 hover:bg-stone-900 text-amber-300 border border-amber-500/50 text-[11px] font-bold cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 mr-1.5" />
              Install Mobile PWA
            </Button>
          )}

          <a href={APK_DOWNLOAD_PATH} download="Ecreation-Admin-ERP-v2.4.0.apk">
            <Button
              type="button"
              size="sm"
              className="h-8 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download Android .APK
            </Button>
          </a>
        </div>
      </div>

      {pwaMessage && (
        <div className="text-[11px] font-medium text-amber-900 bg-amber-50 border border-amber-300 rounded-xl px-3 py-1.5 flex items-center gap-2">
          <ArrowDownToLine className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>{pwaMessage}</span>
        </div>
      )}
    </div>
  );
};

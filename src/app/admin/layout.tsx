'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LogOut,
  ExternalLink,
  Layers,
  Briefcase,
  FileText,
  Users,
  Loader2,
  Lock,
  Bot,
  LayoutDashboard,
  Sparkles,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminAppControls } from '@/components/admin/AdminAppControls';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>('admin@ecreation.in');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authStatus = localStorage.getItem('ecreation_admin_auth');
    const storedEmail = localStorage.getItem('ecreation_admin_email');

    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
      if (storedEmail) setUserEmail(storedEmail);
    } else {
      setIsAuthenticated(false);
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    localStorage.removeItem('ecreation_admin_auth');
    localStorage.removeItem('ecreation_admin_email');
    document.cookie = 'ecreation_admin_auth=; path=/; max-age=0';
    window.dispatchEvent(new Event('storage'));
    router.push('/login');
  };

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center bg-[#FAF8F5] dark:bg-stone-950 px-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-stone-950 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-lg">
          <Lock className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-black text-stone-950 dark:text-white">
            Verifying Admin Authorization
          </h2>
          <p className="text-xs text-stone-500">
            Checking session credentials and role-based permissions...
          </p>
        </div>
        <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
      </div>
    );
  }

  const adminNav = [
    { label: 'Overview & Reports', shortLabel: 'Home', href: '/admin', icon: LayoutDashboard },
    { label: 'Enquiries & Reply CRM', shortLabel: 'Enquiries', href: '/admin/leads', icon: Users },
    { label: 'Social Promotion Studio', shortLabel: 'Promote', href: '/admin/social-studio', icon: Sparkles },
    { label: 'AI Chat Logs', shortLabel: 'Chats', href: '/admin/chats', icon: Bot },
    { label: 'Social & App Settings', shortLabel: 'Settings', href: '/admin/settings', icon: Settings },
    { label: 'Services CMS', shortLabel: 'Services', href: '/admin/services', icon: Layers },
    { label: 'Projects CMS', shortLabel: 'Projects', href: '/admin/projects', icon: Briefcase },
    { label: 'Blog CMS', shortLabel: 'Blog', href: '/admin/blog', icon: FileText }
  ];

  const mobileBottomNav = adminNav.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-stone-950 flex flex-col pt-[84px] sm:pt-[92px] pb-20 md:pb-6">
      {/* Executive Admin ERP Command Sub-Header */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <div className="subsection-bordered-card rounded-3xl bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950 p-4 sm:p-5 space-y-3.5">
          {/* Top Row: Session Telemetry & Prominent Logout Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-500/30">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="subsection-bordered-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-emerald-800 font-mono text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ECREATION ADMIN ERP</span>
              </div>
              <span className="font-mono text-xs text-stone-700 font-medium hidden sm:inline">
                Signed in: <strong className="text-amber-800">{userEmail}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="subsection-bordered-item h-8 sm:h-9 text-xs font-bold bg-white text-stone-800 rounded-xl"
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:mr-1.5 text-amber-600" />
                  <span className="hidden sm:inline">Public Website</span>
                </Button>
              </Link>

              <Button
                size="sm"
                onClick={handleLogout}
                className="h-8 sm:h-9 px-3.5 text-xs font-black bg-red-600 hover:bg-red-500 text-white border border-red-400/50 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                Logout
              </Button>
            </div>
          </div>

          {/* Mobile App (APK & PWA), Live Version & Auto-Sync Bar */}
          <AdminAppControls />

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-0.5">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`subsection-bordered-item px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-black shadow-2xs'
                      : 'bg-white/90 text-stone-700 hover:text-stone-950'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-amber-600'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Admin Page Content */}
      <div className="flex-1">{children}</div>

      {/* Native-Style Mobile Bottom Navigation Bar (APK & PWA) */}
      <nav
        aria-label="Mobile Admin Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-xl border-t border-amber-500/30 px-2 py-1.5 shadow-[0_-8px_25px_rgba(0,0,0,0.08)]"
      >
        <div className="grid grid-cols-5 gap-1">
          {mobileBottomNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[10px] font-bold transition-colors ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-amber-600' : 'text-stone-500'}`} />
                <span>{item.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

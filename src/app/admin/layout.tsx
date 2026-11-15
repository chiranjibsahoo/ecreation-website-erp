'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  LogOut,
  ExternalLink,
  Layers,
  Briefcase,
  FileText,
  Users,
  Loader2,
  Lock,
  Bot,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const handleLogout = () => {
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
    { label: 'Overview Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Leads & Enquiries CRM', href: '/admin/leads', icon: Users },
    { label: 'AI Chat Logs & Analysis', href: '/admin/chats', icon: Bot },
    { label: 'Services CMS', href: '/admin/services', icon: Layers },
    { label: 'Projects CMS', href: '/admin/projects', icon: Briefcase },
    { label: 'Blog CMS', href: '/admin/blog', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-stone-950 flex flex-col pt-[84px] sm:pt-[92px]">
      {/* Executive Admin ERP Command Sub-Header (Properly cleared below Fixed Main Header) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <div className="rounded-3xl bg-[#141210] text-white border border-amber-500/40 shadow-xl p-4 sm:p-5 space-y-4">
          {/* Top Row: Session Telemetry & Prominent Logout Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-stone-800">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ECREATION ADMIN ERP PORTAL</span>
              </div>
              <span className="font-mono text-xs text-stone-300">
                Logged in as: <strong className="text-amber-400">{userEmail}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-xs font-bold bg-stone-900 hover:bg-stone-800 border-stone-700 text-stone-200 rounded-xl"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  Public Website
                </Button>
              </Link>

              <Button
                size="sm"
                onClick={handleLogout}
                className="h-9 px-4 text-xs font-black bg-red-600 hover:bg-red-500 text-white border border-red-400/50 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                Logout
              </Button>
            </div>
          </div>

          {/* Bottom Row: Luxury Icon Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-stone-950 border-amber-300 shadow-md font-black'
                      : 'bg-stone-900/90 text-stone-300 border-stone-800 hover:text-amber-300 hover:border-amber-500/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Admin Page Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

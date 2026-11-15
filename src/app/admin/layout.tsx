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
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>('admin@ecreation.in');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage authentication
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
    router.push('/login');
  };

  // While checking auth status
  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 flex items-center justify-center text-amber-600 shadow-md">
          <Lock className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Verifying Admin Authorization
          </h2>
          <p className="text-xs text-slate-500">
            Checking session credentials and role-based permissions...
          </p>
        </div>
        <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
      </div>
    );
  }

  const adminNav = [
    { label: 'Overview', href: '/admin' },
    { label: 'Leads & Enquiries', href: '/admin/leads' },
    { label: 'AI Chat Logs & Analysis', href: '/admin/chats' },
    { label: 'Services CMS', href: '/admin/services' },
    { label: 'Projects CMS', href: '/admin/projects' },
    { label: 'Blog CMS', href: '/admin/blog' }
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 flex flex-col">
      {/* Top Admin Security Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 pt-20 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AUTHENTICATED STAFF SESSION</span>
            </div>
            <span className="font-mono text-slate-400 hidden sm:inline">
              User: <strong className="text-white">{userEmail}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Live Website
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="h-8 text-xs bg-slate-800 hover:bg-red-950/50 hover:text-red-400 border-slate-700 text-slate-300 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Secondary Subnav Bar */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 pt-3 border-t border-slate-800/80 mt-2 overflow-x-auto">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Admin Page Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}


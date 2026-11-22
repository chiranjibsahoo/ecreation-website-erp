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
  Settings,
  Mail,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/Logo';
import { AdminAppControls } from '@/components/admin/AdminAppControls';

interface NavGroup {
  heading: string;
  items: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>('admin@ecreation.in');
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] dark:bg-stone-950 px-4 text-center space-y-4">
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

  const navGroups: NavGroup[] = [
    {
      heading: 'Operations & CRM',
      items: [
        { label: 'Overview & Reports', href: '/admin', icon: LayoutDashboard },
        { label: 'Enquiries & Reply CRM', href: '/admin/leads', icon: Users },
        { label: 'AI Chat Logs', href: '/admin/chats', icon: Bot }
      ]
    },
    {
      heading: 'Marketing & Promotion',
      items: [{ label: 'Social Promotion Studio', href: '/admin/social-studio', icon: Sparkles }]
    },
    {
      heading: 'Website CMS',
      items: [
        { label: 'Services CMS', href: '/admin/services', icon: Layers },
        { label: 'Projects CMS', href: '/admin/projects', icon: Briefcase },
        { label: 'Blog CMS', href: '/admin/blog', icon: FileText }
      ]
    },
    {
      heading: 'System Settings',
      items: [
        { label: 'Social & Mobile App', href: '/admin/settings', icon: Settings },
        { label: 'Email SMTP & Templates', href: '/admin/settings/email', icon: Mail }
      ]
    }
  ];

  const mobileBottomNav = [
    { shortLabel: 'Home', href: '/admin', icon: LayoutDashboard },
    { shortLabel: 'Enquiries', href: '/admin/leads', icon: Users },
    { shortLabel: 'Promote', href: '/admin/social-studio', icon: Sparkles },
    { shortLabel: 'Email', href: '/admin/settings/email', icon: Mail },
    { shortLabel: 'Settings', href: '/admin/settings', icon: Settings }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950 border-r border-amber-500/35">
      {/* Sidebar Brand Header */}
      <div className="p-4 border-b border-amber-500/25 space-y-3">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="inline-block">
            <Logo size="sm" theme="light" />
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-8 h-8 rounded-xl bg-white/80 text-stone-700 flex items-center justify-center border border-amber-500/30 cursor-pointer"
            aria-label="Close Sidebar Menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-3 py-2 rounded-xl bg-white/85 border border-amber-500/25 space-y-0.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-black text-emerald-800 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Admin ERP Portal</span>
          </div>
          <div className="text-[11px] font-mono font-semibold text-stone-700 truncate">
            {userEmail}
          </div>
        </div>
      </div>

      {/* Left Menu Navigation Groups */}
      <nav aria-label="Admin Sidebar Navigation" className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.heading} className="space-y-1.5">
            <div className="px-2.5 text-[10px] font-mono font-black uppercase tracking-wider text-stone-500">
              {group.heading}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                      isActive
                        ? 'bg-stone-950 text-amber-400 shadow-md border border-amber-500/40'
                        : 'text-stone-800 hover:bg-white/90 hover:text-stone-950 border border-transparent hover:border-amber-500/30'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-amber-400' : 'text-amber-700 group-hover:text-amber-600'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isActive
                          ? 'text-amber-400 opacity-100'
                          : 'text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Bottom Actions */}
      <div className="p-3 border-t border-amber-500/25 space-y-2 bg-white/50">
        <Link href="/" className="block">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start h-9 text-xs font-bold bg-white text-stone-800 border-amber-500/30 hover:bg-amber-50 rounded-xl cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-2 text-amber-600" />
            View Public Website
          </Button>
        </Link>

        <Button
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start h-9 text-xs font-black bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-xs cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 mr-2" />
          Logout Admin Session
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-stone-950 flex">
      {/* Desktop Sticky Left Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-0 h-screen z-30">
        <SidebarContent />
      </aside>

      {/* Mobile / Tablet Slide-Over Left Sidebar Drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] h-full z-10 shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Right Main Workspace */}
      <div className="flex-1 min-w-0 flex flex-col pb-20 md:pb-8">
        {/* Top Utility Bar: Mobile Menu Toggle + Live Version, Auto-Sync & APK/PWA Download */}
        <header className="sticky top-0 z-20 bg-[#FAF8F5]/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-amber-500/25 px-4 sm:px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mt-0.5 sm:mt-0 w-9 h-9 rounded-xl bg-white border border-amber-500/40 text-stone-900 flex items-center justify-center shrink-0 shadow-2xs cursor-pointer"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex-1 min-w-0">
              <AdminAppControls />
            </div>
          </div>
        </header>

        {/* Active Admin Page Content */}
        <div className="flex-1">{children}</div>
      </div>

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

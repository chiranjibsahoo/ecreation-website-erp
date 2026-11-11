'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Home,
  Layers,
  Briefcase,
  Info,
  FileText,
  Mail,
  Send,
  Sparkles,
  PhoneCall,
  Search,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { CommandMenu } from '@/components/layout/CommandMenu';
import { Logo } from '@/components/common/Logo';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Services', href: '/services', icon: Layers },
    { label: 'Case Studies', href: '/projects', icon: Briefcase },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Insights & Blog', href: '/blog', icon: FileText },
    { label: 'Contact', href: '/contact', icon: Mail }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm py-3'
          : 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-xs py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Company Logo & Branding */}
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-slate-100/70 dark:bg-slate-900/70 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs border border-amber-400/80 dark:border-amber-500'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Area: Search, Admin Portal & Quick Enquiry */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Quick Search Palette (Raycast / Linear reference) */}
          <button
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-amber-400/50 transition-colors shadow-2xs"
            aria-label="Open command palette search"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden lg:inline text-[11px] font-medium">Search...</span>
            <kbd className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400">
              ⌘K
            </kbd>
          </button>

          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50/70 dark:hover:bg-amber-950/40 rounded-xl h-9"
            >
              <LogIn className="w-3.5 h-3.5 mr-1.5 text-amber-600 dark:text-amber-400" />
              Login
            </Button>
          </Link>

          {/* Quick Enquiry Option: Redirects to /contact#enquiry */}
          <Link href="/contact#enquiry">
            <Button
              size="sm"
              className="relative group bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-bold text-xs sm:text-sm px-4 h-9 rounded-xl shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-[1.02]"
              aria-label="Redirect to Project Enquiry Page"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-950 animate-pulse mr-2 inline-block shrink-0" />
              <span>Quick Enquiry</span>
              <Send className="w-3.5 h-3.5 ml-1.5 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Sheet Trigger */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={() => setCommandOpen(true)}
            className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100"
            aria-label="Open search palette"
          >
            <Search className="h-3.5 w-3.5" />
          </button>

          <Link href="/contact#enquiry">
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-bold rounded-lg px-2.5 h-8 text-xs shadow-xs"
            >
              Enquire
            </Button>
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-6 flex flex-col justify-between bg-white dark:bg-slate-950">
              <div>
                <SheetTitle className="text-left mb-6">
                  <Logo size="sm" />
                </SheetTitle>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                          active
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-slate-400'}`} />
                          {link.label}
                        </span>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </Link>
                    );
                  })}

                  <div className="my-3 border-t border-slate-200 dark:border-slate-800" />

                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-700 hover:bg-amber-50/70 flex items-center gap-3"
                  >
                    <LogIn className="w-4 h-4 text-amber-600" />
                    Staff Login & Admin Portal
                  </Link>
                </nav>
              </div>

              {/* Bottom Mobile Action & Direct Contact */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <Link
                  href="/contact#enquiry"
                  onClick={() => setMobileOpen(false)}
                  className="w-full block"
                >
                  <Button className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 rounded-xl py-5 font-bold shadow-md shadow-amber-500/25 text-sm flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-950 animate-pulse" />
                    <span>Quick Project Enquiry</span>
                    <Send className="w-4 h-4 ml-1" />
                  </Button>
                </Link>

                <div className="text-center">
                  <a
                    href="tel:+919876543210"
                    className="text-xs font-mono text-slate-500 hover:text-blue-600 inline-flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                    +91 (987) 654-3210
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Global Command Menu Dialog (Raycast / Linear Reference) */}
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { HeaderEnquiryModal } from '@/components/forms/HeaderEnquiryModal';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Case Studies', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Insights & Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Company Logo & Branding */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
          aria-label="Ecreation IT Solution Home"
        >
          {/* Logo Placeholder: easily swappable with custom image asset at final step */}
          <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 dark:border-neutral-700 flex items-center justify-center text-white font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
            E
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground leading-none">
              Ecreation
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground mt-0.5">
              IT Solution
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-primary font-semibold bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Admin
            </Button>
          </Link>

          {/* Quick Enquiry Modal to the right of the menu bar */}
          <HeaderEnquiryModal
            variant="outline"
            triggerText="Quick Enquiry"
            triggerClassName="border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          />

          <Link href="/contact">
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm shadow-indigo-600/30 font-medium px-4"
            >
              Start Project
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Sheet */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="h-9 w-9 rounded-lg border border-input bg-background flex items-center justify-center hover:bg-muted" aria-label="Toggle navigation menu">
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-6 flex flex-col justify-between">
              <div>
                <SheetTitle className="text-left flex items-center gap-2.5 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center font-bold text-sm">
                    E
                  </div>
                  <div>
                    <span className="font-bold text-base text-foreground block leading-tight">Ecreation</span>
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">IT Solution</span>
                  </div>
                </SheetTitle>

                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive(link.href)
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-border" />
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin ERP Portal
                  </Link>
                </nav>
              </div>

              <div className="pt-6 border-t border-border space-y-3">
                <HeaderEnquiryModal
                  variant="outline"
                  triggerText="Quick Project Enquiry"
                  triggerClassName="w-full justify-center py-5 border-neutral-300 dark:border-neutral-700"
                />
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="w-full block">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-semibold shadow-md">
                    Discuss Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

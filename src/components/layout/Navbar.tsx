'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  Home,
  Layers,
  Briefcase,
  Mail,
  Send,
  Sparkles,
  PhoneCall,
  Search,
  LogIn,
  ChevronDown,
  Globe,
  Building2,
  Bot,
  TrendingUp,
  Smartphone,
  Cloud,
  Tag,
  Images
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { CommandMenu } from '@/components/layout/CommandMenu';
import { Logo } from '@/components/common/Logo';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceCategories = [
    {
      title: 'Website Design & Web Development',
      desc: 'Luxury corporate websites, E-commerce & Next.js portals',
      href: '/services/custom-software-engineering',
      icon: Globe,
      tag: 'Most Popular'
    },
    {
      title: 'Office Automation & ERP Software',
      desc: 'Custom GST billing, inventory, HR payroll & CRM suites',
      href: '/services/enterprise-erp-crm',
      icon: Building2,
      tag: 'Enterprise'
    },
    {
      title: 'Digital Marketing, SEO & Social Media',
      desc: 'Rank #1 on Google, Instagram/LinkedIn brand management & Ads',
      href: '/#interactive-showcase',
      icon: TrendingUp,
      tag: 'High ROI'
    },
    {
      title: 'AI Solutions & Workflow Automation',
      desc: '24/7 AI sales chatbots, WhatsApp automation & smart pipelines',
      href: '/services/ai-automation-workflows',
      icon: Bot,
      tag: 'AI Powered'
    },
    {
      title: 'Mobile App Development (iOS & Android)',
      desc: 'High-speed cross-platform & native business mobile apps',
      href: '/services/mobile-app-development',
      icon: Smartphone,
      tag: 'iOS / Android'
    },
    {
      title: 'Cloud Infrastructure & Cyber Security',
      desc: 'AWS/Vercel hosting, database security & 99.99% uptime SLA',
      href: '/services/cloud-devops-infrastructure',
      icon: Cloud,
      tag: '99.99% SLA'
    }
  ];

  // Streamlined, high-impact navigation (About Us & Insights removed as requested)
  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Solutions Gallery', href: '/#visual-gallery', icon: Images },
    { label: 'Portfolio', href: '/projects', icon: Briefcase },
    { label: '25% Offer', href: '/#offers', icon: Tag },
    { label: 'Contact', href: '/contact', icon: Mail }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* 1. Top Executive Offer & Direct Contact Ribbon */}
      <div
        className={`bg-stone-950 text-stone-300 border-b border-amber-500/25 transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 py-0 opacity-0 border-none' : 'max-h-11 py-2 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 truncate">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-[10px] uppercase tracking-wider shrink-0">
              <Sparkles className="w-3 h-3" />
              25% OFF LAUNCH OFFER
            </span>
            <span className="text-stone-200 truncate font-medium">
              Flat 25% OFF on Complete Business Website, Custom Office ERP &amp; Digital Marketing Packages
            </span>
            <Link
              href="/#offers"
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4 shrink-0 hidden sm:inline-flex items-center gap-1"
            >
              Claim Now
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-5 shrink-0 font-mono text-[11px] text-stone-300">
            <a
              href="tel:+919876543210"
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>+91 98765 43210</span>
            </a>
            <span className="text-stone-700">|</span>
            <a
              href="mailto:contact@ecreation.in"
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span>contact@ecreation.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Eye-Catching Main Architectural Header Bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-stone-950/95 backdrop-blur-xl border-b border-stone-200/90 dark:border-stone-800 shadow-lg shadow-stone-950/5 py-2.5'
            : 'bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Eye-Catching Center Navigation Capsule */}
          <nav
            className="hidden lg:flex items-center gap-1 p-1.5 rounded-2xl bg-[#FAF8F5] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-2xs"
            aria-label="Main Navigation"
          >
            {/* Home Link */}
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/')
                  ? 'bg-stone-950 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              <Home className={`w-3.5 h-3.5 ${isActive('/') ? 'text-amber-400' : 'text-stone-400'}`} />
              <span>Home</span>
            </Link>

            {/* Interactive IT Services Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 inline-flex items-center gap-1.5 ${
                  pathname.startsWith('/services')
                    ? 'bg-stone-950 text-white shadow-sm'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 hover:bg-stone-200/60'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${pathname.startsWith('/services') ? 'text-amber-400' : 'text-amber-600'}`} />
                <span>IT Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180 text-amber-600' : ''
                  }`}
                />
              </Link>

              {/* Mega Dropdown Panel */}
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[650px] z-50">
                  <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-2xl shadow-stone-950/20 p-5 grid grid-cols-2 gap-2.5">
                    <div className="col-span-2 pb-2.5 mb-1 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Complete IT, Software &amp; Digital Growth Solutions
                      </span>
                      <Link
                        href="/services"
                        className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                      >
                        View All 6 Services
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {serviceCategories.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setServicesOpen(false)}
                          className="group p-3 rounded-2xl hover:bg-[#FAF8F5] dark:hover:bg-stone-800/70 border border-transparent hover:border-stone-200/80 transition-all flex items-start gap-3"
                        >
                          <div className="w-10 h-10 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-stone-900 dark:text-white group-hover:text-amber-700 transition-colors">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}

                    <div className="col-span-2 mt-2 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-950 text-white px-4 py-3 rounded-2xl">
                      <div className="text-xs text-stone-300">
                        <span className="font-bold text-amber-400">Need a custom quote?</span> Get a free architecture &amp; cost roadmap in 4 hours.
                      </div>
                      <Link
                        href="/#estimator"
                        onClick={() => setServicesOpen(false)}
                        className="text-xs font-bold text-amber-400 hover:text-amber-300 whitespace-nowrap flex items-center gap-1"
                      >
                        Cost Calculator
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Remaining Streamlined Links: Solutions Gallery, Portfolio, 25% Offer, Contact */}
            {navLinks.slice(1).map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              const isOffer = link.href === '/#offers';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    isOffer
                      ? 'bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-stone-950'
                      : active
                      ? 'bg-stone-950 text-white shadow-sm'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 hover:bg-stone-200/60'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isOffer
                        ? 'text-amber-700 dark:text-amber-400'
                        : active
                        ? 'text-amber-400'
                        : 'text-stone-400'
                    }`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Area */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-stone-900 text-xs text-stone-600 hover:text-stone-950 hover:border-amber-500/50 transition-colors"
              aria-label="Open command palette search"
            >
              <Search className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden xl:inline text-xs font-semibold">Search</span>
              <kbd className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-500">
                ⌘K
              </kbd>
            </button>

            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-bold text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-800 hover:bg-stone-100 rounded-xl h-10 px-3.5"
              >
                <LogIn className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                Login
              </Button>
            </Link>

            <Link href="/contact#enquiry">
              <Button
                size="sm"
                className="group bg-stone-950 hover:bg-stone-900 text-white font-black text-xs sm:text-sm px-5 h-10 rounded-xl shadow-lg shadow-stone-950/15 border border-amber-500/60 transition-all hover:scale-[1.02]"
                aria-label="Redirect to Project Enquiry Page"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-2 inline-block shrink-0" />
                <span>Get Free Quote</span>
                <Send className="w-3.5 h-3.5 ml-1.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setCommandOpen(true)}
              className="h-9 w-9 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-600 hover:bg-stone-100"
              aria-label="Open search palette"
            >
              <Search className="h-4 w-4 text-amber-600" />
            </button>

            <Link href="/contact#enquiry" className="md:hidden">
              <Button
                size="sm"
                className="bg-stone-950 text-white border border-amber-500/50 font-bold rounded-xl px-3 h-9 text-xs"
              >
                Free Quote
              </Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="h-9 w-9 rounded-xl border border-stone-200 bg-white flex items-center justify-center text-stone-800 hover:bg-stone-100"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] max-w-sm p-6 flex flex-col justify-between bg-white dark:bg-stone-950 overflow-y-auto">
                <div>
                  <SheetTitle className="text-left mb-6">
                    <Logo size="sm" />
                  </SheetTitle>

                  <div className="mb-4 p-3.5 rounded-2xl bg-stone-950 text-white border border-amber-500/40">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Limited Period Offer
                    </div>
                    <p className="text-xs font-semibold mt-1">
                      Flat 25% OFF on Complete Website + ERP &amp; SEO Packages
                    </p>
                  </div>

                  <nav className="flex flex-col gap-1.5">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-colors ${
                            active
                              ? 'bg-stone-950 text-white'
                              : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-amber-600'}`} />
                            {link.label}
                          </span>
                        </Link>
                      );
                    })}

                    <Link
                      href="/services"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-xl text-sm font-bold text-stone-700 hover:text-stone-950 hover:bg-stone-100 flex items-center gap-3"
                    >
                      <Layers className="w-4 h-4 text-amber-600" />
                      All IT Services
                    </Link>

                    <div className="my-2 border-t border-stone-200" />

                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-100 flex items-center gap-3"
                    >
                      <LogIn className="w-4 h-4 text-amber-600" />
                      Client &amp; Admin Portal Login
                    </Link>
                  </nav>
                </div>

                <div className="pt-6 border-t border-stone-200 space-y-3">
                  <Link
                    href="/contact#enquiry"
                    onClick={() => setMobileOpen(false)}
                    className="w-full block"
                  >
                    <Button className="w-full bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/50 rounded-xl py-5 font-bold text-sm flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>Get Free Project Quote</span>
                      <Send className="w-4 h-4 ml-1 text-amber-400" />
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  Layers,
  Mail,
  Send,
  Sparkles,
  Search,
  LogIn,
  LogOut,
  ChevronDown,
  Globe,
  Building2,
  Bot,
  TrendingUp,
  Smartphone,
  Cloud,
  ShieldCheck,
  ArrowUpRight
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
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('ecreation_admin_auth');
      setIsAdminLoggedIn(auth === 'authenticated');
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [pathname]);

  const handleHeaderLogout = () => {
    localStorage.removeItem('ecreation_admin_auth');
    localStorage.removeItem('ecreation_admin_email');
    document.cookie = 'ecreation_admin_auth=; path=/; max-age=0';
    setIsAdminLoggedIn(false);
    setMobileOpen(false);
    router.push('/login');
  };

  const serviceCategories = [
    {
      title: 'Website Design & Web Development',
      desc: 'Luxury corporate websites, E-commerce & Next.js portals',
      href: '/services/custom-software-engineering',
      image: '/images/showcase/web-design-showcase.jpg',
      icon: Globe
    },
    {
      title: 'Office Automation & ERP Software',
      desc: 'Custom GST billing, inventory, HR payroll & CRM suites',
      href: '/services/enterprise-erp-crm',
      image: '/images/showcase/erp-automation-showcase.jpg',
      icon: Building2
    },
    {
      title: 'Digital Marketing, SEO & Social Media',
      desc: 'Rank #1 on Google, Instagram/LinkedIn brand management & Ads',
      href: '/#interactive-showcase',
      image: '/images/showcase/social-marketing-showcase.jpg',
      icon: TrendingUp
    },
    {
      title: 'AI Solutions & Workflow Automation',
      desc: '24/7 AI sales chatbots, smart pipelines & business bots',
      href: '/services/ai-automation-workflows',
      image: '/images/showcase/ai-workflow-showcase.jpg',
      icon: Bot
    },
    {
      title: 'Mobile App Development (iOS & Android)',
      desc: 'High-speed cross-platform & native business mobile apps',
      href: '/services/mobile-app-development',
      image: '/images/showcase/mobile-app-showcase.jpg',
      icon: Smartphone
    },
    {
      title: 'Cloud Infrastructure & Cyber Security',
      desc: 'AWS/Vercel hosting, database security & 99.99% uptime SLA',
      href: '/services/cloud-devops-infrastructure',
      image: '/images/showcase/cloud-security-showcase.jpg',
      icon: Cloud
    }
  ];

  // Clean, executive 5-item navigation including SEO Blogs hub
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/projects' },
    { label: 'Blogs', href: '/blog' },
    { label: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top 3px 24K Royal Gold Crown Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />

      {/* Main Warm Champagne-Pearl & Brushed Gold Architectural Header */}
      <div
        className={`navbar-bordered-shell transition-all duration-300 ${
          scrolled
            ? 'bg-gradient-to-r from-[#FFFDF9]/98 via-[#FAF3E3]/98 to-[#FFFDF9]/98 dark:from-stone-950/95 dark:via-stone-900/95 dark:to-stone-950/95 backdrop-blur-2xl py-3'
            : 'bg-gradient-to-r from-[#FFFDF9] via-[#F9F1DF] to-[#FFFDF9] dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Left: Brand Logo */}
          <div className="flex items-center shrink-0 transition-transform duration-300 hover:scale-[1.04]">
            <Logo size="md" theme="light" />
          </div>

          {/* Center: Clean & Refined Menu Bar with Sleek Gold Indicator Line (No Blobs/Circles) */}
          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-9 nav-menu-clean"
            aria-label="Main Navigation"
          >
            {/* 1. Home */}
            <Link
              href="/"
              className={`nav-item-clean group ${
                isActive('/')
                  ? 'is-active text-stone-950 dark:text-white font-extrabold'
                  : 'text-stone-700 dark:text-stone-300 font-semibold hover:text-stone-950 dark:hover:text-amber-400'
              }`}
            >
              <span>Home</span>
              <span className="nav-indicator-line" />
            </Link>

            {/* 2. Services (With Visual Studio Mega-Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={`nav-item-clean inline-flex items-center gap-1.5 group ${
                  pathname.startsWith('/services') || servicesOpen
                    ? 'is-active text-stone-950 dark:text-white font-extrabold'
                    : 'text-stone-700 dark:text-stone-300 font-semibold hover:text-stone-950 dark:hover:text-amber-400'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-600 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180' : ''
                  }`}
                />
                <span className="nav-indicator-line" />
              </Link>

              {/* Visual Mega Dropdown Panel */}
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[740px] z-50">
                  <div className="bg-white dark:bg-stone-900 rounded-3xl border-2 border-amber-500/40 shadow-[0_25px_70px_rgba(20,18,16,0.22)] p-6 grid grid-cols-2 gap-3.5">
                    <div className="col-span-2 pb-3 mb-1 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-white">
                          Complete IT, Software &amp; Digital Growth Solutions
                        </span>
                      </div>
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                      >
                        Explore All 6 Services
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {serviceCategories.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setServicesOpen(false)}
                          className="subsection-bordered-card group p-3 rounded-2xl bg-[#FAF8F5] dark:bg-stone-800/70 flex items-center gap-3.5"
                        >
                          <div className="w-16 h-14 rounded-xl overflow-hidden bg-stone-950 border border-amber-500/35 shrink-0 relative">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <Icon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span className="text-xs font-bold text-stone-950 dark:text-white truncate">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug line-clamp-2">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}

                    <div className="subsection-bordered-item col-span-2 mt-1 pt-3 border-t border-amber-500/30 flex items-center justify-between bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-900 px-5 py-3.5 rounded-2xl">
                      <div className="text-xs text-stone-800 font-medium">
                        <span className="font-black text-emerald-800">Need a custom quote?</span> Get a free architecture &amp; cost roadmap in 4 hours.
                      </div>
                      <Link
                        href="/#estimator"
                        onClick={() => setServicesOpen(false)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black whitespace-nowrap flex items-center gap-1 shadow-2xs"
                      >
                        Cost Calculator
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Portfolio & 4. Contact */}
            {navLinks.slice(1).map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-item-clean group ${
                    active
                      ? 'is-active text-stone-950 dark:text-white font-extrabold'
                      : 'text-stone-700 dark:text-stone-300 font-semibold hover:text-stone-950 dark:hover:text-amber-400'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="nav-indicator-line" />
                </Link>
              );
            })}
          </nav>

          {/* Right: Direct Email + Search + Login/Logout + Get Free Quote */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <a
              href="mailto:contact@ecreation.in"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/80 dark:bg-stone-900 border border-amber-500/30 hover:border-amber-500 text-xs font-mono font-bold text-stone-800 dark:text-stone-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              <span>contact@ecreation.in</span>
            </a>

            <button
              onClick={() => setCommandOpen(true)}
              className="h-10 w-10 rounded-xl border border-amber-500/30 bg-white/80 dark:bg-stone-900 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-amber-700 hover:border-amber-500 transition-all duration-300 hover:scale-110 hover:-rotate-6 hover:shadow-md cursor-pointer shadow-2xs"
              aria-label="Open command palette search"
              title="Search (⌘K)"
            >
              <Search className="w-4 h-4 text-amber-600" />
            </button>

            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                {!pathname.startsWith('/admin') && (
                  <Link href="/admin">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-bold text-stone-900 bg-amber-400/25 border-amber-500/50 hover:bg-amber-400/40 rounded-xl h-10 px-3"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleHeaderLogout}
                  className="text-xs font-extrabold text-white bg-red-600 hover:bg-red-500 border-red-500 rounded-xl h-10 px-3.5 shadow-sm cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1.5 text-white" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-extrabold text-stone-800 dark:text-stone-200 bg-white/85 dark:bg-stone-900 border-amber-500/35 hover:bg-amber-50 hover:border-amber-500 rounded-xl h-10 px-3.5 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                  Login
                </Button>
              </Link>
            )}

            <Link href="/contact#enquiry">
              <Button
                size="sm"
                className="group bg-stone-950 hover:bg-stone-900 text-white font-black text-xs sm:text-sm px-5 h-10 rounded-xl shadow-lg shadow-stone-950/15 border border-amber-500/60 transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/30"
                aria-label="Redirect to Project Enquiry Page"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-2 inline-block shrink-0" />
                <span>Get Free Quote</span>
                <ArrowUpRight className="w-4 h-4 ml-1 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setCommandOpen(true)}
              className="h-9 w-9 rounded-xl border border-amber-500/35 bg-white flex items-center justify-center text-stone-700"
              aria-label="Open search palette"
            >
              <Search className="h-4 w-4 text-amber-600" />
            </button>

            <Link href="/contact#enquiry" className="hidden xs:inline-flex md:hidden">
              <Button
                size="sm"
                className="bg-stone-950 text-white border border-amber-500/50 font-bold rounded-xl px-3 h-9 text-xs"
              >
                Free Quote
              </Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="h-9 w-9 rounded-xl border border-amber-500/40 bg-white flex items-center justify-center text-stone-900"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </SheetTrigger>
              <SheetContent side="right" className="w-[90vw] max-w-sm p-5 sm:p-6 flex flex-col justify-between bg-[#FFFDF9] dark:bg-stone-950 text-stone-900 dark:text-white border-l border-amber-500/30 overflow-y-auto">
                <div>
                  <SheetTitle className="text-left mb-5">
                    <Logo size="sm" theme="light" />
                  </SheetTitle>

                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const active = isActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`px-3.5 py-2.5 rounded-xl text-sm font-extrabold flex items-center justify-between transition-colors ${
                            active
                              ? 'bg-stone-950 text-amber-400'
                              : 'text-stone-800 dark:text-stone-200 hover:bg-amber-50/80'
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                        </Link>
                      );
                    })}

                    <div className="my-2 border-t border-stone-200 dark:border-stone-800 pt-2">
                      <div className="px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                        Services
                      </div>
                      <div className="grid grid-cols-1 gap-1 mt-1">
                        {serviceCategories.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="px-3.5 py-2 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-amber-50/80 flex items-center gap-2.5"
                            >
                              <Icon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span className="truncate">{item.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    <div className="my-1.5 border-t border-stone-200 dark:border-stone-800" />

                    {isAdminLoggedIn ? (
                      <div className="space-y-1.5 pt-1">
                        <Link
                          href="/admin"
                          onClick={() => setMobileOpen(false)}
                          className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-stone-950 bg-amber-400/30 border border-amber-500/40 flex items-center gap-3"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-700" />
                          Open Admin ERP Dashboard
                        </Link>
                        <button
                          onClick={handleHeaderLogout}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 flex items-center gap-3 text-left"
                        >
                          <LogOut className="w-4 h-4 text-white" />
                          Logout (End Admin Session)
                        </button>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-amber-50/80 flex items-center gap-3"
                      >
                        <LogIn className="w-4 h-4 text-amber-600" />
                        Client &amp; Admin Portal Login
                      </Link>
                    )}
                  </nav>
                </div>

                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2.5">
                  <a
                    href="mailto:contact@ecreation.in"
                    className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-stone-700 py-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-600" />
                    <span>contact@ecreation.in</span>
                  </a>
                  <Link
                    href="/contact#enquiry"
                    onClick={() => setMobileOpen(false)}
                    className="w-full block"
                  >
                    <Button className="w-full bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/50 rounded-xl py-5 font-black text-sm flex items-center justify-center gap-2">
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

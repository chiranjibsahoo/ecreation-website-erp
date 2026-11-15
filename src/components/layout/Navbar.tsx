'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Tag,
  Images,
  ShieldCheck
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
      image: '/images/showcase/web-design-showcase.jpg',
      icon: Globe,
      tag: 'Most Popular'
    },
    {
      title: 'Office Automation & ERP Software',
      desc: 'Custom GST billing, inventory, HR payroll & CRM suites',
      href: '/services/enterprise-erp-crm',
      image: '/images/showcase/erp-automation-showcase.jpg',
      icon: Building2,
      tag: 'Enterprise'
    },
    {
      title: 'Digital Marketing, SEO & Social Media',
      desc: 'Rank #1 on Google, Instagram/LinkedIn brand management & Ads',
      href: '/#interactive-showcase',
      image: '/images/showcase/social-marketing-showcase.jpg',
      icon: TrendingUp,
      tag: 'High ROI'
    },
    {
      title: 'AI Solutions & Workflow Automation',
      desc: '24/7 AI sales chatbots, smart pipelines & business bots',
      href: '/services/ai-automation-workflows',
      image: '/images/showcase/ai-workflow-showcase.jpg',
      icon: Bot,
      tag: 'AI Powered'
    },
    {
      title: 'Mobile App Development (iOS & Android)',
      desc: 'High-speed cross-platform & native business mobile apps',
      href: '/services/mobile-app-development',
      image: '/images/showcase/mobile-app-showcase.jpg',
      icon: Smartphone,
      tag: 'iOS / Android'
    },
    {
      title: 'Cloud Infrastructure & Cyber Security',
      desc: 'AWS/Vercel hosting, database security & 99.99% uptime SLA',
      href: '/services/cloud-devops-infrastructure',
      image: '/images/showcase/cloud-security-showcase.jpg',
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
      {/* 1. Top Shimmering Gold & Obsidian Executive Ribbon */}
      <div
        className={`bg-gradient-to-r from-[#0E0C0A] via-[#1C1814] to-[#0E0C0A] text-stone-200 border-b border-amber-500/30 transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 py-0 opacity-0 border-none' : 'max-h-9 py-1.5 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 truncate">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-stone-950 font-black text-[10px] uppercase tracking-wider shrink-0 shadow-xs">
              <Sparkles className="w-3 h-3" />
              25% OFF SPECIAL OFFER
            </span>
            <span className="text-stone-200 truncate font-medium">
              Flat 25% OFF on Complete Business Website, Custom Office ERP &amp; Digital Marketing Packages
            </span>
            <Link
              href="/#offers"
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4 shrink-0 hidden sm:inline-flex items-center gap-1"
            >
              Claim Offer
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4 shrink-0 font-mono text-[11px] text-stone-300">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ISO 27001 · 99.99% SLA
            </span>
            <span className="text-stone-700">|</span>
            <a
              href="mailto:contact@ecreation.in"
              className="px-2.5 py-0.5 rounded-full bg-stone-900 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span>contact@ecreation.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Eye-Catching Royal Obsidian & 24K Gold Floating Architectural Header */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'px-2 sm:px-4 lg:px-8 pt-2'
            : 'px-0'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto transition-all duration-300 relative ${
            scrolled
              ? 'bg-[#12100E]/95 backdrop-blur-2xl border border-amber-500/45 rounded-2xl shadow-[0_16px_45px_rgba(0,0,0,0.4)] px-4 sm:px-6 py-2'
              : 'bg-[#12100E] border-b-2 border-amber-500/40 shadow-[0_12px_35px_rgba(0,0,0,0.22)] px-4 sm:px-6 lg:px-8 py-2.5 lg:rounded-b-3xl'
          }`}
        >
          {/* Top Metallic Gold Shimmer Accent Line */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between gap-3">
            {/* Brand Logo in Dark Luxury Mode */}
            <div className="relative">
              <div className="absolute -inset-2 bg-amber-500/10 blur-xl rounded-full pointer-events-none" />
              <Logo size="md" theme="dark" />
            </div>

            {/* Eye-Catching Center Sculpted Gold-Trimmed Navigation Deck */}
            <nav
              className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-[#1C1916] border border-amber-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              aria-label="Main Navigation"
            >
              {/* Home Link */}
              <Link
                href="/"
                className={`px-4 py-2 rounded-full text-xs font-extrabold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                  isActive('/')
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-stone-950 shadow-md shadow-amber-500/25'
                    : 'text-stone-200 hover:text-amber-300 hover:bg-stone-800/80'
                }`}
              >
                <Home className={`w-3.5 h-3.5 ${isActive('/') ? 'text-stone-950' : 'text-amber-400'}`} />
                <span>Home</span>
              </Link>

              {/* Interactive Visual IT Services Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href="/services"
                  className={`px-4 py-2 rounded-full text-xs font-extrabold tracking-wide transition-all duration-200 inline-flex items-center gap-1.5 ${
                    pathname.startsWith('/services')
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-stone-950 shadow-md shadow-amber-500/25'
                      : 'text-stone-200 hover:text-amber-300 hover:bg-stone-800/80'
                  }`}
                >
                  <Layers className={`w-3.5 h-3.5 ${pathname.startsWith('/services') ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span>IT Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </Link>

                {/* Visual Studio Mega Dropdown Panel */}
                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3.5 w-[740px] z-50">
                    <div className="bg-[#141210] text-white rounded-3xl border-2 border-amber-500/40 shadow-[0_25px_70px_rgba(0,0,0,0.65)] p-5 grid grid-cols-2 gap-3">
                      <div className="col-span-2 pb-3 mb-1 border-b border-stone-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                            Complete IT, Software &amp; Digital Growth Solutions
                          </span>
                        </div>
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="text-xs font-bold text-stone-300 hover:text-amber-400 flex items-center gap-1"
                        >
                          View All 6 Services
                          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                        </Link>
                      </div>

                      {serviceCategories.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setServicesOpen(false)}
                            className="group p-2.5 rounded-2xl bg-stone-900/70 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all flex items-center gap-3.5"
                          >
                            <div className="w-16 h-14 rounded-xl overflow-hidden bg-stone-950 border border-stone-700 shrink-0 relative">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-stone-950/30" />
                            </div>
                            <div className="space-y-0.5 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                                  {item.title}
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-400 leading-snug line-clamp-2">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}

                      <div className="col-span-2 mt-1 pt-3 border-t border-stone-800 flex items-center justify-between bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 px-4 py-3 rounded-2xl">
                        <div className="text-xs text-stone-200">
                          <span className="font-black text-amber-400">Need a custom quote?</span> Get a free architecture &amp; cost roadmap in 4 hours.
                        </div>
                        <Link
                          href="/#estimator"
                          onClick={() => setServicesOpen(false)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black whitespace-nowrap flex items-center gap-1 shadow-sm"
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
                    className={`px-4 py-2 rounded-full text-xs font-extrabold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                      isOffer
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/60 hover:bg-amber-400 hover:text-stone-950 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : active
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-stone-950 shadow-md shadow-amber-500/25'
                        : 'text-stone-200 hover:text-amber-300 hover:bg-stone-800/80'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isOffer
                          ? 'text-amber-400 group-hover:text-stone-950'
                          : active
                          ? 'text-stone-950'
                          : 'text-amber-400'
                      }`}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Executive Action Cluster */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-700/80 bg-stone-900/90 text-xs text-stone-300 hover:text-amber-300 hover:border-amber-500/60 transition-colors cursor-pointer"
                aria-label="Open command palette search"
              >
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <kbd className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-stone-950 border border-stone-700 text-amber-400">
                  ⌘K
                </kbd>
              </button>

              {isAdminLoggedIn ? (
                <div className="flex items-center gap-2">
                  {!pathname.startsWith('/admin') && (
                    <Link href="/admin">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs font-bold text-amber-300 bg-stone-900/90 border-amber-500/40 hover:bg-stone-800 rounded-xl h-10 px-3"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleHeaderLogout}
                    className="text-xs font-extrabold text-white bg-red-600/90 hover:bg-red-600 border-red-500 rounded-xl h-10 px-3.5 shadow-sm cursor-pointer"
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
                    className="text-xs font-bold text-stone-200 bg-stone-900/90 border-stone-700 hover:bg-stone-800 hover:text-amber-300 hover:border-amber-500/50 rounded-xl h-10 px-3.5"
                  >
                    <LogIn className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                    Login
                  </Button>
                </Link>
              )}

              <Link href="/contact#enquiry">
                <Button
                  size="sm"
                  className="group bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:via-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs sm:text-sm px-5 h-10 rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.35)] border border-amber-300 transition-all hover:scale-[1.03]"
                  aria-label="Redirect to Project Enquiry Page"
                >
                  <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping mr-2 inline-block shrink-0" />
                  <span>Get Free Quote</span>
                  <Send className="w-3.5 h-3.5 ml-1.5 text-stone-950 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setCommandOpen(true)}
                className="h-9 w-9 rounded-xl border border-stone-700 bg-stone-900 flex items-center justify-center text-stone-200 hover:border-amber-400"
                aria-label="Open search palette"
              >
                <Search className="h-4 w-4 text-amber-400" />
              </button>

              <Link href="/contact#enquiry" className="hidden xs:inline-flex md:hidden">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-black rounded-xl px-3 h-9 text-xs"
                >
                  Free Quote
                </Button>
              </Link>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  className="h-9 w-9 rounded-xl border border-amber-500/50 bg-stone-900 flex items-center justify-center text-amber-400 hover:bg-stone-800"
                  aria-label="Toggle navigation menu"
                >
                  {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </SheetTrigger>
                <SheetContent side="right" className="w-[90vw] max-w-sm p-5 sm:p-6 flex flex-col justify-between bg-[#12100E] text-white border-l border-amber-500/30 overflow-y-auto">
                  <div>
                    <SheetTitle className="text-left mb-5">
                      <Logo size="sm" theme="dark" />
                    </SheetTitle>

                    <div className="mb-4 p-3.5 rounded-2xl bg-stone-900 text-white border border-amber-500/40">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Special Business Offer
                      </div>
                      <p className="text-xs font-semibold mt-1 text-stone-200">
                        Flat 25% OFF on Complete Website + ERP &amp; SEO Packages
                      </p>
                    </div>

                    <nav className="flex flex-col gap-1">
                      {navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between transition-colors ${
                              active
                                ? 'bg-amber-500 text-stone-950'
                                : 'text-stone-200 hover:text-amber-400 hover:bg-stone-900'
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <Icon className={`w-4 h-4 ${active ? 'text-stone-950' : 'text-amber-400'}`} />
                              {link.label}
                            </span>
                          </Link>
                        );
                      })}

                      <div className="my-2 border-t border-stone-800 pt-2">
                        <div className="px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                          Core IT &amp; Digital Services
                        </div>
                        <div className="grid grid-cols-1 gap-1 mt-1">
                          {serviceCategories.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-300 hover:text-amber-400 hover:bg-stone-900 flex items-center gap-2.5"
                              >
                                <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span className="truncate">{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="my-1.5 border-t border-stone-800" />

                      {isAdminLoggedIn ? (
                        <div className="space-y-1.5 pt-1">
                          <Link
                            href="/admin"
                            onClick={() => setMobileOpen(false)}
                            className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-amber-400 bg-stone-900 border border-amber-500/30 flex items-center gap-3"
                          >
                            <ShieldCheck className="w-4 h-4 text-amber-400" />
                            Open Admin ERP Dashboard
                          </Link>
                          <button
                            onClick={handleHeaderLogout}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600/90 hover:bg-red-600 flex items-center gap-3 text-left"
                          >
                            <LogOut className="w-4 h-4 text-white" />
                            Logout (End Admin Session)
                          </button>
                        </div>
                      ) : (
                        <Link
                          href="/login"
                          onClick={() => setMobileOpen(false)}
                          className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-stone-300 hover:text-amber-400 hover:bg-stone-900 flex items-center gap-3"
                        >
                          <LogIn className="w-4 h-4 text-amber-400" />
                          Client &amp; Admin Portal Login
                        </Link>
                      )}
                    </nav>
                  </div>

                  <div className="pt-4 border-t border-stone-800 space-y-2.5">
                    <Link
                      href="/contact#enquiry"
                      onClick={() => setMobileOpen(false)}
                      className="w-full block"
                    >
                      <Button className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-stone-950 rounded-xl py-5 font-black text-sm flex items-center justify-center gap-2">
                        <span>Get Free Project Quote</span>
                        <Send className="w-4 h-4 ml-1 text-stone-950" />
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
};

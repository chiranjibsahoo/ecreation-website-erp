'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Play,
  Pause,
  Globe,
  Building2,
  Share2,
  Cpu,
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';

export interface VisualGalleryItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  deliverables: string[];
  metricValue: string;
  metricLabel: string;
  href: string;
}

export const VisualPortfolioSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const items: VisualGalleryItem[] = [
    {
      id: 'website-design',
      number: '01',
      category: 'Website Design & Web Development',
      title: 'Bespoke Corporate Websites, E-Commerce Stores & Next.js Portals',
      description:
        'Custom-crafted responsive websites engineered for instant credibility, sub-second page loads, and maximum visitor-to-lead conversion. Includes full Admin CMS so your team can update pages anytime.',
      imageSrc: '/images/showcase/web-design-showcase.jpg',
      deliverables: [
        'Luxury Custom UI/UX Design',
        'Mobile, Tablet & 4K Responsive',
        'Payment Gateway & Booking Forms',
        'Dynamic Admin CMS Panel'
      ],
      metricValue: '0.4s',
      metricLabel: 'Edge Page Load Time',
      href: '/services/custom-software-engineering'
    },
    {
      id: 'office-automation',
      number: '02',
      category: 'Office Automation & ERP Softwares',
      title: 'Custom Billing, Multi-Branch Inventory, HR Payroll & CRM Software',
      description:
        'Digitize your entire office workflow. Automate GST invoice generation, track stock across warehouses in real time, manage employee attendance & payroll, and control staff access permissions.',
      imageSrc: '/images/showcase/erp-automation-showcase.jpg',
      deliverables: [
        'Automated GST Invoicing & Ledger',
        'Real-Time Stock & Purchase Orders',
        'Employee Attendance & Payroll',
        'Role-Based Staff & Admin Portals'
      ],
      metricValue: '84%',
      metricLabel: 'Manual Paperwork Eliminated',
      href: '/services/enterprise-erp-crm'
    },
    {
      id: 'social-media-seo',
      number: '03',
      category: 'Social Media, SEO & Digital Marketing',
      title: 'Google #1 Page SEO, Instagram/LinkedIn Growth & Paid Ad Funnels',
      description:
        'Turn your online presence into a 24/7 customer magnet. We handle technical SEO to rank your website #1 on Google, design viral social media reels & posts, and run high-ROI Google & Meta ad campaigns.',
      imageSrc: '/images/showcase/social-marketing-showcase.jpg',
      deliverables: [
        'Google #1 Keyword Ranking (SEO)',
        'Instagram, LinkedIn & FB Management',
        'Google Search & Meta Lead Ads',
        'Monthly ROI & Lead Analytics'
      ],
      metricValue: '+340%',
      metricLabel: 'Average Organic Traffic Growth',
      href: '/contact#enquiry'
    },
    {
      id: 'ai-automation',
      number: '04',
      category: 'AI Chatbots & Business Automation',
      title: '24/7 AI Customer Support Agents, WhatsApp Automation & Smart Workflows',
      description:
        'Never miss a customer inquiry again. Deploy custom AI chatbots trained on your business data across your website and WhatsApp to answer questions, qualify leads, and book appointments automatically.',
      imageSrc: '/images/showcase/ai-workflow-showcase.jpg',
      deliverables: [
        '24/7 Website & WhatsApp AI Bot',
        'Automated Lead Qualification',
        'Smart Document & Invoice OCR',
        'Instant CRM & Email Sync'
      ],
      metricValue: '< 2s',
      metricLabel: 'Instant Lead Response Speed',
      href: '/services/ai-automation-workflows'
    },
    {
      id: 'mobile-apps',
      number: '05',
      category: 'Mobile App Development (iOS & Android)',
      title: 'Sleek Customer & Enterprise Mobile Apps for Apple iOS and Google Play',
      description:
        'Launch your brand on your customers’ smartphones. We engineer fast, intuitive iOS and Android apps with push notifications, biometric login, live order tracking, and offline support.',
      imageSrc: '/images/showcase/mobile-app-showcase.jpg',
      deliverables: [
        'Apple iOS & Android Native Apps',
        'Push Notifications & Live Tracking',
        'UPI, Card & Wallet Payments',
        'Complete App Store Publishing'
      ],
      metricValue: '4.9 ★',
      metricLabel: 'Client App Store Benchmark',
      href: '/services/mobile-app-development'
    },
    {
      id: 'cloud-security',
      number: '06',
      category: 'Cloud Hosting, DevOps & Cyber Security',
      title: 'High-Availability Cloud Servers, Automated Backups & Zero-Trust Security',
      description:
        'Keep your business online 24/7/365 with enterprise AWS, Google Cloud, and Vercel architecture. Protected by bank-grade SSL encryption, daily automated database backups, and DDoS defense.',
      imageSrc: '/images/showcase/cloud-security-showcase.jpg',
      deliverables: [
        'AWS / Vercel / Cloud Server Setup',
        'Automated Daily Data Backups',
        'Row-Level Security & SSL Shield',
        '24/7 Uptime & Speed Monitoring'
      ],
      metricValue: '99.99%',
      metricLabel: 'Guaranteed Server Uptime SLA',
      href: '/services/cloud-devops-infrastructure'
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [autoPlay, items.length]);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  const current = items[activeIndex];

  return (
    <section
      id="visual-gallery"
      className="py-20 sm:py-24 bg-white dark:bg-stone-950 border-b border-stone-200/80 dark:border-stone-800 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-300/80 dark:border-amber-800 text-xs font-bold text-amber-900 dark:text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Visual IT Solutions Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-white mt-3">
              Complete IT, Software &amp; Digital Growth Under One Roof
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg max-w-2xl mt-2">
              Browse our visual showcase across Website Design, Office Automation &amp; ERP Softwares, Social Media &amp; SEO, AI Chatbots, and Mobile Apps.
            </p>
          </FadeIn>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2.5 self-start lg:self-end">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs font-bold text-stone-700 dark:text-stone-300 hover:border-amber-500/50 flex items-center gap-1.5 transition-colors"
              aria-label={autoPlay ? 'Pause visual slider' : 'Play visual slider'}
            >
              {autoPlay ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-amber-600" />}
              <span>{autoPlay ? 'Auto-Sliding' : 'Paused'}</span>
            </button>
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-950 hover:text-white text-stone-800 dark:text-stone-200 flex items-center justify-center transition-colors"
              aria-label="Previous visual slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs font-bold text-stone-600 dark:text-stone-400 px-2">
              0{activeIndex + 1} / 0{items.length}
            </span>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-950 hover:text-white text-stone-800 dark:text-stone-200 flex items-center justify-center transition-colors"
              aria-label="Next visual slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Featured Visual Image & Details Split Slider Card */}
        <div className="rounded-3xl bg-[#FAF8F5] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-4 sm:p-6 lg:p-8 shadow-xl shadow-stone-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left High-Resolution Image Showcase Frame (7 Cols) */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 h-[320px] sm:h-[440px] group">
              {items.map((item, idx) => (
                <img
                  key={item.id}
                  src={item.imageSrc}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
                    idx === activeIndex
                      ? 'opacity-100 scale-100 group-hover:scale-103'
                      : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                />
              ))}

              {/* Subtle Obsidian Gradient & Floating Metric Pill */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-stone-950/30" />

              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950/85 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-bold">
                <span>SOLUTION {current.number}</span>
                <span>·</span>
                <span className="text-white">{current.category}</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 p-4 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-stone-800 text-white">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono leading-none">
                    {current.metricValue}
                  </div>
                  <div className="text-xs text-stone-300 font-medium mt-1">
                    {current.metricLabel}
                  </div>
                </div>

                <Link href={current.href}>
                  <Button
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl px-4 h-10 text-xs"
                  >
                    Explore Solution
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Executive Description & Deliverables (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                  {current.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-white leading-tight">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Included Deliverables */}
              <div className="space-y-2.5 pt-2 border-t border-stone-200/80 dark:border-stone-800">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  What We Deliver For Your Business:
                </span>
                {current.deliverables.map((del) => (
                  <div
                    key={del}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                      {del}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/contact#enquiry">
                  <Button className="bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/40 rounded-xl px-6 h-11 font-bold text-xs sm:text-sm">
                    Request Free Demo &amp; Quote
                    <ArrowRight className="w-4 h-4 ml-2 text-amber-400" />
                  </Button>
                </Link>
                <Link href={current.href}>
                  <Button
                    variant="outline"
                    className="rounded-xl border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 h-11 px-5 text-xs sm:text-sm font-bold"
                  >
                    Full Specifications
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom 6-Card Visual Image Thumbnail Carousel Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-stone-200/80 dark:border-stone-800">
            {items.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative rounded-2xl overflow-hidden border text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-500/30 shadow-md scale-[1.02]'
                      : 'border-stone-200 dark:border-stone-800 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="h-24 w-full overflow-hidden bg-stone-900 relative">
                    <img
                      src={item.imageSrc}
                      alt={item.category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-stone-950/80 text-amber-400 font-mono font-bold text-[10px]">
                      {item.number}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-stone-900">
                    <div className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      {item.category}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

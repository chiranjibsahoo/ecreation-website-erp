'use client';

import React, { useState, useEffect } from 'react';
import {
  Home,
  Layers,
  Briefcase,
  MessageSquareQuote,
  Send,
  ArrowUp,
  Sparkles,
  Calculator,
  Tag,
  Images
} from 'lucide-react';
import { HeaderEnquiryModal } from '@/components/forms/HeaderEnquiryModal';

export const RightFloatingDock = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
        setShowBackToTop(window.scrollY > 400);
      }

      const sections = [
        'hero',
        'visual-gallery',
        'offers',
        'services',
        'interactive-showcase',
        'tech-engine',
        'projects',
        'estimator',
        'process',
        'testimonials',
        'contact'
      ];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dockLinks = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'visual-gallery', label: 'Visual Gallery', icon: Images },
    { id: 'offers', label: '25% Special Offer', icon: Tag },
    { id: 'services', label: 'IT Services', icon: Layers },
    { id: 'interactive-showcase', label: 'Live Simulator', icon: Sparkles },
    { id: 'projects', label: 'Case Studies', icon: Briefcase },
    { id: 'estimator', label: 'Cost Estimator', icon: Calculator },
    { id: 'testimonials', label: 'Client Reviews', icon: MessageSquareQuote }
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 transition-all duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Left-Side Persistent Floating Quick Enquiry Button */}
      <div
        className="fixed left-0 sm:left-3 lg:left-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-start select-none"
        aria-label="Left Side Quick Enquiry Navigation"
      >
        {/* Mobile Compact Vertical Side-Tab (<640px) — Flush on Left Edge */}
        <button
          onClick={() => setEnquiryOpen(true)}
          className="sm:hidden flex flex-col items-center gap-1.5 px-2.5 py-4 rounded-r-2xl bg-gradient-to-b from-[#F59E0B] via-[#EA580C] to-[#B45309] text-white border-r-2 border-y-2 border-amber-200/90 shadow-[0_10px_28px_-4px_rgba(234,88,12,0.65)] cursor-pointer"
          aria-label="Open Quick Enquiry Form"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span
            className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-sm"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            Quick Enquiry
          </span>
          <Send className="w-3.5 h-3.5 text-amber-100" />
        </button>

        {/* Tablet & Desktop Left Floating Pill Button (>=640px) */}
        <button
          onClick={() => setEnquiryOpen(true)}
          className="hidden sm:flex group items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#D97706] hover:from-[#D97706] hover:via-[#EA580C] hover:to-[#B45309] text-white border-2 border-amber-200/90 shadow-[0_12px_32px_-6px_rgba(234,88,12,0.6)] hover:shadow-[0_16px_38px_-6px_rgba(234,88,12,0.8)] transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Open Quick Enquiry Form"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-white whitespace-nowrap drop-shadow-sm">
            Quick Enquiry
          </span>
          <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <Send className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
          </span>
        </button>
      </div>

      {/* Right-Side Persistent Section Quick-Jump Dock */}
      <nav
        className="fixed right-3 lg:right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2.5 select-none"
        aria-label="Right Side Section Navigation"
      >
        {/* Desktop Section Quick-Jump Dock */}
        <div className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 shadow-lg shadow-stone-900/5 mr-0.5">
          {dockLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => scrollTo(item.id)}
                  aria-label={`Scroll to ${item.label}`}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-stone-950 text-amber-400 font-bold shadow-md scale-105'
                      : 'text-stone-400 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>

                <span
                  role="tooltip"
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-stone-950 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-md"
                >
                  {item.label}
                </span>
              </div>
            );
          })}

          {showBackToTop && (
            <>
              <div className="w-4 h-[1px] bg-stone-200 my-1" />
              <div className="relative group">
                <button
                  onClick={scrollToTop}
                  aria-label="Back to Top"
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span
                  role="tooltip"
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-stone-950 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-md"
                >
                  Top
                </span>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Controlled Quick Enquiry Form Modal */}
      <HeaderEnquiryModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        hideTrigger={true}
      />
    </>
  );
};

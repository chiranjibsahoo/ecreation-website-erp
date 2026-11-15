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
    { id: 'offers', label: '25% Launch Offer', icon: Tag },
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

      {/* Right-Side Persistent Floating Navigation & Quick Enquiry Button */}
      <nav
        className="fixed right-0 sm:right-3 lg:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2.5 select-none"
        aria-label="Right Side Quick Enquiry and Section Navigation"
      >
        {/* Always-Visible Floating Quick Enquiry Form Trigger Button on Right Side */}
        <button
          onClick={() => setEnquiryOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-3 rounded-l-2xl sm:rounded-2xl bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/60 shadow-xl shadow-stone-950/25 transition-all duration-200 hover:scale-105 cursor-pointer"
          aria-label="Open Quick Enquiry Form"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
          <span className="text-xs font-black tracking-wide text-amber-400 whitespace-nowrap">
            Quick Enquiry
          </span>
          <Send className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>

        {/* Desktop Section Quick-Jump Dock */}
        <div className="hidden xl:flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 shadow-lg shadow-stone-900/5 mr-0.5">
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

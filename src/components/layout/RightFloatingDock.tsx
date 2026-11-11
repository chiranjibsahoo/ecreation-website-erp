'use client';

import React, { useState, useEffect } from 'react';
import {
  Home,
  Layers,
  Cpu,
  Briefcase,
  GitBranch,
  MessageSquareQuote,
  Send,
  ArrowUp
} from 'lucide-react';

export const RightFloatingDock = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
        setShowBackToTop(window.scrollY > 400);
      }

      // Check section in view
      const sections = ['hero', 'services', 'tech-engine', 'projects', 'process', 'testimonials', 'contact'];
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
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'tech-engine', label: 'Tech Engine', icon: Cpu },
    { id: 'projects', label: 'Case Studies', icon: Briefcase },
    { id: 'process', label: 'Delivery Process', icon: GitBranch },
    { id: 'testimonials', label: 'Client Reviews', icon: MessageSquareQuote },
    { id: 'contact', label: 'Quick Enquiry', icon: Send }
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
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 transition-all duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Right Floating Navigation Dock */}
      <nav
        className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 select-none"
        aria-label="Section Quick Dock"
      >
        <div className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-lg shadow-slate-200/50">
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
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105'
                      : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>

                {/* Left Tooltip */}
                <span
                  role="tooltip"
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-md transform translate-x-1 group-hover:translate-x-0"
                >
                  {item.label}
                </span>
              </div>
            );
          })}

          {showBackToTop && (
            <>
              <div className="w-4 h-[1px] bg-slate-200 my-1" />
              <div className="relative group">
                <button
                  onClick={scrollToTop}
                  aria-label="Back to Top"
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span
                  role="tooltip"
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-md"
                >
                  Top
                </span>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

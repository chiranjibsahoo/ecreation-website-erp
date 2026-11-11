'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Layers,
  Briefcase,
  FileText,
  Mail,
  Home,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Cpu,
  Terminal
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle
} from '@/components/ui/dialog';
import { SERVICES_DATA, PROJECTS_DATA, BLOG_POSTS_DATA } from '@/lib/data/seedData';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Search items database
  const navigationItems = [
    { label: 'Home Page', href: '/', category: 'Navigation', icon: Home },
    { label: 'All Services Catalog', href: '/services', category: 'Navigation', icon: Layers },
    { label: 'Case Studies Portfolio', href: '/projects', category: 'Navigation', icon: Briefcase },
    { label: 'About Ecreation IT', href: '/about', category: 'Navigation', icon: Sparkles },
    { label: 'Insights & Technical Blog', href: '/blog', category: 'Navigation', icon: FileText },
    { label: 'Project Enquiry & Contact', href: '/contact#enquiry', category: 'Navigation', icon: Mail },
    { label: 'Staff Login & Authentication', href: '/login', category: 'Administration', icon: ShieldCheck },
    { label: 'Admin ERP Portal', href: '/admin', category: 'Administration', icon: ShieldCheck },
    { label: 'Leads Pipeline CRM', href: '/admin/leads', category: 'Administration', icon: Terminal },
    { label: 'Services CMS Manager', href: '/admin/services', category: 'Administration', icon: Layers },
    { label: 'Projects Case Studies CMS', href: '/admin/projects', category: 'Administration', icon: Briefcase }
  ];

  const serviceItems = SERVICES_DATA.map((s) => ({
    label: s.title,
    href: `/services/${s.slug}`,
    category: 'Services',
    icon: Cpu
  }));

  const projectItems = PROJECTS_DATA.map((p) => ({
    label: `${p.title} (${p.client})`,
    href: `/projects/${p.slug}`,
    category: 'Case Studies',
    icon: Briefcase
  }));

  const blogItems = BLOG_POSTS_DATA.map((b) => ({
    label: b.title,
    href: `/blog/${b.slug}`,
    category: 'Articles',
    icon: FileText
  }));

  const allItems = [...navigationItems, ...serviceItems, ...projectItems, ...blogItems];

  const filteredItems = query.trim() === ''
    ? navigationItems
    : allItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (!open) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? (filteredItems.length || 1) - 1 : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          navigate(filteredItems[selectedIndex].href);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredItems, selectedIndex, onOpenChange]);

  const navigate = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-xl p-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Quick Command Search Palette</DialogTitle>

        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a service, case study, page, or admin module..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
          />
          <kbd className="hidden sm:inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={`${item.category}-${item.href}-${idx}`}
                  onClick={() => navigate(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono uppercase text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'opacity-100 translate-x-0.5' : 'opacity-0'} transition-all`} />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              No matching pages or services found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Ecreation Quick Palette</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Eye, 
  Layers, 
  X,
  Code2,
  Cpu
} from 'lucide-react';
import { Project } from '@/types';
import { CardHover } from '@/components/animations/CardHover';
import { Button } from '@/components/ui/button';

interface ProjectsClientProps {
  projects: Project[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Projects (6)' },
  { id: 'erp', label: 'Enterprise ERP' },
  { id: 'edtech', label: 'EdTech & Focus' },
  { id: 'insurtech', label: 'InsurTech & Claims' },
  { id: 'media-gaming', label: 'Video App & Gaming' },
];

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; client: string } | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'erp') {
      return project.slug.includes('erp') || project.category.toLowerCase().includes('erp');
    }
    if (activeCategory === 'edtech') {
      return project.slug.includes('study') || project.category.toLowerCase().includes('edtech');
    }
    if (activeCategory === 'insurtech') {
      return project.slug.includes('insurance') || project.category.toLowerCase().includes('insurtech');
    }
    if (activeCategory === 'media-gaming') {
      return project.slug.includes('video') || project.slug.includes('game');
    }
    return true;
  });

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Category Filter Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 rounded-2xl bg-white/80 dark:bg-stone-900/80 subsection-bordered-card max-w-fit mx-auto backdrop-blur-md">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/25 border border-amber-400'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
        {filteredProjects.map((project, idx) => (
          <CardHover
            key={project.id}
            className="subsection-bordered-card bg-white dark:bg-stone-900 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
          >
            <div>
              {/* Screenshot Header with Interactive Preview Overlay */}
              <div className="relative group/img overflow-hidden bg-stone-950 border-b border-amber-500/20">
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <img
                    src={project.image || '/images/showcase/erp-automation-showcase.jpg'}
                    alt={`${project.title} Screenshot`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                  />
                  {/* Subtle Dark/Light Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />
                </div>

                {/* Floating Badges on Screenshot */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 shadow-sm pointer-events-auto">
                    {project.category}
                  </span>
                  
                  <span className="text-[11px] font-bold text-stone-300 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-stone-700 font-mono pointer-events-auto">
                    {project.client}
                  </span>
                </div>

                {/* Hover Quick Action Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-stone-950/60 backdrop-blur-[2px]">
                  <button
                    onClick={() =>
                      setPreviewImage({
                        src: project.image || '',
                        title: project.title,
                        client: project.client,
                      })
                    }
                    className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-stone-950 text-xs font-bold shadow-lg hover:bg-amber-400 transition-colors"
                  >
                    <Eye className="w-4 h-4 text-amber-700" />
                    Enlarge Screenshot
                  </button>
                  <Link href={`/projects/${project.slug}`}>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold shadow-lg hover:bg-amber-400 transition-colors">
                      Full Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-400 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>VERIFIED PRODUCTION DEPLOYMENT</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-white tracking-tight leading-snug">
                    <Link href={`/projects/${project.slug}`} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                      {project.title}
                    </Link>
                  </h2>
                  <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Key Deliverables Bullet Points */}
                {project.deliverables && (
                  <div className="space-y-2 pt-2 border-t border-amber-500/20">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block font-mono">
                      CORE ARCHITECTURAL HIGHLIGHTS:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {project.deliverables.slice(0, 3).map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Measurable Results KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-amber-500/20">
                  {project.results.map((res) => (
                    <div
                      key={res.label}
                      className="subsection-bordered-item p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-stone-800/80"
                    >
                      <div className="text-base sm:text-lg font-black text-stone-950 dark:text-white flex items-center gap-1 font-mono">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="text-amber-700 dark:text-amber-400">{res.metric}</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-tight font-medium">
                        {res.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer with Tech Stack and Action */}
            <div className="p-6 sm:px-8 sm:py-5 border-t border-amber-500/20 bg-stone-50/70 dark:bg-stone-950/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="subsection-bordered-item text-[10px] font-mono font-medium px-2.5 py-1 rounded-md bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-[10px] font-mono text-stone-500 px-1">
                    +{project.tags.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/projects/${project.slug}`}>
                  <Button
                    size="sm"
                    className="subsection-bordered-item rounded-xl text-xs font-bold bg-white hover:bg-stone-100 text-stone-950 dark:bg-stone-900 dark:hover:bg-stone-800 dark:text-white border border-stone-200 dark:border-stone-700"
                  >
                    Detailed Case Study
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-amber-600" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardHover>
        ))}
      </div>

      {/* Fullscreen Screenshot Modal */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-stone-950 rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl space-y-3 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">{previewImage.title}</h3>
                <p className="text-xs text-amber-400 font-mono">Client: {previewImage.client}</p>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="cursor-pointer p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Frame */}
            <div className="w-full overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 max-h-[75vh] flex items-center justify-center">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="w-full h-auto object-contain max-h-[75vh]"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between text-xs text-stone-400 pt-2">
              <span>High-Fidelity Architectural Preview • Ecreation IT Solution</span>
              <button
                onClick={() => setPreviewImage(null)}
                className="cursor-pointer text-amber-400 hover:underline font-semibold"
              >
                Close Window ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

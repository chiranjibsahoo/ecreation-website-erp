'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Edit,
  ExternalLink,
  Save,
  Star,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { PROJECTS_DATA } from '@/lib/data/seedData';
import { Project } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (projectToSave: Project) => {
    if (isCreating) {
      setProjects((prev) => [projectToSave, ...prev]);
      setIsCreating(false);
    } else {
      setProjects((prev) =>
        prev.map((p) => (p.id === projectToSave.id ? projectToSave : p))
      );
    }
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this project case study?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (editingProject?.id === id) {
        setEditingProject(null);
      }
    }
  };

  const handleToggleFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const handleCreateNew = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      slug: 'new-enterprise-solution',
      title: 'New Enterprise Client Portal & Cloud System',
      client: 'Global Logistics Corp',
      category: 'Enterprise ERP',
      summary: 'Executive overview of architecture transformation and delivery outcomes.',
      challenge: 'Legacy system performance bottlenecks and fragmented database silos.',
      solution: 'Architected unified Next.js App Router frontends with Supabase Row Level Security.',
      results: [
        { metric: '+84%', label: 'Throughput Efficiency' },
        { metric: '<45ms', label: 'P95 API Latency' }
      ],
      tags: ['Next.js', 'PostgreSQL', 'Cloud Infrastructure', 'TypeScript'],
      featured: true,
      publishedAt: '2026-11-11'
    };
    setEditingProject(newProject);
    setIsCreating(true);
  };

  return (
    <div className="pt-28 pb-24 bg-muted/20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/admin" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Admin Overview
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Case Studies CMS</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">Project Case Studies CMS</h1>
            <p className="text-sm text-muted-foreground">
              Manage client portfolio showcases, verified impact metrics, and architectural narratives.
            </p>
          </div>
          <Button
            onClick={handleCreateNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add New Case Study
          </Button>
        </div>

        {/* Grid: Projects List & Editor Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Projects List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>{projects.length} CASE STUDIES ACTIVE</span>
              <span>FILTER: ALL PRACTICES</span>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`bg-card border rounded-2xl p-5 shadow-xs transition-all ${
                    editingProject?.id === project.id
                      ? 'border-indigo-600 ring-2 ring-indigo-600/10'
                      : 'border-border hover:border-neutral-400 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] uppercase font-mono">
                          {project.category}
                        </Badge>
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            Homepage Spotlight
                          </span>
                        )}
                        <span className="text-[11px] text-muted-foreground">
                          Client: <strong>{project.client}</strong>
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {project.summary}
                      </p>

                      {/* Metrics Showcase */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                        {project.results.map((r, i) => (
                          <div key={i} className="bg-muted/40 p-2 rounded-lg border border-border/50">
                            <span className="font-mono font-bold text-indigo-600 text-xs block">{r.metric}</span>
                            <span className="text-[10px] text-muted-foreground block truncate">{r.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tags.map((t) => (
                          <span key={t} className="text-[10px] font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingProject({ ...project });
                          setIsCreating(false);
                        }}
                        className="h-8 px-2.5 text-xs rounded-lg"
                      >
                        <Edit className="w-3.5 h-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleFeatured(project.id)}
                        className={`h-8 px-2.5 text-xs rounded-lg ${project.featured ? 'text-amber-600' : 'text-muted-foreground'}`}
                        title="Toggle Spotlight"
                      >
                        <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-amber-500' : ''}`} />
                      </Button>
                      <Link href={`/projects/${project.slug}`} target="_blank">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2.5 text-xs rounded-lg text-muted-foreground hover:text-foreground"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(project.id)}
                        className="h-8 px-2.5 text-xs rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                        title="Delete Case Study"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor Sidebar */}
          <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-6 shadow-xs sticky top-32 space-y-5">
            {editingProject ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(editingProject);
                }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <h2 className="text-base font-bold text-foreground">
                      {isCreating ? 'Create New Case Study' : `Editing: ${editingProject.title.slice(0, 24)}...`}
                    </h2>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {editingProject.id}
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Project Title</label>
                  <Input
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    className="text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Client Name</label>
                    <Input
                      value={editingProject.client}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, client: e.target.value })
                      }
                      className="text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">URL Slug</label>
                    <Input
                      value={editingProject.slug}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, slug: e.target.value })
                      }
                      className="text-xs font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Category</label>
                  <Input
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Executive Summary</label>
                  <Textarea
                    rows={2}
                    value={editingProject.summary}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, summary: e.target.value })
                    }
                    className="text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">The Client Challenge</label>
                  <Textarea
                    rows={2}
                    value={editingProject.challenge}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, challenge: e.target.value })
                    }
                    className="text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Our Architectural Solution</label>
                  <Textarea
                    rows={2}
                    value={editingProject.solution}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, solution: e.target.value })
                    }
                    className="text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Technologies Used (comma separated)
                  </label>
                  <Input
                    value={editingProject.tags.join(', ')}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      })
                    }
                    className="text-xs font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingProject.featured || false}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, featured: e.target.checked })
                    }
                    className="rounded border-border"
                  />
                  <label htmlFor="featured" className="text-xs font-medium text-foreground cursor-pointer">
                    Feature in Homepage Spotlight Case Studies
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setEditingProject(null);
                      setIsCreating(false);
                    }}
                    className="text-xs rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5 mr-1.5" />
                    Save Case Study
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-muted mx-auto flex items-center justify-center text-muted-foreground">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-foreground">No Case Study Selected</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Select any case study from the list on the left to edit its metrics and deliverables, or create a brand new case study.
                </p>
                <Button
                  onClick={handleCreateNew}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Create Case Study
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

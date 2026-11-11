'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Edit,
  ExternalLink,
  Save,
  Tag,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { SERVICES_DATA } from '@/lib/data/seedData';
import { Service } from '@/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(SERVICES_DATA);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (serviceToSave: Service) => {
    if (isCreating) {
      setServices((prev) => [serviceToSave, ...prev]);
      setIsCreating(false);
    } else {
      setServices((prev) =>
        prev.map((s) => (s.id === serviceToSave.id ? serviceToSave : s))
      );
    }
    setEditingService(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this service from the catalog?')) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      if (editingService?.id === id) {
        setEditingService(null);
      }
    }
  };

  const handleCreateNew = () => {
    const newService: Service = {
      id: `svc-${Date.now()}`,
      slug: 'new-engineering-service',
      title: 'New Technology Practice',
      shortDescription: 'Describe the core value proposition of this practice...',
      fullDescription: 'Comprehensive overview of technical capabilities, methodologies, and outcomes.',
      iconName: 'Code2',
      category: 'engineering',
      features: ['High-throughput architecture', 'Dedicated sprint delivery', 'Automated QA pipeline'],
      deliverables: ['Production deployment repository', 'SLA maintenance'],
      techStack: ['Next.js', 'PostgreSQL', 'TypeScript'],
      featured: false
    };
    setEditingService(newService);
    setIsCreating(true);
  };

  return (
    <div className="pt-8 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/admin" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Admin Overview
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Services Catalog CMS</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">Services Catalog CMS</h1>
            <p className="text-sm text-muted-foreground">
              Add, update, and manage published engineering practices and deliverables.
            </p>
          </div>
          <Button
            onClick={handleCreateNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add New Service Offering
          </Button>
        </div>

        {/* Grid: Services List & Editor Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Services List */}
          <div className={`space-y-4 ${editingService ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`bg-card border rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                    editingService?.id === service.id
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'border-border hover:border-border/80'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px] uppercase font-mono">
                        {service.category}
                      </Badge>
                      {service.featured && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-amber-500" />
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {service.techStack.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                    <Link
                      href={`/services/${service.slug}`}
                      target="_blank"
                      className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Live
                    </Link>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingService({ ...service });
                          setIsCreating(false);
                        }}
                        className="h-8 rounded-lg text-xs"
                      >
                        <Edit className="w-3.5 h-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(service.id)}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit / Create Form Panel */}
          {editingService && (
            <div className="lg:col-span-6 bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg space-y-6 animate-in fade-in-50">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase block">
                    {isCreating ? 'Create Service Offering' : 'Edit Service Offering'}
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{editingService.title}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingService(null)}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Service Title</label>
                  <Input
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="text-xs rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">URL Slug</label>
                    <Input
                      value={editingService.slug}
                      onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                      className="text-xs rounded-xl font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-foreground">Category</label>
                    <select
                      value={editingService.category}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          category: e.target.value as Service['category']
                        })
                      }
                      className="w-full h-9 px-3 rounded-xl border border-input bg-background text-foreground text-xs focus-visible:outline-hidden"
                    >
                      <option value="engineering">Engineering</option>
                      <option value="enterprise">Enterprise</option>
                      <option value="cloud">Cloud</option>
                      <option value="ai">AI</option>
                      <option value="design">Design</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Short Summary (Cards & Previews)</label>
                  <Textarea
                    rows={2}
                    value={editingService.shortDescription}
                    onChange={(e) =>
                      setEditingService({ ...editingService, shortDescription: e.target.value })
                    }
                    className="text-xs rounded-xl resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Full Architectural Description</label>
                  <Textarea
                    rows={4}
                    value={editingService.fullDescription}
                    onChange={(e) =>
                      setEditingService({ ...editingService, fullDescription: e.target.value })
                    }
                    className="text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Tech Stack (comma-separated)</label>
                  <Input
                    value={editingService.techStack.join(', ')}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    className="text-xs rounded-xl font-mono"
                    placeholder="Next.js, PostgreSQL, TypeScript"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingService.featured || false}
                    onChange={(e) =>
                      setEditingService({ ...editingService, featured: e.target.checked })
                    }
                    className="rounded border-input text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="featured" className="font-semibold text-foreground cursor-pointer">
                    Highlight as Featured Service on Homepage
                  </label>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingService(null)}
                    className="text-xs rounded-xl"
                  >
                    Discard Changes
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSave(editingService)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
                  >
                    <Save className="w-3.5 h-3.5 mr-1.5" />
                    Save Service Offering
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


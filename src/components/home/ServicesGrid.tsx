import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Building2,
  Cloud,
  Bot,
  Smartphone,
  Palette,
  ArrowRight,
  Check
} from 'lucide-react';
import { SERVICES_DATA } from '@/lib/data/seedData';
import { CardHover } from '@/components/animations/CardHover';
import { FadeIn } from '@/components/animations/FadeIn';

export const ServicesGrid = () => {
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'engineering':
        return {
          iconBg: 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900/60',
          iconColor: 'text-blue-600',
          accent: 'hover:border-blue-400/60 shadow-blue-500/5'
        };
      case 'enterprise':
        return {
          iconBg: 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-900/60',
          iconColor: 'text-indigo-600',
          accent: 'hover:border-indigo-400/60 shadow-indigo-500/5'
        };
      case 'cloud':
        return {
          iconBg: 'bg-cyan-50 dark:bg-cyan-950/50 border-cyan-200 dark:border-cyan-900/60',
          iconColor: 'text-cyan-600',
          accent: 'hover:border-cyan-400/60 shadow-cyan-500/5'
        };
      case 'ai':
        return {
          iconBg: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900/60',
          iconColor: 'text-emerald-600',
          accent: 'hover:border-emerald-400/60 shadow-emerald-500/5'
        };
      case 'design':
        return {
          iconBg: 'bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-900/60',
          iconColor: 'text-purple-600',
          accent: 'hover:border-purple-400/60 shadow-purple-500/5'
        };
      default:
        return {
          iconBg: 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900/60',
          iconColor: 'text-blue-600',
          accent: 'hover:border-blue-400/60 shadow-blue-500/5'
        };
    }
  };

  const getIcon = (iconName: string, iconColor: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className={`w-6 h-6 ${iconColor}`} />;
      case 'Building2':
        return <Building2 className={`w-6 h-6 ${iconColor}`} />;
      case 'Cloud':
        return <Cloud className={`w-6 h-6 ${iconColor}`} />;
      case 'Bot':
        return <Bot className={`w-6 h-6 ${iconColor}`} />;
      case 'Smartphone':
        return <Smartphone className={`w-6 h-6 ${iconColor}`} />;
      case 'Palette':
        return <Palette className={`w-6 h-6 ${iconColor}`} />;
      default:
        return <Code2 className={`w-6 h-6 ${iconColor}`} />;
    }
  };

  return (
    <section className="py-24 bg-slate-50/60 dark:bg-slate-950 relative border-t border-slate-200/60 dark:border-slate-800" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-200/80">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-3">
              Full-Lifecycle Engineering Services
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              We design, build, deploy, and maintain mission-critical software systems that scale with your enterprise ambitions.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => {
            const theme = getCategoryTheme(service.category);
            return (
              <FadeIn key={service.id} delay={idx * 0.1}>
                <CardHover className={`h-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 ${theme.accent}`}>
                  <div className="space-y-5">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-xs ${theme.iconBg}`}>
                      {getIcon(service.iconName, theme.iconColor)}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider block">
                        Key Capabilities:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {service.features.slice(0, 3).map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      {service.techStack.slice(0, 3).join(' · ')}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </CardHover>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

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
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-indigo-500" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-indigo-500" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-cyan-500" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-indigo-500" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-cyan-500" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-indigo-500" />;
      default:
        return <Code2 className="w-6 h-6 text-indigo-500" />;
    }
  };

  return (
    <section className="py-24 bg-background relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-2">
              Full-Lifecycle Engineering Services
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              We design, build, deploy, and maintain mission-critical software systems that scale with your enterprise ambitions.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <FadeIn key={service.id} delay={idx * 0.1}>
              <CardHover className="h-full bg-card border border-border p-8 rounded-2xl flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-center shadow-xs">
                    {getIcon(service.iconName)}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border/60">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wider block">
                      Key Capabilities:
                    </span>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {service.features.slice(0, 3).map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">
                    {service.techStack.slice(0, 3).join(' · ')}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </CardHover>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

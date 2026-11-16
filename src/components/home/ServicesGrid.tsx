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
  const getServiceImage = (slug: string) => {
    switch (slug) {
      case 'custom-software-engineering':
        return '/images/showcase/web-design-showcase.jpg';
      case 'enterprise-erp-crm':
        return '/images/showcase/erp-automation-showcase.jpg';
      case 'cloud-devops-infrastructure':
        return '/images/showcase/cloud-security-showcase.jpg';
      case 'ai-automation-workflows':
        return '/images/showcase/ai-workflow-showcase.jpg';
      case 'mobile-app-development':
        return '/images/showcase/mobile-app-showcase.jpg';
      case 'ui-ux-design-modernization':
        return '/images/showcase/social-marketing-showcase.jpg';
      default:
        return '/images/showcase/web-design-showcase.jpg';
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-amber-400" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-amber-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-amber-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-amber-400" />;
      default:
        return <Code2 className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-stone-950 relative border-b border-stone-200/80 dark:border-stone-800" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3.5 py-1 rounded-full border border-amber-300/80">
              Core IT &amp; Digital Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-white mt-3">
              End-to-End Engineering &amp; Growth Services
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg">
              From custom website design and office automation ERPs to mobile apps, cloud infrastructure, and digital marketing—engineered to scale your business.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => {
            const imgSrc = getServiceImage(service.slug);
            return (
              <FadeIn key={service.id} delay={idx * 0.08}>
                <CardHover className="group h-full bg-[#FAF8F5] dark:bg-stone-900 border-2 border-amber-500/35 hover:border-amber-500 rounded-3xl overflow-hidden flex flex-col justify-between shadow-[0_8px_28px_-6px_rgba(180,130,40,0.12)] hover:shadow-[0_20px_45px_-8px_rgba(217,119,6,0.28)] transition-all duration-300">
                  <div>
                    {/* Visual Image Header */}
                    <div className="relative h-48 w-full bg-stone-950 overflow-hidden border-b border-amber-500/30 dark:border-stone-800">
                      <img
                        src={imgSrc}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-stone-950/90 border border-amber-500/50 flex items-center justify-center shadow-md">
                          {getIcon(service.iconName)}
                        </div>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-stone-950/85 px-2.5 py-1 rounded-md border border-amber-500/40">
                          0{idx + 1} · {service.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-7 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-stone-950 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                          {service.shortDescription}
                        </p>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-amber-500/25 dark:border-stone-800">
                        <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                          Included Deliverables:
                        </span>
                        <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300 font-medium">
                          {service.features.slice(0, 3).map((feat) => (
                            <li key={feat} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="px-7 py-4 bg-white dark:bg-stone-950/60 border-t border-amber-500/30 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-stone-500 font-medium">
                      {service.techStack.slice(0, 3).join(' · ')}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs font-bold text-stone-950 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Explore Service
                      <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
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

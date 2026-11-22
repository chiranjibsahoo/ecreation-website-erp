import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, ArrowUpRight, ChevronRight } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '@/lib/data/seedData';
import { Logo } from '@/components/common/Logo';

export const Footer = () => {
  const companyLinks = [
    { label: 'About Ecreation', href: '/about' },
    { label: 'Case Studies & Portfolio', href: '/projects' },
    { label: 'FAQs & Help Center', href: '/faq' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Refund & Cancellation Policy', href: '/refund-policy' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'SLA & Security Compliance', href: '/sla-security' },
    { label: 'Legal Disclaimer', href: '/disclaimer' }
  ];

  const bottomLegalLinks = [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'SLA & Security', href: '/sla-security' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'FAQs', href: '/faq' }
  ];

  return (
    <footer className="bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-800 border-t-2 border-amber-500/40 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-12 border-b border-amber-600/25">
          {/* Column 1: Brand Info & Bordered Social Pills (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="inline-block transition-transform duration-300 hover:-translate-y-0.5">
              <Logo size="md" theme="light" />
            </div>
            <p className="text-xs sm:text-sm text-stone-700 max-w-xs leading-relaxed font-medium">
              Sustainable Enterprise Architecture, Bespoke ERP Automation, Cloud Infrastructure &amp; High-ROI Digital Platforms.
            </p>
            <div className="pt-1 flex items-center gap-2.5">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="subsection-bordered-item w-9 h-9 rounded-full bg-white/90 text-stone-800 hover:text-amber-700 flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="subsection-bordered-item w-9 h-9 rounded-full bg-white/90 text-stone-800 hover:text-amber-700 flex items-center justify-center"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="subsection-bordered-item w-9 h-9 rounded-full bg-white/90 text-stone-800 hover:text-amber-700 flex items-center justify-center"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="subsection-bordered-item w-9 h-9 rounded-full bg-white/90 text-stone-800 hover:text-amber-700 flex items-center justify-center"
                aria-label="Official Email"
              >
                <Mail className="w-4 h-4 text-emerald-700" />
              </a>
            </div>
          </div>

          {/* Column 2: Engineering Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-950 pb-2 border-b border-amber-500/30">
              Engineering Services
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group inline-flex items-center gap-1.5 font-semibold text-stone-800 hover:text-amber-800 underline-offset-4 hover:underline decoration-amber-600/70 transition-all duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Policies (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-950 pb-2 border-b border-amber-500/30">
              Company &amp; Policies
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 font-semibold text-stone-800 hover:text-amber-800 underline-offset-4 hover:underline decoration-amber-600/70 transition-all duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Headquarters & Studio (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-950 pb-2 border-b border-amber-500/30">
              Headquarters &amp; Studio
            </h3>
            <div className="subsection-bordered-card rounded-2xl bg-white/90 p-4 text-xs sm:text-sm text-stone-800 leading-relaxed flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span className="font-medium">{COMPANY_INFO.headquarters}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="subsection-bordered-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EFE0] hover:bg-amber-100 text-stone-900 font-bold text-xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-700" />
                <span>{COMPANY_INFO.email}</span>
              </a>

              <Link
                href="/login"
                className="subsection-bordered-item inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-white/90 hover:bg-amber-50 text-stone-900 font-bold text-xs transition-colors"
              >
                <span>Staff Login</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-700" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright on Left, Clearly Clickable Legal Menu Links on Right */}
        <div className="pt-7 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-stone-800">
          <span className="font-bold text-stone-900">
            © 2026 Ecreation IT Solution. All rights reserved.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs">
            {bottomLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2.5 py-1 rounded-lg bg-white/75 hover:bg-white border border-amber-500/25 hover:border-amber-500/60 font-semibold text-stone-800 hover:text-amber-800 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

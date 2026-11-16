import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '@/lib/data/seedData';
import { Logo } from '@/components/common/Logo';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-800 border-t-2 border-amber-500/40 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-amber-600/25">
          {/* Column 1: Brand Info & Bordered Social Pills (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-block transition-transform duration-300 hover:-translate-y-0.5">
              <Logo size="md" theme="light" />
            </div>
            <p className="text-sm text-stone-700 max-w-sm leading-relaxed font-medium">
              Sustainable Enterprise Architecture, Bespoke ERP Automation, Cloud Infrastructure &amp; High-ROI Digital Platforms.
            </p>
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="subsection-bordered-item w-10 h-10 rounded-full bg-white/90 text-stone-800 flex items-center justify-center"
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
                className="subsection-bordered-item w-10 h-10 rounded-full bg-white/90 text-stone-800 flex items-center justify-center"
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
                className="subsection-bordered-item w-10 h-10 rounded-full bg-white/90 text-stone-800 flex items-center justify-center"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="subsection-bordered-item w-10 h-10 rounded-full bg-white/90 text-stone-800 flex items-center justify-center"
                aria-label="Official Email"
              >
                <Mail className="w-4 h-4 text-emerald-700" />
              </a>
            </div>
          </div>

          {/* Column 2: Engineering Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-sm font-extrabold tracking-tight text-stone-950">
              Engineering Services
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {SERVICES_DATA.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-stone-700 hover:text-stone-950 inline-block transition-transform duration-200 hover:translate-x-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company (2 Cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="text-sm font-extrabold tracking-tight text-stone-950">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link
                  href="/about"
                  className="text-stone-700 hover:text-stone-950 inline-block transition-transform duration-200 hover:translate-x-1"
                >
                  About Ecreation
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-stone-700 hover:text-stone-950 inline-block transition-transform duration-200 hover:translate-x-1"
                >
                  Case Studies &amp; Work
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-stone-700 hover:text-stone-950 inline-block transition-transform duration-200 hover:translate-x-1"
                >
                  Technical Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-stone-700 hover:text-stone-950 inline-block transition-transform duration-200 hover:translate-x-1"
                >
                  Careers &amp; Inquiries
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-stone-800 font-bold hover:text-stone-950 inline-flex items-center gap-1 transition-transform duration-200 hover:translate-x-1"
                >
                  Staff Login &amp; Admin
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-700" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Headquarters & Studio (Option 3 Enclosed Card + Pill) (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-sm font-extrabold tracking-tight text-stone-950">
              Headquarters &amp; Studio
            </h3>
            <div className="subsection-bordered-card rounded-2xl bg-white/90 p-4 text-xs sm:text-sm text-stone-800 leading-relaxed flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span className="font-medium">{COMPANY_INFO.headquarters}</span>
            </div>

            <div>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="subsection-bordered-item inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F5EFE0] text-stone-900 font-bold text-xs"
              >
                <Mail className="w-3.5 h-3.5 text-amber-700" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Operational Pill on Left, Copyright & Legal on Right */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-700 font-medium">
          <div className="subsection-bordered-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-[11px] font-semibold text-stone-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All Systems Operational</span>
            <span className="text-stone-400">•</span>
            <span>99.99% Cloud Infrastructure SLA</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span>© 2026 Ecreation IT Solution.</span>
            <Link
              href="/privacy-policy"
              className="hover:text-stone-950 underline-offset-4 hover:underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-stone-950 underline-offset-4 hover:underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/sitemap.xml"
              className="hover:text-stone-950 underline-offset-4 hover:underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              XML Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

'use client';

import React from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';

export const LeftSocialRail = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/ecreation-it-solution',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 0 0 0-3 1.5 1.5 0 0 0 0 3m1.37 9.74v-8.37H5.1v8.37h2.73z" />
        </svg>
      ),
      color: 'hover:text-[#0A66C2] hover:bg-blue-50 hover:border-blue-200'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ecreation-it',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      ),
      color: 'hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300'
    },
    {
      name: 'Twitter / X',
      url: 'https://twitter.com/ecreationit',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: 'hover:text-[#1DA1F2] hover:bg-sky-50 hover:border-sky-200'
    },
    {
      name: 'WhatsApp Consultation',
      url: 'https://wa.me/919876543210?text=Hello%20Ecreation%20IT%20Solution%2C%20I%20would%20like%20to%20consult%20on%20a%20project',
      icon: <MessageSquare className="w-4 h-4 text-emerald-600" />,
      color: 'hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200'
    },
    {
      name: 'Direct Email',
      url: 'mailto:contact@ecreationit.com?subject=Project%20Inquiry%20-%20Ecreation%20IT',
      icon: <Mail className="w-4 h-4 text-blue-600" />,
      color: 'hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200'
    }
  ];

  return (
    <aside
      className="fixed left-4 lg:left-6 bottom-0 z-40 hidden md:flex flex-col items-center gap-3 select-none"
      aria-label="Social Media and Direct Contact Rail"
    >
      {/* Floating Glass Capsule */}
      <div className="flex flex-col items-center gap-2 p-2 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-lg shadow-slate-200/50">
        {socialLinks.map((item) => (
          <div key={item.name} className="relative group">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 transition-all duration-200 border border-transparent ${item.color} group-hover:scale-110 shadow-xs`}
            >
              {item.icon}
            </a>

            {/* Hover Tooltip on Right */}
            <span
              role="tooltip"
              className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-md transform -translate-x-1 group-hover:translate-x-0"
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Connecting Vertical Anchor Line */}
      <div className="w-[1.5px] h-12 bg-gradient-to-b from-slate-300 via-blue-400 to-transparent" />
    </aside>
  );
};


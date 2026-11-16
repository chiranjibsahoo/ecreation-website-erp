'use client';

import React from 'react';
import { Mail } from 'lucide-react';

export const LeftSocialRail = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/ecreation-it-solution',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 0 0 0-3 1.5 1.5 0 0 0 0 3m1.37 9.74v-8.37H5.1v8.37h2.73z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/chiranjibsahoo/ecreation-website-erp',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      )
    },
    {
      name: 'Twitter / X',
      url: 'https://twitter.com/ecreationit',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'Email (contact@ecreation.in)',
      url: 'mailto:contact@ecreation.in?subject=Project%20Inquiry%20-%20Ecreation%20IT',
      icon: <Mail className="w-4 h-4 text-amber-600" />
    }
  ];

  return (
    <aside
      className="fixed left-4 lg:left-6 bottom-0 z-40 hidden md:flex flex-col items-center gap-3 select-none"
      aria-label="Social Media and Direct Contact Rail"
    >
      {/* Expanding Glowing Golden Pill Capsule on Hover (Video 00:05-00:08 effect) */}
      <div className="left-social-capsule">
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="left-social-link"
          >
            {item.icon}
            <span role="tooltip" className="left-social-tooltip">
              {item.name}
            </span>
          </a>
        ))}
      </div>

      <div className="w-[1.5px] h-12 bg-gradient-to-b from-amber-500 via-amber-400 to-transparent" />
    </aside>
  );
};

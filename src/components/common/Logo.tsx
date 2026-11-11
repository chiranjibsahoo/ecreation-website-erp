'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  href = '/'
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-base', sub: 'text-[11px]' },
    md: { icon: 42, text: 'text-lg sm:text-xl', sub: 'text-xs' },
    lg: { icon: 54, text: 'text-2xl', sub: 'text-xs' }
  };

  const currentSize = sizeMap[size];

  const logoContent = (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Precision Geometric Vector Emblem in Royal Golden Metallic Finish */}
      <div
        className="relative shrink-0 rounded-2xl overflow-hidden shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200 border border-amber-500/30 bg-[#0B0F19]"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* 24K Royal Gold Metallic Gradients */}
            <linearGradient id="logo-gold-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
            <linearGradient id="logo-gold-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="logo-gold-border" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#78350F" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Golden Ambient Border Ring */}
          <rect x="2" y="2" width="96" height="96" rx="22" stroke="url(#logo-gold-border)" strokeWidth="2" />

          {/* Vertical Anchor Spine */}
          <rect x="20" y="22" width="14" height="56" rx="7" fill="url(#logo-gold-main)" />

          {/* Top Arm with Node */}
          <path d="M 27 22 L 66 22 C 70 22 73 25 73 29 C 73 33 70 36 66 36 L 27 36 Z" fill="url(#logo-gold-main)" />
          <circle cx="66" cy="29" r="3.5" fill="#FFFBEB" />

          {/* Middle Dynamic Creation Arrow in Champagne Gold */}
          <path d="M 27 44 L 54 44 L 62 50 L 54 56 L 27 56 Z" fill="url(#logo-gold-light)" />
          <circle cx="50" cy="50" r="2.5" fill="#FFFBEB" />

          {/* Bottom Arm with Node */}
          <path d="M 27 64 L 66 64 C 70 64 73 67 73 71 C 73 75 70 78 66 78 L 27 78 Z" fill="url(#logo-gold-main)" />
          <circle cx="66" cy="71" r="3.5" fill="#FFFBEB" />

          {/* Connected Circuit Data Path */}
          <path d="M 73 33 L 77 41 L 77 59 L 73 67" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          <circle cx="77" cy="50" r="2" fill="#FDE68A" />
        </svg>
      </div>

      {/* Typography: Wordmark with Premium Gold Tag */}
      {variant === 'full' && (
        <div className="flex flex-col">
          <span className={`font-black tracking-tight text-slate-900 dark:text-white leading-none ${currentSize.text}`}>
            Ecreation
          </span>
          <span className={`font-black uppercase tracking-widest text-amber-800 dark:text-amber-400 mt-0.5 ${currentSize.sub}`}>
            IT Solution
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Ecreation IT Solution Home">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  href = '/',
  theme = 'light'
}) => {
  const sizeMap = {
    sm: { icon: 36, text: 'text-base', sub: 'text-[10px]' },
    md: { icon: 42, text: 'text-lg sm:text-xl', sub: 'text-[11px]' },
    lg: { icon: 52, text: 'text-2xl', sub: 'text-xs' }
  };

  const currentSize = sizeMap[size];

  const logoContent = (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Precision Geometric Vector Emblem in Warm Obsidian & 24K Royal Gold */}
      <div
        className="relative shrink-0 rounded-xl overflow-hidden shadow-md shadow-amber-900/15 group-hover:scale-105 transition-transform duration-200 border border-amber-500/40 bg-[#141210]"
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
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#78350F" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect x="2" y="2" width="96" height="96" rx="20" stroke="url(#logo-gold-border)" strokeWidth="2" />
          <rect x="20" y="22" width="14" height="56" rx="7" fill="url(#logo-gold-main)" />
          <path d="M 27 22 L 66 22 C 70 22 73 25 73 29 C 73 33 70 36 66 36 L 27 36 Z" fill="url(#logo-gold-main)" />
          <circle cx="66" cy="29" r="3.5" fill="#FFFBEB" />
          <path d="M 27 44 L 54 44 L 62 50 L 54 56 L 27 56 Z" fill="url(#logo-gold-light)" />
          <circle cx="50" cy="50" r="2.5" fill="#FFFBEB" />
          <path d="M 27 64 L 66 64 C 70 64 73 67 73 71 C 73 75 70 78 66 78 L 27 78 Z" fill="url(#logo-gold-main)" />
          <circle cx="66" cy="71" r="3.5" fill="#FFFBEB" />
          <path d="M 73 33 L 77 41 L 77 59 L 73 67" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          <circle cx="77" cy="50" r="2" fill="#FDE68A" />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col">
          <span
            className={`font-black tracking-tight leading-none ${
              theme === 'dark' ? 'text-white' : 'text-stone-900 dark:text-white'
            } ${currentSize.text}`}
          >
            Ecreation
          </span>
          <span
            className={`font-bold uppercase tracking-[0.18em] mt-1 ${
              theme === 'dark' ? 'text-amber-400' : 'text-amber-700 dark:text-amber-400'
            } ${currentSize.sub}`}
          >
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

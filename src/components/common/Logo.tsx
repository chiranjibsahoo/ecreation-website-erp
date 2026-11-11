'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    sm: { icon: 32, text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 40, text: 'text-lg sm:text-xl', sub: 'text-[10px]' },
    lg: { icon: 52, text: 'text-2xl', sub: 'text-xs' }
  };

  const currentSize = sizeMap[size];

  const logoContent = (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Precision Geometric Vector Emblem */}
      <div
        className="relative shrink-0 rounded-xl overflow-hidden shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200 border border-slate-800 bg-[#0F172A]"
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
            <linearGradient id="logo-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="logo-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {/* Vertical Anchor Spine */}
          <rect x="20" y="22" width="14" height="56" rx="7" fill="url(#logo-blue)" />

          {/* Top Arm with Node */}
          <path d="M 27 22 L 66 22 C 70 22 73 25 73 29 C 73 33 70 36 66 36 L 27 36 Z" fill="url(#logo-blue)" />
          <circle cx="66" cy="29" r="3.5" fill="#FFFFFF" />

          {/* Middle Dynamic Creation Arrow */}
          <path d="M 27 44 L 54 44 L 62 50 L 54 56 L 27 56 Z" fill="url(#logo-cyan)" />
          <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />

          {/* Bottom Arm with Node */}
          <path d="M 27 64 L 66 64 C 70 64 73 67 73 71 C 73 75 70 78 66 78 L 27 78 Z" fill="url(#logo-blue)" />
          <circle cx="66" cy="71" r="3.5" fill="#FFFFFF" />

          {/* Connected Circuit Data Path */}
          <path d="M 73 33 L 77 41 L 77 59 L 73 67" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
          <circle cx="77" cy="50" r="2" fill="#38BDF8" />
        </svg>
      </div>

      {/* Typography: Wordmark */}
      {variant === 'full' && (
        <div className="flex flex-col">
          <span className={`font-black tracking-tight text-slate-900 dark:text-white leading-none ${currentSize.text}`}>
            Ecreation
          </span>
          <span className={`font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 mt-0.5 ${currentSize.sub}`}>
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

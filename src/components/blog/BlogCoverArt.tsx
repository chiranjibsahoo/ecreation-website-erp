import React from 'react';
import { CoverTheme } from '@/lib/blog/blogEngine';

interface BlogCoverArtProps {
  theme?: CoverTheme;
  category: string;
  keyword?: string;
  compact?: boolean;
}

const THEME_PALETTES: Record<
  CoverTheme,
  { bg1: string; bg2: string; accent: string; glow: string; badgeBg: string; badgeText: string }
> = {
  'emerald-gold': {
    bg1: '#064E3B',
    bg2: '#022C22',
    accent: '#F59E0B',
    glow: '#10B981',
    badgeBg: '#ECFDF5',
    badgeText: '#065F46'
  },
  'indigo-slate': {
    bg1: '#1E1B4B',
    bg2: '#0F172A',
    accent: '#818CF8',
    glow: '#6366F1',
    badgeBg: '#EEF2FF',
    badgeText: '#3730A3'
  },
  'amber-obsidian': {
    bg1: '#292524',
    bg2: '#0C0A09',
    accent: '#FBBF24',
    glow: '#D97706',
    badgeBg: '#FFFBEB',
    badgeText: '#92400E'
  },
  'teal-ivory': {
    bg1: '#115E59',
    bg2: '#042F2E',
    accent: '#FDE047',
    glow: '#14B8A6',
    badgeBg: '#F0FDFA',
    badgeText: '#115E59'
  },
  'rose-graphite': {
    bg1: '#4C0519',
    bg2: '#18181B',
    accent: '#FB7185',
    glow: '#F43F5E',
    badgeBg: '#FFF1F2',
    badgeText: '#9F1239'
  },
  'cyan-midnight': {
    bg1: '#0C4A6E',
    bg2: '#082F49',
    accent: '#38BDF8',
    glow: '#0EA5E9',
    badgeBg: '#F0F9FF',
    badgeText: '#075985'
  }
};

/**
 * 100% original, copyright-free programmatic SVG editorial cover artwork.
 * Zero external stock images, zero copyright risk, crisp at any resolution.
 */
export const BlogCoverArt: React.FC<BlogCoverArtProps> = ({
  theme = 'emerald-gold',
  category,
  keyword,
  compact = false
}) => {
  const p = THEME_PALETTES[theme] || THEME_PALETTES['emerald-gold'];
  const gradId = `bg-${theme}-${compact ? 'sm' : 'lg'}`;

  return (
    <div className={`relative w-full overflow-hidden select-none ${compact ? 'h-48' : 'h-60 sm:h-72'}`}>
      <svg
        viewBox="0 0 800 420"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        role="img"
        aria-label={`${category} editorial illustration by Ecreation IT Solution`}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={p.bg1} />
            <stop offset="100%" stopColor={p.bg2} />
          </linearGradient>
        </defs>

        <rect width="800" height="420" fill={`url(#${gradId})`} />

        {/* Architectural Grid Pattern */}
        <g stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1">
          <line x1="0" y1="84" x2="800" y2="84" />
          <line x1="0" y1="168" x2="800" y2="168" />
          <line x1="0" y1="252" x2="800" y2="252" />
          <line x1="0" y1="336" x2="800" y2="336" />
          <line x1="160" y1="0" x2="160" y2="420" />
          <line x1="320" y1="0" x2="320" y2="420" />
          <line x1="480" y1="0" x2="480" y2="420" />
          <line x1="640" y1="0" x2="640" y2="420" />
        </g>

        {/* Ambient Geometric Orbs */}
        <circle cx="650" cy="95" r="145" fill={p.glow} fillOpacity="0.16" />
        <circle cx="130" cy="340" r="120" fill={p.accent} fillOpacity="0.12" />

        {/* Abstract Data Curve & Architecture Nodes */}
        <path
          d="M 60 310 Q 190 210, 320 250 T 560 155 T 740 120"
          fill="none"
          stroke={p.accent}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="320" cy="250" r="7" fill={p.accent} stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="560" cy="155" r="7" fill={p.accent} stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="740" cy="120" r="9" fill="#FFFFFF" stroke={p.accent} strokeWidth="3" />

        {/* Subtle UI Wireframe Card Accent */}
        <rect x="490" y="215" width="245" height="140" rx="16" fill="#FFFFFF" fillOpacity="0.06" stroke="#FFFFFF" strokeOpacity="0.16" />
        <rect x="514" y="242" width="110" height="10" rx="5" fill={p.accent} fillOpacity="0.85" />
        <rect x="514" y="266" width="190" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.35" />
        <rect x="514" y="286" width="150" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.22" />
        <rect x="514" y="314" width="76" height="22" rx="8" fill={p.accent} fillOpacity="0.25" stroke={p.accent} strokeWidth="1" />
      </svg>

      {/* Crisp Overlay Pills */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
        <span
          className="text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs"
          style={{ backgroundColor: p.badgeBg, color: p.badgeText }}
        >
          {category}
        </span>
        <span className="text-[10px] font-mono font-bold text-white/90 bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
          ECREATION EDITORIAL
        </span>
      </div>

      {keyword && (
        <div className="absolute bottom-3.5 left-4">
          <span className="text-[10px] font-mono font-semibold text-amber-200 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
            Focus Topic: {keyword}
          </span>
        </div>
      )}
    </div>
  );
};

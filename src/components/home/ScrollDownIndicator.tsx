'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollDownIndicatorProps {
  targetId?: string;
  label?: string;
}

export const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({
  targetId = 'services',
  label = 'Scroll to Explore'
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-4 group select-none">
      <button
        onClick={handleClick}
        className="flex flex-col items-center gap-2.5 text-slate-400 hover:text-blue-600 transition-colors focus-visible:outline-hidden"
        aria-label={label}
      >
        {/* Animated Mouse Shell */}
        <div className="w-5 h-8 rounded-full border-2 border-slate-300 group-hover:border-blue-500 transition-colors flex justify-center pt-1.5 shadow-xs">
          <span className="w-1 h-2 rounded-full bg-blue-600 animate-pulse" />
        </div>

        {/* Text and animated chevron */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
            {label}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-blue-600 group-hover:translate-y-0.5 transition-transform duration-300" />
        </div>
      </button>
    </div>
  );
};

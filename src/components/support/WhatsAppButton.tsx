'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data/seedData';

export const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    COMPANY_INFO.defaultWhatsAppMessage
  )}`;

  return (
    <aside
      aria-label="Direct messaging contact"
      className="fixed bottom-6 right-6 z-40 group flex items-center"
    >
      {/* Tooltip on Hover */}
      <span
        id="whatsapp-tooltip"
        role="tooltip"
        className="mr-3 hidden sm:inline-block bg-neutral-900/90 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
      >
        Chat on WhatsApp
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby="whatsapp-tooltip"
        aria-label="Chat directly with an Ecreation IT Solution consultant on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-emerald-400/50"
      >
        {/* Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping -z-10" />
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-white stroke-[2.2]" />
      </a>
    </aside>
  );
};

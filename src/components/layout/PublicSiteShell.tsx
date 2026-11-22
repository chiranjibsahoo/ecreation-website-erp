'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LeftSocialRail } from '@/components/layout/LeftSocialRail';
import { RightFloatingDock } from '@/components/layout/RightFloatingDock';
import { OpeningPreloader } from '@/components/animations/OpeningPreloader';
import { AiChatbot } from '@/components/support/AiChatbot';
import { ExitOfferPopup } from '@/components/forms/ExitOfferPopup';
import { GoldGradientToggle } from '@/components/layout/GoldGradientToggle';
import { CookieConsent } from '@/components/layout/CookieConsent';

export const PublicSiteShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdminPanel = pathname?.startsWith('/admin');

  // Inside Admin Panel (/admin/*), render a 100% clean, dedicated ERP workspace
  // without public website header, footer, left/right floating rails, enquiry buttons, or chatbot.
  if (isAdminPanel) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <OpeningPreloader />
      <RightFloatingDock />
      <LeftSocialRail />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AiChatbot />
      <ExitOfferPopup />
      <GoldGradientToggle />
      <CookieConsent />
    </>
  );
};

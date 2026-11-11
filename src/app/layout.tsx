import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LeftSocialRail } from '@/components/layout/LeftSocialRail';
import { RightFloatingDock } from '@/components/layout/RightFloatingDock';
import { OpeningPreloader } from '@/components/animations/OpeningPreloader';
import { WhatsAppButton } from '@/components/support/WhatsAppButton';
import { AiChatbot } from '@/components/support/AiChatbot';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const viewport: Viewport = {
  themeColor: '#d97706',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ecreation.in'),
  title: {
    default: 'Ecreation IT Solution | Enterprise Software, ERP & Cloud Engineering',
    template: '%s | Ecreation IT Solution'
  },
  description:
    'Ecreation IT Solution is a premier software development and enterprise IT company engineering custom ERPs, high-throughput web systems, mobile apps, and cloud architectures.',
  keywords: [
    'Ecreation IT Solution',
    'Enterprise ERP Solutions',
    'Custom Software Engineering',
    'Next.js Development Agency',
    'Cloud Architecture DevOps',
    'AI Workflow Automation',
    'Mobile App Engineering'
  ],
  authors: [{ name: 'Ecreation IT Solution', url: 'https://ecreation.in' }],
  creator: 'Ecreation IT Solution',
  publisher: 'Ecreation IT Solution',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ecreation.in',
    title: 'Ecreation IT Solution | Enterprise Software & Cloud Engineering',
    description:
      'Engineering scalable enterprise systems, bespoke ERP portals, and mission-critical digital products with guaranteed performance.',
    siteName: 'Ecreation IT Solution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecreation IT Solution | Enterprise Software & Cloud Engineering',
    description: 'Engineering scalable enterprise systems, bespoke ERP portals, and mission-critical cloud solutions.',
    creator: '@ecreation_it',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo-icon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <SchemaMarkup type="Organization" />
        <SchemaMarkup type="WebSite" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen selection:bg-amber-500 selection:text-slate-950">
        <OpeningPreloader />
        <RightFloatingDock />
        <LeftSocialRail />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <AiChatbot />
      </body>
    </html>
  );
}

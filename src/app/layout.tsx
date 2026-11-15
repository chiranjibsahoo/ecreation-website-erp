import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LeftSocialRail } from '@/components/layout/LeftSocialRail';
import { RightFloatingDock } from '@/components/layout/RightFloatingDock';
import { OpeningPreloader } from '@/components/animations/OpeningPreloader';
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
    default: 'Ecreation IT Solution | Website Design, Custom ERP, AI & Digital Marketing',
    template: '%s | Ecreation IT Solution'
  },
  description:
    'Ecreation IT Solution builds world-class corporate websites, custom Office Automation & ERP software, AI chatbots, mobile apps, and Google #1 SEO & social media growth.',
  keywords: [
    'Ecreation IT Solution',
    'Website Design and Development',
    'Office Automation Software',
    'Enterprise ERP Solutions',
    'SEO and Digital Marketing',
    'Social Media Management',
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
    title: 'Ecreation IT Solution | Website Design, Custom ERP & Digital Growth',
    description:
      'Engineering luxury websites, custom ERP & office automation software, and high-ROI digital marketing.',
    siteName: 'Ecreation IT Solution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecreation IT Solution | Website Design, Custom ERP & Digital Growth',
    description: 'Engineering luxury websites, custom ERP & office automation software, and high-ROI digital marketing.',
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
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen selection:bg-amber-500 selection:text-stone-950">
        <OpeningPreloader />
        <RightFloatingDock />
        <LeftSocialRail />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AiChatbot />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'OPIOL',
    template: '%s – OPIOL',
  },
  description: 'همراه هوشمند شما برای تحصیل در خارج از کشور',
  themeColor: '#1A1A1A',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'OPIOL',
    description: 'همراه هوشمند شما برای تحصیل در خارج از کشور',
    url: 'https://opiol.app',
    siteName: 'OPIOL',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'OPIOL Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPIOL',
    description: 'همراه هوشمند شما برای تحصیل در خارج از کشور',
    images: ['/preview.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <link rel="canonical" href="https://opiol.app/" />
      </head>
      <body className={`${inter.className} bg-opiol-dark text-white antialiased rtl`}>
        <Navigation />
        <main className="pt-16 min-h-screen">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </body>
    </html>
  );
} 
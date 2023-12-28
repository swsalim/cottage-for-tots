import { cn } from '@/lib/className';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';

const seo = {
  title: 'Nurturing Young Minds with Playful Learning',
  description:
    "Discover a world where education meets imagination. Our toys and books are specially curated to stimulate your child's development through every playful moment.",
  openGraph: {
    image: '/images/og-default.png',
    imageAlt: 'Banner for cottagefortots.com',
    width: '1200',
    height: '630',
  },
  creator: '@swsalim',
};

export const metadata: Metadata = {
  title: {
    default: seo.title,
    template: '%s · CottageForTots',
  },
  description: seo.description,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    images: [
      {
        url: seo.openGraph.image,
        width: seo.openGraph.width,
        height: seo.openGraph.height,
        alt: seo.openGraph.imageAlt,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/icons/favicon-32x32.png',
    shortcut: '/icons/apple-touch-icon.png',
    apple: '/icons/apple-touch-icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    creator: seo.creator,
    images: [seo.openGraph.image],
  },
  robots: {
    index: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(GeistSans.variable, 'antialiased')}>
      <body className="flex h-screen flex-col bg-stone-50">{children}</body>
    </html>
  );
}

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Image from 'next/image'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'

import { cn } from '@/lib/utils'

import '@/styles/globals.css'

import { siteConfig } from '@/config/site'

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  metadataBase: siteConfig.url,
  alternates: {
    canonical: '/',
  },
  authors: [
    {
      name: 'Yuyu',
      url: 'https://www.yuurrific.com',
    },
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.openGraph.image,
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: siteConfig.openGraph.imageAlt,
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
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.creator,
    images: [siteConfig.openGraph.image],
  },
  robots: {
    index: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn('antialiased', GeistSans.variable, fontHeading.variable)}
    >
      <head>
        <link rel="preconnect" href="//ik.imagekit.io" />
        <link rel="preconnect" href="//stats.cottagefortots.com" />
        <link rel="dns-prefetch" href="//stats.cottagefortots.com" />
        <link rel="dns-prefetch" href="//ik.imagekit.io" />
        <Script
          id="simple-analytics"
          dangerouslySetInnerHTML={{
            __html: `window.sa_event=window.sa_event||function(){var a=[].slice.call(arguments);window.sa_event.q?window.sa_event.q.push(a):window.sa_event.q=[a]};`,
          }}
        />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="CLyM6zKvWrFOywsjN8xnjA"
          async
        ></script>
        <script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="c2fbac7b-0b09-48f0-b925-7a5a61de2a3b"
          async
        ></script>
      </head>
      <body
        className="flex min-h-screen flex-col bg-slate-50 font-sans"
        suppressHydrationWarning
      >
        {children}
        <script async src="https://stats.cottagefortots.com/latest.js"></script>
        <script
          async
          src="https://stats.cottagefortots.com/auto-events.js"
        ></script>
        <noscript>
          <Image
            src="https://stats.cottagefortots.com/noscript.gif?collect-dnt=true"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
            width="1"
            height="1"
            unoptimized
          />
        </noscript>
      </body>
    </html>
  )
}

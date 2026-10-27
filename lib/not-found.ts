import type { Metadata } from 'next'

export const notFoundMetadata: Metadata = {
  title: 'Page not found',
  description: 'This page does not exist.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: null,
  },
  openGraph: {
    title: 'Page not found',
    description: 'This page does not exist.',
  },
  twitter: {
    card: 'summary',
    title: 'Page not found',
    description: 'This page does not exist.',
  },
}

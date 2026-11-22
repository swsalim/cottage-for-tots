import { SiteConfig } from 'types'

export const siteConfig: SiteConfig = {
  title: 'CottageForTots: Educational Toys and Play Guides',
  description:
    "Discover a world where education meets imagination. Our toys and books are specially curated to stimulate your child's development through every playful moment.",
  siteName: 'CottageForTots',
  url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  openGraph: {
    image: '/images/og-default.png',
    imageAlt: 'Banner for cottagefortots.com',
    width: '1200',
    height: '630',
  },
  creator: '@swsalim',
}

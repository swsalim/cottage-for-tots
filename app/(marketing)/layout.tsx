import type { Metadata } from 'next'

import { marketingConfig } from '@/config/marketing'
import { siteConfig } from '@/config/site'
import Footer from '@/components/Footer'
import { MainNav } from '@/components/MainNav'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-transparent">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

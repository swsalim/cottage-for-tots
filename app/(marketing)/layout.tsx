import { MotionRoot } from '@/components/Reveal'
import Footer from '@/components/Footer'
import { SiteHeader } from '@/components/SiteHeader'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <MotionRoot>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </MotionRoot>
  )
}

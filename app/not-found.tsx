import { marketingConfig } from '@/config/marketing'
import { notFoundMetadata } from '@/lib/not-found'
import Footer from '@/components/Footer'
import { MainNav } from '@/components/MainNav'
import { NotFoundMessage } from '@/components/NotFoundMessage'

export const metadata = notFoundMetadata

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-transparent">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
        </div>
      </header>
      <main className="flex-1">
        <NotFoundMessage />
      </main>
      <Footer />
    </div>
  )
}

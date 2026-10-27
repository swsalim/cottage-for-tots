import { notFoundMetadata } from '@/lib/not-found'
import Footer from '@/components/Footer'
import { NotFoundMessage } from '@/components/NotFoundMessage'
import { SiteHeader } from '@/components/SiteHeader'

export const metadata = notFoundMetadata

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <NotFoundMessage />
      </main>
      <Footer />
    </div>
  )
}

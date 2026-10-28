import { notFoundMetadata } from '@/lib/not-found'
import { NotFoundMessage } from '@/components/NotFoundMessage'

export const metadata = notFoundMetadata

export default function MarketingNotFound() {
  return <NotFoundMessage />
}

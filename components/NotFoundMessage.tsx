import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/Button'

export function NotFoundMessage() {
  return (
    <div className="container max-w-2xl py-24">
      <h1 className="font-heading text-4xl text-slate-900">Page not found</h1>
      <p className="mt-4 max-w-xl text-lg text-slate-600">
        This page does not exist.
      </p>
      <Link href="/" className={cn(buttonVariants(), 'mt-8')}>
        Back to home
      </Link>
    </div>
  )
}

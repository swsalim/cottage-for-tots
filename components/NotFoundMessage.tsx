import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function NotFoundMessage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24">
      <h1 className="text-4xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        This page does not exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  )
}

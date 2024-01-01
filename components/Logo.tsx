import Image from 'next/image'

import { cn } from '@/lib/utils'

export default function Logo({ className }: { className?: string }) {
  return (
    <>
      <span className="sr-only">Cottage for Tots</span>
      <div
        className={cn(
          'relative h-10 w-10 overflow-hidden rounded-full sm:h-12 sm:w-12',
          className
        )}
      >
        <Image
          src="/images/logo.svg"
          alt="Cottage for Tots"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </>
  )
}

import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export default function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn('max-w-8xl relative mx-auto px-6 py-8 sm:px-8', className)}
    >
      {children}
    </div>
  )
}

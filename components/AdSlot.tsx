'use client'

import * as React from 'react'

import { adSlots, isAdSlotVisible, type AdPlacement } from '@/config/ads'
import { cn } from '@/lib/utils'

export function AdSlot({
  placement,
  className,
}: {
  placement: AdPlacement
  className?: string
}) {
  const slot = adSlots[placement]
  const visible = isAdSlotVisible(placement)
  const ref = React.useRef<HTMLElement>(null)
  const [loadCreative, setLoadCreative] = React.useState(false)

  React.useEffect(() => {
    if (!visible || !slot?.src) return
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setLoadCreative(true)
      },
      { rootMargin: '240px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [slot?.src, visible])

  if (!visible || !slot) return null

  return (
    <aside
      ref={ref}
      aria-label={slot.label}
      data-ad-placement={placement}
      className={cn('my-6', className)}
    >
      <p className="mb-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {slot.label}
      </p>
      <div
        className="w-full overflow-hidden rounded-xl border border-dashed bg-muted/50"
        style={{ minHeight: slot.minHeight }}
      >
        {slot.src && loadCreative ? (
          <iframe
            title={slot.label}
            src={slot.src}
            className="h-full w-full border-0"
            loading="lazy"
            style={{ minHeight: slot.minHeight }}
          />
        ) : (
          <p className="flex items-center justify-center px-4 text-sm text-muted-foreground" style={{ minHeight: slot.minHeight }}>
            Reserved ad space
          </p>
        )}
      </div>
    </aside>
  )
}

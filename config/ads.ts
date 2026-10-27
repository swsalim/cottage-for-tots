export const shopeeUrl = 'https://shopee.sg/cottagefortots'

export const adPlacements = [
  'home-after-hero',
  'home-between',
  'home-above-footer',
  'blog-inline',
  'blog-sidebar',
  'post-after-intro',
  'post-inline',
  'post-sidebar',
  'post-mobile-anchor',
] as const

export type AdPlacement = (typeof adPlacements)[number]

export type AdSlotConfig = {
  label: 'Advertisement' | 'Sponsored'
  minHeight: number
  /** Creative URL. Empty until a placement is sold. */
  src?: string
}

export const adSlots: Record<AdPlacement, AdSlotConfig> = {
  'home-after-hero': { label: 'Advertisement', minHeight: 100 },
  'home-between': { label: 'Advertisement', minHeight: 280 },
  'home-above-footer': { label: 'Advertisement', minHeight: 100 },
  'blog-inline': { label: 'Advertisement', minHeight: 250 },
  'blog-sidebar': { label: 'Advertisement', minHeight: 600 },
  'post-after-intro': { label: 'Advertisement', minHeight: 250 },
  'post-inline': { label: 'Advertisement', minHeight: 250 },
  'post-sidebar': { label: 'Advertisement', minHeight: 600 },
  'post-mobile-anchor': { label: 'Advertisement', minHeight: 100 },
}

export function isAdSlotVisible(placement: AdPlacement) {
  const slot = adSlots[placement]
  if (!slot) return false
  if (process.env.NODE_ENV === 'production') return Boolean(slot.src)
  return true
}

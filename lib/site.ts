/** Production origin already used by next-sitemap. Env wins when it is set. */
const DEFAULT_SITE_URL = 'https://www.cottagefortots.com'

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')
  if (configured) return configured
  return DEFAULT_SITE_URL
}

export function absoluteUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${getSiteUrl()}${normalized}`
}

/** Calendar date from a frontmatter date. Does not invent a time. */
export function frontmatterDate(value?: string | null) {
  if (!value) return undefined
  const match = String(value).match(/^(\d{4}-\d{2}-\d{2})/)
  return match ? match[1] : String(value)
}

import { allPosts, type Post } from 'contentlayer/generated'
import GithubSlugger from 'github-slugger'

export type TocItem = {
  id: string
  text: string
  depth: number
}

export function publishedPosts() {
  return allPosts
    .filter((post) => post.published)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
}

export function readingMinutes(post: Pick<Post, 'body'>) {
  const words = post.body.raw.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function tableOfContents(raw: string): TocItem[] {
  const slugger = new GithubSlugger()
  const items: TocItem[] = []
  let inFence = false

  for (const line of raw.split('\n')) {
    if (line.trim().startsWith('```')) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (!match) continue
    const text = match[2]
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[`*_]/g, '')
      .trim()
    items.push({
      depth: match[1].length,
      text,
      id: slugger.slug(text),
    })
  }

  return items
}

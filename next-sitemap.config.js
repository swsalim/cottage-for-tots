const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://www.cottagefortots.com/'

function frontmatterValue(block, key) {
  const match = block.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  if (!match) return undefined
  return match[1].trim().replace(/^['"]|['"]$/g, '')
}

function collectPosts(dir, prefix = '') {
  if (!fs.existsSync(dir)) return []

  const posts = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      posts.push(...collectPosts(fullPath, relative))
      continue
    }
    if (!entry.name.endsWith('.mdx')) continue

    const raw = fs.readFileSync(fullPath, 'utf8')
    const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    const block = frontmatter ? frontmatter[1] : ''
    const slug = `/blog/${relative.replace(/\.mdx$/, '')}`
    posts.push({
      slug,
      published: frontmatterValue(block, 'published') === 'true',
      date: frontmatterValue(block, 'date'),
      updated: frontmatterValue(block, 'updated'),
    })
  }
  return posts
}

const posts = collectPosts(path.join(process.cwd(), 'content/blog'))
const postsBySlug = new Map(posts.map((post) => [post.slug, post]))

const exclude = [
  '/dashboard*',
  '/404',
  '/api*',
  '/login',
  '/server-sitemap.xml',
  '/manifest.webmanifest',
  ...posts.filter((post) => !post.published).map((post) => post.slug),
]

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  exclude,
  transform: async (sitemapConfig, urlPath) => {
    const normalized = urlPath.length > 1 ? urlPath.replace(/\/$/, '') : urlPath
    const post = postsBySlug.get(normalized)
    const frontmatterLastmod = post ? post.updated || post.date : undefined

    return {
      loc: urlPath,
      changefreq: sitemapConfig.changefreq,
      priority: sitemapConfig.priority,
      lastmod: frontmatterLastmod
        ? frontmatterLastmod
        : sitemapConfig.autoLastmod
          ? new Date().toISOString()
          : undefined,
      alternateRefs: sitemapConfig.alternateRefs ?? [],
    }
  },
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    transformRobotsTxt: async (_, robotsTxt) =>
      robotsTxt.replace(/^Host:\s*.+$/m, 'Host: www.cottagefortots.com'),
  },
}

module.exports = config

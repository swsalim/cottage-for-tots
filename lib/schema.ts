import { allAuthors, type Post } from 'contentlayer/generated'

import { siteConfig } from '@/config/site'
import { absoluteUrl, frontmatterDate, getSiteUrl } from '@/lib/site'

const IMAGEKIT_DIRECTORY = 'CottageForTots/Blog'

export function postImageUrl(filename: string) {
  if (/^https?:\/\//.test(filename)) return filename
  const imagekitId = process.env.NEXT_PUBLIC_IMAGEKIT_ID || 'yuurrific'
  return `https://ik.imagekit.io/${imagekitId}/${IMAGEKIT_DIRECTORY}/${filename}`
}

export function homeStructuredData() {
  const url = getSiteUrl()
  const organizationId = `${url}/#organization`
  const websiteId = `${url}/#website`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: siteConfig.siteName,
        url,
        description: siteConfig.description,
        logo: `${url}/images/logo.png`,
        sameAs: ['https://shopee.sg/cottagefortots'],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteConfig.siteName,
        url,
        description: siteConfig.description,
        publisher: { '@id': organizationId },
      },
    ],
  }
}

function postAuthors(post: Post) {
  return post.authors.map((slug) => {
    const author = allAuthors.find((entry) => entry.slug === `/authors/${slug}`)
    const person: Record<string, string> = {
      '@type': 'Person',
      name: author?.title || slug,
    }
    if (author?.twitter) {
      person.url = `https://twitter.com/${author.twitter}`
    }
    return person
  })
}

export function postStructuredData(post: Post) {
  const url = absoluteUrl(post.slug)
  const siteUrl = getSiteUrl()
  const published = frontmatterDate(post.date)
  const modified = frontmatterDate(post.updated) || published

  const article: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: post.title,
    datePublished: published,
    dateModified: modified,
    author: postAuthors(post),
    image: post.image ? [postImageUrl(post.image)] : undefined,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
  }

  if (post.description) {
    article.description = post.description
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  }

  return { article, breadcrumb }
}

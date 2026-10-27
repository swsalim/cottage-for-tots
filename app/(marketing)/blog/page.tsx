import { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { isAdSlotVisible } from '@/config/ads'
import { publishedPosts, readingMinutes } from '@/lib/content'
import { cn } from '@/lib/utils'
import { AdSlot } from '@/components/AdSlot'
import { BlogBrowser } from '@/components/BlogBrowser'

const config = {
  title: 'Blog Posts',
  description:
    'Delve into the world of early learning where creativity meets curiosity.',
  url: '/blog',
}

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: {
    canonical: config.url,
  },
  openGraph: {
    title: config.title,
    description: config.description,
    url: config.url,
    images: [
      {
        url: new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${config.title}`
        ),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: siteConfig.openGraph.imageAlt,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: config.title,
    description: config.description,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [siteConfig.openGraph.image],
  },
}

export default function BlogPage() {
  const posts = publishedPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    image: post.image,
    readingMinutes: readingMinutes(post),
  }))
  const sidebar = isAdSlotVisible('blog-sidebar')

  return (
    <div
      className={cn(
        'mx-auto grid w-full max-w-6xl gap-8 px-4 py-10',
        sidebar && 'lg:grid-cols-[minmax(0,1fr)_16rem]'
      )}
    >
      <div>
        <h1 className="text-4xl md:text-5xl">{config.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {config.description}
        </p>
        <div className="mt-8">
          {posts.length ? (
            <BlogBrowser posts={posts} />
          ) : (
            <p>No posts published.</p>
          )}
        </div>
      </div>
      {sidebar ? (
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <AdSlot placement="blog-sidebar" />
          </div>
        </aside>
      ) : null}
    </div>
  )
}

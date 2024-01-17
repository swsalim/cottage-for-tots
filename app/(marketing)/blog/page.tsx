import { Metadata } from 'next'
import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

import { siteConfig } from '@/config/site'
import { formatDate } from '@/lib/utils'
import ImageKit from '@/components/ImageKit'

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

export default async function BlogPage() {
  let posts

  if (process.env.NODE_ENV === 'development') {
    posts = allPosts.sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })
  } else {
    posts = allPosts
      .filter((post) => post.published)
      .sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
      })
  }

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-heading inline-block text-4xl  text-slate-900 lg:text-5xl">
            Blog Posts
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {post.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg sm:aspect-[3/2]">
                  <ImageKit
                    src={post.image}
                    alt={post.title}
                    directory="CottageForTots/Blog"
                    className="w-full  bg-slate-100 object-cover"
                    priority={index <= 1}
                  />
                  <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-slate-900/10" />
                </div>
              )}
              <h2 className="font-heading text-2xl">{post.title}</h2>
              {post.description && (
                <p className="text-slate-500">{post.description}</p>
              )}
              {post.date && (
                <p className="text-sm text-slate-500">
                  {formatDate(post.date)}
                </p>
              )}
              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}

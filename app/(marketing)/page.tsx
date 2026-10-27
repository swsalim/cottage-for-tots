import { Metadata } from 'next'
import Link from 'next/link'

import { shopeeUrl } from '@/config/ads'
import { siteConfig } from '@/config/site'
import { publishedPosts, readingMinutes } from '@/lib/content'
import { homeStructuredData } from '@/lib/schema'
import { AdSlot } from '@/components/AdSlot'
import { ImageKit } from '@/components/ImageKit'
import { JsonLd } from '@/components/JsonLd'
import { PostCard } from '@/components/PostCard'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  const posts = publishedPosts()
    .slice(0, 6)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      image: post.image,
      readingMinutes: readingMinutes(post),
    }))

  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-6">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            {siteConfig.siteName}
          </p>
          <h1 className="text-4xl leading-tight md:text-5xl">
            Welcome to Cottage for Tots
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/blog">Read the blog</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={shopeeUrl}>Shop on Shopee</a>
            </Button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <ImageKit
            src="logo.png"
            directory="CottageForTots"
            alt="Cottage for Tots"
            width={480}
            height={480}
            priority
            className="h-auto w-full"
          />
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4">
        <AdSlot placement="home-after-hero" />
      </div>

      <Reveal>
        <section className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl">From the blog</h2>
              <p className="mt-2 text-muted-foreground">
                Get the latest parenting tips
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/blog">All posts</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <AdSlot placement="home-between" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </Reveal>

      <div className="mx-auto w-full max-w-6xl px-4">
        <AdSlot placement="home-above-footer" />
      </div>
    </>
  )
}

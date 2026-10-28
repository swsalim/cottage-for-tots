import { notFound } from 'next/navigation'
import { allAuthors, allPosts, Post } from 'contentlayer/generated'

import { Mdx } from '@/components/MdxComponents'

import '@/styles/mdx.css'

import { Metadata } from 'next'
import Link from 'next/link'

import { isAdSlotVisible } from '@/config/ads'
import { readingMinutes, tableOfContents } from '@/lib/content'
import { notFoundMetadata } from '@/lib/not-found'
import { postStructuredData } from '@/lib/schema'
import { absoluteUrl, cn, formatDate } from '@/lib/utils'
import { AdSlot } from '@/components/AdSlot'
import { ImageKit } from '@/components/ImageKit'
import { JsonLd } from '@/components/JsonLd'
import { PostCard } from '@/components/PostCard'
import { ShareDialog } from '@/components/ShareDialog'
import { TableOfContents } from '@/components/TableOfContents'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface PostPageProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getPostFromParams(slug: string[] | undefined): Promise<Post | null> {
  const path = slug?.join('/')
  const post = allPosts.find((entry) => entry.slugAsParams === path)

  if (!post || !post.published) {
    return null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostFromParams(slug)

  if (!post) {
    return notFoundMetadata
  }

  const url = process.env.NEXT_PUBLIC_BASE_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set('title', post.title)
  ogUrl.searchParams.set('type', 'Blog Post')
  ogUrl.searchParams.set('mode', 'dark')

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
    alternates: {
      canonical: absoluteUrl(post.slug),
    },
  }
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allPosts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slugAsParams.split('/'),
    }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostFromParams(slug)

  if (!post) {
    notFound()
  }

  const related = allPosts
    .filter((entry) => entry.published)
    .filter((entry) => entry.slugAsParams !== slug[0])
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 3)

  const { article, breadcrumb } = postStructuredData(post)
  const authors = post.authors.map((author) =>
    allAuthors.find((entry) => entry.slug === `/authors/${author}`)
  )
  const minutes = readingMinutes(post)
  const toc = tableOfContents(post.body.raw)
  const sidebar = isAdSlotVisible('post-sidebar')

  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      <div
        className={cn(
          'mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[16rem_minmax(0,1fr)]',
        )}
      >
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents items={toc} />
          {sidebar ? (
            <AdSlot placement="post-sidebar" />
          ) : null}
        </aside>
        <article className="min-w-0">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/blog">All posts</Link>
          </Button>
          {post.image ? (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-lg">
              <ImageKit
                directory="CottageForTots/Blog"
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 720px, 100vw"
              />
            </div>
          ) : null}
          <header className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </Badge>
              {post.updated ? (
                <Badge variant="outline">
                  <time dateTime={post.updated}>
                    Updated {formatDate(post.updated)}
                  </time>
                </Badge>
              ) : null}
              <Badge variant="outline">{minutes} min read</Badge>
            </div>
            <h1 className="text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {authors.length ? (
              <div className="flex flex-wrap gap-4">
                {authors.map((author) =>
                  author ? (
                    <a
                      key={author._id}
                      href={`https://twitter.com/${author.twitter}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="relative block size-10 overflow-hidden rounded-full">
                        <ImageKit
                          src={author.avatar}
                          directory="CottageForTots/Author"
                          alt={author.title}
                          fill
                          className="object-cover"
                        />
                      </span>
                      <span>
                        <span className="block font-medium">{author.title}</span>
                        <span className="text-muted-foreground">
                          @{author.twitter}
                        </span>
                      </span>
                    </a>
                  ) : null
                )}
              </div>
            ) : null}
          </header>
          {post.description ? (
            <Card className="mt-6 hover:translate-y-0 hover:shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium">Summary</p>
                <p className="mt-2 text-muted-foreground">{post.description}</p>
              </CardContent>
            </Card>
          ) : null}
          <AdSlot placement="post-after-intro" />
          <div className="mt-8">
            <Mdx code={post.body.code} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShareDialog title={post.title} url={post.slug} image={post.image} />
            <Button variant="ghost" asChild>
              <Link href="/blog">All posts</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <AdSlot placement="post-mobile-anchor" />
          </div>
        </article>
      </div>
      <section className="border-t bg-muted/40 py-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="text-3xl">Related posts</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((entry) => (
              <PostCard
                key={entry._id}
                post={{
                  slug: entry.slug,
                  title: entry.title,
                  description: entry.description,
                  date: entry.date,
                  image: entry.image,
                  readingMinutes: readingMinutes(entry),
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

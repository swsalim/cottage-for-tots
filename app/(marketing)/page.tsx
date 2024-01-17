'use client'

import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

import { cn, formatDate } from '@/lib/utils'
import { buttonVariants } from '@/components/Button'
import Container from '@/components/Container'
import ImageKit from '@/components/ImageKit'

export default function Home() {
  let posts

  if (process.env.NODE_ENV === 'development') {
    posts = allPosts.slice(0, 5).sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })
  } else {
    posts = allPosts
      .slice(0, 5)
      .filter((post) => post.published)
      .sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
      })
  }

  return (
    <>
      <div className="hero relative bg-inherit" data-testid="hero">
        <div className="hero-banner w-full-h-full absolute inset-0 -z-10"></div>
        <Container className="pb-12 pt-20 md:py-40">
          <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full">
            <ImageKit
              src="logo.png"
              directory="CottageForTots"
              alt="Cottage for Tots"
              className="object-contain"
              width={192}
              height={192}
            />
          </div>
          <h1 className="font-heading mx-auto my-0 text-center text-4xl leading-10 tracking-wide text-slate-900 sm:text-5xl sm:leading-none md:text-6xl">
            Welcome to Cottage for Tots
          </h1>
          <p className="mx-auto my-2 max-w-3xl text-center text-xl leading-7 text-slate-900 md:my-4">
            Discover a world where education meets imagination. Our toys and
            books are specially curated to stimulate your child&apos;s
            development through every playful moment.
          </p>

          <div className="mx-auto flex max-w-lg flex-col justify-center gap-4 md:flex-row">
            <a
              href="https://shopee.sg/cottagefortots"
              className={cn(buttonVariants())}
            >
              Browse Products
            </a>
          </div>
        </Container>
      </div>
      <div className="relative bg-slate-100/80 px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold capitalize tracking-tight text-slate-900 sm:text-4xl">
              From the blog
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-slate-500 sm:mt-4">
              Get the latest parenting tips
            </p>
          </div>

          {posts?.length ? (
            <div className="mx-auto my-16 max-w-4xl space-y-20 lg:mt-20 lg:space-y-20">
              {posts.map((post, index) => (
                <article
                  key={post._id}
                  className="relative isolate flex flex-col gap-8 lg:flex-row"
                >
                  {post.image && (
                    <div className="lg:aspect-square relative aspect-[16/9] sm:aspect-[2/1] lg:w-64 lg:shrink-0">
                      <ImageKit
                        src={post.image}
                        alt={post.title}
                        directory="CottageForTots/Blog"
                        className="w-full rounded-lg bg-slate-100 object-cover"
                        priority={index <= 1}
                      />
                      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-slate-900/10" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-x-4 text-sm">
                      <time dateTime={post.date} className="text-slate-500">
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 group-hover:text-slate-600">
                        <Link href={post.slug}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-4 leading-6 text-slate-600">
                        {post.description}
                      </p>
                    </div>
                  </div>
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
      </div>
    </>
  )
}

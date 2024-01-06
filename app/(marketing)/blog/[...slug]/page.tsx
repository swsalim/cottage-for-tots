import { notFound } from 'next/navigation'
import { allAuthors, allPosts, Post } from 'contentlayer/generated'

import { Mdx } from '@/components/MdxComponents'

import '@/styles/mdx.css'

import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'

import { absoluteUrl, cn, formatDate } from '@/lib/utils'
import { buttonVariants } from '@/components/Button'
import ImageKit from '@/components/ImageKit'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams({
  params,
}: PostPageProps): Promise<Post | null> {
  const slug = params?.slug?.join('/')
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    return null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams({ params })

  if (!post) {
    return {}
  }

  const url = process.env.NEXT_PUBLIC_BASE_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set('heading', post.title)
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
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  if (process.env.NODE_ENV === 'development') {
    return allPosts.map((post) => ({
      slug: post.slugAsParams.split('/'),
    }))
  } else {
    return allPosts
      .filter((post) => post.published)
      .map((post) => ({
        slug: post.slugAsParams.split('/'),
      }))
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams({ params })

  if (!post) {
    notFound()
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-[-200px] top-14 hidden xl:inline-flex'
        )}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        {post.date && (
          <time dateTime={post.date} className="block text-sm text-slate-500">
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1 className="font-heading mt-2 inline-block text-4xl leading-tight tracking-wide lg:text-5xl lg:leading-snug">
          {post.title}
        </h1>
        {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <ImageKit
                      src={author.avatar}
                      directory="CottageForTots/Author"
                      alt={author.title}
                      className="bg-white object-cover"
                    />
                  </div>

                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-slate-500">
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      {post.image && (
        <div className="aspect-h-3 aspect-w-4 relative my-8 overflow-hidden rounded-md border">
          <ImageKit
            directory="CottageForTots/Blog"
            src={post.image}
            alt={post.title}
            width={700}
            height={700}
            className="object-cover"
            priority
          />
        </div>
      )}
      <Mdx code={post.body.code} />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: 'ghost' }))}>
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  )
}

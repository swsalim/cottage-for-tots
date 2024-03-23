import Link from 'next/link'
import { Post } from 'contentlayer/generated'

import { formatDate } from '@/lib/utils'
import { ImageKit } from '@/components/ImageKit'

// Define a type for the component's props
interface ArticleGridProps {
  posts: Post[]
}

export default function ArticleGrid({ posts }: ArticleGridProps) {
  return (
    <div className="mx-auto mt-12 grid max-w-none grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.title}
          className="flex flex-col items-start justify-between gap-x-6 gap-y-4 sm:flex-row lg:flex-col"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl sm:aspect-[2/1] sm:max-w-xs lg:aspect-[3/2]">
            <Link href={post.slug}>
              <span className="absolute inset-0 z-10" />
              <ImageKit
                src={post.image}
                alt={post.title}
                directory="CottageForTots/Blog"
                width={2000}
                height={1500}
                className="h-full w-full bg-zinc-100 object-cover"
              />
            </Link>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/10" />
          </div>
          <div className="max-w-xl">
            <div className="flex items-center gap-x-4 text-sm">
              <time dateTime={post.date} className="text-zinc-500">
                {formatDate(post.date)}
              </time>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-zinc-900 group-hover:text-zinc-600">
                <Link href={post.slug}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>
              <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-600">
                {post.description}
              </p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-zinc-100">
                <ImageKit
                  src="yuyu.jpeg"
                  directory="CottageForTots/Author"
                  alt="Yuyu"
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
              <div className="text-sm leading-6">
                <p className="font-semibold text-zinc-900">
                  <span className="absolute inset-0" />
                  Yuyu
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

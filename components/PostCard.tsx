import Link from 'next/link'

import { formatDate } from '@/lib/utils'
import { ImageKit } from '@/components/ImageKit'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type PostCardData = {
  slug: string
  title: string
  description?: string
  date: string
  image?: string
  readingMinutes: number
}

export function PostCard({ post }: { post: PostCardData }) {
  return (
    <Card className="overflow-hidden">
      {post.image ? (
        <Link href={post.slug} className="relative block aspect-[3/2]">
          <ImageKit
            src={post.image}
            alt={post.title}
            directory="CottageForTots/Blog"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 30vw, 100vw"
          />
        </Link>
      ) : null}
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge>{formatDate(post.date)}</Badge>
          <Badge variant="outline">{post.readingMinutes} min read</Badge>
        </div>
        <CardTitle>
          <Link href={post.slug} className="hover:text-primary">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      {post.description ? (
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {post.description}
          </p>
        </CardContent>
      ) : null}
    </Card>
  )
}

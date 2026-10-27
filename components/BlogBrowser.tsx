'use client'

import * as React from 'react'

import { isAdSlotVisible } from '@/config/ads'
import { AdSlot } from '@/components/AdSlot'
import { PostCard, type PostCardData } from '@/components/PostCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const PAGE_SIZE = 6

export function BlogBrowser({ posts }: { posts: PostCardData[] }) {
  const [order, setOrder] = React.useState<'newest' | 'oldest'>('newest')
  const sorted = React.useMemo(() => {
    const copy = [...posts]
    copy.sort((a, b) => {
      const delta = Number(new Date(a.date)) - Number(new Date(b.date))
      return order === 'oldest' ? delta : -delta
    })
    return copy
  }, [order, posts])

  const showInline = isAdSlotVisible('blog-inline')

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value="all">
          <TabsList>
            <TabsTrigger value="all">All posts</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select
          value={order}
          onValueChange={(value) => setOrder(value as 'newest' | 'oldest')}
        >
          <SelectTrigger className="w-full sm:w-44" aria-label="Sort posts">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {sorted.map((post, index) => (
          <React.Fragment key={post.slug}>
            <PostCard post={post} />
            {showInline && (index + 1) % PAGE_SIZE === 0 && index < sorted.length - 1 ? (
              <div className="sm:col-span-2">
                <AdSlot placement="blog-inline" />
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

// @ts-nocheck
'use client'

import * as React from 'react'
import Link from 'next/link'
import { useMDXComponent } from 'next-contentlayer2/hooks'

import { cn } from '@/lib/utils'

import '@/styles/mdx.css'

import { AdSlot } from '@/components/AdSlot'
import { Callout } from '@/components/Callout'
import { ImageKit } from '@/components/ImageKit'
import {
  MdxTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/mdx-table'
import { MdxCard } from '@/components/MdxCard'

const components = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-3xl tracking-normal sm:text-4xl',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn('scroll-m-20 font-heading leading-tight', className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn('mt-8 scroll-m-20 font-heading', className)} {...props} />
  ),
  h4: ({ className, ...props }) => (
    <h4 className={cn('mt-8 scroll-m-20 font-heading', className)} {...props} />
  ),
  h5: ({ className, ...props }) => (
    <h5 className={cn('mt-8 scroll-m-20 font-heading', className)} {...props} />
  ),
  h6: ({ className, ...props }) => (
    <h6 className={cn('mt-8 scroll-m-20 font-heading', className)} {...props} />
  ),
  p: ({ className, ...props }) => <p className={cn(className)} {...props} />,
  ul: ({ className, ...props }) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        '[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic',
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: MdxTable,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className
      )}
      {...props}
    />
  ),
  ImageKit: ({ className, alt, ...props }) => (
    <ImageKit
      className={cn('mx-auto rounded-md border', className)}
      alt={alt}
      {...props}
    />
  ),
  Callout,
  Card: MdxCard,
  Link,
  'ad-slot': () => <AdSlot placement="post-inline" />,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx prose prose-neutral max-w-none">
      {/* Compiled MDX is a component factory. It is memoized on `code`. */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Component components={components} />
    </div>
  )
}

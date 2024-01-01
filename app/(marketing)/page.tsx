'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/Button'
import Container from '@/components/Container'

export default function Home() {
  return (
    <div className="hero relative bg-inherit" data-testid="hero">
      <div className="hero-banner w-full-h-full absolute inset-0 -z-10"></div>
      <Container className="pb-12 pt-20 md:py-40">
        <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full">
          <Image
            src="/images/logo.svg"
            alt="Cottage for Tots"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="font-heading mx-auto my-0 text-center text-4xl font-bold leading-10 tracking-wide text-slate-900 sm:text-5xl sm:leading-none md:text-6xl">
          Welcome to Cottage for Tots
        </h1>
        <p className="mx-auto my-2 max-w-3xl text-center text-xl leading-7 text-slate-900 md:my-4">
          Discover a world where education meets imagination. Our toys and books
          are specially curated to stimulate your child&apos;s development
          through every playful moment.
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
  )
}

'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Menu } from 'lucide-react'

import { shopeeUrl } from '@/config/ads'
import { marketingConfig } from '@/config/marketing'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function SiteHeader() {
  const segment = useSelectedLayoutSegment()
  const [open, setOpen] = React.useState(false)
  const items = marketingConfig.mainNav

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-medium">{siteConfig.siteName}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'text-sm transition-colors hover:text-foreground',
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {item.title}
            </Link>
          ))}
          {/* <Button variant="outline" size="sm" asChild>
            <a href={shopeeUrl}>Shop on Shopee</a>
          </Button> */}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{siteConfig.siteName}</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 grid gap-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 text-base hover:bg-muted"
                >
                  {item.title}
                </Link>
              ))}
              <Button variant="outline" asChild>
                <a href={shopeeUrl}>Shop on Shopee</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

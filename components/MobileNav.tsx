'use client'

import * as React from 'react'
import Link from 'next/link'

import { MainNavItem } from 'types'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { useLockBody } from '@/hooks/use-lock-body'
import Logo from '@/components/Logo'

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
  onClose: () => void
}

export function MobileNav({ items, children, onClose }: MobileNavProps) {
  useLockBody()

  const mobileNavRef = React.useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileNavRef.current &&
      !mobileNavRef.current.contains(event.target as Node)
    ) {
      console.log('handling click outside')
      onClose()
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden'
      )}
    >
      <div
        className="relative z-20 grid gap-6 rounded-md bg-white p-4 text-slate-700 shadow-md"
        ref={mobileNavRef}
      >
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={() => onClose()}
        >
          <Logo />
          <span className="font-semibold text-slate-900">
            {siteConfig.siteName}
          </span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60'
              )}
              onClick={() => onClose()}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  )
}

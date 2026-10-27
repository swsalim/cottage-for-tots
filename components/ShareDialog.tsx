'use client'

import { absoluteUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ShareDialog({
  title,
  url,
  image,
}: {
  title: string
  url: string
  image?: string
}) {
  const shareUrl = absoluteUrl(url)
  const media = image
    ? `https://ik.imagekit.io/yuurrific/CottageForTots/Blog/${image}`
    : ''
  const links = [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: 'Share on Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(title)}${media ? `&media=${encodeURIComponent(media)}` : ''}`,
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2">
          {links.map((link) => (
            <Button key={link.label} variant="secondary" asChild>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

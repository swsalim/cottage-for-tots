'use client'

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'next-share'

import { absoluteUrl } from '@/lib/utils'

interface SocialShareProps {
  title: string
  url: string
  image: string
}

export function SocialShare({ title, url, image }: SocialShareProps) {
  return (
    <div className="mt-6 flex justify-center gap-x-3 lg:mt-8">
      <TwitterShareButton url={absoluteUrl(url)} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton url={absoluteUrl(url)} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton url={absoluteUrl(url)}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <PinterestShareButton
        url={absoluteUrl(url)}
        media={`https://ik.imagekit.io/yuurrific/CottageForTots/Blog/${image}`}
      >
        <PinterestIcon size={32} round />
      </PinterestShareButton>
    </div>
  )
}

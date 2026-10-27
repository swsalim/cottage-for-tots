'use client'

import Image, { ImageProps } from 'next/image'

import { imageKitLoader } from '@/lib/utils'

interface ImageKitProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string
  alt: string
  directory?: string
}

export function ImageKit({
  src,
  alt,
  directory = '',
  width,
  height,
  fill,
  ...props
}: ImageKitProps) {
  const imageSrc = directory ? `${directory}/${src}` : src
  return (
    <Image
      loader={imageKitLoader}
      src={imageSrc}
      alt={alt}
      {...(fill
        ? { fill: true }
        : { width: width ?? 800, height: height ?? 600 })}
      {...props}
    />
  )
}

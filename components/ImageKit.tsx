'use client'

// if using the App router
import React from 'react'
import Image, { ImageProps } from 'next/image'

import { imageKitLoader } from '@/lib/utils'

interface ImageKitProps extends ImageProps {
  src: string
  alt: string
  directory?: string
}

export default function ImageKit({
  src = 'default-image.jpg',
  alt = 'Default image',
  ...props
}: ImageKitProps) {
  return <Image loader={imageKitLoader} src={src} alt={alt} {...props} />
}

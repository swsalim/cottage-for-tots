import { cn } from '@/lib/utils'
import ImageKit from '@/components/ImageKit'

export default function Logo({ className }: { className?: string }) {
  return (
    <>
      <span className="sr-only">Cottage for Tots</span>
      <div
        className={cn(
          'relative h-10 w-10 overflow-hidden rounded-full sm:h-12 sm:w-12',
          className
        )}
      >
        <ImageKit
          src="logo.png"
          directory="CottageForTots"
          width={48}
          height={48}
          alt="Cottage for Tots"
          className="object-cover"
        />
      </div>
    </>
  )
}

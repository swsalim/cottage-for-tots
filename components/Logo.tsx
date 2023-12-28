import { cn } from '@/lib/className';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <>
      <span className="sr-only">Cottage for Tots</span>
      <div
        className={cn(
          'relative h-10 w-10 overflow-hidden rounded-full sm:h-16 sm:w-16',
          className,
        )}>
        <Image
          src="/images/logo.jpeg"
          alt="Cottage for Tots"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </>
  );
}

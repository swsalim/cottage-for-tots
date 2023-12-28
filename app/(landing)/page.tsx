import { buttonVariants } from '@/components/Button';
import Container from '@/components/Container';
import { cn } from '@/lib/className';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="hero relative bg-zinc-50" data-testid="hero">
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
        <h1 className="mx-auto mb-0 mt-0 text-center text-4xl font-bold leading-10 tracking-tight text-zinc-900 sm:text-5xl sm:leading-none md:text-6xl">
          Welcome to Cottage for Tots
        </h1>
        <p className="mx-auto my-2 max-w-3xl text-center text-xl leading-7 text-zinc-900 md:my-4">
          Discover a world where education meets imagination. Our toys and books
          are specially curated to stimulate your child&apos;s development
          through every playful moment.
        </p>

        <div className="mx-auto flex max-w-lg flex-col justify-center gap-4 md:flex-row">
          <a
            href="https://shopee.sg/cottagefortots"
            className={cn(buttonVariants())}>
            Visit our Store
          </a>
        </div>
      </Container>
    </div>
  );
}

import Footer from '@/components/Footer';
import type { Metadata } from 'next';

const seo = {
  title: 'Nurturing Young Minds with Playful Learning',
  description:
    "Discover a world where education meets imagination. Our toys and books are specially curated to stimulate your child's development through every playful moment.",
};

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex flex-grow items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}

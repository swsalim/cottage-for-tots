import Footer from '@/components/Footer';

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

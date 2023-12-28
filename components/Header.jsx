'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Popover } from '@headlessui/react';

import { cn } from '@/lib/className';

import Container from '@/components/Container';
import Logo from '@/components/Logo';

function MobileNavLink({ children, ...props }) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-zinc-700"
      {...props}>
      {children}
    </Popover.Button>
  );
}

function MobileSupportLink({ children, ...props }) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-red-500 hover:text-red-700"
      target="_blank"
      {...props}>
      {children}
    </Popover.Button>
  );
}

export default function Header() {
  const isHomePage = usePathname() === '/';
  const [isSticky, setIsSticky] = useState(false);

  const headerRef = useRef();

  useEffect(() => {
    const header = headerRef.current;
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      {
        threshold: [1],
      },
    );

    if (header) observer.observe(header);

    return () => observer.unobserve(header);
  }, [headerRef]);

  return (
    <header
      className={cn(
        'sticky inset-x-0 top-[-1px] z-50 bg-white duration-200 ease-in',
        {
          'shadow-lg': isSticky,
        },
      )}
      ref={headerRef}>
      <Container className="flex items-center justify-between py-4">
        <div className="z-10 px-2 md:px-0">
          <Link href="/" passHref>
            <Logo />
          </Link>
        </div>

        {/* <nav className="hidden lg:ml-4 lg:flex lg:items-center lg:gap-8">
          <NavLinks />
        </nav>

        <div className="-mr-2 flex px-2 lg:hidden">
          <Popover className="bg-white">
            {({ open }) => (
              <>
                <Popover.Button
                  className="relative z-10 -mx-2 inline-flex items-center rounded-lg stroke-zinc-900 p-2 hover:bg-zinc-200/50 hover:stroke-zinc-600 active:stroke-zinc-900 [&:not(:focus-visible)]:focus:outline-none"
                  aria-label="Toggle site navigation">
                  {({ open }) =>
                    open ? (
                      <ChevronUpIcon className="h-6 w-6" />
                    ) : (
                      <MenuIcon className="h-6 w-6" />
                    )
                  }
                </Popover.Button>
                <AnimatePresence initial={false}>
                  {open && (
                    <>
                      <Popover.Overlay
                        static
                        as={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-0 bg-zinc-300/60 backdrop-blur"
                      />
                      <Popover.Panel
                        static
                        as={motion.div}
                        initial={{ opacity: 0, y: -32 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: -32,
                          transition: { duration: 0.2 },
                        }}
                        className="absolute inset-x-0 top-0 z-0 origin-top space-y-4 rounded-b-2xl bg-white px-6 pb-6 pt-20 shadow-2xl shadow-zinc-900/20">
                        <h3 className="mb-4 text-xs font-medium uppercase tracking-wide text-zinc-500">
                          {navSpecialities.title}
                        </h3>
                        <div className="space-y-4">
                          {navSpecialities.items.map((specialty, index) => {
                            return (
                              <MobileNavLink
                                key={`${specialty.href}-${index}`}
                                href={specialty.href}>
                                {specialty.name}
                              </MobileNavLink>
                            );
                          })}
                        </div>
                        <hr />
                        <h3 className="mb-4 text-xs font-medium uppercase tracking-wide text-zinc-500">
                          {navCategories.title}
                        </h3>
                        <div className="space-y-4">
                          {navCategories.items.map((category, index) => {
                            return (
                              <MobileNavLink
                                key={`${category.href}-${index}`}
                                href={category.href}>
                                {category.name}
                              </MobileNavLink>
                            );
                          })}
                        </div>
                        <hr />
                        <MobileNavLink href="/browse">
                          Browse by Location
                        </MobileNavLink>
                        <MobileNavLink href="/blog">Blog</MobileNavLink>
                        <MobileSupportLink href="https://www.buymeacoffee.com/yuyu">
                          Support ❤️
                        </MobileSupportLink>
                      </Popover.Panel>
                    </>
                  )}
                </AnimatePresence>
              </>
            )}
          </Popover>
        </div> */}
      </Container>
    </header>
  );
}

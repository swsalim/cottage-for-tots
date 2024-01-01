import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'

import { navCategories, navSpecialities } from '@/config/routes'
import { cn } from '@/lib/utils'

function DropdownLink({ children, ...props }) {
  return (
    <Popover.Button
      as={Link}
      className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-zinc-800 transition duration-150 ease-in-out hover:bg-zinc-50"
      {...props}
    >
      {children}
    </Popover.Button>
  )
}

export default function NavLinks() {
  const pathname = usePathname()
  let [hoveredIndex, setHoveredIndex] = useState(null)

  return [
    [navSpecialities.title, '/physician', navSpecialities],
    [navCategories.title, '/browse', navCategories],
    ['Browse by Locations', '/browse'],
    ['Blog', '/blog'],
  ].map(([label, href, dropdown], index) => (
    <React.Fragment key={label}>
      {dropdown && (
        <Popover className="">
          {({ open }) => (
            <>
              <Popover.Button
                className={cn(
                  open
                    ? 'text-blue-600 hover:text-blue-900'
                    : 'text-zinc-700 hover:text-zinc-800',
                  'relative -mx-3 -my-2 rounded-lg text-base transition-colors delay-150 hover:delay-0 focus:outline-none'
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      className="absolute inset-0 z-[5] rounded-lg bg-zinc-100"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.15 } }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>
                <div className="group relative z-10 flex items-center px-3 py-2">
                  <span>{label}</span>
                  <ChevronDownIcon
                    className={cn(
                      open ? 'text-zinc-600' : 'text-zinc-400',
                      'ml-1 h-6 w-6 group-hover:text-zinc-500'
                    )}
                    aria-hidden="true"
                  />
                </div>
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
                      // className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-white px-6 pb-6 pt-20 shadow-2xl shadow-zinc-900/20">
                      className="absolute z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0"
                    >
                      {/* <div className="relative mx-auto grid grid-cols-1 lg:grid-cols-2"> */}
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <nav
                          className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"
                          aria-label={dropdown.title}
                        >
                          <div>
                            {dropdown.href ? (
                              <Link href={dropdown.href}>
                                <h3 className="text-base font-medium text-zinc-500">
                                  {dropdown.title}
                                </h3>
                              </Link>
                            ) : (
                              <h3 className="text-base font-medium text-zinc-500">
                                {dropdown.title}
                              </h3>
                            )}
                            <ul role="list" className="mt-5 space-y-6">
                              {dropdown.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <DropdownLink href={item.href}>
                                    {item.name}
                                  </DropdownLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </nav>
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </AnimatePresence>
            </>
          )}
        </Popover>
      )}
      {!dropdown && (
        <Link
          key={label}
          href={href}
          className={cn(
            'relative -mx-3 -my-2 rounded-lg px-3 py-2 text-base transition-colors delay-150 hover:delay-0',
            {
              'text-zinc-700 hover:text-zinc-800': pathname !== href,
            },
            {
              'text-blue-600 hover:text-blue-900': pathname === href,
            }
          )}
          passHref
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                className="absolute inset-0 rounded-lg bg-zinc-100"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <span className="relative z-10">{label}</span>
        </Link>
      )}
    </React.Fragment>
  ))
}

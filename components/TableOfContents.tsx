'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { TocItem } from '@/lib/content'

function TocLinks({ items }: { items: TocItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className={item.depth === 3 ? 'pl-4' : undefined}>
          <a
            href={`#${item.id}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items.length) return null

  return (
    <>
      <nav aria-label="On this page" className="hidden lg:block">
        <p className="mb-3 text-sm font-medium">On this page</p>
        <TocLinks items={items} />
      </nav>
      <Accordion type="single" collapsible className="lg:hidden">
        <AccordionItem value="toc">
          <AccordionTrigger>On this page</AccordionTrigger>
          <AccordionContent>
            <TocLinks items={items} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

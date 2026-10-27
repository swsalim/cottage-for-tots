import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type CellInfo = {
  header: boolean
  content: React.ReactNode
}

function elementChildren(nodes: React.ReactNode): React.ReactElement[] {
  return React.Children.toArray(nodes).filter(React.isValidElement)
}

function elementName(type: unknown): string {
  if (typeof type === 'string') return type
  if (typeof type === 'function' || (typeof type === 'object' && type)) {
    const named = type as { displayName?: string; name?: string }
    return named.displayName || named.name || ''
  }
  return ''
}

function isType(type: unknown, names: string[]) {
  return names.includes(elementName(type))
}

function textContent(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node))
    return node.map((child) => textContent(child)).join('')
  if (React.isValidElement(node)) return textContent(node.props.children)
  return ''
}

function renderCellContent(content: React.ReactNode) {
  return React.Children.map(content, (child) => {
    if (!React.isValidElement(child)) return child
    return React.cloneElement(child)
  })
}

function collectRows(children: React.ReactNode): CellInfo[][] {
  const rows: CellInfo[][] = []

  const visit = (nodes: React.ReactNode) => {
    for (const node of elementChildren(nodes)) {
      if (isType(node.type, ['tr', 'TableRow'])) {
        rows.push(
          elementChildren(node.props.children).map((cell) => ({
            header: isType(cell.type, ['th', 'TableHead']),
            content: cell.props.children,
          }))
        )
      } else {
        visit(node.props.children)
      }
    }
  }

  visit(children)
  return rows
}

export function MdxTable({
  className,
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  const rows = collectRows(children)
  const headerRowIndex = rows.findIndex((row) =>
    row.some((cell) => cell.header)
  )
  const headers =
    headerRowIndex >= 0
      ? rows[headerRowIndex].map((cell) =>
          textContent(cell.content).replace(/\s+/g, ' ').trim()
        )
      : []
  const bodyRows =
    headerRowIndex >= 0
      ? rows.filter((_, index) => index !== headerRowIndex)
      : rows
  const columnCount = rows.reduce((max, row) => Math.max(max, row.length), 0)
  const stackOnMobile = columnCount > 2

  const table = (
    <Table className={cn('w-full', className)} {...props}>
      {children}
    </Table>
  )

  if (!stackOnMobile) {
    return <div className="mdx-table my-6 w-full max-w-full">{table}</div>
  }

  return (
    <div className="mdx-table my-6 w-full max-w-full">
      <div className="hidden md:block">{table}</div>
      {bodyRows.length > 0 ? (
        <div className="mdx-table-cards grid gap-4 md:hidden">
          {bodyRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className="grid grid-cols-[minmax(0,40%)_minmax(0,1fr)] gap-3 border-b border-slate-200 px-4 py-3 last:border-b-0"
                >
                  <div className="min-w-0 break-words font-semibold text-slate-900">
                    {headers[cellIndex] || ''}
                  </div>
                  <div className="min-w-0 break-words text-slate-700 [&_p]:m-0">
                    {renderCellContent(cell.content)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { TableBody, TableCell, TableHead, TableHeader, TableRow }

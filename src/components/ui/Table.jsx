import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Table = forwardRef(function Table(
  { columns = [], rows = [], caption, className, ...props },
  ref,
) {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-token-lg border border-border-default bg-surface-elevated',
        className,
      )}
    >
      <table
        ref={ref}
        className="w-full min-w-md border-collapse text-left text-sm"
        {...props}
      >
        {caption ? (
          <caption className="sr-only">{caption}</caption>
        ) : null}
        <thead>
          <tr className="border-b border-border-default bg-surface-secondary">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-content-muted"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              className="border-b border-border-default last:border-b-0 transition-colors hover:bg-surface-secondary/60"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-content-primary"
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

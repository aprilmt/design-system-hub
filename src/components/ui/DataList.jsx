import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const DataList = forwardRef(function DataList(
  { items = [], className, ...props },
  ref,
) {
  return (
    <dl
      ref={ref}
      className={cn(
        'divide-y divide-border-default overflow-hidden rounded-token-lg border border-border-default bg-surface-elevated',
        className,
      )}
      {...props}
    >
      {items.map(({ label, value, id }) => (
        <div
          key={id ?? label}
          className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4 sm:items-baseline"
        >
          <dt className="text-xs font-medium uppercase tracking-wider text-content-muted">
            {label}
          </dt>
          <dd className="text-sm text-content-primary">{value}</dd>
        </div>
      ))}
    </dl>
  )
})

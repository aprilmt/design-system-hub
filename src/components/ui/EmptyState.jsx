// Motion Prompt #072 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#072
// Ported: row delete 60px / 300ms easeInOutCubic; empty rise 8px / 350ms linear; empty fade 200ms; rows return 60px / 350ms easeOutCubic.
import { useCallback, useEffect, useState } from 'react'
import { Inbox, Trash2 } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../../lib/utils'

const ROW_OUT_MS = 300
const EMPTY_OUT_MS = 200
const ROW_IN_MS = 350
const ROW_PITCH = 58

const EASE_IO = 'cubic-bezier(0.65, 0, 0.35, 1)'

/**
 * Empty state panel — first-use / no-results screen with #072 entrance motion.
 */
export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className,
  exiting = false,
  ...props
}) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center justify-center px-6 py-10 text-center',
        exiting ? 'animate-empty-fade-out' : 'animate-empty-rise-in',
        'motion-reduce:animate-none',
        className,
      )}
      {...props}
    >
      <Inbox
        size={40}
        strokeWidth={1.75}
        className="text-brand-primary"
        aria-hidden="true"
      />
      <p className="mt-4 text-base font-semibold text-content-primary">{title}</p>
      {description ? (
        <p className="mt-1 max-w-xs text-sm text-content-secondary">{description}</p>
      ) : null}
      {actionLabel ? (
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="mt-5 h-[34px] min-w-[112px] rounded-lg"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

const DEMO_SEED = [
  { id: 'a', title: 'Brand guidelines.pdf', meta: 'Shared · 2 days ago' },
  { id: 'b', title: 'Q4 research notes', meta: 'Private · Yesterday' },
]

/**
 * Interactive sandbox demo: list → delete rows → empty → Add restores list (#072).
 */
export function EmptyStateDemo({ copy }) {
  const [items, setItems] = useState(DEMO_SEED)
  const [removing, setRemoving] = useState(() => new Set())
  const [liftFirst, setLiftFirst] = useState(false)
  const [phase, setPhase] = useState('list') // list | empty | empty-out | restoring
  const [enterIds, setEnterIds] = useState(() => new Set())

  useEffect(() => {
    if (phase !== 'restoring') return
    const id = window.setTimeout(() => {
      setEnterIds(new Set())
      setPhase('list')
    }, ROW_IN_MS)
    return () => window.clearTimeout(id)
  }, [phase])

  const removeRow = useCallback(
    (id) => {
      if (removing.has(id) || phase !== 'list') return
      setRemoving((prev) => new Set(prev).add(id))

      const index = items.findIndex((row) => row.id === id)
      // When the first visible row is deleted, the second lifts into its slot (#072: 58px).
      if (index === 0 && items.length > 1) {
        window.setTimeout(() => setLiftFirst(true), 0)
      }

      window.setTimeout(() => {
        setLiftFirst(false)
        setItems((prev) => {
          const next = prev.filter((row) => row.id !== id)
          if (next.length === 0) setPhase('empty')
          return next
        })
        setRemoving((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      }, ROW_OUT_MS)
    },
    [items, phase, removing],
  )

  const handleAdd = useCallback(() => {
    if (phase !== 'empty') return
    setPhase('empty-out')
    window.setTimeout(() => {
      setItems(DEMO_SEED)
      setEnterIds(new Set(DEMO_SEED.map((r) => r.id)))
      setRemoving(new Set())
      setLiftFirst(false)
      setPhase('restoring')
    }, EMPTY_OUT_MS)
  }, [phase])

  const showEmpty = phase === 'empty' || phase === 'empty-out'

  return (
    <div className="overflow-hidden rounded-token-lg border border-border-default bg-surface-elevated">
      <div className="border-b border-border-default px-4 py-3">
        <p className="text-sm font-medium text-content-primary">{copy.listTitle}</p>
        <p className="text-xs text-content-muted">{copy.listHint}</p>
      </div>

      <div className="relative min-h-[220px] p-4">
        {!showEmpty ? (
          <ul className="relative space-y-2.5" aria-label={copy.listTitle}>
            {items.map((row, i) => {
              const isRemoving = removing.has(row.id)
              const isEntering = enterIds.has(row.id)
              const lift =
                liftFirst && i === 1 && items[0] && removing.has(items[0].id)
              return (
                <li
                  key={row.id}
                  style={{
                    transitionProperty: isEntering ? undefined : 'transform, opacity',
                    transitionDuration: isEntering ? undefined : `${ROW_OUT_MS}ms`,
                    transitionTimingFunction: isEntering ? undefined : EASE_IO,
                    transform: isEntering
                      ? undefined
                      : isRemoving
                        ? 'translateX(-60px)'
                        : lift
                          ? `translateY(-${ROW_PITCH}px)`
                          : 'translateX(0) translateY(0)',
                    opacity: isEntering ? undefined : isRemoving ? 0 : 1,
                    animationDelay: isEntering ? `${i * 40}ms` : undefined,
                  }}
                  className={cn(
                    'flex h-12 items-center gap-3 rounded-lg border border-border-default bg-surface-primary px-3',
                    'motion-reduce:transition-none motion-reduce:animate-none',
                    isEntering && 'animate-empty-row-in',
                  )}
                >
                  <span
                    className="size-4 shrink-0 rounded-full border-2 border-border-strong"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-content-primary">
                      {row.title}
                    </p>
                    <p className="truncate text-xs text-content-muted">{row.meta}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    disabled={isRemoving}
                    className="shrink-0 rounded-token-sm p-1.5 text-content-muted transition-colors hover:bg-surface-secondary hover:text-feedback-error"
                    aria-label={`${copy.deleteLabel}: ${row.title}`}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <EmptyState
            title={copy.emptyTitle}
            description={copy.emptyDescription}
            actionLabel={copy.addLabel}
            onAction={handleAdd}
            exiting={phase === 'empty-out'}
          />
        )}
      </div>
    </div>
  )
}

// Motion Prompt #057 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#057
// Ported: indicator 250ms easeInOutCubic; panel out 200ms linear; panel in starts +100ms, 200ms linear rise 8px.
// UI chrome follows Flowbite tabs (underline / pills): https://flowbite.com/docs/components/tabs/
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { cn } from '../../lib/utils'

const INDICATOR_MS = 250
const PANEL_IN_DELAY_MS = 100
const PANEL_IN_MS = 200
const EASE_IO = 'cubic-bezier(0.65, 0, 0.35, 1)'

function useControllableState(controlled, defaultValue, onChange) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const isControlled = controlled !== undefined
  const value = isControlled ? controlled : uncontrolled
  const setValue = useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange],
  )
  return [value, setValue]
}

export function Tabs({
  items = [],
  value: valueProp,
  defaultValue,
  onValueChange,
  variant = 'underline',
  className,
  'aria-label': ariaLabel,
}) {
  const isPills = variant === 'pills'
  const baseId = useId()
  const listRef = useRef(null)
  const btnRefs = useRef(new Map())
  const timersRef = useRef([])

  const initial = defaultValue ?? valueProp ?? items[0]?.value ?? ''
  const [value, setValue] = useControllableState(
    valueProp,
    initial,
    onValueChange,
  )

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
  })
  const [settled, setSettled] = useState(value)
  const [leaving, setLeaving] = useState(null)
  const [entering, setEntering] = useState(null)
  const transitioning = leaving != null || entering != null

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const measure = useCallback((tabValue) => {
    const list = listRef.current
    const btn = btnRefs.current.get(tabValue)
    if (!list || !btn) return
    const listBox = list.getBoundingClientRect()
    const btnBox = btn.getBoundingClientRect()
    setIndicator({
      left: btnBox.left - listBox.left,
      width: btnBox.width,
      top: btnBox.top - listBox.top,
      height: btnBox.height,
    })
  }, [])

  useLayoutEffect(() => {
    measure(value)
  }, [value, items, variant, measure])

  useEffect(() => {
    const onResize = () => measure(value)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [measure, value])

  const select = useCallback(
    (next) => {
      if (next === value || transitioning) return
      clearTimers()
      setValue(next)
      setLeaving(settled)
      setEntering(null)

      const tIn = window.setTimeout(() => {
        setEntering(next)
      }, PANEL_IN_DELAY_MS)

      const tDone = window.setTimeout(() => {
        setSettled(next)
        setLeaving(null)
        setEntering(null)
      }, PANEL_IN_DELAY_MS + PANEL_IN_MS)

      timersRef.current = [tIn, tDone]
    },
    [clearTimers, settled, setValue, transitioning, value],
  )

  const onKeyDown = (e) => {
    const enabled = items.map((item) => item.value)
    const i = enabled.indexOf(value)
    if (i < 0) return
    let next = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = enabled[(i + 1) % enabled.length]
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = enabled[(i - 1 + enabled.length) % enabled.length]
    } else if (e.key === 'Home') {
      next = enabled[0]
    } else if (e.key === 'End') {
      next = enabled[enabled.length - 1]
    }
    if (!next) return
    e.preventDefault()
    select(next)
    btnRefs.current.get(next)?.focus()
  }

  const panelByValue = Object.fromEntries(
    items.map((item) => [item.value, item]),
  )

  const renderPanel = (tabValue, mode) => {
    const item = panelByValue[tabValue]
    if (!item) return null
    return (
      <div
        key={`${tabValue}-${mode}`}
        role="tabpanel"
        id={`${baseId}-panel-${tabValue}`}
        aria-labelledby={`${baseId}-tab-${tabValue}`}
        className={cn(
          'rounded-token bg-surface-secondary p-4',
          mode === 'leaving' && 'animate-tab-panel-out',
          mode === 'entering' && 'animate-tab-panel-in',
          mode !== 'settled' && 'absolute inset-x-0 top-0',
          'motion-reduce:animate-none',
        )}
      >
        {item.content}
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(isPills ? 'mb-4' : 'mb-4 border-b border-border-default')}>
        <div
          ref={listRef}
          role="tablist"
          aria-label={ariaLabel}
          onKeyDown={onKeyDown}
          className={cn(
            'relative flex flex-wrap text-center text-sm font-medium',
            !isPills && '-mb-px',
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute bg-brand-primary',
              isPills ? 'rounded-token' : 'bottom-0 h-0.5',
            )}
            style={{
              left: indicator.left,
              width: indicator.width,
              ...(isPills
                ? { top: indicator.top, height: indicator.height }
                : null),
              transitionProperty: isPills
                ? 'left, width, top, height'
                : 'left, width',
              transitionDuration: `${INDICATOR_MS}ms`,
              transitionTimingFunction: EASE_IO,
            }}
          />
          {items.map((item, index) => {
            const selected = item.value === value
            const Icon = item.icon
            return (
              <div
                key={item.value}
                role="presentation"
                className={cn(index < items.length - 1 && 'me-2')}
              >
                <button
                  ref={(node) => {
                    if (node) btnRefs.current.set(item.value, node)
                    else btnRefs.current.delete(item.value)
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${item.value}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${item.value}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(item.value)}
                  className={cn(
                    'group relative z-[1] inline-flex items-center justify-center',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
                    isPills
                      ? 'rounded-token px-4 py-2.5'
                      : 'rounded-t-lg border-b-2 border-transparent p-4',
                    selected
                      ? isPills
                        ? 'text-content-on-brand'
                        : 'text-brand-primary'
                      : isPills
                        ? 'text-content-muted hover:bg-surface-secondary hover:text-content-primary'
                        : 'text-content-muted hover:border-brand-primary hover:text-brand-primary',
                  )}
                >
                  {Icon ? (
                    <Icon
                      size={16}
                      aria-hidden="true"
                      className={cn(
                        'me-2 shrink-0',
                        selected
                          ? isPills
                            ? 'text-content-on-brand'
                            : 'text-brand-primary'
                          : 'text-content-muted group-hover:text-brand-primary',
                      )}
                    />
                  ) : null}
                  {item.label}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="relative min-h-[6rem]">
        {transitioning ? (
          <>
            {leaving != null ? renderPanel(leaving, 'leaving') : null}
            {entering != null ? renderPanel(entering, 'entering') : null}
          </>
        ) : (
          renderPanel(settled, 'settled')
        )}
      </div>
    </div>
  )
}

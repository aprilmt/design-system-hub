// Motion Prompt #056 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#056
// Ported timings/easing/progress: slide in 240px / 350ms easeOutCubic, life bar linear, slide out 240px / 350ms easeInOutCubic.
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
} from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '../../lib/utils'

const ENTER_MS = 350
/** Sample hold (1.4–3.2 s). Real toasts lengthen this via `duration`. */
const SAMPLE_LIFE_MS = 1800
const DEFAULT_DURATION = 5000

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const variantStyles = {
  success: 'border-l-4 border-l-feedback-success bg-feedback-success-light',
  error: 'border-l-4 border-l-feedback-error bg-feedback-error-light',
  warning: 'border-l-4 border-l-feedback-warning bg-feedback-warning-light',
  info: 'border-l-4 border-l-feedback-info bg-feedback-info-light',
}

const iconColors = {
  success: 'text-feedback-success',
  error: 'text-feedback-error',
  warning: 'text-feedback-warning',
  info: 'text-feedback-info',
}

const lifeColors = {
  success: 'bg-feedback-success',
  error: 'bg-feedback-error',
  warning: 'bg-feedback-warning',
  info: 'bg-feedback-info',
}

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const counterRef = useRef(0)

  const toast = useCallback(
    ({ title, description, variant = 'info', duration = DEFAULT_DURATION }) => {
      const id = ++counterRef.current
      setToasts((prev) => [
        ...prev,
        { id, title, description, variant, duration, open: true },
      ])
    },
    []
  )

  const handleOpenChange = useCallback((id, open) => {
    if (!open) {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}

        {toasts.map((t) => {
          const Icon = icons[t.variant]
          // Life bar after entrance (#056: enter 1.05–1.4, life 1.4–3.2). Hold stretches with duration.
          const lifeMs = Math.max(SAMPLE_LIFE_MS, t.duration - ENTER_MS)
          return (
            <ToastPrimitive.Root
              key={t.id}
              open={t.open}
              duration={t.duration}
              onOpenChange={(open) => handleOpenChange(t.id, open)}
              style={{
                '--toast-life-ms': `${lifeMs}ms`,
                '--toast-life-delay': `${ENTER_MS}ms`,
              }}
              className={cn(
                'relative flex items-start gap-3 overflow-hidden rounded-[10px] border border-border-default p-4 pb-5 shadow-token-lg',
                'data-[state=open]:animate-toast-slide-in',
                'data-[state=closed]:animate-toast-slide-out',
                'data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)',
                'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform',
                'data-[swipe=end]:animate-toast-swipe-out',
                'motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none',
                variantStyles[t.variant]
              )}
            >
              <Icon
                size={20}
                className={cn('mt-0.5 shrink-0', iconColors[t.variant])}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                {t.title && (
                  <ToastPrimitive.Title className="text-sm font-bold text-content-primary">
                    {t.title}
                  </ToastPrimitive.Title>
                )}
                {t.description && (
                  <ToastPrimitive.Description className="mt-0.5 text-sm text-content-secondary">
                    {t.description}
                  </ToastPrimitive.Description>
                )}
              </div>
              <ToastPrimitive.Close
                className="shrink-0 rounded-token-sm p-1 text-content-muted transition-colors hover:text-content-primary"
                aria-label="Dismiss notification"
              >
                <X size={14} aria-hidden="true" />
              </ToastPrimitive.Close>
              {/* #056 time-left line: 3px, inset 10px, linear shrink */}
              <div
                className="pointer-events-none absolute inset-x-2.5 bottom-[7px] h-[3px] overflow-hidden rounded-[1.5px]"
                aria-hidden="true"
              >
                <div
                  className={cn(
                    'h-full w-full origin-left rounded-[1.5px] motion-reduce:animate-none',
                    lifeColors[t.variant],
                    'animate-toast-life'
                  )}
                  style={{ animationDelay: 'var(--toast-life-delay)' }}
                />
              </div>
            </ToastPrimitive.Root>
          )
        })}

        <ToastPrimitive.Viewport
          className="fixed bottom-4 right-[18px] z-100 flex w-96 max-w-[calc(100vw-2rem)] flex-col gap-2 outline-hidden"
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}
